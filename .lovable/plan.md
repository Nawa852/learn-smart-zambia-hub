

# Final Touches Plan

## Issues Found

### 1. Dead `WelcomePage` and `OnboardingGate` files
These files still exist but are never used (no route in `App.tsx`, no imports). They should be deleted to avoid confusion.

### 2. `handle_new_user` trigger not robust
The trigger in the database may still fail for roles like `school_admin` that aren't in the `app_role` enum. Need to update or recreate it with a safe fallback to `'student'`.

### 3. Setup page skippable for `institution` and `ministry` — but no alternative
These roles bypass setup entirely (`PostLoginGate` exempts them), so they go straight to dashboard. This is correct, but their dashboards should still work without profile data. Verify the dashboard views handle null/empty profile gracefully.

### 4. Auth page: no redirect for already-logged-in users
`AuthPage` doesn't check for existing session. An authenticated user visiting `/login` hits `ProtectedRoute` which redirects them to `/dashboard` — this works. No fix needed.

### 5. `OnboardingTour` still rendered in `MainLayout`
The `OnboardingTour` component is rendered on every page inside `MainLayout`. If the onboarding flow was removed (per memory), this component may be empty/harmless, but should be verified or removed.

### 6. `QuickNoteButton` and `ScheduleEnforcer` — verify no crashes
These components run on every page. Confirm they handle missing profile/schedules gracefully.

### 7. Missing `guardian/reports` route
`MobileBottomNav` links guardian users to `/guardian/reports` but the actual route is `/guardian-reports`. This causes a 404.

### 8. Missing `cyber/network-lab` and `cyber/ctf` routes
`MobileBottomNav` links cybersecurity users to `/cyber/network-lab` and `/cyber/ctf` but actual routes are `/cybersecurity/network-lab` and `/cybersecurity/ctf`. Same for skills: `/skills/assessment` and `/skills/job-board` — assessment exists but job-board route is `/skills/jobs`.

## Implementation

### Files to edit:

1. **`src/components/Layout/MobileBottomNav.tsx`** — Fix broken nav paths:
   - Guardian: `/guardian/reports` → `/guardian-reports`
   - Cybersecurity: `/cyber/network-lab` → `/cybersecurity/network-lab`, `/cyber/ctf` → `/cybersecurity/ctf`
   - Skills: `/skills/job-board` → `/skills/jobs`

2. **`src/components/Layout/MainLayout.tsx`** — Remove `OnboardingTour` import and rendering (dead code per memory)

3. **Delete dead files:**
   - `src/pages/WelcomePage.tsx`
   - `src/components/Onboarding/OnboardingGate.tsx`
   - `src/components/Onboarding/OnboardingTour.tsx` (if empty/unused)

4. **Database migration** — Update `handle_new_user` trigger to safely cast unknown roles to `'student'`:
   ```sql
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS trigger
   LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
   AS $$
   DECLARE
     _role app_role;
   BEGIN
     BEGIN
       _role := (NEW.raw_user_meta_data->>'user_type')::app_role;
     EXCEPTION WHEN OTHERS THEN
       _role := 'student';
     END;
     INSERT INTO public.profiles (id, full_name, avatar_url, role)
     VALUES (
       NEW.id,
       COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
       COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
       COALESCE(_role, 'student')
     );
     RETURN NEW;
   END;
   $$;
   ```

### No other database changes needed.

**Estimated scope**: 3 file edits, 2-3 file deletions, 1 DB migration.

