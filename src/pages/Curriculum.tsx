import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { topics, sessions } from '../data/curriculum'

export default function Curriculum() {
  return (
    <>
      <PageHero
        title="커리큘럼"
        titleEn="CURRICULUM"
        crumbs={[{ label: '커리큘럼' }]}
      />

      <div className="container-page py-14 md:py-16">
        {topics.map((t) => {
          const list = sessions.filter((s) => s.topicNo === t.no)
          return (
            <section key={t.no} className="mb-16 last:mb-0">
              {/* topic header */}
              <div className="overflow-hidden rounded-hero bg-hero-gradient p-7 text-white md:p-9">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white/70">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 text-sm font-bold">
                    {t.no}
                  </span>
                  주제 {t.no} · {t.hours}
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-white md:text-3xl">{t.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">{t.summary}</p>
                <p className="mt-4 rounded-lg bg-white/10 px-4 py-3 text-xs leading-relaxed text-white/75">
                  {t.context}
                </p>
              </div>

              {/* sessions */}
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {list.map((s) => (
                  <Link
                    key={s.no}
                    to={`/curriculum/${s.no}`}
                    className="group flex flex-col rounded-card border border-hairline bg-white p-6 shadow-card transition-transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-royal">{s.no}회차 · {s.date}</span>
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink-faded">
                        {s.hours}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-ink-strong">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{s.goal}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.tools.slice(0, 5).map((tool) => (
                        <span key={tool} className="rounded-full border border-hairline bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-faded">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 rounded-lg bg-royal-50 px-4 py-3 text-xs leading-relaxed text-navy">
                      <span className="font-bold">산출물</span> · {s.deliverable}
                    </div>
                    <span className="mt-4 text-sm font-semibold text-royal group-hover:text-royal-600">
                      회차 상세 보기 →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
