import { useEffect, useRef, useState } from 'react'

const lines: { t: string; d?: number; color?: string }[] = [
  { t: '[SYS] HammadOS v2.4.1 — booting kernel...' },
  { t: '[MEM] 16GB detected ✓' },
  { t: '[GPU] Neural accelerator online ✓' },
  { t: '[NET] Establishing secure uplink...' },
  { t: '[FS]  Mounting workspace...' },
  { t: '[AI]  Loading assistant module...' },
  { t: '[CAM] Initializing optical sensors ✓' },
  { t: '[KB]  Keyboard controller ready' },
  { t: '[USR] Hammad Safi · AI & Software Engineer' },
  { t: '[OK]  Systems nominal. Welcome.' , color: 'text-cyan' },
]

export default function Boot({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    let i = 0
    const addLine = () => {
      if (i < lines.length) {
        setVisible(v => [...v, lines[i].t])
        i++
        setTimeout(addLine, 140 + Math.random() * 100)
      } else {
        // progress bar
        const start = performance.now()
        const dur = 900
        const tick = () => {
          const p = Math.min((performance.now() - start) / dur, 1)
          setProgress(p)
          if (p < 1) rafRef.current = requestAnimationFrame(tick)
          else {
            setTimeout(() => {
              setDone(true)
              setTimeout(onDone, 800)
            }, 300)
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    const t = setTimeout(addLine, 400)
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current) }
  }, [onDone])

  return (
    <div
      className="boot-screen"
      style={{
        opacity: done ? 0 : 1,
        transition: 'opacity .8s cubic-bezier(.16,1,.3,1)',
        pointerEvents: done ? 'none' : 'auto',
      }}
    >
      <div className="mono text-cyan/70 text-xs mb-8">
        HAMMAD SAFI · DIGITAL WORKSPACE
      </div>
      <div className="space-y-1">
        {visible.map((l, i) => (
          <div key={i} className="mono text-[13px]" style={{ opacity: 0, animation: 'fadeIn .25s forwards' }}>
            <span className="text-white/40">{'>'}</span>{' '}
            <span className={lines[i]?.color ?? 'text-cyan'}>{l}</span>
          </div>
        ))}
      </div>
      {visible.length >= lines.length && (
        <div className="mt-10 max-w-md">
          <div className="mono text-[11px] text-cyan/60 mb-2">INITIALIZING INTERFACE...</div>
          <div className="h-[2px] bg-white/10 overflow-hidden">
            <div className="h-full bg-cyan" style={{ width: `${progress * 100}%`, boxShadow: '0 0 10px #00D4FF' }} />
          </div>
        </div>
      )}
      <style>{`@keyframes fadeIn { to { opacity: 1 } }`}</style>
    </div>
  )
}
