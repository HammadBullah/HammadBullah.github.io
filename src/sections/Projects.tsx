import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
function Github({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z"/>
    </svg>
  );
}
import { MagneticButton } from "../components/MagneticButton";
import { TiltCard } from "../components/TiltCard";
import { SplitText } from "../components/SplitText";
import { PromptCoach } from "../components/PromptCoach";

const PROJECTS = [
  {
    tag: "Computer Vision",
    year: "2025",
    title: "Drowning Detection",
    stack: "YOLOv9 · TensorFlow · Python",
    overview: "Real-time pool-safety monitor with low-latency inference and edge deployment.",
    architecture: "YOLOv9 detector + ByteTrack tracker + event bus → multi-channel alerting (sms, push, on-prem siren).",
    challenges: "Lighting variance, occlusions, and false-positive rate at distance. Solved via hard-negative mining and temporal smoothing.",
    performance: "89% mAP@0.5 · 32fps on Coral TPU · p95 alert latency < 700ms.",
    github: "https://github.com/HammadBullah",
    live: "#",
    bgA: "#0a84ff", bgB: "#5ac8fa", bgC: "#1d3557",
    kind: "vision" as const,
  },
  {
    tag: "Mobile / Marketplace",
    year: "2024",
    title: "PlucknPay",
    stack: "Flutter · Dart · Firebase",
    overview: "Cross-platform bargaining marketplace with real-time negotiation.",
    architecture: "Flutter UI (Riverpod/Clean Arch) → Firestore + Cloud Functions → WebRTC-style live haggling channels.",
    challenges: "State consistency across flaky mobile networks, anti-fraud and trust scoring.",
    performance: "60fps on mid-tier Android · cold-start < 2.2s · 99.7% crash-free sessions.",
    github: "https://github.com/HammadBullah",
    live: "#",
    bgA: "#ff375f", bgB: "#ff9f0a", bgC: "#7c2d12",
    kind: "market" as const,
  },
  {
    tag: "AI · Interactive",
    year: "2026",
    title: "AI Prompt Coach",
    stack: "React · Framer Motion · LLMs",
    overview: "An interactive tool that classifies weak prompts and reconstructs them.",
    architecture: "Classifier → dimension-gap detection → Socratic clarifying questions → reconstructed prompt → humanised response.",
    challenges: "Making the feedback loop feel conversational, not mechanical; avoiding prompt-injection regressions.",
    performance: "Runs client-side; reconstructs in < 1s after answers.",
    github: "#",
    live: "#",
    bgA: "#5e5ce6", bgB: "#bf5af2", bgC: "#1e1b4b",
    kind: "coach" as const,
    demo: true,
  },
  {
    tag: "IoT / Mobile",
    year: "2023",
    title: "Smart Agriculture",
    stack: "IoT · Dart · Firebase",
    overview: "Automated farm monitoring with threshold alerts and a cross-platform dashboard.",
    architecture: "ESP32 sensor mesh → MQTT → Cloud Functions → Firestore → Flutter dashboard with real-time charts.",
    challenges: "Power-constrained sensor nodes, rural connectivity, and calibration drift.",
    performance: "Battery life > 6 months · alerts within 3s of threshold breach.",
    github: "https://github.com/HammadBullah",
    live: "#",
    bgA: "#30d158", bgB: "#0a84ff", bgC: "#052e16",
    kind: "iot" as const,
  },
];

function Motif({ kind, c1, c2 }: { kind: string; c1: string; c2: string }) {
  if (kind === "vision") {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs><radialGradient id="v" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor={c2} stopOpacity="0.9" /><stop offset="100%" stopColor={c1} stopOpacity="0" /></radialGradient></defs>
        <rect width="800" height="500" fill="url(#v)" />
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={40+(i%6)*120} y={60+Math.floor(i/6)*90} width="84" height="52" rx="10" fill="white" fillOpacity={0.05+(i%4)*0.05} stroke="white" strokeOpacity="0.25"/>
        ))}
        <g stroke="white" strokeOpacity="0.3" fill="none" strokeDasharray="4 4">
          <line x1="0" y1="255" x2="800" y2="255" />
          <line x1="400" y1="0" x2="400" y2="500" />
        </g>
        <rect x="260" y="190" width="280" height="130" rx="18" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.35" />
        <circle cx="400" cy="255" r="44" fill="white" fillOpacity="0.25" stroke="white" strokeOpacity="0.6" />
        <circle cx="400" cy="255" r="16" fill="white" fillOpacity="0.8" />
      </svg>
    );
  }
  if (kind === "market") {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs><linearGradient id="m" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/></linearGradient></defs>
        <rect width="800" height="500" fill="url(#m)" opacity=".55"/>
        <path d="M40,380 C180,220 300,420 440,240 S700,320 760,210" stroke="white" strokeOpacity=".35" fill="none" strokeWidth="3"/>
        {[120,220,360,500,640].map((x,i)=>(
          <g key={i}><circle cx={x} cy={260-i*8} r="10" fill="white" fillOpacity=".6"/><rect x={x-28} y={270-i*8} width="56" height="30" rx="8" fill="white" fillOpacity=".1" stroke="white" strokeOpacity=".3"/></g>
        ))}
      </svg>
    );
  }
  if (kind === "iot") {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs><radialGradient id="io" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor={c2} stopOpacity="0.8"/><stop offset="100%" stopColor={c1} stopOpacity="0"/></radialGradient></defs>
        <rect width="800" height="500" fill="url(#io)"/>
        {Array.from({length:10}).map((_,i)=>(<circle key={i} cx="400" cy="250" r={40+i*24} stroke="white" strokeOpacity=".25" fill="none"/>))}
        <circle cx="400" cy="250" r="30" fill="white" fillOpacity=".6"/>
        {[0,72,144,216,288].map((a,i)=>(<circle key={i} cx={400+Math.cos(a*Math.PI/180)*180} cy={250+Math.sin(a*Math.PI/180)*110} r="10" fill="white" fillOpacity=".8"/>))}
      </svg>
    );
  }
  // coach default
  return <div className="w-full h-full grid place-items-center" style={{background:`linear-gradient(135deg, ${c1}, ${cC(c2)})`}}/>;
}
function cC(hex:string){return hex;}

