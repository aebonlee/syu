import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: Props) {
  const { signInWithGoogle, signInWithKakao } = useAuth()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-hero bg-white shadow-hero"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="bg-hero-gradient px-7 py-8 text-center text-white">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-base font-extrabold">
            AI
          </span>
          <h2 className="mt-4 text-xl font-extrabold text-white">로그인 / 회원가입</h2>
          <p className="mt-1 text-sm text-white/75">생성형 AI 실무 역량 강화 특강</p>
        </div>

        {/* body */}
        <div className="space-y-3 px-7 py-7">
          <p className="mb-1 text-center text-sm text-ink-faded">
            소셜 계정으로 간편하게 시작하세요
          </p>

          {/* Google */}
          <button
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-hairline bg-white px-4 py-3 font-semibold text-ink-strong transition-colors hover:bg-surface"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 5.1 29.4 3 24 3 11.8 3 2 12.8 2 25s9.8 22 22 22 22-9.8 22-22c0-1.5-.2-2.9-.4-4.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 5.1 29.4 3 24 3 16.3 3 9.7 7.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 47c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 38 26.7 39 24 39c-5.3 0-9.7-2.6-11.3-7l-6.5 5C9.5 42.6 16.2 47 24 47z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.3 5.3C40.9 36.3 44 31.1 44 25c0-1.5-.2-2.9-.4-4.5z" />
            </svg>
            Google 계정으로 시작
          </button>

          {/* Kakao */}
          <button
            onClick={signInWithKakao}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#FEE500] px-4 py-3 font-semibold text-[#191600] transition-opacity hover:opacity-90"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path fill="#191600" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7-.2.7-.7 2.6-.8 3-.1.5.2.5.4.4.2-.1 2.6-1.8 3.7-2.5.6.1 1.3.1 2 .1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
            </svg>
            카카오로 시작
          </button>

          <p className="pt-2 text-center text-[11px] leading-relaxed text-ink-disabled">
            로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
