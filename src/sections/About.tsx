import { motion } from "framer-motion";
import { Code2, Brain, Smartphone } from "lucide-react";

const STATS = [
  { label: "Years coding",  value: "4+" },
  { label: "Projects shipped", value: "15+" },
  { label: "MSc focus",     value: "AI/ML" },
  { label: "Stack depth",   value: "End-to-end" },
];

const FOCUS = [
  { icon: Brain,       title: "AI & Computer Vision", body: "Deep learning pipelines with YOLO, LSTMs, TensorFlow and OpenCV — turning research into production-grade systems." },
  { icon: Smartphone,  title: "Mobile & Cross-Platform", body: "Flutter and Dart for high-fidelity iOS/Android experiences with clean architecture and Firebase." },
  { icon: Code2,       title: "Web & Systems",         body: "Performant, accessible web apps with React/Next.js, Node, and cloud primitives on AWS." },
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="mb-16 flex items-end justify-between gap-6 flex-wrap"
        >
          <div>
            <p className="eyebrow mb-4">01 — About</p>
            <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">
              I build <span className="text-accent">calm, intelligent software</span> that
              bridges complex AI and the interfaces people actually use.
            </h2>
          </div>
          <p className="max-w-md text-soft text-base md:text-lg leading-relaxed">
            MSc Advanced Computer Science candidate at the University of Hertfordshire,
            specialising in computer vision, deep learning and cross-platform engineering.
            I care about clarity, performance and craft.
          </p>
        </motion.div>

        {/* Focus grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {FOCUS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              className="glass rounded-3xl p-8 hover:shadow-soft dark:hover:shadow-soft-dark transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent grid place-items-center mb-6">
                <f.icon size={20} />
              </div>
              <h3 className="text-xl font-semibold mb-2 tracking-tight">{f.title}</h3>
              <p className="text-soft leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/[0.06] dark:bg-white/[0.08] rounded-3xl overflow-hidden border hairline">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-[var(--bg)] p-8"
            >
              <p className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-2">
                {s.value}
              </p>
              <p className="text-soft text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
