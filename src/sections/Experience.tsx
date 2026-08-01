import { motion } from 'framer-motion'
import { useRef } from 'react'

type Entry = { year: string; role: string; org: string; desc: string; color: string }

const entries: Entry[] = [
  { year: '2024 — present', role: 'MSc Advanced Computer Science', org: 'University of Hertfordshire', desc: 'ML, distributed systems, AI research — LSTM forecasting dissertation.', color: '#00D4FF' },
  { year: '2023 — 2024',    role: 'Freelance ML & Full-Stack Engineer', org: 'Independent', desc: 'Shipping Flutter apps, CV prototypes and internal tooling for early-stage startups.', color: '#8A5CFF' },
  { year: '2023',          role: 'Research — Drowning Detection', org: 'Computer Vision Lab', desc: 'YOLOv9/TF pipeline achieving 89% mAP@0.5 at 32fps on edge-class hardware.', color: '#FF7A3D' },
  { year: '2022 — 2023',   role: 'Mobile Engineer — PlucknPay', org: 'Founding Engineer', desc: 'Shipped Flutter + Firebase farm-to-consumer marketplace end to end.', color: '#FF3DBB' },
]

export default function Experience() {
  const _ref = useRef<HTMLDivElement>(null)
  return (
    <section className="relative w-full h-full">
      <div className="scene-inner absolute inset-0 flex items-center">
        <div className="container-x w-full">
          <div className="mono text-[11px] uppercase tracking-[0.3em] text-orange mb-6">
            // 04 · CHRONICLE
          </div>
          <h2 className="text-white mb-12" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>
            A <em className="font-serif italic text-cyan">timeline</em> suspended<br/>in space.
          </h2>

          <div ref={_ref} className="relative max-w-3xl pl-4 md:pl-10">
            <div className="absolute left-0 md:left-3 top-0 bottom-0 w-px bg-white/10"/>
            <motion.div
              className="absolute left-0 md:left-3 top-0 w-px"
              style={{ height: '100%', background: 'linear-gradient(to bottom, #00D4FF, #8A5CFF, #FF7A3D)', boxShadow: '0 0 10px #00D4FF' }}
            />
            <div className="space-y-8">
              {entries.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16,1,0.3,1] }}
                  className="relative pl-8"
                >
                  <span
                    className="absolute left-0 md:left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full"
                    style={{ background: e.color, boxShadow: `0 0 12px ${e.color}` }}
                  />
                  <div className="mono text-[10px] uppercase tracking-widest mb-1" style={{color: e.color}}>{e.year}</div>
                  <h3 className="text-lg text-white font-medium tracking-tight">{e.role}</h3>
                  <div className="text-xs text-white/40 mono mb-2">{e.org}</div>
                  <p className="text-sm text-white/60 max-w-xl leading-relaxed">{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
