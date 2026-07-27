import { useEffect, useRef } from "react";

/**
 * Developer-themed canvas background:
 *  - Drifting glyphs: {} <> () [] API JSON AI ML Git Docker Py Re fx _
 *  - Soft connecting lines between nearby glyphs
 *  - Cursor repel effect
 *  - Very low particle count for 60fps, subtle, never distracting.
 */
const GLYPHS = ["{}", "<>", "()", "[]", "API", "JSON", "AI", "ML", "git", "ψ", "λ", "fx", "//", "0x"];

interface Particle {
  x: number; y: number; vx: number; vy: number; glyph: string; size: number; alpha: number; depth: number; rot: number; rotV: number;
}

export function DevBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains("dark");
    let w = (c.width = window.innerWidth * devicePixelRatio);
    let h = (c.height = window.innerHeight * devicePixelRatio);
    c.style.width = window.innerWidth + "px";
    c.style.height = window.innerHeight + "px";
    const dpr = devicePixelRatio;
    const DPR = (n: number) => n * dpr;

    const COUNT = Math.min(44, Math.floor((window.innerWidth * window.innerHeight) / 38000));
    const ps: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * DPR(0.15),
      vy: (Math.random() - 0.5) * DPR(0.15),
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      size: DPR(10 + Math.random() * 8),
      alpha: 0.12 + Math.random() * 0.18,
      depth: 0.6 + Math.random() * 0.8,
      rot: (Math.random() - 0.5) * 0.3,
      rotV: (Math.random() - 0.5) * 0.0015,
    }));

    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => {
      w = c.width = window.innerWidth * dpr;
      h = c.height = window.innerHeight * dpr;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `500 ${DPR(14)}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "middle";
      for (const p of ps) {
        // repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const R = DPR(180);
        if (d2 < R * R && d2 > 0.1) {
          const d = Math.sqrt(d2);
          const f = (R - d) / R * 0.25;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        // drift
        p.vx += (Math.random() - 0.5) * 0.002;
        p.vy += (Math.random() - 0.5) * 0.002;
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
        // wrap
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;
        // draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha * p.depth;
        ctx.fillStyle = isDark ? "rgba(230,235,245,0.6)" : "rgba(30,30,40,0.7)";
        ctx.fillText(p.glyph, -p.size / 2, 0);
        ctx.restore();
      }
      // connections
      ctx.lineWidth = DPR(0.6);
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i], b = ps[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const R = DPR(140);
          if (d2 < R * R) {
            const alpha = (1 - Math.sqrt(d2) / R) * 0.18;
            ctx.strokeStyle = isDark ? `rgba(180,200,255,${alpha})` : `rgba(10,132,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      mouse.px = mouse.x; mouse.py = mouse.y;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-20 pointer-events-none opacity-60"
    />
  );
}
