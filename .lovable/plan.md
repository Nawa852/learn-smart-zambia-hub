

# Fix Platform Gaps

## Critical Issues

### 1. `useProfile` missing `skills` and `cybersecurity` roles (causes silent fallback to `student`)
The `AppRole` type in `src/hooks/useProfile.tsx` (line 5) only lists 8 roles. The `validRoles` array (line 26) also excludes `skills` and `cybersecurity`. Any user who signs up as these roles gets silently downgraded to `student` in the UI.

**Fix**: Add `'skills' | 'cybersecurity'` to `AppRole` type and `validRoles` array.

### 2. `WelcomePage` / `OnboardingGate` conflict with auth flow
`OnboardingGate` checks localStorage for `edu-zambia-onboarding-completed` and redirects to `/welcome` if missing. But the real auth flow goes `AuthPage → /setup → /dashboard`. The `WelcomePage` onboarding wizard is a separate, redundant flow that conflicts. Users who sign up properly never set this localStorage flag, so `OnboardingGate` would redirect them away.

**Fix**: Remove `OnboardingGate` wrapping from protected routes (it's not used in App.tsx currently based on what I see, but verify). Ensure `WelcomePage` is only for unauthenticated first-time visitors.

### 3. `PostLoginGate` only checks `student` role for setup enforcement
Line 28 of `PostLoginGate.tsx`: `const isStudent = profile?.role === 'student'`. Users with `skills` or `cybersecurity` roles skip the setup gate entirely because their role isn't `'student'`. This means they can access the dashboard without completing profile/device/schedule setup.

**Fix**: Expand the check to include all roles that should go through setup, or make it role-agnostic (enforce for all non-admin roles).

### 4. Missing `theme_preference` column usage
The `profiles` table has a `theme_preference` column but it's never read or written by the theme system. The sidebar has a theme toggle but it likely only uses `ThemeContext` localStorage.

**Fix**: Sync `ThemeContext` with the profile's `theme_preference` column on login.

## Non-Critical Gaps

### 5. `ProtectedRoute` doesn't handle `/welcome` path
If an authenticated user visits `/welcome`, they aren't redirected. The page just runs its own localStorage check.

### 6. Dashboard role switch missing `skills` and `cybersecurity` case labels
Need to verify `Dashboard.tsx` switch statement handles these roles (it imports the views, but need to confirm the switch cases).

### 7. Several sidebar nav items point to routes that don't exist
E.g., cybersecurity sidebar has `/cybersecurity/dashboard`, `/cybersecurity/labs`, `/cybersecurity/videos`, `/cybersecurity/terminal` — need to verify these all have routes in App.tsx.

## Implementation Plan

### Files to edit:

1. **`src/hooks/useProfile.tsx`** — Add `skills` and `cybersecurity` to `AppRole` type and `validRoles`

2. **`src/components/Auth/PostLoginGate.tsx`** — Remove student-only restriction; enforce setup for all roles except `institution` and `ministry`

3. **`src/components/Auth/ProtectedRoute.tsx`** — Add `/welcome` to the redirect-skip list to prevent loops

4. **`src/pages/Dashboard.tsx`** — Verify and add switch cases for `skills` and `cybersecurity` (they may already work via imports)

5. **`src/contexts/ThemeContext.tsx`** — Optionally sync theme with profile `theme_preference` on load

6. **`src/pages/WelcomePage.tsx`** — Redirect authenticated users to `/dashboard` instead of running localStorage onboarding

7. **Verify route coverage** for cybersecurity/skills sidebar links in `App.tsx`

### No database changes needed.

**Estimated scope**: 5-6 file edits, focused fixes.
