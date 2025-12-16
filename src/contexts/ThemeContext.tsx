import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = 'light' | 'dark' | 'zambian' | 'ocean' | 'sunset' | 'forest';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: { id: ThemeType; name: string; colors: string[] }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: { id: ThemeType; name: string; colors: string[] }[] = [
  { id: 'light', name: 'Light', colors: ['#ffffff', '#6366f1', '#8b5cf6'] },
  { id: 'dark', name: 'Dark', colors: ['#0f172a', '#6366f1', '#8b5cf6'] },
  { id: 'zambian', name: 'Zambian Heritage', colors: ['#f97316', '#10b981', '#fbbf24'] },
  { id: 'ocean', name: 'Ocean Blue', colors: ['#0ea5e9', '#06b6d4', '#3b82f6'] },
  { id: 'sunset', name: 'Sunset', colors: ['#f97316', '#ef4444', '#ec4899'] },
  { id: 'forest', name: 'Forest', colors: ['#22c55e', '#10b981', '#059669'] },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('edu-zambia-theme') as ThemeType) || 'light';
    }
    return 'light';
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('edu-zambia-theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'theme-zambian', 'theme-ocean', 'theme-sunset', 'theme-forest');
    
    // Add new theme class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme !== 'light') {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
