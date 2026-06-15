import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'

// 상위 메뉴마다 자기만의 전체 폭 드롭다운(메가패널)을 가짐
const MENUS = [
  {
    label: '과정 소개',
    to: '/overview',
    kicker: 'About',
    desc: '과정 개요부터 산출물·학습 도구까지 한눈에',
    children: [
      { to: '/overview', label: '과정 개요', desc: '개요·교육 목표·전체 구조' },
      { to: '/curriculum', label: '커리큘럼', desc: '회차별 세부 시간표' },
      { to: '/outcomes', label: '산출물·기대효과', desc: '회차별 산출물·기대 효과' },
      { to: '/tools', label: '학습 도구', desc: 'n8n·Lovable·HeyGen 등' },
    ],
    cta: { to: '/curriculum', kicker: 'View', title: '전체 커리큘럼\n한눈에 보기', link: '커리큘럼 보기' },
  },
  {
    label: '과정별 학습자료',
    to: '/learn/1',
    kicker: 'Materials',
    desc: '1~4회차 회차별 상세 학습 콘텐츠',
    children: [
      { to: '/learn/1', label: '1회차 · 자동화 설계 + n8n 입문', desc: '주제 ① · 9/14' },
      { to: '/learn/2', label: '2회차 · 자연어 웹앱 + 문서 자동화', desc: '주제 ① · 9/15' },
      { to: '/learn/3', label: '3회차 · AI 이미지 및 디자인', desc: '주제 ② · 9/21' },
      { to: '/learn/4', label: '4회차 · AI 영상·음성 + 파이프라인', desc: '주제 ② · 9/22' },
    ],
    cta: { to: '/learn/1', kicker: 'Start', title: '1회차부터\n바로 학습 시작', link: '1회차 학습 보기' },
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)               // mobile menu
  const [mobileSub, setMobileSub] = useState<number | null>(0)
  const [activeMenu, setActiveMenu] = useState<number | null>(null) // 호버 중인 상위 메뉴
  const [loginOpen, setLoginOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { isLoggedIn, profile, signOut } = useAuth()

  useEffect(() => { setOpen(false); setActiveMenu(null) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSectionActive = (m: typeof MENUS[number]) =>
    m.children.some((c) => pathname.startsWith(c.to.split('/').slice(0, 2).join('/')))

  const panel = activeMenu !== null ? MENUS[activeMenu] : null

  return (
    <header className="sticky top-0 z-50">
      {/* ───── 최상단 유틸리티 바 (검정 배경) ───── */}
      <div className="hidden bg-black text-white/65 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <span className="font-medium tracking-wide text-white/80">
            삼육대학교 <span className="px-1.5 text-white/30">·</span>
            <span className="tracking-[0.15em]">SAHMYOOK UNIVERSITY</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">2026 가을학기 특강</span>
            <span className="text-white/20">|</span>
            <span className="hidden sm:inline">비대면 VOD</span>
            <span className="text-white/20">|</span>
            {isLoggedIn ? (
              <span className="flex items-center gap-2">
                {profile?.avatar_url && <img src={profile.avatar_url} alt="" className="h-5 w-5 rounded-full" />}
                <span className="font-semibold text-white">{profile?.name ?? '회원'}</span>님
                <button onClick={signOut} className="ml-1 text-white/50 hover:text-white">로그아웃</button>
              </span>
            ) : (
              <button onClick={() => setLoginOpen(true)} className="font-semibold text-white hover:text-white/70">
                로그인 / 회원가입
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ───── 메인 네비 + 메뉴별 전체 폭 드롭다운 ───── */}
      <div className="relative" onMouseLeave={() => setActiveMenu(null)}>
        <div className={`border-b border-hairline bg-white transition-shadow ${scrolled || panel ? 'shadow-card' : ''}`}>
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

            {/* top-level labels — 각 메뉴 호버 시 자기 패널 오픈 */}
            <nav className="hidden h-full items-stretch gap-10 lg:flex">
              {MENUS.map((m, i) => (
                <Link
                  key={m.label}
                  to={m.to}
                  onMouseEnter={() => setActiveMenu(i)}
                  className={`flex items-center text-[16px] font-semibold transition-colors ${
                    isSectionActive(m) || activeMenu === i ? 'text-navy' : 'text-ink-muted hover:text-navy'
                  }`}
                >
                  {m.label}
                </Link>
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
        </div>

        {/* 선택된 메뉴의 전체 폭 드롭다운 패널 */}
        <div
          onMouseEnter={() => activeMenu !== null && setActiveMenu(activeMenu)}
          className={`absolute inset-x-0 top-full hidden border-b border-hairline bg-white shadow-card transition-all duration-200 lg:block ${
            panel ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          {panel && (
            <div className="container-page grid grid-cols-[220px_1fr_240px] gap-8 py-9">
              {/* left label */}
              <div className="border-r border-hairline pr-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-royal">{panel.kicker}</div>
                <h3 className="mt-2 text-xl font-extrabold leading-snug text-navy">{panel.label}</h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-disabled">{panel.desc}</p>
              </div>

              {/* children grid (2×2) */}
              <div className="grid grid-cols-2 gap-2">
                {panel.children.map((c) => (
                  <NavLink
                    key={c.to}
                    to={c.to}
                    className={({ isActive }) =>
                      `group flex flex-col justify-center rounded-card border px-4 py-3 transition-colors ${
                        isActive ? 'border-royal bg-royal-50' : 'border-hairline hover:border-royal hover:bg-surface'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`text-[14px] font-bold ${isActive ? 'text-royal' : 'text-ink-strong group-hover:text-navy'}`}>{c.label}</span>
                        <span className="mt-0.5 text-[11px] text-ink-disabled">{c.desc}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* right CTA card */}
              <Link
                to={panel.cta.to}
                className="flex flex-col justify-between rounded-card bg-hero-gradient p-5 text-white transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/70">{panel.cta.kicker}</div>
                  <p className="mt-2 whitespace-pre-line text-[15px] font-bold leading-snug">{panel.cta.title}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
                  {panel.cta.link} <span aria-hidden>↗</span>
                </span>
              </Link>
            </div>
          )}
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
                            `block rounded-lg px-3 py-2.5 text-[14px] font-semibold ${isActive ? 'bg-royal-50 text-royal' : 'text-ink-muted'}`
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
