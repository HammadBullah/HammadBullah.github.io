import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Terminal as TermIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { MagneticButton } from "./MagneticButton";

const LINKS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
];

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onOpenTerminal?.(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [onOpenTerminal]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.1 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex items-center justify-between gap-3 px-2.5 py-2 rounded-full w-full max-w-3xl transition-all duration-500 ${
          scrolled ? "glass shadow-[var(--shadow-md)]" : "bg-transparent"
        }`}
      >
        <a href="#top" data-cursor="link" className="flex items-center gap-2 pl-3 pr-2 py-1">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] grid place-items-center text-white text-[11px] font-black shadow-[0_6px_22px_-6px_rgba(10,132,255,.55)]">
            H
          </span>
          <span className="hidden sm:inline text-[13px] font-medium tracking-tight">
            Hammad <span className="text-soft">Safi</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-0.5 text-[13px] text-soft">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} data-cursor="link" className="relative px-3 py-1.5 rounded-full hover:text-[var(--fg)] transition-colors link-u">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            title="Terminal (⌃`)"
            aria-label="Open terminal"
            className="hidden sm:grid w-9 h-9 place-items-center rounded-full border hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-soft hover:text-[var(--fg)]"
          >
            <TermIcon size={15} />
          </button>
          <MagneticButton as="a" href="#contact" strength={0.2} className="hidden sm:inline-flex btn-primary !px-4 !py-1.5 text-[12px]">
            Let's talk
          </MagneticButton>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center rounded-full border hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <motion.span key={theme} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </motion.span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
