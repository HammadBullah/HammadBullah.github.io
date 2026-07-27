import { type ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * StackedSection — full-screen "deck of cards" pinned scroll.
 *
 * Each card fills the viewport and stays fixed as you scroll, while the next
 * card slides up over it (classic stacked-pinned pattern).
 *
 *   wrapper: h-[200svh]   — enough room for card to pin + next to cover it
 *   card:    sticky top-0 h-svh
 *
 * The first screen (0..100svh into wrapper) is the pinned phase during which
 * the next card rides up from below. We animate scale/radius/shadow in that
 * band so the covered card looks "tucked".
 */

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // cover goes 0→1 while the *next* card is sliding over this one (second half of wrapper scroll)
  const cover = useTransform(scrollYProgress, [0.45, 0.95], [0, 1])
  const scale = useTransform(cover, [0, 1], [1, 0.93])
  const radius = useTransform(cover, [0, 1], [0, 28])
  const shadow = useTransform(cover, [0, 1], [
    '0 0 0 rgba(60,40,15,0)',
    '0 -28px 80px -20px rgba(60,40,15,0.55)',
  ])
  // slight darkening so it looks further back
  const bright = useTransform(cover, [0, 1], [1, 0.85])

  const bg = bgClass ?? 'bg-paper-50 dark:bg-paper-950'

  if (tone === 'hero') {
    return (
      <div id={id} className="relative" style={{ zIndex: 5 }}>
        <section className={`min-h-svh ${bg}`}>{children}</section>
      </div>
    )
  }

  if (tone === 'last') {
    return (
      <div id={id} ref={ref} className="relative" style={{ zIndex: 10 + index }}>
        <motion.section
          style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius, boxShadow: shadow }}
          className={`relative ${bg}`}
        >
          {children}
        </motion.section>
      </div>
    )
  }

  return (
    <div
      id={id}
      ref={ref}
      className="relative"
      style={{ height: '200svh', zIndex: 10 + index }}
    >
      <motion.div
        style={{
          scale,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          boxShadow: shadow,
          filter: useTransform(bright, v => `brightness(${v})`),
          transformOrigin: 'top center',
        }}
        className={`sticky top-0 h-svh overflow-hidden ${bg}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
