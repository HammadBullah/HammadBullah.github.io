import { useEffect, useRef, useState } from 'react'

type Line = { kind: 'out' | 'in' | 'err' | 'ok'; text: string }

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'HammadOS shell v2.4.1 — type `help` for commands.' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200)
  }, [open])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    const add = (text: string, kind: Line['kind'] = 'out') =>
      setLines(ls => [...ls, { kind: 'in', text: `hammad@workspace:~$ ${raw}` }, { kind, text }])

    if (!cmd) { setLines(ls => [...ls, { kind: 'in', text: `hammad@workspace:~$` }]); return }
    setHistory(h => [...h, raw]); setHistIdx(-1)

    if (cmd === 'help') {
      add(`Available commands:
   whoami     — display profile
   projects   — list projects
   skills     — list tech stack
   experience — show history
   contact    — contact info
   github     — open github
   linkedin   — open linkedin
   resume     — request resume
   sudo hire hammad — you know what it does
   clear      — clear screen
   exit       — close terminal`, 'ok')
    } else if (cmd === 'whoami') {
      add('Hammad Safi · AI & Software Engineer · MSc Advanced Computer Science @ Univ. of Hertfordshire.', 'ok')
    } else if (cmd === 'projects') {
      add(`· Drowning Detection    — YOLOv9 / TF, 89% mAP@0.5 @ 32fps
· PlucknPay             — Flutter/Dart + Firebase marketplace
· Weather LSTM          — MSc research, time-series forecasting
· Smart Agriculture IoT — ESP + Flutter dashboard`, 'ok')
    } else if (cmd === 'skills') {
      add('Python · TypeScript · React · Flutter · TF · PyTorch · Node · FastAPI · Docker · AWS · Firebase · PostgreSQL · Mongo · Git', 'ok')
    } else if (cmd === 'experience') {
      add(`2024–present  MSc Advanced Computer Science, Univ. of Hertfordshire
2023–2024     Freelance ML & Full-stack Engineer
2023          Research — Drowning Detection (CV Lab)
2022–2023     Mobile Engineer, PlucknPay (Founding)`, 'ok')
    } else if (cmd === 'contact') {
      add('email   hammabdullah@gmail.com\nphone   +44 7352 664787\ngithub  github.com/HammadBullah\nlinkedin /in/hammad-safi', 'ok')
    } else if (cmd === 'github') {
      window.open('https://github.com/HammadBullah', '_blank')
      add('Opening github.com/HammadBullah ...', 'ok')
    } else if (cmd === 'linkedin') {
      window.open('https://www.linkedin.com/in/hammad-safi', '_blank')
      add('Opening LinkedIn ...', 'ok')
    } else if (cmd === 'resume') {
      window.location.href = 'mailto:hammabdullah@gmail.com?subject=Resume%20request'
      add('Resume available on request — opening email...', 'ok')
    } else if (cmd === 'sudo hire hammad' || cmd === 'sudo hire me') {
      add(`[████████████████████] 100%
Welcome to the team. 🎉  Email sent.`, 'ok')
      setTimeout(() => window.location.href = 'mailto:hammabdullah@gmail.com?subject=Let%27s%20work%20together', 600)
    } else if (cmd === 'clear') {
      setLines([])
    } else if (cmd === 'exit') {
      onClose()
    } else {
      add(`command not found: ${cmd}. Try 'help'.`, 'err')
    }
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      if (next >= 0) { setHistIdx(next); setInput(history[history.length - 1 - next] ?? '') }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      if (next < 0) { setHistIdx(-1); setInput('') }
      else { setHistIdx(next); setInput(history[history.length - 1 - next] ?? '') }
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        onClick={e => e.stopPropagation()}
        className="glass-panel relative w-full max-w-2xl rounded-xl overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(0,212,255,0.25)' }}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <div className="flex gap-1.5">
            <button onClick={onClose} className="h-3 w-3 rounded-full bg-red-500/80" aria-label="close" data-cursor="hover"/>
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="mono text-[11px] text-white/50">— hammad@workspace —</span>
          <span />
        </div>
        <div
          className="mono text-[13px] leading-relaxed p-5 h-[60vh] overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === 'in'  ? 'text-white/80 whitespace-pre' :
                l.kind === 'err' ? 'text-red-400 whitespace-pre' :
                l.kind === 'ok'  ? 'text-cyan whitespace-pre' :
                                   'text-white/60 whitespace-pre'
              }
            >
              {l.text}
            </div>
          ))}
          <div className="flex items-center text-cyan">
            <span className="text-white/60">hammad@workspace:~$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { run(input); setInput(''); return }
                onKey(e)
              }}
              className="flex-1 bg-transparent outline-none text-cyan caret-cyan"
              autoFocus
              spellCheck={false}
              aria-label="terminal input"
            />
            <span className="w-2 h-4 bg-cyan animate-pulse ml-0.5" />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  )
}
