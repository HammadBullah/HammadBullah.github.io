const groups = [
  { title: 'Machine Learning', items: ['TensorFlow','PyTorch','YOLOv9','Computer Vision','LSTMs','MLOps'] },
  { title: 'Languages',        items: ['Python','TypeScript','Dart','SQL','Java','C'] },
  { title: 'Frontend',         items: ['React','Next.js','Vite','Tailwind CSS','Framer Motion'] },
  { title: 'Mobile',           items: ['Flutter','Firebase','Responsive Design'] },
  { title: 'Backend & DevOps', items: ['Node.js','FastAPI','PostgreSQL','Docker','AWS'] },
]

export default function Skills() {
  return (
    <section id="skills" className="section bg-surface/30">
      <div className="container">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3"><div className="label">02 — Skills</div></div>
          <div className="md:col-span-9">
            <h2 className="max-w-2xl text-3xl font-light tracking-tight md:text-4xl">
              A small, sharp <span className="text-violet">set of tools</span> — picked for leverage.
            </h2>
          </div>
        </div>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(g => (
            <div key={g.title}>
              <div className="label mb-3">{g.title}</div>
              <ul className="border-t border-white/10">
                {g.items.map(item => (
                  <li key={item} className="flex items-baseline justify-between border-b border-white/10 py-2.5 text-sm">
                    <span>{item}</span>
                    <span className="text-white/30">—</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
