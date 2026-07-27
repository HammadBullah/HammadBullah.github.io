import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Line { t: string; c?: string; }

interface Props { open:boolean; onClose:()=>void; }

export function Terminal({ open, onClose }: Props) {
  const [lines, setLines] = useState<Line[]>([
    { t:"NEURAL_TERMINAL v2.0.45 — type 'help' for command list.", c:"" },
    { t:"session: hammadsafi@core :: ~", c:"neon-c" },
  ]);
  const [v,setV] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ if (open) setTimeout(()=>inputRef.current?.focus(),80); },[open]);
  useEffect(()=>{ if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; },[lines]);
  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=>{ if(open && e.key==="Escape") onClose(); };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[open,onClose]);

  const out = (l:Line[])=>setLines(prev=>[...prev,...l]);

  const run = (raw:string) => {
    const cmd = raw.trim().toLowerCase();
    out([{ t:`▸ ${raw}`, c:"neon-c" }]);
    switch (cmd) {
      case "": break;
      case "help": out([
        {t:"AVAILABLE COMMANDS:", c:"neon-m"},
        {t:"  about     — operator identity"},
        {t:"  projects  — archive index"},
        {t:"  skills    — matrix capabilities"},
        {t:"  contact   — transmission channels"},
        {t:"  resume    — download dossier"},
        {t:"  github    — open repository"},
        {t:"  theme     — (locked) cyber-noir"},
        {t:"  clear     — purge buffer"},
        {t:"  exit      — terminate session"},
      ]); break;
      case "about": out([
        {t:"Hammad Safi // Full-Stack / AI Developer",c:"neon-c"},
        {t:"MSc Advanced Computer Science @ Hertfordshire",c:""},
        {t:"Building AI-native applications at the intersection of systems and UX.",c:""},
      ]); break;
      case "projects": out([
        {t:"[01] Drowning Detection   — YOLOv9 · TF · Python",c:"neon-g"},
        {t:"[02] PlucknPay             — Flutter · Firebase",c:"neon-g"},
        {t:"[03] Weather LSTM         — LSTM · Research",c:"neon-g"},
        {t:"[04] Smart Agriculture    — IoT · Dart · Firebase",c:"neon-g"},
      ]); break;
      case "skills": out([
        {t:"STACK // Python · TS · JS · Dart · Java",c:""},
        {t:"WEB // React · Next · Tailwind · Framer Motion",c:""},
        {t:"AI // TensorFlow · PyTorch · YOLO · LSTM",c:""},
        {t:"INFRA // Docker · AWS · Firebase · Git · Linux",c:""},
      ]); break;
      case "contact": out([
        {t:"email : hammabdullah@gmail.com",c:"neon-c"},
        {t:"phone : +44 7352 664787",c:"neon-c"},
        {t:"in    : linkedin.com/in/hammad-safi",c:"neon-c"},
      ]); break;
      case "resume": out([{t:"opening dossier…",c:"neon-m"}]); window.open("/resume.pdf","_blank"); break;
      case "github": out([{t:"route → github.com/HammadBullah",c:"neon-m"}]); window.open("https://github.com/HammadBullah","_blank"); break;
      case "theme": out([{t:"theme locked: CYBER_NOIR // SYSTEM_DEFAULT",c:"neon-v"}]); break;
      case "clear": setLines([]); return;
      case "exit": case "quit": case "q": onClose(); return;
      default: out([{t:`UNKNOWN COMMAND: ${cmd} — try 'help'.`, c:"text-[var(--red)]"}]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{y:20,opacity:0,scale:.98}} animate={{y:0,opacity:1,scale:1}} exit={{y:10,opacity:0,scale:.98}}
            transition={{type:"spring",stiffness:240,damping:24}}
            className="term-ctx w-full max-w-3xl rounded-lg overflow-hidden" onClick={e=>e.stopPropagation()}
            style={{boxShadow:"0 0 60px rgba(0,240,255,.25), inset 0 0 40px rgba(0,240,255,.08)"}}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[rgba(0,240,255,.25)]">
              <span className="w-3 h-3 rounded-full bg-[var(--red)]"/>
              <span className="w-3 h-3 rounded-full bg-[var(--amber)]"/>
              <span className="w-3 h-3 rounded-full bg-[var(--green)]"/>
              <span className="ml-2 tech text-[11px] tracking-[.2em] uppercase neon-c">neural_terminal</span>
              <span className="ml-auto tech text-[10px] text-[var(--ink-mute)]">ESC to close · ⌃`</span>
            </div>
            <div ref={bodyRef} className="p-4 mono text-[13px] leading-relaxed h-[60vh] overflow-y-auto">
              {lines.map((l,i)=>(
                <div key={i} className={l.c??""} style={{textShadow:"var(--glow-c)"}}>{l.t}</div>
              ))}
              <form onSubmit={(e)=>{e.preventDefault(); run(v); setV("");}} className="flex items-center gap-2 mt-1">
                <span className="neon-c" style={{textShadow:"var(--glow-c)"}}>▸</span>
                <input ref={inputRef} value={v} onChange={e=>setV(e.target.value)} spellCheck={false} autoFocus/>
                <span className="blink w-2 h-4 bg-[var(--cyan)]" style={{boxShadow:"var(--glow-c)"}}/>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
