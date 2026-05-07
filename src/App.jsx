import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Hero3D from "./Hero3d.jsx";

/* ─── CURSOR ─── */
function Cursor({ onMove }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 90, damping: 18 });
  const trailY = useSpring(cursorY, { stiffness: 90, damping: 18 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onMove && onMove(e.clientX, e.clientY);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [onMove]);

  return (
    <>
      <motion.div
        style={{ left: trailX, top: trailY }}
        className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: clicking ? 40 : 26,
            height: clicking ? 40 : 26,
            background: "radial-gradient(circle, rgba(57,255,136,0.08) 0%, transparent 70%)",
            border: "1px solid rgba(57,255,136,0.25)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ left: cursorX, top: cursorY }}
        className="pointer-events-none fixed z-[1000] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="rounded-full transition-all duration-75"
          style={{
            width: clicking ? 6 : 5,
            height: clicking ? 6 : 5,
            background: "#39ff88",
            boxShadow: "0 0 15px #39ff88",
          }}
        />
      </motion.div>
    </>
  );
}

/* ─── PARTICLE FIELD (Neon Green) ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, W, H;
    const PARTICLE_COUNT = 90;
    const MAX_DIST = 130;
    const particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.4 + 0.4,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }

      // Connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(57,255,136,${(1 - dist / MAX_DIST) * 0.14})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      for (const p of particles) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy) * 0.9;
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(57,255,136,${(1 - dist / 110) * 0.28})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(57,255,136,0.75)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };

    resize(); initParticles(); draw();

    window.addEventListener("resize", () => { resize(); initParticles(); });
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ─── DOT GRID ─── */
function DotGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(57,255,136,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

/* ─── GREEN REVEAL NAME ─── */
function RevealName({ text, cursorPos }) {
  const letterRefs = useRef([]);
  const [litIdx, setLitIdx] = useState(new Set());

  useEffect(() => {
    if (!cursorPos) return;
    const next = new Set();
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = cursorPos.x, cy = cursorPos.y;
      if (cx >= r.left - 8 && cx <= r.right + 8 && cy >= r.top - 8 && cy <= r.bottom + 8) {
        next.add(i);
      }
    });
    setLitIdx(next);
  }, [cursorPos]);

  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={el => letterRefs.current[i] = el}
          style={{
            display: "inline-block",
            transition: "color 0.15s ease, text-shadow 0.15s ease",
            color: litIdx.has(i) ? "#39ff88" : "#ffffff",
            textShadow: litIdx.has(i) ? "0 0 28px rgba(57,255,136,0.8)" : "none",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ─── LOADING SCREEN ─── */
function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const lines = ["COMPILING IDENTITY...", "LOADING PROJECT INDEX...", "PREPARING INTERFACE...", "ALMOST READY..."];

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 18, 100));
      setLineIdx(i => Math.min(i + 1, lines.length - 1));
    }, 550);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#050607" }}
    >
      <ParticleField />
      <DotGrid />

      <div className="relative z-20 text-center select-none" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
        <div className="relative mx-auto mb-8 w-20 h-20">
          <svg className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#39ff88" strokeWidth="1.8" strokeDasharray="60 180" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-2xl" style={{ color: "#39ff88" }}>HS</span>
          </div>
        </div>

        <motion.h1
          className="text-4xl font-black tracking-[0.2em] mb-1 neon-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          HAMMAD SAFI
        </motion.h1>

        <p className="text-[11px] tracking-[0.5em] mb-8" style={{ color: "#0f8f4f" }}>
          PORTFOLIO SYSTEM v2.0
        </p>

        <div className="text-left w-56 mx-auto mb-6 space-y-1">
          {lines.slice(0, lineIdx + 1).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] tracking-widest"
              style={{ color: i === lineIdx ? "#39ff88" : "#0f8f4f" }}
            >
              › {line}
              {i === lineIdx && <span className="animate-pulse">▌</span>}
            </motion.p>
          ))}
        </div>

        <div className="w-56 mx-auto">
          <div className="flex justify-between text-[9px] mb-1 tracking-widest" style={{ color: "#0f8f4f" }}>
            <span>LOADING</span><span>{Math.round(progress)}%</span>
          </div>
          <div className="h-[2px] rounded-full overflow-hidden bg-[#112211]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "#39ff88" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── AMBIENT GLOW ─── */
