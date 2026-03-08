

# Next Moves: Batch B + C Implementation

## What's Done (Batch A)
- Global command palette (Cmd+K), mobile bottom nav, breadcrumbs, onboarding tour
- Daily check-in, study leaderboard, course reviews, certificate generator
- 6 new DB tables with RLS

## What's Next

### Batch B: Teacher & Guardian Tools (Items 11-18)

**Teacher Power Tools:**
1. **AI Lesson Plan Generator page** — New `TeacherLessonPlanPage.tsx` with topic input form, calls existing `ai-lesson-generator` edge function, renders structured plan (objectives, activities, assessment), save-as-course button
2. **Bulk Grade Import** — New `TeacherBulkGradePage.tsx` with CSV file upload, parse/preview table, validate columns (student_id, course_id, score, term), batch insert into `grades` table
3. **Assignment Analytics Dashboard** — New `TeacherAssignmentAnalyticsPage.tsx` pulling from `assignments`, `submissions`, `grades` tables; Recharts bar/line charts for submission rates, avg scores, late submissions
4. **Student Performance Alerts** — Add alert cards to existing teacher dashboard querying students with avg grade < 50%; show name, course, score trend
5. **Attendance QR Code** — New `TeacherAttendanceQRPage.tsx` generating a time-limited code (random string + timestamp), student scans and submits to `attendance` table; validate within 5-min window

**Guardian Upgrades:**
6. **Weekly Digest** — New edge function `guardian-weekly-digest` that queries linked student stats and inserts into `guardian_reports`; new `GuardianDigestPage.tsx` to view reports
7. **Real-Time Activity Feed** — New `GuardianActivityFeedPage.tsx` subscribing to `lesson_completions`, `quiz_attempts`, `focus_sessions` via Supabase realtime for linked students
8. **Guardian-Student Messaging** — Enhance existing `MessengerPage.tsx` to auto-create a chat room between guardian and linked student if none exists

**DB Migration:** Add `attendance` table if missing (student_id, course_id, date, status, marked_via)

### Batch C: Ministry Analytics + Cybersecurity (Items 19-28)

**Ministry:**
9. **Interactive Province Map** — SVG map component of Zambia's 10 provinces with click handlers; color-coded by enrollment/dropout metrics from `profiles` aggregation
10. **Live Platform Statistics** — Real-time counter widget calling `get_platform_stats()` with 30s polling, displayed on MinistryDashboard
11. **Audit Trail** — Ministry pages log actions to `audit_logs` table; new `MinistryAuditPage.tsx` showing filterable log list
12. **School Comparison Tool** — New `MinistrySchoolComparisonPage.tsx` selecting 2-3 schools, side-by-side cards with enrollment, pass rate, teacher count

**Cybersecurity:**
13. **CTF Scoreboard** — Enhance `CyberCTFPage.tsx` with live leaderboard from `ctf_submissions`, countdown timer, flag submission form
14. **Vulnerability Scanner Simulator** — New `CyberVulnScannerPage.tsx` with target config form, simulated scan output (fake Nessus-style report)
15. **Cyber Kill Chain Visualizer** — New `CyberKillChainPage.tsx` with 7-phase interactive diagram, click-to-expand details per phase
16. **Security Report Writer** — New `CyberReportWriterPage.tsx` with guided template form, AI-assisted executive summary via Lovable AI (Gemini 2.5 Flash)
17. **Hacking Challenge Persistence** — Update `HackingTerminalPage.tsx` to save completions to a new `cyber_challenges` DB table

**DB Migration:** `cyber_challenges` table (user_id, challenge_name, points, completed_at) with user-scoped RLS

### Routing & Navigation
- Register all new pages in `App.tsx` with lazy imports
- Add nav items to `sidebarConfig.ts` for teacher, guardian, ministry, and cybersecurity roles
- Add new routes to `ROUTE_LABELS` in `MainLayout.tsx` for breadcrumbs

### Implementation Order
1. DB migrations first (attendance if needed, cyber_challenges)
2. Teacher tools (5 pages)
3. Guardian tools (3 pages + 1 edge function)
4. Ministry analytics (4 pages)
5. Cybersecurity features (5 pages)
6. Route/nav wiring

This produces ~17 new pages and 1 edge function across 2 batches.

