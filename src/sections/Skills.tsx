import React from "react";
import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "AI // CORE",
    skills: ["TENSORFLOW", "YOLOV9", "LSTM", "CNN", "OPENCV", "PREDICTIVE_AI"]
  },
  {
    title: "SYSTEMS // MOBILE",
    skills: ["FLUTTER", "DART", "FIREBASE", "PROVIDER", "CLEAN_ARCH", "MVVM"]
  },
  {
    title: "ENGINEERING // OPS",
    skills: ["PYTHON", "NODE.JS", "AWS", "DOCKER", "LINUX", "CI/CD"]
  }
];

export const Skills = () => {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-24 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-32">
          <span className="font-mono text-xs text-white/20 tracking-[1em]">03</span>
          <h2 className="text-xl md:text-3xl font-light tracking-[0.5em] text-white uppercase italic">SYSTEM_CAPABILITIES</h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-12 border border-white/5 glass-card relative group"
            >
              <h3 className="font-mono text-xs text-[#ff7e33] tracking-[0.5em] mb-12 uppercase italic">{cat.title}</h3>
              
              <div className="flex flex-col gap-6">
                {cat.skills.map((skill, j) => (
                  <div key={j} className="flex items-center gap-6 group/skill">
                    <span className="font-mono text-[10px] text-white/20 group-hover/skill:text-[#ff7e33] transition-colors">{j + 1}</span>
                    <span className="text-2xl md:text-4xl font-black text-white/40 group-hover/skill:text-white transition-colors tracking-tighter uppercase italic leading-none">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div 
                className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-12 border-t-2 border-r-2 border-[#ff7e33]/30" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