function AmbientGlow() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(57,255,136,0.08), transparent 50%)," +
            "radial-gradient(circle at 70% 60%, rgba(57,255,136,0.06), transparent 60%)",
          animation: "floatGlow 12s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes floatGlow {
          0% { transform: translateY(0px); }
          100% { transform: translateY(30px); }
        }
      `}</style>
    </div>
  );
}

/* ─── PARALLAX BACKGROUND ─── */
function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.15); // Adjust speed here
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="parallax-bg"
      style={{ 
        transform: `translateY(${scrollY}px)`,
      }}
    />
  );
}

/* ─── VERTICAL SCROLL INDICATOR ─── */
/* ─── VERTICAL SCROLL INDICATOR - HORIZONTAL LINES ─── */
function ScrollIndicator({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(s => s.id === entry.target.id);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const playClickSound = () => {
    try {
      const audio = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(900, audio.currentTime);
      gain.gain.setValueAtTime(0.25, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.12);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.12);
    } catch (e) {}
  };

  const scrollToSection = (id) => {
    playClickSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-5">
      {sections.map((section, i) => {
        const isActive = activeIndex === i;
        const length = isActive ? 48 : (i % 3 === 0 ? 32 : i % 2 === 0 ? 24 : 18); // Varied lengths

        return (
          <div
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-4 cursor-pointer"
          >
            {/* Horizontal Line */}
            <motion.div
              className={`h-[2px] bg-[#39ff88] transition-all duration-300 rounded-full origin-right
                ${isActive ? 'shadow-[0_0_12px_#39ff88]' : 'bg-[#0f8f4f] group-hover:bg-[#39ff88]'}`}
              animate={{ 
                width: length,
                opacity: isActive ? 1 : 0.6 
              }}
            />

            {/* Hover Label */}
            <div className="absolute right-16 text-xs font-medium text-white bg-black/80 px-4 py-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all pointer-events-none">
              {section.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── INTERACTIVE SKILLS ─── */
function InteractiveSkills({ cursorPos }) {
  const skills = [
    "Flutter", "Dart", "Kotlin", "Android SDK", "MVVM", "Firebase", 
    "TensorFlow Lite", "OpenCV", "YOLOv9", "REST APIs", "Google Maps API",
    "Flask", "PHP", "MySQL", "GitLab CI/CD", "Docker", "Clean Architecture",
    "Provider", "Agile (SCRUM)", "UI/UX Design", "State Management"
  ];

  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Calculate proximity effect
  useEffect(() => {
    if (!cursorPos || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(cursorPos.x - centerX, 2) + Math.pow(cursorPos.y - centerY, 2)
    );

    // Optional: global section hover effect
    if (distance < 600) {
      // You can add section-wide effect here if needed
    }
  }, [cursorPos]);

  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill, i) => {
        const isLarge = i % 5 === 0;
        const isWide = i % 3 === 0 && !isLarge;

        return (
          <motion.div
            key={skill}
            className={`card p-6 md:p-8 rounded-3xl flex items-center justify-center text-center relative overflow-hidden group
              ${isLarge ? 'lg:col-span-2 lg:row-span-2 min-h-[220px]' : ''}
              ${isWide ? 'lg:col-span-2' : ''}
            `}
            whileHover={{ scale: 1.04 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
              
              if (dist < 180) setHoveredIndex(i);
              else if (hoveredIndex === i) setHoveredIndex(null);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              scale: hoveredIndex === i ? 1.08 : 1,
              boxShadow: hoveredIndex === i 
                ? "0 0 50px rgba(57,255,136,0.5)" 
                : "0 0 0px rgba(57,255,136,0)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#39ff88]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className={`text-2xl font-bold transition-all duration-300 ${hoveredIndex === i ? 'text-white' : 'text-[#39ff88]'}`}>
                {skill}
              </div>
              <div className="mt-3 h-0.5 w-16 mx-auto bg-[#39ff88]/30 rounded-full transition-all group-hover:w-24" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── MAIN SITE ─── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

function MainSite({ cursorPos }) {
  const projects = [
  {
    title: "VisionIDE",
    desc: "Advanced AI CAM IDE with modern features and syntax highlighting.",
    tech: "Any Language • AI-Powered",
    repo: "visionide"
  },
  {
    title: "Hand Gesture Control",
    desc: "Real-time hand gesture recognition system using computer vision.",
    tech: "Python • OpenCV",
    repo: "Hand-Gesture-Control"
  },
  {
    title: "PluckNPay",
    desc: "Dart/Flutter based application for food and beverage ordering.",
    tech: "Dart • Flutter",
    repo: "plucknpay"
  },
  {
    title: "Voice SOS Emergency System",
    desc: "Voice-activated emergency alert system with GPS tracking.",
    tech: "Python",
    repo: "Voice_SOS"
  },
  {
    title: "Med Diagnose",
    desc: "Medical diagnosis assistance application built with Flutter.",
    tech: "Dart • Flutter",
    repo: "Med_Dignose"
  },
  {
    title: "Resume Builder",
    desc: "Dynamic resume builder application with multiple templates.",
    tech: "Dart • Flutter",
    repo: "Resume_Builder"
  },
  {
    title: "Med Data Analyzer",
    desc: "Medical data analysis and visualization tool.",
    tech: "Dart",
    repo: "Med_Data_Analyzer"
  },
  {
    title: "Maze Game",
    desc: "Interactive maze game developed in C++.",
    tech: "C++",
    repo: "Maze_game"
  },
  {
    title: "Global Warming Visualizer",
    desc: "Data visualization project highlighting climate change impact.",
    tech: "Data Visualization",
    repo: "global-warming"
  }
];


const sectionList = [
  { id: "hero", label: "HOME" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" }
];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully! (Demo)");
    }, 1800);
  };


const skills = [
    "Flutter", "Dart", "Kotlin", "Android SDK", "MVVM", "Provider", "Firebase",
    "TensorFlow Lite", "OpenCV", "YOLOv8", "YOLOv9", "REST APIs", "Google Maps API",
    "Flask", "PHP", "MySQL", "Git", "GitLab CI/CD", "Docker", "Clean Architecture",
    "Agile (SCRUM)", "UI/UX Design", "State Management"
  ];


  const experiences = [
    {
      role: "Mobile Application Developer (Flutter / Android Concepts)",
      company: "Amity University Haryana",
      location: "India",
      period: "Apr 2023 — Feb 2025",
      points: [
        "Developed and maintained Flutter applications used across university departments",
        "Integrated Firebase (Auth, Firestore, Cloud Functions) for real-time systems",
        "Built REST API integrations with PHP/MySQL/Flask backend",
        "Improved application performance by up to 45% through UI & API optimization",
        "Worked with GitLab CI/CD pipelines for automated builds and deployment"
      ]
    }
  ];

  const achievements = [
    "Secured $100,000 Government-Funded AI Project (Top 12 nationally selected)",
    "Top 8 Finalist – National AI Hackathon (2023)",
    "President – Computer Science Society (Led 100+ members, organised technical events and hackathons)"
  ];


  return (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen relative snap-y snap-mandatory overflow-y-scroll h-screen"
      style={{ background: "#050607", color: "#39ff88", fontFamily: "'Share Tech Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');
        
        * { cursor: none !important; }
        button, a, input, textarea { 
          cursor: none !important; 
          pointer-events: auto !important; 
        }

        .card, .timeline-card {
          background: rgba(10, 15, 12, 0.75);
          border: 1px solid rgba(57,255,136,0.25);
          backdrop-filter: blur(12px);
          transition: all 0.4s ease;
        }
        .card:hover {
          border-color: #39ff88;
          box-shadow: 0 0 30px rgba(57,255,136,0.25);
          transform: translateY(-6px) translateX(-2px);
        }
        .neon-text { color: #39ff88; text-shadow: 0 0 12px rgba(57,255,136,0.7); }
        .nav-link { color: #0f8f4f; transition: color 0.3s; }
        .nav-link:hover { color: #39ff88; }
        .section { scroll-snap-align: start; scroll-snap-stop: always; }
      `}</style>

      {/* Parallax Background */}
    <ParallaxBackground />

      <ParticleField />

     {/* NAV - Mobile Optimized */}
      <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center border-b border-[#112211] bg-black/90 backdrop-blur-xl">
        <span className="text-xs tracking-[0.3em] font-bold neon-text">HS://PORTFOLIO</span>

        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer flex items-center px-1"
          >
            <motion.div
              animate={{ x: isDark ? 0 : 24 }}
              className="w-4 h-4 bg-[#39ff88] rounded-full shadow"
            />
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 text-xs tracking-widest">
          {sectionList.slice(1).map(s => (
            <a key={s.id} href={`#${s.id}`} className="nav-link hover:text-white transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-8 text-xl">
          {sectionList.slice(1).map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-[#39ff88] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="section relative z-10 h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <AmbientGlow />
        <ScrollIndicator sections={sectionList} />
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="text-[11px] tracking-[0.5em] mb-6" style={{ color: "#0f8f4f" }}>
            FLUTTER DEVELOPER · AI ENGINEER · SYSTEM BUILDER
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-black tracking-[0.08em] leading-none mb-1"
          >
            <RevealName text="HAMMAD" cursorPos={cursorPos} />
          </motion.h1>

          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-black tracking-[0.08em] leading-none mb-12"
          >
            <RevealName text="SAFI" cursorPos={cursorPos} />
          </motion.h1>

          <motion.div variants={fadeUp} className="flex justify-center gap-5">
            <a href="#projects" className="px-8 py-3.5 text-xs tracking-widest border border-[#39ff88] hover:bg-[#39ff88] hover:text-black transition-all font-medium pointer-events-auto">
              VIEW PROJECTS
            </a>
            <a href="#contact" className="px-8 py-3.5 text-xs tracking-widest border border-[#0f8f4f] hover:bg-[#0f8f4f] hover:text-white transition-all font-medium pointer-events-auto">
              CONTACT
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      
      <section id="projects" className="section relative z-20 py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <ScrollIndicator sections={sectionList} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>01 //</span>
            <h2 className="text-3xl font-black tracking-widest neon-text">PROJECTS</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="card p-8 rounded-xl group">
                <div className="text-[10px] tracking-widest mb-4 inline-block px-3 py-1 border border-[#0f8f4f] text-[#0f8f4f]">
                  {p.tag}
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#a0e0b0" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── NEW: EXPERIENCE TIMELINE ─── */}
      <section id="experience" className="section relative z-20 h-screen flex items-center py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <ScrollIndicator sections={sectionList} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>02 //</span>
            <h2 className="text-3xl font-black tracking-widest neon-text">EXPERIENCE</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, i) => (
              <motion.div key={i} variants={fadeUp} className="card p-8 rounded-xl group mb-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-sm font-medium text-white">{exp.period}</div>
                    <div className="text-xs mt-1" style={{ color: "#0f8f4f" }}>{exp.location}</div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-[#39ff88] mb-5">{exp.company}</p>
                    
                    <ul className="space-y-3 text-sm" style={{ color: "#a0e0b0" }}>
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-[#39ff88] mt-1">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="section relative z-20 py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto w-full">
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>03 //</span>
            <h2 className="text-3xl font-black tracking-widest neon-text">ACHIEVEMENTS</h2>
          </motion.div>

          <div className="space-y-6">
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card p-8 rounded-2xl flex gap-6 items-start group"
              >
                <div className="text-4xl text-[#39ff88]/70 group-hover:text-[#39ff88] transition-colors">🏆</div>
                <p className="text-lg leading-relaxed text-white/90">{ach}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section relative z-20 py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <ScrollIndicator sections={sectionList} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>04 //</span>
            <h2 className="text-3xl font-black tracking-widest neon-text">SKILLS</h2>
          </motion.div>

    <div className="max-w-6xl mx-auto">
      <InteractiveSkills cursorPos={cursorPos} />
    </div>
  </motion.div>
</section>

      {/* CONTACT */}
      <section id="contact" className="section relative z-20 h-screen flex items-center justify-center text-center py-28 px-6 md:px-24 text-center">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <ScrollIndicator sections={sectionList} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>05 //</span>
            <h2 className="text-3xl font-black tracking-widest neon-text mt-2">GET IN TOUCH</h2>
          </motion.div>

          <div className="card p-8 rounded-xl max-w-lg mx-auto bg-black/80 border border-[#0f8f4f]">
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-2xl font-bold text-white">Message Received</h3>
                <p className="text-[#39ff88] mt-3">Thank you! I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Your Name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border border-[#0f8f4f] p-4 rounded-xl focus:border-[#39ff88] outline-none text-white" required />

                <input type="email" placeholder="Email Address" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border border-[#0f8f4f] p-4 rounded-xl focus:border-[#39ff88] outline-none text-white" required />

                <textarea placeholder="Your Message" rows={6} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-[#0f8f4f] p-4 rounded-xl focus:border-[#39ff88] outline-none text-white resize-y" required />

                <button type="submit" className="w-full py-4 bg-[#39ff88] text-black font-bold tracking-widest hover:bg-white transition-all">
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>

          <div className="text-center mt-12 text-xs tracking-widest" style={{ color: "#0f8f4f" }}>
            hammadbullah@gmail.com
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

/* ─── ROOT ─── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState(null);

  const handleCursorMove = useCallback((x, y) => {
    setCursorPos({ x, y });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor onMove={handleCursorMove} />
      <AnimatePresence mode="wait">
        {loading ? <LoadingScreen key="loader" /> : <MainSite key="main" cursorPos={cursorPos} />}
      </AnimatePresence>
    </>
  );
}