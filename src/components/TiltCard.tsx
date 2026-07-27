import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props { children: React.ReactNode; className?: string; max?: number; }

export function TiltCard({ children, className="", max=6 }:Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const ang = useMotionValue(0);
  const sx = useSpring(rx,{stiffness:220,damping:20,mass:0.5});
  const sy = useSpring(ry,{stiffness:220,damping:20,mass:0.5});

  const onMove = useCallback((e:React.MouseEvent)=>{
    const el = ref.current; if(!el) return;
    const r = el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    rx.set((0.5-y)*max*2); ry.set((x-0.5)*max*2);
    mx.set(x*100); my.set(y*100);
    ang.set((Math.atan2(y-0.5,x-0.5)*180/Math.PI)+180);
  },[rx,ry,mx,my,ang,max]);
  const onLeave = useCallback(()=>{ rx.set(0); ry.set(0); mx.set(50); my.set(50); },[rx,ry,mx,my]);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={{perspective:1200}}>
      <motion.div className="relative"
        style={{rotateX:sx, rotateY:sy, transformStyle:"preserve-3d", willChange:"transform",
          ["--mx" as any]: mx, ["--my" as any]: my, ["--ang" as any]: ang} as any}>
        {children}
        <span className="pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden
          style={{
            background:"radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,240,255,.14), transparent 45%)",
            mixBlendMode:"screen",
          }}/>
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden
          style={{
            background:`conic-gradient(from var(--ang,0deg), transparent 0deg, rgba(0,240,255,.6) 140deg, rgba(255,43,214,.6) 240deg, transparent 360deg)`,
            WebkitMask:"linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite:"xor",
            maskComposite:"exclude",
            padding:1,
          }}/>
      </motion.div>
    </div>
  );
}
