import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "> boot sequence initialized",
  "> connecting to neural.core ...... [OK]",
  "> loading matrix.modules .......... [OK]",
  "> decrypting persona .............. [OK]",
  "> mounting rendering engine ....... [OK]",
  "> authenticating operator ......... [OK]",
  "> welcome, Hammad.",
];

export function BootLoader({ onDone }:{onDone:()=>void}) {
  const [visible, setVisible] = useState(0);
  const [pct, setPct] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setVisible(++i);
      if (i >= LINES.length) {
        clearInterval(id);
        setTimeout(() => {
          if (doneRef.current) return;
          doneRef.current = true;
          onDone();
        }, 600);
      }
    }, 160);
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1,(t-start)/dur);
      setPct(Math.round(k*100));
      if (k<1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        exit={{opacity:0, filter:"blur(20px)"}}
        transition={{duration:.7,ease:[0.22,1,0.36,1]}}
        className="fixed inset-0 z-[300] bg-[#020308] text-[var(--cyan)] mono p-[8vh_8vw] flex flex-col justify-center"
        style={{boxShadow:"inset 0 0 120px rgba(0,240,255,.08)"}}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 text-xs tracking-[0.4em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--cyan)] blink" style={{boxShadow:"var(--glow-c)"}}/>
            NEURAL_CORE :: BOOT
          </div>
          <div className="space-y-2 text-[13px] leading-relaxed">
            {LINES.slice(0, visible).map((l,i) => (
              <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{duration:.3}}
                style={{textShadow:"var(--glow-c)"}}>
                {l}
              </motion.div>
            ))}
          </div>
          <div className="mt-10 h-[3px] w-full bg-[rgba(0,240,255,.15)] overflow-hidden rounded-full">
            <motion.div className="h-full bg-[var(--cyan)]" style={{width:`${pct}%`,boxShadow:"var(--glow-c)"}}/>
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-widest uppercase text-[var(--ink-dim)]">
            <span>modules {Math.min(visible,LINES.length)}/{LINES.length}</span>
            <span>{pct}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
