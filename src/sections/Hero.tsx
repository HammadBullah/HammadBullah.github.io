import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { MagneticButton } from "../components/MagneticButton";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center px-6 sm:px-10 pt-32 pb-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="chip">
            <Sparkles size={12} className="text-accent" />
            <span>Available for Q4 2026 collaborations</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold tracking-tight text-[clamp(2.6rem,8vw,6.5rem)] leading-[1.02]"
        >
          Designing intelligent
          <br />
          systems that feel
          <br />
          <span className="bg-gradient-to-r from-accent via-accent-soft to-[#bf5af2] bg-clip-text text-transparent">
            effortlessly human.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center gap-3 text-lg md:text-xl text-soft font-mono min-h-[2.5rem]"
        >
          <span className="text-accent">›</span>
          <Typewriter
            options={{
              strings: [
                "AI Systems Architect",
                "Full-Stack Engineer",
                "MSc Computer Science @ Hertfordshire",
                "Building calm, precise products",
              ],
              autoStart: true,
              loop: true,
              delay: 55,
              deleteSpeed: 30,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="btn-primary !px-6 !py-3 text-[15px]"
          >
            View selected work
            <ArrowDownRight size={16} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="btn-secondary !px-6 !py-3 text-[15px]"
          >
            Get in touch
            <ArrowUpRight size={16} />
          </MagneticButton>
        </motion.div>

        {/* Meta line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl text-sm"
        >
          {[
            { k: "Focus",      v: "AI · Computer Vision · Web" },
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
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs eyebrow flex flex-col items-center gap-2 text-soft hover:text-[var(--fg)] transition-colors"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block w-[1px] h-8 bg-[var(--fg)]/30"
        />
      </motion.a>
    </section>
  );
}
