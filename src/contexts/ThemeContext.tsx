import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = 'light' | 'dark' | 'zambian' | 'ocean' | 'sunset' | 'forest' | 'neon' | 'royal' | 'midnight';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: { id: ThemeType; name: string; colors: string[] }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: { id: ThemeType; name: string; colors: string[] }[] = [
  { id: 'dark', name: 'Dark Premium', colors: ['#0f1117', '#2dd4bf', '#a78bfa'] },
  { id: 'light', name: 'Light', colors: ['#fafafa', '#14b8a6', '#8b5cf6'] },
  { id: 'zambian', name: 'Zambian Heritage', colors: ['#1a120a', '#f97316', '#10b981'] },
  { id: 'ocean', name: 'Deep Ocean', colors: ['#0a1628', '#0ea5e9', '#06b6d4'] },
  { id: 'sunset', name: 'Sunset Blaze', colors: ['#1a0c0a', '#f97316', '#ec4899'] },
  { id: 'forest', name: 'Emerald Forest', colors: ['#0a1a0f', '#22c55e', '#10b981'] },
  { id: 'neon', name: 'Neon Pulse', colors: ['#0a0a14', '#00ff88', '#ff00ff'] },
  { id: 'royal', name: 'Royal Gold', colors: ['#0f0d1a', '#fbbf24', '#7c3aed'] },
  { id: 'midnight', name: 'Midnight Blue', colors: ['#060d1f', '#3b82f6', '#6366f1'] },
];

const THEME_CLASSES = themes.map(t => t.id === 'dark' ? 'dark' : t.id === 'light' ? 'light' : `theme-${t.id}`);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('edu-zambia-theme') as ThemeType) || 'zambian';
    }
    return 'dark';
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('edu-zambia-theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    THEME_CLASSES.forEach(cls => root.classList.remove(cls));

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.add('light');
    } else {
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
