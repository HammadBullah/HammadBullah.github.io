import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z"/>
    </svg>
  );
}
import { MagneticButton } from "../components/MagneticButton";

// Inline SVG "product mockup" gradients as placeholders — replace with real screenshots when available.
const PROJECTS = [
  {
    tag: "Computer Vision",
    year: "2025",
    title: "Drowning Detection",
    subtitle: "Real-time safety intelligence",
    stack: "YOLOv9 · TensorFlow · Python",
    body:
      "Real-time surveillance system achieving 89% accuracy for pool-safety monitoring, with low-latency inference, edge deployment and tiered alerting.",
    github: "https://github.com/HammadBullah",
    live: "#",
    // Visual palette
    bgA: "#0a84ff",
    bgB: "#5ac8fa",
    bgC: "#312e81",
    motif: "vision",
  },
  {
    tag: "Mobile / Marketplace",
    year: "2024",
    title: "PlucknPay",
    subtitle: "Bargain-native commerce",
    stack: "Flutter · Dart · Firebase",
    body:
      "Cross-platform bargaining marketplace with real-time negotiation between buyers and vendors and a clean-architecture Flutter codebase.",
    github: "https://github.com/HammadBullah",
    live: "#",
    bgA: "#ff375f",
    bgB: "#ff9f0a",
    bgC: "#7c2d12",
    motif: "market",
  },
  {
    tag: "AI Research",
    year: "2026",
    title: "Weather LSTM",
    subtitle: "MSc research · time series",
    stack: "LSTM · Python · Research",
    body:
      "Comparative study of predictive AI models on meteorological time-series datasets, with reproducible pipelines and rigorous evaluation.",
    github: "https://github.com/HammadBullah",
    live: "#",
    bgA: "#bf5af2",
    bgB: "#0a84ff",
    bgC: "#1e1b4b",
    motif: "chart",
  },
  {
    tag: "IoT / Mobile",
    year: "2023",
    title: "Smart Agriculture",
    subtitle: "Sensing → alert → action",
    stack: "IoT · Dart · Firebase",
    body:
      "Automated farm monitoring with threshold-based real-time alerts, sensor integration and a cross-platform mobile dashboard.",
    github: "https://github.com/HammadBullah",
    live: "#",
    bgA: "#30d158",
    bgB: "#0a84ff",
    bgC: "#052e16",
    motif: "iot",
  },
];

function Motif({ kind, c1, c2 }: { kind: string; c1: string; c2: string }) {
  // Abstract SVG visual per project
  if (kind === "vision") {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <radialGradient id="v" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={c2} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c1} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#v)" />
        {Array.from({ length: 28 }).map((_, i) => (
          <rect
            key={i}
            x={40 + (i % 7) * 110}
            y={60 + Math.floor(i / 7) * 80}
            width="84"
            height="52"
            rx="10"
            fill="white"
            fillOpacity={0.06 + (i % 4) * 0.05}
            stroke="white"
            strokeOpacity="0.2"
          />
        ))}
        <rect x="180" y="180" width="440" height="150" rx="18" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.3" />
        <circle cx="400" cy="255" r="44" fill="white" fillOpacity="0.2" />
        <circle cx="400" cy="255" r="18" fill="white" fillOpacity="0.6" />
      </svg>
    );
  }
  if (kind === "market") {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <linearGradient id="m" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#m)" opacity="0.6" />
        <g stroke="white" strokeOpacity="0.25" fill="none">
          <path d="M60,360 C200,200 320,420 460,240 S720,320 760,200" strokeWidth="3" />
        </g>
        {[120, 220, 360, 500, 640].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={250 - i * 10} r="10" fill="white" fillOpacity="0.5" />
            <rect x={x - 28} y={260 - i * 10} width="56" height="30" rx="8" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.3" />
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "chart") {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <linearGradient id="c" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#c)" opacity="0.35" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={60 + i * 60} y1={420} x2={60 + i * 60} y2={420 - (Math.sin(i / 1.4) + 1.2) * 120 - 20} stroke="white" strokeOpacity="0.3" strokeWidth="2" />
        ))}
        <path d="M60,320 C200,180 260,400 400,260 S640,120 740,220 L740,440 L60,440 Z" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.6" strokeWidth="2" />
      </svg>
    );
  }
  // iot
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <radialGradient id="i" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.8" />
          <stop offset="100%" stopColor={c1} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#i)" />
      <g stroke="white" strokeOpacity="0.3" fill="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx="400" cy="250" r={40 + i * 22} />
        ))}
      </g>
      <circle cx="400" cy="250" r="30" fill="white" fillOpacity="0.5" />
      {[0, 72, 144, 216, 288].map((a, i) => (
        <circle key={i} cx={400 + Math.cos((a * Math.PI) / 180) * 170} cy={250 + Math.sin((a * Math.PI) / 180) * 100} r="10" fill="white" fillOpacity="0.7" />
      ))}
    </svg>
  );
}

