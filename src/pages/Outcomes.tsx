import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { course, sessions } from '../data/curriculum'

export default function Outcomes() {
  return (
    <>
      <PageHero
        title="산출물 · 기대효과"
        titleEn="OUTCOMES & IMPACT"
        crumbs={[{ label: '산출물·기대효과' }]}
      />

      <div className="container-page py-14 md:py-16">
        <p className="max-w-3xl leading-relaxed text-ink-muted">
          본 과정은 매 회차 실제 결과물을 산출하는 실습 중심으로 구성되며, 수강생은 4회차 종료 시
          아래 산출물을 <strong className="text-navy">개인 포트폴리오</strong>로 확보합니다.
        </p>

        {/* 회차별 최종 산출물 */}
        <section className="mt-12">
          <h2 className="section-title">회차별 최종 산출물</h2>
          <div className="mt-6 space-y-4">
            {sessions.map((s) => (
              <div key={s.no} className="flex flex-col gap-4 rounded-card border border-hairline bg-white p-6 shadow-card sm:flex-row sm:items-center">
                <div className="flex items-center gap-4 sm:w-48 sm:shrink-0">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-hero-gradient text-lg font-extrabold text-white">
                    {s.no}
                  </span>
                  <div>
                    <div className="font-bold text-ink-strong">{s.no}회차</div>
                    <div className="text-xs text-ink-disabled">{s.module}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-navy">{s.deliverable}</p>
                </div>
                <Link to={`/curriculum/${s.no}`} className="text-sm font-semibold text-royal hover:text-royal-600 sm:shrink-0">
                  회차 보기 →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 기대효과 */}
        <section className="mt-14">
          <h2 className="section-title">기대 효과</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {course.effects.map((e, i) => (
              <div key={i} className="rounded-card border border-hairline bg-surface p-6">
                <div className="text-3xl font-extrabold text-royal/30">0{i + 1}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{e}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 마무리 CTA */}
        <div className="mt-16 overflow-hidden rounded-hero bg-hero-gradient px-8 py-12 text-center text-white shadow-hero">
          <h2 className="text-2xl font-extrabold text-white">실습으로 완성하는 4회차 14시간</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            비대면 녹화강의로 반복 학습이 가능하며, 회차별 산출물로 학습 성과를 즉시 확인할 수 있습니다.
          </p>
          <Link to="/curriculum" className="btn-primary mt-7 bg-white !text-navy hover:!bg-white/90">
            커리큘럼으로 돌아가기 <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </>
  )
}
