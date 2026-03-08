

# Next Phases + UI Cleanup Plan

## Current State
The FB+GitHub color system is in place, but **567 references** to legacy CSS classes (`gradient-text`, `glass-premium`, `glow-primary`, `hover-lift`, etc.) remain across **23 component files**. These classes are defined as no-ops in `index.css` so they don't crash, but they add visual inconsistency (e.g., `bg-gradient-to-r from-primary to-accent` buttons still use gradient backgrounds inline).

---

## Phase A: Legacy CSS Cleanup (UI Fix — do first)

Sweep all 23 files and replace legacy patterns with clean FB+GH equivalents:

| Old Pattern | New Pattern |
|---|---|
| `gradient-text`, `gradient-text-bright-sphere` | `text-primary font-semibold` |
| `glass-card`, `glass-premium`, `glass` | `bg-card border border-border` |
| `glow-primary` | _(remove)_ |
| `hover-lift` | `hover:shadow-card-hover transition-shadow` |
| `bg-gradient-to-r from-primary to-accent` (buttons) | `bg-primary hover:bg-primary/90` |
| `shadow-lg glow-primary` | `shadow-card` |
| `border-primary/30 focus:glow-primary` (inputs) | `border-input focus:ring-ring` |
| `glass-premium border-primary/20` (dropdowns) | _(remove classes, use defaults)_ |

**Files to update (23):** `EnhancedLoginForm`, `ResetPasswordForm`, `SecureSignUpForm`, `SimpleAuthPage`, `OnboardingFlow`, `NewOnboardingWizard`, `GamificationSetup`, `MFASetupPage`, `MVPLanding`, `ComprehensiveAIHub`, `FacebookStylePost`, `SetupPage`, `WelcomePage`, `ProfilePage`, `SettingsPage`, and others.

After cleanup, remove the backward-compat no-op classes from `index.css` (lines 121-149).

---

## Phase B: Real-time Communication (Phase 4 from plan)

1. **Real-time Messenger** — Enable `messages` table on `supabase_realtime`. Update `MessengerChat` component to subscribe to `postgres_changes` for live message delivery.

2. **Notification Center** — Wire `NotificationBell`/`NotificationDropdown` to query `notifications` table with real-time subscription and mark-as-read.

3. **Study Group Chat** — Scope `StudyGroupChatPage` messages to group ID using real-time subscription on `messages` table.

4. **Announcement System** — DB trigger on `assignments` insert that creates notifications for enrolled students (already partially exists via `notify_new_assignment` function — verify trigger is attached).

---

## Phase C: Security Hardening (Phase 5 from plan)

1. **Fix RESTRICTIVE RLS** — Audit and fix policies on `submissions`, `grades`, `notifications`, `enrollments`, `focus_sessions` where multiple RESTRICTIVE policies conflict.

2. **Edge Function JWT** — Update all 25+ edge functions to validate `Authorization` header. Set `verify_jwt = true` in `config.toml`.

3. **Add Foreign Keys** — Migration for missing FK constraints across `submissions`, `certificates`, `enrollments`.

4. **Input Sanitization** — Enforce `inputValidation.ts` on course creation, notes, chat, and profile forms.

---

## Phase D: Gamification (Phase 6 from plan)

1. **XP System** — Add `xp` and `edu_coins` columns to `profiles`. Create DB triggers for XP awards on lesson completion (+10), quiz pass (+25), course completion (+100).

2. **Streak Tracker** — Visual streak counter on dashboard (already calculating client-side — persist to DB and show badge).

3. **Leaderboard Page** — New `/leaderboard` page querying top users by XP with weekly/monthly/all-time filters.

4. **Certificate Generator** — Auto-create certificate record on course completion. PDF download via edge function.

5. **Badge System** — `badges` and `user_badges` tables. 20 badge definitions with unlock conditions checked via DB function.

---

## Phase E: Polish (Phase 7 from plan)

1. **Unified Toast** — Remove `@radix-ui/react-toast` usage, standardize to `sonner` everywhere.

2. **Full-text Search** — Postgres `tsvector` index on `courses.title`, `courses.description`. Wire to Cmd+K palette.

3. **Mobile Bottom Tab Bar** — Add a 5-icon bottom nav on mobile (`<768px`) for Dashboard, Courses, AI, Chat, Profile.

4. **Profile Completion Meter** — Dashboard widget showing % complete with prompts.

5. **Course Ratings** — `course_reviews` table, star rating UI on course detail page.

---

## Implementation Order

```text
Phase A (CSS Cleanup):     ~23 files — immediate visual consistency
Phase B (Communication):   4 features — makes social features real
Phase C (Security):        4 features — fixes broken access patterns
Phase D (Gamification):    5 features — engagement system
Phase E (Polish):          5 features — production readiness
```

**Recommended start:** Phase A (CSS cleanup) since it touches the most visible parts of the app and is pure frontend work with no DB changes.

