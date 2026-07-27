import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "../components/SplitText";

const NODES = [
  { id:"id", label:"IDENTITY", val:"Hammad Safi", hue:"cyan" },
  { id:"role", label:"ROLE", val:"Full-Stack · AI", hue:"magenta" },
  { id:"edu", label:"EDUCATION", val:"MSc Comp Sci", hue:"violet" },
  { id:"loc", label:"NODE", val:"UK · Hatfield", hue:"green" },
  { id:"focus", label:"FOCUS", val:"Vision · LLM · UX", hue:"cyan" },
  { id:"build", label:"BUILD", val:"Prompt Coach v2", hue:"magenta" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({target:ref, offset:["start 0.85","end 0.2"]});
  const y = useTransform(scrollYProgress,[0,1],[60,-60]);

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-36 section">
      <div className="noise pointer-events-none absolute inset-0"/>
      <div className="container-x relative">
        <div className="mb-10 flex items-center gap-3">
          <span className="section-tag">01 // NEURAL PROFILE</span>
        </div>

        <SplitText as="h2" className="headline text-3xl md:text-5xl mb-10 max-w-3xl leading-tight neon-c"
          text="Signal profile loaded. Identity aligned." />

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <motion.div style={{y}} className="lg:col-span-7 relative h-[420px] md:h-[520px]">
            <svg viewBox="0 0 600 500" className="absolute inset-0 w-full h-full">
              <defs>
                <radialGradient id="core-g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity=".9"/>
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0"/>
                </radialGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="3"/></filter>
              </defs>
              {/* connection lines */}
              {NODES.map((n,i)=>NODES.slice(i+1).map((m,j)=>{
                const a = nodePos(n.id), b = nodePos(m.id);
                return <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="url(#lg)" strokeWidth="0.6" opacity=".25"/>;
              }))}
              <defs>
                <linearGradient id="lg" x1="0" x2="1"><stop offset="0" stopColor="#00f0ff"/><stop offset="1" stopColor="#ff2bd6"/></linearGradient>
              </defs>
            </svg>
            {/* core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 grid place-items-center">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,.6),transparent_70%)] blur-xl"/>
              <motion.div animate={{rotate:360}} transition={{duration:18,repeat:Infinity,ease:"linear"}}
                className="absolute inset-0 rounded-full border border-[var(--cyan)] opacity-70" style={{boxShadow:"var(--glow-c)"}}/>
              <motion.div animate={{rotate:-360}} transition={{duration:24,repeat:Infinity,ease:"linear"}}
                className="absolute inset-4 rounded-full border border-[var(--magenta)] opacity-60" style={{boxShadow:"var(--glow-m)"}}/>
              <div className="relative w-16 h-16 rounded-full bg-[var(--bg)] border border-[var(--cyan)] grid place-items-center mono text-[10px] tracking-[.25em] neon-c" style={{boxShadow:"var(--glow-c)"}}>
                CORE
              </div>
            </div>
            {/* nodes */}
            {NODES.map((n)=>{
              const p = nodePos(n.id);
              const color = n.hue==="cyan"?"var(--cyan)":n.hue==="magenta"?"var(--magenta)":n.hue==="green"?"var(--green)":"var(--violet)";
              return (
                <motion.div key={n.id}
                  initial={{opacity:0,scale:.6}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                  transition={{duration:.6,delay:.1}}
                  className="absolute -translate-x-1/2 -translate-y-1/2 tech text-[10px] tracking-[.25em] uppercase"
                  style={{left:`${(p.x/600)*100}%`, top:`${(p.y/500)*100}%`, color}}
                >
                  <span className="block w-3 h-3 rounded-full mx-auto mb-1" style={{background:color,boxShadow:`0 0 10px ${color}`}}/>
                  <span className="whitespace-nowrap">{n.label}</span>
                  <div className="text-[11px] text-white/80 tracking-normal normal-case mt-0.5" style={{textShadow:`0 0 8px ${color}`}}>{n.val}</div>
                </motion.div>
              );
            })}

            {/* scanning line */}
            <motion.span aria-hidden
              animate={{top:["0%","100%","0%"]}} transition={{duration:6,ease:"linear",repeat:Infinity}}
              className="absolute left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--cyan),transparent)]"
              style={{boxShadow:"0 0 14px var(--cyan)"}}/>
          </motion.div>

          <div className="lg:col-span-5 mono text-[13px] leading-relaxed">
            <TypewriterBio/>
            <div className="mt-8 grid grid-cols-2 gap-3 text-[11px] tracking-[.2em] uppercase">
              <Stat k="SIGNAL" v="ACTIVE" vClass="neon-g"/>
              <Stat k="LATENCY" v="12ms" vClass="neon-c"/>
              <Stat k="MODULES" v="24" vClass="neon-m"/>
              <Stat k="UPTIME" v="4.2yr" vClass="neon-c"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function nodePos(id:string){
  const m:Record<string,{x:number;y:number}> = {
    id:    {x:120, y:100},
    role:  {x:480, y:90},
    edu:   {x:90,  y:360},
    loc:   {x:510, y:380},
    focus: {x:520, y:240},
    build: {x:80,  y:230},
  };
  return m[id];
}

function Stat({k,v,vClass}:{k:string;v:string;vClass?:string}){
  return <div className="hud p-3">
    <span className="corner-tr"/><span className="corner-bl"/>
    <div className="text-[var(--ink-mute)]">{k}</div>
    <div className={`text-lg tech mt-1 ${vClass??""}`}>{v}</div>
  </div>;
}

const BIO = [
  "> initializing operator://hammad_safi",
  "> MSc Advanced Computer Science candidate. UK node.",
  "> Interest vector: [computer_vision, deep_learning, realtime_ui, prompt_systems].",
  "> I build interfaces where data feels alive—without losing the rigor underneath.",
  "> Currently synthesizing a prompt-coaching layer that makes models reason in public.",
];

function TypewriterBio() {
  const [i,setI] = useState(0);
  const [text,setText] = useState("");
  useEffect(()=>{
    if (i>=BIO.length) return;
    const full = BIO[i];
    let c = 0;
    const id = setInterval(()=>{
      c++; setText(full.slice(0,c));
      if (c>=full.length){ clearInterval(id); setTimeout(()=>setI(i+1), 350); }
    },14);
    return ()=>clearInterval(id);
  },[i]);
  return (
    <div className="hud p-5 text-[var(--ink-dim)]" style={{minHeight:240}}>
      <span className="corner-tr"/><span className="corner-bl"/>
      <div className="flex items-center justify-between mb-3 text-[10px] tracking-[.3em] uppercase">
        <span className="neon-c">// bio.stream</span>
        <span className="text-[var(--ink-mute)]">{Math.min(i+1,BIO.length)}/{BIO.length}</span>
      </div>
      <div className="space-y-2 leading-6">
        {BIO.slice(0,i).map((l,j)=><div key={j} className={j===0?"neon-c":""}>{l}</div>)}
        <div>
          {i<BIO.length && (<>
            <span>{text}</span>
            <span className="blink inline-block w-2 h-4 bg-[var(--cyan)] ml-1 align-middle" style={{boxShadow:"var(--glow-c)"}}/>
          </>)}
        </div>
      </div>
    </div>
  );
}
