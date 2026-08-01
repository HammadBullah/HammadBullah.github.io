import { motion } from 'framer-motion'

export default function About() {
  const stats = [
    { k: 'Location', v: 'Hatfield, UK' },
    { k: 'Education', v: 'MSc Adv. CS' },
    { k: 'Focus', v: 'ML · Web · Mobile' },
    { k: 'Status', v: 'Open to roles' },
  ]
  return (
    <section className="scene relative" data-effect="rotate">
      <div className="scene-inner absolute inset-0 flex items-center">
        <div className="container-x w-full">
          <div className="mono text-[11px] uppercase tracking-[0.3em] text-cyan mb-8">
            // 01 · PROFILE
          </div>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="mega-title text-white" style={{ fontSize: 'clamp(2.5rem,7vw,6rem)' }}>
                I build software <br/>
                that's <em className="font-serif italic text-violet">thoughtful</em> —<br/>
                <span className="text-white/50">quiet on the surface,</span><br/>
                <span className="text-white/50">rigorous underneath.</span>
              </h2>
              <p className="mt-10 max-w-2xl text-lg text-white/70 leading-relaxed">
                AI & software engineer working where machine learning meets real users —
                computer-vision systems that see, mobile apps people open daily, and
                backend infrastructure that quietly holds it all together.
                I care about the latency of a button press and the weight of a typeface.
              </p>
            </div>
            <div className="md:col-span-4 space-y-5">
              <div className="glass-panel rounded-xl p-6">
                <div className="mono text-[11px] text-white/40 uppercase tracking-widest mb-4">IDENTITY</div>
                {stats.map(s => (
                  <div key={s.k} className="flex justify-between items-baseline py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/40 text-sm">{s.k}</span>
                    <span className="text-white/90 text-sm">{s.v}</span>
                  </div>
                ))}
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="relative mx-auto w-40 h-40 flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full border border-cyan/30 animate-spin-slow"/>
                <div className="absolute inset-4 rounded-full border border-violet/30 animate-spin-slow" style={{animationDirection:'reverse', animationDuration:'20s'}}/>
                <div className="absolute inset-8 rounded-full border border-orange/20 animate-spin-slow" style={{animationDuration:'14s'}}/>
                <div className="h-3 w-3 rounded-full bg-cyan shadow-glow-cyan"/>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
