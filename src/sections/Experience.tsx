import { motion } from 'framer-motion'

type Entry = {
  year: string
  role: string
  org: string
  location: string
  description: string
}

const entries: Entry[] = [
  {
    year: '2024 — Present',
    role: 'MSc Advanced Computer Science',
    org: 'University of Hertfordshire',
    location: 'Hatfield, UK',
    description:
      'Postgraduate study focused on machine learning, distributed systems, and applied AI research. Dissertation work on LSTM weather forecasting.',
  },
  {
    year: '2023 — 2024',
    role: 'Freelance ML & Full-Stack Engineer',
    org: 'Independent',
    location: 'Remote',
    description:
      'Shipped production Flutter apps, computer-vision prototypes for small businesses, and internal tooling for early-stage startups.',
  },
  {
    year: '2023',
    role: 'Research Project — Drowning Detection',
    org: 'Computer Vision Lab',
    location: 'UK',
    description:
      'Led development of a YOLOv9/TensorFlow pipeline for real-time drowning detection; achieved 89% mAP@0.5 at 32fps on edge-class hardware.',
  },
  {
    year: '2022 — 2023',
    role: 'Mobile Developer — PlucknPay',
    org: 'Founding Engineer',
    location: 'Remote',
    description:
      'Designed and shipped a Flutter + Firebase marketplace for farm-to-consumer commerce, including payments, messaging, and admin tooling.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="section-label">04 — Experience</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="max-w-2xl text-3xl font-light tracking-tight md:text-4xl"
            >
              A short <em className="font-serif italic">chronology</em> — study, research,
              and shipping things people use.
            </motion.h2>
          </div>
        </div>

        <ol className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-paper-200 md:block dark:bg-paper-800" />
          {entries.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.05 }}
              className="grid gap-6 border-t border-paper-200 py-10 md:grid-cols-12 md:gap-8 md:border-t-0 md:py-12 dark:border-paper-800 md:dark:border-t-0"
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-paper-500 md:col-span-3 md:pl-8">
                <span className="relative hidden md:block">
                  <span className="dot absolute -left-[37px] top-1.5 bg-paper-900 ring-4 ring-paper-50 dark:bg-paper-100 dark:ring-paper-950" />
                  {e.year}
                </span>
                <span className="md:hidden">{e.year}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-xl font-normal tracking-tight md:text-2xl">
                  {e.role}
                </h3>
                <div className="mt-1 text-sm text-paper-500">
                  {e.org} · {e.location}
                </div>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-paper-700 dark:text-paper-300">
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
