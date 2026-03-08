

# Plan: Full App Setup & Device Control System

## Reality Check

**What's technically possible:**
- **Web/PWA**: Can use Wake Lock API (keep screen on), Notifications API, Fullscreen API, Web Audio for alarms, and Page Visibility API to detect tab switches. Cannot block other apps or control the phone OS.
- **Capacitor Native**: Adds Local Notifications (scheduled alarms), but Android/iOS do **not** allow third-party apps to block other apps or force-close social media. Only Android's Digital Wellbeing / iOS Screen Time (parental controls at the OS level) can do that.

**What we CAN build that creates real accountability:**
1. Detect when the learner leaves the app (Page Visibility API + Capacitor App plugin) and log it as a "distraction event"
2. Penalize focus-breaking (lose XP/streak, notify guardian)
3. Require a "Device Setup Wizard" before first use that walks learners through granting permissions and setting up OS-level controls
4. Schedule native alarms for study sessions
5. Wake Lock to prevent screen dimming during study
6. Full-screen immersive mode that's hard to accidentally exit

## Changes

### 1. Device Setup Wizard (New Onboarding Step)
Create `src/components/Onboarding/DeviceSetupWizard.tsx` — shown after signup, before dashboard access.

Steps:
- **Step 1: Install App** — Trigger PWA install prompt or show Capacitor install instructions
- **Step 2: Grant Notifications** — Request notification permission, explain why
- **Step 3: Enable Do Not Disturb** — Show platform-specific instructions (Android: Settings → DND, iOS: Settings → Focus) with screenshots/guides
- **Step 4: Set Study Hours** — Pick daily study window (e.g., 16:00–19:00), days of week
- **Step 5: Block Social Media Guide** — Walk through enabling Android Digital Wellbeing / iOS Screen Time app limits during study hours (we can't do it programmatically, but we guide them step by step)

Save setup completion status to `profiles` table (new `device_setup_complete` boolean column).

### 2. Study Schedule with Native Alarms
Enhance `useFocusMode` to schedule **Capacitor Local Notifications** as alarms:
- "Study time starts in 5 minutes" reminder
- "Study session starting NOW" alarm
- "Break time!" and "Break over, back to work!" alerts
- Use `@capacitor/local-notifications` which is already installed

Store the weekly schedule in a new `study_schedules` DB table so it persists across devices.

### 3. Distraction Detection & Penalties
Create `src/hooks/useDistractionDetector.tsx`:
- Use `document.visibilitychange` event to detect when learner switches away during focus
- On Capacitor: use `@capacitor/app` `appStateChange` listener for background detection
- Log distraction events to `focus_sessions` (add `distraction_count` column)
- After 3+ distractions in one session: auto-notify guardian, reduce XP
- Show "You left the app!" warning overlay when they return

### 4. Wake Lock & Immersive Focus
Enhance the existing Focus Mode lock screen:
- Activate `navigator.wakeLock.request('screen')` during focus sessions (already detected in `useDeviceCapabilities`)
- Request fullscreen via `document.documentElement.requestFullscreen()` during focus
- Play a subtle ambient sound loop to keep audio focus (prevents easy app switching on some devices)

### 5. Guardian Distraction Alerts
When a student has 3+ distractions in a session or gives up:
- Insert a notification into `notifications` table for linked guardians
- Guardian dashboard already shows notifications, so it appears automatically

## Database Changes

```sql
-- Track study schedules
CREATE TABLE public.study_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  days text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own schedules" ON public.study_schedules
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Add distraction tracking to focus_sessions
ALTER TABLE public.focus_sessions ADD COLUMN distraction_count integer NOT NULL DEFAULT 0;

-- Add device setup flag to profiles
ALTER TABLE public.profiles ADD COLUMN device_setup_complete boolean NOT NULL DEFAULT false;
```

## Files to Create
- `src/components/Onboarding/DeviceSetupWizard.tsx` — step-by-step device permission & OS setup guide
- `src/hooks/useDistractionDetector.tsx` — visibility/app-state tracking during focus
- `src/hooks/useStudySchedule.tsx` — CRUD for study schedules + native alarm scheduling

## Files to Modify
- `src/hooks/useFocusMode.tsx` — integrate distraction detector, wake lock, fullscreen, native alarms
- `src/pages/FocusModePage.tsx` — add distraction count display, enhanced lock screen with wake lock
- `src/components/Onboarding/OnboardingFlow.tsx` — add DeviceSetupWizard as a required step
- `src/components/Dashboard/GuardianDashboardView.tsx` — show distraction alerts
- `capacitor.config.json` — add `@capacitor/app` plugin config

## No File Deletions

## Result
Learners go through a mandatory device setup that guides them to install the app, grant permissions, configure OS-level app blocking, and set study hours with real alarms. During study, the app goes full-screen with wake lock, detects any app-switching as distractions, penalizes unfocused behavior, and alerts guardians — creating strong accountability without needing impossible OS-level app control.

