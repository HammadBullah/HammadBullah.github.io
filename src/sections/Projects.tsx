import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    tag: "Computer Vision",
    year: "2025",
    title: "Drowning Detection",
    stack: "YOLOv9 · TensorFlow · Python",
    body:
      "Real-time surveillance system achieving 89% accuracy for pool-safety monitoring, with low-latency inference and alerting.",
    accent: "from-blue-500/30 to-cyan-400/20",
  },
  {
    tag: "Mobile / Marketplace",
    year: "2024",
    title: "PlucknPay",
    stack: "Flutter · Dart · Firebase",
    body:
      "Cross-platform bargaining marketplace with real-time negotiation between buyers and vendors and clean-architecture Flutter codebase.",
    accent: "from-pink-500/30 to-orange-400/20",
  },
  {
    tag: "AI Research",
    year: "2026",
    title: "Weather LSTM",
    stack: "LSTM · Python · Research",
    body:
      "MSc research comparing predictive AI models on meteorological time-series datasets, with rigorous evaluation and reproducible pipelines.",
    accent: "from-violet-500/30 to-indigo-400/20",
  },
  {
    tag: "IoT / Mobile",
    year: "2023",
    title: "Smart Agriculture",
    stack: "IoT · Dart · Firebase",
    body:
      "Automated farm monitoring with threshold-based real-time alerts, sensor integration and a cross-platform mobile dashboard.",
    accent: "from-emerald-500/30 to-teal-400/20",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-40 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-16">
          <div>
            <p className="eyebrow mb-4">03 — Selected work</p>
            <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight">
              A few things I've built.
            </h2>
          </div>
          <p className="max-w-sm text-soft">
            A small selection of AI, mobile and web projects — more available on request.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border hairline p-8 md:p-10 flex flex-col justify-between min-h-[340px] bg-[var(--bg)] transition-shadow hover:shadow-soft dark:hover:shadow-soft-dark"
            >
              {/* Soft gradient blob */}
              <div
                className={`pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="chip">{p.tag}</span>
                  <span className="chip">{p.year}</span>
                </div>
                <span className="w-10 h-10 rounded-full border hairline grid place-items-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-soft max-w-md leading-relaxed">{p.body}</p>
                <p className="mt-6 text-xs font-mono tracking-wide text-soft uppercase">
                  {p.stack}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/HammadBullah"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            See more on GitHub
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
