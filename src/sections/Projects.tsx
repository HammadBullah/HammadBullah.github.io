import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { TiltCard } from "../components/TiltCard";
import { SplitText } from "../components/SplitText";

const PROJECTS = [
  {
    code: "PRJ-01", title: "DROWNING_DETECTION", tag:"COMPUTER VISION",
    stack:["YOLOv9","TensorFlow","Python"],
    body:"Real-time pool-safety monitor with low-latency inference, edge deployment and multi-channel alerting. Built to survive lighting variance and occlusions.",
    metrics:[{k:"mAP@.5",v:"89%"},{k:"inference",v:"32 fps"},{k:"alert p95",v:"<700ms"}],
    bg:"#00f0ff", accent:"#ff2bd6",
    github:"https://github.com/HammadBullah", live:"#",
  },
  {
    code: "PRJ-02", title: "PLUCK_N_PAY", tag:"MOBILE MARKETPLACE",
    stack:["Flutter","Dart","Firebase"],
    body:"Cross-platform bargaining marketplace with realtime negotiation, clean architecture, and anti-fraud signals. 60fps on mid-tier Android.",
    metrics:[{k:"cold start",v:"2.2s"},{k:"crash-free",v:"99.7%"},{k:"latency",v:"RTC"}],
    bg:"#ff2bd6", accent:"#7b5bff",
    github:"https://github.com/HammadBullah", live:"#",
  },
  {
    code: "PRJ-03", title: "WEATHER_LSTM", tag:"AI RESEARCH",
    stack:["LSTM","Python","Research"],
    body:"Comparative study of predictive models on meteorological time-series, with reproducible pipelines and rigorous evaluation against baselines.",
    metrics:[{k:"RMSE",v:"0.18"},{k:"horizon",v:"24h"},{k:"models",v:"5"}],
    bg:"#7b5bff", accent:"#30ffb4",
    github:"https://github.com/HammadBullah", live:"#",
  },
  {
    code: "PRJ-04", title: "SMART_AG", tag:"IOT / MOBILE",
    stack:["IoT","Dart","Firebase"],
    body:"Automated farm monitoring with threshold alerts, sensor mesh, and cross-platform dashboard. Battery life over 6 months per node.",
    metrics:[{k:"battery",v:"6mo"},{k:"alerts",v:"<3s"},{k:"nodes",v:"32"}],
    bg:"#30ffb4", accent:"#00f0ff",
    github:"https://github.com/HammadBullah", live:"#",
  },
];

