

# Plan: Add 50+ Small UI/UX Features Across the Platform

This plan adds 50+ micro-features as reusable components, utility hooks, and enhancements woven into existing layouts and pages. Grouped into batches for clarity.

---

## Batch 1: Global Layout & Navigation Enhancements (12 features)

**New file: `src/components/UI/ScrollToTop.tsx`**
1. **Scroll-to-top FAB** — Floating button appears after scrolling 300px, smooth-scrolls to top with framer-motion fade.
2. **Page transition animations** — Wrap `MainLayout` children in a framer-motion `AnimatePresence` with fade+slide on route change.

**Edit: `src/components/Layout/MainLayout.tsx`**
3. **Reading progress bar** — Thin gradient bar at the very top of the page showing scroll percentage.
4. **Keyboard shortcuts overlay** — `?` key opens a modal listing all keyboard shortcuts (Cmd+K, ?, Escape, etc.).
5. **Active schedule pulse indicator** — Add a pulsing green dot next to the schedule banner when a study session is live.

**Edit: `src/components/Layout/TopNavbar.tsx`**
6. **Online/offline status indicator** — Small colored dot on the user avatar (green = online).
7. **Greeting time-of-day** — Show "Good morning/afternoon/evening" text next to the search bar on desktop.
8. **Quick role badge** — Display a small badge with the user's role (Student, Teacher, etc.) next to their avatar.

**Edit: `src/components/Layout/MobileBottomNav.tsx`**
9. **Haptic-style press animation** — Add scale-down animation on tap for mobile nav icons.
10. **Active indicator dot** — Small dot under the active tab icon instead of just color change.
11. **Unread message badge** — Red dot on the Chat icon when there are unread messages.

**Edit: `src/components/AppSidebar.tsx`**
12. **Sidebar collapse tooltip** — When sidebar is collapsed, show tooltips on hover for each nav item label.

---

## Batch 2: New Reusable UI Components (10 features)

**New file: `src/components/UI/ConfettiCelebration.tsx`**
13. **Confetti effect** — Canvas-based confetti burst triggered on achievement unlocks, quiz completions, goal completions.

**New file: `src/components/UI/SkeletonCard.tsx`**
14. **Skeleton loading cards** — Reusable shimmer skeleton for cards, lists, and grids used during data fetching.

**New file: `src/components/UI/EmptyState.tsx`**
15. **Empty state illustration** — Reusable component with icon, title, description, and optional CTA button for empty lists.

**New file: `src/components/UI/CopyButton.tsx`**
16. **Copy-to-clipboard button** — Small icon button that copies text and shows a checkmark confirmation.

**New file: `src/components/UI/StatusDot.tsx`**
17. **Status indicator dot** — Tiny colored dot component (online/offline/away/busy) reusable across profiles and chat.

**New file: `src/components/UI/CountdownTimer.tsx`**
18. **Countdown timer** — Displays time remaining until a deadline (exam, assignment due date) with color urgency.

**New file: `src/components/UI/ProgressRing.tsx`**
19. **Circular progress ring** — SVG-based circular progress indicator with animated fill and center label.

**New file: `src/components/UI/Spotlight.tsx`**
20. **Spotlight/highlight effect** — Hover card with a radial gradient spotlight that follows the cursor.

**New file: `src/components/UI/TypewriterText.tsx`**
21. **Typewriter text animation** — Text that types out character by character, used for AI responses and welcome messages.

**New file: `src/components/UI/GlowBadge.tsx`**
22. **Glowing badge** — Badge with a subtle animated glow effect for highlighting new features or premium content.

---

## Batch 3: New Utility Hooks (8 features)

**New file: `src/hooks/useScrollProgress.ts`**
23. **Scroll progress hook** — Returns 0-100 scroll percentage for the reading progress bar.

**New file: `src/hooks/useKeyboardShortcut.ts`**
24. **Keyboard shortcut hook** — Generic hook to register key combos with cleanup.

**New file: `src/hooks/useOnlineStatus.ts`**
25. **Online status hook** — Tracks navigator.onLine with event listeners.

**New file: `src/hooks/useTimeOfDay.ts`**
26. **Time-of-day hook** — Returns "morning", "afternoon", "evening", or "night" based on current hour.

