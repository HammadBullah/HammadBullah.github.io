import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { num: 12, suffix: "+", label: "Projects", sub: "Shipped end-to-end" },
  { num: 150000, suffix: "+", label: "Lines of Code", sub: "Written, deleted, rewritten" },
  { num: 18, suffix: "+", label: "Technologies", sub: "In active rotation" },
  { num: 4, suffix: "", label: "AI Projects", sub: "Computer vision · LLM · time-series" },
  { num: 100, suffix: "%", label: "Passion", sub: "For building software" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setV(Math.round(eased * to));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const formatted = to >= 1000 ? v.toLocaleString() : String(v);
  return <span ref={ref} className="stat-num text-5xl md:text-7xl">{formatted}{suffix}</span>;
}

export function Stats() {
  return (
    <section id="stats" className="relative py-24 md:py-32 section border-t hairline">
      <div className="container-x">
        <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="eyebrow mb-6">05 — By the numbers</motion.p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 md:divide-x divide-hairline md:border-y hairline py-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity:0, y:18 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-60px" }}
              transition={{ duration:.6, delay: i*0.07 }}
              className={`px-0 md:px-6 ${i===0?"md:pl-0":""} ${i===STATS.length-1?"md:pr-0":""}`}
            >
              <Counter to={s.num} suffix={s.suffix} />
              <p className="mt-3 font-medium text-[15px] tracking-tight">{s.label}</p>
              <p className="text-soft text-[12px] mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
