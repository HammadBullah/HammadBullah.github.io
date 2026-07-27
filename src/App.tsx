import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useReducedMotion } from "./hooks/useHooks";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { BootLoader } from "./components/BootLoader";
import { Terminal } from "./components/Terminal";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Contact } from "./sections/Contact";

// WebGL scene is lazy-loaded so initial paint is instant.
const Scene = lazy(() => import("./components/Scene").then(m => ({ default: m.Scene })));

export default function App() {
  useSmoothScroll();
  const reduced = useReducedMotion();
  const [loading,setLoading] = useState(true);
  const [terminal,setTerminal] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(()=>{
    // ⌘/Ctrl + ` opens terminal
    const onKey = (e:KeyboardEvent)=>{
      if ((e.metaKey||e.ctrlKey) && e.key==="`") { e.preventDefault(); setTerminal(t=>!t); }
    };
    window.addEventListener("keydown", onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[]);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      {/* global atmosphere */}
      <div className="cyber-grid"/>
      <div className="scanlines"/>
      <div className="vignette"/>

      {!reduced && <Cursor/>}
      <AnimatePresence>{loading && <BootLoader key="boot" onDone={()=>setLoading(false)}/>}</AnimatePresence>

      <Navbar onOpenTerminal={()=>setTerminal(true)}/>
      <Suspense fallback={null}><Scene/></Suspense>

      <motion.main
        initial={{opacity:0}} animate={{opacity:loading?0:1}}
        transition={{duration:.8, delay:.1, ease:[0.22,1,0.36,1]}}
        className="relative z-10"
      >
        <Hero onOpenTerminal={()=>setTerminal(true)}/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Contact/>
      </motion.main>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[160]"
        style={{scaleX: scrollYProgress, background:"linear-gradient(90deg, var(--cyan), var(--magenta))", boxShadow:"0 0 10px var(--cyan)"}}/>

      <Terminal open={terminal} onClose={()=>setTerminal(false)}/>
    </div>
  );
}
