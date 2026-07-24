import { motion } from "framer-motion";

const CATEGORIES = [
  {
    title: "AI & Vision",
    items: [
      "Python", "TensorFlow", "PyTorch", "YOLOv9",
      "LSTM / CNNs", "OpenCV", "NumPy / Pandas",
    ],
  },
  {
    title: "Mobile & Frontend",
    items: [
      "Flutter", "Dart", "React", "TypeScript",
      "Next.js", "Tailwind", "Framer Motion",
    ],
  },
  {
    title: "Backend & Cloud",
    items: [
      "Node.js", "Firebase", "PostgreSQL", "Docker",
      "AWS", "Linux", "CI/CD", "REST / WebSockets",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40 px-6 sm:px-10 bg-soft">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">04 — Toolkit</p>
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight">
            A toolkit biased toward shipping,
            <br className="hidden md:block" />
            not toward trends.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              className="rounded-3xl border hairline p-8 bg-[var(--bg)]"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-soft mb-6">
                {cat.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <li
                    key={s}
                    className="px-3 py-1.5 rounded-full text-sm border hairline bg-[var(--bg-soft)] hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
