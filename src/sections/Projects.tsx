import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    year: '2024', title: 'Drowning Detection', role: 'Computer Vision · Research',
    summary: 'Real-time YOLOv9 / TensorFlow pipeline detecting drowning events from overhead pool cameras at 32fps with 89% mAP@0.5, tuned for sub-second alert latency.',
    tags: ['Python','YOLOv9','TensorFlow','OpenCV','CUDA'],
    color: 'from-cyan/20 to-violet/10', accent: '#00D4FF',
  },
  {
    year: '2023', title: 'PlucknPay', role: 'Mobile Full-Stack · Product',
    summary: 'Flutter marketplace connecting local farmers directly with consumers. Real-time inventory via Firebase, secure payments, shipped end-to-end.',
    tags: ['Flutter','Dart','Firebase','Stripe'],
    color: 'from-emerald-500/20 to-cyan/10', accent: '#4ade80',
  },
  {
    year: '2025', title: 'Weather LSTM', role: 'MSc Research · Time Series',
    summary: 'Stacked LSTM architectures for multivariate meteorological forecasting, benchmarked against ARIMA and Prophet baselines across European weather stations.',
    tags: ['PyTorch','LSTM','Pandas','Research'],
    color: 'from-orange/20 to-pink-500/10', accent: '#FF7A3D',
  },
  {
    year: '2023', title: 'Smart Agri IoT', role: 'IoT · Mobile Dashboard',
    summary: 'Sensor-to-app platform: soil-moisture and climate data from ESP32 nodes into Firebase, surfaced in a Flutter dashboard for irrigation scheduling.',
    tags: ['IoT','ESP32','Flutter','Firebase'],
    color: 'from-violet/20 to-cyan/10', accent: '#8A5CFF',
  },
]

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3"><div className="label">03 — Work</div></div>
          <div className="md:col-span-9">
            <h2 className="max-w-2xl text-3xl font-light tracking-tight md:text-4xl">
              Selected <span className="text-cyan">projects</span> I've shipped.
            </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map(p => (
            <article key={p.title} className="group relative overflow-hidden rounded-xl border border-white/10 p-6 transition hover:border-white/20 hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}>
              <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${p.color} opacity-60 blur-2xl`} style={{ background: p.accent, opacity: 0.2 }}/>
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <span className="mono text-[10px] uppercase tracking-widest text-muted">{p.role} · {p.year}</span>
                  <span className="mono text-[10px]" style={{ color: p.accent }}>● {p.title.split(' ')[0].toLowerCase()}</span>
                </div>
                <h3 className="mb-2 text-xl font-medium tracking-tight">{p.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="mt-5 flex items-center gap-1 text-xs mono" style={{color: p.accent}}>
                  View case study <ArrowUpRight size={12}/>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
