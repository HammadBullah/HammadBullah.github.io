import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, Phone, ArrowUp } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { SplitText } from "../components/SplitText";

function GithubIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z"/>
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"/>
    </svg>
  );
}

const SOCIALS = [
  { label: "Email",    href: "mailto:hammabdullah@gmail.com",  icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/hammad-safi", icon: LinkedinIcon },
  { label: "GitHub",   href: "https://github.com/HammadBullah", icon: GithubIcon },
  { label: "Phone",    href: "tel:+447352664787",               icon: Phone },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-44 section overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="aurora" style={{width:700,height:700,left:"50%",top:"-12%",transform:"translateX(-50%)",background:"var(--blob-1)"}}/>
        <div className="aurora" style={{width:480,height:480,right:"-8%",bottom:"-8%",background:"var(--blob-2)"}}/>
        <div className="noise"/>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="eyebrow mb-6">06 — Contact</motion.p>

        <SplitText as="h2" className="font-display font-semibold text-5xl md:text-[clamp(3rem,7vw,6.2rem)] tracking-tight leading-[1.03]" text="Let's build something amazing together."/>

        <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7, delay:.2}} className="mt-6 text-soft text-lg max-w-xl mx-auto leading-relaxed">
          Currently <span className="text-[var(--fg)] font-medium">open to opportunities</span> across AI, full-stack and mobile.
          Drop a note — I usually reply within 24 hours.
        </motion.p>

        <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7, delay:.3}} className="mt-10 flex flex-wrap justify-center gap-3">
          <MagneticButton as="a" href="mailto:hammabdullah@gmail.com" className="btn-primary !px-6 !py-3 text-[14px] arrow-slide">
            <Mail size={15}/> hammabdullah@gmail.com
          </MagneticButton>
          <MagneticButton as="a" href="/resume.pdf" className="btn-secondary !px-6 !py-3 text-[14px] arrow-slide" download>
            <Download size={15}/> Download résumé
          </MagneticButton>
          <MagneticButton as="a" href="https://linkedin.com/in/hammad-safi" target="_blank" rel="noopener" className="btn-secondary !px-6 !py-3 text-[14px] arrow-slide">
            <LinkedinIcon/> LinkedIn <ArrowUpRight size={15}/>
          </MagneticButton>
        </motion.div>

        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.8, delay:.5}} className="mt-14 flex flex-wrap justify-center gap-3">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-cursor="link"
               className="group relative w-11 h-11 rounded-full border hairline grid place-items-center hover:text-[var(--accent)] hover:border-[color-mix(in_srgb,var(--accent)_50%,var(--hair))] transition-colors">
              <s.icon/>
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-widest text-soft mono">{s.label}</span>
            </a>
          ))}
        </motion.div>
      </div>

      <footer className="relative mt-28 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[13px] text-soft border-t hairline pt-8 px-1">
        <p>© {new Date().getFullYear()} Hammad Safi. Handcrafted with care.</p>
        <div className="flex items-center gap-4">
          <span className="mono text-[11px] tracking-widest text-mute">v3.0 · BUILT IN HATFIELD</span>
          <a href="#top" data-cursor="link" className="link-u inline-flex items-center gap-1 text-[13px]">Back to top <ArrowUp size={13}/></a>
        </div>
      </footer>
    </section>
  );
}
