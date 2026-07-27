import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Download, Terminal } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";

function Github() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z"/>
    </svg>
  );
}
function Linkedin() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"/>
    </svg>
  );
}

export function Hero({ onOpenTerminal }:{ onOpenTerminal:()=>void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:["start start","end start"] });
  const y = useTransform(scrollYProgress,[0,1],[0,120]);
  const opacity = useTransform(scrollYProgress,[0,.7],[1,0]);
  const scale = useTransform(scrollYProgress,[0,1],[1,0.94]);
  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] flex items-center justify-center px-6 sm:px-10 overflow-hidden">
      {/* data streams */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length:20}).map((_,i)=>(
          <span key={i} className="stream" style={{left:`${5+i*4.8}%`, animationDelay:`${i*0.4}s`, animationDuration:`${6+i%4}s`, opacity:.1+((i%3)*0.08), background: i%3===0?"linear-gradient(to bottom,transparent,var(--magenta),transparent)":"linear-gradient(to bottom,transparent,var(--cyan),transparent)"}}/>
        ))}
      </div>

      <motion.div style={{y,opacity,scale}} className="relative z-10 max-w-6xl w-full">
        {/* HUD corners */}
        <div className="absolute -left-2 -top-10 w-8 h-8 border-l-2 border-t-2 border-[var(--cyan)]"/>
        <div className="absolute -right-2 -top-10 w-8 h-8 border-r-2 border-t-2 border-[var(--magenta)]"/>
        <div className="absolute -left-2 -bottom-10 w-8 h-8 border-l-2 border-b-2 border-[var(--magenta)]"/>
        <div className="absolute -right-2 -bottom-10 w-8 h-8 border-r-2 border-b-2 border-[var(--cyan)]"/>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="flex flex-wrap gap-2 mb-8 items-center">
              <span className="section-tag">SYSTEMS ONLINE</span>
              <button onClick={onOpenTerminal} className="inline-flex items-center gap-2 tech text-[11px] tracking-[.25em] uppercase text-[var(--magenta)] px-3 py-1 border border-[rgba(255,43,214,.4)] hover:bg-[rgba(255,43,214,.08)] transition"
                data-cursor="link" style={{boxShadow:"var(--glow-m)"}}>
                <Terminal size={12}/> ./terminal
              </button>
            </motion.div>

            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.15}}
              className="headline text-[clamp(2.2rem,7vw,5.8rem)] leading-[0.95]">
              <span className="block neon-c glitch chromatic" data-text="HAMMAD SAFI">HAMMAD SAFI</span>
              <span className="block text-[var(--ink-dim)] text-[clamp(1rem,2vw,1.5rem)] tracking-[.4em] mt-4" style={{textShadow:"0 0 12px rgba(0,240,255,.2)"}}>
                // FULL-STACK · AI SYSTEMS ARCHITECT
              </span>
            </motion.h1>

            <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.4}}
              className="tech text-[var(--ink-dim)] mt-8 max-w-2xl leading-relaxed text-[14px] md:text-[15px]">
              <span className="neon-c">[CORE_BOOT]</span> Neural interface aligned. I build AI-native systems that
              translate signal into action — blending computer vision, real-time data layers, and interfaces that
              feel less like software and more like <span className="neon-m">telemetry</span>.
            </motion.p>

            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.6}} className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton as="a" href="#projects" scrollTo="#projects" className="btn-hud glitch" data-text="ENTER ARCHIVE">
                ENTER ARCHIVE <ArrowUpRight size={14}/>
              </MagneticButton>
              <MagneticButton as="a" href="/resume.pdf" download className="btn-hud magenta glitch" data-text="LOAD DOSSIER">
                LOAD DOSSIER <Download size={14}/>
              </MagneticButton>
              <MagneticButton as="a" href="#contact" scrollTo="#contact" className="btn-hud ghost">
                TRANSMIT SIGNAL
              </MagneticButton>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} className="mt-12 flex items-center gap-4 tech text-[11px] tracking-[.3em] uppercase text-[var(--ink-mute)]">
              <a href="https://github.com/HammadBullah" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-[var(--cyan)] transition glitch" data-text="GITHUB" data-cursor="link"><Github/> GITHUB</a>
              <span className="opacity-40">|</span>
              <a href="https://linkedin.com/in/hammad-safi" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-[var(--cyan)] transition glitch" data-text="LINKEDIN" data-cursor="link"><Linkedin/> LINKEDIN</a>
              <span className="opacity-40">|</span>
              <span className="neon-g">● SIGNAL: STABLE</span>
            </motion.div>
          </div>

          {/* Mini HUD panel */}
          <div className="md:col-span-4">
            <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.9,delay:.3}} className="hud p-5 mono text-[12px] leading-6">
              <span className="corner-tr"/><span className="corner-bl"/>
              <div className="flex items-center justify-between mb-3">
                <span className="tech text-[10px] tracking-[.3em] uppercase neon-c">OPERATOR_TELEMETRY</span>
                <span className="w-2 h-2 rounded-full bg-[var(--green)] blink" style={{boxShadow:"0 0 10px var(--green)"}}/>
              </div>
              <Row k="identity" v="H. Safi" c="neon-c"/>
              <Row k="node" v="uk.hatfield.01" />
              <Row k="uptime" v="4+ years active" />
              <Row k="stack" v="py · ts · flutter · tf" c="neon-m"/>
              <Row k="ai_focus" v="cv · lstm · llm" c="neon-v"/>
              <Row k="link" v="/transmit ↗" c="neon-g"/>
              <div className="mt-4 h-[40px] flex items-end gap-[2px]">
                {Array.from({length:28}).map((_,i)=>(
                  <motion.span key={i}
                    className="inline-block w-[3px] bg-[var(--cyan)]"
                    initial={{height:"10%"}}
                    animate={{height:[`${10+((i*7)%60)}%`,`${30+((i*13)%70)}%`,`${10+((i*5)%40)}%`]}}
                    transition={{duration:1.4,repeat:Infinity,delay:i*0.03,ease:"easeInOut"}}
                    style={{boxShadow:"0 0 6px var(--cyan)"}}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a href="#about" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}} className="absolute bottom-8 left-1/2 -translate-x-1/2 tech text-[10px] tracking-[.3em] uppercase text-[var(--ink-mute)] flex flex-col items-center gap-2 hover:text-[var(--cyan)] transition">
        SCROLL
        <motion.span animate={{y:[0,8,0]}} transition={{duration:1.8,repeat:Infinity,ease:"easeInOut"}}
          className="block w-[1px] h-8 bg-[var(--cyan)]" style={{boxShadow:"0 0 8px var(--cyan)"}}/>
      </motion.a>
    </section>
  );
}

function Row({k,v,c}:{k:string;v:string;c?:string}){
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[var(--ink-mute)]">{k}</span>
      <span className={c??""}>{v}</span>
    </div>
  );
}
