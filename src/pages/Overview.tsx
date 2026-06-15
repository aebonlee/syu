import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { course, sessions, topics } from '../data/curriculum'

const overviewRows: [string, string][] = [
  ['과정명', course.name],
  ['운영 기관', course.org],
  ['운영 시기', course.term],
  ['운영 방식', course.mode],
  ['총 교육시간', `${course.totalHours} · ${course.structure} · ${course.schedule}`],
  ['강의 구성', '2개 주제 · 4회차'],
  ['교육 대상', course.audience],
  ['주제 ①', `AI 에이전트 & n8n 기반 업무 자동화 (${topics[0].hours})`],
  ['주제 ②', `AI 멀티미디어 & 강의 콘텐츠 제작 (${topics[1].hours})`],
]

export default function Overview() {
  return (
    <>
      <PageHero
        title="과정 소개"
        titleEn="COURSE OVERVIEW"
        crumbs={[{ label: '과정 소개' }]}
      />

      <div className="container-page py-14 md:py-16">
        {/* 과정 개요 */}
        <section>
          <h2 className="section-title">과정 개요</h2>
          <div className="mt-6 overflow-hidden rounded-card border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody>
                {overviewRows.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? 'bg-surface' : 'bg-white'}>
                    <th className="w-40 border-b border-hairline px-5 py-4 align-top font-semibold text-navy md:w-52">
                      {k}
                    </th>
                    <td className="border-b border-hairline px-5 py-4 text-ink-muted">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 교육 목표 */}
        <section className="mt-14">
          <h2 className="section-title">교육 목표</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {course.goals.map((g, i) => (
              <div key={i} className="flex items-start gap-4 rounded-card border border-hairline bg-white p-5 shadow-card">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-royal-50 text-sm font-bold text-royal">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-ink-muted">{g}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 전체 커리큘럼 구조 */}
        <section className="mt-14">
          <h2 className="section-title">전체 커리큘럼 구조</h2>
          <div className="mt-6 overflow-x-auto rounded-card border border-hairline">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-5 py-3 font-semibold">회차</th>
                  <th className="px-5 py-3 font-semibold">주제</th>
                  <th className="px-5 py-3 font-semibold">모듈</th>
                  <th className="px-5 py-3 font-semibold">시간</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, i) => (
                  <tr key={s.no} className={i % 2 ? 'bg-surface' : 'bg-white'}>
                    <td className="whitespace-nowrap px-5 py-4 font-bold text-navy">{s.no}회차</td>
                    <td className="px-5 py-4 text-ink-muted">{s.topicNo === 1 ? '①' : '②'} {s.topicLabel}</td>
                    <td className="px-5 py-4 text-ink-strong">{s.module}</td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-royal">{s.hours}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <Link to={`/curriculum/${s.no}`} className="text-sm font-semibold text-royal hover:text-royal-600">
                        상세 →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <Link to="/curriculum" className="btn-primary">
            회차별 상세 커리큘럼 보기 <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </>
  )
}
