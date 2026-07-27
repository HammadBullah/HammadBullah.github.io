import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { cn } from '../lib/utils'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/London',
        }) + ' GMT'
      )
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo',
        scrolled ? 'py-3' : 'py-6'
      )}
    >
      <div className="container-x">
        <nav
          className={cn(
            'flex items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500 ease-out-expo',
            scrolled
              ? 'border-paper-300/60 bg-paper-50/70 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-12px_rgba(60,40,15,0.18)] dark:border-paper-800/70 dark:bg-paper-900/60 dark:shadow-[0_1px_0_rgba(255,220,170,0.04)_inset,0_8px_24px_-12px_rgba(0,0,0,0.7)]'
              : 'border-transparent bg-transparent'
          )}
        >
          <a href="#top" className="flex items-center gap-2 font-medium tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-paper-900 text-[0.7rem] font-semibold text-paper-50 dark:bg-paper-100 dark:text-paper-950">
              HS
            </span>
            <span className="hidden sm:inline">Hammad Safi</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-1.5 text-sm text-paper-600 transition-colors hover:text-paper-900 dark:text-paper-400 dark:hover:text-paper-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[11px] text-paper-400 md:inline dark:text-paper-500">
              {time}
            </span>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper-200 text-paper-600 transition-all hover:border-paper-300 hover:text-paper-900 dark:border-paper-800 dark:text-paper-400 dark:hover:border-paper-700 dark:hover:text-paper-100"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
