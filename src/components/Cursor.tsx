import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

const TRAIL = 10;

export function Cursor() {
  const dotX = useSpring(-100, { stiffness: 800, damping: 40, mass: 0.2 });
  const dotY = useSpring(-100, { stiffness: 800, damping: 40, mass: 0.2 });
  const ringX = useSpring(-100, { stiffness: 220, damping: 24 });
  const ringY = useSpring(-100, { stiffness: 220, damping: 24 });

  const trailRef = useRef(
    Array.from({ length: TRAIL }, () => ({
      x: useSpring(-100, { stiffness: 300, damping: 34 }),
      y: useSpring(-100, { stiffness: 300, damping: 34 }),
    }))
  ).current;

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    if (mq.matches) return;

    let tx = -100, ty = -100, rx = -100, ry = -100;
    const tpos = trailRef.map(() => ({ x: -100, y: -100 }));

    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      dotX.set(tx); dotY.set(ty);
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      ringX.set(rx); ringY.set(ry);

      const el = e.target as HTMLElement | null;
      const clickable = !!el?.closest("a,button,[role=button],input,textarea,label,[data-cursor=link],.skill-chip,.tilt");
      document.documentElement.classList.toggle("cursor-hover", clickable);
    };
    const leave = () => { dotX.set(-100); dotY.set(-100); ringX.set(-100); ringY.set(-100); };

    let raf = 0;
    const loop = () => {
      for (let i = trailRef.length - 1; i > 0; i--) {
        const k = 0.32 - i * 0.02;
        tpos[i].x += (tpos[i-1].x - tpos[i].x) * k;
        tpos[i].y += (tpos[i-1].y - tpos[i].y) * k;
        trailRef[i].x.set(tpos[i].x);
        trailRef[i].y.set(tpos[i].y);
      }
      tpos[0].x += (tx - tpos[0].x) * 0.4;
      tpos[0].y += (ty - tpos[0].y) * 0.4;
      trailRef[0].x.set(tpos[0].x);
      trailRef[0].y.set(tpos[0].y);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const click = (e: MouseEvent) => {
      const r = document.createElement("span");
      r.className = "cursor-ripple";
      r.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:6px;height:6px;border-radius:50%;border:1px solid var(--fg);transform:translate(-50%,-50%);pointer-events:none;z-index:9997;mix-blend-mode:difference;animation:ripple .6s ease-out forwards;`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 650);
    };
    const style = document.createElement("style");
    style.innerHTML = `@keyframes ripple { to { width: 60px; height: 60px; opacity: 0; } }`;
    document.head.appendChild(style);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", click);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", click);
      style.remove();
    };
  }, [dotX, dotY, ringX, ringY, trailRef]);

  return (
    <>
      {trailRef.map((s, i) => (
        <motion.span
          key={i}
          className="cursor-trail"
          style={{ translateX: s.x, translateY: s.y, opacity: 0.5 - i * 0.04, scale: 1 - i * 0.07 }}
        />
      ))}
      <motion.span className="cursor-ring" style={{ translateX: ringX, translateY: ringY }} />
      <motion.span className="cursor-dot" style={{ translateX: dotX, translateY: dotY }} />
    </>
  );
}
