/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f9f9fb',
          100: '#f2f2f5',
          200: '#e5e5ea',
          300: '#d1d1d6',
          400: '#a1a1a6',
          500: '#8e8e93',
          600: '#636366',
          700: '#48484a',
          800: '#2c2c2e',
          900: '#1c1c1e',
          950: '#0a0a0c',
        },
        accent: {
          DEFAULT: '#0a84ff',   // Apple systemBlue
          soft:    '#5ac8fa',
          warm:    '#ff9f0a',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
        'soft-dark': '0 1px 2px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)',
        'ring': '0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'ring-dark': '0 0 0 1px rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
