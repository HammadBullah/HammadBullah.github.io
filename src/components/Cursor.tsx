import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

const TRAIL = 10;

export function Cursor() {
  const dotX = useSpring(-100, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(-100, { stiffness: 900, damping: 40, mass: 0.2 });
  const ringX = useSpring(-100, { stiffness: 200, damping: 22 });
  const ringY = useSpring(-100, { stiffness: 200, damping: 22 });
  const trailRef = useRef(
    Array.from({ length: TRAIL }, () => ({
      x: useSpring(-100, { stiffness: 320, damping: 34 }),
      y: useSpring(-100, { stiffness: 320, damping: 34 }),
    }))
  ).current;

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    if (mq.matches) return;

    let tx = -100, ty = -100, rx = -100, ry = -100;
    const tp = trailRef.map(() => ({ x: -100, y: -100 }));

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      dotX.set(tx); dotY.set(ty);
      rx += (tx - rx) * 0.15; ry += (ty - ry) * 0.15;
      ringX.set(rx); ringY.set(ry);
      const t = e.target as HTMLElement | null;
      const hover = !!t?.closest("a,button,[role=button],input,textarea,label,.orb,.holo-card,.tilt,[data-cursor=link]");
      document.documentElement.classList.toggle("cur-hover", hover);
    };
    const onLeave = () => { dotX.set(-100); dotY.set(-100); ringX.set(-100); ringY.set(-100); };
    const onDown = (e: MouseEvent) => {
      const r = document.createElement("span");
      r.className = "cur-ring";
      r.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%) scale(1);width:20px;height:20px;border:1px solid var(--cyan);border-radius:99px;pointer-events:none;z-index:9998;mix-blend-mode:screen;animation:ripple .6s ease-out forwards;box-shadow:0 0 14px var(--cyan);`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 650);
    };
    const style = document.createElement("style");
    style.innerHTML = `@keyframes ripple { to { transform: translate(-50%,-50%) scale(4); opacity: 0; } }`;
    document.head.appendChild(style);

    let raf = 0;
    const loop = () => {
      for (let i = trailRef.length - 1; i > 0; i--) {
        const k = 0.32 - i * 0.02;
        tp[i].x += (tp[i-1].x - tp[i].x) * k;
        tp[i].y += (tp[i-1].y - tp[i].y) * k;
        trailRef[i].x.set(tp[i].x); trailRef[i].y.set(tp[i].y);
      }
      tp[0].x += (tx - tp[0].x) * 0.42; tp[0].y += (ty - tp[0].y) * 0.42;
      trailRef[0].x.set(tp[0].x); trailRef[0].y.set(tp[0].y);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      style.remove();
    };
  }, [dotX, dotY, ringX, ringY, trailRef]);

  return (
    <>
      {trailRef.map((s, i) => (
        <motion.span
          key={i}
          className="cur-trail"
          style={{
            translateX: s.x, translateY: s.y,
            opacity: 0.5 - i * 0.04,
            scale: 1 - i * 0.06,
            background: i % 2 ? "var(--magenta)" : "var(--cyan)",
          }}
        />
      ))}
      <motion.span className="cur-ring" style={{ translateX: ringX, translateY: ringY }} />
      <motion.span className="cur-dot" style={{ translateX: dotX, translateY: dotY }} />
    </>
  );
}
