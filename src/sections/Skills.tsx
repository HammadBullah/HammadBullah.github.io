import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiFastapi, SiNodedotjs,
  SiFlutter, SiTensorflow, SiPytorch, SiDocker, SiGit, SiGithub, SiMongodb, SiPostgresql,
  SiFirebase, SiOpenjdk,
} from "react-icons/si";
import type { IconType as _IconType } from "react-icons";
import { Cloud } from "lucide-react";
import { SplitText } from "../components/SplitText";
import { useReducedMotion } from "../hooks/useHooks";

const AWSIcon = ({ size = 16, c }:{size?:number; c?:string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={c ?? "#FF9900"} aria-hidden>
    <path d="M6.8 11.4c0 .3 0 .6.1.8l.3.8c0 .1 0 .2-.1.2l-.3.2h-.2l-.2-.1c-.1-.1-.2-.2-.2-.3l-.2-.4c-.4.5-1 .9-1.8.9-1.3 0-2.3-1.2-2.3-2.9 0-1.7 1-2.9 2.3-2.9.9 0 1.7.4 2.2 1.1l-.2.4c-.2.3-.2.6-.2 1v.3Zm-1-1.1c-.2-.4-.5-.6-.9-.6-.6 0-1 .5-1 1.2 0 .8.4 1.2 1 1.2.4 0 .7-.2.9-.6.1-.2.1-.5.1-.8v-.4Zm4.4 3c-.2 0-.3 0-.3-.2v-.3c-.1.1-.3.2-.5.2-1 0-1.6-.6-1.6-1.8V7.9c0-.1 0-.2.2-.2h.4c.1 0 .2.1.2.2v4.1c0 .6.3.9.8.9.2 0 .4-.1.5-.2 0 0 .1 0 .1.1l.2.3c0 .1 0 .2-.1.2h.1Zm2.9.1c-.6 0-1-.2-1.2-.5-.1-.1-.1-.3.1-.4l.2-.2c.1 0 .2 0 .2.1.2.2.4.3.8.3.4 0 .7-.2.7-.5 0-.2-.1-.4-.9-.6-.9-.2-1.4-.7-1.4-1.4 0-.7.6-1.2 1.4-1.2.6 0 1 .2 1.1.5.1.1.1.2-.1.3l-.2.2c-.1.1-.2 0-.2-.1-.2-.2-.4-.3-.7-.3-.4 0-.6.2-.6.4 0 .2.1.4.9.6.9.2 1.4.6 1.4 1.4-.1.9-.7 1.4-1.6 1.4Zm4.6-.1c-.1 0-.2 0-.2-.1-.2-.3-.3-.4-.4-.7-1-.1-1.6-.8-1.6-1.7 0-.5.2-.9.5-1.2.3-.3.8-.5 1.3-.5.2 0 .5 0 .7.1V7.9c0-.1.1-.2.2-.2h.4c.1 0 .2.1.2.2v4.9c0 .1-.1.2-.2.2h-.4l-.2.1Zm-.4-2.7c-.5 0-.8.3-.8.8 0 .5.3.8.8.8.2 0 .4 0 .5-.1v-1.4c-.2-.1-.3-.1-.5-.1Zm4-5.4c3.2 3 5.2 7.8 5.2 13 0 .5 0 1-.1 1.5-.2.1-.3 0-.4-.2-.3-.9-.5-1.8-.8-2.7-.1-.3.1-.4.3-.2 1.3 1 1.9 2 1.9 2 .1.1 0 .2-.1.3l-.1.1c-.3.2-.7 0-1.3-.4C22 19.1 17 21 12.8 21c-3.3 0-6.2-1.1-8.4-2.8-.2-.1-.2-.3 0-.4.2-.1.3 0 .5.1 2.1 1.5 4.8 2.4 7.9 2.4 3.5 0 7-1.2 8.7-3.5-2.3-.1-4.6-.9-6.4-2.3-.3-.2-.2-.5.2-.5 2.3.1 4.6-.2 6.9-1.3.1-.1.2 0 .2.1.2.4.3.8.4 1.1v-.2c0-4.3-2.3-8.2-5.8-10.5-.2-.1-.1-.3.2-.3Z"/>
  </svg>
);

interface SkillInfo {
  name: string;
  icon: any;
  color?: string;
  years: string;
  projects: string;
}

const SKILLS: SkillInfo[] = [
  { name: "Python",       icon: SiPython,     color: "#3776AB", years: "3+ yrs",  projects: "Drowning Detection · Weather LSTM" },
  { name: "Java",         icon: SiOpenjdk,    color: "#E76F00", years: "2+ yrs",  projects: "University systems" },
  { name: "JavaScript",   icon: SiJavascript, color: "#F7DF1E", years: "4+ yrs",  projects: "Web apps · Tooling" },
  { name: "TypeScript",   icon: SiTypescript, color: "#3178C6", years: "3+ yrs",  projects: "This portfolio · SaaS" },
  { name: "React",        icon: SiReact,      color: "#61DAFB", years: "3+ yrs",  projects: "This portfolio · Dashboards" },
  { name: "Next.js",      icon: SiNextdotjs,  color: undefined, years: "2+ yrs",  projects: "Marketing sites · APIs" },
  { name: "FastAPI",      icon: SiFastapi,    color: "#009688", years: "2+ yrs",  projects: "AI backends" },
  { name: "Node.js",      icon: SiNodedotjs,  color: "#339933", years: "3+ yrs",  projects: "APIs · Real-time" },
  { name: "Flutter",      icon: SiFlutter,    color: "#02569B", years: "2+ yrs",  projects: "PlucknPay · Smart Ag" },
  { name: "TensorFlow",   icon: SiTensorflow, color: "#FF6F00", years: "2+ yrs",  projects: "Drowning Detection" },
  { name: "PyTorch",      icon: SiPytorch,    color: "#EE4C2C", years: "2+ yrs",  projects: "Weather LSTM" },
  { name: "Docker",       icon: SiDocker,     color: "#2496ED", years: "2+ yrs",  projects: "Self-hosted" },
  { name: "Git",          icon: SiGit,        color: "#F05032", years: "4+ yrs",  projects: "All projects" },
  { name: "GitHub",       icon: SiGithub,     color: undefined, years: "4+ yrs",  projects: "Open source" },
  { name: "MongoDB",      icon: SiMongodb,    color: "#47A248", years: "2+ yrs",  projects: "APIs · Real-time" },
  { name: "PostgreSQL",   icon: SiPostgresql, color: "#4169E1", years: "2+ yrs",  projects: "Data apps" },
  { name: "Firebase",     icon: SiFirebase,   color: "#FFCA28", years: "2+ yrs",  projects: "PlucknPay · Smart Ag" },
  { name: "AWS",          icon: AWSIcon,      color: "#FF9900", years: "1+ yr",   projects: "Cloud deployments" },
];

interface Particle {
  i: number; x: number; y: number;
  vx: number; vy: number;
  r: number; // scale
  rot: number; rotV: number;
}

export function Skills() {
  const reduced = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({x:-9999,y:-9999});
  const parts = useRef<Particle[]>([]);
  const refs = useRef<(HTMLDivElement|null)[]>([]);
  const [size, setSize] = useState({w:0,h:0});
  const [open, setOpen] = useState<number|null>(null);

  useMemo(() => {
    parts.current = SKILLS.map((_, i) => ({
      i,
      x: 0, y: 0,
      vx: (Math.random()-0.5)*0.12,
      vy: (Math.random()-0.5)*0.12,
      r: 0.85 + Math.random()*0.3,
      rot: (Math.random()-0.5)*6,
      rotV: (Math.random()-0.5)*0.15,
    }));
  }, []);

  useEffect(() => {
    const el = fieldRef.current; if (!el) return;
    const resize = () => {
      const rect = el.getBoundingClientRect();
      setSize({w: rect.width, h: rect.height});
      parts.current.forEach(p => {
        if (p.x===0 && p.y===0) {
          p.x = 60 + Math.random()*(rect.width-120);
          p.y = 60 + Math.random()*(rect.height-120);
        }
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const el = fieldRef.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left; mouse.current.y = e.clientY - r.top;
    };
    const leave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);

  useAnimationFrame((_,dt) => {
    if (reduced || !size.w || !size.h) return;
    const t = Math.min(32, dt)/16;
    const REP = 110;
    parts.current.forEach((p, idx) => {
      p.vx += (Math.random()-0.5)*0.004*t;
      p.vy += (Math.random()-0.5)*0.004*t;
      p.vx *= 0.985; p.vy *= 0.985;
      const mx = mouse.current.x, my = mouse.current.y;
      const dx = p.x - mx, dy = p.y - my;
      const d2 = dx*dx + dy*dy;
      if (d2 < REP*REP && d2 > 0.1) {
        const d = Math.sqrt(d2);
        const f = (REP-d)/REP * 0.5;
        p.vx += (dx/d)*f*t; p.vy += (dy/d)*f*t;
      }
      // soft separation from other skills
      for (let j=0; j<parts.current.length; j++) {
        if (j===idx) continue;
        const o = parts.current[j];
        const ddx = p.x-o.x, ddy = p.y-o.y;
        const dd2 = ddx*ddx + ddy*ddy;
        const R = 80;
        if (dd2 < R*R && dd2>0.1) {
          const d = Math.sqrt(dd2);
          const f = (R-d)/R * 0.08;
          p.vx += (ddx/d)*f; p.vy += (ddy/d)*f;
        }
      }
      p.x += p.vx*t; p.y += p.vy*t; p.rot += p.rotV*t;
      const PAD = 60;
      if (p.x < PAD) { p.x = PAD; p.vx *= -0.7; }
      if (p.x > size.w-PAD) { p.x = size.w-PAD; p.vx *= -0.7; }
      if (p.y < PAD) { p.y = PAD; p.vy *= -0.7; }
      if (p.y > size.h-PAD) { p.y = size.h-PAD; p.vy *= -0.7; }
      const el = refs.current[idx];
      if (el) {
        const isOpen = open === idx;
        const scale = isOpen ? p.r*1.15 : p.r;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px,0) translate(-50%,-50%) rotate(${p.rot}deg) scale(${scale})`;
        el.style.zIndex = isOpen ? "20" : "1";
      }
    });
  });

  return (
    <section id="skills" className="relative py-28 md:py-40 section overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="aurora" style={{width:520,height:520,left:"-8%",top:"0%",background:"var(--blob-2)"}}/>
        <div className="aurora" style={{width:520,height:520,right:"-8%",bottom:"0%",background:"var(--blob-1)"}}/>
        <div className="noise"/>
      </div>
      <div className="container-x relative z-10">
        <div className="max-w-3xl mb-8 md:mb-10">
          <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="eyebrow mb-4">04 — Toolkit</motion.p>
          <SplitText as="h2" className="font-display text-4xl md:text-6xl tracking-tight" text="Tools I reach for. Hover to learn more." />
        </div>

        <div ref={fieldRef} className="relative w-full h-[560px] md:h-[640px] rounded-3xl border hairline bg-soft/40 overflow-hidden" style={{
          backgroundImage: "radial-gradient(1000px 500px at 50% 0%, color-mix(in srgb,var(--accent) 10%, transparent), transparent 60%)",
        }}>
          <div className="absolute inset-0 grid-fade opacity-50 pointer-events-none" />
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            const isOpen = open === i;
            return (
              <div
                key={s.name}
                ref={el => { refs.current[i] = el; }}
                className="skill-chip"
                onMouseEnter={()=>setOpen(i)}
                onMouseLeave={()=>setOpen(o=>o===i?null:o)}
                onClick={()=>setOpen(i===open?null:i)}
                style={{ left:0, top:0, transform:"translate(-200px,-200px)" }}
              >
                <span className="ic"><Icon size={15} color={s.color} /></span>
                <span className="nm">{s.name}</span>
              </div>
            );
          })}

          {/* Floating detail card */}
          <AnchoredCard open={open} skill={open!==null?SKILLS[open]:null} />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] mono text-mute">
            <span>{SKILLS.length} technologies · interactive field</span>
            <span>hover · click to pin</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnchoredCard({ open, skill }: { open:number|null; skill:SkillInfo|null }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: skill ? 1 : 0, y: skill ? 0 : 10, scale: skill ? 1 : 0.96 }}
      transition={{ duration: .25 }}
      className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[min(420px,calc(100%-2rem))] rounded-2xl border hairline glass p-4"
      style={{boxShadow:"var(--shadow-md)", pointerEvents: skill ? "auto":"none"}}
    >
      {skill ? (
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg border hairline bg-elev grid place-items-center shrink-0">
            <skill.icon size={18} color={skill.color} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold tracking-tight">{skill.name}</p>
              <span className="chip !py-0 !px-2 !text-[10px]">{skill.years}</span>
            </div>
            <p className="text-[12px] text-soft mt-1">{skill.projects}</p>
          </div>
        </div>
      ) : (
        <p className="text-[12px] text-soft">Hover a chip to see details.</p>
      )}
    </motion.div>
  );
}
