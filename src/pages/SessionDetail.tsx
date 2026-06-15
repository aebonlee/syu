import { useParams, Link, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { sessions } from '../data/curriculum'

export default function SessionDetail() {
  const { no } = useParams()
  const session = sessions.find((s) => String(s.no) === no)

  if (!session) return <Navigate to="/curriculum" replace />

  const idx = sessions.indexOf(session)
  const prev = sessions[idx - 1]
  const next = sessions[idx + 1]

  // active learning minutes (exclude breaks)
  return (
    <>
      <PageHero
        title={`${session.no}회차 · ${session.title}`}
        titleEn={`SESSION ${String(session.no).padStart(2, '0')}`}
        crumbs={[{ label: '커리큘럼', to: '/curriculum' }, { label: `${session.no}회차` }]}
      />

      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* main: timetable */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                주제 {session.topicNo} · {session.topicLabel}
              </span>
              <span className="rounded-full bg-royal-50 px-3 py-1 text-xs font-semibold text-royal">
                {session.module} · {session.hours}
              </span>
            </div>

            <div className="mt-5 rounded-card border-l-4 border-royal bg-surface p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-royal">학습 목표</span>
              <p className="mt-1 leading-relaxed text-ink-strong">{session.goal}</p>
            </div>

            <h2 className="section-title mt-10">세부 시간표</h2>
            <ol className="mt-6 space-y-3">
              {session.slots.map((slot, i) =>
                slot.isBreak ? (
                  <li key={i} className="flex items-center gap-4 py-1 pl-1 text-sm text-ink-disabled">
                    <span className="font-mono text-xs">{slot.time}</span>
                    <span className="h-px flex-1 bg-hairline" />
                    <span className="rounded-full bg-surface px-3 py-1 text-xs">☕ 휴식 {slot.duration}</span>
                    <span className="h-px flex-1 bg-hairline" />
                  </li>
                ) : (
                  <li key={i} className="flex gap-4 rounded-card border border-hairline bg-white p-5 shadow-card">
                    <div className="w-24 shrink-0">
                      <div className="font-mono text-sm font-semibold text-navy">{slot.time}</div>
                      <div className="mt-1 inline-block rounded bg-royal-50 px-2 py-0.5 text-[11px] font-semibold text-royal">
                        {slot.duration}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-bold text-ink-strong">{slot.title}</h3>
                      {slot.desc && <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{slot.desc}</p>}
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>

          {/* aside */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card bg-hero-gradient p-6 text-white shadow-hero">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">이 회차의 산출물</span>
              <p className="mt-2 font-semibold leading-relaxed">{session.deliverable}</p>
            </div>

            <div className="card">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-disabled">사용 도구</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {session.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-hairline bg-white px-3 py-1 text-xs font-medium text-navy">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-disabled">회차 정보</span>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ink-faded">교육시간</dt><dd className="font-semibold text-ink-strong">{session.hours}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-faded">시간대</dt><dd className="font-semibold text-ink-strong">18:30–22:00</dd></div>
                <div className="flex justify-between"><dt className="text-ink-faded">방식</dt><dd className="font-semibold text-ink-strong">비대면 VOD</dd></div>
              </dl>
            </div>
          </aside>
        </div>

        {/* prev / next */}
        <nav className="mt-14 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to={`/curriculum/${prev.no}`} className="group rounded-card border border-hairline p-5 transition-colors hover:border-royal">
              <span className="text-xs font-semibold text-ink-disabled">← 이전 회차</span>
              <div className="mt-1 font-bold text-ink-strong group-hover:text-royal">{prev.no}회차 · {prev.title}</div>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/curriculum/${next.no}`} className="group rounded-card border border-hairline p-5 text-right transition-colors hover:border-royal">
              <span className="text-xs font-semibold text-ink-disabled">다음 회차 →</span>
              <div className="mt-1 font-bold text-ink-strong group-hover:text-royal">{next.no}회차 · {next.title}</div>
            </Link>
          ) : (
            <Link to="/outcomes" className="group rounded-card border border-hairline p-5 text-right transition-colors hover:border-royal">
              <span className="text-xs font-semibold text-ink-disabled">과정 마무리 →</span>
              <div className="mt-1 font-bold text-ink-strong group-hover:text-royal">산출물 · 기대효과</div>
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}
