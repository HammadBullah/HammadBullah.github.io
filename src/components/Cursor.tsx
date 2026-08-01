import { useEffect, useRef } from 'react'

/**
 * Physics-based cursor:
 * - Dot follows tightly
 * - Outer ring lags with spring, expands on hover, squashes on click
 * - 6 trailing particles with decaying opacity follow the mouse path
 * - Ripple on click
 * - Hover state applied for any [data-cursor="hover"] or a/button
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const rippleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring  = { x: mouse.x, y: mouse.y }
    const dotV  = { x: 0, y: 0 }
    const trails = Array.from({ length: 8 }, () => ({ x: mouse.x, y: mouse.y }))
    let vel = 0
    let lastX = mouse.x, lastY = mouse.y
    let raf = 0
    let hoverEl: Element | null = null

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY
      // detect hover target
      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null
      const shouldHover = el?.closest('a,button,[data-cursor="hover"]')
      if (shouldHover !== hoverEl) {
        hoverEl = shouldHover
        ringRef.current?.classList.toggle('hover', !!shouldHover)
      }
    }
    const onDown = () => {
      ringRef.current?.classList.add('click')
      if (rippleRef.current) {
        const r = rippleRef.current
        r.style.left = mouse.x + 'px'
        r.style.top = mouse.y + 'px'
        r.style.transform = 'translate(-50%,-50%) scale(0)'
        r.style.opacity = '0.6'
        r.animate(
          [
            { transform: 'translate(-50%,-50%) scale(0)',   opacity: 0.6 },
            { transform: 'translate(-50%,-50%) scale(3)',   opacity: 0 },
          ],
          { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' }
        )
      }
      setTimeout(() => ringRef.current?.classList.remove('click'), 180)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)

    const loop = () => {
      // ring spring
      ring.x += (mouse.x - ring.x) * 0.15
      ring.y += (mouse.y - ring.y) * 0.15

      // velocity for stretch
      const dx = mouse.x - lastX, dy = mouse.y - lastY
      vel = Math.hypot(dx, dy)
      lastX = mouse.x; lastY = mouse.y

      // dot instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%)`
      }
      // ring lagging — stretch with velocity angle
      if (ringRef.current) {
        const angle = Math.atan2(dy, dx) * 180 / Math.PI
        const stretch = 1 + Math.min(vel * 0.008, 0.25)
        ringRef.current.style.transform =
          `translate(${ring.x}px, ${ring.y}px) translate(-50%,-50%) rotate(${angle}deg) scale(${stretch}, ${2 - stretch})`
      }

      // trails — each follows previous
      let prev = mouse
      for (let i = 0; i < trails.length; i++) {
        const t = trails[i]
        t.x += (prev.x - t.x) * (0.4 - i * 0.03)
        t.y += (prev.y - t.y) * (0.4 - i * 0.03)
        const el = trailsRef.current[i]
        if (el) {
          const s = 1 - i / trails.length
          el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%,-50%) scale(${s})`
          el.style.opacity = String(s * 0.6)
          if (i % 2 === 1) el.style.background = 'rgba(138,92,255,0.7)'
          else el.style.background = 'rgba(0,212,255,0.7)'
        }
        prev = t
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Idle breathe
    let idleTimer: number | null = null
    const onIdle = () => {
      ringRef.current?.classList.add('breathe')
    }
    const onActive = () => {
      ringRef.current?.classList.remove('breathe')
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = window.setTimeout(onIdle, 2500)
    }
    window.addEventListener('mousemove', onActive)
    onActive()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onActive)
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el }}
          className="cursor-trail"
          aria-hidden
        />
      ))}
      <div
        ref={rippleRef}
        aria-hidden
        style={{
          position: 'fixed', width: 60, height: 60, borderRadius: '50%',
          border: '1.5px solid rgba(0,212,255,0.6)', pointerEvents: 'none', zIndex: 9998,
        }}
      />
    </>
  )
}
