import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type Project = {
  id: string
  year: string
  title: string
  role: string
  summary: string
  tags: string[]
  accent: string
}

const projects: Project[] = [
  {
    id: 'drowning',
    year: '2024',
    title: 'Drowning Detection',
    role: 'Computer Vision',
    summary: 'YOLOv9/TF pipeline at 32fps, 89% mAP@0.5 — sub-second alert latency.',
    tags: ['Python', 'YOLOv9', 'CUDA'],
    accent: 'text-blue-900 dark:text-blue-300',
  },
  {
    id: 'plucknpay',
    year: '2023',
    title: 'PlucknPay',
    role: 'Mobile · Product',
    summary: 'Flutter + Firebase marketplace connecting farmers with consumers.',
    tags: ['Flutter', 'Firebase', 'Stripe'],
    accent: 'text-emerald-900 dark:text-emerald-300',
  },
  {
    id: 'weather-lstm',
    year: '2025',
    title: 'Weather LSTM',
    role: 'MSc Research',
    summary: 'Stacked LSTM multivariate forecasting, benchmarked against ARIMA/Prophet.',
    tags: ['PyTorch', 'LSTM', 'Time Series'],
    accent: 'text-amber-900 dark:text-amber-300',
  },
  {
    id: 'smart-agri',
    year: '2023',
    title: 'Smart Agri IoT',
    role: 'IoT · Dashboard',
    summary: 'ESP sensors → Firebase → Flutter for remote farm monitoring.',
    tags: ['IoT', 'Flutter', 'Firebase'],
    accent: 'text-lime-900 dark:text-lime-300',
  },
]

export default function Projects() {
  return (
    <section className="flex h-full items-center py-14 md:py-16">
      <div className="container-x w-full">
        <div className="mb-8 grid gap-6 md:mb-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-label">03 — Selected work</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="max-w-2xl text-2xl font-light tracking-tight md:text-4xl"
            >
              A few things I've shipped — research, product, and
              <em className="font-serif italic"> everything in between</em>.
            </motion.h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.06 }}
              className="group relative rounded-sm border border-paper-300/60 bg-paper-50/60 p-5 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(60,40,15,0.25)] dark:border-paper-800/70 dark:bg-paper-900/40 md:p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-500">
                  {p.role} · {p.year}
                </span>
                <span className={`font-mono text-[10px] ${p.accent}`}>● {p.id}</span>
              </div>

              <h3 className="mb-2 text-lg font-normal tracking-tight md:text-xl">{p.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-paper-600 dark:text-paper-400">
                {p.summary}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="rounded-full border border-paper-300/60 px-2 py-0.5 font-mono text-[10px] text-paper-600 dark:border-paper-800 dark:text-paper-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium"
              >
                <span className="link-underline">Read more</span>
                <ArrowUpRight size={12} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
