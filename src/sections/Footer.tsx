import { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="border-t border-paper-300/60 py-6 dark:border-paper-800">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-2 text-xs text-paper-500 md:flex-row md:items-center">
          <div>© {year} Hammad Safi. Designed & built with care.</div>
          <div className="font-mono uppercase tracking-[0.2em]">end · {year}</div>
        </div>
      </div>
    </footer>
  )
}
