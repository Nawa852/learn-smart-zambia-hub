

# 30+ New Features & Improvements Plan

## Analysis
The platform has ~200 pages across 10 roles. Key gaps identified: no Pomodoro timer, no course reviews/ratings on catalog, no dark mode toggle in sidebar, no bookmark system, no reading list, no PDF export for notes, no spaced repetition engine, no student timetable, no homework reminders, no peer tutoring marketplace, and many sidebar nav items pointing to pages that exist but lack polish.

---

## Feature List (32 features + improvements)

### Student Learning (8 new)
1. **Pomodoro Timer Page** — Dedicated `/pomodoro` page with 25/5/15 intervals, session counter, auto-break, ambient sounds selector, saves to `focus_sessions`
2. **Bookmark/Save System** — New `bookmarks` DB table; bookmark any course, lesson, past paper, or resource; `/bookmarks` page with filters
3. **Spaced Repetition Engine** — Enhance flashcards with SM-2 algorithm; new `flashcard_decks` and `flashcard_cards` tables with next_review_date, ease_factor
4. **Reading List / Watch Later** — New `reading_list` table; save external resources, ECZ videos, articles for later; `/reading-list` page
5. **PDF Notes Export** — Add "Export as PDF" button to MyNotesPage using browser print API
6. **Study Streak Calendar** — Heatmap visualization (GitHub-style) of daily activity on dashboard, pulling from `focus_sessions`, `lesson_completions`, `quiz_attempts`
7. **Homework Reminders** — Edge function `homework-reminder` that checks upcoming assignment due dates and creates notifications 24h before
8. **Course Bookmarks & Ratings** — Add average rating display to CourseCatalogPage; new `course_reviews` table (if not exists, enhance existing)

### Teacher Tools (5 new)
9. **Student Report Card Generator** — New `/teacher-report-cards` page; select student, auto-populate grades across courses, generate printable report card
10. **Class Announcements Board** — New `class_announcements` table; teachers post announcements per course; students see on course detail page
11. **Rubric Builder** — New `/teacher-rubric-builder` page; create grading rubrics with criteria/levels; attach to assignments
12. **Parent Communication Log** — Track all parent-teacher interactions in `communication_logs` table; view history on teacher dashboard
13. **Seating Chart Generator** — Visual drag-drop seating arrangement tool for classroom management

### Guardian Enhancements (3 new)
14. **Homework Tracker** — Guardian sees upcoming/overdue assignments for linked students
15. **Reward System** — Guardians set reward milestones (e.g., "10 lessons = movie night"); tracked in `guardian_rewards` table
16. **Study Time Comparison** — Compare study hours across linked children with bar charts

### Cybersecurity (4 new)
17. **Password Strength Analyzer** — Interactive tool to test password strength with real-time scoring
18. **Phishing Email Simulator** — Quiz-style page showing real vs phishing emails; score accuracy
19. **Security Awareness Quiz** — Curated quiz on social engineering, safe browsing, data privacy
20. **Cyber Glossary** — Searchable A-Z glossary of cybersecurity terms

### Developer (3 new)
21. **GitHub Integration Display** — Show GitHub contribution graph and pinned repos on developer dashboard
22. **API Playground** — Interactive REST API tester (like Postman lite) for learning API concepts
23. **Algorithm Visualizer** — Step-through animations for sorting/searching algorithms

### Skills Development (3 new)
24. **Micro-Certification Badges** — Award verifiable badges after completing skill assessments; link to `certificates` table
25. **Peer Review System** — Portfolio items can receive feedback from other skills students
26. **Daily Skills Challenge** — One-a-day quick challenge in chosen skill area

### Platform-Wide Improvements (6)
27. **Global Search Enhancement** — Cmd+K now searches courses, lessons, past papers, and users (not just nav items)
28. **Notification Preferences** — New settings section to toggle notification types (email, push, in-app) per category
29. **Accessibility Improvements** — Add `aria-labels`, keyboard navigation, skip-to-content link, high-contrast mode toggle
30. **Data Export (Student)** — Export personal data (grades, progress, notes) as CSV from settings
31. **Onboarding Checklist Widget** — Persistent sidebar widget showing setup completion % (profile, first course, first quiz, etc.)
32. **Mobile Swipe Gestures** — Swipe left/right to navigate between sidebar sections on mobile

---

## Database Migrations Required

