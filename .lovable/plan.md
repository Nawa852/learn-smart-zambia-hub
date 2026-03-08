

# Plan: Guardian Experience to 76-82%

## Current State (~45%)

**What exists:**
- GuardianDashboardView with nice UI but 100% hardcoded data (fake students, fake stats, fake insights)
- Standalone ParentDashboard page -- also fully hardcoded, redundant with GuardianDashboardView
- 8 parent sub-pages (Grades, Children, Attendance, Progress, Alerts, Messages, Teacher Contact, School Updates) -- all hardcoded static arrays
- Guardian sidebar navigation with correct routes
- `guardian_links` table in DB (student_id, guardian_name, phone, email, mode, status)
- `guardian_reports` table in DB (student_id, report_data JSON)
- `grades` table with student_id, course_id, score, grade_letter

**What's broken:**
- Zero DB queries across all guardian pages -- every page shows fake "Brighton Mwamba" and "Sarah Banda" with hardcoded grades
- No way for guardians to actually link to real students (guardian_links only has student_id, no guardian user_id)
- Dashboard weekly summary (28h study, 85% avg, 24 lessons, 45 AI sessions) is static
- ParentDashboard.tsx is redundant with GuardianDashboardView
- Messages page has hardcoded teacher list, no real messaging
- Alerts page has hardcoded alerts, not from notifications table

## Database Changes

Add `guardian_id` to `guardian_links` so guardians can find their linked students:

```sql
ALTER TABLE public.guardian_links ADD COLUMN guardian_id uuid;
CREATE POLICY "Guardians can view their links" ON public.guardian_links 
  FOR SELECT TO authenticated USING (guardian_id = auth.uid());
```

## Code Changes

### Task 1: Create `useGuardianData` hook
Query `guardian_links` where `guardian_id = user.id` to get linked students. For each student, fetch:
- Profile (name, grade, school)
- Enrollments + lesson_completions (progress %)
- Grades (from `grades` table)
- Recent activity (last 5 lesson_completions + submissions)
- Quiz attempts (avg scores)

### Task 2: Rewrite GuardianDashboardView with live data
- Replace hardcoded `linkedStudents` with real data from `useGuardianData`
- Weekly summary pulls from lesson_completions and quiz_attempts for linked students in last 7 days
- Show empty state with "Link a Student" CTA if no students linked
- "Insights" section shows real data: subjects where score is declining, recent achievements

### Task 3: Rewrite ParentChildrenPage with real data
- Use `useGuardianData` to show actual linked children
- Subjects from `grades` table, activity from `lesson_completions`
- Achievements from `user_stats` (if student has them)

### Task 4: Rewrite ParentGradesPage with real data
- Query `grades` table for linked students' courses
- Show real CA scores, final grades, trends based on historical grade records

### Task 5: Wire Alerts to real notifications
- ParentAlertsPage: query `notifications` for linked student IDs
- Show real grade drops, assignment submissions, streak milestones

### Task 6: Clean up duplicates
- Delete `src/pages/ParentDashboard.tsx` (redundant)
- Update `/parent-dashboard` route to use role-based `Dashboard` component
- Wire "Messages" to existing MessengerPage / chat system

## Files to Create
- `src/hooks/useGuardianData.tsx` -- fetches linked students + their academic data

## Files to Modify
- `src/components/Dashboard/GuardianDashboardView.tsx` -- full rewrite with live data
- `src/pages/ParentChildrenPage.tsx` -- real student data
- `src/pages/ParentGradesPage.tsx` -- real grades from DB
- `src/pages/ParentAlertsPage.tsx` -- real notifications
- `src/pages/ParentProgressTrackerPage.tsx` -- real progress from lesson_completions/quiz_attempts
- `src/App.tsx` -- fix `/parent-dashboard` route, remove ParentDashboard import
- `src/components/Sidebar/sidebarConfig.ts` -- update dashboard link

## Files to Delete
- `src/pages/ParentDashboard.tsx`

## No other DB changes needed
`grades`, `lesson_completions`, `enrollments`, `notifications`, `quiz_attempts` tables all exist with appropriate RLS.

## Result
Moves guardian experience from ~45% (beautiful UI, all fake data) to ~80% (real linked students, live grades/progress/alerts from DB).

