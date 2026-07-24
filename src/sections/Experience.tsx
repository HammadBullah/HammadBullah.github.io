import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Briefcase } from "lucide-react";

const ROLES = [
  {
    years: "2026 — Present",
    role: "Customer Service Operations",
    company: "Ladbrokes / Entain",
    place: "Hatfield, UK",
    body:
      "Operations and compliance in high-pressure retail environments — trained to stay calm, precise and systematic under load.",
    tint: "rgba(10,132,255,0.18)",
  },
  {
    years: "2023 — 2025",
    role: "Flutter & AI Developer",
    company: "Freelance",
    place: "Remote",
    body:
      "Shipped AI-powered mobile apps, including computer-vision models achieving 89% accuracy on deep-learning tasks and full Flutter products with Firebase.",
    tint: "rgba(191,90,242,0.18)",
  },
  {
    years: "2022 — 2023",
    role: "Web & Design Lead",
    company: "Amity University",
    place: "Dubai, UAE",
    body:
      "Led web and design infrastructure for student events, managing a team and digital systems for 500+ attendees across events and portals.",
    tint: "rgba(255,159,10,0.18)",
  },
];

function Card({
  index,
  total,
  role,
  progress,
  rangeStart,
  rangeEnd,
}: {
  index: number;
  total: number;
  role: typeof ROLES[number];
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}) {
  // Easier: define ranges relative to [0,1]
  const enter = rangeStart;
  const midStart = rangeStart + (rangeEnd - rangeStart) * 0.15;
  const midEnd = rangeEnd - (rangeEnd - rangeStart) * 0.15;
  const exit = rangeEnd;

  const opacity = useTransform(progress, [enter, midStart, midEnd, exit], [0, 1, 1, 0]);
  const y = useTransform(progress, [enter, midStart, midEnd, exit], [80, 0, 0, -40]);
  const scale = useTransform(progress, [enter, midStart, midEnd, exit], [0.92, 1, 1, 0.96]);
  const filter = useTransform(
    progress,
    [enter, midStart, midEnd, exit],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(6px)"]
  );

  const prevScale = 1 - (total - index) * 0.04;
  const finalScale = useTransform(scale, (v) => v * prevScale);

  return (
    <motion.article
      style={{ opacity, y, scale: finalScale, filter }}
      className="stack-card"
      data-index={index}
    >
      <div
        className="w-full max-w-5xl relative rounded-3xl border hairline bg-elev/70 backdrop-blur-xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        {/* subtle tint wash for this card */}
        <div
          aria-hidden
          className="absolute -top-40 -left-20 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
          style={{ background: role.tint, opacity: 0.9 }}
        />
        <div className="relative p-8 md:p-14 grid md:grid-cols-12 gap-8 md:gap-14 items-center">
          {/* Index/company mark */}
          <div className="md:col-span-4 flex md:flex-col items-start md:items-start gap-5">
            <div className="w-14 h-14 rounded-2xl border hairline grid place-items-center bg-soft">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="eyebrow mb-1">{role.years}</p>
              <p className="text-mono text-xs tracking-widest text-soft font-mono">{role.place}</p>
            </div>
          </div>

          {/* Copy */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-5 text-[11px] tracking-widest text-mute font-mono">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="dot-sep" />
              <span>{String(total).padStart(2, "0")}</span>
            </div>
            <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-3">
              {role.role}
            </h3>
            <p className="text-soft mb-5">{role.company}</p>
            <p className="text-base md:text-lg leading-relaxed text-soft max-w-2xl">
              {role.body}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = ROLES.length;
  // Distribute ranges across scroll progress
  const step = 1 / total;
  // Make ranges overlap slightly for smooth transitions
  const pad = step * 0.2;

  // Background tint shift through roles
  const bg = useTransform(
    scrollYProgress,
    ROLES.map((_, i) => i / (total - 1)),
    ROLES.map((r) => r.tint)
  );
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative" aria-label="Experience">
      {/* Anchor intro */}
      <div className="section pt-28 md:pt-36">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="eyebrow mb-4"
              >
                02 — Experience
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl"
              >
                A quiet track record of shipping.
              </motion.h2>
            </div>
            <p className="text-soft text-sm max-w-xs">
              Scroll to walk through the timeline.
            </p>
          </div>
        </div>
      </div>

      {/* Pin container: height = total cards * 100vh */}
      <div ref={containerRef} style={{ height: `${total * 100}vh` }} className="relative">
        <div className="sticky-stack">
          {/* Background tint blob */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: bg, opacity: bgOpacity, filter: "blur(80px)" }}
          />
          <div className="noise-layer" />

          {/* Year markers in margin */}
          <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-28 font-mono text-[10px] tracking-[0.3em] text-mute">
            {ROLES.map((r, i) => {
              const s = i / (total - 1);
              const opacity = useTransform(
                scrollYProgress,
                [s - step * 0.6, s, s + step * 0.6].map((x) => Math.max(0, Math.min(1, x))),
                [0.3, 1, 0.3]
              );
              return (
                <motion.span key={r.years} style={{ opacity }}>
                  {r.years.split(" — ")[0]}
                </motion.span>
              );
            })}
          </div>

          {/* Rail */}
          <div className="rail hidden md:block">
            <motion.div className="fill" style={{ height: railFill }} />
            {ROLES.map((_, i) => (
              <span
                key={i}
                className="rail-dot"
                style={{ top: `${(i / (total - 1)) * 100}%` }}
              />
            ))}
          </div>

          {/* Cards */}
          {ROLES.map((r, i) => {
            const rs = i * step - pad;
            const re = (i + 1) * step + pad;
            return (
              <Card
                key={r.company + r.role}
                index={i}
                total={total}
                role={r}
                progress={scrollYProgress}
                rangeStart={Math.max(0, rs)}
                rangeEnd={Math.min(1, re)}
              />
            );
          })}

          {/* Tiny progress indicator top */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-mute font-mono">
            <motion.span
              className="inline-flex items-center gap-2"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0.6, 1]) }}
            >
              <span className="inline-block w-6 h-[1px] bg-[var(--fg)]/40" />
              TIMELINE
              <span className="inline-block w-6 h-[1px] bg-[var(--fg)]/40" />
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