function ProjectPreview({p, progress, start, end}:{p:typeof PROJECTS[0]; progress:any; start:number; end:number}){
  const opacity = useTransform(progress,[start,start+0.08,end-0.08,end],[0,1,1,0]);
  const y = useTransform(progress,[start,end],[100,-60]);
  const scale = useTransform(progress,[start,start+0.08,end-0.08,end],[0.92,1,1,0.96]);
  const rotX = useTransform(progress,[start,end],[8,-6]);
  const blur = useTransform(progress,[start,start+0.08,end-0.08,end],["blur(14px)","blur(0)","blur(0)","blur(8px)"]);

  return (
    <motion.article style={{opacity,y,scale,rotateX:rotX,filter:blur}} className="absolute inset-0 p-4 md:p-10 flex items-center justify-center"
      initial={{perspective:1200}}>
      <TiltCard max={6} className="w-full max-w-6xl">
        <div className="holo-card rounded-lg p-6 md:p-10 relative grid md:grid-cols-12 gap-6 items-center"
             style={{background:`linear-gradient(135deg, ${p.bg}18, ${p.accent}14)`}}>
          <span className="e-tl"/><span className="e-tr"/><span className="e-bl"/><span className="e-br"/>
          {/* meta */}
          <div className="md:col-span-12 flex items-center justify-between tech text-[10px] tracking-[.3em] uppercase">
            <span className="neon-c">{p.code}</span>
            <span style={{color:p.bg, textShadow:`0 0 10px ${p.bg}`}}>{p.tag}</span>
          </div>
          {/* holographic preview */}
          <div className="md:col-span-7 relative aspect-[16/10] rounded-md overflow-hidden border"
               style={{borderColor:`${p.bg}66`, boxShadow:`inset 0 0 40px ${p.bg}25, 0 0 30px ${p.bg}25`}}>
            <div className="absolute inset-0" style={{background:`radial-gradient(circle at 30% 20%, ${p.bg}60, transparent 60%), linear-gradient(135deg, ${p.bg}20, ${p.accent}20)`}}/>
            <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
              <g stroke={p.bg} strokeOpacity=".4" fill="none">
                {Array.from({length:12}).map((_,i)=>(
                  <line key={i} x1={i*70} y1="0" x2={i*70} y2="500" strokeWidth=".5"/>
                ))}
                {Array.from({length:8}).map((_,i)=>(
                  <line key={i} x1="0" y1={i*70} x2="800" y2={i*70} strokeWidth=".5"/>
                ))}
                <path d="M40,380 C200,200 360,420 520,260 S740,340 780,240" strokeWidth="2" stroke={p.accent}/>
              </g>
              {Array.from({length:6}).map((_,i)=>(
                <circle key={i} cx={120+i*110} cy={180+((i*37)%120)} r={4+i} fill={i%2?p.accent:p.bg} style={{filter:`drop-shadow(0 0 6px ${p.bg})`}}/>
              ))}
              <rect x="40" y="40" width="120" height="24" rx="4" fill={p.bg} fillOpacity=".25" stroke={p.bg}/>
              <text x="52" y="57" fill="#fff" fontFamily="JetBrains Mono" fontSize="11">{p.title}</text>
            </svg>
            <motion.span aria-hidden animate={{top:["0%","100%"]}} transition={{duration:5,ease:"linear",repeat:Infinity}}
              className="absolute left-0 right-0 h-[2px]" style={{background:`linear-gradient(90deg,transparent,${p.bg},transparent)`, boxShadow:`0 0 10px ${p.bg}`}}/>
            <div className="absolute inset-0 pointer-events-none" style={{background:"repeating-linear-gradient(to bottom, rgba(255,255,255,.02) 0 1px, transparent 1px 3px)"}}/>
          </div>
          {/* copy */}
          <div className="md:col-span-5 mono">
            <h3 className="headline text-2xl md:text-4xl mb-3" style={{color:p.bg,textShadow:`0 0 14px ${p.bg}`}}>{p.title}</h3>
            <p className="text-[var(--ink-dim)] leading-relaxed text-[13px] mb-5">{p.body}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {p.stack.map(s=>(
                <span key={s} className="tech text-[10px] uppercase tracking-[.2em] px-2 py-1 border"
                      style={{borderColor:`${p.bg}66`, color:p.bg, boxShadow:`0 0 10px ${p.bg}40`}}>{s}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {p.metrics.map(m=>(
                <div key={m.k} className="border rounded px-2 py-2" style={{borderColor:`${p.bg}40`}}>
                  <div className="text-[10px] uppercase tracking-[.2em] text-[var(--ink-mute)]">{m.k}</div>
                  <div className="tech text-lg" style={{color:p.bg,textShadow:`0 0 10px ${p.bg}`}}>{m.v}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <MagneticButton as="a" href={p.github} target="_blank" rel="noopener" strength={0.2}
                className="btn-hud !px-3 !py-2 !text-[10px]" style={{borderColor:p.bg,color:p.bg,boxShadow:`inset 0 0 12px ${p.bg}40, 0 0 14px ${p.bg}40`}}>
                <span className="inline-grid place-items-center w-3 h-3"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z"/></svg></span> SOURCE
              </MagneticButton>
              <MagneticButton as="a" href={p.live} target="_blank" rel="noopener" strength={0.2}
                className="btn-hud magenta !px-3 !py-2 !text-[10px]">
                <Eye size={12}/> PREVIEW
              </MagneticButton>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({target:ref, offset:["start start","end end"]});
  const total = PROJECTS.length;
  const step = 1/total;
  const pad = step*0.22;

  const tintA = useTransform(scrollYProgress, PROJECTS.map((_,i)=>i/(total-1)), PROJECTS.map(p=>p.bg) as any);
  const tintOp = useTransform(scrollYProgress,[0,0.1,0.9,1],[0,.3,.3,0]);

  return (
    <section id="projects" className="relative">
      <div className="section pt-28 md:pt-36">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-6"><span className="section-tag">03 // PROJECT ARCHIVE</span></div>
          <SplitText as="h2" className="headline text-3xl md:text-5xl max-w-3xl neon-m" text="Holographic project nodes." />
        </div>
      </div>

      <div ref={ref} style={{height:`${total*100}vh`}} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{background:"radial-gradient(60% 60% at 50% 50%, var(--blob-c, #ff2bd6), transparent 70%)",
                    opacity:tintOp, ["--blob-c" as any]:tintA, filter:"blur(120px)"}}/>
          <div className="noise"/>
          <div className="rail hidden md:block">
            <motion.div className="fill" style={{height:useTransform(scrollYProgress,[0,1],["0%","100%"])}}/>
            {PROJECTS.map((_,i)=>(<span key={i} className="rail-dot" style={{top:`${(i/(total-1))*100}%`}}/>))}
          </div>
          {PROJECTS.map((p,i)=>{
            const s = Math.max(0,i*step-pad), e = Math.min(1,(i+1)*step+pad);
            return <ProjectPreview key={p.code} p={p} progress={scrollYProgress} start={s} end={e}/>;
          })}
        </div>
      </div>
    </section>
  );
}
