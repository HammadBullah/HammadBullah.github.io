import { motion } from 'framer-motion'

const paragraphs = [
  `I'm an AI and software engineer with an appetite for problems where machine learning
  meets real users — computer-vision systems that see, mobile apps that people use daily,
  and backend infrastructure that quietly holds it all together.`,
  `My work lives at the intersection of research and craft. I care as much about model
  accuracy and clean data pipelines as I do about the latency of a button press and the
  weight of a typeface. The best software, in my view, is the kind that disappears.`,
  `Outside of the editor you'll find me reading about distributed systems, tinkering with
  time-series models, or chasing a decent cup of coffee around Rotterdam.`,
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="section-label md:sticky md:top-28">01 — About</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mb-10 max-w-2xl text-3xl font-light leading-tight tracking-tight md:text-4xl"
            >
              I build software that's <em className="font-serif italic">thoughtful</em> —
              quiet on the surface, rigorous underneath.
            </motion.h2>

            <div className="space-y-6 text-lg leading-relaxed text-paper-700 dark:text-paper-300">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Quick facts */}
            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
              <Fact k="Location" v="Rotterdam, NL" />
              <Fact k="Education" v="MSc Adv. Computer Science" />
              <Fact k="University" v="University of Hertfordshire" />
              <Fact k="Email" v="hammabdullah@gmail.com" />
              <Fact k="Phone" v="+44 7352 664787" />
              <Fact k="Languages" v="English, Urdu, Pashto" />
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
      <div className="section-label mb-1.5">{k}</div>
      <div className="text-sm text-paper-800 dark:text-paper-200">{v}</div>
    </div>
  )
}
