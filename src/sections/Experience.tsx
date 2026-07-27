import { motion } from 'framer-motion'

type Entry = {
  year: string
  role: string
  org: string
  description: string
}

const entries: Entry[] = [
  {
    year: '2024 — Present',
    role: 'MSc Advanced Computer Science',
    org: 'University of Hertfordshire',
    description: 'ML, distributed systems, AI research — LSTM forecasting dissertation.',
  },
  {
    year: '2023 — 2024',
    role: 'Freelance ML & Full-Stack Engineer',
    org: 'Independent',
    description: 'Shipped Flutter apps, CV prototypes, and internal startup tooling.',
  },
  {
    year: '2023',
    role: 'Research — Drowning Detection',
    org: 'Computer Vision Lab',
    description: 'YOLOv9/TF pipeline — 89% mAP@0.5 at 32fps on edge hardware.',
  },
  {
    year: '2022 — 2023',
    role: 'Mobile Engineer — PlucknPay',
    org: 'Founding Engineer',
    description: 'Shipped a Flutter + Firebase farm-to-consumer marketplace.',
  },
]

export default function Experience() {
  return (
    <section className="flex h-full items-center py-14 md:py-16">
      <div className="container-x w-full">
        <div className="mb-8 grid gap-8 md:mb-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-label">04 — Chronicle</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="max-w-2xl text-2xl font-light tracking-tight md:text-4xl"
            >
              A short <em className="font-serif italic">chronology</em> — study, research, shipping.
            </motion.h2>
          </div>
        </div>

        <ol className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-paper-300/60 md:block dark:bg-paper-800" />
          {entries.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.05 }}
              className="grid gap-3 border-t border-paper-300/60 py-4 md:grid-cols-12 md:gap-6 md:border-t-0 md:py-4 dark:border-paper-800 md:dark:border-t-0"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-500 md:col-span-3 md:pl-8">
                <span className="relative hidden md:block">
                  <span className="dot absolute -left-[37px] top-1.5 bg-paper-900 ring-4 ring-paper-50 dark:bg-paper-100 dark:ring-paper-950" />
                  {e.year}
                </span>
                <span className="md:hidden">{e.year}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-base font-normal tracking-tight md:text-lg">{e.role}</h3>
                <div className="text-xs text-paper-500">{e.org}</div>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-paper-700 dark:text-paper-300">
                  {e.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