function ProjectCard({
  index,
  total,
  p,
  progress,
  rangeStart,
  rangeEnd,
}: {
  index: number;
  total: number;
  p: typeof PROJECTS[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  rangeStart: number;
  rangeEnd: number;
}) {
  const enter = rangeStart;
  const midStart = rangeStart + (rangeEnd - rangeStart) * 0.12;
  const midEnd = rangeEnd - (rangeEnd - rangeStart) * 0.12;
  const exit = rangeEnd;

  const opacity = useTransform(progress, [enter, midStart, midEnd, exit], [0, 1, 1, 0]);
  const y = useTransform(progress, [enter, midStart, midEnd, exit], [120, 0, 0, -80]);
  const scale = useTransform(progress, [enter, midStart, midEnd, exit], [0.92, 1, 1, 0.96]);
  const blur = useTransform(progress, [enter, midStart, midEnd, exit], ["blur(14px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  const mediaScale = useTransform(progress, [enter, midStart, midEnd, exit], [1.08, 1, 1, 1.04]);
  const mediaY = useTransform(progress, [enter, midStart, midEnd, exit], [20, 0, 0, -10]);

  return (
    <motion.article
      style={{ opacity, y, scale, filter: blur }}
      className="project-card"
    >
      {/* Top meta */}
      <div className="flex items-center justify-between text-[11px] tracking-[0.28em] text-mute font-mono uppercase">
        <div className="flex items-center gap-3">
          <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span className="dot-sep" />
          <span>{p.tag}</span>
          <span className="dot-sep hidden sm:inline" />
          <span className="hidden sm:inline">{p.year}</span>
        </div>
        <span className="hidden md:inline">{p.subtitle}</span>
      </div>

      {/* Media */}
      <div className="relative my-6 md:my-10">
        <motion.div
          style={{ scale: mediaScale, y: mediaY }}
          className="media relative mx-auto w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${p.bgA}, ${p.bgC} 60%, ${p.bgB})`,
            }}
          />
          <div className="absolute inset-0">
            <Motif kind={p.motif} c1={p.bgA} c2={p.bgB} />
          </div>
          <div className="absolute inset-0 noise-layer opacity-[0.05]" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white/90">
            <div className="backdrop-blur-md bg-white/10 rounded-xl px-3 py-2 border border-white/20 text-[11px] tracking-widest font-mono">
              {p.title.toUpperCase()}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-12 gap-6 md:gap-10 items-end">
        <div className="md:col-span-8">
          <h3 className="font-display text-3xl md:text-6xl font-semibold tracking-tight leading-[1.02] mb-3">
            {p.title}
          </h3>
          <p className="text-soft max-w-2xl leading-relaxed">{p.body}</p>
        </div>
        <div className="md:col-span-4 flex md:justify-end items-center gap-2 flex-wrap">
          <span className="chip" style={{ color: "var(--fg)" }}>
            {p.stack}
          </span>
          <MagneticButton
            as="a"
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.2}
            className="btn-secondary !px-4 !py-2 text-[12px] arrow-slide"
          >
            <GithubIcon size={14} /> GitHub
          </MagneticButton>
          <MagneticButton
            as="a"
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.2}
            className="btn-primary !px-4 !py-2 text-[12px] arrow-slide"
          >
            Live demo <ArrowUpRight size={14} />
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const total = PROJECTS.length;
  const step = 1 / total;
  const pad = step * 0.2;

  const bgA = useTransform(scrollYProgress, PROJECTS.map((_, i) => i / (total - 1)), PROJECTS.map((p) => p.bgA));
  const bgB = useTransform(scrollYProgress, PROJECTS.map((_, i) => i / (total - 1)), PROJECTS.map((p) => p.bgB));
  const tintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.18, 0.18, 0]);

  return (
    <section id="projects" className="relative" aria-label="Selected work">
      <div className="section pt-28 md:pt-36">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="eyebrow mb-4"
              >
                03 — Selected work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl"
              >
                A few things I've built.
              </motion.h2>
            </div>
            <p className="text-soft text-sm max-w-xs">Scroll to walk through projects.</p>
          </div>
        </div>
      </div>

      <div ref={ref} style={{ height: `${total * 100}vh` }} className="relative">
        <div className="sticky-stack">
          {/* Animated color wash */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, var(--bg) 0%, var(--bg) 100%)",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, transparent, var(--bg-soft))",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, var(--blob-1), var(--blob-2))",
              mixBlendMode: "overlay",
              opacity: tintOpacity,
              filter: "blur(80px)",
              // @ts-ignore
              "--tw-gradient-from": bgA,
              // @ts-ignore
              "--tw-gradient-to": bgB,
            } as any}
          />
          <div className="noise-layer" />

          {/* Left rail */}
          <div className="rail hidden md:block">
            <motion.div
              className="fill"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
            {PROJECTS.map((_, i) => (
              <span key={i} className="rail-dot" style={{ top: `${(i / (total - 1)) * 100}%` }} />
            ))}
          </div>

          {PROJECTS.map((p, i) => {
            const rs = i * step - pad;
            const re = (i + 1) * step + pad;
            return (
              <ProjectCard
                key={p.title}
                index={i}
                total={total}
                p={p}
                progress={scrollYProgress}
                rangeStart={Math.max(0, rs)}
                rangeEnd={Math.min(1, re)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
