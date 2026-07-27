import { motion } from 'framer-motion'

const groups = [
  {
    title: 'Machine Learning',
    items: ['TensorFlow', 'PyTorch', 'YOLOv9', 'Computer Vision', 'Time-Series (LSTM)', 'MLOps'],
  },
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Dart', 'SQL', 'Java'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js / R3F'],
  },
  {
    title: 'Mobile',
    items: ['Flutter', 'Firebase', 'Responsive Design', 'App Store Deployment'],
  },
  {
    title: 'Backend & DevOps',
    items: ['Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
  },
  {
    title: 'Tooling',
    items: ['Git', 'Linux', 'CI/CD', 'Figma', 'Jupyter', 'Linux / shell'],
  },
]

export default function Skills() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="section-label">02 — Toolkit</div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="max-w-2xl text-3xl font-light tracking-tight md:text-4xl"
            >
              A small, sharp set of tools — picked for <em className="font-serif italic">leverage</em>.
            </motion.h2>
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.06 }}
            >
              <div className="section-label mb-4">{g.title}</div>
              <ul className="border-t border-paper-200 dark:border-paper-800">
                {g.items.map(item => (
                  <li
                    key={item}
                    className="flex items-baseline justify-between border-b border-paper-200 py-3 text-[15px] dark:border-paper-800"
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
