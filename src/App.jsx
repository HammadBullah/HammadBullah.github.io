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

/* ─── MAIN SITE ─── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

function MainSite({ cursorPos }) {
  const projects = [
    { title: "Drowning Detection AI", desc: "Real-time CNN model for video-based pool surveillance", tag: "AI · CV" },
    { title: "Resume Builder App", desc: "Flutter app generating PDF resumes with dynamic templates", tag: "Flutter · PDF" },
    { title: "Voice SOS System", desc: "Voice-activated emergency alert with geolocation dispatch", tag: "IoT · NLP" },
  ];

  const skills = ["Flutter", "Dart", "Python", "TensorFlow", "Firebase", "C++"];

  return (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen"
      style={{ background: "#050607", color: "#39ff88", fontFamily: "'Share Tech Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');
        * { cursor: none !important; }
        
        .card {
          background: rgba(10, 15, 12, 0.65);
          border: 1px solid rgba(57,255,136,0.2);
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
      `}</style>

      <ParticleField />
      <DotGrid />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-40 px-8 py-5 flex justify-between items-center border-b border-[#112211] bg-black/80 backdrop-blur-xl">
        <span className="text-xs tracking-[0.3em] font-bold neon-text">HS://PORTFOLIO</span>
        <div className="flex gap-8 text-xs tracking-[0.2em]">
          {["PROJECTS", "SKILLS", "CONTACT"].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="nav-link">{n}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <AmbientGlow />

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
            <a
              href="#projects"
              className="px-8 py-3.5 text-xs tracking-widest border border-[#39ff88] hover:bg-[#39ff88] hover:text-black transition-all duration-300 font-medium"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 text-xs tracking-widest border border-[#0f8f4f] hover:bg-[#0f8f4f] hover:text-white transition-all duration-300 font-medium"
            >
              CONTACT
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      
      <section id="projects" className="relative z-10 h-screen flex items-center py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
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

      {/* SKILLS */}
      <section id="skills" className="relative z-10 h-screen flex items-center py-28 px-6 md:px-24 overflow-hidden">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
  
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>02 //</span>
            <h2 className="text-3xl font-black tracking-widest neon-text">SKILLS</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            {skills.map((s) => (
              <motion.span
                key={s}
                whileHover={{ scale: 1.08 }}
                className="px-6 py-3 text-sm border border-[#0f8f4f] hover:border-[#39ff88] hover:text-white transition-all rounded-full"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 h-screen flex items-center justify-center text-center py-28 px-6 md:px-24 text-center">
        <Hero3D mouse={{ current: cursorPos || { x: 0, y: 0 } }} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16 justify-center">
            <span className="text-[10px] tracking-[0.4em]" style={{ color: "#0f8f4f" }}>03 //</span>
            <h2 className="text-3xl font-black tracking-widest neon-text">CONTACT</h2>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg tracking-widest mb-6" style={{ color: "#0f8f4f" }}>
            INITIATE COMMUNICATION SEQUENCE
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="mailto:hammadbullah@gmail.com"
            className="inline-block text-2xl font-bold tracking-wider hover:text-white transition-colors neon-text"
          >
            hammadbullah@gmail.com
          </motion.a>

          <motion.div variants={fadeUp} className="mt-20 text-xs tracking-widest" style={{ color: "#0f8f4f" }}>
            © 2026 HAMMAD SAFI · ALL SYSTEMS OPERATIONAL
          </motion.div>
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
    const t = setTimeout(() => setLoading(false), 2800);
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