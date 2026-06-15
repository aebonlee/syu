// OG 이미지 생성 — sharp 로 SVG → PNG (1200×630)
// 실행: node scripts/make-og.mjs   (sharp 설치 필요)
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'og-image.png')

const FONT = 'Apple SD Gothic Neo, Pretendard, Noto Sans KR, sans-serif'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1B2A4A"/>
      <stop offset="1" stop-color="#0046C8"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.06"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- decorative circles -->
  <circle cx="1080" cy="120" r="220" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
  <circle cx="1150" cy="520" r="160" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
  <text x="980" y="600" font-family="${FONT}" font-size="300" font-weight="800" fill="#ffffff" fill-opacity="0.05" text-anchor="middle">AI</text>

  <!-- badge -->
  <rect x="90" y="96" width="78" height="78" rx="20" fill="url(#card)" stroke="#ffffff" stroke-opacity="0.25"/>
  <text x="129" y="150" font-family="${FONT}" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">AI</text>
  <text x="190" y="132" font-family="${FONT}" font-size="26" font-weight="700" fill="#ffffff">삼육대학교 · SAHMYOOK UNIVERSITY</text>
  <text x="190" y="164" font-family="${FONT}" font-size="20" font-weight="500" fill="#ffffff" fill-opacity="0.7">2026 가을학기 특강 · 비대면 VOD</text>

  <!-- title -->
  <text x="90" y="320" font-family="${FONT}" font-size="76" font-weight="800" fill="#ffffff">생성형 AI 실무 역량</text>
  <text x="90" y="408" font-family="${FONT}" font-size="76" font-weight="800" fill="#ffffff">강화 특강</text>

  <!-- subtitle -->
  <text x="92" y="470" font-family="${FONT}" font-size="28" font-weight="500" fill="#ffffff" fill-opacity="0.85">텍스트 한 줄에서 완성 콘텐츠까지, 직접 만든다</text>

  <!-- tag pills -->
  ${[
    ['n8n 자동화', 92, 540, 168],
    ['자연어 웹앱', 276, 540, 168],
    ['AI 이미지·디자인', 460, 540, 220],
    ['AI 영상·음성', 696, 540, 178],
    ['저작권 검수', 890, 540, 168],
  ].map(([t, x, y, w]) =>
    `<rect x="${x}" y="${y}" width="${w}" height="48" rx="24" fill="#ffffff" fill-opacity="0.16" stroke="#ffffff" stroke-opacity="0.3"/>
     <text x="${x + w / 2}" y="${y + 31}" font-family="${FONT}" font-size="22" font-weight="600" fill="#ffffff" text-anchor="middle">${t}</text>`,
  ).join('')}
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('✓ OG image written to', out)
