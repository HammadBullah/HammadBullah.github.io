import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Line {
  text: string;
  kind?: "in" | "out" | "ok" | "err" | "dim" | "mut";
}

interface TerminalProps {
  open: boolean;
  onClose: () => void;
}

function help(): Line[] {
  return [
    { text: "Available commands:", kind: "dim" },
    { text: "  help        show this message", kind: "out" },
    { text: "  about       who is hammad?", kind: "out" },
    { text: "  projects    list selected work", kind: "out" },
    { text: "  skills      tech stack", kind: "out" },
    { text: "  resume      open résumé (PDF)", kind: "out" },
    { text: "  github      open GitHub profile", kind: "out" },
    { text: "  contact     contact details", kind: "out" },
    { text: "  theme       toggle light/dark", kind: "out" },
    { text: "  clear       clear the screen", kind: "out" },
    { text: "  exit        close terminal", kind: "out" },
  ];
}

const PROJECTS = [
  "• Drowning Detection     — YOLOv9, TensorFlow, real-time safety",
  "• PlucknPay               — Flutter, Dart, Firebase marketplace",
  "• Weather LSTM            — MSc research, time-series models",
  "• Smart Agriculture       — IoT, Dart, Firebase monitoring",
];
const SKILLS = [
  "Languages  : Python · TypeScript · JavaScript · Dart · Java",
  "Frontend   : React · Next.js · Tailwind · Framer Motion",
  "Backend    : Node.js · FastAPI · Express · PostgreSQL · MongoDB",
  "AI / ML    : TensorFlow · PyTorch · YOLOv9 · LSTM · Hugging Face",
  "Mobile     : Flutter · Firebase",
  "Infra      : Docker · AWS · Git · Linux",
];

export function Terminal({ open, onClose }: TerminalProps) {
  const [history, setHistory] = useState<Line[]>([
    { text: "hammad.safi ~ % welcome. type 'help' for commands.", kind: "ok" },
    { text: "tip: press ⌃` or esc to close.", kind: "dim" },
  ]);
  const [val, setVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out: Line[] = [{ text: `hammad.safi ~ % ${raw}`, kind: "in" }];
    switch (cmd) {
      case "":
        break;
      case "help":
        out.push(...help());
        break;
      case "about":
        out.push(
          { text: "Hammad Safi — Software Developer & AI Engineer.", kind: "ok" },
          { text: "MSc Advanced Computer Science @ University of Hertfordshire.", kind: "out" },
          { text: "Building AI-powered applications and scalable digital experiences.", kind: "out" },
        );
        break;
      case "projects":
        out.push({ text: "Selected work:", kind: "dim" });
        PROJECTS.forEach((p) => out.push({ text: p, kind: "out" }));
        break;
      case "skills":
        out.push(...SKILLS.map<Line>((s) => ({ text: s, kind: "out" })));
        break;
      case "resume":
        out.push({ text: "opening resume…", kind: "mut" });
        window.open("/resume.pdf", "_blank");
        break;
      case "github":
        out.push({ text: "opening https://github.com/HammadBullah …", kind: "mut" });
        window.open("https://github.com/HammadBullah", "_blank");
        break;
      case "contact":
        out.push(
          { text: "email : hammabdullah@gmail.com", kind: "out" },
          { text: "phone : +44 7352 664787", kind: "out" },
          { text: "linkedin : linkedin.com/in/hammad-safi", kind: "out" },
        );
        break;
      case "theme":
        toggleTheme();
        out.push({ text: `theme → ${document.documentElement.classList.contains("dark") ? "dark" : "light"}`, kind: "ok" });
        break;
      case "clear":
      case "cls":
        setHistory([]);
        return;
      case "exit":
      case "quit":
      case "q":
        onClose();
        return;
      default:
        out.push({ text: `command not found: ${cmd}. try 'help'.`, kind: "err" });
    }
    setHistory((h) => [...h, ...out]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(val);
    setVal("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="term"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="term-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="term-head">
              <i className="r" onClick={onClose} role="button" aria-label="close" />
              <i className="y" />
              <i className="g" />
              <span className="ttl">hammad@portfolio — zsh — 120×30</span>
              <span className="hint">esc to close · ⌃`</span>
            </div>
            <div className="term-body" ref={bodyRef}>
              {history.map((l, i) => (
                <div
                  key={i}
                  className={`term-line ${
                    l.kind === "ok" ? "term-ok" : l.kind === "err" ? "term-err" : l.kind === "mut" ? "term-mut" : l.kind === "dim" ? "term-dim" : ""
                  }`}
                >
                  {l.text}
                </div>
              ))}
            </div>
            <form className="term-input" onSubmit={submit}>
              <span className="term-ok">hammad.safi</span>
              <span className="term-dim">%</span>
              <input
                ref={inputRef}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                aria-label="terminal input"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
