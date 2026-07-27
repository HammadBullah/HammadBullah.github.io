import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const LINKS = [
  { label: "Profile",    href: "#about" },
  { label: "Matrix",     href: "#skills" },
  { label: "Archive",    href: "#projects" },
  { label: "Chronicle",  href: "#experience" },
  { label: "Transmit",   href: "#contact" },
];

interface Props { onOpenTerminal: ()=>void; }

export function Navbar({ onOpenTerminal }: Props) {
  const [s, setS] = useState(0);
  useEffect(()=>{
    const on = ()=>setS(window.scrollY);
    on(); window.addEventListener("scroll",on,{passive:true});
    return ()=>window.removeEventListener("scroll",on);
  },[]);
  const scrolled = s > 40;
  return (
    <motion.header
      initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.9,ease:[0.22,1,0.36,1],delay:.2}}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className={`flex items-center justify-between gap-3 px-3 py-2 transition-all ${scrolled?"hud":""}`}
           style={{width:"100%",maxWidth:1100, borderRadius: scrolled? 8:0, border: scrolled? undefined:"1px solid transparent"}}>
        <a href="#top" className="flex items-center gap-2 pl-2 pr-3">
          <span className="w-7 h-7 grid place-items-center border border-[var(--cyan)] text-[var(--cyan)] text-[10px] tech"
                style={{clipPath:"polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)",boxShadow:"var(--glow-c)"}}>
            HS
          </span>
          <span className="tech text-[12px] tracking-[0.25em] uppercase neon-c hidden sm:inline">H_Safi</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 tech text-[11px] tracking-[0.2em] uppercase">
          {LINKS.map(l=>(
            <li key={l.href}>
              <a href={l.href} data-cursor="link"
                 className="px-3 py-2 text-[var(--ink-dim)] hover:text-[var(--cyan)] transition-colors hover:neon-c glitch" data-text={l.label}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={onOpenTerminal} aria-label="Terminal" data-cursor="link"
            className="w-9 h-9 grid place-items-center border border-[rgba(0,240,255,.35)] text-[var(--cyan)] hover:bg-[rgba(0,240,255,.08)] transition-colors"
            style={{clipPath:"polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)",boxShadow:"var(--glow-c)"}}>
            <Terminal size={14}/>
          </button>
          <a href="#contact" className="btn-hud hidden sm:inline-flex !px-4 !py-2 !text-[11px]">
            INITIATE
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
