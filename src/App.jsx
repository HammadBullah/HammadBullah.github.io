import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

/* ─── HARDWARE & DATA ─── */
const IDENTITY = {
  name: "HAMMAD SAFI",
  role: "SYSTEM_ENGINEER // AI_SPECIALIST",
  location: "HATFIELD, UK",
  status: "ACTIVE_NODE_01",
  bio: "Engineering high-integrity AI solutions and scalable mobile ecosystems. Specializing in YOLOv9, Computer Vision, and production-grade Flutter applications."
};

const EXPERIENCES = [
  { id: "01", year: "2026", role: "CUSTOMER SERVICE", company: "LADBROKES ENTAIN", desc: "Complex transaction management and high-pressure retail operations." },
  { id: "02", year: "2023", role: "FLUTTER & AI DEV", company: "FREELANCE", desc: "Developed AI-integrated mobile solutions with 89% computer vision accuracy." },
  { id: "03", year: "2022", role: "WEB & TECH LEAD", company: "AMITY UNIVERSITY", desc: "Managed 500+ student nodes and core digital event infrastructure." },
];

const PROJECTS = [
  { id: "P01", title: "DROWNING_DETECTION", tech: "YOLOv9 / TF", detail: "Real-time pool surveillance engine." },
  { id: "P02", title: "PLUCKNPAY", tech: "FLUTTER / FIREBASE", detail: "Bargaining-protocol marketplace." },
  { id: "P03", title: "WEATHER_LSTM", tech: "LSTM / PYTHON", detail: "Predictive meteorological analysis." },
];

const SKILLS = [
  "FLUTTER", "DART", "TENSORFLOW", "PYTHON", "YOLOV9", "NODE.JS", "AWS", "LINUX", "CV", "LSTM"
];

/* ─── UI COMPONENTS ─── */

function MatrixStream() {
  const chars = "010101010101ABCDEF/*-+$#@!&";
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.04] overflow-hidden flex justify-between px-4 z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div 
          key={i}
          initial={{ y: -1000 }}
          animate={{ y: [ -1000, 1000 ] }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          className="text-[10px] font-mono break-all w-1 leading-none"
        >
          {Array(100).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)])}
        </motion.div>
      ))}
    </div>
  );
}

function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const fullLogs = [
    "> INITIALIZING_SYSTEM...",
    "> LOADING_CORE_DRIVERS...",
    "> CONNECTING_TO_NODES...",
    "> HAMMAD_SAFI_IDENTITY_LOADED",
    "> STATUS: OPERATIONAL",
    "> READY."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, fullLogs[i]]);
      i++;
      if (i === fullLogs.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center font-mono p-8 text-[#ff7e33]">
      <div className="w-full max-w-sm">
        {logs.map((log, idx) => (
          <p key={idx} className="mb-2 text-xs md:text-sm tracking-widest">{log}</p>
        ))}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4 }}
          className="h-1 bg-[#ff7e33] mt-8"
        />
      </div>
    </div>
  );
}

/* ─── CORE SECTIONS ─── */

