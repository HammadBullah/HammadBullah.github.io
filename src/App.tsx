import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { NeuralBackground } from "./components/NeuralBackground";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";

function Loader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DUR = 900;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / DUR);
      // ease-out
      const eased = 1 - Math.pow(1 - k, 3);
      setP(Math.round(eased * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center px-6"
    >
      <div className="w-full max-w-xl">
        <div className="flex items-baseline justify-between mb-6">
          <p className="eyebrow">Loading portfolio</p>
          <p className="font-mono text-sm tabular-nums text-soft">{p}%</p>
        </div>
        <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-[var(--fg)]"
            initial={{ width: 0 }}
            animate={{ width: `${p}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <p className="mt-6 font-display text-3xl sm:text-4xl tracking-tight">
          Hammad <span className="text-soft">Safi</span>
        </p>
      </div>
    </motion.div>
  );
}

export default function App() {
  useSmoothScroll();
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  return (
    <div id="top" className="relative min-h-screen">
      <Cursor />
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />

      <Suspense fallback={null}>
        <NeuralBackground />
      </Suspense>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </motion.main>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-[var(--fg)] z-[150] opacity-60"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
