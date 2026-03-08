

## Plan: Push Notifications, Guardian Registration & Social Features

### 1. Database Changes

**New table: `guardian_links`** — stores student-guardian relationships with mode preferences.

```sql
CREATE TABLE public.guardian_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  guardian_name text NOT NULL,
  relationship text NOT NULL,
  phone text NOT NULL,
  email text,
  mode text NOT NULL DEFAULT 'monitor', -- motivator | monitor | watcher
  status text NOT NULL DEFAULT 'pending', -- pending | active | declined
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.guardian_links ENABLE ROW LEVEL SECURITY;
-- Students can manage their own links
-- Guardians can view links where their email/phone matches their profile
```

**New table: `guardian_reports`** — weekly automated reports sent to guardians.

```sql
CREATE TABLE public.guardian_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guardian_link_id uuid REFERENCES public.guardian_links(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  report_data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
```

**New table: `push_subscriptions`** — stores browser push notification subscriptions per user.

```sql
CREATE TABLE public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subscription jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, subscription)
);
```

### 2. Push Notification Support (PWA-style)

- **Service Worker registration** in `src/main.tsx` — register a service worker that listens for push events and shows native browser notifications.
- **`src/utils/pushNotifications.ts`** — utility to request permission, subscribe to browser push, and save the subscription to `push_subscriptions` table.
- **Settings integration** — wire the existing "push" toggle in SettingsPage to actually request permission and subscribe/unsubscribe.
- Note: Full server-side push (via VAPID keys) requires a secret key. For the MVP, we'll use the **Notification API** triggered by real-time Supabase subscriptions when the app is in background/has a service worker running. This gives "push-like" behavior without needing VAPID infrastructure.

### 3. Guardian Registration Page (`src/pages/GuardianLinkPage.tsx`)

A dedicated page accessible from the student sidebar where students can:
- Register a guardian using the existing `GuardianLinkingStep` component (already built with name, relationship, phone, email, and mode selection).
- View their linked guardians with status badges (pending/active).
- Remove guardian links.
- Data persists to the new `guardian_links` table.

### 4. Guardian Report System

- **`src/pages/GuardianReportsPage.tsx`** — students can see what reports have been sent to their guardians.
- Auto-generate weekly summary reports (quiz scores, lesson completions, study goals progress) stored in `guardian_reports`.
- Guardians in "motivator" mode see encouragement-focused data; "monitor" mode gets full analytics; "watcher" mode gets dashboard-only access.

### 5. Enhanced Social Features

**Study Groups Enhancement (`src/pages/StudyGroupsPage.tsx` update)**:
- Add group creation with subject tags and grade filters.
- Member count and active status indicators.
- Quick-join buttons.

**Social Feed Enhancement (`src/pages/SocialFeedPage.tsx` update)**:
- Post creation form (text + optional image upload to storage bucket).
- Like/react to posts.
- Comment threads.
- Share study achievements automatically.

### 6. Sidebar & Routing Updates

Add to student sidebar:
- "My Guardian" under a new "Family" group → `/guardian-link`
- "Guardian Reports" under "Family" → `/guardian-reports`

Add routes in App.tsx:
- `/guardian-link` → GuardianLinkPage
- `/guardian-reports` → GuardianReportsPage

### Files to Create/Edit

| File | Action |
|------|--------|
| `src/utils/pushNotifications.ts` | Create — push subscription utility |
| `src/pages/GuardianLinkPage.tsx` | Create — guardian registration UI |
| `src/pages/GuardianReportsPage.tsx` | Create — guardian report viewer |
| `src/pages/SocialFeedPage.tsx` | Edit — add post creation & interactions |
| `src/pages/StudyGroupsPage.tsx` | Edit — add group creation & filters |
| `src/components/Sidebar/sidebarConfig.ts` | Edit — add Family section |
| `src/App.tsx` | Edit — add new routes |
| `src/pages/SettingsPage.tsx` | Edit — wire push toggle |
| Migration SQL | Create — guardian_links, guardian_reports, push_subscriptions tables |

