import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type Project = {
  id: string
  year: string
  title: string
  role: string
  summary: string
  tags: string[]
  metric?: { label: string; value: string }
  color: string
  bg: string
}

const projects: Project[] = [
  {
    id: 'drowning',
    year: '2024',
    title: 'Drowning Detection System',
    role: 'Computer Vision · Research',
    summary:
      'A real-time computer-vision pipeline built on YOLOv9 and TensorFlow that detects drowning events from overhead pool cameras at 32fps with 89% mAP@0.5 — designed to alert lifeguards within sub-second latency windows.',
    tags: ['Python', 'YOLOv9', 'TensorFlow', 'OpenCV', 'CUDA'],
    metric: { label: 'mAP@0.5 / FPS', value: '89% · 32fps' },
    color: '#1e3a8a',
    bg: 'from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40',
  },
  {
    id: 'plucknpay',
    year: '2023',
    title: 'PlucknPay',
    role: 'Mobile Full-Stack · Product',
    summary:
      'A Flutter marketplace connecting local farmers directly with consumers. Real-time inventory via Firebase, secure payments, and a clean transactional UI — shipped end-to-end from concept to store.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Stripe', 'Cloud Functions'],
    metric: { label: 'Scope', value: 'Full product' },
    color: '#14532d',
    bg: 'from-emerald-50 to-green-100 dark:from-emerald-950/40 dark:to-green-950/40',
  },
  {
    id: 'weather-lstm',
    year: '2025',
    title: 'Weather LSTM Forecasting',
    role: 'MSc Research · Time Series',
    summary:
      'MSc dissertation work exploring stacked LSTM architectures for multivariate meteorological forecasting, benchmarked against classical ARIMA and Prophet baselines across European weather stations.',
    tags: ['PyTorch', 'LSTM', 'Time Series', 'Pandas', 'Research'],
    metric: { label: 'Type', value: 'MSc Thesis' },
    color: '#7c2d12',
    bg: 'from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-950/40',
  },
  {
    id: 'smart-agri',
    year: '2023',
    title: 'Smart Agriculture IoT',
    role: 'IoT · Mobile Dashboard',
    summary:
      'A sensor-to-app agriculture platform: soil-moisture and climate data from ESP-based nodes, streamed to Firebase, and surfaced in a Flutter dashboard for remote farm monitoring and irrigation scheduling.',
    tags: ['IoT', 'ESP32', 'Flutter', 'Firebase', 'Dart'],
    metric: { label: 'Domain', value: 'AgriTech' },
    color: '#365314',
    bg: 'from-lime-50 to-green-100 dark:from-lime-950/40 dark:to-green-950/40',
  },
]

export default function Projects() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="section-label">03 — Selected work</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="max-w-2xl text-3xl font-light tracking-tight md:text-4xl"
            >
              A few things I've shipped — across research, product, and
              <em className="font-serif italic"> everything in between</em>.
            </motion.h2>
          </div>
        </div>

        <div className="space-y-20 md:space-y-28">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const reverse = index % 2 === 1
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`grid gap-8 md:grid-cols-12 md:gap-12 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      {/* Visual */}
      <div className="md:col-span-7">
        <div
          className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-paper-200 bg-gradient-to-br ${p.bg} dark:border-paper-800`}
        >
          <ProjectArtwork color={p.color} />
          <div className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-600/70 dark:text-paper-300/70">
            {p.id} · {p.year}
          </div>
          {p.metric && (
            <div className="absolute bottom-5 right-5 rounded-full bg-white/70 px-3 py-1.5 font-mono text-xs text-paper-800 backdrop-blur dark:bg-paper-900/70 dark:text-paper-100">
              {p.metric.label} — {p.metric.value}
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center md:col-span-5">
        <div className="section-label mb-3">{p.role}</div>
        <h3 className="mb-4 text-2xl font-light tracking-tight md:text-3xl">{p.title}</h3>
        <p className="mb-6 text-[15px] leading-relaxed text-paper-600 dark:text-paper-400">
          {p.summary}
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {p.tags.map(t => (
            <span
              key={t}
              className="rounded-full border border-paper-200 px-2.5 py-1 font-mono text-[11px] text-paper-600 dark:border-paper-800 dark:text-paper-400"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 text-sm">
          <a
            href="#"
            onClick={e => e.preventDefault()}
            className="group/link inline-flex items-center gap-1.5 font-medium"
          >
            <span className="link-underline">Case study</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
          <span className="text-paper-300 dark:text-paper-700">/</span>
          <a
            href="#"
            onClick={e => e.preventDefault()}
            className="inline-flex items-center gap-1.5 text-paper-600 transition-colors hover:text-paper-900 dark:text-paper-400 dark:hover:text-paper-100"
          >
            <span className="link-underline">Source</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectArtwork({ color }: { color: string }) {
  // Minimal abstract geometric artwork - pure SVG, no images needed
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="h-full w-full">
        <defs>
          <pattern id={`grid-${color}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.3" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#grid-${color})`} />
        <g stroke={color} strokeWidth="1" fill="none" opacity="0.5">
          <circle cx="200" cy="150" r="40" />
          <circle cx="200" cy="150" r="70" />
          <circle cx="200" cy="150" r="100" />
        </g>
        <circle cx="200" cy="150" r="12" fill={color} opacity="0.9" />
        <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.4">
          <line x1="200" y1="0" x2="200" y2="300" strokeDasharray="2 4" />
          <line x1="0" y1="150" x2="400" y2="150" strokeDasharray="2 4" />
        </g>
      </svg>
    </div>
  )
}
