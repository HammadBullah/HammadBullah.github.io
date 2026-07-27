import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
  border?: boolean;
  max?: number;
}

/**
 * 3D tilt card with dynamic lighting (mouse-follow glare + animated conic border).
 * All transforms use CSS vars for GPU-composited transforms.
 */
export function TiltCard({ children, className = "", glare = true, border = true, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const ang = useMotionValue(0);

  const spRx = useSpring(rx, { stiffness: 240, damping: 20, mass: 0.5 });
  const spRy = useSpring(ry, { stiffness: 240, damping: 20, mass: 0.5 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    rx.set((0.5 - y) * max * 2);
    ry.set((x - 0.5) * max * 2);
    mx.set(x * 100);
    my.set(y * 100);
    ang.set(Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 180);
  }, [rx, ry, mx, my, ang, max]);

  const onLeave = useCallback(() => {
    rx.set(0); ry.set(0); mx.set(50); my.set(50);
  }, [rx, ry, mx, my]);

  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div
        className="tilt-inner relative"
        style={{
          rotateX: spRx,
          rotateY: spRy,
          transformPerspective: 1200,
          // CSS variables for glare/border
          ["--mx" as any]: mx,
          ["--my" as any]: my,
          ["--ang" as any]: ang,
        } as any}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {children}
        {glare && <span className="tilt-glare" />}
        {border && <span className="tilt-border" />}
      </motion.div>
    </div>
  );
}