function Header() {
  return (
    <nav className="fixed top-0 w-full z-[100] p-6 md:p-12 flex justify-between items-start font-mono text-[9px] md:text-[10px] tracking-[0.4em] mix-blend-difference">
      <div className="flex flex-col gap-2">
        <span className="text-white font-black text-xl tracking-tighter">HS://NODE_01</span>
        <span className="text-white/40 uppercase">{IDENTITY.location}</span>
      </div>
      <div className="flex flex-col items-end gap-2 text-right">
        <span className="text-[#ff7e33]">SYSTEM_UPTIME: 100%</span>
        <div className="w-12 h-0.5 bg-white/20" />
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const textScale = useTransform(springScroll, [0, 0.4, 0.8, 1], [1, 1.2, 1.2, 0.8]);
  const textOpacity = useTransform(springScroll, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
  const yMove = useTransform(springScroll, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8 text-center">
        <motion.div style={{ scale: textScale, opacity: textOpacity, y: yMove }} className="z-10">
          <h1 className="text-5xl md:text-[12vw] font-black tracking-tighter text-white leading-none mb-12">
            {IDENTITY.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {SKILLS.slice(0, 5).map(s => (
              <span key={s} className="px-3 py-1 border border-white/10 font-mono text-[8px] md:text-[10px] text-zinc-500 tracking-widest">{s}</span>
            ))}
          </div>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-xl font-light leading-relaxed mb-12">
            {IDENTITY.bio}
          </p>
          <div className="inline-block px-8 py-3 border border-[#ff7e33] text-[#ff7e33] font-mono text-[10px] tracking-[0.4em] uppercase">
            Protocol_Initialize
          </div>
        </motion.div>
        
        {/* Background Drift Title */}
        <motion.h2 
          style={{ x: useTransform(springScroll, [0, 1], ["20%", "-20%"]) }}
          className="absolute text-[30vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none italic"
        >
          DEVELOPER_ARCHIVE
        </motion.h2>
      </div>
    </section>
  );
}

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative h-[400vh] bg-zinc-950 border-t border-white/5">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
        <div className="max-w-6xl w-full relative z-10">
          {EXPERIENCES.map((exp, i) => {
            const start = i * 0.3;
            const end = start + 0.3;
            const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [100, 0, 0, -100]);
            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
            const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.9, 1, 1, 0.9]);

            return (
              <motion.div 
                key={exp.id} 
                style={{ y, opacity, scale }}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12"
              >
                <div className="text-[12vw] font-black text-white/5 font-mono select-none">0{exp.id}</div>
                <div className="max-w-xl border-l-4 border-[#ff7e33] pl-8 md:pl-16 py-4">
                  <span className="font-mono text-[#ff7e33] text-xs tracking-widest mb-4 block uppercase italic">Data_Packet_Retrieved</span>
                  <h3 className="text-4xl md:text-7xl font-black text-white uppercase mb-4 leading-none tracking-tighter">{exp.role}</h3>
                  <p className="text-xl font-bold text-zinc-500 mb-8 tracking-widest uppercase italic">{exp.company} // {exp.year}</p>
                  <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed">{exp.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Progress Year Indicator */}
        <div className="absolute left-12 bottom-12 font-mono text-[10px] text-zinc-800 tracking-widest hidden md:block">
          TIMESTAMP_MOD: 2026.07.24<br/>
          MEMORY_SECTOR: ARCHIVE_V2
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-white text-black">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-[15vw] px-[10vw]">
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center">
            <h2 className="text-[15vw] font-black tracking-tighter leading-none mb-8">WORKS.</h2>
            <div className="h-px w-24 bg-black/20" />
            <p className="mt-8 font-mono text-[10px] tracking-widest uppercase opacity-40 italic">Industrial Design // Prototype to Prod</p>
          </div>
          {PROJECTS.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[80vw] md:w-[650px] border-l-[12px] border-black pl-12 flex flex-col justify-center group">
              <span className="font-mono text-xs mb-8 opacity-40 tracking-[0.4em] uppercase">SYSTEM_PRJ_{p.id}</span>
              <h3 className="text-6xl md:text-9xl font-black mb-10 leading-none tracking-tighter uppercase group-hover:italic transition-all duration-500">{p.title}</h3>
              <p className="text-zinc-500 text-xl md:text-3xl font-light leading-snug mb-12 max-w-lg">{p.detail}</p>
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] font-bold py-1 px-3 border border-black">{p.tech}</span>
                <div className="h-px flex-1 bg-black/10" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center p-8 overflow-hidden">
      <MatrixStream />
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="z-10"
      >
        <h2 className="text-7xl md:text-[15vw] font-black text-white tracking-tighter mb-16 uppercase leading-none italic">Let's Connect.</h2>
        <div className="flex flex-col gap-12 items-center">
          <a href="mailto:hammabdullah@gmail.com" className="text-2xl md:text-6xl font-light hover:text-[#ff7e33] transition-all duration-700 underline underline-offset-[20px] decoration-white/5 hover:decoration-[#ff7e33]/50">
            hammabdullah@gmail.com
          </a>
          <div className="flex flex-wrap justify-center gap-12 mt-12 font-mono text-[10px] tracking-[0.5em] text-white/40">
            <a href="https://linkedin.com/in/hammad-safi" className="hover:text-white uppercase">LinkedIn_Portal</a>
            <a href="https://github.com/HammadBullah" className="hover:text-white uppercase">Git_Archive</a>
            <span className="hidden md:inline text-white/10">//</span>
            <span className="hidden md:inline uppercase text-zinc-700 tracking-[1em]">SYSTEM_END</span>
          </div>
        </div>
      </motion.div>
      
      {/* Global Scroll Wire */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1.5 bg-[#ff7e33] origin-left z-[100] shadow-[0_0_20px_rgba(255,126,51,0.5)]"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
    </section>
  );
}

/* ─── MAIN APP ─── */

export default function App() {
  const [booting, setBooting] = useState(true);

  return (
    <div className="bg-black text-white selection:bg-[#ff7e33] selection:text-black min-h-screen">
      <AnimatePresence>
        {booting ? (
          <BootSequence key="boot" onComplete={() => setBooting(false)} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Header />
            <MatrixStream />
            <Hero />
            <Experience />
            <Projects />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
