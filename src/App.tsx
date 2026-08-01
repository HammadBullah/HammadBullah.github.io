import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [booted, setBooted] = useState(false)
  const [termOpen, setTermOpen] = useState(false)
  const [muted, setMuted] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [konami, setKonami] = useState(false)

  // Light beam follows cursor
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

  // Boot reveal — fade content in
  useEffect(() => {
    if (!booted) return
    gsap.fromTo(
      'main',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    )
  }, [booted])

  // Horizontal scroll setup
  useEffect(() => {
    if (!booted) return
    const wrapper = wrapperRef.current
    const inner = innerRef.current
    if (!wrapper || !inner) return

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('.scene', inner)
      const total = scenes.length
      const distance = () => (total - 1) * window.innerWidth

      gsap.set(wrapper, { height: () => distance() + window.innerHeight })

      gsap.to(inner, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: self => {
            // progress 0..1 — could drive parallax
          },
        },
      })

      // Per-scene enter animations
      scenes.forEach((scene, i) => {
        const ic = scene.querySelector('.scene-inner') as HTMLElement | null
        if (!ic) return
        const start = () => `top+=${i * window.innerWidth + window.innerWidth * 0.2} top`
        const end = () => `top+=${i * window.innerWidth + window.innerWidth * 0.8} top`
        const effect = scene.dataset.effect
        const fromX = i === 0 ? 0 : 100
        gsap.fromTo(
          ic,
          { opacity: 0, x: effect === 'diagonal' ? 0 : fromX, y: effect === 'diagonal' ? 80 : 0,
            scale: effect === 'zoom' ? 0.82 : effect === 'rotate' ? 0.97 : 1,
            rotate: effect === 'rotate' ? 4 : 0,
            filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wrapper,
              start, end,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        )
      })

      ScrollTrigger.refresh()
    }, wrapper)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [booted])

  // Nav handler — scroll to scene index
  const goTo = (id: string) => {
    const order = ['intro','about','skills','work','experience','contact']
    const idx = order.indexOf(id)
    if (idx < 0 || !wrapperRef.current) return
    const px = idx * window.innerHeight * 0.95
    window.scrollTo({ top: px, behavior: 'smooth' })
  }

  // Keyboard shortcuts / easter eggs
  useEffect(() => {
    const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let buf: string[] = []
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' && e.metaKey) { e.preventDefault(); setTermOpen(v=>!v); return }
      if (e.key === 'Escape') setTermOpen(false)
      if (e.key.toLowerCase() === 'd') { setTermOpen(v=>!v); return }
      if (e.key === ' ') { /* dock toggle is handled in Dock */ }
      buf.push(e.key); if (buf.length > konamiSeq.length) buf.shift()
      if (buf.join(',') === konamiSeq.join(',')) {
        setKonami(true)
        setTimeout(() => setKonami(false), 5000)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0B0D10] text-white overflow-hidden">
      <Cursor/>
      {!booted && <Boot onDone={() => setBooted(true)} />}

      {/* Background layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleField/>
      </div>
      <div className="scanlines"/>

      {/* Horizontal scroll world */}
      <main style={{ opacity: 0 }}>
        <div ref={wrapperRef} className="hscroll-wrapper">
          <div ref={innerRef} className="hscroll-inner">
            <div className="scene"><Intro onExplore={() => goTo('about')}/></div>
            <div className="scene"><About/></div>
            <div className="scene"><Skills/></div>
            <div className="scene"><Projects/></div>
            <div className="scene"><Experience/></div>
            <div className="scene"><Contact/></div>
          </div>
        </div>
      </main>

      {/* UI */}
      <Dock onNav={goTo} onTerminal={() => setTermOpen(true)} />
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />

      {/* Mute / sound toggle (UI only for now; no audio) */}
      <button
        onClick={() => setMuted(m => !m)}
        aria-label="toggle sound"
        data-cursor="hover"
        className="fixed top-6 right-6 z-[400] flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:text-cyan hover:border-cyan/40 hover:shadow-glow-cyan"
      >
        {muted ? <VolumeX size={14}/> : <Volume2 size={14}/>}
      </button>

      {/* Konami dev-mode flash */}
      {konami && (
        <div className="fixed inset-0 z-[600] pointer-events-none flex items-center justify-center">
          <div className="mono text-cyan text-2xl chroma animate-pulse-glow">
            // DEVELOPER MODE ACTIVATED
          </div>
        </div>
      )}

      {/* Shutdown footer overlay appears at very end */}
      <ShutdownFooter/>
    </div>
  )
}

function ShutdownFooter() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'bottom bottom', end: 'bottom top', scrub: true,
        },
      }
    )
  }, [])
  return (
    <div ref={ref}
      className="fixed inset-0 z-[300] pointer-events-none flex items-end justify-center pb-8"
      style={{ opacity: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)' }}>
      <div className="mono text-[11px] uppercase tracking-[0.3em] text-white/30 pb-2">
        SESSION_ENDED · PRESS R TO RESTART
      </div>
    </div>
  )
}
