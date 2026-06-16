import { Link } from 'react-router-dom'
import { course } from '../data/curriculum'

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-hero-gradient text-sm font-extrabold text-white">
              AI
            </span>
            <span className="text-[15px] font-bold text-white">생성형 AI 실무 역량 강화 특강</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
            {course.org} {course.term} · {course.mode}.<br />
            반복 업무 자동화부터 AI 콘텐츠 제작까지, 매 회차 실제 산출물을 만드는 실습 중심 과정입니다.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">과정 소개</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/overview" className="hover:text-white">과정 개요</Link></li>
            <li><Link to="/curriculum" className="hover:text-white">커리큘럼</Link></li>
            <li><Link to="/outcomes" className="hover:text-white">산출물·기대효과</Link></li>
            <li><Link to="/tools" className="hover:text-white">학습 도구</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">과정별 학습자료</h4>
          <p className="mt-4 text-xs font-semibold text-white/45">주제 ① AI 에이전트 &amp; n8n 자동화</p>
          <ul className="mt-1.5 space-y-1.5 text-sm">
            <li><Link to="/learn/automation/1" className="hover:text-white">1회차 · 자동화 설계 + n8n 입문</Link></li>
            <li><Link to="/learn/automation/2" className="hover:text-white">2회차 · 자연어 웹앱 + 문서 자동화</Link></li>
          </ul>
          <p className="mt-3 text-xs font-semibold text-white/45">주제 ② AI 멀티미디어 &amp; 강의 콘텐츠 제작</p>
          <ul className="mt-1.5 space-y-1.5 text-sm">
            <li><Link to="/learn/multimedia/1" className="hover:text-white">1회차 · AI 이미지 및 디자인</Link></li>
            <li><Link to="/learn/multimedia/2" className="hover:text-white">2회차 · AI 영상·음성 + 파이프라인</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 sm:flex-row">
          <span>© 2026 {course.org} · {course.orgEn}. All rights reserved.</span>
          <span>Designed &amp; built by DreamIT Biz</span>
        </div>
      </div>
    </footer>
  )
}
