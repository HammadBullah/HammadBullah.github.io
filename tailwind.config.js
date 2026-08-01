/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        graphite: {
          950: '#080A0D',
          900: '#0B0D10',
          800: '#111418',
          700: '#171B20',
          600: '#1F242B',
          500: '#2A3038',
          400: '#3D4550',
          300: '#5B6470',
          200: '#88909B',
          100: '#C4C9D0',
          50:  '#E8EAED',
        },
        cyan:    { DEFAULT: '#00D4FF' },
        violet:  { DEFAULT: '#8A5CFF' },
        orange:  { DEFAULT: '#FF7A3D' },
        magenta: { DEFAULT: '#FF3DBB' },
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bouncy': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow-cyan':   '0 0 30px rgba(0,212,255,0.35), 0 0 60px rgba(0,212,255,0.15)',
        'glow-violet': '0 0 30px rgba(138,92,255,0.35), 0 0 60px rgba(138,92,255,0.15)',
        'glow-orange': '0 0 30px rgba(255,122,61,0.35), 0 0 60px rgba(255,122,61,0.12)',
      },
      keyframes: {
        'breathe':   { '0%,100%': { opacity: '0.6', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.08)' } },
        'pulse-glow':{ '0%,100%': { boxShadow: '0 0 0 0 rgba(0,212,255,0.5)' }, '50%': { boxShadow: '0 0 0 8px rgba(0,212,255,0)' } },
        'float-slow':{ '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'breathe':   'breathe 3s ease-in-out infinite',
        'pulse-glow':'pulse-glow 2.5s ease-out infinite',
        'float-slow':'float-slow 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
      },
    },
  },
  plugins: [],
}
