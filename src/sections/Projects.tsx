import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
  { id: "01", title: "DROWNING_DETECTION", tech: "YOLOv9 / TENSORFLOW", desc: "Real-time surveillance system achieving 89% accuracy in pool safety monitoring." },
  { id: "02", title: "PLUCKNPAY", tech: "FLUTTER / FIREBASE", desc: "Cross-platform bargaining marketplace featuring real-time buyer-vendor negotiation." },
  { id: "03", title: "WEATHER_LSTM", tech: "LSTM / PYTHON / RESEARCH", desc: "MSc Research project comparing predictive AI models for meteorological datasets." },
  { id: "04", title: "SMART_AGRICULTURE", tech: "IOT / DART / FIREBASE", desc: "Automated farm monitoring system with real-time threshold alert protocols." }
];

export const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={ref} className="relative h-[400vh] bg-white text-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-[15vw] px-[10vw] z-10 items-center">
          
          {/* INTRO BLOCK */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center">
            <span className="font-mono text-xs text-black/40 tracking-[0.5em] mb-4 uppercase">Archive_Sector // 02</span>
            <h2 className="text-[12vw] font-black leading-[0.8] tracking-tighter mb-8">BLUEPRINT<br/>OUTPUT.</h2>
            <div className="h-px w-24 bg-black/20" />
          </div>

          {/* PROJECT CARDS */}
          {PROJECTS.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[85vw] md:w-[750px] border-l-[12px] border-black pl-12 md:pl-20 flex flex-col justify-center group">
              <div className="flex items-center justify-between mb-12">
                <span className="font-mono text-xs font-bold tracking-[0.4em] text-black/20 uppercase">System_PRJ_{p.id}</span>
                <span className="font-mono text-[10px] px-3 py-1 border border-black/10 rounded-full">ACTIVE_STABLE</span>
              </div>
              
              <h3 className="text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter uppercase group-hover:italic transition-all duration-500">
                {p.title}
              </h3>
              
              <p className="text-zinc-500 text-xl md:text-3xl font-light leading-snug mb-16 max-w-2xl">
                {p.desc}
              </p>
              
              <div className="flex items-center gap-8">
                <span className="font-mono text-xs font-black tracking-widest bg-black text-white px-6 py-2 uppercase">
                  {p.tech}
                </span>
                <button className="font-mono text-[10px] tracking-[0.3em] uppercase hover:underline decoration-black/20 underline-offset-8 transition-all">
                  Open_Specification →
                </button>
              </div>
            </div>
          ))}

          {/* END BLOCK */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col items-center justify-center text-center opacity-10">
             <h2 className="text-6xl font-black italic tracking-tighter">EOF_ARCHIVE</h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
