import { useMemo } from "react";
import { motion, useReducedMotion as useRM } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  duration?: number;
  startOnView?: boolean;
  once?: boolean;
}

export function SplitText({
  text,
  className = "",
  as = "h1",
  delay = 0,
  stagger = 0.025,
  duration = 0.8,
  startOnView = true,
  once = true,
}: SplitTextProps) {
  const reduced = useRM();
  const MotionTag = (motion as any)[as] ?? motion.h1;
  const words = useMemo(() => text.split(" "), [text]);

  if (reduced) return <MotionTag className={className}>{text}</MotionTag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(startOnView
        ? { whileInView: "visible", viewport: { once, margin: "-80px" } }
        : { animate: "visible" })}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] align-top overflow-hidden">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration, ease: [0.22, 1, 0.36, 1] as any },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
