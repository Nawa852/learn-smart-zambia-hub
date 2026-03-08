

# Improve UI: Theme-Aware Profile Page + Bulk Fix Hardcoded Colors

## Problem Summary
1. **Profile page (`src/pages/Profile.tsx`)** is the most visible issue — uses hardcoded `bg-gray-50`, `text-gray-600`, `bg-yellow-50` etc. that break in dark mode. Also has mock data instead of real profile data, and non-functional Quick Actions buttons.
2. **87 pages** across the codebase use hardcoded gray/color classes instead of theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-muted`). This is a systemic issue but Profile is the priority since the user is on that page.

## Plan

### 1. Rebuild Profile Page (`src/pages/Profile.tsx`)
Make it match the quality of the Settings page — theme-aware, functional, using real data.

- Replace `bg-gray-50` with `bg-background`, `text-gray-600` with `text-muted-foreground`, `bg-yellow-50` with `bg-muted`, etc.
- Wire Quick Actions buttons to actual routes (`/settings`, `/course-catalog`, `/achievements`)
- Use `motion` for stagger animations like the Student Dashboard
- Pull real data from `useProfile` and `useUserStats` hooks instead of mock arrays
- Add avatar upload functionality using the existing Camera button
- Use the same `GlassCard` pattern as SettingsPage for visual consistency

### 2. Fix Bulk Hardcoded Colors (high-traffic pages only)
Target the most-visited pages to replace `bg-gray-50`/`text-gray-600` with theme tokens:
- `src/pages/LearningAnalytics.tsx`
- `src/pages/Instructor.tsx`
- `src/pages/YouTubeLearningPage.tsx`

Replace patterns:
- `bg-gray-50` → `bg-background`
- `text-gray-600` → `text-muted-foreground`
- `bg-gray-900` → `bg-foreground`
- `bg-green-100 text-green-800` → `bg-emerald-500/10 text-emerald-600`
- `bg-blue-100` → `bg-primary/10`

### 3. Files to Edit
1. **`src/pages/Profile.tsx`** — Full rebuild with theme tokens, real data, working navigation, animations
2. **`src/pages/LearningAnalytics.tsx`** — Theme token fix
3. **`src/pages/Instructor.tsx`** — Theme token fix
4. **`src/pages/YouTubeLearningPage.tsx`** — Theme token fix

### No database changes needed.

**Estimated scope**: 4 file edits. Profile is the main effort; the other 3 are quick find-and-replace fixes.

