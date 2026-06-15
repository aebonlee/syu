import { useParams, Navigate, Link } from 'react-router-dom'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import { materials } from '../data/materials'

export default function Materials() {
  const { slug } = useParams()
  const topic = materials.find((m) => m.slug === slug)
  const [active, setActive] = useState(0)

  if (!topic) return <Navigate to="/materials/automation" replace />

  const other = materials.find((m) => m.slug !== topic.slug)!

  return (
    <>
      <PageHero
        title={topic.title}
        titleEn={topic.subtitle.toUpperCase()}
        crumbs={[{ label: '과정별 학습자료' }, { label: topic.title }]}
      />

      <div className="container-page py-14 md:py-16">
        {/* topic switch */}
        <div className="mb-8 flex flex-wrap gap-2">
          {materials.map((m) => (
            <Link
              key={m.slug}
              to={`/materials/${m.slug}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                m.slug === topic.slug
                  ? 'border-navy bg-navy text-white'
                  : 'border-hairline bg-white text-ink-muted hover:border-royal hover:text-royal'
              }`}
            >
              {m.topicNo === 1 ? '주제 ①' : '주제 ②'} {m.title}
            </Link>
          ))}
        </div>

        <p className="max-w-3xl leading-relaxed text-ink-muted">{topic.intro}</p>

        {/* session tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-hairline">
          {topic.sessions.map((s, i) => (
            <button
              key={s.no}
              onClick={() => setActive(i)}
              className={`relative -mb-px px-4 py-3 text-[15px] font-semibold transition-colors ${
                active === i ? 'text-navy' : 'text-ink-disabled hover:text-ink-muted'
              }`}
            >
              {s.no}회차 · {s.date} · {s.title}
              {active === i && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-royal" />}
            </button>
          ))}
        </div>

        {/* active session */}
        {topic.sessions.map((s, i) =>
          active !== i ? null : (
            <div key={s.no} className="mt-8">
              <div className="rounded-card border-l-4 border-royal bg-surface p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-royal">{s.no}회차 학습 목표</span>
                <p className="mt-1 leading-relaxed text-ink-strong">{s.goal}</p>
              </div>

              <div className="mt-8 space-y-6">
                {s.blocks.map((b, bi) => (
                  <article key={bi} className="overflow-hidden rounded-card border border-hairline bg-white shadow-card">
                    {/* block header */}
                    <header className="flex flex-wrap items-center gap-3 border-b border-hairline bg-white px-6 py-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-hero-gradient text-sm font-bold text-white">
                        {bi + 1}
                      </span>
                      <h3 className="text-lg font-bold text-ink-strong">{b.title}</h3>
                      <span className="ml-auto flex items-center gap-2 text-xs">
                        <span className="rounded bg-surface px-2 py-1 font-mono font-semibold text-navy">{b.time}</span>
                        <span className="rounded-full bg-royal-50 px-2.5 py-1 font-semibold text-royal">{b.duration}</span>
                      </span>
                    </header>

                    <div className="space-y-5 px-6 py-6">
                      <p className="leading-relaxed text-ink-muted">{b.overview}</p>

                      {/* key points */}
                      <div>
                        <h4 className="mb-2 text-sm font-bold text-navy">핵심 개념</h4>
                        <ul className="space-y-2">
                          {b.keyPoints.map((k, ki) => (
                            <li key={ki} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                              <span>{k}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* steps */}
                      {b.steps && (
                        <div className="rounded-lg bg-surface p-5">
                          <h4 className="mb-3 text-sm font-bold text-navy">따라하기</h4>
                          <ol className="space-y-2.5">
                            {b.steps.map((st, si) => (
                              <li key={si} className="flex gap-3 text-sm leading-relaxed text-ink-strong">
                                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white">
                                  {si + 1}
                                </span>
                                <span>{st}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      <div className="grid gap-3 sm:grid-cols-2">
                        {b.tip && (
                          <div className="rounded-lg border border-royal/20 bg-royal-50 p-4">
                            <span className="text-xs font-bold text-royal">💡 실무 팁</span>
                            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{b.tip}</p>
                          </div>
                        )}
                        {b.practice && (
                          <div className="rounded-lg border border-hairline bg-white p-4">
                            <span className="text-xs font-bold text-navy">✏️ 직접 해보기</span>
                            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{b.practice}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ),
        )}

        {/* other topic link */}
        <div className="mt-14 border-t border-hairline pt-8">
          <Link
            to={`/materials/${other.slug}`}
            className="group flex items-center justify-between rounded-card border border-hairline p-6 transition-colors hover:border-royal"
          >
            <div>
              <span className="text-xs font-semibold text-ink-disabled">다른 주제 학습자료 →</span>
              <div className="mt-1 font-bold text-ink-strong group-hover:text-royal">
                {other.topicNo === 1 ? '주제 ①' : '주제 ②'} {other.title}
              </div>
            </div>
            <span className="text-2xl text-ink-disabled group-hover:text-royal" aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </>
  )
}
