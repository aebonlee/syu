/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // KDN Vibe Coding design tokens (대학사이트 reference)
        navy: {
          DEFAULT: '#1B2A4A', // deep navy — PRIMARY
          700: '#14213A',     // darker navy for press
        },
        royal: {
          DEFAULT: '#0046C8', // royal blue — ACCENT
          600: '#003BA8',     // hover
          50: '#E7EEFA',      // tinted surface
        },
        surface: '#F4F6FA',
        hairline: '#E5E9F2',
        ink: {
          strong: '#111111',
          DEFAULT: '#1A1A1A',
          muted: '#374151',
          faded: '#4B5563',
          disabled: '#6B7280',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable', 'Pretendard', '-apple-system',
          'BlinkMacSystemFont', 'Segoe UI', 'Apple SD Gothic Neo',
          'Noto Sans KR', 'Malgun Gothic', 'sans-serif',
        ],
        mono: ['JetBrains Mono', 'D2Coding', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '12px',
        hero: '16px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(27, 42, 74, 0.08)',
        hero: '0 12px 32px rgba(0, 70, 200, 0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1B2A4A 0%, #0046C8 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-a': {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-18px) rotate(-2deg)' },
        },
        'float-b': {
          '0%, 100%': { transform: 'translateY(0) rotate(3deg)' },
          '50%': { transform: 'translateY(-22px) rotate(3deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.4,0,0.2,1) both',
        'float-a': 'float-a 6s ease-in-out infinite',
        'float-b': 'float-b 7.5s ease-in-out infinite 0.8s',
      },
    },
  },
  plugins: [],
}
