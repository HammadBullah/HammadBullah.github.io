import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

function GithubIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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
    <section id="contact" className="relative py-28 md:py-44 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          05 — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          className="font-display font-semibold text-5xl md:text-8xl tracking-tight leading-[1.02]"
        >
          Have a project in mind?
          <br />
          <span className="text-soft">Let's make it real.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-soft text-lg max-w-xl mx-auto"
        >
          Whether it's an AI product, a polished mobile app or a sharp marketing site —
          I'd love to hear about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          <a
            href="mailto:hammabdullah@gmail.com"
            className="btn-primary !px-7 !py-3.5 text-[15px]"
          >
            <Mail size={16} /> hammabdullah@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/hammad-safi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !px-7 !py-3.5 text-[15px]"
          >
            Connect on LinkedIn <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 flex flex-wrap justify-center gap-3"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border hairline grid place-items-center hover:text-accent hover:border-accent/40 transition-colors"
              aria-label={s.label}
            >
              {s.icon === Mail || s.icon === Phone ? <s.icon size={17} /> : <s.icon />}
            </a>
          ))}
        </motion.div>
      </div>

      <footer className="mt-28 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-soft border-t hairline pt-8 px-1">
        <p>© {new Date().getFullYear()} Hammad Safi. Crafted with care.</p>
        <p className="font-mono text-xs">v1.0 · Designed in Hatfield</p>
      </footer>
    </section>
  );
}
