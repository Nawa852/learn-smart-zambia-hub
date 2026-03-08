

# Plan: Teacher Experience to 76-82%

## Current State (~55%)

**What works (with real DB data):**
- Course creation (CreateCoursePage) -- saves to Supabase with lessons
- Assignment creation + grading (AssignmentPage) -- full teacher/student flow with file uploads
- Course catalog (CourseCatalogPage) -- reads from DB
- Course detail with lesson viewer + completion tracking
- Notification triggers for new assignments and graded submissions
- Teacher sidebar navigation with correct links

**What's hardcoded/broken:**
- **TeacherDashboardView**: All stats (124 students, 6 classes, 23 pending, 78% avg), classes list, student alerts, and pending tasks are static arrays -- zero DB queries
- **TeacherDashboard page**: Duplicate standalone page with its own hardcoded data (156 students, 48 lessons, etc.), also wraps MainLayout redundantly
- **Courses page** (`/courses`): Uses hardcoded array of 6 mock courses, not DB
- **CourseManagement** (`/instructor`): Uses hardcoded array of 3 mock courses
- **ECZAssignmentHubPage**: Placeholder cards with no functionality
- No teacher-specific student roster or class management
- AI Lesson Builder tab has no actual AI integration (just a `setTimeout`)

## Gaps to Close

### 1. Live Teacher Dashboard Stats
Replace all hardcoded stats in `TeacherDashboardView` with real queries:
- Count enrollments across teacher's courses for "Total Students"
- Count teacher's published courses for "Active Classes"
- Count ungraded submissions for "Pending Assignments"
- Calculate avg scores from `submissions` table

### 2. My Classes with Real Data
Replace hardcoded `myClasses` array with actual courses from DB, showing:
- Real enrollment count per course
- Real avg submission score per course
- Link to course detail / assignment page

### 3. Pending Tasks from DB
Query `submissions` where `graded_at IS NULL` joined with teacher's assignments to show real pending grading tasks with counts.

### 4. Student Alerts from Real Data
Query students with: missing submissions (overdue assignments), low avg scores, or declining performance across teacher's courses.

### 5. AI Lesson Generator Integration
Connect the lesson builder tab to an edge function using Lovable AI (Gemini) to actually generate ECZ-aligned lesson plans from the teacher's prompt, then allow saving as a new course/lesson.

### 6. Remove Duplicate Pages
- Remove standalone `TeacherDashboard` page (redundant with `TeacherDashboardView`)
- Update `/teacher-dashboard` route to use the role-based `Dashboard` component
- Fix `/courses` to show teacher's own courses from DB instead of hardcoded data

## Database Changes

None needed -- all required tables exist (`courses`, `enrollments`, `submissions`, `assignments`, `lesson_completions`, `profiles`).

## Code Changes

### Task 1: Create `useTeacherStats` hook
New file `src/hooks/useTeacherStats.tsx` that queries:
- `courses` where `created_by = user.id` (count + list)
- `enrollments` joined with teacher's courses (total student count)
- `submissions` where `graded_at IS NULL` for teacher's assignments (pending count)
- `submissions` avg score across teacher's courses

### Task 2: Rewrite TeacherDashboardView with live data
- Import and use `useTeacherStats`
- Replace all hardcoded arrays with real query results
- "My Classes" shows actual courses with enrollment counts
- "Pending Tasks" shows real ungraded submissions grouped by assignment
- "Student Alerts" shows students with low/declining scores

### Task 3: Wire up AI Lesson Generator
- Create edge function `supabase/functions/ai-lesson-generator/index.ts` using Lovable AI (Gemini 2.5 Flash) to generate lesson plans from subject+grade+topic
- Connect the "Generate Complete Lesson Plan" button to call this function
- Display generated content and allow "Save as Course" action

### Task 4: Clean up duplicate/mock pages
- Update `/teacher-dashboard` route to render `<Dashboard />` (which already handles role-based view)
- Update `/courses` route for teachers to query their own courses from DB
- Remove or redirect `/instructor` to `/create-course`

## Files to Create
- `src/hooks/useTeacherStats.tsx`
- `supabase/functions/ai-lesson-generator/index.ts`

## Files to Modify
- `src/components/Dashboard/TeacherDashboardView.tsx` -- full rewrite with live data
- `src/App.tsx` -- fix `/teacher-dashboard` route, clean up duplicates
- `src/components/Sidebar/sidebarConfig.ts` -- ensure teacher nav links point to correct pages

## Estimated Result
These changes move the teacher experience from ~55% (nice UI, all mock data) to ~80% (real stats, real class management, working AI lesson generator, no dead-end pages).

