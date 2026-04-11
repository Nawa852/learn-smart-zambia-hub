

## Plan: Minimize Pages While Maintaining Features

### The Problem
The app has **300+ routes** and **250+ lazy-loaded pages**, many of which are near-duplicates or micro-features that should be sections within a larger page. This creates confusion, slow load times, and an unmaintainable codebase.

### Strategy: Consolidate into ~30 Core Pages Using Tabs

Instead of hundreds of standalone pages, each role gets a small set of **hub pages** with internal tab navigation. Features don't disappear — they become tabs or sections within a hub.

### Proposed Page Structure

**Shared (all roles): 8 pages**
| Page | Absorbs |
|------|---------|
| `/dashboard` | smart-dashboard, comprehensive-dashboard, daily-goal-coach |
| `/learn` | my-courses, course-catalog, lessons, classroom, video-learning, youtube-learning, adaptive-content, live-learning, adaptive-course, adaptive-learning |
| `/ai` | ai-tutor, multi-ai-tutor, enhanced-ai-tutor, ai-study-buddy, ai-study-helper, ai-study-mentor, comprehensive-ai, study-assistant, ai-exam-prep, ai-content-generator, ai-resource-finder, ai-scheduler, ai-task-manager, ai-feedback, flashcards, mind-maps, teach-back, adaptive-difficulty + ~20 more AI pages |
| `/prepare` | study-planner, focus-mode, my-notes, goals, journaling, pomodoro, spaced-repetition, reading-list, bookmarks, study-goal-tracker, study-streak |
| `/connect` | communication-hub, messenger, study-groups, social-feed, community, mentorship, peer-finder, virtual-study-room, competition-arena, knowledge-feed + ~10 more |
| `/progress` | analytics, achievements, leaderboard, badges, progress-report, smart-recommendations, skill-passport, certificates |
| `/profile` | profile, settings, personalization, notifications, notification-preferences, data-export, mfa-setup, sessions |
| `/course/:id` | course detail, assignments, assessments (keep dynamic routes) |

**Student-specific: +1 page**
| `/ecz` | ecz-past-papers, ecz-exam-simulator, ecz-videos, ecz-practice-quiz, ecz-resource-library, zambian-resources + ~20 ECZ sub-pages (all become tabs: Papers, Simulator, Videos, Resources, Community, Lab) |

**Teacher-specific: +1 page**
| `/teach` | courses (manage), create-course, teacher-gradebook, teacher-lesson-plan, teacher-bulk-grades, teacher-analytics, teacher-report-cards, teacher-attendance-qr, teacher-rubric-builder, teacher-announcements, teacher-collaboration |

**Guardian-specific: +1 page**
| `/family` | parent-children, parent-grades, parent-attendance, parent-progress, parental-controls, screen-time, guardian-homework, guardian-rewards, guardian-activity-feed, guardian-digest, guardian-study-comparison |

**Institution: +1 page**
| `/admin` | school-admin, admin/users, admin/curriculum, admin/scheduling, admin/analytics, admin/attendance |

**Ministry: +1 page**
| `/ministry` | ministry-dashboard + all 25 ministry sub-pages as tabs grouped into: Overview, Schools, Analytics, Policy, Budget, Reports |

**Specialist roles** (doctor, entrepreneur, developer, cybersecurity, skills): **+1 page each** — each role's 5-15 sub-pages become tabs within a single hub page.

**Total: ~20 routable pages** (down from 300+)

### Implementation Steps

1. **Create hub page components** — Each hub (e.g., `AIHub.tsx`) uses a `Tabs` component with the existing sub-components embedded as tab content. No feature code is deleted — components move from being standalone pages to being tab panels.

2. **Rewrite `App.tsx`** — Replace 300+ routes with ~20 hub routes. Old paths redirect to the new hub with a query param (e.g., `/flashcards` → `/ai?tab=flashcards`) for backwards compatibility.

3. **Simplify `sidebarConfig.ts`** — Each role gets 5-7 sidebar items max, pointing to hub pages. No more `matchPrefixes` arrays — each item is one page.

4. **Update navigation components** — TopNavbar workspace strip, MobileBottomNav, and command palette all point to the reduced route set.

5. **Clean up unused lazy imports** — Remove the 250+ `React.lazy` declarations that are no longer needed as standalone routes.

### Technical Details

- Hub pages use `@/components/ui/tabs` with URL-synced tab state via `useSearchParams` so deep-linking works (e.g., `/ai?tab=flashcards`)
- Existing component files in `src/components/` are preserved and imported into hubs — no feature logic is rewritten
- Redirect routes use `<Navigate to="/ai?tab=flashcards" replace />` for any bookmarked old URLs
- Bundle size improves because hub pages can use dynamic `React.lazy` per-tab instead of per-route

### What Users Experience
- Sidebar: 5-7 clear items instead of 20+
- Each page feels complete — all related tools in one place
- Tab navigation within pages is fast (no full page reload)
- Command palette (Cmd+K) still finds everything by searching tab names

