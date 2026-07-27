import { useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { SplitText } from "../components/SplitText";
import { useReducedMotion } from "../hooks/useHooks";

interface Skill {
  label: string;
  color: string;
  mag?: boolean;
  desc: string;
}
const SKILLS: Skill[] = [
  { label:"Python",    color:"#30ffb4", desc:"Vision, LSTMs, prompt pipelines."},
  { label:"TypeScript",color:"#00f0ff", desc:"React, Node, full-stack systems."},
  { label:"React",     color:"#00f0ff", desc:"Fiber, R3F, Framer Motion."},
  { label:"Flutter",   color:"#7b5bff", desc:"Cross-platform mobile at 60fps."},
  { label:"TensorFlow",color:"#ff2bd6", desc:"Detection & time-series models."},
  { label:"PyTorch",   color:"#ff2bd6", desc:"Research experiments & training."},
  { label:"Node.js",   color:"#30ffb4", desc:"APIs, realtime, workers."},
  { label:"FastAPI",   color:"#30ffb4", desc:"AI service backends."},
  { label:"Docker",    color:"#00f0ff", desc:"Containers & reproducibility."},
  { label:"AWS",       color:"#ffb020", desc:"Lambdas, S3, deploy pipelines."},
  { label:"Firebase",  color:"#ffb020", desc:"Auth, Firestore, FCM."},
  { label:"PostgreSQL",color:"#7b5bff", desc:"Relational modeling, SQL."},
  { label:"MongoDB",   color:"#30ffb4", desc:"Document stores for apps."},
  { label:"Git",       color:"#ff2bd6", desc:"Branching, hooks, CI."},
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number|null>(null);
  const reduced = useReducedMotion();

  // layout positions around a central core (percent-based so it scales)
  const positions = useMemo(()=>{
    const n = SKILLS.length;
    return SKILLS.map((_,i)=>{
      // two orbits
      const ring = i%2===0 ? 34 : 22; // radius in %
      const angle = (i/n)*Math.PI*2 - Math.PI/2;
      return {
        x: 50 + Math.cos(angle)*ring,
        y: 50 + Math.sin(angle)*ring*0.8,
      };
    });
  },[]);

  // magnetic offsets per orb
  const mxs = useRef(SKILLS.map(()=>useMotionValue(0))).current;
  const mys = useRef(SKILLS.map(()=>useMotionValue(0))).current;
  const spxs = useRef(mxs.map(m=>useSpring(m,{stiffness:160,damping:12,mass:.4}))).current;
  const spys = useRef(mys.map(m=>useSpring(m,{stiffness:160,damping:12,mass:.4}))).current;

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    positions.forEach((p,i)=>{
      const cx = (p.x/100)*rect.width, cy = (p.y/100)*rect.height;
      const dx = mx-cx, dy = my-cy, d = Math.hypot(dx,dy);
      const R = 110;
      if (d < R) {
        const f = (R-d)/R;
        mxs[i].set(-(dx/d)*f*18);
        mys[i].set(-(dy/d)*f*18);
      } else {
        mxs[i].set(0); mys[i].set(0);
      }
    });
  };
  const onLeave = () => { mxs.forEach(m=>m.set(0)); mys.forEach(m=>m.set(0)); };

  return (
    <section id="skills" className="relative py-28 md:py-40 section overflow-hidden">
      <div className="noise"/>
      <div className="container-x">
        <div className="flex items-center gap-3 mb-8"><span className="section-tag">02 // SKILL MATRIX</span></div>
        <SplitText as="h2" className="headline text-3xl md:text-5xl max-w-3xl mb-4 neon-m" text="Capability constellation online."/>
        <p className="tech text-[var(--ink-dim)] text-[12px] tracking-[.2em] uppercase mb-8">Hover to perturb the matrix · click to inspect</p>

        <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative mx-auto w-full max-w-4xl aspect-[16/11] md:aspect-[16/9]">
          {/* grid + scan */}
          <div className="absolute inset-0 border border-[rgba(0,240,255,.2)]" style={{boxShadow:"inset 0 0 60px rgba(0,240,255,.08)"}}/>
          <div className="absolute inset-0 pointer-events-none" style={{
            background:"radial-gradient(ellipse at center, rgba(0,240,255,.1), transparent 60%)",
          }}/>
          {/* rings */}
          {[34,22].map((r,i)=>(
            <div key={i} className="absolute rounded-full border border-[rgba(0,240,255,.15)]"
              style={{
                left:`${50-r}%`, top:`${50-r*0.8}%`,
                width:`${r*2}%`, paddingBottom:`${r*2*0.8}%`, height:0,
                boxShadow:i===0?"inset 0 0 40px rgba(255,43,214,.08)":"inset 0 0 40px rgba(0,240,255,.1)",
              }}/>
          ))}
          {/* core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 grid place-items-center">
            <motion.div animate={{rotate:360}} transition={{duration:24,repeat:Infinity,ease:"linear"}} className="absolute inset-0 rounded-full border border-[var(--cyan)]" style={{boxShadow:"var(--glow-c)"}}/>
            <motion.div animate={{rotate:-360}} transition={{duration:30,repeat:Infinity,ease:"linear"}} className="absolute inset-3 rounded-full border border-[var(--magenta)]" style={{boxShadow:"var(--glow-m)"}}/>
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-[var(--bg)] border border-[var(--cyan)] grid place-items-center mono text-[10px] tracking-[.25em] neon-c" style={{boxShadow:"var(--glow-c)"}}>
              MATRIX
            </div>
          </div>

          {/* orbs */}
          {SKILLS.map((s,i)=>{
            const p = positions[i];
            const isActive = active===i;
            const size = 44 + (s.mag?8:0);
            return (
              <motion.button
                key={s.label}
                onMouseEnter={()=>!reduced && setActive(i)}
                onMouseLeave={()=>setActive(a=>a===i?null:a)}
                onClick={()=>setActive(isActive?null:i)}
                style={{
                  left:`${p.x}%`, top:`${p.y}%`,
                  x: spxs[i], y: spys[i],
                  width:size, height:size,
                  borderColor: s.color,
                  boxShadow: `0 0 16px ${s.color}60, inset 0 0 12px ${s.color}40`,
                  background:`radial-gradient(circle at 30% 30%, ${s.color}55, transparent 70%)`,
                  zIndex: isActive?10:1,
                }}
                className="orb absolute -translate-x-1/2 -translate-y-1/2 rounded-full grid place-items-center tech text-[10px] uppercase tracking-[.2em] text-white"
                whileTap={{scale:.9}}
              >
                <span style={{textShadow:`0 0 10px ${s.color}`}}>{s.label}</span>
              </motion.button>
            );
          })}

          {/* detail */}
          <AnimatePresence>
            {active!==null && (
              <motion.div initial={{opacity:0,y:10,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:.95}}
                className={`hud absolute left-1/2 -translate-x-1/2 bottom-4 w-[min(400px,calc(100% - 2rem))] p-4 mono text-[12px] ${SKILLS[active].mag?"magenta":""}`}>
                <span className="corner-tr"/><span className="corner-bl"/>
                <div className="flex items-center justify-between mb-2">
                  <span className="tech text-[10px] tracking-[.3em] uppercase neon-c">NODE // {SKILLS[active].label}</span>
                  <span className="w-2 h-2 rounded-full blink" style={{background:SKILLS[active].color,boxShadow:`0 0 10px ${SKILLS[active].color}`}}/>
                </div>
                <p className="text-[var(--ink-dim)] leading-relaxed">{SKILLS[active].desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
