import { useEffect, useRef, useState } from 'react'
import { Home, User, Sparkles, FolderKanban, Clock, Radio, Terminal as TermIcon } from 'lucide-react'

const items = [
  { id: 'intro',     label: 'Intro',     icon: Home },
  { id: 'about',     label: 'Profile',   icon: User },
  { id: 'skills',    label: 'Skills',    icon: Sparkles },
  { id: 'work',      label: 'Work',      icon: FolderKanban },
  { id: 'experience',label: 'Chronicle', icon: Clock },
  { id: 'contact',   label: 'Transmit',  icon: Radio },
  { id: 'terminal',  label: 'Terminal',  icon: TermIcon },
]

export default function Dock({ onNav, onTerminal }: { onNav: (id: string) => void; onTerminal: () => void }) {
  const [visible, setVisible] = useState(false)
  const dockRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let t: number
    const show = () => { setVisible(true); clearTimeout(t); t = window.setTimeout(hide, 2500) }
    const hide = () => { if (!dockRef.current?.matches(':hover')) setVisible(false) }
    const onMove = (e: MouseEvent) => { if (e.clientY > window.innerHeight - 140) show() }
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); setVisible(v => !v) }
      if (e.key === 'Escape') setVisible(false)
      if (e.key.toLowerCase() === 't') { onTerminal() }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('keydown', onKey)
    show()
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [onTerminal])

  return (
    <nav
      ref={dockRef}
      className={`dock glass-panel ${visible ? 'visible' : ''}`}
      role="navigation"
      aria-label="Workspace dock"
    >
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className="dock-item"
          onClick={() => { id === 'terminal' ? onTerminal() : onNav(id) }}
          aria-label={label}
          data-cursor="hover"
        >
          <span className="dock-label">{label}</span>
          <Icon size={20} />
        </button>
      ))}
    </nav>
  )
}
