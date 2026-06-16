import { useParams, Navigate, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { materials } from '../data/materials'

export default function SessionLearn() {
  const { slug, n } = useParams()
  const topic = materials.find((t) => t.slug === slug)
  if (!topic) return <Navigate to="/learn/automation/1" replace />

  const idx = Number(n) - 1
  const session = topic.sessions[idx]
  if (!session) return <Navigate to={`/learn/${topic.slug}/1`} replace />

  const localNo = idx + 1
  const prev = topic.sessions[idx - 1]
  const next = topic.sessions[idx + 1]
  const otherTopic = materials.find((t) => t.slug !== topic.slug)!

  return (
    <>
      <PageHero
        title={`${localNo}회차 · ${session.title}`}
        titleEn={`${topic.subtitle.toUpperCase()} · SESSION ${localNo}`}
        crumbs={[
          { label: '과정별 학습자료', to: `/learn/${topic.slug}/1` },
          { label: topic.title, to: `/learn/${topic.slug}/1` },
          { label: `${localNo}회차` },
        ]}
      />

      <div className="container-page py-14 md:py-16">
        {/* 과정(주제) 전환 */}
        <div className="mb-5 flex flex-wrap gap-2">
          {materials.map((t) => (
            <Link
              key={t.slug}
              to={`/learn/${t.slug}/1`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                t.slug === topic.slug
                  ? 'border-navy bg-navy text-white'
                  : 'border-hairline bg-white text-ink-muted hover:border-royal hover:text-royal'
              }`}
            >
              {t.topicNo === 1 ? '주제 ①' : '주제 ②'} {t.title}
            </Link>
          ))}
        </div>

        {/* 회차 전환 (해당 과정의 1~2회차) */}
        <div className="mb-8 flex flex-wrap gap-2">
          {topic.sessions.map((s, i) => (
            <Link
              key={s.no}
              to={`/learn/${topic.slug}/${i + 1}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === idx ? 'bg-royal-50 text-royal' : 'bg-surface text-ink-faded hover:text-navy'
              }`}
            >
              {i + 1}회차 · {s.date}
            </Link>
          ))}
        </div>

        {/* meta + goal */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
            {topic.topicNo === 1 ? '주제 ①' : '주제 ②'} · {topic.title}
          </span>
          <span className="rounded-full bg-royal-50 px-3 py-1 text-xs font-semibold text-royal">
            {session.date} · 18:30–22:00 (3.5H)
          </span>
        </div>

        <div className="mt-5 rounded-card border-l-4 border-royal bg-surface p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-royal">{localNo}회차 학습 목표</span>
          <p className="mt-1 leading-relaxed text-ink-strong">{session.goal}</p>
        </div>

        {/* learning blocks */}
        <div className="mt-8 space-y-6">
          {session.blocks.map((b, bi) => (
            <article key={bi} className="overflow-hidden rounded-card border border-hairline bg-white shadow-card">
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

        {/* prev / next (과정 내 회차 → 끝나면 다른 과정) */}
        <nav className="mt-14 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to={`/learn/${topic.slug}/${idx}`} className="group rounded-card border border-hairline p-5 transition-colors hover:border-royal">
              <span className="text-xs font-semibold text-ink-disabled">← 이전 회차</span>
              <div className="mt-1 font-bold text-ink-strong group-hover:text-royal">{idx}회차 · {prev.title}</div>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/learn/${topic.slug}/${idx + 2}`} className="group rounded-card border border-hairline p-5 text-right transition-colors hover:border-royal">
              <span className="text-xs font-semibold text-ink-disabled">다음 회차 →</span>
              <div className="mt-1 font-bold text-ink-strong group-hover:text-royal">{idx + 2}회차 · {next.title}</div>
            </Link>
          ) : (
            <Link to={`/learn/${otherTopic.slug}/1`} className="group rounded-card border border-hairline p-5 text-right transition-colors hover:border-royal">
              <span className="text-xs font-semibold text-ink-disabled">다음 과정 →</span>
              <div className="mt-1 font-bold text-ink-strong group-hover:text-royal">
                {otherTopic.topicNo === 1 ? '주제 ①' : '주제 ②'} {otherTopic.title}
              </div>
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}
