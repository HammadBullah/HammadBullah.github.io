import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Mail as MailIcon, ChevronDown as ChevronDownIcon } from "lucide-react";
import { cn } from "../lib/utils";

export const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="text-blue-500 font-mono tracking-[0.3em] text-sm uppercase">Initializing Identity...</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none mb-6 selection:bg-blue-500 selection:text-white"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Hammad Safi</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl md:text-4xl font-light text-zinc-400 mb-12 h-12"
        >
          <Typewriter
            options={{
              strings: [
                "Software Developer",
                "Full Stack Engineer",
                "AI Developer",
                "Machine Learning Enthusiast",
                "UI/UX Lover",
              ],
              autoStart: true,
              loop: true,
              wrapperClassName: "font-mono tracking-tight",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full transition-all hover:bg-white/5 hover:border-white/40 active:scale-95">
            Download Resume
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex justify-center gap-12"
        >
          <SocialIcon href="https://github.com/HammadBullah" icon={<span className="font-mono text-xs tracking-widest border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all">GITHUB</span>} />
          <SocialIcon href="https://linkedin.com/in/hammad-safi" icon={<span className="font-mono text-xs tracking-widest border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all">LINKEDIN</span>} />
          <SocialIcon href="mailto:hammabdullah@gmail.com" icon={<MailIcon size={24} />} />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
      >
        <ChevronDownIcon size={32} />
      </motion.div>
    </section>
  );
};




const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-zinc-500 hover:text-white transition-colors hover:scale-110"
  >
    {icon}
  </a>
);