function ProjectCard({
  p, index, total, progress, rangeStart, rangeEnd,
}: { p: typeof PROJECTS[number]; index:number; total:number; progress:any; rangeStart:number; rangeEnd:number; }) {
  const enter=rangeStart, mid=rangeStart+(rangeEnd-rangeStart)*0.12, exit=rangeEnd;
  const opacity = useTransform(progress,[enter,mid,exit-0.05,exit],[0,1,1,0]);
  const y = useTransform(progress,[enter,mid,exit],[80,0,-60]);
  const scale = useTransform(progress,[enter,mid,exit],[0.94,1,0.97]);
  const blur = useTransform(progress,[enter,mid,exit],["blur(12px)","blur(0px)","blur(8px)"]);
  const mediaScale = useTransform(progress,[enter,mid,exit],[1.06,1,1.03]);

  return (
    <motion.article style={{opacity,y,scale,filter:blur}} className="absolute inset-0 p-4 md:p-10 overflow-y-auto" >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        <motion.div style={{scale:mediaScale}} className="lg:col-span-7">
          <TiltCard className="w-full" max={6}>
            <div className="relative media rounded-2xl overflow-hidden border hairline aspect-[16/10]" style={{boxShadow:"var(--shadow-lg)"}}>
              <div className="absolute inset-0" style={{background:`linear-gradient(135deg, ${p.bgA}, ${p.bgC} 60%, ${p.bgB})`}}/>
              <div className="absolute inset-0">{p.kind !== "coach" ? <Motif kind={p.kind} c1={p.bgA} c2={p.bgB}/> : null}</div>
              {/* prevent unused var warnings */}
              <span className="hidden">{cC("")}</span>
              {p.kind === "coach" ? (
                <div className="absolute inset-0 p-4 md:p-6 grid place-items-center">
                  <PromptCoach />
                </div>
              ) : null}
              <div className="absolute inset-0 noise opacity-[.05]"/>
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur text-white text-[10px] mono">{p.tag.toUpperCase()}</span>
                <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur text-white text-[10px] mono">{p.year}</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <div className="lg:col-span-5">
          <p className="text-mute text-[11px] mono tracking-widest mb-3">{String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</p>
          <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-3">{p.title}</h3>
          <p className="text-soft mb-5 max-w-xl">{p.overview}</p>

          <dl className="space-y-3 text-[13px] leading-relaxed">
            <Field label="Stack" value={p.stack} />
            <Field label="Architecture" value={p.architecture} />
            <Field label="Challenges" value={p.challenges} />
            <Field label="Performance" value={p.performance} highlight />
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <MagneticButton as="a" href={p.github} target="_blank" rel="noopener" strength={0.2} className="btn-secondary !px-4 !py-2 text-[12px] arrow-slide">
              <Github size={14}/> GitHub
            </MagneticButton>
            {!p.demo && (
              <MagneticButton as="a" href={p.live} target="_blank" rel="noopener" strength={0.2} className="btn-primary !px-4 !py-2 text-[12px] arrow-slide">
                Live demo <ArrowUpRight size={14}/>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Field({ label, value, highlight }:{label:string; value:string; highlight?:boolean}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-t hairline pt-3">
      <dt className="eyebrow pt-0.5">{label}</dt>
      <dd className={highlight ? "text-[var(--fg)]" : "text-soft"}>{value}</dd>
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = PROJECTS.length;
  const step = 1/total;
  const pad = step*0.2;

  const tintA = useTransform(scrollYProgress, PROJECTS.map((_,i)=>i/(total-1)), PROJECTS.map(p=>p.bgA) as any);
  const tintB = useTransform(scrollYProgress, PROJECTS.map((_,i)=>i/(total-1)), PROJECTS.map(p=>p.bgB) as any);
  const tintOp = useTransform(scrollYProgress,[0,0.1,0.9,1],[0,0.2,0.2,0]);

  return (
    <section id="projects" className="relative">
      <div className="section pt-28 md:pt-36">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
            <div>
              <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="eyebrow mb-4">03 — Selected work</motion.p>
              <SplitText as="h2" className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl" text="Case studies, not just cards." />
            </div>
            <p className="text-soft text-sm max-w-xs">Scroll to walk through each project.</p>
          </div>
        </div>
      </div>

      <div ref={ref} style={{height:`${total*100}vh`}} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, var(--blob-1), var(--blob-2))",
              mixBlendMode: "overlay", opacity:tintOp, filter:"blur(100px)",
              ["--tw-gradient-from" as any]: tintA, ["--tw-gradient-to" as any]: tintB,
            }}
          />
          <div className="noise"/>
          <div className="rail hidden md:block">
            <motion.div className="fill" style={{height:useTransform(scrollYProgress,[0,1],["0%","100%"])}}/>
            {PROJECTS.map((_,i)=>(<span key={i} className="rail-dot" style={{top:`${(i/(total-1))*100}%`}}/>))}
          </div>
          {PROJECTS.map((p,i)=>{
            const s = Math.max(0,i*step-pad);
            const e = Math.min(1,(i+1)*step+pad);
            return <ProjectCard key={p.title} p={p} index={i} total={total} progress={scrollYProgress} rangeStart={s} rangeEnd={e}/>;
          })}
        </div>
      </div>
    </section>
  );
}
