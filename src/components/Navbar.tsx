import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="container">
        <nav className={`flex items-center justify-between rounded-full border px-5 py-2.5 transition-all ${scrolled ? 'border-white/10 bg-bg/70 backdrop-blur-xl' : 'border-transparent'}`}>
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan text-[0.7rem] font-bold text-bg">HS</span>
            <span className="hidden sm:inline">Hammad Safi</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="mailto:hammabdullah@gmail.com" className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-bg transition hover:bg-cyan">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
