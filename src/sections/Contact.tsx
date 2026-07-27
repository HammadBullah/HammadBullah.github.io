import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const channels = [
  { label: 'Email', value: 'hammabdullah@gmail.com', href: 'mailto:hammabdullah@gmail.com' },
  { label: 'LinkedIn', value: '/in/hammad-safi', href: 'https://www.linkedin.com/in/hammad-safi' },
  { label: 'GitHub', value: '/HammadBullah', href: 'https://github.com/HammadBullah' },
  { label: 'Phone', value: '+44 7352 664787', href: 'tel:+447352664787' },
  { label: 'Resume', value: 'PDF — available on request', href: 'mailto:hammabdullah@gmail.com?subject=Resume%20request' },
]

export default function Contact() {
  return (
    <section className="py-24 md:py-40">
      <div className="container-x">
        <div className="mb-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="section-label">05 — Contact</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-4xl font-light leading-[1.05] tracking-tightest md:text-6xl lg:text-7xl"
            >
              Have something
              <br />
              <em className="font-serif italic text-paper-500 dark:text-paper-400">
                thoughtful
              </em>{' '}
              to build?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
              className="mt-8 max-w-xl text-lg text-paper-600 dark:text-paper-400"
            >
              I'm open to full-time roles, research collaborations, and a small number of
              freelance engagements. The best way to reach me is email — I reply within a
              day or two.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
              href="mailto:hammabdullah@gmail.com"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-paper-900 bg-paper-900 px-7 py-3.5 text-[15px] font-medium text-paper-50 transition-colors hover:bg-paper-800 dark:border-paper-100 dark:bg-paper-100 dark:text-paper-950 dark:hover:bg-paper-200"
            >
              Say hello <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="hairline pt-8"
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {channels.map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                className="group block"
              >
                <div className="section-label mb-2 transition-colors group-hover:text-paper-900 dark:group-hover:text-paper-100">
                  {c.label}
                </div>
                <div className="inline-flex items-center gap-1 text-sm text-paper-700 group-hover:text-paper-900 dark:text-paper-300 dark:group-hover:text-paper-100">
                  <span className="link-underline">{c.value}</span>
                  {c.href.startsWith('http') && <ArrowUpRight size={12} />}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
