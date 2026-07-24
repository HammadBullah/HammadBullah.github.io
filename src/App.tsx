import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { NeuralBackground } from "./components/NeuralBackground";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { cn } from "./lib/utils";

/* ─── LOADING SCREEN ─── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center p-12"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-4 font-mono text-[10px] tracking-widest text-blue-500">
          <span>SYSTEM_BOOT</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-[1px] w-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-8 text-center">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="font-mono text-[9px] tracking-[0.5em] text-white/20 uppercase"
          >
            Decrypting Architectural Paradigms
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  useSmoothScroll();
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <NeuralBackground />
            
            {/* HUD OVERLAYS */}
            <nav className="fixed top-0 w-full z-[100] p-8 md:p-12 flex justify-between items-start mix-blend-difference pointer-events-none font-mono text-[9px] tracking-[0.4em] uppercase">
               <div className="flex flex-col gap-2 pointer-events-auto cursor-crosshair">
                  <span className="text-white font-black text-xl tracking-tighter">HS.</span>
                  <span className="text-white/30 italic">v8.1.0_PROD</span>
               </div>
               <div className="flex flex-col items-end gap-2 text-right pointer-events-auto">
                  <span className="text-blue-500">Node_Status: ACTIVE</span>
                  <div className="w-12 h-0.5 bg-white/20" />
               </div>
            </nav>

            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
            
            {/* PROGRESS WIRE */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-[100]"
              style={{ scaleX: scrollYProgress }}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
