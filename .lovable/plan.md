

# Test & Improve: Comprehensive Quality Pass

After reviewing all 18+ new pages, routing, sidebar config, and database schema, here's what I found and what needs fixing/improving.

---

## Issues Found

### 1. NotificationPreferencesPage doesn't persist preferences
Preferences are stored in local React state only — they reset on page reload. Need to save to `localStorage` or a DB table.

### 2. DataExportPage uses `(supabase as any)` for typed tables
Several pages cast `supabase as any` for tables like `grades`, `lesson_completions` that may not be in the generated types yet. This works at runtime but indicates the types file is out of sync. Not a blocker but should be noted.

### 3. PomodoroPage sound data URI is truncated
The base64 audio string on line 34 is incomplete — it will fail silently. Should use a proper notification sound or the Web Audio API.

### 4. Spaced Repetition "Add Card" doesn't work from deck list
When clicking "Add" on a deck from the list view, `setActiveDeck` is called but `cards` array stays empty, so the review UI shows but with no cards. The add card dialog opens but after adding, `startReview` only loads *due* cards — new cards (with `next_review_date = today`) should appear.

### 5. Missing `title` field in `student_notes` table usage
`MyNotesPage` doesn't show or edit the `title` column from `student_notes`. Notes lack titles in the UI.

### 6. No error handling on several pages
Most pages silently ignore Supabase errors. Failed queries show empty state instead of error feedback.

---

## Improvements Plan

### A. Fix NotificationPreferences persistence (localStorage)
Save preferences to `localStorage` on save, load on mount.

### B. Fix Pomodoro sound
Replace truncated base64 with Web Audio API beep generator.

### C. Fix Spaced Repetition add-from-list flow
When adding a card from the deck list, load *all* cards for the deck (not just due), then show the add dialog. After adding, refresh properly.

### D. Add error toasts across all new pages
Add `toast.error()` calls when Supabase queries fail on: BookmarksPage, ReadingListPage, SpacedRepetitionPage, TeacherAnnouncementsPage, GuardianRewardSystemPage, GuardianHomeworkTrackerPage, TeacherReportCardsPage.

### E. Add note title support to MyNotesPage
Show and allow editing the `title` field for notes.

### F. Improve NotificationPreferencesPage UX
Add a "reset to defaults" button and visual confirmation of saved state.

### G. Polish empty states
Add call-to-action buttons in empty states across BookmarksPage (link to course catalog), ReadingListPage, and SpacedRepetitionPage.

### H. Add loading skeleton states
Replace `LogoLoader` full-page spinners with inline skeleton cards on Bookmarks, Reading List, and Spaced Repetition pages for smoother UX.

---

## Implementation Order
1. Fix Pomodoro sound (Web Audio API beep)
2. Fix Spaced Repetition add-from-list flow
3. Fix NotificationPreferences persistence
4. Add error handling toasts to all new pages
5. Add note title to MyNotesPage
6. Polish empty states with CTAs
7. Add skeleton loading states

**Estimated scope**: ~7 file edits, no database changes needed.

