import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Typewriter from "typewriter-effect";
import { MagneticButton } from "../components/MagneticButton";
import { SplitText } from "../components/SplitText";
import { useReducedMotion } from "../hooks/useHooks";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-24"
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="aurora" style={{ width: 520, height: 520, left: "-12%", top: "-10%", background: "var(--blob-1)", transform: "translate3d(0,0,0)" }} />
        <div className="aurora" style={{ width: 520, height: 520, right: "-10%", top: "10%", background: "var(--blob-2)", animation: "marquee 60s linear infinite reverse" }} />
        <div className="aurora" style={{ width: 380, height: 380, left: "40%", bottom: "-20%", background: "var(--blob-3)" }} />
        <div className="absolute inset-0 bg-grid opacity-[.35]" />
        <div className="noise-layer" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.1 }}
          className="flex items-center gap-2 mb-10"
        >
          <span className="chip">
            <Sparkles size={12} className="text-[var(--accent)]" />
            <span>Available for Q4 2026 collaborations</span>
          </span>
          <span className="hidden sm:inline chip">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
            UK · Remote-friendly
          </span>
        </motion.div>

        <SplitText
          as="h1"
          className="font-display font-semibold tracking-tight text-[clamp(2.6rem,8vw,6.5rem)] leading-[1.02]"
          text="Designing intelligent systems that feel effortlessly human."
          delay={0.1}
          stagger={0.018}
        />

        <div className="mt-6 max-w-3xl text-lg md:text-xl text-soft leading-snug">
          <span className="text-[var(--accent)] mr-2 font-mono">›</span>
          <span className="font-mono inline-block align-middle min-h-[1.5em]">
            <Typewriter
              options={{
                strings: [
                  "AI Systems Architect.",
                  "Full-Stack Engineer.",
                  "MSc Computer Science @ Hertfordshire.",
                  "Building calm, precise products.",
                ],
                autoStart: true, loop: true, delay: 50, deleteSpeed: 25,
              }}
            />
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            as="a"
            href="#projects"
            scrollTo="#projects"
            className="btn-primary !px-6 !py-3 text-[14px] arrow-slide"
          >
            View selected work
            <ArrowDownRight size={15} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            scrollTo="#contact"
            className="btn-secondary !px-6 !py-3 text-[14px] arrow-slide"
          >
            Get in touch
            <ArrowUpRight size={15} />
          </MagneticButton>
        </motion.div>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl text-[13px]"
        >
          {[
            { k: "Focus",      v: "AI · Vision · Web" },
            { k: "Based",      v: "Hatfield, UK" },
            { k: "Experience", v: "4+ years shipping" },
            { k: "Status",     v: "MSc Adv. Comp. Sci." },
          ].map((m) => (
            <div key={m.k} className="border-t hairline pt-3">
              <p className="eyebrow mb-1">{m.k}</p>
              <p className="font-medium">{m.v}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] eyebrow flex flex-col items-center gap-2 text-mute hover:text-[var(--fg)] transition-colors"
      >
        <span>SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-[1px] h-8 bg-[var(--fg)]/30"
        />
      </motion.a>
    </section>
  );
}
