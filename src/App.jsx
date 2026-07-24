import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleOver = (e) => {
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer" || target.tagName === "A" || target.tagName === "BUTTON");
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot w-2 h-2"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4, scale: isPointer ? 3 : 1 }}
      />
      <motion.div
        className="cursor-outline w-8 h-8"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16, scale: isPointer ? 1.5 : 1, opacity: isPointer ? 0.5 : 1 }}
      />
    </>
  );
}

/* ─── SECTION 1: PHOTO & NAME SEQUENCE ─── */
function HeroSequence() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Photo Transforms
  const photoX = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8], ["-25%", "0%", "0%", "0%"]);
  
  // 3D Turning Logic: Starts completely sideways (-90deg), faces front (0deg) at center
  const photoRotateY = useTransform(scrollYProgress, [0, 0.3], [-90, 0]);
  const photoRotateZ = useTransform(scrollYProgress, [0.3, 0.6], [0, 360]); 
  
  const photoScale = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);
  const photoOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);
  
  // Color Reveal: Starts grayscale, becomes full color when front-facing
  const photoGrayscale = useTransform(scrollYProgress, [0, 0.25], ["grayscale(100%)", "grayscale(0%)"]);

  // Name & Work Transforms
  const nameOpacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const nameX = useTransform(scrollYProgress, [0, 0.3], ["25%", "40%"]);


  // Introduction Transforms
  const introLeftX = useTransform(scrollYProgress, [0.7, 0.9], ["-100%", "0%"]);
  const introRightX = useTransform(scrollYProgress, [0.7, 0.9], ["100%", "0%"]);
  const introOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  return (
    <div ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* PHOTO CONTAINER */}
        <div style={{ perspective: "1500px" }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ 
              x: photoX, 
              rotateY: photoRotateY, 
              rotateZ: photoRotateZ, 
              scale: photoScale, 
              opacity: photoOpacity,
              filter: photoGrayscale,
              transformStyle: "preserve-3d" 
            }}
            className="z-20 w-64 h-80 md:w-80 md:h-[450px] border-2 border-white flex items-center justify-center bg-zinc-900 overflow-hidden shadow-[30px_30px_60px_rgba(255,255,255,0.05)]"
          >
            <img 
              src="https://sc04.alicdn.com/kf/A9bc1d44b95c2463c950cf5d5ed46ce030.jpg" 
              className="w-full h-full object-cover"
              alt="Hammad Safi" 
            />
          </motion.div>
        </div>



        {/* NAME & WORK TITLE */}
        <motion.div 
          style={{ opacity: nameOpacity, x: nameX }}
          className="absolute z-10 text-right pr-12 md:pr-24"
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-2">
            HAMMAD<br/>SAFI
          </h1>
          <p className="text-sm md:text-lg font-light tracking-[0.5em] text-zinc-400">
            AI ENGINEER · FLUTTER DEV
          </p>
        </motion.div>

        {/* INTRODUCTION (Appears later) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="max-w-4xl w-full px-8 flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              style={{ x: introLeftX, opacity: introOpacity }}
              className="flex-1 text-left"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">THE VISION.</h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                MSc Advanced Computer Science candidate at the University of Hertfordshire. 
                I bridge the gap between high-performance AI models and elegant mobile experiences.
              </p>
            </motion.div>
            <motion.div 
              style={{ x: introRightX, opacity: introOpacity }}
              className="flex-1 text-right"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">THE CRAFT.</h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                Specializing in Computer Vision (YOLOv9), Deep Learning (LSTM), and Cross-platform development with Flutter. 
                Building systems that are not just smart, but human-centric.
              </p>
            </motion.div>
          </div>
        </div>

        {/* BACKGROUND NUMBERS/DECORATION */}
        <div className="absolute top-12 left-12 font-mono text-[10px] text-zinc-800 tracking-widest">
          HS.PORTFOLIO.SYS_v4.0<br/>
          STATUS: OPERATIONAL
        </div>
      </div>
    </div>
  );
}

/* ─── DATA ─── */
const PROJECTS = [
  { id: "01", title: "AI DROWNING DETECTION", tech: "YOLOv9 / TENSORFLOW", desc: "Real-time surveillance with 89% accuracy." },
  { id: "02", title: "PLUCKNPAY MARKETPLACE", tech: "FLUTTER / FIREBASE", desc: "Real-time bargaining and food marketplace." },
  { id: "03", title: "WEATHER FORECASTING", tech: "LSTM / PYTHON", desc: "MSc Research on predictive climate models." },
  { id: "04", title: "SMART AGRICULTURE", tech: "FLUTTER / IOT", desc: "Automated farm monitoring systems." },
];

/* ─── SECTION 2: HORIZONTAL PROJECTS ─── */
function ProjectSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white text-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-24 px-24">
          <div className="flex-shrink-0 w-[500px]">
            <h2 className="text-[120px] font-black leading-none tracking-tighter">WORKS.</h2>
            <p className="text-sm tracking-[0.3em] font-bold mt-4">SCROLL TO EXPLORE →</p>
          </div>
          {PROJECTS.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[400px] md:w-[600px] group border-l border-black pl-12">
              <span className="text-xs font-mono mb-4 block opacity-50">{p.id} // {p.tech}</span>
              <h3 className="text-4xl md:text-6xl font-black mb-6 group-hover:italic transition-all duration-300">{p.title}</h3>
              <p className="text-zinc-500 text-sm max-w-sm mb-8">{p.desc}</p>
              <button className="px-6 py-2 border border-black text-[10px] tracking-widest hover:bg-black hover:text-white transition-all">VIEW CASE STUDY</button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  return (
    <div className="bg-black selection:bg-white selection:text-black">
      <CustomCursor />
      
      {/* HUD ELEMENTS */}
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between mix-blend-difference items-start pointer-events-none">
        <div className="font-black text-xl tracking-tighter">HS.</div>
        <div className="flex flex-col items-end gap-1 pointer-events-auto">
          <a href="#contact" className="text-[10px] tracking-widest hover:opacity-50 transition-opacity">CONTACT</a>
          <div className="w-12 h-[1px] bg-white/20 mt-2" />
        </div>
      </nav>

      {/* SECTIONS */}
      <HeroSequence />
      
      <div className="h-screen flex items-center justify-center bg-black">
        <h2 className="text-[15vw] font-black tracking-tighter opacity-10 select-none">SYSTEM</h2>
      </div>

      <ProjectSection />

      {/* CONTACT FOOTER */}
      <section id="contact" className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-7xl md:text-[12vw] font-black tracking-tighter mb-12">LET'S TALK.</h2>
          <div className="flex flex-col gap-4 items-center">
            <a href="mailto:hammabdullah@gmail.com" className="text-xl md:text-3xl font-light hover:italic transition-all">hammabdullah@gmail.com</a>
            <div className="flex gap-8 mt-12 text-[10px] tracking-[0.4em] text-zinc-500">
              <a href="https://linkedin.com/in/hammad-safi" className="hover:text-white">LINKEDIN</a>
              <a href="https://github.com/HammadBullah" className="hover:text-white">GITHUB</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PROGRESS BAR */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
    </div>
  );
}
