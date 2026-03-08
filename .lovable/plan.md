

# Plan: Finish Student Experience to 76-82%

## Current State Assessment

The student section already has solid foundations:
- Dashboard with live Supabase data (courses, assignments, stats)
- Course catalog, enrollment, lesson viewer with completion tracking
- Assignment submission system with grading notifications
- Study planner with weekly calendar view
- Goals tracker, progress report with charts
- Study group chat with real-time messaging
- AI study buddy, flashcards, quiz tools
- ECZ resources (past papers, practice quiz, exam simulator, video library)
- Guardian linking, notifications, profile page
- PWA with offline support, device capabilities

## Gaps to Close (to reach ~80%)

### 1. Real Achievement/XP System (currently hardcoded mock data)
The AchievementSystem component uses static arrays. Need to:
- Create `achievements` and `user_achievements` tables in the database
- Auto-award achievements based on triggers (first lesson, streak, quiz scores)
- Track XP and streaks with a `user_stats` table (total_xp, current_streak, longest_streak, last_active_date)
- Update the dashboard streak counter to use real data instead of hardcoded `streak: 3`

### 2. Profile Page with Real Data
ProfilePage shows hardcoded stats (127 hours, 8 courses, 24 achievements, 156 friends) and hardcoded activity. Need to:
- Pull actual enrolled course count, completed lessons, and earned achievements from DB
- Show real recent activity (last completed lessons, submitted assignments)

### 3. Notifications with Real-Time Updates
NotificationsPage fetches from DB but has no real-time subscription. Need to:
- Add Supabase realtime channel for notifications table
- Add unread badge count in the TopNavbar
- Ensure notification bell in sidebar/navbar links properly

### 4. Study Streak Tracking
Dashboard shows `streak: 3` hardcoded. Need to:
- Add streak calculation logic based on `lesson_completions` or `study_goals` activity dates
- Store/update streak in a `user_stats` record

### 5. Notes/Bookmarks System
Students need to save notes while studying lessons. Need to:
- Create `student_notes` table (user_id, lesson_id, course_id, content, created_at)
- Add a notes panel to the CourseDetailPage lesson viewer
- Add a "My Notes" page accessible from sidebar

## Database Changes

Create three new tables via migration:

```sql
-- User stats for XP, streaks
CREATE TABLE public.user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  total_xp integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_active_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own stats" ON public.user_stats FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users update own stats" ON public.user_stats FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users insert own stats" ON public.user_stats FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Student notes
CREATE TABLE public.student_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users CRUD own notes" ON public.student_notes FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
```

## Code Changes

### Task 1: User Stats + Real Streaks
- Create a `useUserStats` hook that fetches/creates `user_stats` for current user
- On each lesson completion or goal completion, update `last_active_date` and recalculate streak
- Replace hardcoded `streak: 3` in StudentDashboardView with real data

### Task 2: Real Achievement Tracking  
- Update AchievementSystem to query actual `lesson_completions`, `quiz_attempts`, `study_goals` counts
- Compute achievement progress dynamically (e.g., "Complete 5 lessons" checks real lesson_completions count)
- Award XP on the `user_stats` table when milestones are hit

### Task 3: Profile with Live Data
- Update ProfilePage stats section to query real counts from enrollments, lesson_completions, quiz_attempts
- Replace hardcoded "Recent Activity" with last 5 actions from lesson_completions + submissions

### Task 4: Real-Time Notifications + Navbar Badge
- Add Supabase realtime subscription in NotificationsPage
- Add unread notification count badge to the TopNavbar bell icon
- Create a small `NotificationBell` component for the navbar

### Task 5: Student Notes in Lesson Viewer
- Add a collapsible notes panel to CourseDetailPage
- Create "My Notes" page showing all notes grouped by course
- Add "My Notes" to student sidebar navigation

### Task 6: Study Materials Upload Integration
- Connect DocumentScanner captures to the `student_notes` or uploads storage
- Show uploaded documents in StudyMaterialsPage from Supabase storage

## Files to Create
- `src/hooks/useUserStats.tsx` - XP and streak management hook
- `src/components/Notifications/NotificationBell.tsx` - Navbar badge component
- `src/pages/MyNotesPage.tsx` - Student notes page

## Files to Modify
- `src/components/Dashboard/StudentDashboardView.tsx` - Real streak data
- `src/components/Gamification/AchievementSystem.tsx` - Dynamic achievement data
- `src/pages/ProfilePage.tsx` - Real stats and activity
- `src/pages/NotificationsPage.tsx` - Realtime subscription
- `src/components/Layout/TopNavbar.tsx` - Notification bell with badge
- `src/pages/CourseDetailPage.tsx` - Notes panel in lesson viewer
- `src/components/Sidebar/sidebarConfig.ts` - Add Notes nav item
- `src/App.tsx` - Add notes route

## Estimated Completion
These 6 tasks transform the student section from ~65% (lots of pages but many with mock data) to ~80% (real data-driven features with persistence and real-time updates).

