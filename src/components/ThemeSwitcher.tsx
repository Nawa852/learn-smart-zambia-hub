import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Palette, Waves, Sunset, TreePine, MapPin, Check } from "lucide-react";

type ThemeType = 'light' | 'dark' | 'zambian' | 'ocean' | 'sunset' | 'forest';

const themes: { id: ThemeType; name: string; icon: React.ElementType }[] = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'zambian', name: 'Zambian Heritage', icon: MapPin },
  { id: 'ocean', name: 'Ocean Blue', icon: Waves },
  { id: 'sunset', name: 'Sunset', icon: Sunset },
  { id: 'forest', name: 'Forest', icon: TreePine },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('edu-zambia-theme') as ThemeType) || 'light';
    }
    return 'light';
  });

  const applyTheme = (theme: ThemeType) => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-zambian', 'theme-ocean', 'theme-sunset', 'theme-forest');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme !== 'light') {
      root.classList.add(`theme-${theme}`);
    }
    
    localStorage.setItem('edu-zambia-theme', theme);
    setCurrentTheme(theme);
  };

  useEffect(() => {
    applyTheme(currentTheme);
  }, []);

  const CurrentIcon = themes.find(t => t.id === currentTheme)?.icon || Palette;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CurrentIcon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => applyTheme(theme.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <theme.icon className="h-4 w-4" />
              <span>{theme.name}</span>
            </div>
            {currentTheme === theme.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
