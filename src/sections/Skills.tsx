import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
  SiExpress, SiPython, SiFastapi, SiFlutter, SiDart, SiFirebase,
  SiMongodb, SiPostgresql, SiMysql, SiDocker, SiKubernetes,
  SiGit, SiGithub, SiLinux, SiTensorflow, SiPytorch, SiHuggingface,
  SiLangchain, SiTailwindcss, SiFramer, SiHtml5, SiCss, SiVite, SiOllama,
} from "react-icons/si";
import type { IconType as SiIconType } from "react-icons";
import { Cloud, Sparkles } from "lucide-react";
import { useReducedMotion } from "../hooks/useHooks";
import { SplitText } from "../components/SplitText";

// SVG inline icons for brands not in react-icons/si@5.7
const AmazonIcon = ({ size = 16, color }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color ?? "#FF9900"} aria-hidden>
    <path d="M15.93 16.04c-1.74 1.1-4.27 1.68-6.44 1.68-3.05 0-5.8-1.13-7.88-3-0.16-0.15-0.02-0.36 0.18-0.24 2.24 1.31 5.01 2.1 7.88 2.1 1.93 0 4.06-0.4 6.02-1.23 0.29-0.13 0.54 0.19 0.24 0.39ZM16.84 17.07c-0.22-0.28-1.47-0.13-2.03-0.07-0.17 0.02-0.2-0.13-0.04-0.24 0.99-0.69 2.62-0.49 2.81-0.26 0.19 0.24-0.05 1.87-0.98 2.65-0.14 0.12-0.28 0.06-0.22-0.1 0.21-0.53 0.69-1.69 0.46-1.98Z" />
    <path d="M15.54 14.22c-0.46-0.59-0.96-0.54-1.65-0.36v-0.45c0-0.45 0.01-0.84-0.18-1.22-0.26-0.55-0.78-0.79-1.3-0.79-0.89 0-1.6 0.51-1.97 1.32l-0.04 0.09c-0.16 0.35 0.02 0.47 0.31 0.31 0.18-0.1 0.25-0.16 0.39-0.35 0.23-0.31 0.55-0.47 0.92-0.47 0.31 0 0.6 0.12 0.7 0.41 0.08 0.22 0.07 0.52 0.07 0.9v0.2c-0.62 0.22-1.31 0.33-1.86 0.58-0.81 0.37-1.38 0.99-1.38 1.89 0 1.14 0.86 1.77 1.87 1.77 0.84 0 1.41-0.2 2.11-0.75 0.26 0.3 0.33 0.47 0.78 0.78 0.09 0.04 0.21 0.03 0.28-0.03 0.23-0.19 0.64-0.55 0.87-0.74 0.1-0.09 0.08-0.22 0-0.33-0.23-0.29-0.46-0.52-0.92-1.07ZM14 15.85c-0.17 0.32-0.45 0.53-0.77 0.67-0.43 0.18-0.82 0.12-1.08-0.15-0.36-0.37-0.28-1.08 0.29-1.39 0.34-0.18 0.9-0.31 1.33-0.34 0.04 0 0.23 0.01 0.23 0.01v1.2ZM6.69 13.1c0 0.22 0.02 0.4 0.07 0.53 0.03 0.09 0.01 0.16-0.11 0.23-0.18 0.1-0.24-0.08-0.33-0.2-0.24-0.32-0.45-0.42-0.76-0.32-0.43 0.1-0.69 0.45-0.68 0.97 0 0.53 0.35 0.9 0.88 0.9 0.36 0 0.6-0.08 0.9-0.3v0.4c0 0.17-0.01 0.39-0.17 0.49-0.33 0.18-0.78 0.13-0.92-0.23-0.04-0.11-0.11-0.14-0.19-0.11l-0.47 0.14c-0.1 0.03-0.14 0.12-0.1 0.24 0.28 0.71 1.08 0.86 1.72 0.69 0.71-0.19 1.1-0.62 1.1-1.43v-1.3c0-0.27 0.01-0.5-0.11-0.7-0.23-0.39-0.72-0.25-0.83 0Z" />
  </svg>
);
const OpenAiIcon = ({ size = 16, color }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.6" aria-hidden>
    <path d="M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"/>
    <path d="M15.5 9.5c1.8-1.5 4.2-.8 4.7 1.3.4 1.7-.7 3.5-2.5 4.1M8.5 9.5c-1.8-1.5-4.2-.8-4.7 1.3-.4 1.7.7 3.5 2.5 4.1M12 3.5c.9 1.2-.2 2.6-1.2 3.6M12 20.5c-.9-1.2.2-2.6 1.2-3.6M20.5 14c-1.4.6-2.6 0-3.4-1M3.5 10c1.4-.6 2.6 0 3.4 1"/>
  </svg>
);

interface Skill {
  name: string;
  icon: any;
  color?: string;
}

