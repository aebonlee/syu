import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const nav = [
  { to: '/overview', label: '과정 소개' },
  { to: '/curriculum', label: '커리큘럼' },
  { to: '/outcomes', label: '산출물·기대효과' },
  { to: '/tools', label: '학습 도구' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden bg-navy-700 text-white/80 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <span className="tracking-wide">삼육대학교 · SAHMYOOK UNIVERSITY</span>
          <div className="flex items-center gap-4">
            <span>2026 가을학기 특강</span>
            <span className="text-white/30">|</span>
            <span>비대면 VOD</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-shadow ${
          scrolled ? 'border-hairline bg-white/95 shadow-card backdrop-blur' : 'border-transparent bg-white'
        }`}
      >
        <div className="container-page flex h-[68px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-hero-gradient text-sm font-extrabold text-white">
              AI
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-bold text-ink-strong">생성형 AI 실무 역량 강화 특강</span>
              <span className="block text-[11px] font-medium tracking-wide text-ink-disabled">
                SAHMYOOK UNIVERSITY · GenAI INTENSIVE
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-[15px] font-semibold transition-colors ${
                    isActive ? 'text-royal' : 'text-ink-muted hover:text-navy'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/curriculum"
              className="ml-2 inline-flex items-center gap-1 rounded-lg bg-navy px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-navy-700"
            >
              학습 시작 <span aria-hidden>↗</span>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-hairline md:hidden"
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

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-hairline bg-white md:hidden">
            <div className="container-page flex flex-col py-2">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-[15px] font-semibold ${
                      isActive ? 'bg-royal-50 text-royal' : 'text-ink-muted'
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
