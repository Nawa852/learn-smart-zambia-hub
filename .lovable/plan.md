

# Continue Building: Wire Orphaned Pages + Add Missing Features

## Current State
The platform has **250+ page files** but only ~180 routes in `App.tsx`. Over **50 pages** exist as files but have no routes — they're completely unreachable. Additionally, several sidebar items (like `notification-preferences`) aren't in the sidebar config, and many features from the original plan remain unconnected.

## Plan

### 1. Wire All Orphaned Pages into App.tsx (~50 routes)
Add lazy imports and routes for every page file that currently has no route. Key groups:

- **AI Tools** (27 pages): `AIContentGeneratorPage`, `AICreatorStudioPage`, `AICurriculumMapperPage`, `AIExamPrepCoachPage`, `AIFeedbackPortalPage`, `AILearningLab`, `AIProgressDashboardPage`, `AIQuizCreatorPage`, `AIResourceCenterPage`, `AIResourceCuratorPage`, `AIStudyAnalyticsPage`, `AIStudyBuddyPage`, `AIStudyGroupFinderPage`, `AIStudyGroupModeratorPage`, `AIStudyHelperPage`, `AIStudyInsightsPage`, `AIStudyJournalPage`, `AIStudyMentorPage`, `AIStudyMotivatorPage`, `AIStudyProgressMonitorPage`, `AIStudyProgressTrackerPage`, `AIStudyProgressVisualizerPage`, `AIStudyResourceEditorPage`, `AIStudyResourceFinderPage`, `AIStudySchedulerPage`, `AIStudyTaskManagerPage`, `AIContentStudioPage`
- **ECZ Extended** (12 pages): `ECZAssignmentHubPage`, `ECZProjectShowcasePage`, `ECZResourceAnnotatorPage`, `ECZResourceMarketplacePage`, `ECZResourceSharingHubPage`, `ECZResourceTranslatorPage`, `ECZResourceValidatorPage`, `ECZStudyCommunityForumPage`, `ECZStudyGroupChatPage`, `ECZStudyNotesEditorPage`, `ECZVirtualLabSimulatorPage`, `ECZVirtualTutorPage`, `ECZVirtualWhiteboardPage`, `ECZStudyPlannerPage`, `ECZStudyResourceAnalyzerPage`, `ECZStudyResourceCreatorPage`, `ECZStudyResourceHubPage`, `ECZStudyResourcePortalPage`, `ECZStudyCommunityPage`
- **Social/Community** (8 pages): `EnhancedSocialPage`, `GroupCompetitionArenaPage`, `KnowledgeFeedPage`, `KnowledgeRepositoryPage`, `KnowledgeTree`, `PeerFinderPage`, `PeerMentorshipPortalPage`, `SocialLearningHubPage`, `VirtualStudyRoomPage`
- **Misc** (10+ pages): `ContentMarketplacePage`, `EmotionDetectionPage`, `ComprehensiveDashboard`, `SmartDashboardPage`, `AdaptiveCoursePage`, `AdaptiveLearning`, `GameifyVault`, `RealTimeSummarizerPage`, `MultilingualTranslatorPage`, `EnterpriseOperationsPage`, `EventsLearningPage`, `SkillsIntelligenceLabPage`, `APIFlowchartPage`, `SemanticSearchPage`, `MentorshipCoachingPage`, `StudyGoalTrackerPage`

### 2. Add Notification Preferences to Sidebar Config
Add `notification-preferences` link to all role sidebar configs under Account sections.

### 3. Add 8 New Practical Feature Pages
Create these missing pages that would add real value:

| Page | Route | Description |
|------|-------|-------------|
| `StudyStreakPage.tsx` | `/study-streak` | GitHub-style heatmap calendar of daily study activity |
| `CourseReviewsPage.tsx` | `/course/:courseId/reviews` | Rate & review courses |
| `DarkModeToggle` (component) | — | Add theme toggle to sidebar footer |
| `OnboardingChecklist.tsx` | — | Dashboard widget showing setup completion % |
| `StudyTimerWidget.tsx` | — | Mini floating timer accessible from any page |
| `QuickNoteWidget.tsx` | — | Floating quick-note capture button |
| `SkipToContent` (a11y) | — | Skip-to-content link for keyboard nav |
| `HighContrastToggle` | — | Accessibility toggle in settings |

### 4. Enhance Sidebar with Collapsible "More Tools" Sections
For roles with 30+ nav items (student, cybersecurity), group lesser-used items under a "More Tools" collapsible to reduce scroll fatigue.

### 5. Add Theme Toggle to Sidebar Footer
Place a sun/moon icon button next to Settings in the sidebar footer for quick dark/light mode switching.

## Implementation Order
1. Wire all 50+ orphaned pages into `App.tsx` (lazy imports + routes)
2. Add notification-preferences and new links to `sidebarConfig.ts` for all roles
3. Create `StudyStreakPage.tsx` with heatmap calendar
4. Create `OnboardingChecklist` dashboard widget
5. Add theme toggle to sidebar footer
6. Add skip-to-content accessibility link
7. Add quick-note floating button component

## Files Modified
- `src/App.tsx` — Add ~50 lazy imports and routes
- `src/components/Sidebar/sidebarConfig.ts` — Add notification-preferences, study-streak links
- `src/components/Sidebar/RoleBasedSidebar.tsx` — Add theme toggle to footer
- `src/components/Layout/MainLayout.tsx` — Add skip-to-content link

## Files Created
- `src/pages/StudyStreakPage.tsx`
- `src/components/Dashboard/OnboardingChecklist.tsx`
- `src/components/UI/QuickNoteButton.tsx`

## No database changes needed.

