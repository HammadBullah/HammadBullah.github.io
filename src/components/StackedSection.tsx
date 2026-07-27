import { type ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * StackedSection — "deck of paper cards" scroll effect.
 *
 * Pattern:
 *  - Each card is position: sticky; top: 0 so it pins to viewport top.
 *  - A small top padding on each wrapper makes the next card enter while the
 *    previous is still pinned, sliding up over it (later DOM paints above).
 *  - While being covered we scale down slightly, round the top corners, and
 *    grow a soft paper shadow — so the card reads as "tucked under".
 */

const OVERLAP = '3.5rem'

export default function StackedSection({
  children,
  id,
  index = 0,
  tone = 'default',
  bgClass,
}: {
  children: ReactNode
  id?: string
  index?: number
  tone?: 'hero' | 'default' | 'last'
  bgClass?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress: coverProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Animate only while the NEXT card is covering THIS one.
  const scale = useTransform(coverProgress, [0.25, 0.9], [1, 0.955])
  const radius = useTransform(coverProgress, [0.1, 0.7], [0, 20])
  const shadow = useTransform(
    coverProgress,
    [0, 0.4, 1],
    [
      '0 0 0 rgba(60,40,15,0)',
      '0 -10px 40px -10px rgba(60,40,15,0.22)',
      '0 -18px 60px -14px rgba(60,40,15,0.4)',
    ]
  )

  const bg = bgClass ?? 'bg-paper-50 dark:bg-paper-950'

  if (tone === 'hero') {
    return (
      <div id={id} className="relative" style={{ zIndex: 5 }}>
        {children}
      </div>
    )
  }

  return (
    <div
      id={id}
      ref={ref}
      className="relative"
      style={{
        paddingTop: index === 0 ? '1rem' : OVERLAP,
        zIndex: 10 + index, // later cards stack above
      }}
    >
      <motion.div
        style={{
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          boxShadow: shadow,
          scale,
          transformOrigin: 'top center',
        }}
        className={`sticky top-0 overflow-hidden ${bg}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
