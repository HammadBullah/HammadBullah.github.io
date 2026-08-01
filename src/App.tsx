import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const [konami, setKonami] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)

  // Safety: always surface the UI after a few seconds even if boot glitches
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 7000)
    return () => clearTimeout(t)
  }, [])

  // Cursor-driven volumetric light
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = document.getElementById('lightbeam')
      if (el) { el.style.setProperty('--mx', e.clientX + 'px'); el.style.setProperty('--my', e.clientY + 'px') }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Horizontal scroll engine — uses the classic tall-wrapper + sticky-track pattern
  useLayoutEffect(() => {
    if (!booted) return
    const wrapper = wrapperRef.current
    const track   = trackRef.current
    const inner   = innerRef.current
    if (!wrapper || !track || !inner) return

    try {
      const ctx = gsap.context(() => {
        const scenes = gsap.utils.toArray<HTMLElement>('.scene-card', inner)
        const total  = scenes.length
        const getDistance = () => (total - 1) * window.innerWidth

        // Size the wrapper
        const applyHeight = () => { wrapper.style.height = `${getDistance() + window.innerHeight}px` }
        applyHeight()
        // Initial inner width
        gsap.set(inner, { width: () => total * window.innerWidth })

        // Horizontal translation — pinned via CSS (sticky), no GSAP pin (which fights CSS sticky)
        const tween = gsap.to(inner, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })

        // Per-scene enter animations: slide/zoom/blur in when scene is about to center
        scenes.forEach((card, i) => {
          const ic = card.querySelector<HTMLElement>('.scene-inner')
          if (!ic) return
          // First scene is always visible (already in view on load)
          if (i === 0) {
            gsap.set(ic, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' })
            return
          }
          const effect = card.dataset.effect
          gsap.fromTo(
            ic,
            {
              opacity: 0,
              x: effect === 'diagonal' ? 0 : 80,
              y: effect === 'diagonal' ? 60 : 0,
              scale: effect === 'zoom' ? 0.85 : effect === 'rotate' ? 0.97 : 1,
              rotate: effect === 'rotate' ? 3 : 0,
              filter: 'blur(8px)',
            },
            {
              opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)',
              ease: 'power2.out',
              scrollTrigger: {
                containerAnimation: tween,
                trigger: card,
                start: 'left 80%',
                end: 'left 30%',
                scrub: 0.8,
              },
            }
          )
        })

        // Shutdown footer fade at end
        const shutdown = document.getElementById('shutdown-overlay')
        if (shutdown) {
          gsap.fromTo(shutdown,
            { opacity: 0 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: () => `top+=${getDistance() - 200} top`,
                end: () => `top+=${getDistance()} top`,
                scrub: true,
              },
            }
          )
        }

        ScrollTrigger.refresh()
        window.addEventListener('resize', () => { applyHeight(); ScrollTrigger.refresh() })
      }, wrapper)

      return () => {
        ctx.revert()
        window.removeEventListener('resize', () => {})
      }
    } catch (err) {
      // Fallback: make main visible and stack scenes vertically if GSAP fails
      console.error('[hscroll] failed:', err)
      wrapper.style.height = 'auto'
      if (inner) { inner.style.transform = 'none'; inner.style.display = 'block' }
      scenesFallback()
    }
  }, [booted])

  const goTo = (id: string) => {
    const order = ['intro','about','skills','work','experience','contact']
    const idx = order.indexOf(id)
    if (idx < 0) return
    window.scrollTo({ top: idx * window.innerHeight * 0.95, behavior: 'smooth' })
  }

  // Keyboard / easter eggs
  useEffect(() => {
    const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let buf: string[] = []
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === '`' && e.metaKey) || e.key.toLowerCase() === 'd') { e.preventDefault(); setTermOpen(v=>!v); return }
      if (e.key === 'Escape') setTermOpen(false)
      buf.push(e.key); if (buf.length > konamiSeq.length) buf.shift()
      if (buf.join(',') === konamiSeq.join(',')) {
        setKonami(true); setTimeout(()=>setKonami(false), 5000)
      }
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

      {/* Horizontal scroll world */}
      <main
        className="relative"
        style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(.16,1,.3,1)' }}
        aria-hidden={!booted}
      >
        <div
          ref={wrapperRef}
          className="hscroll-wrapper"
          style={{ position: 'relative', width: '100vw' }}
        >
          <div
            ref={trackRef}
            className="hscroll-track"
            style={{ position: 'sticky', top: 0, overflow: 'hidden', width: '100vw', height: '100vh' }}
          >
            <div
              ref={innerRef}
              className="hscroll-inner"
              style={{ display: 'flex', height: '100vh', willChange: 'transform' }}
            >
              <SceneCard effect="zoom"><Intro onExplore={() => goTo('about')}/></SceneCard>
              <SceneCard effect="rotate"><About/></SceneCard>
              <SceneCard effect="zoom"><Skills/></SceneCard>
              <SceneCard effect="diagonal"><Projects/></SceneCard>
              <SceneCard effect="rotate"><Experience/></SceneCard>
              <SceneCard effect="zoom"><Contact/></SceneCard>
            </div>
          </div>
        </div>
      </main>

      {/* UI */}
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

      <div id="shutdown-overlay"
        className="fixed inset-0 z-[300] pointer-events-none flex items-end justify-center pb-8"
        style={{ opacity: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.95) 100%)' }}>
        <div className="mono text-[11px] uppercase tracking-[0.3em] text-white/30">SESSION_ENDED · PRESS R TO RESTART</div>
      </div>
    </div>
  )
}

function SceneCard({ effect, children }: { effect: string; children: React.ReactNode }) {
  return (
    <div className={`scene-card scene relative flex-shrink-0 w-screen h-screen`} data-effect={effect}
         style={{ position: 'relative', flex: '0 0 100vw', height: '100vh', overflow: 'hidden' }}>
      {children}
    </div>
  )
}

function scenesFallback() {
  const track = document.querySelector('.hscroll-track') as HTMLElement | null
  const inner = document.querySelector('.hscroll-inner') as HTMLElement | null
  if (track)  { track.style.position = 'relative'; track.style.height = 'auto'; track.style.overflow = 'visible' }
  if (inner)  { inner.style.display = 'block'; inner.style.height = 'auto'; inner.style.transform = 'none' }
  document.querySelectorAll<HTMLElement>('.scene-card').forEach(c => {
    c.style.position = 'relative'; c.style.width = '100vw'; c.style.height = 'auto'; c.style.minHeight = '100vh'
    const ic = c.querySelector<HTMLElement>('.scene-inner')
    if (ic) { ic.style.opacity = '1'; ic.style.transform = 'none'; ic.style.filter = 'none' }
  })
}
