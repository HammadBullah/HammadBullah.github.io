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
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); onMove?.(e.clientX, e.clientY); };
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
      <motion.div style={{ left: trailX, top: trailY }} className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-full transition-all duration-200" style={{ width: clicking ? 40 : 26, height: clicking ? 40 : 26, background: "radial-gradient(circle, rgba(57,255,136,0.08) 0%, transparent 70%)", border: "1px solid rgba(57,255,136,0.25)" }} />
      </motion.div>
      <motion.div style={{ left: cursorX, top: cursorY }} className="pointer-events-none fixed z-[1000] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-full transition-all duration-75" style={{ width: clicking ? 6 : 5, height: clicking ? 6 : 5, background: "#39ff88", boxShadow: "0 0 15px #39ff88" }} />
      </motion.div>
    </>
  );
}

/* ─── PARTICLE FIELD (2D canvas, used on loading screen) ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, W, H;
    const particles = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < 90; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.4 + 0.4 });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; }
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(57,255,136,${(1 - d / 130) * 0.13})`; ctx.lineWidth = 0.7; ctx.stroke(); }
      }
      for (const p of particles) {
        const dx = p.x - mouse.current.x, dy = p.y - mouse.current.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.current.x, mouse.current.y); ctx.strokeStyle = `rgba(57,255,136,${(1 - d / 120) * 0.25})`; ctx.lineWidth = 0.7; ctx.stroke(); }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(57,255,136,0.7)"; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    resize(); initParticles(); draw();
    window.addEventListener("resize", () => { resize(); initParticles(); });
    window.addEventListener("mousemove", onMouse);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ─── DOT GRID ─── */
