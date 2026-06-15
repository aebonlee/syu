import { Link } from 'react-router-dom'
import { course, topics, sessions, deliverables } from '../data/curriculum'
import HeroArt from '../components/HeroArt'

const stats = [
  { num: course.totalHours, label: '총 교육시간' },
  { num: '4', label: '회차' },
  { num: '2', label: '핵심 주제' },
  { num: 'VOD', label: '비대면 녹화강의' },
]

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute right-[-10%] top-[-20%] h-[34rem] w-[34rem] rounded-full border border-white/10" />
          <div className="absolute bottom-0 left-1/2 text-[18rem] font-black leading-none tracking-tighter text-white/[0.04]">
            AI
          </div>
        </div>

        <div className="container-page relative grid items-center gap-10 py-20 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold tracking-wide text-white/80 animate-fade-up">
              <span className="h-px w-8 bg-white/50" />
              {course.org} · {course.term}
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.15] md:text-6xl animate-fade-up">
              텍스트 한 줄에서<br />
              <span className="text-white">완성 콘텐츠</span>까지, 직접 만든다
            </h1>
            <p className="mt-5 text-lg font-medium text-white/85 md:text-xl">
              Generative AI for Real-World Productivity
            </p>
            <p className="mt-4 max-w-2xl text-white/70">
              코드를 직접 짜지 않아도 됩니다. 자연어만으로 업무를 자동화하고, 웹앱을 배포하고,
              이미지·영상·음성 콘텐츠를 제작하는 <strong className="text-white">실습 중심 4회차 특강</strong>입니다.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {['n8n 자동화', '자연어 웹앱', 'AI 이미지·디자인', 'AI 영상·음성', '저작권 검수'].map((t) => (
                <span key={t} className="hero-tag">{t}</span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/curriculum" className="btn-primary bg-white !text-navy hover:!bg-white/90">
                커리큘럼 보기 <span aria-hidden>→</span>
              </Link>
              <Link to="/overview" className="btn-ghost">과정 소개</Link>
            </div>
          </div>

          {/* floating SVG illustrations — 2개 주제 */}
          <div className="hidden lg:block">
            <HeroArt />
          </div>
        </div>

        {/* stat strip */}
        <div className="relative border-t border-white/10 bg-navy-700/40">
          <div className="container-page grid grid-cols-2 gap-y-6 py-7 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-white md:text-3xl">{s.num}</div>
                <div className="mt-1 text-xs text-white/60 md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 두 가지 주제 ───────── */}
      <section className="container-page py-16 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">두 가지 핵심 주제</h2>
            <p className="mt-3 text-ink-faded">업무 자동화부터 멀티미디어 콘텐츠 제작까지, 생성형 AI 실무의 두 축을 다룹니다.</p>
          </div>
          <Link to="/curriculum" className="text-sm font-semibold text-royal hover:text-royal-600">
            전체 커리큘럼 보기 +
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {topics.map((t) => (
            <div key={t.no} className="group relative overflow-hidden rounded-card border border-hairline bg-white p-7 shadow-card transition-transform hover:-translate-y-1">
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${t.accent}`} />
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-50 text-lg font-extrabold text-royal">
                  {t.no}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-disabled">
                  주제 {t.no} · {t.hours}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink-strong">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t.summary}</p>
              <p className="mt-4 rounded-lg bg-surface px-4 py-3 text-xs leading-relaxed text-ink-faded">
                {t.context}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 4회차 미리보기 ───────── */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-page">
          <h2 className="section-title">4회차 학습 여정</h2>
          <p className="mt-3 text-ink-faded">매 회차 3.5시간, {course.schedule}. 회차마다 실제 작동하는 산출물을 완성합니다.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sessions.map((s) => (
              <Link
                key={s.no}
                to={`/curriculum/${s.no}`}
                className="group flex flex-col rounded-card border border-hairline bg-white p-6 transition-shadow hover:shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-navy/15 transition-colors group-hover:text-royal/30">
                    {String(s.no).padStart(2, '0')}
                  </span>
                  <span className="rounded-full bg-royal-50 px-3 py-1 text-xs font-semibold text-royal">
                    {s.hours}
                  </span>
                </div>
                <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-disabled">
                  주제 {s.topicNo} · {s.date}
                </span>
                <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink-strong">{s.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-ink-faded">{s.goal}</p>
                <span className="mt-4 text-sm font-semibold text-royal group-hover:text-royal-600">
                  자세히 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 산출물 ───────── */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="section-title">손에 남는 산출물</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              본 과정은 매 회차 실제 결과물을 산출하는 실습 중심으로 구성됩니다.
              4회차 종료 시 아래 산출물을 <strong className="text-navy">개인 포트폴리오</strong>로 확보합니다.
            </p>
            <Link to="/outcomes" className="btn-primary mt-6">
              기대효과 자세히 보기 <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className="space-y-3">
            {deliverables.map((d) => (
              <li key={d.no} className="flex items-start gap-4 rounded-card border border-hairline bg-white p-5 shadow-card">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-hero-gradient text-sm font-bold text-white">
                  {d.no}
                </span>
                <p className="pt-1 text-sm font-medium text-ink-strong">{d.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-hero bg-hero-gradient px-8 py-14 text-center text-white shadow-hero md:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/15" />
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">지금, AI로 직접 만들어 보세요</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            과제·스터디·동아리·취업 준비 — 실제 학업과 생활 맥락에 곧바로 적용할 수 있습니다.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/curriculum/1" className="btn-primary bg-white !text-navy hover:!bg-white/90">
              1회차부터 시작 <span aria-hidden>→</span>
            </Link>
            <Link to="/tools" className="btn-ghost">학습 도구 살펴보기</Link>
          </div>
        </div>
      </section>
    </>
  )
}
