import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useReducedMotion } from "./hooks/useHooks";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { BootLoader } from "./components/BootLoader";
import { DevBackground } from "./components/DevBackground";
import { Terminal } from "./components/Terminal";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Stats } from "./sections/Stats";
import { Contact } from "./sections/Contact";

// Lazy heavy background (the R3F one is replaced with canvas DevBackground, kept for potential future use)
// (We keep this lightweight, no Three needed.)

export default function App() {
  useSmoothScroll();
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [terminal, setTerminal] = useState(false);
  const { scrollYProgress } = useScroll();

  // Expose lenis globally for MagneticButton anchor scrolls
  useEffect(() => {
    const w = window as any;
    // Lenis is internal to hook; we patch anchor clicks via useSmoothScroll, so this is a fallback.
    w.__setTerminal = setTerminal;
  }, []);

  // Keyboard shortcut: ⌘/Ctrl+` toggles terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        setTerminal((t) => !t);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div id="top" className="relative min-h-screen">
      {!reduced && <Cursor />}
      <AnimatePresence>{loading && <BootLoader key="boot" onDone={() => setLoading(false)} />}</AnimatePresence>

      <Navbar onOpenTerminal={() => setTerminal(true)} />
      <DevBackground />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay: 0.1 }}
        className="relative z-10"
      >
        <Hero onOpenTerminal={() => setTerminal(true)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Stats />
        <Contact />
      </motion.main>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-[var(--fg)] z-[150] opacity-70"
        style={{ scaleX: scrollYProgress }}
      />

      <Terminal open={terminal} onClose={() => setTerminal(false)} />
    </div>
  );
}
