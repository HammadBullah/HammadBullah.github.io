import { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="border-t border-paper-200 py-10 dark:border-paper-800">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-paper-500 md:flex-row md:items-center">
          <div>
            © {year} Hammad Safi. <span className="hidden sm:inline">Designed & built with care.</span>
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.2em]">
            end of transmission — {year}
          </div>
        </div>
      </div>
    </footer>
  )
}
