import React from "react";
import { motion } from "framer-motion";

export const About = () => {
  const stats = [
    { label: "Years Coding", value: "4+" },
    { label: "Projects", value: "15+" },
    { label: "MSc AI Focus", value: "89%" },
    { label: "Nodes Managed", value: "500+" }
  ];

  return (
    <section className="relative min-h-screen py-32 px-6 md:px-24 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* LEFT: VISUAL PLACEHOLDER */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square md:aspect-auto md:h-[600px] border border-white/10 glass-card overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 mix-blend-overlay" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] tracking-[0.5em] text-white/5 uppercase select-none leading-none break-all p-12">
            {Array(50).fill("HAMMAD_SAFI_IDENTITY_SYSTEM_").join("")}
          </div>
          <div className="absolute bottom-12 left-12 right-12">
             <div className="h-px w-full bg-white/20 mb-4" />
             <p className="font-mono text-[10px] tracking-widest text-[#ff7e33]">REF_BIO: PROTOCOL_01</p>
          </div>
        </motion.div>

        {/* RIGHT: CONTENT */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="font-mono text-[#ff7e33] text-xs tracking-[0.5em] uppercase mb-4 block italic">Section_01 // BIO</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none">
              The Neural<br/>Architect.
            </h2>
            <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed mb-8">
              MSc Advanced Computer Science candidate at the University of Hertfordshire. I bridge the gap between complex <span className="text-white">AI Algorithms</span> and high-performance <span className="text-white">Mobile Ecosystems</span>.
            </p>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-light">
              Specializing in Computer Vision (YOLOv9), Deep Learning (LSTM), and Cross-platform development with Flutter. I build systems that are not just smart, but human-centric and production-ready.
            </p>
          </motion.div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(255,126,51,0.3)" }}
                className="p-8 border border-white/5 glass-card group transition-colors"
              >
                <span className="text-3xl md:text-5xl font-black text-white block mb-2 tracking-tighter group-hover:text-[#ff7e33] transition-colors">{stat.value}</span>
                <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
