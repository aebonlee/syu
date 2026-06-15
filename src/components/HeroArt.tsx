// 메인 히어로 우측 — 2개 주제를 표현한 둥둥 떠 있는 SVG 일러스트

/** 주제 ① AI 에이전트 & n8n 업무 자동화 — 노드 워크플로우 + 기어 */
function AutomationCard() {
  return (
    <div className="animate-float-a rounded-2xl border border-white/25 bg-white/10 p-5 shadow-hero backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#22d3a6]" />
        <span className="text-[11px] font-semibold tracking-wide text-white/80">주제 ① · n8n 자동화</span>
      </div>
      <svg width="200" height="132" viewBox="0 0 200 132" fill="none" aria-hidden>
        {/* connections */}
        <path d="M44 34 H88 a10 10 0 0 1 10 10 V62" stroke="#9bb8ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M44 98 H88 a10 10 0 0 0 10-10 V70" stroke="#9bb8ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M122 66 H156" stroke="#9bb8ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* trigger node (top-left) */}
        <rect x="10" y="20" width="34" height="28" rx="7" fill="#0046C8" />
        <circle cx="27" cy="34" r="6" fill="#fff" />
        <path d="M27 31v3l2 2" stroke="#0046C8" strokeWidth="1.6" strokeLinecap="round" />
        {/* input node (bottom-left) */}
        <rect x="10" y="84" width="34" height="28" rx="7" fill="#1B2A4A" stroke="#9bb8ff" strokeWidth="1.5" />
        <rect x="19" y="94" width="16" height="3" rx="1.5" fill="#9bb8ff" />
        <rect x="19" y="100" width="11" height="3" rx="1.5" fill="#9bb8ff" />
        {/* AI process node (center) — gear */}
        <rect x="84" y="46" width="38" height="40" rx="9" fill="#fff" />
        <g transform="translate(103 66)" fill="#0046C8">
          <circle r="6.5" fill="none" stroke="#0046C8" strokeWidth="2.4" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x="-1.4" y="-11.5" width="2.8" height="4.5" rx="1" transform={`rotate(${i * 45})`} />
          ))}
        </g>
        {/* output node (right) */}
        <rect x="156" y="52" width="34" height="28" rx="7" fill="#0046C8" />
        <path d="M163 60l10 7 10-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="163" y="60" width="20" height="13" rx="2.5" stroke="#fff" strokeWidth="2" fill="none" />
        {/* flowing dots */}
        <circle cx="70" cy="34" r="2.6" fill="#22d3a6" />
        <circle cx="140" cy="66" r="2.6" fill="#22d3a6" />
      </svg>
      <div className="mt-2 flex gap-1.5">
        {['입력', '처리', '출력'].map((t) => (
          <span key={t} className="rounded-md bg-white/15 px-2 py-1 text-[10px] font-medium text-white/85">{t}</span>
        ))}
      </div>
    </div>
  )
}

/** 주제 ② AI 멀티미디어 & 콘텐츠 제작 — 이미지/영상/음성 */
function MultimediaCard() {
  return (
    <div className="animate-float-b rounded-2xl border border-white/25 bg-white/10 p-5 shadow-hero backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffb020]" />
        <span className="text-[11px] font-semibold tracking-wide text-white/80">주제 ② · AI 콘텐츠</span>
      </div>
      <svg width="200" height="132" viewBox="0 0 200 132" fill="none" aria-hidden>
        {/* image frame */}
        <rect x="10" y="14" width="86" height="62" rx="9" fill="#fff" />
        <circle cx="32" cy="34" r="7" fill="#ffb020" />
        <path d="M18 64l18-20 12 13 9-8 21 15" stroke="#0046C8" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* video card with play */}
        <rect x="106" y="14" width="84" height="62" rx="9" fill="#0046C8" />
        <circle cx="148" cy="45" r="16" fill="#fff" />
        <path d="M144 38l11 7-11 7z" fill="#0046C8" />
        {/* audio waveform bar */}
        <rect x="10" y="92" width="180" height="30" rx="9" fill="#fff" />
        <g fill="#0046C8">
          {[8, 16, 11, 22, 14, 26, 18, 10, 20, 13, 24, 9, 17, 12].map((h, i) => (
            <rect key={i} x={22 + i * 11} y={107 - h / 2} width="4" height={h} rx="2" />
          ))}
        </g>
        <circle cx="178" cy="107" r="3" fill="#ffb020" />
      </svg>
      <div className="mt-2 flex gap-1.5">
        {['이미지', '영상', '음성'].map((t) => (
          <span key={t} className="rounded-md bg-white/15 px-2 py-1 text-[10px] font-medium text-white/85">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function HeroArt() {
  return (
    <div className="pointer-events-none relative h-full min-h-[340px] w-full">
      <div className="absolute right-6 top-2 w-[230px]">
        <AutomationCard />
      </div>
      <div className="absolute bottom-2 right-28 w-[230px]">
        <MultimediaCard />
      </div>
      {/* soft glow behind cards */}
      <div className="absolute right-20 top-24 -z-10 h-56 w-56 rounded-full bg-royal/30 blur-3xl" />
    </div>
  )
}
