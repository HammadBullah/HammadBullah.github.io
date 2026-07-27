import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Locked to DARK for the cyber-noir theme. Kept for API compatibility with existing components.
type Theme = "dark";
interface ThemeContextValue { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void; }

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<Theme>("dark");
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const toggle = () => {};
  const setTheme = () => {};
  return <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
