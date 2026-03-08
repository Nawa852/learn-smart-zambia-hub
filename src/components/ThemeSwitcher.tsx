import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Palette, Waves, Sunset, TreePine, MapPin, Check, Zap, Crown, CloudMoon } from "lucide-react";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";

const themeIcons: Record<ThemeType, React.ElementType> = {
  light: Sun,
  dark: Moon,
  zambian: MapPin,
  ocean: Waves,
  sunset: Sunset,
  forest: TreePine,
  neon: Zap,
  royal: Crown,
  midnight: CloudMoon,
};

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  const CurrentIcon = themeIcons[theme] || Palette;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CurrentIcon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 bg-popover z-50">
        {themes.map((t) => {
          const Icon = themeIcons[t.id] || Palette;
          return (
            <DropdownMenuItem
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{t.name}</span>
                <div className="flex gap-0.5 ml-1">
                  {t.colors.map((c, i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full border border-border/30" style={{ background: c }} />
                  ))}
                </div>
              </div>
              {theme === t.id && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
