import { motion } from "framer-motion";

const ROLES = [
  {
    years: "2026 — Present",
    role: "Customer Service Operations",
    company: "Ladbrokes / Entain",
    place: "Hatfield, UK",
    body:
      "Operations and compliance in high-pressure retail environments — trained to stay calm, precise and systematic under load.",
  },
  {
    years: "2023 — 2025",
    role: "Flutter & AI Developer",
    company: "Freelance",
    place: "Remote",
    body:
      "Shipped AI-powered mobile apps, including computer-vision models achieving 89% accuracy on deep-learning tasks and full Flutter products with Firebase.",
  },
  {
    years: "2022 — 2023",
    role: "Web & Design Lead",
    company: "Amity University",
    place: "Dubai, UAE",
    body:
      "Led web and design infrastructure for student events, managing a team and digital systems for 500+ attendees across events and portals.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-40 px-6 sm:px-10 bg-soft">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-16">
          <div>
            <p className="eyebrow mb-4">02 — Experience</p>
            <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight">
              A quiet track record of shipping.
            </h2>
          </div>
          <a
            href="#contact"
            className="text-sm text-soft hover:text-[var(--fg)] transition-colors underline underline-offset-4 decoration-[var(--hairline)]"
          >
            Request full CV →
          </a>
        </div>

        <ol className="relative border-l hairline pl-8 md:pl-12 space-y-12 md:space-y-16">
          {ROLES.map((r, i) => (
            <motion.li
              key={r.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22,1,0.36,1] }}
              className="relative"
            >
              <span className="absolute -left-[41px] md:-left-[49px] top-1.5 w-3 h-3 rounded-full bg-[var(--fg)] ring-4 ring-[var(--bg-soft)]" />
              <div className="grid md:grid-cols-4 gap-4 md:gap-10">
                <div className="md:col-span-1">
                  <p className="eyebrow">{r.years}</p>
                  <p className="text-soft text-sm mt-1">{r.place}</p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                    {r.role}
                  </h3>
                  <p className="text-soft mt-1">{r.company}</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed max-w-2xl">
                    {r.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
