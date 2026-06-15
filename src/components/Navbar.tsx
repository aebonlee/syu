import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'

// 상위 메뉴 + 하위(드롭다운) 메뉴 구조
const MENUS = [
  {
    label: '과정 소개',
    to: '/overview',
    children: [
      { to: '/overview', label: '과정 개요', desc: '개요·교육 목표·구조' },
      { to: '/curriculum', label: '커리큘럼', desc: '회차별 세부 시간표' },
      { to: '/outcomes', label: '산출물·기대효과', desc: '회차별 산출물·효과' },
      { to: '/tools', label: '학습 도구', desc: 'n8n·Lovable·HeyGen 등' },
    ],
  },
  {
    label: '과정별 학습자료',
    to: '/materials/automation',
    children: [
      { to: '/materials/automation', label: 'AI 에이전트 & n8n 기반 업무 자동화', desc: '주제 ① · 9/14·15 · 1~2회차 상세 자료' },
      { to: '/materials/multimedia', label: 'AI 멀티미디어 & 강의 콘텐츠 제작', desc: '주제 ② · 9/21·22 · 3~4회차 상세 자료' },
    ],
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)          // mobile menu
  const [mobileSub, setMobileSub] = useState<number | null>(0)
  const [drop, setDrop] = useState<number | null>(null) // desktop dropdown index
  const [loginOpen, setLoginOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { isLoggedIn, profile, signOut } = useAuth()

  useEffect(() => { setOpen(false); setDrop(null) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSectionActive = (m: typeof MENUS[number]) =>
    m.children.some((c) => pathname.startsWith(c.to.split('/').slice(0, 2).join('/')))

  return (
    <header className="sticky top-0 z-50">
      {/* ───── Utility bar (light) ───── */}
      <div className="hidden border-b border-hairline bg-surface md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-ink-disabled">
          <span className="font-medium tracking-wide">
            삼육대학교 · <span className="tracking-[0.15em]">SAHMYOOK UNIVERSITY</span>
          </span>
          <div className="flex items-center gap-3">
            <span>2026 가을학기 특강</span>
            <span className="text-hairline">|</span>
            <span>비대면 VOD</span>
            <span className="text-hairline">|</span>
            {isLoggedIn ? (
              <span className="flex items-center gap-2">
                {profile?.avatar_url && (
                  <img src={profile.avatar_url} alt="" className="h-5 w-5 rounded-full" />
                )}
                <span className="font-semibold text-navy">{profile?.name ?? '회원'}</span>님
                <button onClick={signOut} className="ml-1 text-ink-disabled hover:text-navy">로그아웃</button>
              </span>
            ) : (
              <button onClick={() => setLoginOpen(true)} className="font-semibold text-navy hover:text-royal">
                로그인 / 회원가입
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ───── Main nav (white) ───── */}
      <div className={`border-b border-hairline bg-white transition-shadow ${scrolled ? 'shadow-card' : ''}`}>
        <div className="container-page flex h-[72px] items-center justify-between">
          {/* logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-hero-gradient text-sm font-extrabold text-white ring-1 ring-navy/10">
              AI
            </span>
            <span className="leading-tight">
              <span className="block text-[17px] font-extrabold text-navy">삼육대학교 AI 특강</span>
              <span className="block text-[10px] font-semibold tracking-[0.18em] text-ink-disabled">
                SAHMYOOK UNIVERSITY · GenAI INTENSIVE
              </span>
            </span>
          </Link>

          {/* desktop nav — dropdown parents */}
          <nav className="hidden items-center gap-2 lg:flex">
            {MENUS.map((m, i) => (
              <div
                key={m.label}
                className="relative"
                onMouseEnter={() => setDrop(i)}
                onMouseLeave={() => setDrop((d) => (d === i ? null : d))}
              >
                <Link
                  to={m.to}
                  className={`flex items-center gap-1.5 px-3 py-6 text-[15px] font-semibold transition-colors ${
                    isSectionActive(m) ? 'text-navy' : 'text-ink-muted hover:text-navy'
                  }`}
                >
                  {m.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" className={`transition-transform ${drop === i ? 'rotate-180' : ''}`} aria-hidden>
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div
                  className={`absolute left-1/2 top-full w-72 -translate-x-1/2 transition-all ${
                    drop === i ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  <div className="mt-1 overflow-hidden rounded-card border border-hairline bg-white p-1.5 shadow-card">
                    {m.children.map((c) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        className={({ isActive }) =>
                          `flex flex-col rounded-lg px-4 py-2.5 transition-colors ${isActive ? 'bg-royal-50' : 'hover:bg-surface'}`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={`text-sm font-semibold ${isActive ? 'text-royal' : 'text-ink-strong'}`}>{c.label}</span>
                            <span className="text-[11px] text-ink-disabled">{c.desc}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* right: CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/curriculum"
              className="hidden items-center gap-1.5 rounded-lg bg-navy px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-700 sm:inline-flex"
            >
              학습 시작 <span aria-hidden>↗</span>
            </Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-lg border border-hairline lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="메뉴"
            >
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-5 bg-navy transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-5 bg-navy transition ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-5 bg-navy transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <nav className="border-t border-hairline bg-white lg:hidden">
            <div className="container-page flex flex-col py-2">
              {MENUS.map((m, i) => (
                <div key={m.label}>
                  <button
                    onClick={() => setMobileSub((v) => (v === i ? null : i))}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-bold text-navy"
                  >
                    {m.label}
                    <svg width="14" height="14" viewBox="0 0 12 12" className={`transition-transform ${mobileSub === i ? 'rotate-180' : ''}`} aria-hidden>
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {mobileSub === i && (
                    <div className="ml-2 border-l border-hairline pl-3">
                      {m.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2.5 text-[15px] font-semibold ${isActive ? 'bg-royal-50 text-royal' : 'text-ink-muted'}`
                          }
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-1 flex items-center justify-between border-t border-hairline px-3 pt-3">
                {isLoggedIn ? (
                  <>
                    <span className="text-sm font-semibold text-navy">{profile?.name ?? '회원'}님</span>
                    <button onClick={signOut} className="text-sm text-ink-disabled">로그아웃</button>
                  </>
                ) : (
                  <button onClick={() => setLoginOpen(true)} className="text-sm font-semibold text-navy">
                    로그인 / 회원가입
                  </button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}
