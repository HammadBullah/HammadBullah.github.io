import React, { useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
  target?: string;
  rel?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className,
  onClick,
  href,
  as,
  target,
  rel,
  strength = 0.35,
}: MagneticButtonProps) => {
  const Tag: any = as === "a" ? motion.a : motion.button;
  const [ref, { left, top, width, height }] = useMeasure();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.3 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      mouseX.set((e.clientX - centerX) * strength);
      mouseY.set((e.clientY - centerY) * strength);
    },
    [left, top, width, height, mouseX, mouseY, strength]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </Tag>
  );
};
