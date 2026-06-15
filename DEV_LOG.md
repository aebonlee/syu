# 개발 로그

## 2026-06-16 — 인증·학습자료·OG·디자인 보강 (v1.1.0)

- **Supabase 인증**: 공유 프로젝트 연동, 구글/카카오 OAuth 로그인·회원가입
  - `src/lib/supabase.ts`(PKCE, `syu_` 접두사 TABLES), `AuthContext`, `LoginModal`
  - `supabase/schema.sql` — `syu_profiles` 테이블 + RLS(본인만 접근) + updated_at 트리거, 접두사 일관 적용
  - `.env`/`.env.example` 추가(공유 Supabase URL/anon key), 정적배포용 fallback 상수
- **상단 메뉴 리디자인**: 참고 디자인(한빛대) 구조로 재작성 — 밝은 유틸리티 바 + 흰색 메인 네비, 원형 로고 배지, 2줄 워드마크
  - 드롭다운 2종: **과정 소개**(과정 개요·커리큘럼·산출물·학습 도구) / **과정별 학습자료**(주제①·②)
- **과정별 학습자료**(`/materials/:slug`): 주제①·② 각각 회차 탭 + 시간 블록별 상세(개요·핵심개념·따라하기·실무팁·직접해보기) — `src/data/materials.ts`
- **메인 히어로 SVG**: 우측에 2개 주제 일러스트(노드 워크플로우 / 이미지·영상·음성) 둥둥 떠 있는 float 애니메이션
- **OG 이미지**: sharp(임시 설치)로 SVG→PNG(1200×630) 생성, `og:*`/twitter 메타 태그 전체 추가(카카오 공유 디버거 대응)

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
