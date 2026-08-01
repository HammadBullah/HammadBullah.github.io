import { useEffect, useRef, useState } from 'react'

type Orb = { name: string; color: string; x: number; y: number; vx: number; vy: number; r: number }

const SKILLS: { name: string; color: string }[] = [
  { name: 'Python',    color: '#00D4FF' },
  { name: 'TypeScript',color: '#8A5CFF' },
  { name: 'React',     color: '#00D4FF' },
  { name: 'Flutter',   color: '#5AC8FA' },
  { name: 'TensorFlow',color: '#FF7A3D' },
  { name: 'PyTorch',   color: '#FF3DBB' },
  { name: 'Node.js',   color: '#4ade80' },
  { name: 'FastAPI',   color: '#00D4FF' },
  { name: 'Docker',    color: '#8A5CFF' },
  { name: 'AWS',       color: '#FF7A3D' },
  { name: 'Firebase',  color: '#FFB03D' },
  { name: 'PostgreSQL',color: '#5AC8FA' },
  { name: 'MongoDB',   color: '#4ade80' },
  { name: 'Git',       color: '#FF7A3D' },
]

export default function Skills() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)
  const [orbStates, setOrbStates] = useState<Orb[]>([])
  const mouse = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(0)

  useEffect(() => {
    const w = () => fieldRef.current?.clientWidth ?? window.innerWidth
    const h = () => fieldRef.current?.clientHeight ?? window.innerHeight
    const cx = w() / 2, cy = h() / 2
    const orbs: Orb[] = SKILLS.map((s, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2
      const radius = Math.min(w(), h()) * 0.32 * (0.7 + (i % 3) * 0.12)
      return {
        name: s.name, color: s.color,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 38 + Math.random() * 16,
      }
    })
    setOrbStates(orbs)

    const nodes = orbsRef.current?.children as HTMLCollectionOf<HTMLDivElement> | undefined
    const onMove = (e: MouseEvent) => {
      const rect = fieldRef.current?.getBoundingClientRect()
      if (!rect) return
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    const loop = () => {
      const W = w(), H = h()
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i]
        // cursor gravity
        const dx = mouse.current.x - o.x, dy = mouse.current.y - o.y
        const d = Math.hypot(dx, dy)
        if (d < 220 && d > 1) {
          const f = (220 - d) / 220
          o.vx += (dx / d) * f * 0.08
          o.vy += (dy / d) * f * 0.08
        }
        // centering pull back to orbit ring
        const dxc = cx - o.x, dyc = cy - o.y
        const dc = Math.hypot(dxc, dyc)
        if (dc > 10) {
          o.vx += (dxc / dc) * 0.02
          o.vy += (dyc / dc) * 0.02
        }
        // repulsion between orbs
        for (let j = i + 1; j < orbs.length; j++) {
          const o2 = orbs[j]
          const ddx = o.x - o2.x, ddy = o.y - o2.y
          const dd = Math.hypot(ddx, ddy)
          if (dd < o.r + o2.r + 10 && dd > 0.01) {
            const f = ((o.r + o2.r + 10) - dd) / (o.r + o2.r + 10)
            o.vx += (ddx / dd) * f * 0.5
            o.vy += (ddy / dd) * f * 0.5
            o2.vx -= (ddx / dd) * f * 0.5
            o2.vy -= (ddy / dd) * f * 0.5
          }
        }
        o.vx *= 0.94; o.vy *= 0.94
        o.x += o.vx; o.y += o.vy
        // wall bounce
        if (o.x < o.r) { o.x = o.r; o.vx *= -0.7 }
        if (o.x > W - o.r) { o.x = W - o.r; o.vx *= -0.7 }
        if (o.y < o.r) { o.y = o.r; o.vy *= -0.7 }
        if (o.y > H - o.r) { o.y = H - o.r; o.vy *= -0.7 }
        if (nodes?.[i]) {
          const n = nodes[i]
          n.style.transform = `translate(${o.x - o.r}px, ${o.y - o.r}px)`
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onResize = () => {
      // On resize, re-seed positions
      const W = w(), H = h()
      orbs.forEach((o, i) => {
        const angle = (i / orbs.length) * Math.PI * 2
        const radius = Math.min(W, H) * 0.32 * (0.7 + (i % 3) * 0.12)
        o.x = W/2 + Math.cos(angle) * radius
        o.y = H/2 + Math.sin(angle) * radius
      })
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="relative w-full h-full">
      <div className="scene-inner absolute inset-0 flex items-center">
        <div className="container-x w-full">
          <div className="mb-6 flex items-baseline justify-between">
            <div className="mono text-[11px] uppercase tracking-[0.3em] text-violet">
              // 02 · MATRIX
            </div>
            <div className="mono text-[11px] text-white/30 hidden md:block">
              move cursor — orbs respond
            </div>
          </div>
          <h2 className="text-white" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>
            The <em className="font-serif italic text-cyan">stack</em>.
          </h2>
        </div>

        <div ref={fieldRef} className="absolute inset-0 z-0" data-cursor="hover">
          {/* Central core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full border border-cyan/40 animate-spin-slow"/>
              <div className="absolute inset-3 rounded-full border border-violet/40 animate-spin-slow" style={{animationDirection:'reverse', animationDuration:'18s'}}/>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-cyan shadow-glow-cyan animate-pulse-glow"/>
              </div>
            </div>
          </div>
          <div ref={orbsRef} className="absolute inset-0">
            {orbStates.map((o) => (
              <div
                key={o.name}
                className="skill-orb"
                style={{
                  width: o.r * 2, height: o.r * 2,
                  background: `radial-gradient(circle at 30% 30%, ${o.color}66, ${o.color}22 60%, transparent 75%)`,
                  border: `1px solid ${o.color}55`,
                  boxShadow: `0 0 20px ${o.color}55, inset 0 0 20px ${o.color}22`,
                  backdropFilter: 'blur(4px)',
                }}
                data-cursor="hover"
              >
                <span className="orb-label mono text-[11px]" style={{color: o.color}}>{o.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
