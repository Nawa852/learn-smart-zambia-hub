

# Plan: Teacher Experience -- Next Phase to 76-82%

## Current State (~70%)

**Working with real data:**
- Dashboard stats (students, courses, pending grading, avg performance) from `useTeacherStats`
- My Courses list with enrollment counts and avg scores
- Pending grading queue with student names and links
- Student alerts (low-scoring students identified automatically)
- AI Lesson Generator with streaming via edge function (Gemini)
- Course creation with lessons, assignment creation + grading
- `/teacher-dashboard` route properly redirects to role-based Dashboard

**Still broken/hardcoded:**
- `/courses` page (teacher sidebar "My Classes") shows 6 hardcoded mock courses, not DB data
- `/analytics` page shows hardcoded student-oriented analytics (47 hours study time, streak: 12, etc.) -- not teacher analytics
- Smart Marking tab is a placeholder ("Coming Soon" button, no real functionality)
- Standalone `TeacherDashboard.tsx` page still exists with all hardcoded data (156 students, mock classes, fake setTimeout AI generator)
- No student roster view -- teachers can't see who's enrolled in their courses
- No way to save AI-generated lesson plans as actual courses

## Changes to Make

### 1. Replace `/courses` with Teacher's Own Courses
Rewrite `Courses.tsx` to detect if user is a teacher and show their DB courses (from `useTeacherStats`) instead of the hardcoded array. Students continue seeing the catalog view.

### 2. Teacher Analytics Page
Create a new `TeacherAnalyticsPage.tsx` that shows:
- Enrollment trends across courses (real data from `enrollments`)
- Submission/grading stats (from `submissions`)
- Per-course performance breakdown with avg scores
- Student completion rates from `lesson_completions`

Wire `/analytics` for teachers to this new page instead of the student-oriented `LearningAnalytics`.

### 3. Student Roster per Course
Add a "Students" tab or section to `CourseDetailPage` visible only to the course creator, listing enrolled students with their progress percentage and last activity.

### 4. Save AI Lesson as Course
Add a "Save as Course" button after AI lesson generation in `TeacherDashboardView`. It will create a new draft course + lesson in the DB using the generated content, then navigate to edit it.

### 5. Smart Marking -- Wire to Real Grading
Replace the "Coming Soon" placeholder in the marking tab with a direct link to the teacher's pending submissions (reuse existing `pendingSubmissions` data), allowing inline grading with score + feedback right from the dashboard.

### 6. Remove Standalone TeacherDashboard Page
Delete `src/pages/TeacherDashboard.tsx` -- it's fully redundant with `TeacherDashboardView` and contains only hardcoded data.

## Files to Create
- `src/pages/TeacherAnalyticsPage.tsx` -- real teacher analytics with DB queries

## Files to Modify
- `src/pages/Courses.tsx` -- detect teacher role, show own courses from DB
- `src/components/Dashboard/TeacherDashboardView.tsx` -- add "Save as Course" button, inline grading in marking tab
- `src/pages/CourseDetailPage.tsx` -- add student roster section for course creator
- `src/App.tsx` -- route `/analytics` conditionally or add `/teacher-analytics` route, remove TeacherDashboard import
- `src/components/Sidebar/sidebarConfig.ts` -- update teacher nav links (Analytics -> teacher-analytics, My Classes -> courses)

## Files to Delete
- `src/pages/TeacherDashboard.tsx`

## No Database Changes Needed
All required tables exist.

