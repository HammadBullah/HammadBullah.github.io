/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: '#0B0D10',
        surface: '#11151B',
        border: '#1F2630',
        muted: '#8A94A3',
        cyan: '#00D4FF',
        violet: '#8A5CFF',
        orange: '#FF7A3D',
      },
    },
  },
  plugins: [],
}
