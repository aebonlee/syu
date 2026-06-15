# 개발 로그

## 2026-06-15 — 초기 구축 (v1.0.0)

삼육대학교 2026 가을학기 특강 「생성형 AI 실무 역량 강화 과정」 학습사이트 신규 제작.

### 작업 내용
- **스캐폴딩**: React 18 + TypeScript + Vite 5 + TailwindCSS 3 + React Router 6
- **디자인**: `~/dev/대학사이트` 의 KDN Vibe Coding 디자인 시스템 토큰 이식
  - 딥 네이비(`#1B2A4A`) + 로열 블루(`#0046C8`) 팔레트, 네이비→블루 그라데이션 히어로
  - Pretendard 폰트, 좌측 액센트 룰 섹션 타이틀, 카드/pill 태그, 상단 유틸리티 바 + 메인 네비
- **페이지 구성**
  - `Home` — 풀블리드 히어로 + 통계 스트립, 2개 주제 카드, 4회차 미리보기, 산출물, CTA
  - `Overview` — 과정 개요표·교육 목표·전체 커리큘럼 구조표
  - `Curriculum` — 주제별 회차 카드 그리드
  - `SessionDetail` (`/curriculum/:no`) — 회차별 세부 시간표(휴식 구분), 산출물·도구 사이드바, 이전/다음 네비
  - `Outcomes` — 회차별 최종 산출물·기대 효과
  - `Tools` — 과정 도구 모음(외부 링크, 회차 태그)
- **데이터**: `src/data/curriculum.ts` 단일 출처로 4회차 상세 시간표 전체 반영
- **배포**: GitHub Actions(`deploy.yml`) → GitHub Pages, SPA 404 폴백, 커스텀 도메인 `syu.dreamitbiz.com`(base `/`, CNAME)

### 검증
- `npm run build` 통과 (tsc 타입체크 0 에러)
- Chromium 헤드리스 스크린샷으로 Home/Curriculum/SessionDetail 디자인 육안 확인 — 레퍼런스와 일치
