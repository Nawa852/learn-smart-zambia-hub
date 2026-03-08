

# Plan: 20 Improvements Across the Platform

Based on a thorough audit of the codebase, here are 20 targeted improvements organized by priority. Each addresses a real gap — missing routes, hardcoded dashboards, broken links, UX gaps, or missing functionality.

---

## A. Critical Fixes (Broken/Missing)

### 1. Missing Messenger Route
The sidebar links to `/study-chat` for messenger, but `MessengerPage` exists and is never routed. The `/study-chat` route goes to `StudyGroupChatPage`, not `MessengerChat`.
- **Fix**: Add `/messenger` route pointing to `MessengerPage` in `App.tsx`. Update sidebar references where "Messenger" links should go to `/messenger` instead of `/study-chat`.

### 2. Institution Dashboard — Wire to Live Data
`InstitutionDashboardView` is 100% hardcoded (2,847 students, 124 teachers, etc.). No DB queries.
- **Fix**: Query `profiles` (count by role), `courses` (count), `enrollments` (count), `grades` (avg score). Replace static values with live data.

### 3. Ministry Dashboard — Wire to Live Data
`MinistryDashboard` has fully hardcoded national stats (4.2M students, 12,847 schools). No DB connection.
- **Fix**: Use `get_platform_stats()` function (already created in migration) to pull real aggregate data. Replace top-level stats with live values.

### 4. PostLoginGate Missing on Most Routes
Only `/dashboard`, `/focus-mode`, and `/app-control` use `PostLoginGate`. All other protected routes skip it, meaning users can access features without completing onboarding/profile setup.
- **Fix**: Wrap all `MainLayout` routes with `PostLoginGate` consistently.

---

## B. UX & Navigation Improvements

### 5. Lazy Load All Pages
`App.tsx` eagerly imports 80+ pages. This creates a massive initial bundle.
- **Fix**: Convert all page imports to `React.lazy()` with `Suspense` fallback using `LogoLoader`.

### 6. Mobile Sidebar Improvements
The sidebar has 12–25 items per role but no collapsible groups on mobile.
- **Fix**: Auto-collapse sidebar groups on mobile, show only the active group expanded.

### 7. Breadcrumb Navigation
No breadcrumb anywhere. Deep pages like `/course/:id/assignments` have no way back except browser back.
- **Fix**: Add a `Breadcrumb` component to `MainLayout` that auto-generates from the current route.

### 8. Global Search (Cmd+K)
No way to search across courses, notes, or features.
- **Fix**: Add a `cmdk` command palette (already installed) wired to course catalog, sidebar nav items, and notes search.

### 9. 404 Page Enhancement
`NotFound` page exists but provides no helpful navigation.
- **Fix**: Add role-aware suggested links (dashboard, courses, AI tools) and a search bar on the 404 page.

---

## C. Feature Completions

### 10. Notes Table (Missing DB)
`MyNotesPage` tries to query notes but there's no `notes` or `student_notes` table in the schema.
- **Fix**: Create a `student_notes` table (id, user_id, title, content, course_id nullable, lesson_id nullable, created_at, updated_at) with RLS. Update `MyNotesPage` to use it.

### 11. Attendance Tracking Table
`ParentAttendancePage` exists but there's no `attendance` table.
- **Fix**: Create `attendance` table (id, student_id, date, status, recorded_by, course_id) with RLS policies for teachers to record and guardians/students to view.

### 12. Teacher Collaboration Hub
Sidebar links to `/community` for teachers, but there's no teacher-specific collaboration features.
- **Fix**: Create `TeacherCollaborationHubPage` with resource sharing, discussion threads filtered to teacher role, and peer observation scheduling.

### 13. Study Group CRUD
`StudyGroupsPage` exists but study groups aren't stored in DB — they're just chat rooms.
- **Fix**: Create a `study_groups` table (id, name, subject, grade_level, max_members, created_by, is_public) with a `study_group_members` junction table. Update the page to support creating/joining/leaving groups.

### 14. Certificate Generation
`Achievements` page shows badges but no course completion certificates.
- **Fix**: When a student completes all lessons in a course, generate a certificate record. Add a `certificates` table and a downloadable certificate view.

---

## D. Data & Analytics

### 15. Student Streak Calculation
`StudentDashboardView` shows a streak stat but it's calculated ad-hoc from `focus_sessions`.
- **Fix**: Create a proper `user_streaks` table or a DB function that calculates consecutive study days from `focus_sessions` + `lesson_completions` + `quiz_attempts`.

### 16. Teacher Grade Distribution Charts
`TeacherAnalyticsPage` exists but lacks visual grade distribution charts.
- **Fix**: Add recharts bar/pie charts showing grade distribution across courses, pass/fail rates, and submission timeline.

### 17. Guardian Weekly Summary Emails
`guardian_reports` table exists but reports are never auto-generated.
- **Fix**: Create a scheduled edge function or trigger that generates weekly summary reports (courses progress, quiz scores, focus time) for each guardian link.

---

## E. Quality of Life

### 18. Dark Mode Persistence
Theme is managed by `ThemeContext` but the selection may not persist across sessions for logged-in users.
- **Fix**: Save theme preference to `profiles` table (add `theme_preference` column) and load on login.

### 19. Offline-First Notes
Notes should work offline since this is a PWA.
- **Fix**: Use localStorage as a write-through cache for `student_notes`. Sync to DB when back online using `useOfflineSync`.

### 20. Toast Notification Deduplication
Multiple toast libraries in use (`sonner` and `@radix-ui/react-toast`). Some pages use one, some the other.
- **Fix**: Standardize on `sonner` across all pages. Remove `@radix-ui/react-toast` usage to avoid duplicate toast stacks.

---

## Implementation Order

**Phase 1** (Critical fixes): Items 1–4, 10, 11
**Phase 2** (UX): Items 5, 7, 8, 9, 20
**Phase 3** (Features): Items 12, 13, 14
**Phase 4** (Data): Items 15, 16, 17
**Phase 5** (Polish): Items 6, 18, 19

## Database Changes Required
- `student_notes` table with RLS
- `attendance` table with RLS
- `study_groups` + `study_group_members` tables with RLS
- `certificates` table with RLS
- `theme_preference` column on `profiles`
- Streak calculation DB function

## Files to Create
~8 new pages/components, ~3 hooks, ~1 edge function

## Files to Modify
- `App.tsx` — lazy imports, missing routes, PostLoginGate wrapping
- `InstitutionDashboardView.tsx` — live data
- `MinistryDashboard.tsx` — live data
- `MainLayout.tsx` — breadcrumbs, cmd+k
- `sidebarConfig.ts` — fix messenger links
- Multiple pages — standardize toast library

