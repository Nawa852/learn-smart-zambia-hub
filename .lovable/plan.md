

# Next Phases: 30 New Features

Based on the audit of what exists (150+ pages, 8 roles, 25+ DB tables) vs what's missing for a real platform, here are 30 concrete new features organized into 5 phases.

---

## Phase 3: Data Reality (Replace Hardcoded → Live DB)

| # | Feature | What it does |
|---|---------|-------------|
| 1 | **Live Course Catalog** | Rewrite `Courses.tsx` to query `courses` table instead of hardcoded array. Show real enrollment counts from `enrollments`. |
| 2 | **File Upload for Study Materials** | Add file upload UI (PDF/PPT/images) to course creation and study materials pages using storage buckets. |
| 3 | **ECZ Past Papers from DB** | Create `past_papers` table, admin upload UI, replace hardcoded list in `ECZPastPapersPage`. |
| 4 | **Real Quiz Results Persistence** | Wire `ECZExamSimulatorPage` and `ECZPracticeQuizPage` to save results to `quiz_attempts` table and show history. |
| 5 | **Seeded Demo Content** | DB migration with 10 sample courses, 30 lessons, 5 study groups so new users see content on first login. |
| 6 | **Teacher Gradebook** | Functional grade entry page for teachers that writes to `grades` table, viewable by students and guardians. |

## Phase 4: Real Communication

| # | Feature | What it does |
|---|---------|-------------|
| 7 | **Real-time Messenger** | Add `messages` table to `supabase_realtime`, update `MessengerChat` to subscribe to `postgres_changes` for live chat. |
| 8 | **In-App Notification Center** | Functional notification bell that queries `notifications` table with mark-as-read, with real-time subscription. |
| 9 | **Announcement System** | Teachers/admins can broadcast announcements to enrolled students. Creates notifications for each recipient via DB trigger. |
| 10 | **Parent-Teacher Messaging** | Wire `ParentMessagesPage` and `ParentTeacherContactPage` to real chat rooms between guardians and course teachers. |
| 11 | **Study Group Chat** | `StudyGroupChatPage` uses real-time messages scoped to group, with member list from `study_group_members`. |
| 12 | **Email Notifications** | Configure Resend integration for key events: enrollment confirmation, grade posted, assignment due reminder. |

## Phase 5: Security & Data Integrity

| # | Feature | What it does |
|---|---------|-------------|
| 13 | **Edge Function JWT Enforcement** | Set `verify_jwt = true` for all 25+ edge functions in `config.toml`. Add auth header checks inside each function. |
| 14 | **Fix RESTRICTIVE RLS Policies** | Audit all tables — convert conflicting RESTRICTIVE policies to PERMISSIVE where multiple SELECT policies exist (e.g., `submissions`, `grades`, `notifications`, `enrollments`, `focus_sessions`). |
| 15 | **Add Foreign Keys** | Migration to add FK constraints: `submissions.assignment_id → assignments.id`, `certificates.course_id → courses.id`, `enrollments.course_id → courses.id`, etc. |
| 16 | **Rate Limiting Middleware** | Add rate limiting to AI edge functions (max 20 calls/min per user) using a `rate_limits` table or in-memory tracking. |
| 17 | **Global Error Boundary** | React error boundary component wrapping the app that catches crashes and shows a recovery UI instead of blank screen. |
| 18 | **Input Sanitization** | Enforce `inputValidation.ts` across all forms — course creation, notes, chat messages, profile updates. |

## Phase 6: Engagement & Gamification

| # | Feature | What it does |
|---|---------|-------------|
| 19 | **XP Triggers** | DB triggers that award XP on: lesson completion (+10), quiz pass (+25), course completion (+100), study group join (+5). Updates `profiles.xp` field (add column). |
| 20 | **EduCoin Economy** | Add `edu_coins` column to profiles. Award coins for streaks, quiz scores. Allow spending on premium AI features. |
| 21 | **Daily Streak Tracker** | Track consecutive days of activity. Visual streak counter on dashboard. Bonus XP for 7/30-day streaks. |
| 22 | **Leaderboard** | Global and per-school leaderboards based on XP. Weekly/monthly/all-time filters. |
| 23 | **Certificate Generator** | Auto-generate certificate when course completed (100% lessons). PDF download with unique certificate number from `certificates` table. |
| 24 | **Badge System** | Define 20+ badges (First Quiz, 7-Day Streak, 10 Courses, etc.) with unlock conditions checked via DB function. |

## Phase 7: Platform Polish & Scale

| # | Feature | What it does |
|---|---------|-------------|
| 25 | **Unified Toast System** | Remove `@radix-ui/react-toast`, standardize all notifications to `sonner`. Single toast provider. |
| 26 | **Content Search** | Full-text search across courses, notes, materials using Postgres `tsvector` search. Wire to Cmd+K palette. |
| 27 | **Mobile Navigation Overhaul** | Collapsible sidebar groups, bottom tab bar on mobile, swipe gestures for navigation. |
| 28 | **Profile Completion Meter** | Dashboard widget showing % of profile filled (avatar, bio, school, grade). Prompts to complete. |
| 29 | **Course Ratings & Reviews** | `course_reviews` table. Students rate courses 1-5 stars with text review. Average shown on catalog cards. |
| 30 | **Export & Data Portability** | Users can export their notes, quiz history, and certificates as JSON/PDF from Settings page. |

---

## Implementation Order Summary

```text
Phase 3 (Data Reality):      Items 1-6    — Make existing pages use real data
Phase 4 (Communication):     Items 7-12   — Real-time chat, notifications, email
Phase 5 (Security):          Items 13-18  — JWT, RLS fixes, error handling
Phase 6 (Gamification):      Items 19-24  — XP, coins, streaks, certificates
Phase 7 (Polish):            Items 25-30  — Search, mobile, reviews, export
```

Each phase should be implemented as a batch. Phases 3 and 5 are the highest priority since they fix broken functionality. Phase 4 makes the social features real. Phases 6 and 7 add engagement and polish.

