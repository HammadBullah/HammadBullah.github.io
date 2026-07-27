import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "../components/SplitText";
import { TiltCard } from "../components/TiltCard";

const ROLES = [
  {
    code:"N-01", years:"2026 — PRESENT", role:"OPS / COMPLIANCE", company:"LADBROKES · ENTAIN", place:"Hatfield, UK",
    body:"Operations and compliance under live pressure: precision, calm, and systems thinking.",
    accent:"#00f0ff",
  },
  {
    code:"N-02", years:"2023 — 2025", role:"FLUTTER × AI DEV", company:"FREELANCE", place:"Remote",
    body:"Shipped AI-native mobile experiences, including computer-vision models at 89% accuracy and clean Flutter architectures.",
    accent:"#ff2bd6",
  },
  {
    code:"N-03", years:"2022 — 2023", role:"WEB × DESIGN LEAD", company:"AMITY UNIVERSITY", place:"Dubai, UAE",
    body:"Led digital infrastructure for student events, operating teams and systems at 500+ attendee scale.",
    accent:"#30ffb4",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({target:ref, offset:["start start","end end"]});
  const total = ROLES.length;
  const step = 1/total, pad = step*0.2;
  const fillH = useTransform(scrollYProgress,[0,1],["0%","100%"]);
  return (
    <section id="experience" className="relative">
      <div className="section pt-28 md:pt-36">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-6"><span className="section-tag">04 // DATA CHRONICLE</span></div>
          <SplitText as="h2" className="headline text-3xl md:text-5xl max-w-3xl neon-c" text="Transmission log."/>
        </div>
      </div>
      <div ref={ref} style={{height:`${total*100}vh`}} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden p-6 md:p-10 flex items-center">
          <div className="noise"/>
          <div className="container-x relative h-full w-full flex items-center">
            <div className="tl-rail hidden md:block"/>
            <motion.div className="hidden md:block tl-rail" style={{background:"linear-gradient(180deg, var(--cyan), var(--magenta))", height:fillH}}/>
            {ROLES.map((r,i)=>{
              const s = Math.max(0,i*step-pad), e = Math.min(1,(i+1)*step+pad);
              const op = useTransform(scrollYProgress,[s,s+(e-s)*0.1,e-(e-s)*0.1,e],[0,1,1,0]);
              const y  = useTransform(scrollYProgress,[s,e],[80,-80]);
              const sc = useTransform(scrollYProgress,[s,s+(e-s)*0.1,e-(e-s)*0.1,e],[0.9,1,1,0.96]);
              const rx = useTransform(scrollYProgress,[s,e],[8,-6]);
              const bl = useTransform(scrollYProgress,[s,s+(e-s)*0.1,e-(e-s)*0.1,e],["blur(10px)","blur(0)","blur(0)","blur(6px)"]);
              const dotColor = useTransform(scrollYProgress,[s,s+(e-s)*0.4,e-(e-s)*0.4,e],["var(--ink-mute)",r.accent,r.accent,"var(--ink-mute)"]);
              return (
                <motion.article key={r.code} style={{opacity:op,y,scale:sc,rotateX:rx,filter:bl,zIndex:10+i}}
                  className="absolute inset-6 md:inset-10 flex items-center">
                  <TiltCard max={4} className="w-full max-w-3xl ml-0 md:ml-24">
                    <div className="hud p-6 md:p-10 mono relative" style={{borderColor:`${r.accent}55`, boxShadow:`inset 0 0 40px ${r.accent}15, 0 0 30px ${r.accent}20`}}>
                      <span className="corner-tr"/><span className="corner-bl"/>
                      <div className="flex items-center justify-between tech text-[10px] tracking-[.3em] uppercase mb-6">
                        <span style={{color:r.accent,textShadow:`0 0 10px ${r.accent}`}}>{r.code}</span>
                        <span className="text-[var(--ink-mute)]">{r.years}</span>
                      </div>
                      <h3 className="headline text-3xl md:text-5xl mb-2" style={{color:r.accent,textShadow:`0 0 14px ${r.accent}`}}>{r.role}</h3>
                      <div className="text-[var(--ink-dim)] text-[12px] tracking-[.25em] uppercase mb-5">// {r.company} · {r.place}</div>
                      <p className="text-[var(--ink-dim)] leading-relaxed md:text-[14px] max-w-2xl">{r.body}</p>
                      <div className="mt-6 grid grid-cols-3 gap-2 text-[10px] tracking-[.25em] uppercase">
                        <span className="hud p-2" style={{borderColor:`${r.accent}55`}}>status: logged</span>
                        <span className="hud p-2" style={{borderColor:`${r.accent}55`}}>verified: yes</span>
                        <span className="hud p-2" style={{borderColor:`${r.accent}55`}}>node::stable</span>
                      </div>
                    </div>
                  </TiltCard>
                  {/* timeline node */}
                  <motion.span className="tl-node hidden md:block" style={{top:`calc(${(i/(total-1))*100}% - 6px)`, borderColor:r.accent, background:dotColor as any, boxShadow:`0 0 18px ${r.accent}`}}/>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
