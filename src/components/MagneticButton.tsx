import React, { useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  as?: "button" | "a";
  strength?: number;
  scrollTo?: string; // CSS selector for lenis
}

export const MagneticButton = ({
  children,
  className,
  onClick,
  href,
  target,
  rel,
  as,
  strength = 0.3,
  scrollTo,
  download,
}: MagneticButtonProps) => {
  const Tag: any = as === "a" ? motion.a : motion.button;
  const [ref, { left, top, width, height }] = useMeasure();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 170, damping: 14, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 170, damping: 14, mass: 0.4 });

  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const cx = left + width / 2;
      const cy = top + height / 2;
      mouseX.set((e.clientX - cx) * strength);
      mouseY.set((e.clientY - cy) * strength);

      // create ripple
      if (rippleRef.current) {
        const r = rippleRef.current;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        r.style.top = `${y}px`;
        r.style.left = `${x}px`;
        r.style.transform = "translate(-50%,-50%) scale(1)";
        r.style.opacity = "0.25";
        setTimeout(() => {
          r.style.transform = "translate(-50%,-50%) scale(6)";
          r.style.opacity = "0";
        }, 10);
      }
    },
    [left, top, width, height, mouseX, mouseY, strength]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleClick = (e: React.MouseEvent) => {
    if (scrollTo) {
      const el = document.querySelector(scrollTo);
      if (el) {
        e.preventDefault();
        // find lenis if mounted on window
        const w = window as any;
        if (w.lenis) w.lenis.scrollTo(el, { offset: 0, duration: 1.3 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onClick?.();
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      href={href}
      target={target}
      rel={rel}
      download={download}
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      {children}
      <span
        ref={rippleRef}
        aria-hidden
        className="pointer-events-none absolute w-4 h-4 rounded-full bg-white/70 dark:bg-white/60"
        style={{ transform: "translate(-50%,-50%) scale(0)", opacity: 0, transition: "transform .6s ease, opacity .6s ease" }}
      />
    </Tag>
  );
};
