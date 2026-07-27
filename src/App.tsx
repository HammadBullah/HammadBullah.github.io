import { useEffect } from 'react'
import Navbar from './components/Navbar'
import StackedSection from './components/StackedSection'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  useEffect(() => {
    document.body.style.opacity = '0'
    requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      document.body.style.opacity = '1'
    })
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Paper texture stack — fixed, non-interactive */}
      <span className="paper-tint" aria-hidden />
      <span className="paper-grain" aria-hidden />
      <span className="paper-fibers" aria-hidden />
      <span className="paper-dust" aria-hidden />

      <Navbar />

      <main>
        <StackedSection id="top" tone="hero">
          <Hero />
        </StackedSection>

        <StackedSection id="about" index={1}>
          <About />
        </StackedSection>

        <StackedSection id="skills" index={2}>
          <Skills />
        </StackedSection>

        <StackedSection id="work" index={3}>
          <Projects />
        </StackedSection>

        <StackedSection id="experience" index={4}>
          <Experience />
        </StackedSection>

        <StackedSection id="contact" index={5} tone="last">
          <Contact />
          <Footer />
        </StackedSection>
      </main>
    </div>
  )
}
