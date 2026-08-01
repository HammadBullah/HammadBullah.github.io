import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontal scroll: takes a track element and translates its inner flex
 * container leftwards based on vertical scroll. Number of scenes and total
 * scroll distance are computed from the child `.scene` count.
 */
export function useHScroll(wrapperRef: React.RefObject<HTMLDivElement | null>, innerRef: React.RefObject<HTMLDivElement | null>) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const inner = innerRef.current
    if (!wrapper || !inner) return

    ctxRef.current?.revert()
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('.scene', inner)
      const total = scenes.length
      const distance = () => (total - 1) * window.innerWidth

      // Set wrapper height to total scroll distance + viewport
      gsap.set(wrapper, { height: () => distance() + window.innerHeight })

      // Horizontal translate
      gsap.to(inner, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Per-scene animations — each scene fades/slides in when centered
      scenes.forEach((scene, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: () => `top+=${i * window.innerWidth} top`,
            end: () => `+=${window.innerWidth}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        // Scene content subtle parallax
        const innerContent = scene.querySelector('.scene-inner') as HTMLElement | null
        if (innerContent && i > 0) {
          gsap.set(innerContent, { opacity: 0, x: 80, scale: 0.96 })
          tl.to(innerContent, { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'power2.out' })
        }
        // Scene rotation / zoom variety
        if (scene.dataset.effect === 'rotate') {
          gsap.set(scene, { rotate: 3, scale: 0.96 })
          tl.to(scene, { rotate: 0, scale: 1, duration: 1, ease: 'power2.out' }, 0)
        }
        if (scene.dataset.effect === 'zoom') {
          gsap.set(scene, { scale: 0.85, opacity: 0.3 })
          tl.to(scene, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
        }
        if (scene.dataset.effect === 'diagonal') {
          gsap.set(scene, { y: 120 })
          tl.to(scene, { y: 0, duration: 1, ease: 'power2.out' }, 0)
        }
      })

      ScrollTrigger.refresh()
    }, wrapper)
    ctxRef.current = ctx

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