```sql
-- 1. Bookmarks table
CREATE TABLE public.bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  item_type text NOT NULL, -- 'course','lesson','past_paper','resource'
  item_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 2. Flashcard decks & cards (spaced repetition)
CREATE TABLE public.flashcard_decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  subject text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own decks" ON public.flashcard_decks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.flashcard_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id uuid REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
  front text NOT NULL,
  back text NOT NULL,
  ease_factor numeric NOT NULL DEFAULT 2.5,
  interval_days integer NOT NULL DEFAULT 0,
  repetitions integer NOT NULL DEFAULT 0,
  next_review_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.flashcard_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own cards" ON public.flashcard_cards FOR ALL USING (EXISTS (SELECT 1 FROM flashcard_decks WHERE id = flashcard_cards.deck_id AND user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM flashcard_decks WHERE id = flashcard_cards.deck_id AND user_id = auth.uid()));

-- 3. Reading list
CREATE TABLE public.reading_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  url text,
  item_type text DEFAULT 'article',
  completed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.reading_list ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own reading list" ON public.reading_list FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. Class announcements
CREATE TABLE public.class_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  teacher_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  priority text DEFAULT 'normal',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.class_announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage announcements" ON public.class_announcements FOR ALL USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Enrolled students view announcements" ON public.class_announcements FOR SELECT USING (EXISTS (SELECT 1 FROM enrollments WHERE course_id = class_announcements.course_id AND user_id = auth.uid()));

-- 5. Guardian rewards
CREATE TABLE public.guardian_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guardian_id uuid NOT NULL,
  student_id uuid NOT NULL,
  title text NOT NULL,
  target_lessons integer DEFAULT 10,
  current_progress integer DEFAULT 0,
  claimed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.guardian_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guardians manage rewards" ON public.guardian_rewards FOR ALL USING (auth.uid() = guardian_id) WITH CHECK (auth.uid() = guardian_id);
CREATE POLICY "Students view own rewards" ON public.guardian_rewards FOR SELECT USING (auth.uid() = student_id);

-- 6. Communication logs
CREATE TABLE public.communication_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL,
  parent_id uuid NOT NULL,
  student_id uuid,
  subject text NOT NULL,
  notes text,
  communication_type text DEFAULT 'message',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage own logs" ON public.communication_logs FOR ALL USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Parents view own logs" ON public.communication_logs FOR SELECT USING (auth.uid() = parent_id);
```

## New Pages (~18 pages)
| Page File | Route | Role |
|---|---|---|
| PomodoroPage.tsx | /pomodoro | Student |
| BookmarksPage.tsx | /bookmarks | All |
| SpacedRepetitionPage.tsx | /spaced-repetition | Student |
| ReadingListPage.tsx | /reading-list | Student |
| StudyStreakCalendarPage.tsx | /study-streak | Student |
| TeacherReportCardsPage.tsx | /teacher-report-cards | Teacher |
| TeacherAnnouncementsPage.tsx | /teacher-announcements | Teacher |
| TeacherRubricBuilderPage.tsx | /teacher-rubric-builder | Teacher |
| GuardianHomeworkTrackerPage.tsx | /guardian-homework | Guardian |
| GuardianRewardSystemPage.tsx | /guardian-rewards | Guardian |
| GuardianStudyComparisonPage.tsx | /guardian-study-comparison | Guardian |
| CyberPasswordAnalyzerPage.tsx | /cybersecurity/password-analyzer | Cyber |
| CyberPhishingSimPage.tsx | /cybersecurity/phishing-sim | Cyber |
| CyberGlossaryPage.tsx | /cybersecurity/glossary | Cyber |
| DevAPIPlaygroundPage.tsx | /developer/api-playground | Developer |
| DevAlgorithmVisualizerPage.tsx | /developer/algorithms | Developer |
| NotificationPreferencesPage.tsx | /notification-preferences | All |
| DataExportPage.tsx | /data-export | Student |

## Improvements (no new pages)
- Enhance Cmd+K to search courses/lessons/papers
- Add PDF export button to MyNotesPage
- Add study streak heatmap widget to student dashboard
- Add onboarding checklist widget to sidebar
- Add aria-labels and keyboard nav across all components
- Add course rating display to CourseCatalogPage
- Add class announcements section to CourseDetailPage
- Enhance notification settings in SettingsPage

## Implementation Order
1. DB migrations (6 tables)
2. Student features: Pomodoro, Bookmarks, Spaced Repetition, Reading List, Streak Calendar, PDF Export, Data Export (8 pages + improvements)
3. Teacher features: Report Cards, Announcements, Rubric Builder (3 pages)
4. Guardian features: Homework Tracker, Rewards, Study Comparison (3 pages)
5. Cybersecurity: Password Analyzer, Phishing Sim, Glossary (3 pages)
6. Developer: API Playground, Algorithm Visualizer (2 pages)
7. Platform-wide improvements: Cmd+K search, accessibility, notification preferences, onboarding checklist
8. Route/nav wiring in App.tsx, sidebarConfig.ts, MainLayout.tsx

