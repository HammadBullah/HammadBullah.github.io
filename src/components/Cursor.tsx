import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useHooks";

const TRAIL_COUNT = 8;

export function Cursor() {
  const reduced = useReducedMotion();
  const dotX = useSpring(-100, { stiffness: 700, damping: 45, mass: 0.2 });
  const dotY = useSpring(-100, { stiffness: 700, damping: 45, mass: 0.2 });
  const ringX = useSpring(-100, { stiffness: 240, damping: 26 });
  const ringY = useSpring(-100, { stiffness: 240, damping: 26 });

  const trail = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({
      x: useSpring(-100, { stiffness: 280, damping: 30 }),
      y: useSpring(-100, { stiffness: 280, damping: 30 }),
    }))
  ).current;

  useEffect(() => {
    if (reduced) return;
    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    const trailPos = trail.map(() => ({ x: -100, y: -100 }));

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dotX.set(tx);
      dotY.set(ty);
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ringX.set(rx);
      ringY.set(ry);

      // detect hover
      const t = e.target as HTMLElement | null;
      const clickable = !!t?.closest(
        "a,button,[role=button],input,textarea,label,[data-cursor='link']"
      );
      document.documentElement.classList.toggle("cursor-hover", clickable);
    };

    let raf = 0;
    const loop = () => {
      for (let i = trail.length - 1; i > 0; i--) {
        trailPos[i].x += (trailPos[i - 1].x - trailPos[i].x) * (0.35 - i * 0.02);
        trailPos[i].y += (trailPos[i - 1].y - trailPos[i].y) * (0.35 - i * 0.02);
        trail[i].x.set(trailPos[i].x);
        trail[i].y.set(trailPos[i].y);
      }
      trailPos[0].x += (tx - trailPos[0].x) * 0.4;
      trailPos[0].y += (ty - trailPos[0].y) * 0.4;
      trail[0].x.set(trailPos[0].x);
      trail[0].y.set(trailPos[0].y);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onLeave = () => {
      dotX.set(-100); dotY.set(-100); ringX.set(-100); ringY.set(-100);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, dotX, dotY, ringX, ringY, trail]);

  if (reduced) return null;

  return (
    <>
      {trail.map((t, i) => (
        <motion.div
          key={i}
          className="cursor-trail"
          style={{
            translateX: t.x,
            translateY: t.y,
            scale: 1 - i * 0.08,
            opacity: 0.45 - i * 0.05,
          }}
        />
      ))}
      <motion.div
        className="cursor-ring"
        style={{ translateX: ringX, translateY: ringY }}
      />
      <motion.div
        className="cursor-dot"
        style={{ translateX: dotX, translateY: dotY }}
      />
    </>
  );
}
