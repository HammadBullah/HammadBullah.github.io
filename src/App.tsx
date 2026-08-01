import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Boot from './components/Boot'
import Cursor from './components/Cursor'
import Dock from './components/Dock'
import Terminal from './components/Terminal'
import ParticleField from './components/ParticleField'
import Intro from './sections/Intro'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import { Volume2, VolumeX } from 'lucide-react'
import type { ReactNode } from 'react'

const sceneData = [
  { id: 'intro',      effect: 'zoom'     as const, Comp: Intro },
  { id: 'about',      effect: 'rotate'   as const, Comp: About },
  { id: 'skills',     effect: 'zoom'     as const, Comp: Skills },
  { id: 'work',       effect: 'diagonal' as const, Comp: Projects },
  { id: 'experience', effect: 'rotate'   as const, Comp: Experience },
  { id: 'contact',    effect: 'zoom'     as const, Comp: Contact },
]

export default function App() {
  const [booted, setBooted] = useState(false)
  const [termOpen, setTermOpen] = useState(false)
  const [muted, setMuted] = useState(true)
  const [konami, setKonami] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)
  const [totalWidth, setTotalWidth] = useState(0)

  // Safety: reveal UI after 7s even if boot fails
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 7000)
    return () => clearTimeout(t)
  }, [])

  // Compute total horizontal distance
  useEffect(() => {
    const calc = () => {
      if (innerRef.current) {
        setTotalWidth(innerRef.current.scrollWidth - window.innerWidth)
      }
    }
    calc()
    window.addEventListener('resize', calc)
    const id = setTimeout(calc, 300)
    return () => { window.removeEventListener('resize', calc); clearTimeout(id) }
  }, [booted])

  // Vertical scroll → horizontal translation (spring-smoothed)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -totalWidth])
  const x = useSpring(xRaw, { stiffness: 80, damping: 28, restDelta: 0.5 })

  // Shutdown overlay fade at very end
  const shutdownOpacity = useTransform(scrollYProgress, [0.92, 1], [0, 1])

  // Cursor light beam
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = document.getElementById('lightbeam')
      if (el) {
        el.style.setProperty('--mx', e.clientX + 'px')
        el.style.setProperty('--my', e.clientY + 'px')
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Nav
  const goTo = (id: string) => {
    const idx = sceneData.findIndex(s => s.id === id)
    if (idx < 0 || !wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const totalScroll = rect.height - window.innerHeight
    if (totalScroll <= 0) return
    window.scrollTo({ top: (idx / (sceneData.length - 1)) * totalScroll, behavior: 'smooth' })
  }

  // Keyboard / easter eggs
  useEffect(() => {
    const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let buf: string[] = []
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === '`' && e.metaKey) || e.key.toLowerCase() === 'd') { e.preventDefault(); setTermOpen(v=>!v); return }
      if (e.key === 'Escape') setTermOpen(false)
      buf.push(e.key); if (buf.length > konamiSeq.length) buf.shift()
      if (buf.join(',') === konamiSeq.join(',')) { setKonami(true); setTimeout(()=>setKonami(false), 5000) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="relative bg-[#0B0D10] text-white">
      <Cursor/>
      {!booted && <Boot onDone={() => requestAnimationFrame(()=>setBooted(true))} />}

      {/* Fixed background layers */}
      <div className="fixed inset-0 z-0 pointer-events-none"><ParticleField/></div>
      <div className="scanlines"/>

      {/* Horizontal world */}
      <main
        style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(.16,1,.3,1)' }}
      >
        <div ref={wrapperRef} style={{ height: totalWidth ? `${totalWidth + window.innerHeight}px` : '100vh' }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div ref={innerRef} style={{ x }} className="flex h-full w-max">
              {sceneData.map((s, i) => (
                <SceneCard key={s.id} progress={scrollYProgress} index={i} total={sceneData.length} effect={s.effect}>
                  <s.Comp onExplore={i === 0 ? () => goTo('about') : undefined} />
                </SceneCard>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <Dock onNav={goTo} onTerminal={() => setTermOpen(true)} />
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />

      <button
        onClick={() => setMuted(m => !m)}
        aria-label="toggle sound"
        data-cursor="hover"
        className="fixed top-6 right-6 z-[400] flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:text-cyan hover:border-cyan/40 hover:shadow-glow-cyan"
      >
        {muted ? <VolumeX size={14}/> : <Volume2 size={14}/>}
      </button>

      {konami && (
        <div className="fixed inset-0 z-[600] pointer-events-none flex items-center justify-center">
          <div className="mono text-cyan text-2xl chroma animate-pulse-glow">// DEVELOPER MODE ACTIVATED</div>
        </div>
      )}

      <motion.div
        style={{ opacity: shutdownOpacity }}
        className="fixed inset-0 z-[300] pointer-events-none flex items-end justify-center pb-8"
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.95) 100%)' }}/>
        <div className="relative mono text-[11px] uppercase tracking-[0.3em] text-white/30">SESSION_ENDED · PRESS R TO RESTART</div>
      </motion.div>
    </div>
  )
}

function SceneCard({
  children, progress, index, total, effect,
}: { children: ReactNode; progress: any; index: number; total: number; effect: 'zoom'|'rotate'|'diagonal' }) {
  // Animate this card based on its position within the overall horizontal progress.
  // Card i is centered when scrollYProgress ≈ i/(total-1).
  const center = index / Math.max(1, total - 1)
  const focusRange = 0.7 / Math.max(1, total - 1) // how far off-center we start fading/zooming
  const scale = useTransform(progress,
    [center - focusRange, center, center + focusRange],
    effect === 'zoom' ? [0.85, 1, 0.85] : [0.97, 1, 0.97])
  const y     = useTransform(progress,
    [center - focusRange, center, center + focusRange],
    effect === 'diagonal' ? [60, 0, 60] : [0, 0, 0])
  const rot   = useTransform(progress,
    [center - focusRange, center, center + focusRange],
    effect === 'rotate' ? [3, 0, 3] : [0, 0, 0])
  const blur  = useTransform(progress,
    [center - focusRange * 0.6, center - focusRange * 0.2, center + focusRange * 0.2, center + focusRange * 0.6],
    ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'])
  const op    = useTransform(progress,
    [center - focusRange * 0.6, center - focusRange * 0.2, center + focusRange * 0.2, center + focusRange * 0.6],
    [0, 1, 1, 0])
  return (
    <motion.section
      className="relative w-screen h-screen flex-shrink-0 overflow-hidden"
      style={{ scale, y, rotate: rot, filter: blur, opacity: op }}
    >
      {children}
    </motion.section>
  )
}
