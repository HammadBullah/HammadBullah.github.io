import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "../components/SplitText";

const SOURCE = `const developer = {
  name: "Hammad Safi",
  role: "Software Developer",
  education: "MSc Advanced Computer Science",
  interests: [
    "Artificial Intelligence",
    "Full Stack Development",
    "Machine Learning",
    "Cloud",
    "Prompt Engineering",
  ],
  currentlyBuilding: "AI Prompt Coaching System",
  status: "open to opportunities",
};
`;

type Tok = { t: string; c?: string }[];

function tokenize(src: string): Tok {
  // naive highlighter
  const out: Tok = [];
  const keywords = ["const", "new", "true", "false", "null", "undefined", "var", "let", "status", "open"];
  const re = /(\/\/[^\n]*|"(?:[^"\\]|\\.)*"|\b\d+\b|\b[A-Za-z_$][\w$]*\b|\s+|[{}()[\],:;])/g;
  let m;
  while ((m = re.exec(src))) {
    let tok = m[0];
    let c: string | undefined;
    if (tok.startsWith("//")) c = "tok-com";
    else if (tok.startsWith('"')) c = "tok-str";
    else if (/^\d+$/.test(tok)) c = "tok-num";
    else if (keywords.includes(tok)) c = "tok-key";
    else if (/^[A-Za-z_$]/.test(tok)) {
      // check if followed by :
      const next = src.slice(re.lastIndex).match(/^\s*:/);
      if (next) c = "tok-prop";
    }
    out.push({ t: tok, c });
  }
  return out;
}

const TOKS = tokenize(SOURCE);

function CodeWindow({ typing = true }: { typing?: boolean }) {
  const [count, setCount] = useState(typing ? 0 : TOKS.length);
  const cursorRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!typing) return;
    let i = 0;
    let last = performance.now();
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= TOKS.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [typing]);

  // split into lines
  const lines: { ln: number; toks: Tok }[] = [];
  let cur: Tok = [];
  let ln = 1;
  TOKS.slice(0, count).forEach((tok) => {
    const parts = tok.t.split("\n");
    parts.forEach((p, i) => {
      if (i > 0) {
        lines.push({ ln, toks: cur });
        cur = [];
        ln++;
      }
      if (i === 0 && cur.length === 0 && p === "") {
        // just newline
        lines.push({ ln, toks: cur });
        ln++;
      } else {
        cur.push({ t: p, c: tok.c });
      }
    });
  });
  lines.push({ ln, toks: cur });

  return (
    <div className="code-window">
      <div className="lights">
        <i className="r" /><i className="y" /><i className="g" />
        <span className="title">developer.ts — hammad.safi</span>
      </div>
      <div className="code-body">
        {lines.map((l, i) => (
          <div key={i} className="line">
            <span className="ln mono">{l.ln}</span>
            <span className="lc">
              {l.toks.map((tt, j) => (
                <span key={j} className={tt.c ?? ""}>{tt.t}</span>
              ))}
              {i === lines.length - 1 && <span ref={cursorRef} className="blinker" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.3"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-40 section">
      <div className="noise" />
      <div className="container-x relative">
        <header className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-4"
            >
              01 — About
            </motion.p>
            <SplitText
              as="h2"
              className="font-display text-4xl md:text-6xl tracking-tight"
              text="Code tells the story. Here's mine."
            />
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div style={{ y: parallax }} className="lg:col-span-7">
            <CodeWindow />
          </motion.div>

          <div className="lg:col-span-5 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-soft leading-relaxed text-[15px] md:text-base"
            >
              I like software that feels considered — fast, honest, and a little bit delightful.
              My work sits where AI meets product: turning research-grade models into
              reliable applications people actually want to use.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-soft leading-relaxed text-[15px] md:text-base"
            >
              Right now I'm building an <span className="text-[var(--fg)] font-medium">AI Prompt Coaching System</span> —
              a tool that helps people write better prompts by analysing intent, surfacing
              missing dimensions, and reconstructing stronger versions.
            </motion.p>

            <div className="pt-4 grid grid-cols-2 gap-3">
              {[
                ["Location", "Hatfield, UK"],
                ["Education", "MSc Adv. CS"],
                ["Focus", "AI · Full-Stack"],
                ["Availability", "Open to work"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border hairline p-4 bg-elev/60">
                  <p className="eyebrow mb-1">{k}</p>
                  <p className="font-medium text-[14px]">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
