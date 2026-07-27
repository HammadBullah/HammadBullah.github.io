import { useMemo } from "react";
import { motion, useReducedMotion as useRM } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function SplitText({
  text, className = "", as = "h2",
  delay = 0, stagger = 0.015, duration = 0.7,
}: SplitTextProps) {
  const reduced = useRM();
  const Tag: any = motion[as] ?? motion.h2;
  const words = useMemo(() => text.split(" "), [text]);
  if (reduced) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      {words.map((w,i)=>(
        <span key={i} className="inline-block mr-[0.25em] align-top overflow-hidden">
          <motion.span className="inline-block will-change-transform"
            variants={{hidden:{y:"110%"}, visible:{y:"0%", transition:{duration,ease:[0.22,1,0.36,1]}}}}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
