import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark'
interface ThemeCtx { theme: Theme }
const ThemeContext = createContext<ThemeCtx | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: Theme = 'dark'
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  }, [])
  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
