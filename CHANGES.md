# Apple-minimal theme — changelog

Branch: `apple-minimal-theme`

## What changed
- Full visual redesign to an Apple-inspired, minimal aesthetic (calm whites, frosted glass, generous spacing, SF-style typography, soft blue accent `#0a84ff`).
- Added a working **light/dark mode toggle** (sun/moon in the navbar) with `localStorage` persistence and `prefers-color-scheme` detection.
- New **floating glass pill navbar** with smooth scroll anchors.
- Rewrote all sections (Hero, About, Experience, Projects, Skills, Contact) to match the new design language with consistent hierarchy, hairline borders, chips, and soft shadows.
- Replaced the heavy holographic sphere + cyberpunk styling with a **subtle particle + gradient-glow Three.js background** that adapts to theme.
- New **custom cursor** (dot + ring with `mix-blend-mode: difference`), with mobile fallback.
- Simplified the loading screen to a quiet progress bar instead of the old "Sovereign_Protocol" block.
- Updated all CTAs and nav links to use proper anchor IDs (`#about`, `#projects`, `#contact`, etc.) so smooth scroll works end-to-end.
- Fixed TypeScript errors; removed unused files (`HeroV9`, `HolographicSphere`, `NeuralField`, duplicate `styles/globals.css`, unused SVG assets).
- Kept tech choices: React 19 + Vite + TypeScript + Tailwind + Framer Motion + Lenis + Three.js + react-three/fiber.

## How to run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run deploy     # gh-pages deploy
```

## Notes
- `dist/` is not committed (per `.gitignore`).
- To switch the default theme to dark on first visit, change the initial `theme` state in `src/context/ThemeContext.tsx` to `"dark"`.
- Bundle is heavy (~260 KB gzipped JS) due to Three.js + R3F; a future pass can lazy-load the background canvas for better LCP.
