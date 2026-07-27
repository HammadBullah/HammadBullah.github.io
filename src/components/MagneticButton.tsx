import React, { useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  as?: "button" | "a";
  strength?: number;
  scrollTo?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const MagneticButton = ({
  children, className, onClick, href, target, rel, as, strength = 0.3, scrollTo, download, type, style, disabled,
}: Props) => {
  const Tag: any = as === "a" ? motion.a : motion.button;
  const [ref, { left, top, width, height }] = useMeasure();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const ripple = useRef<HTMLSpanElement>(null);

  const move = useCallback((e: React.MouseEvent) => {
    const cx = left + width/2, cy = top + height/2;
    x.set((e.clientX - cx)*strength);
    y.set((e.clientY - cy)*strength);
    if (ripple.current) {
      const r = ripple.current;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      r.style.top = `${e.clientY-rect.top}px`; r.style.left = `${e.clientX-rect.left}px`;
      r.style.transform = "translate(-50%,-50%) scale(1)"; r.style.opacity = ".35";
      setTimeout(()=>{ r.style.transform="translate(-50%,-50%) scale(8)"; r.style.opacity="0"; },10);
    }
  }, [left,top,width,height,x,y,strength]);
  const leave = useCallback(() => { x.set(0); y.set(0); }, [x,y]);

  const click = (e: React.MouseEvent) => {
    if (scrollTo) {
      const el = document.querySelector(scrollTo);
      if (el) {
        e.preventDefault();
        const w = window as any;
        if (w.lenis) w.lenis.scrollTo(el, {offset:0, duration:1.3});
        else el.scrollIntoView({behavior:"smooth",block:"start"});
      }
    }
    onClick?.();
  };

  return (
    <Tag ref={ref} onMouseMove={move} onMouseLeave={leave} onClick={click}
         href={href} target={target} rel={rel} download={download} type={type} disabled={disabled}
         style={{x:sx, y:sy, ...(style ?? {})}} className={`relative overflow-hidden ${className??""}`}>
      {children}
      <span ref={ripple} aria-hidden
        className="pointer-events-none absolute w-3 h-3 rounded-full bg-white/60"
        style={{transform:"translate(-50%,-50%) scale(0)", opacity:0, transition:"transform .6s ease, opacity .6s ease"}}/>
    </Tag>
  );
};
