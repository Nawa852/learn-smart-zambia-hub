

# Plan: Post-Login Control Center — Device Setup, Info Collection & Study Schedule

## What Exists
- **DeviceSetupWizard**: 4-step guide (Install PWA, Notifications, DND, Block Social Media) — but only in the onboarding flow, one-time. No enforcement after login.
- **Focus Mode**: Pomodoro timer with distraction detection, wake lock, fullscreen lock screen, DB persistence.
- **Study Schedule**: `useStudySchedule` hook + `study_schedules` table — but only accessible buried inside Focus Mode's "Schedule" tab.
- **Profile collection**: `NewOnboardingWizard` collects name/email/phone/age/grade but stores it in localStorage, not reliably in DB profiles.
- **No post-login control gate**: After login, users go straight to dashboard with no enforcement of device setup or schedule planning.

## What's Missing
1. **Mandatory post-login control gate** — after auth, before dashboard, enforce: device permissions granted, profile info complete, study schedule set.
2. **App Control Dashboard** — a dedicated page to manage device settings, schedule, and app control status at any time (not just onboarding).
3. **Schedule enforcement** — when a scheduled study time arrives, auto-launch focus mode with lock screen instead of just a notification.
4. **Profile completeness check** — ensure critical info (name, grade, school, province) is in DB before allowing dashboard access.

## Changes

### 1. Create `PostLoginGate` component
New file: `src/components/Auth/PostLoginGate.tsx`

Wraps all protected routes. After auth, checks three conditions from the DB `profiles` row:
- `device_setup_complete === true`
- `full_name` is not empty
- At least 1 study schedule exists in `study_schedules`

If any condition fails, redirect to `/setup` instead of dashboard. This is NOT skippable.

### 2. Create `/setup` — Mandatory Setup Page
New file: `src/pages/SetupPage.tsx`

A multi-step flow (reuses existing components + new ones):
- **Step 1: Complete Profile** — Collect full_name, grade, school, province, phone. Save to `profiles` table via `useProfile.updateProfile()`.
- **Step 2: Device Control** — Reuse `DeviceSetupWizard` component. On completion, set `device_setup_complete = true` in profiles.
- **Step 3: Study Schedule** — Require at least 1 study schedule slot. Uses `useStudySchedule.addSchedule()`. Must pick subject, days, start/end time.
- **Step 4: Confirmation** — Summary of setup. Mark complete, navigate to dashboard.

### 3. Create `/app-control` — Ongoing Control Dashboard
New file: `src/pages/AppControlPage.tsx`

Accessible from sidebar anytime. Shows:
- **Device Status Panel**: Notification permission status, DND reminder, social media blocking reminder. Re-trigger permission requests.
- **Study Schedule Manager**: Full CRUD for study schedules (already built in `useStudySchedule`), with visual weekly calendar grid.
- **Focus Stats Summary**: Today's focus time, distraction count, give-up count from `focus_sessions`.
- **Active Schedule Indicator**: If current time falls within a schedule, show "You should be studying [Subject]!" with a one-tap button to launch focus mode.

### 4. Schedule Enforcement — Auto-trigger Focus Mode
Modify `src/components/Layout/MainLayout.tsx`:
- Add a `useEffect` that runs `useStudySchedule.getActiveNow()` every 60 seconds.
- When a scheduled slot is active and user is NOT in focus mode, show a persistent banner: "It's study time for [Subject]! Start Focus Mode" with a direct link to `/focus-mode?subject=Mathematics`.
- After 5 minutes of ignoring, send a notification to linked guardians.

### 5. Sidebar Updates
Modify `src/components/Sidebar/sidebarConfig.ts`:
- Add "App Control" item under Study section with Shield icon, route `/app-control`.

## Database Changes
None needed — `profiles.device_setup_complete`, `study_schedules`, and `focus_sessions` tables already exist with correct columns and RLS.

## Files to Create
- `src/components/Auth/PostLoginGate.tsx`
- `src/pages/SetupPage.tsx`
- `src/pages/AppControlPage.tsx`

## Files to Modify
- `src/App.tsx` — add `/setup` and `/app-control` routes, wrap protected routes with `PostLoginGate`
- `src/components/Layout/MainLayout.tsx` — add schedule enforcement banner
- `src/components/Sidebar/sidebarConfig.ts` — add App Control nav item
- `src/pages/FocusModePage.tsx` — accept `?subject=` query param to auto-fill subject

## No File Deletions

## Result
After login, every learner MUST complete profile info, device setup, and create a study schedule before accessing the platform. Once set up, the system actively enforces study schedules with persistent banners and guardian alerts. An App Control dashboard lets users manage all settings ongoing.

