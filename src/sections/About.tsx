import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="flex h-full items-center py-16 md:py-20">
      <div className="container-x w-full">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <div className="section-label md:sticky md:top-28">01 — About</div>
          </div>

          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mb-6 max-w-3xl text-2xl font-light leading-tight tracking-tight md:text-4xl"
            >
              I build software that's <em className="font-serif italic">thoughtful</em> —
              quiet on the surface, rigorous underneath.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mb-6 max-w-2xl text-base leading-relaxed text-paper-700 md:text-lg dark:text-paper-300"
            >
              I'm an AI and software engineer who likes problems where ML meets real users —
              computer-vision systems that see, mobile apps people use daily, and backend
              infrastructure that quietly holds it all together. My work lives at the
              intersection of research and craft: I care as much about model accuracy and
              clean pipelines as about the weight of a typeface and the latency of a button.
            </motion.p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
              <Fact k="Location" v="Hatfield, UK" />
              <Fact k="Education" v="MSc Adv. Computer Science" />
              <Fact k="University" v="Univ. of Hertfordshire" />
              <Fact k="Email" v="hammabdullah@gmail.com" />
              <Fact k="Phone" v="+44 7352 664787" />
              <Fact k="Languages" v="English · Urdu · Pashto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="section-label mb-1">{k}</div>
      <div className="text-sm text-paper-800 dark:text-paper-200">{v}</div>
    </div>
  )
}
