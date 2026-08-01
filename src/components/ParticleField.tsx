import { useEffect, useRef } from 'react'

/**
 * Canvas 2D particle network background:
 * - Nodes drift slowly
 * - Lines connect nearby nodes
 * - Cursor pushes nodes away and glows connections
 * - Floating code symbols
 */
const SYMBOLS = ['{}', '[]', '<>', '()', '=>', '//', '&&', '||', '**', '!=']

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const symRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const sym = symRef.current!
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const mouse = { x: -9999, y: -9999 }

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    const COUNT = Math.min(120, Math.floor((w * h) / 16000))
    const nodes: Node[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.6,
    }))

    // Floating code symbols
    const symbols: { x: number; y: number; vx: number; vy: number; text: string; size: number; op: number; el: HTMLDivElement }[] = []
    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div')
      el.className = 'mono absolute select-none pointer-events-none'
      el.style.color = i % 2 === 0 ? 'rgba(0,212,255,0.25)' : 'rgba(138,92,255,0.2)'
      el.style.fontSize = (10 + Math.random() * 10) + 'px'
      el.style.textShadow = '0 0 10px currentColor'
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      sym.appendChild(el)
      symbols.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.15,
        text: '', size: 12, op: 0, el,
      })
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // update nodes
      for (const n of nodes) {
        // cursor repulsion
        const dx = n.x - mouse.x, dy = n.y - mouse.y
        const d2 = dx*dx + dy*dy
        if (d2 < 150*150) {
          const f = (150 - Math.sqrt(d2)) / 150
          n.vx += (dx / Math.sqrt(d2 + 0.1)) * f * 0.6
          n.vy += (dy / Math.sqrt(d2 + 0.1)) * f * 0.6
        }
        n.vx *= 0.98; n.vy *= 0.98
        n.x += n.vx; n.y += n.vy
        if (n.x < 0) n.x = w; if (n.x > w) n.x = 0
        if (n.y < 0) n.y = h; if (n.y > h) n.y = 0
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 130) {
            const mdist = Math.min(
              Math.hypot(a.x - mouse.x, a.y - mouse.y),
              Math.hypot(b.x - mouse.x, b.y - mouse.y),
            )
            const glow = mdist < 180 ? 1 - mdist / 180 : 0
            const op = (1 - dist / 130) * (0.15 + glow * 0.6)
            ctx.strokeStyle = glow > 0.3
              ? `rgba(0,212,255,${op})`
              : `rgba(138,92,255,${op * 0.6})`
            ctx.lineWidth = 0.5 + glow * 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        const mdist = Math.hypot(n.x - mouse.x, n.y - mouse.y)
        const near = mdist < 120
        ctx.fillStyle = near ? 'rgba(0,212,255,0.9)' : 'rgba(196,201,208,0.5)'
        ctx.shadowBlur = near ? 12 : 0
        ctx.shadowColor = '#00D4FF'
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (near ? 1 : 0), 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0
      }

      // symbols
      for (const s of symbols) {
        s.x += s.vx; s.y += s.vy
        if (s.x < -50) s.x = w + 50; if (s.x > w + 50) s.x = -50
        if (s.y < -50) s.y = h + 50; if (s.y > h + 50) s.y = -50
        s.el.style.transform = `translate(${s.x}px, ${s.y}px)`
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      symbols.forEach(s => s.el.remove())
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas" />
      {/* 3D perspective grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          perspective: '800px',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute left-1/2 top-[70%] h-[60vh] w-[250vw] -translate-x-1/2 animate-spin-slow"
          style={{
            transformOrigin: 'center top',
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'translateX(-50%) rotateX(70deg)',
            maskImage: 'linear-gradient(to top, black, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent 70%)',
          }}
        />
      </div>
      {/* Volumetric light beams */}
      <div
        id="lightbeam"
        className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-screen"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx,30%) var(--my,20%), rgba(0,212,255,0.1), transparent 40%), radial-gradient(500px circle at 80% 70%, rgba(138,92,255,0.08), transparent 40%)',
          transition: 'background 0.2s',
        }}
      />
      <div ref={symRef} className="pointer-events-none absolute inset-0 z-0" />
    </>
  )
}
