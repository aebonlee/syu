// Supabase Edge Function: syu-chat
// 삼육대 AI 특강 학습 도우미 챗봇 — Solar(Upstage) / OpenAI 프록시
//
// 키는 클라이언트에 노출하지 않고, 이 함수가 service_role로 syu_settings 테이블에서
// SOLAR_API_KEY / OPENAI_API_KEY 를 읽어 LLM을 호출합니다.
//
// 배포:  supabase functions deploy syu-chat --project-ref hcmgdztsgjvzcyxyayaj
// (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 는 Edge Function 런타임에 자동 주입됨)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM_PROMPT = `당신은 삼육대학교 2026 가을학기 특강 「생성형 AI 실무 역량 강화 과정」의 학습 도우미 챗봇입니다.
이 특강은 비대면(VOD)으로 진행되며, 총 14시간 · 4회차(회차당 3.5시간, 18:30–22:00)로 구성됩니다.

[과정 구성]
- 주제 ① AI 에이전트 & n8n 기반 업무 자동화 (9/14·15)
  · 1회차: 자동화 설계 기초 + n8n 입문 (Google Forms→GPT 요약→메일)
  · 2회차: 자연어 웹앱(Lovable)+Supabase+GitHub 배포, 문서 자동화(Gamma)
- 주제 ② AI 멀티미디어 & 강의 콘텐츠 제작 (9/21·22)
  · 3회차(주제②의 1회차): AI 이미지·디자인 (Midjourney/DALL·E 3/Canva/Firefly)
  · 4회차(주제②의 2회차): AI 영상·음성(HeyGen/Sora/ElevenLabs) + 원스톱 파이프라인 + 저작권

[역할]
- 수강생(학부생)의 질문에 친절하고 쉽게, 한국어로 답하세요.
- 과정 일정·커리큘럼·도구·실습 방법·산출물에 대해 구체적으로 안내하세요.
- 과정과 무관한 질문도 도움이 되면 간단히 답하되, 학습 맥락으로 연결해 주세요.
- 모르는 사실은 지어내지 말고 솔직히 모른다고 하세요. 답변은 간결하게(필요시 불릿) 작성하세요.`

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405)

  try {
    const { messages = [], provider = 'solar' } = await req.json()

    // 1) Supabase에서 키 읽기 (service_role — RLS 우회, 서버사이드 전용)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    const { data: rows } = await supabase.from('syu_settings').select('key, value')
    const settings: Record<string, string> = Object.fromEntries(
      (rows ?? []).map((r: { key: string; value: string }) => [r.key, r.value]),
    )

    // 2) 프로바이더별 엔드포인트/모델/키 결정 (둘 다 OpenAI 호환 포맷)
    let url: string
    let apiKey: string | undefined
    let model: string
    if (provider === 'openai') {
      url = 'https://api.openai.com/v1/chat/completions'
      apiKey = settings.OPENAI_API_KEY ?? Deno.env.get('OPENAI_API_KEY') ?? undefined
      model = 'gpt-4o-mini'
    } else {
      url = 'https://api.upstage.ai/v1/chat/completions'
      apiKey = settings.SOLAR_API_KEY ?? Deno.env.get('SOLAR_API_KEY') ?? undefined
      model = 'solar-pro2'
    }
    if (!apiKey) {
      return json({ error: `${provider.toUpperCase()} API 키가 Supabase(syu_settings)에 설정되지 않았습니다.` }, 400)
    }

    // 3) 최근 대화 + 시스템 프롬프트로 LLM 호출
    const recent = (messages as ChatMessage[]).slice(-12)
    const chat: ChatMessage[] = [{ role: 'system', content: SYSTEM_PROMPT }, ...recent]

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages: chat, temperature: 0.5, max_tokens: 1024 }),
    })
    const data = await r.json()
    if (!r.ok) {
      return json({ error: data?.error?.message ?? `${provider} 호출 실패`, status: r.status }, 502)
    }
    const reply = data?.choices?.[0]?.message?.content ?? '죄송합니다. 답변을 생성하지 못했습니다.'
    return json({ reply, provider, model })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