const SKILLS: Skill[] = [
  { name: "React",         icon: SiReact,        color: "#61DAFB" },
  { name: "Next.js",       icon: SiNextdotjs },
  { name: "TypeScript",    icon: SiTypescript,   color: "#3178C6" },
  { name: "JavaScript",    icon: SiJavascript,   color: "#F7DF1E" },
  { name: "Node.js",       icon: SiNodedotjs,    color: "#339933" },
  { name: "Express",       icon: SiExpress },
  { name: "Python",        icon: SiPython,       color: "#3776AB" },
  { name: "FastAPI",       icon: SiFastapi,      color: "#009688" },
  { name: "Flutter",       icon: SiFlutter,      color: "#02569B" },
  { name: "Dart",          icon: SiDart,         color: "#0175C2" },
  { name: "Firebase",      icon: SiFirebase,     color: "#FFCA28" },
  { name: "MongoDB",       icon: SiMongodb,      color: "#47A248" },
  { name: "PostgreSQL",    icon: SiPostgresql,   color: "#4169E1" },
  { name: "MySQL",         icon: SiMysql,        color: "#4479A1" },
  { name: "Docker",        icon: SiDocker,       color: "#2496ED" },
  { name: "Kubernetes",    icon: SiKubernetes,   color: "#326CE5" },
  { name: "AWS",           icon: AmazonIcon,     color: "#FF9900" },
  { name: "Git",           icon: SiGit,          color: "#F05032" },
  { name: "GitHub",        icon: SiGithub },
  { name: "Linux",         icon: SiLinux },
  { name: "TensorFlow",    icon: SiTensorflow,   color: "#FF6F00" },
  { name: "PyTorch",       icon: SiPytorch,      color: "#EE4C2C" },
  { name: "Hugging Face",  icon: SiHuggingface,  color: "#FFD21E" },
  { name: "Ollama",        icon: SiOllama },
  { name: "LangChain",     icon: SiLangchain },
  { name: "OpenAI",        icon: OpenAiIcon },
  { name: "Tailwind CSS",  icon: SiTailwindcss,  color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer,       color: "#0055FF" },
  { name: "HTML5",         icon: SiHtml5,        color: "#E34F26" },
  { name: "CSS3",          icon: SiCss,          color: "#1572B6" },
  { name: "Vite",          icon: SiVite,         color: "#646CFF" },
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; // size multiplier
  rot: number; rotV: number;
}

export function Skills() {
  const reduced = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  // Initialize particles
  useMemo(() => {
    particles.current = SKILLS.map(() => ({
      x: 0, y: 0, vx: 0, vy: 0,
      r: 0.7 + Math.random() * 0.6,
      rot: (Math.random() - 0.5) * 10,
      rotV: (Math.random() - 0.5) * 0.2,
    }));
  }, []);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const resize = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
      particles.current.forEach((p) => {
        if (p.x === 0 && p.y === 0) {
          p.x = Math.random() * rect.width;
          p.y = Math.random() * rect.height;
          p.vx = (Math.random() - 0.5) * 0.2;
          p.vy = (Math.random() - 0.5) * 0.2;
        }
      });
      setReady(true);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced || !size.w || !size.h) return;
    const dt = Math.min(40, delta) / 16;
    const rect = { w: size.w, h: size.h };
    const mx = mouse.current.x;
    const my = mouse.current.y;
    const REPEL = 140;
    particles.current.forEach((p, i) => {
      // drift
      p.vx += (Math.random() - 0.5) * 0.003 * dt;
      p.vy += (Math.random() - 0.5) * 0.003 * dt;
      // damping
      p.vx *= 0.99; p.vy *= 0.99;
      // cap speed
      const sp = Math.hypot(p.vx, p.vy);
      const max = 0.4;
      if (sp > max) { p.vx = (p.vx / sp) * max; p.vy = (p.vy / sp) * max; }

      // repel from cursor
      const dx = p.x - mx;
      const dy = p.y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < REPEL * REPEL && d2 > 0.1) {
        const d = Math.sqrt(d2);
        const f = (REPEL - d) / REPEL;
        p.vx += (dx / d) * f * 0.6 * dt;
        p.vy += (dy / d) * f * 0.6 * dt;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.rotV * dt;

      // bounds: wrap with soft padding (approx pill size 120x40)
      const padX = 120, padY = 50;
      if (p.x < -padX) p.x = rect.w + padX;
      if (p.x > rect.w + padX) p.x = -padX;
      if (p.y < -padY) p.y = rect.h + padY;
      if (p.y > rect.h + padY) p.y = -padY;

      // push to refs/styles
      const el = pillRefs.current[i];
      if (el) {
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg) scale(${p.r})`;
      }
    });
  });

  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="skills" className="relative py-28 md:py-40 section overflow-hidden">
      {/* Background wash */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="aurora" style={{ width: 520, height: 520, left: "-8%", top: "0%", background: "var(--blob-2)" }} />
        <div className="aurora" style={{ width: 520, height: 520, right: "-8%", bottom: "0%", background: "var(--blob-1)" }} />
        <div className="noise-layer" />
      </div>

      <div className="container-x relative z-10">
        <div className="max-w-3xl mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-4"
          >
            04 — Toolkit
          </motion.p>
          <SplitText
            as="h2"
            className="font-display text-4xl md:text-6xl tracking-tight"
            text="A floating field of tools I reach for."
          />
          <p className="mt-4 text-soft max-w-xl leading-relaxed">
            Hover a pill to see the name. They drift slowly, and politely move out of the cursor's way.
          </p>
        </div>
      </div>

      {/* Floating field */}
      <div
        ref={fieldRef}
        className="relative w-full mx-auto max-w-6xl h-[520px] md:h-[620px] rounded-3xl border hairline overflow-hidden bg-soft/40"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%)",
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        {ready &&
          SKILLS.map((s, i) => {
            const p = particles.current[i];
            return (
              <div
                key={s.name}
                ref={(el) => { pillRefs.current[i] = el; }}
                className="skill-pill"
                style={{
                  transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg) scale(${p.r})`,
                }}
              >
                <span className="icon">
                  <s.icon size={16} color={s.color} />
                </span>
                <span className="name">{s.name}</span>
              </div>
            );
          })}
      </div>
    </section>
  );
}
