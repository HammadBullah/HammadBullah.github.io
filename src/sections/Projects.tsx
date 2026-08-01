import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
const Github = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.7.5.5 5.7.5 12.1c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z"/>
  </svg>
)

type Project = {
  id: string
  year: string
  title: string
  role: string
  summary: string
  tech: string[]
  metrics: { label: string; value: string }[]
  color: string
  accent: string
}

const projects: Project[] = [
  {
    id: 'drowning',
    year: '2024',
    title: 'Drowning Detection',
    role: 'Computer Vision · Research',
    summary: 'Real-time YOLOv9 / TensorFlow pipeline that detects drowning events from overhead pool cameras at 32fps with 89% mAP@0.5. Designed for sub-second alert latency.',
    tech: ['Python', 'YOLOv9', 'TensorFlow', 'OpenCV', 'CUDA'],
    metrics: [
      { label: 'mAP@0.5', value: '89%' },
      { label: 'FPS', value: '32' },
      { label: 'Latency', value: '<31ms' },
    ],
    color: '#00D4FF',
    accent: 'from-cyan/20 to-violet/10',
  },
  {
    id: 'plucknpay',
    year: '2023',
    title: 'PlucknPay',
    role: 'Mobile Full-Stack · Product',
    summary: 'Flutter marketplace connecting local farmers directly with consumers — real-time inventory via Firebase, secure payments, shipped end-to-end from concept to store.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Stripe', 'Cloud Fn'],
    metrics: [
      { label: 'Scope', value: 'Full' },
      { label: 'Users', value: 'Beta' },
      { label: 'Platforms', value: 'iOS+A' },
    ],
    color: '#4ade80',
    accent: 'from-emerald-400/20 to-cyan/10',
  },
  {
    id: 'weather-lstm',
    year: '2025',
    title: 'Weather LSTM',
    role: 'MSc Research · Time Series',
    summary: 'Stacked LSTM architectures for multivariate meteorological forecasting, benchmarked against classical ARIMA and Prophet baselines across European weather stations.',
    tech: ['PyTorch', 'LSTM', 'Pandas', 'Research'],
    metrics: [
      { label: 'Type', value: 'MSc' },
      { label: 'Stations', value: '12' },
      { label: 'Horizon', value: '24h' },
    ],
    color: '#FF7A3D',
    accent: 'from-orange/20 to-magenta/10',
  },
  {
    id: 'smart-agri',
    year: '2023',
    title: 'Smart Agri IoT',
    role: 'IoT · Mobile Dashboard',
    summary: 'Sensor-to-app platform: soil-moisture and climate data from ESP nodes streamed to Firebase, surfaced in a Flutter dashboard for farm monitoring and irrigation scheduling.',
    tech: ['IoT', 'ESP32', 'Flutter', 'Firebase'],
    metrics: [
      { label: 'Domain', value: 'Agri' },
      { label: 'Nodes', value: '8' },
      { label: 'Update', value: '1s' },
    ],
    color: '#8A5CFF',
    accent: 'from-violet/20 to-cyan/10',
  },
]

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section className="scene relative" data-effect="diagonal">
      <div className="scene-inner absolute inset-0 flex items-center">
        <div className="container-x w-full">
          <div className="mono text-[11px] uppercase tracking-[0.3em] text-cyan mb-6">
            // 03 · ARCHIVE
          </div>
          <h2 className="text-white mb-10" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>
            Selected <em className="font-serif italic text-orange">work</em>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setActive(p)}
                className="group relative text-left overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6"
                style={{
                  background: `linear-gradient(135deg, ${p.color}15, rgba(255,255,255,0.02))`,
                  borderColor: `${p.color}30`,
                  boxShadow: `0 0 30px ${p.color}15`,
                }}
                data-cursor="hover"
              >
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl opacity-40"
                     style={{ background: p.color }}/>
                <div className="relative flex items-start justify-between mb-6">
                  <span className="mono text-[10px] uppercase tracking-widest text-white/40">{p.role} · {p.year}</span>
                  <span className="mono text-[10px]" style={{ color: p.color }}>● {p.id}</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-5">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0,4).map(t => (
                    <span key={t} className="mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/60">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs mono" style={{color: p.color}}>
                  Open <ArrowUpRight size={12}/>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Project focus modal — camera flies to project */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setActive(null)}/>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
              className="relative max-w-2xl w-full glass-panel rounded-2xl p-8"
              style={{ boxShadow: `0 0 60px ${active.color}40`, borderColor: `${active.color}40` }}
            >
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white" data-cursor="hover">
                <X size={14}/>
              </button>
              <div className="mono text-[10px] uppercase tracking-widest text-white/40 mb-3" style={{color: active.color}}>
                {active.role} · {active.year}
              </div>
              <h3 className="text-4xl font-semibold text-white mb-4 tracking-tight">{active.title}</h3>
              <p className="text-white/70 leading-relaxed mb-6">{active.summary}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {active.metrics.map(m => (
                  <div key={m.label} className="rounded-lg border border-white/10 p-3">
                    <div className="mono text-[10px] uppercase tracking-widest text-white/40 mb-1">{m.label}</div>
                    <div className="text-xl font-semibold text-white mono" style={{color: active.color}}>{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {active.tech.map(t => (
                  <span key={t} className="mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/70">{t}</span>
                ))}
              </div>

              <div className="flex gap-3">
                <a href="#" onClick={e=>e.preventDefault()} className="btn-cyan" data-cursor="hover" style={{background: active.color+'22', borderColor: active.color+'60', color: active.color, boxShadow: `0 0 20px ${active.color}40`}}>
                  View case study <ArrowUpRight size={14}/>
                </a>
                <a href="https://github.com/HammadBullah" target="_blank" rel="noreferrer noopener" className="btn-ghost" data-cursor="hover">
                  <Github size={14}/> Source
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
