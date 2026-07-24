import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Mail, ChevronDown } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { HolographicSphere } from "../components/HolographicSphere";
import { MagneticButton } from "../components/MagneticButton";

export const HeroV9 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] flex flex-col items-center overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8">
        
        {/* 3D SCENE */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <HolographicSphere />
          </Canvas>
        </div>

        {/* MOUSE FOLLOWING GLOW */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]" />

        <motion.div 
          style={{ scale, opacity }}
          className="relative z-10 text-center max-w-6xl"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5 }}
            className="text-blue-500 font-mono text-[10px] md:text-xs uppercase mb-8 block"
          >
            Sovereign_Protocol // v9.0
          </motion.span>

          <h1 className="text-[12vw] md:text-[15vw] font-black tracking-tighter text-white leading-[0.8] mb-12 selection:bg-white selection:text-black">
            HAMMAD<br/>SAFI.
          </h1>

          <div className="text-xl md:text-3xl font-mono text-white/40 mb-16 flex items-center justify-center gap-4">
             <span className="text-[#ff7e33]">{">"}</span>
             <Typewriter
                options={{
                  strings: [
                    "Senior Software Engineer",
                    "AI Systems Architect",
                    "Full Stack Creative",
                    "Interaction Specialist"
                  ],
                  autoStart: true,
                  loop: true,
                }}
             />
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <MagneticButton className="px-12 py-5 bg-white text-black font-black text-xs tracking-[0.4em] rounded-full hover:scale-105 transition-transform uppercase">
               Initialize_Archive
            </MagneticButton>
            <MagneticButton className="px-12 py-5 border border-white/20 text-white font-black text-xs tracking-[0.4em] rounded-full hover:bg-white/5 transition-colors uppercase">
               Contact_Protocol
            </MagneticButton>
          </div>
        </motion.div>

        {/* SIDEBAR NAVIGATION HUD */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 font-mono text-[8px] tracking-[1em] opacity-20">
           {["INTRE", "ARCHV", "LABS", "COMM"].map(l => (
             <span key={l} className="rotate-90 hover:opacity-100 transition-opacity cursor-pointer">{l}</span>
           ))}
        </div>
      </div>
    </section>
  );
};
