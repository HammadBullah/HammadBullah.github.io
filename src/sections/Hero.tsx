import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="container-x">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          className="space-y-10"
        >
          <motion.div variants={item} className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-500">
              Available for work · Rotterdam, NL
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl text-5xl font-light leading-[1.05] tracking-tightest md:text-7xl lg:text-[6.5rem]"
          >
            <span className="block">Hammad Safi.</span>
            <span className="block">
              <em className="font-serif italic font-normal text-paper-500 dark:text-paper-400">
                AI & software engineer
              </em>
            </span>
            <span className="block">
              building calm, useful systems
              <span className="text-paper-400 dark:text-paper-600">.</span>
            </span>
          </motion.h1>

          <motion.div
            variants={item}
            className="flex flex-col gap-6 pt-4 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xl text-lg text-paper-600 dark:text-paper-400 md:text-xl">
              MSc Advanced Computer Science. I design and ship intelligent products across
              machine learning, full-stack web, and mobile — with an eye for quiet,
              considered interfaces.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                <span className="link-underline">View selected work</span>
                <ArrowDownRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="mailto:hammabdullah@gmail.com"
                className="rounded-full border border-paper-900 bg-paper-900 px-5 py-2.5 text-sm font-medium text-paper-50 transition-colors hover:bg-paper-800 dark:border-paper-100 dark:bg-paper-100 dark:text-paper-950 dark:hover:bg-paper-200"
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          {/* Meta strip */}
          <motion.div variants={item} className="hairline pt-8">
            <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
              <Meta label="Currently" value="MSc @ Hertfordshire" />
              <Meta label="Focus" value="ML · Full-stack · Mobile" />
              <Meta label="Stack" value="Python · TS · React · Flutter" />
              <Meta label="Status" value="Open to roles" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="section-label mb-1.5">{label}</div>
      <div className="text-sm text-paper-800 dark:text-paper-200">{value}</div>
    </div>
  )
}
