// 삼육대학교 2026 가을학기 특강 — 생성형 AI 실무 역량 강화 과정
// 제안서 기반 커리큘럼 데이터 (단일 출처)

export interface TimeSlot {
  time: string      // "18:30–19:10"
  duration: string  // "40분"
  title: string
  desc: string
  isBreak?: boolean
}

export interface Session {
  no: number
  topicNo: 1 | 2
  topicLabel: string
  module: string
  title: string
  hours: string
  goal: string
  slots: TimeSlot[]
  deliverable: string
  tools: string[]
}

export const course = {
  name: '생성형 AI 실무 역량 강화 특강',
  org: '삼육대학교',
  orgEn: 'Sahmyook University',
  term: '2026학년도 가을학기 (특강)',
  mode: '비대면 녹화강의 (온라인 VOD)',
  totalHours: '14시간',
  structure: '4회차 × 3.5시간',
  schedule: '평일 저녁 18:30–22:00',
  audience: '삼육대학교 재학생 (학부생)',
  goals: [
    '반복 업무를 [입력–처리–출력]으로 분해하고 n8n으로 자동화 워크플로우를 직접 구현한다.',
    '코드를 직접 작성하지 않고 자연어로 웹앱과 문서 생성 파이프라인을 만들어 배포한다.',
    '생성형 AI로 이미지·디자인·영상·음성 콘텐츠를 목적에 맞게 제작한다.',
    '텍스트 한 줄에서 완성 콘텐츠로 이어지는 원스톱 제작 흐름과 저작권 검수 역량을 갖춘다.',
  ],
  effects: [
    '코딩 비전공 학생도 자연어 기반으로 자동화·웹앱·콘텐츠를 직접 제작할 수 있다.',
    '과제·스터디·동아리·취업 준비 등 실제 학업·생활 맥락에 곧바로 적용할 수 있다.',
    '비대면 녹화강의로 반복 학습이 가능하며, 회차별 산출물로 학습 성과를 즉시 확인할 수 있다.',
  ],
}

export const topics = [
  {
    no: 1 as const,
    title: 'AI 에이전트 & n8n 기반 업무 자동화',
    hours: '7시간 / 2회차',
    summary:
      '반복 업무를 자동화로 분해하고, n8n으로 워크플로우를 직접 구현한다. 자연어만으로 웹앱을 만들어 배포하고 문서 자동화 파이프라인까지 완성한다.',
    context:
      '학생에게 친숙한 자동화 대상 — 과제 마감 리마인더, 스터디 자료 자동 요약, 채용공고 모니터링, 동아리 폼 응답 처리.',
    accent: 'from-navy to-royal',
  },
  {
    no: 2 as const,
    title: 'AI 멀티미디어 & 강의 콘텐츠 제작',
    hours: '7시간 / 2회차',
    summary:
      '목적에 맞는 이미지·디자인·영상·음성 콘텐츠를 생성형 AI로 제작하고, 텍스트 한 줄에서 완성 콘텐츠로 이어지는 원스톱 파이프라인과 저작권 검수를 익힌다.',
    context:
      '학생 맥락 — 발표 자료, 동아리·행사 홍보물, SNS 카드뉴스, 취업용 개인 브랜딩 영상.',
    accent: 'from-royal to-navy',
  },
]

