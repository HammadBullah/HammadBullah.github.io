import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Smartphone } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { SplitText } from "../components/SplitText";

const STATS = [
  { label: "Years coding", value: "4+" },
  { label: "Projects shipped", value: "15+" },
  { label: "MSc focus", value: "AI/ML" },
  { label: "Stack", value: "End-to-end" },
];

const FOCUS = [
  { icon: Brain,      title: "AI & Computer Vision", body: "Deep-learning pipelines with YOLO, LSTMs, TensorFlow and OpenCV — turning research into production-grade systems." },
  { icon: Smartphone, title: "Mobile & Cross-Platform", body: "Flutter and Dart for high-fidelity iOS/Android experiences, with clean architecture and Firebase." },
  { icon: Code2,      title: "Web & Systems", body: "Performant, accessible web apps with React/Next.js, Node and cloud primitives on AWS." },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.3"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-40 section">
      <div className="noise-layer" />
      <div className="container-x">
        <header className="flex items-end justify-between gap-6 flex-wrap mb-16">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-4"
            >
              01 — About
            </motion.p>
            <SplitText
              as="h2"
              className="font-display text-4xl md:text-6xl tracking-tight"
              text="I build calm, intelligent software that bridges complex AI and the interfaces people actually use."
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md text-soft text-base md:text-lg leading-relaxed"
          >
            MSc Advanced Computer Science candidate at the University of Hertfordshire,
            specialising in computer vision, deep learning and cross-platform engineering.
            I care about clarity, performance and craft.
          </motion.p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Tilt portrait/visual */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
            className="lg:col-span-5"
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.25}
              glareColor="#ffffff"
              glarePosition="all"
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              className="relative rounded-3xl overflow-hidden border hairline aspect-[4/5] tilt-card bg-soft"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 20% 10%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 60%), radial-gradient(100% 80% at 80% 90%, color-mix(in srgb, var(--accent-2) 35%, transparent), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 noise-layer" />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <div className="inline-flex items-center gap-2 chip mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Currently building
                  </div>
                  <p className="text-2xl font-semibold tracking-tight leading-tight">
                    Building AI systems <br />
                    <span className="text-soft font-normal">with care.</span>
                  </p>
                </div>
              </div>
              <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-soft/70 rotate-90 origin-top-right">
                HAMMAD · SAFI · 2026
              </div>
            </Tilt>
          </motion.div>

          {/* Copy + stats */}
          <div className="lg:col-span-7 space-y-10">
            <div className="grid sm:grid-cols-3 gap-4">
              {FOCUS.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
                  className="rounded-2xl border hairline p-6 bg-elev hover:shadow-[var(--shadow-soft)] transition-shadow group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] grid place-items-center mb-5 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                    <f.icon size={17} />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-1.5 tracking-tight">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed text-soft">{f.body}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border hairline bg-[var(--hairline)]"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.06 }}
                  className="bg-[var(--bg)] p-6"
                >
                  <p className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-1">{s.value}</p>
                  <p className="text-[12px] text-soft">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-soft leading-relaxed max-w-xl"
            >
              I care about the <span className="text-[var(--fg)]">edges</span> — the moments where
              software meets people. That's where tiny details turn into trust.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
