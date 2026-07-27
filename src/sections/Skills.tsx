import { motion } from 'framer-motion'

const groups = [
  { title: 'Machine Learning', items: ['TensorFlow', 'PyTorch', 'YOLOv9', 'Computer Vision', 'LSTMs', 'MLOps'] },
  { title: 'Languages', items: ['Python', 'TypeScript', 'Dart', 'SQL', 'Java', 'C'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Tailwind', 'Framer Motion'] },
  { title: 'Mobile', items: ['Flutter', 'Firebase', 'Responsive Design'] },
  { title: 'Backend & DevOps', items: ['Node.js', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'] },
]

export default function Skills() {
  return (
    <section className="flex h-full items-center py-14 md:py-16">
      <div className="container-x w-full">
        <div className="mb-8 grid gap-8 md:mb-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="section-label">02 — Toolkit</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="max-w-2xl text-2xl font-light tracking-tight md:text-4xl"
            >
              A small, sharp set of tools — picked for
              <em className="font-serif italic"> leverage</em>.
            </motion.h2>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.06 }}
            >
              <div className="section-label mb-2">{g.title}</div>
              <ul className="border-t border-paper-300/60 dark:border-paper-800">
                {g.items.map(item => (
                  <li
                    key={item}
                    className="flex items-baseline justify-between border-b border-paper-300/60 py-2 text-sm dark:border-paper-800"
                  >
                    <span>{item}</span>
                    <span className="text-paper-300 dark:text-paper-700">—</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