**New file: `src/hooks/useLocalStorage.ts`**
27. **LocalStorage hook** — Generic typed useState synced to localStorage with JSON serialization.

**New file: `src/hooks/useDebounce.ts`**
28. **Debounce hook** — Debounces a value by a configurable delay. Useful for search inputs.

**New file: `src/hooks/useCountdown.ts`**
29. **Countdown hook** — Takes a target date and returns days/hours/minutes/seconds remaining.

**New file: `src/hooks/useClipboard.ts`**
30. **Clipboard hook** — Wraps navigator.clipboard.writeText with copied state and timeout reset.

---

## Batch 4: Dashboard & Page Micro-Features (15 features)

**Edit: `src/components/Dashboard/EnhancedDashboard.tsx`**
31. **Animated stat counters** — Use AnimatedCounter for quick stats (count up from 0 on mount).
32. **Daily motivational quote** — Random Zambian proverb or study motivation quote in the header.
33. **Weather widget stub** — Small weather icon + temperature display in the welcome header.
34. **"What's new" changelog badge** — Small "NEW" badge on recently added features with dismiss.
35. **Quick action shortcuts row** — Horizontal scrollable row of icon buttons for frequent actions (Start Quiz, Open Notes, Timer, etc.).

**Edit: `src/pages/GoalsPage.tsx`**
36. **Goal completion confetti** — Trigger confetti when a goal is marked complete.
37. **Streak counter with fire animation** — Animated flame icon that grows with consecutive daily goals.

**Edit: `src/pages/Achievements.tsx`**
38. **Achievement unlock animation** — Scale-up + glow animation when viewing a newly earned achievement.
39. **Share achievement button** — Button to copy a shareable link or text of the achievement.

**Edit: `src/pages/ProfilePage.tsx`**
40. **Profile completion percentage ring** — Circular progress showing how complete the profile is.
41. **"Member since" badge** — Shows account age in a friendly format.

**Edit: `src/pages/SettingsPage.tsx`**
42. **Settings search/filter** — Search input at the top to filter settings by keyword.
43. **Unsaved changes warning** — Prompt before navigating away if settings were modified.

**Edit: `src/components/Social/MessengerChat.tsx`**
44. **Typing indicator dots** — Animated bouncing dots shown when another user is typing.
45. **Message read receipts** — Double-check icon for read messages.

---

## Batch 5: Polish & Delight Features (8 features)

**Edit: `src/components/BrightSphere/QuickCommandCenter.tsx`**
46. **Recent commands section** — Track and show last 5 used commands at the top of the palette.
47. **Command keyboard shortcut hints** — Show shortcut keys next to each command item.

**New file: `src/components/UI/Tooltip.tsx` (wrapper)**
48. **Smart tooltips** — Thin wrapper around Radix tooltip with consistent delay and styling used on all icon buttons.

**Edit: `src/components/CookieConsent.tsx`**
49. **Animated slide-up** — CookieConsent slides up from bottom with framer-motion instead of appearing instantly.

**Edit: `src/components/PWA/OfflineBanner.tsx`**
50. **Offline mode indicator** — Pulsing red dot and "You're offline" message with retry button.

**Edit: `src/components/UI/LogoLoader.tsx`**
51. **Loading tips** — Rotate through study tips while loading ("Did you know? Spaced repetition improves retention by 200%").

**New file: `src/components/UI/BackButton.tsx`**
52. **Universal back button** — Component that uses `useNavigate(-1)` with a styled arrow icon, used on detail pages.

**New file: `src/components/UI/FadeIn.tsx`**
53. **FadeIn wrapper** — Simple framer-motion wrapper for staggered fade-in-up animations, reusable across all pages.

---

## Technical Approach
- All new components use existing design system tokens (`bg-card`, `text-foreground`, `border-border`, etc.)
- All animations use `framer-motion` (already installed)
- Hooks are pure TypeScript with no external dependencies
- Components are opt-in — existing pages import them as needed
- No database changes required
- No breaking changes to existing functionality

## Estimated Files
- **~15 new files** (components + hooks)
- **~12 edited files** (layout, dashboard, pages)

