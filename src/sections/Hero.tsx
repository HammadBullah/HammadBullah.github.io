import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}
import Typewriter from "typewriter-effect";
import { MagneticButton } from "../components/MagneticButton";
import { SplitText } from "../components/SplitText";
import { useReducedMotion } from "../hooks/useHooks";

const MORPH_WORDS = [
  "real-world problems.",
  "AI-powered applications.",
  "scalable digital experiences.",
  "products people enjoy using.",
];

export function Hero({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-24">
      {/* soft background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="aurora" style={{ width: 620, height: 620, left: "-14%", top: "-14%", background: "var(--blob-1)" }} />
        <div className="aurora" style={{ width: 520, height: 520, right: "-10%", top: "6%", background: "var(--blob-2)" }} />
        <div className="aurora" style={{ width: 380, height: 380, left: "35%", bottom: "-18%", background: "var(--blob-3)" }} />
        <div className="absolute inset-0 grid-fade opacity-50" />
        <div className="noise" />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <span className="chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] inline-block" />
            Software Engineer · AI Developer
          </span>
          <button
            onClick={onOpenTerminal}
            className="chip hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--hair))] hover:text-[var(--fg)] transition-colors"
            title="Open terminal (⌃`)"
          >
            <span className="mono text-[10px] text-[var(--green)]">$</span>
            try terminal
          </button>
        </motion.div>

        <SplitText
          as="h1"
          className="font-display font-semibold tracking-tight text-[clamp(2.4rem,7.6vw,6.2rem)] leading-[1.02]"
          text="Building software that solves"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-1 text-[clamp(1.6rem,6vw,5rem)] font-display font-semibold tracking-tight leading-[1.05]"
        >
          <span className="morph-word">
            {MORPH_WORDS.map((w, i) => (
              <MorphWord key={w} word={w} index={i} total={MORPH_WORDS.length} />
            ))}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 text-[17px] md:text-lg text-soft max-w-2xl leading-relaxed"
        >
          MSc Advanced Computer Science candidate at the University of Hertfordshire, bridging
          <span className="text-[var(--fg)]"> AI</span>, <span className="text-[var(--fg)]">full-stack engineering</span>, and
          <span className="text-[var(--fg)]"> thoughtful interfaces</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <MagneticButton as="a" href="/resume.pdf" className="btn-primary !px-5 !py-2.5 text-[13px] arrow-slide" download>
            <Download size={15} /> Résumé
          </MagneticButton>
          <MagneticButton as="a" href="#projects" scrollTo="#projects" className="btn-secondary !px-5 !py-2.5 text-[13px] arrow-slide">
            View work <ArrowUpRight size={15} />
          </MagneticButton>
          <MagneticButton as="a" href="#contact" scrollTo="#contact" className="btn-secondary !px-5 !py-2.5 text-[13px] arrow-slide">
            <Mail size={15} /> Contact
          </MagneticButton>

          <div className="ml-1 sm:ml-3 flex items-center gap-1">
            <a data-cursor="link" href="https://github.com/HammadBullah" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full border hairline grid place-items-center text-soft hover:text-[var(--fg)] hover:border-[var(--hair-strong)] transition-colors"
               aria-label="GitHub">
              <GithubIcon size={16} />
            </a>
            <a data-cursor="link" href="https://linkedin.com/in/hammad-safi" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full border hairline grid place-items-center text-soft hover:text-[var(--fg)] hover:border-[var(--hair-strong)] transition-colors"
               aria-label="LinkedIn">
              <LinkedinIcon size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl text-[13px]"
        >
          {[
            { k: "Focus", v: "AI · Web · Mobile" },
            { k: "Based", v: "Hatfield, UK" },
            { k: "Stack", v: "Python · TS · Flutter" },
            { k: "Status", v: "Open to work" },
          ].map((m) => (
            <div key={m.k} className="border-t hairline pt-3">
              <p className="eyebrow mb-1">{m.k}</p>
              <p className="font-medium">{m.v}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] eyebrow flex flex-col items-center gap-2 text-mute hover:text-[var(--fg)] transition-colors"
      >
        <span>SCROLL</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-[1px] h-8 bg-[var(--fg)]/30" />
      </motion.a>
    </section>
  );
}

function MorphWord({ word, index, total }: { word: string; index: number; total: number }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const delay = 1800 + index * 100;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % total);
    }, delay * (index + 1));
    return () => clearTimeout(t);
  }, [active, index, total]);

  // Simpler: cycle all words every ~2.4s via setInterval
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % total), 2400);
    return () => clearInterval(id);
  }, [total]);

  const isActive = active === index;
  return (
    <motion.span
      initial={false}
      animate={{
        y: isActive ? 0 : "110%",
        opacity: isActive ? 1 : 0,
        filter: isActive ? "blur(0px)" : "blur(8px)",
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {word}
    </motion.span>
  );
}
