import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  const [state, setState] = useState<'idle'|'sending'|'sent'>('idle')
  const formRef = useRef<HTMLDivElement>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    setTimeout(() => setState('sent'), 1600)
    setTimeout(() => {
      window.location.href = 'mailto:hammabdullah@gmail.com?subject=From%20portfolio&body=Hi%20Hammad,'
    }, 1800)
  }

  const channels = [
    { label: 'Email', value: 'hammabdullah@gmail.com', href: 'mailto:hammabdullah@gmail.com' },
    { label: 'LinkedIn', value: '/in/hammad-safi', href: 'https://www.linkedin.com/in/hammad-safi' },
    { label: 'GitHub', value: '/HammadBullah', href: 'https://github.com/HammadBullah' },
    { label: 'Phone', value: '+44 7352 664787', href: 'tel:+447352664787' },
  ]

  return (
    <section className="relative w-full h-full">
      <div className="scene-inner absolute inset-0 flex items-center">
        <div className="container-x w-full relative">
          <div className="mono text-[11px] uppercase tracking-[0.3em] text-orange mb-6">
            // 05 · TRANSMIT
          </div>
          <h2 className="text-white mb-10" style={{ fontSize: 'clamp(2.8rem,7vw,6.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
            Transmit <em className="font-serif italic text-cyan">signal</em>.<br/>
            <span className="text-white/40">Let's build something</span><br/>
            <span className="text-white/40"><em className="font-serif italic text-violet">thoughtful</em>.</span>
          </h2>

          <div ref={formRef} className="grid md:grid-cols-5 gap-6 items-end">
            <form onSubmit={onSubmit} className="md:col-span-3 glass-panel rounded-xl p-6 space-y-4 relative overflow-hidden">
              <div className="mono text-[10px] uppercase tracking-widest text-white/40 mb-2">COMPOSE MESSAGE</div>
              <Field label="name" />
              <Field label="email" type="email" />
              <Field label="message" multiline />
              <button type="submit" disabled={state !== 'idle'} data-cursor="hover"
                className="btn-cyan w-full justify-center"
                style={{ cursor: 'none' }}>
                {state === 'idle' && (<><Send size={14}/> Transmit</>)}
                {state === 'sending' && (<>Transmitting<span className="flex gap-0.5 ml-1"><i className="animate-bounce">.</i><i className="animate-bounce" style={{animationDelay:'0.1s'}}>.</i><i className="animate-bounce" style={{animationDelay:'0.2s'}}>.</i></span></>)}
                {state === 'sent' && (<><Check size={14}/> Signal delivered</>)}
              </button>

              <AnimatePresence>
                {state === 'sending' && (
                  <motion.div
                    initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-cyan via-violet to-orange shadow-glow-cyan"
                  />
                )}
                {state === 'sent' && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 20, opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute left-1/2 bottom-10 w-3 h-3 rounded-full bg-cyan shadow-glow-cyan"
                  />
                )}
              </AnimatePresence>
            </form>

            <div className="md:col-span-2 space-y-3">
              {channels.map(c => (
                <a key={c.label} href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                   data-cursor="hover"
                   className="group block glass-panel rounded-xl p-4 transition-all hover:border-cyan/40 hover:shadow-glow-cyan">
                  <div className="mono text-[10px] uppercase tracking-widest text-white/40">{c.label}</div>
                  <div className="mt-1 text-white/90 flex items-center justify-between">
                    <span className="text-sm">{c.value}</span>
                    <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:text-cyan transition"/>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', multiline }: { label: string; type?: string; multiline?: boolean }) {
  const [focused, setFocused] = useState(false)
  return (
    <label className="block relative">
      <span className="mono text-[10px] uppercase tracking-widest text-white/40">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          className="mt-1 w-full bg-transparent border-b border-white/10 text-white/90 placeholder-white/20 py-2 outline-none focus:border-cyan transition resize-none"
          placeholder={`> ${label}...`}
          data-cursor="hover"
        />
      ) : (
        <input
          type={type}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          className="mt-1 w-full bg-transparent border-b border-white/10 text-white/90 placeholder-white/20 py-2 outline-none focus:border-cyan transition"
          placeholder={`> ${label}...`}
          data-cursor="hover"
        />
      )}
      <motion.span
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute left-0 -bottom-px h-px w-full bg-cyan shadow-glow-cyan origin-left"
      />
    </label>
  )
}
