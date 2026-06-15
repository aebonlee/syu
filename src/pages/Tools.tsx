import PageHero from '../components/PageHero'

interface Tool {
  name: string
  desc: string
  url: string
  session: string
}

const groups: { category: string; topic: string; tools: Tool[] }[] = [
  {
    category: '업무 자동화 · 에이전트',
    topic: '주제 1',
    tools: [
      { name: 'n8n', desc: '노드 기반 워크플로우 자동화 — 폼·AI·메일을 연결', url: 'https://n8n.io', session: '1회차' },
      { name: 'Google Forms', desc: '설문·응답 수집 트리거 소스', url: 'https://forms.google.com', session: '1회차' },
      { name: 'Google Sheets', desc: '데이터 적재·조건 분기 연동', url: 'https://sheets.google.com', session: '1회차' },
      { name: 'Notion', desc: '외부 서비스 연결·정리 자동화', url: 'https://notion.so', session: '1회차' },
    ],
  },
  {
    category: '자연어 웹앱 · 문서 자동화',
    topic: '주제 1',
    tools: [
      { name: 'Lovable', desc: '자연어 프롬프트로 풀스택 웹앱 생성', url: 'https://lovable.dev', session: '2회차' },
      { name: 'Supabase', desc: '데이터베이스·사용자 인증 백엔드', url: 'https://supabase.com', session: '2회차' },
      { name: 'GitHub', desc: '버전 관리 & 배포 — 공유 URL 생성', url: 'https://github.com', session: '2회차' },
      { name: 'Gamma', desc: '긴 글 → 보고서·슬라이드 자동 전환', url: 'https://gamma.app', session: '2회차' },
    ],
  },
  {
    category: 'AI 이미지 · 디자인',
    topic: '주제 2',
    tools: [
      { name: 'Midjourney', desc: '고품질 홍보·발표용 이미지 생성', url: 'https://midjourney.com', session: '3회차' },
      { name: 'DALL·E 3', desc: '프롬프트 변형 비교, 빠른 시안', url: 'https://openai.com/dall-e-3', session: '3회차' },
      { name: 'Canva AI', desc: '포스터·SNS 썸네일·표지 디자인', url: 'https://canva.com', session: '3회차' },
      { name: 'Adobe Firefly', desc: '상업적 활용 가능한 생성형 디자인', url: 'https://firefly.adobe.com', session: '3회차' },
    ],
  },
  {
    category: 'AI 영상 · 음성',
    topic: '주제 2',
    tools: [
      { name: 'HeyGen', desc: 'AI 아바타 발표·소개 영상 제작', url: 'https://heygen.com', session: '4회차' },
      { name: 'Sora', desc: '텍스트 → 짧은 영상 클립 생성', url: 'https://openai.com/sora', session: '4회차' },
      { name: 'ElevenLabs', desc: '다국어 더빙·내레이션 음성 합성', url: 'https://elevenlabs.io', session: '4회차' },
    ],
  },
]

export default function Tools() {
  return (
    <>
      <PageHero
        title="학습 도구"
        titleEn="TOOLS & RESOURCES"
        crumbs={[{ label: '학습 도구' }]}
      />

      <div className="container-page py-14 md:py-16">
        <p className="max-w-3xl leading-relaxed text-ink-muted">
          과정에서 다루는 도구 모음입니다. 대부분 무료 또는 체험 플랜으로 시작할 수 있으며,
          회차별로 따라하기 실습에 사용됩니다. <span className="text-ink-disabled">(도구는 강의 시점에 따라 대체 툴로 안내될 수 있습니다.)</span>
        </p>

        {groups.map((g) => (
          <section key={g.category} className="mt-12">
            <div className="flex items-center gap-3">
              <h2 className="section-title">{g.category}</h2>
              <span className="rounded-full bg-royal-50 px-3 py-1 text-xs font-semibold text-royal">{g.topic}</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {g.tools.map((t) => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-col rounded-card border border-hairline bg-white p-5 shadow-card transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-ink-strong group-hover:text-royal">{t.name}</h3>
                    <span className="text-ink-disabled transition-transform group-hover:translate-x-0.5 group-hover:text-royal" aria-hidden>↗</span>
                  </div>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-faded">{t.desc}</p>
                  <span className="mt-3 inline-block w-fit rounded-full border border-hairline bg-surface px-2.5 py-0.5 text-[11px] font-medium text-ink-disabled">
                    {t.session}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
