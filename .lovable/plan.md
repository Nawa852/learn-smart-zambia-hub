

# Clarification: Ministry/NGO Plan Already Implemented

The Ministry/NGO expansion was already completed in a previous message. The 7 pages, 2 database tables (`education_policies`, `ngo_partnerships`), routes, and sidebar navigation are all live.

The plan that is pending implementation is the **Facebook + GitHub Design Overhaul**. Here is the implementation plan:

---

# Facebook + GitHub Design Overhaul — Implementation Plan

## 1. Rewrite Color System (`src/index.css`)

**Dark mode (default — GitHub):** Background `#0D1117`, Card `#161B22`, Primary `#1877F2`, Border `#30363D`, Muted `#8B949E`, Accent `#3FB950`

**Light mode (Facebook):** Background `#F0F2F5`, Card `#FFFFFF`, Primary `#1877F2`, Border `#DADDE1`, Accent `#42B72A`

Delete all 7 theme variants (~200 lines): `.theme-zambian`, `.theme-ocean`, `.theme-sunset`, `.theme-forest`, `.theme-neon`, `.theme-royal`, `.theme-midnight`

Delete all effect classes: `.glass-*`, `.glow-*`, `.gradient-text*`, `.particle-bg`, `.shadow-neon`, `.shadow-glow`, `.hover-lift`, `.hover-glow`, `.animate-float`, `.animate-entrance`, `.animate-magnetic`, `.transform-3d`, `.perspective`

Add: `.shadow-card` (subtle), `.shadow-card-hover` (elevated). Restyle `.custom-scrollbar` to neutral gray. Change body font to `Inter, -apple-system, system-ui, sans-serif`.

## 2. Tailwind Config (`tailwind.config.ts`)
- Set default `--radius` to `0.5rem`

## 3. Simplify Themes (`src/contexts/ThemeContext.tsx`)
- Reduce `ThemeType` to `'light' | 'dark'`
- Remove 7 extra theme entries, default to `'dark'`

## 4. Theme Switcher (`src/components/ThemeSwitcher.tsx`)
- Replace multi-theme grid with a simple light/dark toggle

## 5. TopNavbar (`src/components/Layout/TopNavbar.tsx`)
- Replace `glass-nav` → `bg-card border-b border-border`
- Search input: `rounded-full bg-secondary`
- Avatar fallback: solid `bg-primary` (no gradient)
- Brand text: solid `text-foreground font-bold` (no gradient-text)

## 6. Sidebar (`src/components/Sidebar/RoleBasedSidebar.tsx`)
- Logo box: solid `bg-primary` (no gradient)
- User profile section: `border border-border` (remove `glow-border`, `bg-primary/5`)
- Brand text: solid color (remove `gradient-text`)
- Avatar fallback: solid `bg-primary`

## 7. MainLayout (`src/components/Layout/MainLayout.tsx`)
- Background: plain `bg-background` (remove gradient)
- Footer: `bg-card border-t border-border` (remove glass/blur)

## Files Modified (7 total)
| File | Summary |
|------|---------|
| `src/index.css` | Full color rewrite, delete effects |
| `tailwind.config.ts` | Radius update |
| `src/contexts/ThemeContext.tsx` | Light/dark only |
| `src/components/ThemeSwitcher.tsx` | Simple toggle |
| `src/components/Layout/TopNavbar.tsx` | Solid bg, clean search |
| `src/components/Sidebar/RoleBasedSidebar.tsx` | Remove glows/gradients |
| `src/components/Layout/MainLayout.tsx` | Remove gradient bg |

No database changes. No new routes.

