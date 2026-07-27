import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  { t: "initializing portfolio.os .....", c: "dim" },
  { t: "[ok] loading modules", c: "ok" },
  { t: "[ok] importing projects", c: "ok" },
  { t: "[ok] compiling shaders", c: "ok" },
  { t: "[ok] mounting experience", c: "ok" },
  { t: "ready.", c: "ok" },
];

interface BootLoaderProps {
  onDone: () => void;
}

export function BootLoader({ onDone }: BootLoaderProps) {
  const [visible, setVisible] = useState<number>(0);
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= LINES.length) {
        clearInterval(id);
        setTimeout(() => {
          if (done.current) return;
          done.current = true;
          onDone();
        }, 450);
      }
    }, 180);
    // Progress bar
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      setPct(Math.round(k * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        exit={{ opacity: 0, y: -10, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } }}
        className="boot"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#30d158]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#8b949e]">hammad.safi — zsh</span>
          </div>
          <div className="space-y-1">
            {LINES.slice(0, visible).map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`row ${l.c === "ok" ? "ok" : "dim"}`}
              >
                <span className="ok mr-2">›</span>{l.t}
              </motion.div>
            ))}
          </div>
          <div className="bar"><motion.div style={{ width: `${pct}%` }} transition={{ ease: "linear" }} /></div>
          <div className="mt-3 text-[11px] tracking-widest text-[#6e7681] uppercase">{pct}% · preparing canvas</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
