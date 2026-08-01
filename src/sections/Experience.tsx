const entries = [
  { year: '2024 — Present', role: 'MSc Advanced Computer Science', org: 'University of Hertfordshire', desc: 'ML, distributed systems, AI research — LSTM forecasting dissertation.' },
  { year: '2023 — 2024',    role: 'Freelance ML & Full-Stack Engineer', org: 'Independent', desc: 'Shipping Flutter apps, CV prototypes and internal tooling for early-stage startups.' },
  { year: '2023',          role: 'Research — Drowning Detection', org: 'Computer Vision Lab', desc: 'YOLOv9/TF pipeline — 89% mAP@0.5 at 32fps on edge-class hardware.' },
  { year: '2022 — 2023',   role: 'Mobile Engineer — PlucknPay', org: 'Founding Engineer', desc: 'Shipped Flutter + Firebase farm-to-consumer marketplace end to end.' },
]

export default function Experience() {
  return (
    <section id="experience" className="section bg-surface/30">
      <div className="container">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3"><div className="label">04 — Experience</div></div>
          <div className="md:col-span-9">
            <h2 className="max-w-2xl text-3xl font-light tracking-tight md:text-4xl">
              A short <span className="text-orange">chronology</span>.
            </h2>
          </div>
        </div>
        <ol className="relative md:pl-8">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 md:block"/>
          {entries.map((e, i) => (
            <li key={i} className="grid gap-4 border-t border-white/10 py-6 md:grid-cols-12 md:gap-8 md:border-t-0 md:py-5">
              <div className="mono text-[11px] uppercase tracking-widest text-muted md:col-span-3 relative">
                <span className="hidden md:block">
                  <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_#00D4FF]"/>
                  {e.year}
                </span>
                <span className="md:hidden">{e.year}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-lg font-medium">{e.role}</h3>
                <div className="text-xs text-muted mono">{e.org}</div>
                <p className="mt-1.5 max-w-2xl text-sm text-muted">{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
