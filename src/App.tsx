import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { NeuralBackground } from "./components/NeuralBackground";
import { HeroV9 } from "./sections/HeroV9";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";

/* ─── NEXT-GEN LOADING SCREEN ─── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 20;
        if (next >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
      className="fixed inset-0 z-[1000] bg-white text-black flex items-center justify-center p-12"
    >
      <div className="w-full max-w-2xl overflow-hidden">
        <motion.h1 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[10vw] font-black tracking-tighter leading-none mb-12 uppercase text-black"
        >
          Initializing<br/>Sovereign.
        </motion.h1>
        <div className="flex justify-between font-mono text-xs tracking-widest mb-4">
          <span>HS_NODE_STABLE</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-black/10">
          <motion.div 
            className="h-full bg-black" 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
          />
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
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
              <NeuralBackground />
            </Suspense>
            
            <Suspense fallback={<div className="h-screen bg-black" />}>
              <HeroV9 />
            </Suspense>
            
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
            
            <motion.div
              className="fixed bottom-0 left-0 right-0 h-1.5 bg-white origin-left z-[100]"
              style={{ scaleX: scrollYProgress }}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