function DotGrid() {
  return <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(57,255,136,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />;
}

/* ─── REVEAL NAME ─── */
function RevealName({ text, cursorPos }) {
  const letterRefs = useRef([]);
  const [litIdx, setLitIdx] = useState(new Set());
  useEffect(() => {
    if (!cursorPos) return;
    const next = new Set();
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (cursorPos.x >= r.left - 8 && cursorPos.x <= r.right + 8 && cursorPos.y >= r.top - 8 && cursorPos.y <= r.bottom + 8) next.add(i);
    });
    setLitIdx(next);
  }, [cursorPos]);
  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span key={i} ref={el => letterRefs.current[i] = el} style={{ display: "inline-block", transition: "color 0.15s ease, text-shadow 0.15s ease", color: litIdx.has(i) ? "#39ff88" : "#ffffff", textShadow: litIdx.has(i) ? "0 0 28px rgba(57,255,136,0.8)" : "none" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ─── SCROLL INDICATOR ─── */
function ScrollIndicator({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { const idx = sections.findIndex(s => s.id === entry.target.id); if (idx !== -1) setActiveIndex(idx); } });
    }, { threshold: 0.4 });
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [sections]);
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-5">
      {sections.map((s, i) => {
        const active = activeIndex === i;
        return (
          <div key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })} className="group flex items-center gap-3 cursor-pointer">
            <motion.div className="h-[2px] rounded-full origin-right" animate={{ width: active ? 44 : 18, opacity: active ? 1 : 0.5 }} style={{ background: active ? "#39ff88" : "#0f8f4f", boxShadow: active ? "0 0 10px #39ff88" : "none" }} />
            <span className="absolute right-14 text-[10px] tracking-widest text-white bg-black/80 px-3 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── PROJECT MODAL ─── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <motion.div className="relative z-10 max-w-2xl w-full rounded-2xl p-8"
        style={{ background: "#080d0a", border: "1px solid rgba(57,255,136,0.35)", boxShadow: "0 0 60px rgba(57,255,136,0.12)" }}
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#0f8f4f] hover:text-[#39ff88] text-xl transition-colors">✕</button>
        <div className="text-[9px] tracking-[0.35em] mb-4 px-3 py-1 inline-block" style={{ border: "1px solid rgba(57,255,136,0.3)", color: "#0f8f4f" }}>{project.tech}</div>
        <h3 className="text-2xl font-black text-white mb-3 leading-snug" style={{ fontFamily: "Josefin Sans, sans-serif" }}>{project.title}</h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#a0e0b0" }}>{project.longDesc || project.desc}</p>
        {project.highlights && (
          <ul className="space-y-2 mb-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: "#a0e0b0" }}>
                <span style={{ color: "#39ff88", flexShrink: 0 }}>▹</span>{h}
              </li>
            ))}
          </ul>
        )}
        {project.repo && (
          <a href={`https://github.com/HammadBullah/${project.repo}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest px-5 py-2.5 transition-all"
            style={{ border: "1px solid #39ff88", color: "#39ff88" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#39ff88"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#39ff88"; }}>
            VIEW ON GITHUB →
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── LOADING SCREEN ─── */
function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const lines = ["COMPILING IDENTITY...", "LOADING PROJECT INDEX...", "PREPARING INTERFACE...", "ALMOST READY..."];
  useEffect(() => {
    const iv = setInterval(() => { setProgress(p => Math.min(p + Math.random() * 18, 100)); setLineIdx(i => Math.min(i + 1, lines.length - 1)); }, 550);
    return () => clearInterval(iv);
  }, []);
  return (
    <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#050607" }}>
      <ParticleField />
      <DotGrid />
      <div className="relative z-20 text-center select-none" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
        <div className="relative mx-auto mb-8 w-20 h-20">
          <svg className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#39ff88" strokeWidth="1.8" strokeDasharray="60 180" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-2xl" style={{ color: "#39ff88" }}>HS</span>
          </div>
        </div>
        <motion.h1 className="text-4xl font-black tracking-[0.2em] mb-1" style={{ color: "#39ff88", textShadow: "0 0 20px rgba(57,255,136,0.5)" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>HAMMAD SAFI</motion.h1>
        <p className="text-[11px] tracking-[0.5em] mb-8" style={{ color: "#0f8f4f", fontFamily: "Share Tech Mono, monospace" }}>PORTFOLIO SYSTEM v3.0</p>
        <div className="text-left w-56 mx-auto mb-6 space-y-1">
          {lines.slice(0, lineIdx + 1).map((line, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] tracking-widest" style={{ fontFamily: "Share Tech Mono, monospace", color: i === lineIdx ? "#39ff88" : "#0f8f4f" }}>
              › {line}{i === lineIdx && <span className="animate-pulse">▌</span>}
            </motion.p>
          ))}
        </div>
        <div className="w-56 mx-auto">
          <div className="flex justify-between text-[9px] mb-1 tracking-widest" style={{ color: "#0f8f4f", fontFamily: "Share Tech Mono, monospace" }}><span>LOADING</span><span>{Math.round(progress)}%</span></div>
          <div className="h-[2px] rounded-full overflow-hidden" style={{ background: "#112211" }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "#39ff88" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── DATA ─── */
const PROJECTS = [
  { title: "AI-Based Drowning Detection System", desc: "Real-time CNN + YOLOv9 surveillance model for pool safety with 89% detection accuracy.", longDesc: "A deep learning system designed for real-time drowning detection in pool surveillance footage. Trained CNN and YOLOv9 models on labelled video datasets, achieving 89% detection accuracy. Includes rescue integration triggers and automated alert pipelines.", highlights: ["89% detection accuracy on labelled video datasets", "Real-time inference with YOLOv9 + OpenCV pipeline", "Data augmentation to improve edge-case performance", "Rescue integration via automated alert system"], tech: "Python · TensorFlow · YOLOv9 · OpenCV", repo: "AI-Drowning-Detection" },
  { title: "Weather Forecasting (MSc Research)", desc: "Comparative ML research evaluating ARIMA, Random Forest & LSTM — LSTM achieved 89% accuracy.", longDesc: "MSc research project comparing classical and deep learning time-series forecasting methods on real-world climate datasets. Built an interactive Streamlit dashboard for live visualisation and model comparison.", highlights: ["LSTM model achieved 89% forecasting accuracy", "Compared ARIMA, Random Forest, and LSTM architectures", "Interactive Streamlit dashboard for real-time model comparison", "Used real-world meteorological datasets"], tech: "Python · LSTM · Random Forest · ARIMA · Streamlit", repo: "weather-forecasting-ml" },
  { title: "Smart Agriculture Monitoring App", desc: "Cross-platform Flutter app with real-time Firebase sensor monitoring and automated threshold alerts.", longDesc: "Mobile application for farm sensor monitoring with Firebase authentication, real-time cloud database integration, and automated threshold alert systems for low-latency agricultural monitoring.", highlights: ["Real-time Firebase Realtime DB integration", "Automated threshold alerts for sensor anomalies", "Cross-platform: iOS and Android via Flutter", "Firebase Auth for secure farmer login"], tech: "Flutter · Firebase · Dart", repo: "smart-agriculture-app" },
  { title: "Resume Builder Application", desc: "Dynamic Flutter resume builder with multiple templates, PDF export, and full CRUD functionality.", longDesc: "A feature-rich mobile resume builder with drag-and-drop template selection, real-time PDF generation, and full CRUD for education, experience, and skills sections.", highlights: ["Multiple professional resume templates", "PDF export with native formatting", "Full CRUD: education, experience, skills, personal info", "Scalable, user-friendly mobile interface"], tech: "Flutter · Firebase · PDF Generation", repo: "Resume_Builder" },
  { title: "Food Ordering & Bargaining Platform (PluckNPay)", desc: "Flutter food marketplace with real-time vendor–buyer price negotiation and order management.", longDesc: "A unique food marketplace where users browse vendor listings and negotiate prices directly, featuring real-time communication, order management, authentication, and responsive UI components.", highlights: ["Real-time buyer–vendor price negotiation", "Firebase-backed order management system", "Authentication and user profile management", "Responsive, accessible UI components"], tech: "Flutter · Firebase · Dart", repo: "plucknpay" },
  { title: "Voice Activated SOS Application", desc: "Flutter safety app triggering SOS alerts via voice commands with GPS-based emergency support.", longDesc: "A mobile safety application that listens for voice SOS triggers and dispatches alerts to emergency contacts with live GPS location. Designed for vulnerable users needing rapid emergency support.", highlights: ["Voice command detection via Speech Recognition APIs", "Automatic emergency contact notification", "GPS location attached to all SOS alerts", "Background service mode for always-on protection"], tech: "Flutter · Speech Recognition APIs · GPS", repo: "Voice_SOS" },
  { title: "Hand Gesture Control System", desc: "Real-time computer vision system for device control via hand movement tracking.", longDesc: "A Python-based gesture recognition system that tracks hand movements in real time using OpenCV and computer vision algorithms, enabling touchless device control and interaction.", highlights: ["Real-time hand tracking with OpenCV", "Supports multiple gesture commands", "Low-latency inference pipeline", "Extensible to custom gesture mappings"], tech: "Python · OpenCV · Computer Vision", repo: "Hand-Gesture-Control" },
  { title: "VisionIDE", desc: "AI-powered code editor with syntax highlighting, intelligent completions, and multi-language support.", longDesc: "An advanced AI-assisted IDE concept featuring modern syntax highlighting, intelligent code completions, and multi-language support — designed to streamline developer workflows.", highlights: ["AI-powered code completions", "Multi-language syntax highlighting", "Modern, distraction-free editor UI", "Extensible plugin architecture"], tech: "Any Language · AI-Powered", repo: "visionide" },
  { title: "Global Warming Visualizer", desc: "Data visualisation project highlighting climate change trends and temperature anomalies over decades.", longDesc: "An interactive data visualisation project using real-world climate datasets to illustrate temperature anomalies, CO₂ trends, and sea-level changes over the last century.", highlights: ["Interactive time-series charts", "Real-world climate dataset integration", "Animated trend overlays", "Educational narrative-driven layout"], tech: "Data Visualisation", repo: "global-warming" }
];

const EXPERIENCES = [
  { role: "Customer Service Team Member", company: "Ladbrokes Entain", location: "United Kingdom", period: "Jan 2026 – Present", points: ["Deliver customer-focused support handling transactions, account operations, and compliance in a high-pressure retail environment", "Developed strong communication, problem-solving, and stakeholder engagement skills under pressure"] },
  { role: "Flutter & AI Developer", company: "Self-Employed / Freelance", location: "United Kingdom", period: "2023 – Present", points: ["Developed AI-powered cross-platform mobile apps using Flutter, Firebase, TensorFlow, and Python — achieving 89% accuracy on deep learning classification tasks", "Built scalable apps featuring real-time cloud integration, object detection, predictive analytics, and automated threshold alert systems", "Conducted end-to-end testing, experimentation, and technical documentation for research-oriented software projects"] },
  { role: "Web Developer & Graphic Designer", company: "Amity University Gurugram", location: "India", period: "Apr 2022 – Apr 2025", points: ["Developed and maintained the Amifest 2023 event website — attracting 6,000+ views within 24 hours of launch", "Built responsive web interfaces using HTML5, CSS3, and JavaScript for university platforms and large-scale event campaigns", "Designed promotional graphics, banners, and digital assets for Amifest, Innovathon, and other university-wide initiatives"] },
  { role: "President – Techniki Technical Society", company: "Amity University Gurugram", location: "India", period: "2022 – 2025", points: ["Led a 500+ member technical society, overseeing strategy, operations, and a cross-functional committee across multiple tech disciplines", "Organised large-scale tech events including workshops, hackathons, and competitions in software development, cloud, and AI", "Mentored students across multiple technical fields, fostering a culture of innovation and hands-on learning"] },
  { role: "Founder & President – InFocus Photography Club", company: "Amity University Gurugram", location: "India", period: "2022 – 2025", points: ["Founded and led a 50+ member photography club, organising regular photo walks and a flagship competition with 200+ participants", "Managed all club operations, event logistics, and community engagement from inception"] }
];

const ACHIEVEMENTS = [
  { icon: "🏆", text: "Top 3 Finalist – Smart India Hackathon (national-level competition)" },
  { icon: "🥇", text: "Top 3 Finalist – NTSU Hackathon organised by HackWithIndia" },
  { icon: "🌐", text: "Developed Amifest 2023 website — 6,000+ views within 24 hours of launch" },
  { icon: "🎓", text: "President of Techniki – Led 500+ member technical society across 3 years" },
  { icon: "📸", text: "Founded InFocus Photography Club — flagship event attracted 200+ participants" },
  { icon: "🔬", text: "Organised Innovathon Hackathon 2023 at Amity University Gurugram" }
];

const SKILLS = [
  { label: "Mobile", items: ["Flutter", "Dart", "Android SDK", "Firebase", "Provider", "MVVM", "Clean Architecture", "State Management"] },
  { label: "AI & ML", items: ["TensorFlow", "Keras", "LSTM", "CNN", "YOLOv9", "OpenCV", "Predictive Analytics", "Time Series Forecasting"] },
  { label: "Backend & Web", items: ["Python", "Flask", "Node.js", "PHP", "MySQL", "SQLite", "MongoDB", "REST APIs", "Firebase Realtime DB", "Streamlit"] },
  { label: "Cloud & DevOps", items: ["AWS", "Google Cloud Platform", "Docker", "CI/CD Pipelines", "GitHub Actions", "Linux", "Git", "GitLab CI/CD"] },
  { label: "Languages", items: ["Dart", "Python", "JavaScript", "Java", "SQL", "HTML5", "CSS3"] },
  { label: "Practices", items: ["Agile / Scrum", "API Integration", "Technical Documentation", "Software Testing", "UI/UX Design", "Research & Experimentation"] }
];

const CERTIFICATIONS = [
  "Google Cloud Associate Cloud Engineer (Training Labs)",
  "Artificial Intelligence Fundamentals",
  "Introduction to Internet of Things",
  "Machine Learning & Deep Learning",
  "Cloud Computing Fundamentals"
];

const PUBLICATION = {
  title: "Comparative Analysis of Machine Learning Models for Weather Forecasting: ARIMA, Random Forest, and LSTM",
  authors: "Hammad Safi",
  venue: "MSc Advanced Computer Science — University of Hertfordshire",
  year: "2025",
  abstract: "This research evaluates the performance of three machine learning approaches — ARIMA, Random Forest, and Long Short-Term Memory (LSTM) networks — for short-term weather forecasting using real-world meteorological datasets. The LSTM model achieved 89% forecasting accuracy, outperforming classical statistical and ensemble methods. An interactive Streamlit dashboard was developed to enable real-time model comparison and visualisation.",
  keywords: ["LSTM", "ARIMA", "Random Forest", "Weather Forecasting", "Time Series", "Deep Learning", "Streamlit"],
  type: "MSc Research Project"
};

const SECTIONS = [
  { id: "hero",        label: "HOME" },
  { id: "projects",    label: "PROJECTS" },
  { id: "experience",  label: "EXPERIENCE" },
  { id: "achievements",label: "ACHIEVEMENTS" },
  { id: "skills",      label: "SKILLS" },
  { id: "publication", label: "PUBLICATION" },
  { id: "contact",     label: "CONTACT" }
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

function SectionHeader({ num, title }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
      <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>{num} //</span>
      <h2 className="text-3xl font-black tracking-widest" style={{ color: "#39ff88", textShadow: "0 0 12px rgba(57,255,136,0.4)", fontFamily: "Josefin Sans, sans-serif" }}>{title}</h2>
      <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(57,255,136,0.3), transparent)" }} />
    </motion.div>
  );
}

/* ─── EXPERIENCE TIMELINE ─── */
function ExperienceTimeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [lineHeight, setLineHeight] = useState(0);
  const nodeRefs = useRef([]);

  // Drive the growing line and active node via scroll inside the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // How far we've scrolled through the section (0 → 1)
      const totalScroll = section.offsetHeight - windowH;
      const scrolled = Math.max(0, -rect.top);
      const progress = totalScroll > 0 ? Math.min(scrolled / totalScroll, 1) : 0;

      // Grow the green line
      const fullH = section.offsetHeight - 160; // top/bottom padding
      setLineHeight(progress * fullH);

      // Which node is "active" — the one whose top is above the viewport center
      const viewportMid = windowH * 0.55;
      let newActive = -1;
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const nr = node.getBoundingClientRect();
        if (nr.top < viewportMid) newActive = i;
      });
      setActiveIdx(newActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative z-10 py-28 px-6 md:px-24 overflow-hidden">
      <Hero3D />
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <SectionHeader num="02" title="EXPERIENCE" />
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative mt-4">

          {/* ── Static dim track line ── */}
          <div className="absolute left-[88px] md:left-[108px] top-0 bottom-0 w-[1px]"
            style={{ background: "rgba(57,255,136,0.1)" }} />

          {/* ── Animated growing green line ── */}
          <div ref={lineRef} className="absolute left-[88px] md:left-[108px] top-0 w-[1px] overflow-hidden"
            style={{ height: lineHeight, background: "linear-gradient(to bottom, #39ff88, rgba(57,255,136,0.3))", transition: "height 0.05s linear", boxShadow: "0 0 8px rgba(57,255,136,0.6)" }} />

          {/* ── Entries ── */}
          <div className="space-y-0">
            {EXPERIENCES.map((exp, i) => {
              const isActive = activeIdx >= i;
              const isCurrent = activeIdx === i;

              // Extract start year for the node label
              const yearMatch = exp.period.match(/(\d{4})/);
              const year = yearMatch ? yearMatch[1] : "";

              return (
                <div key={i} ref={el => nodeRefs.current[i] = el} className="relative flex gap-0 pb-16 last:pb-0">

                  {/* ── Year label + circle node ── */}
                  <div className="flex-shrink-0 w-[88px] md:w-[108px] flex flex-col items-end pr-6 pt-1">
                    {/* Year text */}
                    <motion.span
                      className="text-[11px] font-bold tracking-widest mb-2 transition-all duration-500"
                      style={{ color: isActive ? "#39ff88" : "#0f4f2f", fontFamily: "Share Tech Mono, monospace",
                        textShadow: isActive ? "0 0 10px rgba(57,255,136,0.6)" : "none" }}>
                      {year}
                    </motion.span>

                    {/* Circle node — outer ring + inner dot */}
                    <div className="relative flex items-center justify-center" style={{ width: 22, height: 22 }}>
                      {/* Ping animation for current active */}
                      {isCurrent && (
                        <motion.div className="absolute rounded-full"
                          style={{ width: 22, height: 22, border: "1px solid #39ff88" }}
                          animate={{ scale: [1, 1.7, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }} />
                      )}
                      {/* Outer ring */}
                      <div className="rounded-full transition-all duration-500"
                        style={{
                          width: 20, height: 20,
                          border: `1.5px solid ${isActive ? "#39ff88" : "rgba(57,255,136,0.2)"}`,
                          background: isActive ? "rgba(57,255,136,0.08)" : "transparent",
                          boxShadow: isActive ? "0 0 14px rgba(57,255,136,0.4)" : "none",
                          transition: "all 0.4s ease"
                        }} />
                      {/* Inner filled dot */}
                      <div className="absolute rounded-full transition-all duration-500"
                        style={{
                          width: isActive ? 8 : 4, height: isActive ? 8 : 4,
                          background: isActive ? "#39ff88" : "rgba(57,255,136,0.3)",
                          boxShadow: isActive ? "0 0 8px #39ff88" : "none"
                        }} />
                    </div>
                  </div>

                  {/* ── Experience card ── */}
                  <motion.div
                    className="flex-1 card rounded-xl p-6 ml-2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    style={{
                      borderColor: isCurrent ? "rgba(57,255,136,0.5)" : "rgba(57,255,136,0.15)",
                      boxShadow: isCurrent ? "0 0 24px rgba(57,255,136,0.1)" : "none",
                      transition: "border-color 0.4s, box-shadow 0.4s"
                    }}>

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-base font-black text-white leading-snug" style={{ fontFamily: "Josefin Sans, sans-serif" }}>{exp.role}</h3>
                        <p className="text-sm mt-0.5" style={{ color: "#39ff88" }}>{exp.company}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] font-bold tracking-wider" style={{ color: "#5a9a7a" }}>{exp.period}</div>
                        <div className="text-[10px] mt-0.5 tracking-widest" style={{ color: "#0f8f4f" }}>{exp.location}</div>
                      </div>
                    </div>

                    {/* Points */}
                    <ul className="space-y-1.5 mt-4">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-[11px] leading-relaxed" style={{ color: "#5a9a7a" }}>
                          <span style={{ color: "#39ff88", flexShrink: 0 }}>▹</span>{pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN SITE ─── */
function MainSite({ cursorPos }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
      className="min-h-screen" style={{ background: "#050607", color: "#39ff88", fontFamily: "'Share Tech Mono', monospace" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700;900&family=Share+Tech+Mono&display=swap');
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050607; }
        ::-webkit-scrollbar-thumb { background: #39ff88; border-radius: 2px; }
        .card {
          background: rgba(10,15,12,0.8);
          border: 1px solid rgba(57,255,136,0.2);
          backdrop-filter: blur(12px);
          transition: all 0.35s ease;
        }
        .card:hover {
          border-color: rgba(57,255,136,0.6);
          box-shadow: 0 0 30px rgba(57,255,136,0.12);
          transform: translateY(-4px);
        }
        .project-card { cursor: pointer; }
        .project-card:hover .card-click-hint { opacity: 1; }
        .card-click-hint { opacity: 0; transition: opacity 0.2s; }
        .neon-text { color: #39ff88; text-shadow: 0 0 12px rgba(57,255,136,0.6); }
        .nav-link { color: #0f8f4f; transition: color 0.25s; text-decoration: none; }
        .nav-link:hover { color: #39ff88; }
        .skill-pill { border: 1px solid rgba(57,255,136,0.2); color: #a0e0b0; background: rgba(57,255,136,0.04); transition: all 0.2s; display: inline-block; }
        .skill-pill:hover { border-color: #39ff88; color: #39ff88; background: rgba(57,255,136,0.1); }
        .cert-item { border-left: 2px solid rgba(57,255,136,0.3); transition: border-color 0.2s; }
        .cert-item:hover { border-left-color: #39ff88; }
      `}</style>

      <DotGrid />
      <ScrollIndicator sections={SECTIONS} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center"
        style={{ borderBottom: "1px solid rgba(57,255,136,0.1)", backdropFilter: "blur(14px)", background: "rgba(5,6,7,0.9)" }}>
        <span className="text-xs tracking-[0.3em] font-bold neon-text" style={{ fontFamily: "Josefin Sans, sans-serif" }}>HS://PORTFOLIO</span>
        <div className="hidden md:flex gap-6 text-[11px] tracking-[0.2em]">
          {SECTIONS.slice(1).map(s => <a key={s.id} href={`#${s.id}`} className="nav-link">{s.label}</a>)}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative z-10 h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Hero3D fills the section background */}
        <Hero3D />

        {/* Foreground content sits above the 3D canvas */}
        <motion.div className="relative z-10" variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="text-[11px] tracking-[0.5em] mb-6" style={{ color: "#0f8f4f" }}>
            FLUTTER DEVELOPER · AI ENGINEER · SYSTEM BUILDER
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black tracking-[0.08em] leading-none mb-1" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
            <RevealName text="HAMMAD" cursorPos={cursorPos} />
          </motion.h1>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black tracking-[0.08em] leading-none mb-6" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
            <RevealName text="SAFI" cursorPos={cursorPos} />
          </motion.h1>
          <motion.p variants={fadeUp} className="text-sm mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#4a8f6a" }}>
            MSc Advanced Computer Science · University of Hertfordshire · Hatfield, UK
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center gap-4 flex-wrap">
            {[["VIEW PROJECTS", "#projects", true], ["CONTACT", "#contact", false]].map(([label, href, primary]) => (
              <a key={label} href={href}
                className="px-7 py-3 text-xs tracking-widest transition-all"
                style={{ border: `1px solid ${primary ? "#39ff88" : "#0f8f4f"}`, color: primary ? "#39ff88" : "#0f8f4f" }}
                onMouseEnter={e => { e.currentTarget.style.background = primary ? "#39ff88" : "#0f8f4f"; e.currentTarget.style.color = "#000"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = primary ? "#39ff88" : "#0f8f4f"; }}>
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] tracking-[0.4em]" style={{ color: "#0f4f2f" }}>SCROLL</span>
          <motion.div className="w-[1px] h-7" style={{ background: "linear-gradient(to bottom, #39ff88, transparent)" }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ repeat: Infinity, duration: 1.6 }} />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative z-10 py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D />
        <div className="relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <SectionHeader num="01" title="PROJECTS" />
            <p className="text-xs tracking-widest mb-10" style={{ color: "#0f8f4f" }}>CLICK ANY CARD TO SEE FULL DETAILS →</p>
            <div className="grid md:grid-cols-3 gap-5">
              {PROJECTS.map((p, i) => (
                <motion.div key={i} variants={fadeUp} className="card project-card p-6 rounded-xl relative group" onClick={() => setActiveProject(p)}>
                  <div className="text-[9px] tracking-[0.3em] mb-3 px-2 py-1 inline-block" style={{ border: "1px solid rgba(57,255,136,0.25)", color: "#0f8f4f" }}>{p.tech.split("·")[0].trim()}</div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug" style={{ fontFamily: "Josefin Sans, sans-serif" }}>{p.title}</h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: "#5a9a7a" }}>{p.desc}</p>
                  <div className="card-click-hint absolute bottom-4 right-4 text-[9px] tracking-widest" style={{ color: "#39ff88" }}>CLICK TO EXPAND ↗</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ── */}
      <ExperienceTimeline />

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="relative z-10 py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D />
        <div className="relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <SectionHeader num="03" title="ACHIEVEMENTS" />
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-6 rounded-xl flex gap-4 items-start">
                  <span className="text-2xl">{a.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#a0e0b0" }}>{a.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative z-10 py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D />
        <div className="relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <SectionHeader num="04" title="SKILLS" />
            <div className="space-y-8 max-w-5xl">
              {SKILLS.map((group, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="text-[10px] tracking-[0.4em] mb-3" style={{ color: "#0f8f4f" }}>{group.label.toUpperCase()}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(s => <span key={s} className="skill-pill text-[11px] px-3 py-1.5 tracking-wider">{s}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp} className="mt-16">
              <div className="text-[10px] tracking-[0.4em] mb-6" style={{ color: "#0f8f4f" }}>CERTIFICATIONS</div>
              <div className="space-y-3 max-w-xl">
                {CERTIFICATIONS.map((c, i) => (
                  <div key={i} className="cert-item pl-4 text-[11px] py-1" style={{ color: "#5a9a7a" }}>{c}</div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PUBLICATION ── */}
      <section id="publication" className="relative z-10 py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D />
        <div className="relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <SectionHeader num="05" title="PUBLICATION" />
            <motion.div variants={fadeUp} className="card p-8 rounded-2xl max-w-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16" style={{ background: "linear-gradient(135deg, rgba(57,255,136,0.12), transparent)" }} />
              <div className="text-[9px] tracking-[0.35em] mb-4 px-3 py-1 inline-block" style={{ border: "1px solid rgba(57,255,136,0.3)", color: "#0f8f4f" }}>{PUBLICATION.type}</div>
              <h3 className="text-xl font-black text-white mb-3 leading-snug" style={{ fontFamily: "Josefin Sans, sans-serif" }}>{PUBLICATION.title}</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-5 text-xs" style={{ color: "#0f8f4f" }}>
                <span>✍ {PUBLICATION.authors}</span>
                <span>🏛 {PUBLICATION.venue}</span>
                <span>📅 {PUBLICATION.year}</span>
              </div>
              <p className="text-[12px] leading-relaxed mb-6" style={{ color: "#5a9a7a" }}>{PUBLICATION.abstract}</p>
              <div className="flex flex-wrap gap-2">
                {PUBLICATION.keywords.map(kw => (
                  <span key={kw} className="text-[9px] tracking-widest px-2 py-1" style={{ border: "1px solid rgba(57,255,136,0.2)", color: "#39ff88", background: "rgba(57,255,136,0.04)" }}>{kw}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-28 px-6 md:px-24 text-center overflow-hidden">
        <Hero3D />
        <div className="relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <SectionHeader num="06" title="CONTACT" />
            <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] mb-8" style={{ color: "#0f8f4f" }}>INITIATE COMMUNICATION SEQUENCE</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6 mb-10 text-sm" style={{ color: "#5a9a7a" }}>
              <a href="mailto:hammabdullah@gmail.com" className="hover:text-[#39ff88] transition-colors">hammabdullah@gmail.com</a>
              <span style={{ color: "#0f4f2f" }}>|</span>
              <span>+44 7352 664787</span>
              <span style={{ color: "#0f4f2f" }}>|</span>
              <span>Hatfield, UK</span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex justify-center gap-4 flex-wrap">
              {[
                { label: "LINKEDIN", href: "https://linkedin.com/in/hammad-safi" },
                { label: "GITHUB",   href: "https://github.com/HammadBullah" },
                { label: "EMAIL",    href: "mailto:hammabdullah@gmail.com" }
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-2.5 text-xs tracking-widest transition-all"
                  style={{ border: "1px solid rgba(57,255,136,0.3)", color: "#0f8f4f" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#39ff88"; e.currentTarget.style.color = "#39ff88"; e.currentTarget.style.boxShadow = "0 0 16px rgba(57,255,136,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(57,255,136,0.3)"; e.currentTarget.style.color = "#0f8f4f"; e.currentTarget.style.boxShadow = "none"; }}>
                  {label}
                </a>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-20 text-[9px] tracking-[0.4em]" style={{ color: "#0f4f2f" }}>
              © 2026 HAMMAD SAFI · MSc ADVANCED COMPUTER SCIENCE · UNIVERSITY OF HERTFORDSHIRE
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── ROOT ─── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState(null);
  const handleCursorMove = useCallback((x, y) => setCursorPos({ x, y }), []);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 3000); return () => clearTimeout(t); }, []);
  return (
    <>
      <style>{`body { margin: 0; background: #050607; }`}</style>
      <Cursor onMove={handleCursorMove} />
      <AnimatePresence mode="wait">
        {loading ? <LoadingScreen key="loader" /> : <MainSite key="main" cursorPos={cursorPos} />}
      </AnimatePresence>
    </>
  );
}