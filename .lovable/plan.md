

# Plan: Implement Remaining Features (Batches 3-5)

Most of Batch 2-3 hooks/components are already created. Here's what's actually **missing**:

## Already Done (skip)
- All 8 utility hooks (Batch 3) ✅
- All 10 reusable UI components (Batch 2) ✅
- QuickCommandCenter recent commands + shortcut hints (#46, #47) ✅
- CookieConsent animated slide-up (#49) ✅
- OfflineBanner pulsing dot + retry (#50) ✅
- LogoLoader study tips (#51) ✅
- SmartTooltip (#48) ✅
- GoalsPage confetti (#36) ✅
- ProfilePage ProgressRing + member since (#40, #41) ✅
- Achievements share button (#39) ✅

## Remaining Features to Build

### 1. EnhancedDashboard improvements (#31-35)
**Edit `src/components/Dashboard/EnhancedDashboard.tsx`:**
- Add `AnimatedCounter` to stat values
- Add motivational Zambian proverbs array, show random one in header
- Add weather widget stub (icon + placeholder temp)
- Add "NEW" changelog badge on recent features (dismissible via localStorage)
- Add horizontal scrollable quick-action shortcuts row (Start Quiz, Open Notes, Timer, etc.)

### 2. GoalsPage streak counter (#37)
**Edit `src/pages/GoalsPage.tsx`:**
- Add streak counter with animated flame icon that scales based on consecutive daily completions

### 3. Achievements unlock animation (#38)
**Edit `src/pages/Achievements.tsx`:**
- Wrap `AchievementSystem` content with scale-up + glow motion animation for newly earned items

### 4. Settings search + unsaved warning (#42, #43)
**Edit `src/pages/SettingsPage.tsx`:**
- Add search input at top to filter settings sections by keyword
- Track dirty state, use `beforeunload` + prompt before navigation if modified

### 5. Messenger typing indicator + read receipts (#44, #45)
**Edit `src/components/Social/MessengerChat.tsx`:**
- Add animated bouncing dots component for typing indicator
- Add `CheckCheck` icon styling (already imported) for read receipt display on sent messages

### 6. BackButton + FadeIn (already created, need integration)
These components exist but aren't used anywhere yet — they're opt-in so no integration needed now.

---

## Summary
- **5 files edited** (EnhancedDashboard, GoalsPage, Achievements, SettingsPage, MessengerChat)
- **~10 remaining features** implemented
- No new files needed
- No database changes