export const sessions: Session[] = [
  {
    no: 1,
    topicNo: 1,
    topicLabel: 'AI 에이전트 & n8n 자동화',
    module: '자동화 설계 + n8n 입문',
    title: '자동화 설계 기초 + n8n 입문',
    hours: '3.5H',
    goal: '반복 작업을 [입력–처리–출력]으로 분해하고, n8n으로 첫 워크플로우를 직접 실행해 본다.',
    slots: [
      {
        time: '18:30–19:10', duration: '40분',
        title: '자동화 개념과 AI 에이전트 이해',
        desc: '자동화 vs AI 에이전트 차이, "에이전트=판단하는 자동화", 어떤 일이 자동화에 적합한가(반복적·규칙적·다빈도)',
      },
      {
        time: '19:10–19:40', duration: '30분',
        title: '자동화 설계 실습 (종이 위에서)',
        desc: '내 일상/학업에서 반복 업무 3가지 찾기 → [입력–처리–출력] 단위 분해 → 워크플로우 다이어그램 그리기',
      },
      {
        time: '19:40–20:40', duration: '60분',
        title: 'n8n 입문 실습',
        desc: '계정 생성, 화면 구조(노드·트리거·연결), 첫 워크플로우: Google Forms(설문) → GPT(요약) → Gmail/Slack 발송',
      },
      { time: '20:40–20:50', duration: '10분', title: '휴식', desc: '', isBreak: true },
      {
        time: '20:50–21:40', duration: '50분',
        title: '트리거·조건 분기 실습',
        desc: '특정 조건 감지(Filter), Schedule 트리거로 "매일 아침 자동 실행", Sheets/Notion 외부 서비스 연결',
      },
      {
        time: '21:40–22:00', duration: '20분',
        title: '산출물 점검 & Q&A',
        desc: '각자 만든 워크플로우 1개 시연',
      },
    ],
    deliverable: '실제로 돌아가는 n8n 워크플로우 1개 (예: 폼 응답 → AI 요약 → 메일 발송)',
    tools: ['n8n', 'Google Forms', 'GPT', 'Gmail / Slack', 'Google Sheets', 'Notion'],
  },
  {
    no: 2,
    topicNo: 1,
    topicLabel: 'AI 에이전트 & n8n 자동화',
    module: '자연어 웹앱 + 문서 자동화',
    title: '자연어 기반 웹앱 + 문서 자동화 실전',
    hours: '3.5H',
    goal: '코드를 직접 짜지 않고 자연어로 웹앱을 만들고 배포하며, 문서 생성 자동화 파이프라인을 구현한다.',
    slots: [
      {
        time: '18:30–19:00', duration: '30분',
        title: '자연어 웹앱 개발 개념',
        desc: '프롬프트로 만드는 풀스택, 프론트/백엔드/DB가 뭔지 학부 눈높이로 정리',
      },
      {
        time: '19:00–20:00', duration: '60분',
        title: 'Lovable 웹앱 실습',
        desc: '자연어 입력으로 UI 생성(예: 스터디 출석 체크 앱, 설문 수집 앱), 화면 수정·반복 개선',
      },
      {
        time: '20:00–20:40', duration: '40분',
        title: 'Supabase 연동',
        desc: '데이터베이스·사용자 인증 붙이기(개념 위주 + 따라하기)',
      },
      { time: '20:40–20:50', duration: '10분', title: '휴식', desc: '', isBreak: true },
      {
        time: '20:50–21:30', duration: '40분',
        title: 'GitHub 연동 & 배포',
        desc: '버전 관리 기초, 실시간 서비스 배포해서 공유 가능한 URL 만들기',
      },
      {
        time: '21:30–22:00', duration: '30분',
        title: '문서 자동화 파이프라인',
        desc: '긴 글 입력 → AI 요약·재구성 → 보고서/슬라이드 자동 전환(Gamma 등), 회의록·과제 정리 시나리오 시연',
      },
    ],
    deliverable: '배포된 웹앱 URL 1개 + 문서 자동화 워크플로우 1개',
    tools: ['Lovable', 'Supabase', 'GitHub', 'Gamma'],
  },
  {
    no: 3,
    topicNo: 2,
    topicLabel: 'AI 멀티미디어 & 콘텐츠 제작',
    module: 'AI 이미지 & 디자인',
    title: 'AI 이미지 및 디자인',
    hours: '3.5H',
    goal: '목적에 맞는 고품질 이미지를 생성하고, 포스터·썸네일을 빠르게 디자인한다.',
    slots: [
      {
        time: '18:30–19:10', duration: '40분',
        title: '생성형 이미지 원리 & 프롬프트 작성법',
        desc: '좋은 이미지 프롬프트의 구성요소(피사체·스타일·구도·조명), 잘못된 예 vs 좋은 예 비교',
      },
      {
        time: '19:10–20:10', duration: '60분',
        title: '이미지 생성 실습',
        desc: 'Midjourney·DALL·E 3로 홍보/발표용 이미지 생성, 같은 프롬프트 변형하며 결과 비교',
      },
      { time: '20:10–20:20', duration: '10분', title: '휴식', desc: '', isBreak: true },
      {
        time: '20:20–21:20', duration: '60분',
        title: 'Canva AI · Adobe Firefly 디자인 실습',
        desc: '생성 이미지 활용해 포스터·SNS 썸네일·발표 표지 자동 제작, 템플릿 커스터마이징',
      },
      {
        time: '21:20–22:00', duration: '40분',
        title: '미니 프로젝트',
        desc: '"내 동아리/프로젝트 홍보 포스터" 1장 완성 & 공유',
      },
    ],
    deliverable: 'AI 이미지 3종 + 완성된 포스터 1장',
    tools: ['Midjourney', 'DALL·E 3', 'Canva AI', 'Adobe Firefly'],
  },
  {
    no: 4,
    topicNo: 2,
    topicLabel: 'AI 멀티미디어 & 콘텐츠 제작',
    module: 'AI 영상·음성 + 원스톱 파이프라인',
    title: 'AI 영상·음성 + 원스톱 콘텐츠 파이프라인',
    hours: '3.5H',
    goal: 'AI로 영상·음성을 제작하고, 텍스트 한 줄에서 콘텐츠로 이어지는 통합 흐름을 경험하며 저작권을 점검한다.',
    slots: [
      {
        time: '18:30–19:20', duration: '50분',
        title: 'AI 영상 제작 실습',
        desc: 'HeyGen으로 AI 아바타 발표 영상, Sora(또는 대체 툴)로 짧은 영상 클립 생성',
      },
      {
        time: '19:20–20:10', duration: '50분',
        title: 'AI 음성·자막 실습',
        desc: 'ElevenLabs 다국어 더빙·내레이션 생성, 영상 녹취 기반 자동 자막 생성',
      },
      { time: '20:10–20:20', duration: '10분', title: '휴식', desc: '', isBreak: true },
      {
        time: '20:20–21:20', duration: '60분',
        title: '원스톱 파이프라인 구축',
        desc: '"텍스트 한 줄 → 홍보 영상/카드뉴스"로 이어지는 통합 흐름 실습(이미지+음성+영상 결합)',
      },
      {
        time: '21:20–21:50', duration: '30분',
        title: '저작권 & 검수',
        desc: '생성물 저작권 가이드라인, AI 생성물 검수 체크리스트, 출처·표기 실습',
      },
      {
        time: '21:50–22:00', duration: '10분',
        title: '최종 산출물 공유 & 전체 과정 마무리',
        desc: '',
      },
    ],
    deliverable: 'AI 아바타 영상 1편 또는 카드뉴스 1세트 (음성·자막 포함)',
    tools: ['HeyGen', 'Sora', 'ElevenLabs', '자동 자막'],
  },
]

// 회차별 최종 산출물 (기대효과 섹션)
export const deliverables = sessions.map((s) => ({
  no: s.no,
  title: s.deliverable,
}))
