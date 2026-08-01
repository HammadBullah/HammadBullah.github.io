export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3"><div className="label">01 — About</div></div>
          <div className="md:col-span-9">
            <h2 className="max-w-3xl text-3xl font-light leading-tight tracking-tight md:text-4xl">
              I build software that's <span className="text-cyan">thoughtful</span> —
              quiet on the surface, rigorous underneath.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I'm an AI and software engineer who likes problems where machine learning
                meets real users — computer-vision systems that see, mobile apps people
                open daily, and backend infrastructure that quietly holds it all together.
              </p>
              <p>
                I care as much about model accuracy and clean data pipelines as about
                the latency of a button press and the weight of a typeface. The best
                software, in my view, is the kind that disappears.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
              <Fact k="Location" v="Hatfield, UK"/>
              <Fact k="Education" v="MSc Adv. Computer Science"/>
              <Fact k="University" v="Univ. of Hertfordshire"/>
              <Fact k="Email" v="hammabdullah@gmail.com"/>
              <Fact k="Phone" v="+44 7352 664787"/>
              <Fact k="Languages" v="English · Urdu · Pashto"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fact({k,v}:{k:string;v:string}) {
  return (
    <div>
      <div className="label mb-1">{k}</div>
      <div className="text-sm text-white/90">{v}</div>
    </div>
  )
}
