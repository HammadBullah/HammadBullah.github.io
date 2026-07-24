import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function Cursor() {
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 });
  const ringX = useSpring(0, { stiffness: 180, damping: 25 });
  const ringY = useSpring(0, { stiffness: 180, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setHidden(false);
    };
    const leave = () => setHidden(true);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const clickable = !!t.closest("a,button,[role=button],input,textarea,label,[data-cursor='link']");
      setHovering(clickable);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY, ringX, ringY]);

  return (
    <>
      <motion.div
        className="cursor-dot mix-blend-difference"
        style={{
          translateX: mouseX,
          translateY: mouseY,
          opacity: hidden ? 0 : 1,
          scale: hovering ? 0 : 1,
        }}
      />
      <motion.div
        className="cursor-ring mix-blend-difference"
        style={{
          translateX: ringX,
          translateY: ringY,
          opacity: hidden ? 0 : 0.6,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderColor: "white",
        }}
      />
    </>
  );
}
