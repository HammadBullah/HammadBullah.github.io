import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EXPERIENCES = [
  { id: "01", year: "2026", role: "CUSTOMER SERVICE", company: "LADBROKES ENTAIN", desc: "Operations and compliance management in high-pressure retail." },
  { id: "02", year: "2023", role: "FLUTTER & AI DEV", company: "FREELANCE", desc: "Developing AI-powered apps achieving 89% accuracy in deep learning tasks." },
  { id: "03", year: "2022", role: "WEB & DESIGN LEAD", company: "AMITY UNIVERSITY", desc: "Managed 500+ student nodes and core digital event infrastructure." },
];

export const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={ref} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-8">
        
        {/* BACKGROUND YEAR WATERMARK */}
        <motion.h2 
          style={{ x: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) }}
          className="absolute text-[30vw] font-black text-white/[0.02] select-none italic pointer-events-none whitespace-nowrap"
        >
          HISTORY_ARCHIVE
        </motion.h2>

        <div className="relative z-10 w-full max-w-6xl">
          {EXPERIENCES.map((exp, i) => {
            const start = i * 0.3;
            const end = start + 0.3;
            
            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
            const y = useTransform(scrollYProgress, [start, end], [150, -150]);
            const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.9, 1, 1, 0.9]);

            return (
              <motion.div 
                key={exp.id} 
                style={{ opacity, y, scale }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
              >
                <div className="max-w-3xl pointer-events-auto">
                   <div className="flex items-center justify-center gap-6 mb-8 font-mono text-[10px] text-[#ff7e33] tracking-[0.5em] uppercase italic">
                      <div className="h-px w-12 bg-white/20" />
                      <span>Year: {exp.year}</span>
                      <div className="h-px w-12 bg-white/20" />
                   </div>
                   <h3 className="text-5xl md:text-9xl font-black text-white uppercase leading-none tracking-tighter mb-8">
                     {exp.role}
                   </h3>
                   <p className="text-xl md:text-3xl font-bold text-zinc-500 mb-12 tracking-widest uppercase italic">
                     {exp.company}
                   </p>
                   <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                     {exp.desc}
                   </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
