export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-muted">
          <div>© {year} Hammad Safi. Designed &amp; built with care.</div>
          <div className="mono text-xs uppercase tracking-[0.2em] text-white/40">end · {year}</div>
        </div>
      </div>
    </footer>
  )
}
