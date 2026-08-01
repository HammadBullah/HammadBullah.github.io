import { ArrowRight, Mail } from 'lucide-react'

const InlineGithub = ({size=16}:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12.1c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
)
const InlineLinkedin = ({size=16}:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.3 18.3v-8H5.7v8h2.6zM7 9.1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11.3 9.2v-4.4c0-2.3-1.2-3.4-2.9-3.4a2.5 2.5 0 00-2.3 1.2v-1h-2.6v8h2.6v-4.5c0-1.2.2-2.3 1.7-2.3s1.5 1.3 1.5 2.4v4.4h2z"/></svg>
)

export default function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
      {/* subtle bg glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]"/>
        <div className="absolute top-40 -right-20 h-[400px] w-[400px] rounded-full bg-violet/10 blur-[120px]"/>
      </div>
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"/>
          </span>
          <span className="mono text-xs uppercase tracking-[0.2em] text-muted">Available for work · Hatfield, UK</span>
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-7xl">
          Hammad Safi.
          <br/>
          <span className="text-muted font-light">AI & software engineer.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          MSc Advanced Computer Science. I build intelligent products across machine learning,
          full-stack web, and mobile — with care for performance, craft, and interfaces that disappear.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#work" className="btn-primary bg-white text-bg hover:bg-cyan">
            View my work <ArrowRight size={16}/>
          </a>
          <a href="mailto:hammabdullah@gmail.com" className="btn-ghost">
            <Mail size={14}/> Email
          </a>
          <div className="flex items-center gap-2 pl-2">
            <a href="https://github.com/HammadBullah" target="_blank" rel="noreferrer" aria-label="GitHub"
               className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-white/30 hover:text-white">
              <InlineGithub/>
            </a>
            <a href="https://www.linkedin.com/in/hammad-safi" target="_blank" rel="noreferrer" aria-label="LinkedIn"
               className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-white/30 hover:text-white">
              <InlineLinkedin/>
            </a>
          </div>
        </div>
        <div className="hairline mt-16 pt-8 grid grid-cols-2 gap-y-4 md:grid-cols-4">
          <Meta label="Currently" value="MSc @ Hertfordshire"/>
          <Meta label="Focus" value="ML · Web · Mobile"/>
          <Meta label="Stack" value="Python · TS · React · Flutter"/>
          <Meta label="Status" value="Open to roles"/>
        </div>
      </div>
    </section>
  )
}

function Meta({label, value}:{label:string;value:string}) {
  return (
    <div>
      <div className="label mb-1">{label}</div>
      <div className="text-sm text-white/90">{value}</div>
    </div>
  )
}
