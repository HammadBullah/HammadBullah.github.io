import React, { useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton = ({ children, className, onClick }: MagneticButtonProps) => {
  const [ref, { left, top, width, height }] = useMeasure();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      mouseX.set((e.clientX - centerX) * 0.4);
      mouseY.set((e.clientY - centerY) * 0.4);
    },
    [left, top, width, height, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};
