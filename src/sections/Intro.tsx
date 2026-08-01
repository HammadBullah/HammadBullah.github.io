import { useEffect, useRef } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

const Github = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.7.5.5 5.7.5 12.1c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z"/>
  </svg>
)
const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.3 18.3v-8H5.7v8h2.6zM7 9.1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11.3 9.2v-4.4c0-2.3-1.2-3.4-2.9-3.4a2.5 2.5 0 00-2.3 1.2v-1h-2.6v8h2.6v-4.5c0-1.2.2-2.3 1.7-2.3s1.5 1.3 1.5 2.4v4.4h2z"/>
  </svg>
)

/**
 * Intro scene — "developer workspace boots."
 * Ambient monitor glow, initials fade in, name assembles with a particle-like
 * reveal effect (letter-stagger opacity + blur), tagline types in, CTAs appear.
 */
export default function Intro({ onExplore }: { onExplore: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return
    // Wrap each letter in a span with a stagger
    const original = title.textContent ?? ''
    title.innerHTML = ''
    const words = original.split(' ')
    words.forEach((word, wi) => {
      ;[...word].forEach((ch) => {
        const s = document.createElement('span')
        s.textContent = ch
        s.style.display = 'inline-block'
        s.style.opacity = '0'
        s.style.transform = 'translateY(20px) scale(1.3)'
        s.style.filter = 'blur(10px)'
        s.style.transition = 'all .7s cubic-bezier(.16,1,.3,1)'
        title.appendChild(s)
      })
      if (wi < words.length - 1) {
        const sp = document.createElement('span')
        sp.innerHTML = '&nbsp;'
        title.appendChild(sp)
      }
    })
    const spans = title.querySelectorAll<HTMLSpanElement>('span')
    spans.forEach((s, i) => {
      setTimeout(() => {
        s.style.opacity = '1'
        s.style.transform = 'translateY(0) scale(1)'
        s.style.filter = 'blur(0)'
      }, 600 + i * 35)
    })
  }, [])

  return (
    <section className="relative w-full h-full bg-[#0B0D10]">
      <div className="scene-inner flex items-center absolute inset-0">
        <div className="container-x w-full">
          {/* Top status bar */}
          <div className="absolute left-8 top-10 flex items-center gap-6 mono text-[11px] uppercase tracking-[0.25em] text-white/40 z-10">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60"/>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan"/>
              </span>
              SYS:ONLINE
            </span>
            <span>NODEF_01</span>
            <span className="text-cyan">UPLINK_STABLE</span>
          </div>

          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-9">
              <div className="mono text-[11px] uppercase tracking-[0.3em] text-cyan mb-6">
                // IDENTITY_RESOLVED
              </div>
              <h1
                ref={titleRef}
                className="mega-title display text-white chroma"
              >
                Hammad Safi
              </h1>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="mono text-cyan text-sm">&gt;</span>
                <p className="text-xl md:text-2xl text-white/70 font-light max-w-xl" id="tagline">
                  AI &amp; software engineer building <em className="font-serif italic text-violet">calm, intelligent systems</em>.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4" data-cursor="hover">
                <button onClick={onExplore} className="btn-cyan group" data-cursor="hover">
                  Enter workspace <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/>
                </button>
                <a href="mailto:hammabdullah@gmail.com" className="btn-ghost" data-cursor="hover">
                  <Mail size={14}/> hammabdullah@gmail.com
                </a>
                <div className="flex gap-2 ml-2">
                  <a href="https://github.com/HammadBullah" target="_blank" rel="noreferrer noopener"
                     className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-cyan/60 hover:text-cyan hover:shadow-glow-cyan"
                     aria-label="GitHub" data-cursor="hover">
                    <Github size={16}/>
                  </a>
                  <a href="https://www.linkedin.com/in/hammad-safi" target="_blank" rel="noreferrer noopener"
                     className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-violet/60 hover:text-violet hover:shadow-glow-violet"
                     aria-label="LinkedIn" data-cursor="hover">
                    <Linkedin size={16}/>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="glass-panel rounded-xl p-5 space-y-3 mono text-[11px] text-white/60">
                <div className="flex items-center justify-between">
                  <span>SIGNAL</span><span className="text-cyan">● STABLE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>LOCATION</span><span className="text-white/90">Hatfield, UK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ROLE</span><span className="text-violet">AI / SWE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>FOCUS</span><span className="text-white/90">ML · Full-stack</span>
                </div>
                <div className="h-px bg-white/10 my-2"/>
                <div className="text-white/40">TELEMETRY_OK</div>
                <div className="flex gap-0.5 h-4 items-end">
                  {Array.from({length: 16}).map((_,i)=>(
                    <span key={i} className="w-1 bg-cyan/70 rounded-sm"
                      style={{height: `${20+Math.sin(i*0.8)*40+Math.random()*30}%`, animation: `breathe ${1+i*0.1}s infinite`}}/>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-8 right-8 flex justify-between mono text-[11px] uppercase tracking-[0.25em] text-white/30">
            <span>v2.4.1 · HAMMADOS</span>
            <span className="animate-pulse">SCROLL TO NAVIGATE →</span>
          </div>
        </div>
      </div>
    </section>
  )
}
