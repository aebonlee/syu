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
  const [provider, setProvider] = useState<Provider>('solar')
  const [messages, setMessages] = useState<Msg[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, open])

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
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="학습 도우미 채팅 열기"
        className="fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full bg-hero-gradient text-white shadow-hero ring-1 ring-white/20 transition-transform hover:scale-105"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9a1.5 1.5 0 01-1.5 1.5H9l-4 3.5V16H5.5A1.5 1.5 0 014 14.5v-9z" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* 채팅 패널 */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[90] flex h-[560px] max-h-[calc(100vh-7rem)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-hero border border-hairline bg-white shadow-hero">
          {/* header */}
          <div className="bg-hero-gradient px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-sm font-extrabold">AI</span>
                <div className="leading-tight">
                  <div className="text-[15px] font-bold">학습 도우미</div>
                  <div className="text-[11px] text-white/70">삼육대 생성형 AI 특강</div>
                </div>
              </div>
              {/* provider toggle */}
              <div className="flex rounded-lg bg-white/15 p-0.5 text-[11px] font-semibold">
                {(['solar', 'openai'] as Provider[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setProvider(p)}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      provider === p ? 'bg-white text-navy' : 'text-white/80 hover:text-white'
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
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-navy text-white'
                      : 'rounded-bl-sm border border-hairline bg-white text-ink-strong'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-hairline bg-white px-4 py-3">
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
              <div className="space-y-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full rounded-lg border border-hairline bg-white px-3 py-2 text-left text-xs font-medium text-ink-muted transition-colors hover:border-royal hover:text-royal"
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
              className="min-w-0 flex-1 rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-royal"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-royal text-white transition-colors hover:bg-royal-600 disabled:opacity-40"
              aria-label="전송"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 12l16-8-6 16-3-7-7-1z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
