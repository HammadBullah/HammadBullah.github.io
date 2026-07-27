/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Warm paper palette — cream/off-white in light, deep ink-paper in dark
        paper: {
          50:  '#f7f3ea',   // cream
          100: '#f2ecdf',   // warm paper
          200: '#e6dcc7',   // aged edge
          300: '#cfc2a4',   // faded sepia
          400: '#a39273',   // muted sepia
          500: '#7a6a50',   // ink wash
          600: '#5a4e3a',   // soft ink
          700: '#3f3628',   // dark ink
          800: '#2a2318',   // deep card
          900: '#1c170f',   // near-black ink
          950: '#120e08',   // dark cardstock
        },
        accent: {
          DEFAULT: '#1c170f',
          soft: '#7a6a50',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
