# syu · 삼육대학교 생성형 AI 실무 역량 강화 특강

삼육대학교 2026학년도 가을학기 특강 **「생성형 AI 실무 역량 강화 과정」** 학습사이트입니다.
비대면 녹화강의(VOD)를 위한 커리큘럼 안내·회차별 시간표·산출물·학습 도구를 제공합니다.

🔗 **배포 주소:** https://syu.dreamitbiz.com

## 과정 개요

| 항목 | 내용 |
| --- | --- |
| 과정명 | 생성형 AI 실무 역량 강화 특강 |
| 운영 시기 | 2026학년도 가을학기 (특강) |
| 운영 방식 | 비대면 녹화강의 (온라인 VOD) |
| 총 교육시간 | 14시간 · 4회차 × 3.5시간 · 평일 저녁 18:30–22:00 |
| 교육 대상 | 삼육대학교 재학생 (학부생) |
| 주제 ① | AI 에이전트 & n8n 기반 업무 자동화 (7H / 2회차) |
| 주제 ② | AI 멀티미디어 & 강의 콘텐츠 제작 (7H / 2회차) |

## 사이트 구성

- **과정 소개** — 과정 개요·교육 목표·전체 커리큘럼 구조
- **커리큘럼** — 주제별 회차 카드 + 회차 상세(세부 시간표·산출물·사용 도구)
- **산출물·기대효과** — 회차별 최종 산출물·기대 효과
- **학습 도구** — 과정에서 다루는 도구 모음(n8n·Lovable·Supabase·Midjourney·HeyGen 등)

## 기술 스택

- React 18 + TypeScript + Vite 5
- TailwindCSS 3 (KDN Vibe Coding 디자인 토큰 적용 — 딥 네이비/로열 블루)
- React Router 6
- GitHub Pages 자동 배포 (GitHub Actions)

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # 프로덕션 빌드 (tsc 타입체크 + vite build)
npm run preview  # 빌드 결과 미리보기
```

## 배포

`main` 브랜치 푸시 시 `.github/workflows/deploy.yml`이 자동으로 빌드 후 GitHub Pages에 배포합니다.
커스텀 도메인(`syu.dreamitbiz.com`) 사용으로 Vite `base`는 `/`입니다.

> 커리큘럼 내용은 `src/data/curriculum.ts` 단일 파일에서 관리합니다.
