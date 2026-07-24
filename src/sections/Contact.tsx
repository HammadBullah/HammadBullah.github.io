import React from "react";
import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <section className="relative min-h-screen py-48 px-6 md:px-24 bg-black flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none flex items-center justify-center font-black text-[30vw] tracking-tighter leading-none italic">
        CONNECT
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl"
      >
        <span className="font-mono text-xs text-[#ff7e33] tracking-[0.5em] mb-12 block uppercase italic">Contact_Protocol // HS-01</span>
        
        <h2 className="text-7xl md:text-[12vw] font-black text-white tracking-tighter mb-16 leading-none uppercase">
          Initiate<br/>Dialogue.
        </h2>

        <div className="flex flex-col gap-12 items-center">
           <a 
             href="mailto:hammabdullah@gmail.com" 
             className="text-2xl md:text-5xl font-light text-zinc-400 hover:text-white transition-all duration-700 underline underline-offset-[24px] decoration-white/10 hover:decoration-[#ff7e33]/50 italic"
           >
             hammabdullah@gmail.com
           </a>

           <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-24">
              <SocialLink href="https://linkedin.com/in/hammad-safi" label="LinkedIn_Portal" />
              <SocialLink href="https://github.com/HammadBullah" label="GitHub_Archive" />
              <SocialLink href="tel:+447352664787" label="Voice_Secure" />
           </div>
        </div>
      </motion.div>

      {/* FOOTER METADATA */}
      <div className="absolute bottom-12 w-full px-12 flex justify-between items-end font-mono text-[9px] tracking-[0.5em] text-white/20 uppercase">
         <div className="flex flex-col gap-1">
            <span>Core_Kernel: v8.1.0_LATEST</span>
            <span>Uptime: Persistent</span>
         </div>
         <div className="text-right">
            <span>© 2026 Hammad Safi</span>
            <br/>
            <span className="text-[#ff7e33]/50 italic">Designed_for_Impact</span>
         </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, label }: { href: string; label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="font-mono text-[10px] tracking-[0.4em] text-zinc-500 hover:text-[#ff7e33] transition-colors uppercase italic"
  >
    {label}
  </a>
);
