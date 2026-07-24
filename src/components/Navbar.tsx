import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const LINKS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-4 inset-x-0 z-50 flex justify-center px-4`}
    >
      <nav
        className={`flex items-center justify-between gap-6 px-3 py-2 rounded-full w-full max-w-3xl transition-all duration-500 ease-apple ${
          scrolled ? "glass shadow-soft dark:shadow-soft-dark" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 pl-3 pr-2 py-1 font-display font-semibold tracking-tight"
        >
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-soft grid place-items-center text-white text-[10px] font-black">
            H
          </span>
          <span className="text-sm">Hammad Safi</span>
        </a>

        {/* Links (desktop) */}
        <ul className="hidden md:flex items-center gap-1 text-sm text-soft">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-1.5 rounded-full hover:text-[var(--fg)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex btn-primary !px-4 !py-1.5 text-xs"
          >
            Let's talk
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center rounded-full border hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
