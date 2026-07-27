import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { TiltCard } from "../components/TiltCard";
import { SplitText } from "../components/SplitText";

const ROLES = [
  {
    years: "2026 — Present",
    role: "Customer Service Operations",
    company: "Ladbrokes / Entain",
    place: "Hatfield, UK",
    body: "Operations and compliance in high-pressure retail environments — systems thinking, composure, and precise execution under load.",
    tint: "rgba(10,132,255,0.25)",
  },
  {
    years: "2023 — 2025",
    role: "Flutter & AI Developer",
    company: "Freelance",
    place: "Remote",
    body: "Shipped AI-powered mobile apps including computer-vision models with 89% accuracy and full Flutter products backed by Firebase.",
    tint: "rgba(191,90,242,0.22)",
  },
  {
    years: "2022 — 2023",
    role: "Web & Design Lead",
    company: "Amity University",
    place: "Dubai, UAE",
    body: "Led web and design infrastructure for student events, managing digital systems and teams for events with 500+ attendees.",
    tint: "rgba(48,209,88,0.22)",
  },
];

function Card({
  role, total, index,
}: { role: typeof ROLES[number]; total: number; index: number }) {
  return (
    <TiltCard className="w-full max-w-4xl mx-auto" max={5}>
      <div
        className="relative rounded-3xl border hairline bg-elev/70 backdrop-blur-xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-lg)", transformStyle: "preserve-3d" }}
      >
        <div aria-hidden className="absolute -top-28 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: role.tint }} />
        <div className="relative p-8 md:p-12 grid md:grid-cols-12 gap-6 md:gap-10 items-center" style={{ transform: "translateZ(30px)" }}>
          <div className="md:col-span-4 flex md:flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl border hairline grid place-items-center bg-soft" style={{ transform: "translateZ(20px)" }}>
              <Briefcase size={18} />
            </div>
            <div>
              <p className="eyebrow mb-1">{role.years}</p>
              <p className="text-mute text-[12px] flex items-center gap-1 mono"><MapPin size={11} /> {role.place}</p>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-mute text-[11px] mono tracking-widest mb-3">
              {String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}
            </p>
            <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-2">{role.role}</h3>
            <p className="text-soft mb-4">{role.company}</p>
            <p className="text-soft leading-relaxed max-w-2xl text-[15px] md:text-base">{role.body}</p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = ROLES.length;
  const step = 1/total;
  const pad = step*0.25;

  // Pre-compute bg tints mapped across progress
  const bgColors = ROLES.map(r => r.tint);
  const bgMixed = useTransform(
    scrollYProgress,
    ROLES.map((_, i) => i/(total-1)),
    bgColors as any
  );

  return (
    <section id="experience" className="relative">
      <div className="section pt-28 md:pt-36">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <div>
              <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="eyebrow mb-4">02 — Experience</motion.p>
              <SplitText as="h2" className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl" text="A short history of shipping." />
            </div>
          </div>
        </div>
      </div>

      <div ref={ref} style={{ height: `${total*100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center p-6">
          <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: bgMixed as any, filter: "blur(120px)", opacity: .6 }}
          />
          <div className="noise" />

          <div className="rail-v hidden md:block">
            <motion.div className="fill" style={{ scaleY: scrollYProgress, transformOrigin: "top" }} />
          </div>
          {ROLES.map((_, i) => {
            const k = i/(total-1);
            const active = useTransform(scrollYProgress, [Math.max(0,k-step*0.4),k,Math.min(1,k+step*0.4)], [0,1,0]);
            const bg = useTransform(active, a => a>0.5 ? "var(--accent)" : "var(--bg)");
            const border = useTransform(active, a => a>0.5 ? "var(--accent)" : "var(--fg-mute)");
            const shadow = useTransform(active, a => a>0.5 ? "0 0 0 6px color-mix(in srgb,var(--accent) 15%, transparent)" : "none");
            return (
              <motion.span
                key={i}
                className="rail-dot hidden md:block"
                style={{
                  top: `calc(50% - 6px)`,
                  transform: `translate(-50%, calc(-50% + ${(k-0.5)*60}vh))`,
                  background: bg, borderColor: border, boxShadow: shadow,
                }}
              />
            );
          })}

          {ROLES.map((r, i) => {
            const s = Math.max(0, i*step - pad);
            const m = s + (step+pad*2)*0.5;
            const e = Math.min(1, (i+1)*step + pad);
            const opacity = useTransform(scrollYProgress, [s, s+(e-s)*0.15, e-(e-s)*0.15, e], [0,1,1,0]);
            const y = useTransform(scrollYProgress, [s,e], [120,-80]);
            const scale = useTransform(scrollYProgress, [s, s+(e-s)*0.15, e-(e-s)*0.15, e], [0.9,1,1,0.96]);
            const rotX = useTransform(scrollYProgress, [s,e], [8,-4]);
            const blur = useTransform(scrollYProgress, [s, s+(e-s)*0.15, e-(e-s)*0.15, e], ["blur(10px)","blur(0px)","blur(0px)","blur(6px)"]);
            return (
              <motion.article
                key={r.company}
                style={{ opacity, y, scale, rotateX: rotX, filter: blur, zIndex: 10+i }}
                className="absolute inset-0 p-6 md:p-14 flex items-center justify-center"
              >
                <Card role={r} total={total} index={i} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
