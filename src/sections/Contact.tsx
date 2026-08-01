import { ArrowUpRight, Mail, Phone } from 'lucide-react'

const InlineGithub = ({size=14}:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12.1c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
)
const InlineLinkedin = ({size=14}:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.3 18.3v-8H5.7v8h2.6zM7 9.1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11.3 9.2v-4.4c0-2.3-1.2-3.4-2.9-3.4a2.5 2.5 0 00-2.3 1.2v-1h-2.6v8h2.6v-4.5c0-1.2.2-2.3 1.7-2.3s1.5 1.3 1.5 2.4v4.4h2z"/></svg>
)

const channels = [
  { label: 'Email', value: 'hammabdullah@gmail.com', href: 'mailto:hammabdullah@gmail.com', Icon: Mail },
  { label: 'LinkedIn', value: '/in/hammad-safi', href: 'https://www.linkedin.com/in/hammad-safi', Icon: InlineLinkedin },
  { label: 'GitHub', value: '/HammadBullah', href: 'https://github.com/HammadBullah', Icon: InlineGithub },
  { label: 'Phone', value: '+44 7352 664787', href: 'tel:+447352664787', Icon: Phone },
]

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3"><div className="label">05 — Contact</div></div>
          <div className="md:col-span-9">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl leading-[1.05]">
              Have something <br/>
              <span className="text-cyan">thoughtful</span> to build?
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted">
              I'm open to full-time roles, research collaborations, and select freelance work.
              Email is the best way to reach me — I reply within a day or two.
            </p>
            <a href="mailto:hammabdullah@gmail.com" className="btn-primary mt-8 bg-cyan text-bg hover:bg-white">
              Say hello <ArrowUpRight size={16}/>
            </a>
          </div>
        </div>
        <div className="hairline pt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
               className="group block transition hover:-translate-y-0.5">
              <div className="label mb-1.5 group-hover:text-cyan transition-colors">{c.label}</div>
              <div className="flex items-center gap-1.5 text-sm text-white/80 group-hover:text-white">
                <c.Icon size={14}/>
                <span>{c.value}</span>
                {c.href.startsWith('http') && <ArrowUpRight size={12} className="opacity-50"/>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
