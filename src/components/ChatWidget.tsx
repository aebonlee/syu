import { useEffect, useRef, useState } from 'react'
import { getSupabase } from '../lib/supabase'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

type Provider = 'solar' | 'openai'

const WELCOME: Msg = {
  role: 'assistant',
  content:
    '안녕하세요! 삼육대 「생성형 AI 실무 역량 강화 특강」 학습 도우미예요. 🤖\n과정 일정·커리큘럼·n8n·AI 이미지/영상 등 무엇이든 물어보세요.',
}

const SUGGESTIONS = [
  '교육 일정이 어떻게 되나요?',
  'n8n으로 뭘 만들 수 있어요?',
  '1회차에 준비할 게 있나요?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false) // 풍선도움말
  const [provider, setProvider] = useState<Provider>('solar')
  const [messages, setMessages] = useState<Msg[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, open])

  // 로드 후 잠시 뒤 풍선도움말 노출
  useEffect(() => {
    const t = setTimeout(() => setHint(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const openChat = () => {
    setOpen(true)
    setHint(false)
  }

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || loading) return
    const next = [...messages, { role: 'user' as const, content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const { data, error } = await getSupabase().functions.invoke('syu-chat', {
        body: {
          provider,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        },
      })
      if (error) throw error
      const reply = (data?.reply as string) ?? (data?.error as string) ?? '응답을 받지 못했어요.'
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            '⚠️ 지금은 답변을 가져올 수 없어요. 챗봇 서버(Edge Function) 설정이 필요하거나 일시적인 오류일 수 있습니다.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ───── 풍선도움말 (화살표가 챗봇 버튼을 가리킴) ───── */}
      {!open && hint && (
        <div className="fixed bottom-32 right-6 z-[91] w-[244px] animate-fade-up">
          <div className="relative rounded-2xl bg-white p-4 shadow-hero ring-2 ring-royal/25">
            <button
              onClick={() => setHint(false)}
              aria-label="도움말 닫기"
              className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-navy text-white shadow ring-2 ring-white"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-start gap-2.5">
              <span className="text-2xl leading-none">💬</span>
              <div>
                <p className="text-[14px] font-extrabold text-navy">AI 학습 도우미</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-muted">
                  특강 일정·n8n·AI 영상 등<br />궁금한 건 여기서 물어보세요!
                </p>
                <button
                  onClick={openChat}
                  className="mt-2 inline-flex items-center gap-1 rounded-lg bg-royal px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-royal-600"
                >
                  채팅 시작 <span aria-hidden>↗</span>
                </button>
              </div>
            </div>
            {/* 아래쪽 화살표 — 챗봇 버튼을 가리킴 (테두리 삼각형 + 흰 삼각형) */}
            <div className="absolute -bottom-[9px] right-9 h-0 w-0 border-x-[9px] border-t-[9px] border-x-transparent border-t-royal/25" />
            <div className="absolute -bottom-[6px] right-9 h-0 w-0 border-x-[9px] border-t-[9px] border-x-transparent border-t-white" />
          </div>
        </div>
      )}

      {/* ───── 플로팅 버튼 (1.2배 확대 + 강조 컬러) ───── */}
      <div className="fixed bottom-6 right-6 z-[90]">
        {/* 주의를 끄는 펄스 링 */}
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-royal/40" />}
        <button
          onClick={() => (open ? setOpen(false) : openChat())}
          aria-label="AI 학습 도우미 채팅"
          className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-hero-gradient text-white shadow-hero ring-4 ring-white transition-transform hover:scale-105"
        >
          {open ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9a1.5 1.5 0 01-1.5 1.5H9l-4 3.5V16H5.5A1.5 1.5 0 014 14.5v-9z" fill="currentColor" />
              <circle cx="9" cy="10" r="1.3" fill="#1B2A4A" />
              <circle cx="12.5" cy="10" r="1.3" fill="#1B2A4A" />
              <circle cx="16" cy="10" r="1.3" fill="#1B2A4A" />
            </svg>
          )}
          {/* 온라인 표시 점 */}
          {!open && (
            <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full bg-[#22d3a6] ring-2 ring-white" />
          )}
        </button>
      </div>

      {/* ───── 채팅 패널 (1.2배 확대) ───── */}
      {open && (
        <div className="fixed bottom-28 right-6 z-[90] flex h-[640px] max-h-[calc(100vh-8rem)] w-[min(440px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-hero border border-hairline bg-white shadow-hero">
          {/* header */}
          <div className="bg-hero-gradient px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-base font-extrabold">
                  AI
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#22d3a6] ring-2 ring-[#243a66]" />
                </span>
                <div className="leading-tight">
                  <div className="text-[16px] font-bold">학습 도우미</div>
                  <div className="text-[11.5px] text-white/75">삼육대 생성형 AI 특강 · 온라인</div>
                </div>
              </div>
              {/* provider toggle */}
              <div className="flex rounded-lg bg-black/15 p-0.5 text-[11px] font-semibold">
                {(['solar', 'openai'] as Provider[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setProvider(p)}
                    className={`rounded-md px-2.5 py-1 transition-colors ${
                      provider === p ? 'bg-white text-navy shadow' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {p === 'solar' ? 'Solar' : 'OpenAI'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-hero-gradient text-[10px] font-bold text-white">AI</span>
                )}
                <div
                  className={`max-w-[78%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-royal text-white'
                      : 'rounded-bl-md border border-hairline bg-white text-ink-strong'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-end gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-hero-gradient text-[10px] font-bold text-white">AI</span>
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-hairline bg-white px-4 py-3.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-royal/60"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 추천 질문 (첫 화면) */}
            {messages.length === 1 && !loading && (
              <div className="space-y-2 pl-9 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full rounded-lg border border-hairline bg-white px-3.5 py-2.5 text-left text-[13px] font-medium text-ink-muted transition-colors hover:border-royal hover:bg-royal-50 hover:text-royal"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-hairline bg-white px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 점을 입력하세요…"
              className="min-w-0 flex-1 rounded-lg border border-hairline px-3.5 py-3 text-[14px] outline-none focus:border-royal"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-royal text-white transition-colors hover:bg-royal-600 disabled:opacity-40"
              aria-label="전송"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 12l16-8-6 16-3-7-7-1z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
