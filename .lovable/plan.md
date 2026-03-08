

# Fix Critical Gaps: Missing Profile Rows + Setup Flow

## Root Cause
**6 out of 7 users have no profile row in the database.** The `handle_new_user` trigger either wasn't created when these users signed up, or it failed silently (e.g., user_type `school_admin` isn't in the `app_role` enum). This causes:
- Every profile fetch returns **406 error** (0 rows with `.single()`)
- `useProfile` falls back to metadata every time, never persists
- `updateProfile` silently fails (UPDATE on non-existent row)
- Setup page can't save profile data
- Infinite re-fetch loops

## Plan

### 1. Database Migration: Backfill Missing Profiles
Run a migration that inserts profile rows for all auth.users that don't have one yet. This fixes all 6 existing users immediately.

```sql
INSERT INTO public.profiles (id, full_name, avatar_url, role)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
  COALESCE(u.raw_user_meta_data->>'avatar_url', ''),
  'student'::app_role
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;
```

### 2. Fix `useProfile` to Upsert on Missing Profile
Update `useProfile.tsx` so that when a `.single()` query returns no rows, it creates the profile row automatically (upsert), then retries the fetch. This prevents future users from getting stuck if the trigger fails.

### 3. Fix `handle_new_user` Trigger to Handle Unknown Roles
Update the trigger to use a simpler fallback so it never fails, even with unexpected `user_type` values like `school_admin`.

### 4. Fix React Fragment Warning in MainLayout
The console shows `Invalid prop 'data-lov-id' supplied to React.Fragment`. Find the offending `.map()` call around line 558 and replace the Fragment with a `div` or remove the invalid prop.

## Files Modified
- `src/hooks/useProfile.tsx` -- Add auto-create logic when profile is missing
- `src/components/Layout/MainLayout.tsx` -- Fix Fragment prop warning

## Database Changes
- Migration: Backfill missing profile rows
- Migration: Update `handle_new_user` trigger for robustness

