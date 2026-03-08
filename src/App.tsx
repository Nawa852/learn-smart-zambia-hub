import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { CookieConsent } from '@/components/CookieConsent';
import { InstallPrompt } from '@/components/PWA/InstallPrompt';
import { OfflineBanner } from '@/components/PWA/OfflineBanner';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import PostLoginGate from '@/components/Auth/PostLoginGate';
import { MainLayout } from '@/components/Layout/MainLayout';
import { LogoLoader } from '@/components/UI/LogoLoader';

// Core Pages (eagerly loaded)
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import NotFound from '@/pages/NotFound';

// Lazy-loaded pages
const PasswordResetPage = React.lazy(() => import('@/pages/PasswordResetPage'));
const About = React.lazy(() => import('@/pages/About'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Courses = React.lazy(() => import('@/pages/Courses'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));
const AIChat = React.lazy(() => import('@/pages/AIChat'));
const CommunityHub = React.lazy(() => import('@/pages/CommunityHub'));
const LearningAnalytics = React.lazy(() => import('@/pages/LearningAnalytics'));
const TeacherAnalyticsPage = React.lazy(() => import('@/pages/TeacherAnalyticsPage'));
const Achievements = React.lazy(() => import('@/pages/Achievements'));
const StudyMaterialRepository = React.lazy(() => import('@/pages/StudyMaterialRepository'));
const StudyToolsPage = React.lazy(() => import('@/pages/StudyToolsPage'));
const InteractiveLessons = React.lazy(() => import('@/components/Learning/InteractiveLessons'));
const VirtualClassroom = React.lazy(() => import('@/components/Learning/VirtualClassroom'));
const ChatEduLanding = React.lazy(() => import('@/pages/ChatEduLanding'));
const SchoolAdminDashboard = React.lazy(() => import('@/pages/SchoolAdminDashboard'));
const MinistryDashboard = React.lazy(() => import('@/pages/MinistryDashboard'));
const AIQuizGeneratorPage = React.lazy(() => import('@/pages/AIQuizGeneratorPage'));
const AIMathQuizPage = React.lazy(() => import('@/pages/AIMathQuizPage'));
const AIScienceQuizPage = React.lazy(() => import('@/pages/AIScienceQuizPage'));
const AIYouTubeQuizPage = React.lazy(() => import('@/pages/AIYouTubeQuizPage'));
const AIVocabularyQuizPage = React.lazy(() => import('@/pages/AIVocabularyQuizPage'));
const AIFlashcardPage = React.lazy(() => import('@/pages/AIFlashcardPage'));
const AITutorPage = React.lazy(() => import('@/pages/AITutorPage'));
const AILearningPathPage = React.lazy(() => import('@/pages/AILearningPathPage'));
const ComprehensiveAIPage = React.lazy(() => import('@/pages/ComprehensiveAIPage'));
const StudyAssistantPage = React.lazy(() => import('@/pages/StudyAssistantPage'));
const DailyGoalCoachPage = React.lazy(() => import('@/pages/DailyGoalCoachPage'));
const VisualMindMapPage = React.lazy(() => import('@/pages/VisualMindMapPage'));
const AdaptiveDifficultyPage = React.lazy(() => import('@/pages/AdaptiveDifficultyPage'));
const ClaudeJournalingPage = React.lazy(() => import('@/pages/ClaudeJournalingPage'));
const TeachBackPage = React.lazy(() => import('@/pages/TeachBackPage'));
const MultiAITutorPage = React.lazy(() => import('@/pages/MultiAITutorPage'));
const StudyGroupsPage = React.lazy(() => import('@/pages/StudyGroupsPage'));
const SocialFeedPage = React.lazy(() => import('@/pages/SocialFeedPage'));
const CampusMapPage = React.lazy(() => import('@/pages/CampusMapPage'));
const AcademicProfilePage = React.lazy(() => import('@/pages/AcademicProfilePage'));
const VideoLearningPage = React.lazy(() => import('@/pages/VideoLearningPage'));
const AdaptiveContentPage = React.lazy(() => import('@/pages/AdaptiveContentPage'));
const SmartRecommendationsPage = React.lazy(() => import('@/pages/SmartRecommendationsPage'));
const YouTubeLearningPage = React.lazy(() => import('@/pages/YouTubeLearningPage'));
const MealPlannerPage = React.lazy(() => import('@/pages/MealPlannerPage'));
const StudyMaterialsPage = React.lazy(() => import('@/pages/StudyMaterialsPage'));
const CommunityPage = React.lazy(() => import('@/pages/CommunityPage'));
const SkillPassportPage = React.lazy(() => import('@/pages/SkillPassportPage'));
const LiveLearningPage = React.lazy(() => import('@/pages/LiveLearningPage'));
const MentorshipHubPage = React.lazy(() => import('@/pages/MentorshipHubPage'));
const LessonsPage = React.lazy(() => import('@/pages/LessonsPage'));
const VirtualClassroomPage = React.lazy(() => import('@/pages/VirtualClassroomPage'));
const GoalsPage = React.lazy(() => import('@/pages/GoalsPage'));
const JournalingPage = React.lazy(() => import('@/pages/JournalingPage'));
const MentorshipPage = React.lazy(() => import('@/pages/MentorshipPage'));
const FocusModePage = React.lazy(() => import('@/pages/FocusModePage'));
const SetupPage = React.lazy(() => import('@/pages/SetupPage'));
const AppControlPage = React.lazy(() => import('@/pages/AppControlPage'));
const MedicalCaseSimulatorPage = React.lazy(() => import('@/pages/MedicalCaseSimulatorPage'));
const MedicalDrugReferencePage = React.lazy(() => import('@/pages/MedicalDrugReferencePage'));
const MedicalClinicalNotesPage = React.lazy(() => import('@/pages/MedicalClinicalNotesPage'));
const MedicalCaseLogPage = React.lazy(() => import('@/pages/MedicalCaseLogPage'));
const MedicalRotationsPage = React.lazy(() => import('@/pages/MedicalRotationsPage'));
const EntrepreneurVenturesPage = React.lazy(() => import('@/pages/EntrepreneurVenturesPage'));
const EntrepreneurBusinessPlanPage = React.lazy(() => import('@/pages/EntrepreneurBusinessPlanPage'));
const EntrepreneurPitchDeckPage = React.lazy(() => import('@/pages/EntrepreneurPitchDeckPage'));
const EntrepreneurMarketResearchPage = React.lazy(() => import('@/pages/EntrepreneurMarketResearchPage'));
const EntrepreneurMilestonesPage = React.lazy(() => import('@/pages/EntrepreneurMilestonesPage'));
const EntrepreneurFinancialsPage = React.lazy(() => import('@/pages/EntrepreneurFinancialsPage'));
const EntrepreneurFundingPage = React.lazy(() => import('@/pages/EntrepreneurFundingPage'));
const DeveloperProjectsPage = React.lazy(() => import('@/pages/DeveloperProjectsPage'));
const DeveloperChallengesPage = React.lazy(() => import('@/pages/DeveloperChallengesPage'));
const DeveloperCodeReviewPage = React.lazy(() => import('@/pages/DeveloperCodeReviewPage'));
const DeveloperIDEPage = React.lazy(() => import('@/pages/DeveloperIDEPage'));
const ECZExamSimulatorPage = React.lazy(() => import('@/pages/ECZExamSimulatorPage'));
const ECZParentSupportHubPage = React.lazy(() => import('@/pages/ECZParentSupportHubPage'));
const ZambianResourcesHubPage = React.lazy(() => import('@/pages/ZambianResourcesHubPage'));
const ECZVideoLibraryPage = React.lazy(() => import('@/pages/ECZVideoLibraryPage'));
const ECZPastPapersPage = React.lazy(() => import('@/pages/ECZPastPapersPage'));
const ECZResourceLibraryPage = React.lazy(() => import('@/pages/ECZResourceLibraryPage'));
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage'));
const MFASetupPage = React.lazy(() => import('@/pages/MFASetupPage'));
const SessionManagementPage = React.lazy(() => import('@/pages/SessionManagementPage'));
const AdminUserManagementPage = React.lazy(() => import('@/pages/AdminUserManagementPage'));
const AdminCurriculumPage = React.lazy(() => import('@/pages/AdminCurriculumPage'));
const AdminSchedulingPage = React.lazy(() => import('@/pages/AdminSchedulingPage'));
const AdminAnalyticsPage = React.lazy(() => import('@/pages/AdminAnalyticsPage'));
const AdminAttendancePage = React.lazy(() => import('@/pages/AdminAttendancePage'));
const StudyGroupChatPage = React.lazy(() => import('@/pages/StudyGroupChatPage'));
const CreateCoursePage = React.lazy(() => import('@/pages/CreateCoursePage'));
const CourseCatalogPage = React.lazy(() => import('@/pages/CourseCatalogPage'));
const CourseDetailPage = React.lazy(() => import('@/pages/CourseDetailPage'));
const AssignmentPage = React.lazy(() => import('@/pages/AssignmentPage'));
const MyCoursesPage = React.lazy(() => import('@/pages/MyCoursesPage'));
const ProgressReportPage = React.lazy(() => import('@/pages/ProgressReportPage'));
const ECZPracticeQuizPage = React.lazy(() => import('@/pages/ECZPracticeQuizPage'));
const ECZResourcesExpandedPage = React.lazy(() => import('@/pages/ECZResourcesExpandedPage'));
const MyAssignmentsPage = React.lazy(() => import('@/pages/MyAssignmentsPage'));
const StudyPlannerPage = React.lazy(() => import('@/pages/StudyPlannerPage'));
const NotificationsPage = React.lazy(() => import('@/pages/NotificationsPage'));
const GuardianLinkPage = React.lazy(() => import('@/pages/GuardianLinkPage'));
const GuardianReportsPage = React.lazy(() => import('@/pages/GuardianReportsPage'));
const MyNotesPage = React.lazy(() => import('@/pages/MyNotesPage'));
const MessengerPage = React.lazy(() => import('@/pages/MessengerPage'));
const ParentChildrenPage = React.lazy(() => import('@/pages/ParentChildrenPage'));
const ParentAttendancePage = React.lazy(() => import('@/pages/ParentAttendancePage'));
const ParentGradesPage = React.lazy(() => import('@/pages/ParentGradesPage'));
const ParentAlertsPage = React.lazy(() => import('@/pages/ParentAlertsPage'));
const ParentMessagesPage = React.lazy(() => import('@/pages/ParentMessagesPage'));
const ParentTeacherContactPage = React.lazy(() => import('@/pages/ParentTeacherContactPage'));
const ParentSchoolUpdatesPage = React.lazy(() => import('@/pages/ParentSchoolUpdatesPage'));
const ParentProgressTrackerPage = React.lazy(() => import('@/pages/ParentProgressTrackerPage'));
const TeacherCollaborationHubPage = React.lazy(() => import('@/pages/TeacherCollaborationHubPage'));
const MinistryProvincesPage = React.lazy(() => import('@/pages/MinistryProvincesPage'));
const MinistryPolicyTrackerPage = React.lazy(() => import('@/pages/MinistryPolicyTrackerPage'));
const MinistrySchoolRegistryPage = React.lazy(() => import('@/pages/MinistrySchoolRegistryPage'));
const MinistryInterventionsPage = React.lazy(() => import('@/pages/MinistryInterventionsPage'));
const MinistryECZAnalyticsPage = React.lazy(() => import('@/pages/MinistryECZAnalyticsPage'));
const MinistryReportGeneratorPage = React.lazy(() => import('@/pages/MinistryReportGeneratorPage'));
const MinistryPartnershipsPage = React.lazy(() => import('@/pages/MinistryPartnershipsPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Helper: Protected route with PostLoginGate and MainLayout
const PG = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute><PostLoginGate><MainLayout>{children}</MainLayout></PostLoginGate></ProtectedRoute>
);

const SuspenseWrap = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LogoLoader text="Loading..." /></div>}>
    {children}
  </Suspense>
);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <SuspenseWrap>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chatedu" element={<ChatEduLanding />} />

              {/* Setup Route (no PostLoginGate) */}
              <Route path="/setup" element={<ProtectedRoute><SetupPage /></ProtectedRoute>} />

              {/* Role-Specific Dashboards */}
              <Route path="/teacher-dashboard" element={<PG><Dashboard /></PG>} />
              <Route path="/parent-dashboard" element={<PG><Dashboard /></PG>} />
              <Route path="/school-admin" element={<PG><SchoolAdminDashboard /></PG>} />
              <Route path="/ministry-dashboard" element={<PG><MinistryDashboard /></PG>} />

              {/* Main Dashboard */}
              <Route path="/dashboard" element={<PG><Dashboard /></PG>} />

              {/* AI Quiz Tools */}
              <Route path="/ai-quiz" element={<PG><AIQuizGeneratorPage /></PG>} />
              <Route path="/math-quiz" element={<PG><AIMathQuizPage /></PG>} />
              <Route path="/science-quiz" element={<PG><AIScienceQuizPage /></PG>} />
              <Route path="/youtube-quiz" element={<PG><AIYouTubeQuizPage /></PG>} />
              <Route path="/vocabulary-quiz" element={<PG><AIVocabularyQuizPage /></PG>} />

              {/* AI Features */}
              <Route path="/ai" element={<PG><AIChat /></PG>} />
              <Route path="/flashcards" element={<PG><AIFlashcardPage /></PG>} />
              <Route path="/ai-tutor" element={<PG><AITutorPage /></PG>} />
              <Route path="/learning-path" element={<PG><AILearningPathPage /></PG>} />
              <Route path="/comprehensive-ai" element={<PG><ComprehensiveAIPage /></PG>} />
              <Route path="/study-assistant" element={<PG><StudyAssistantPage /></PG>} />
              <Route path="/goals" element={<PG><GoalsPage /></PG>} />
              <Route path="/mind-maps" element={<PG><VisualMindMapPage /></PG>} />
              <Route path="/adaptive-difficulty" element={<PG><AdaptiveDifficultyPage /></PG>} />
              <Route path="/journaling" element={<PG><ClaudeJournalingPage /></PG>} />
              <Route path="/teach-back" element={<PG><TeachBackPage /></PG>} />
              <Route path="/multi-ai-tutor" element={<PG><MultiAITutorPage /></PG>} />

              {/* Community & Social */}
              <Route path="/community" element={<PG><CommunityHub /></PG>} />
              <Route path="/study-groups" element={<PG><StudyGroupsPage /></PG>} />
              <Route path="/social-feed" element={<PG><SocialFeedPage /></PG>} />
              <Route path="/campus-map" element={<PG><CampusMapPage /></PG>} />
              <Route path="/academic-profile" element={<PG><AcademicProfilePage /></PG>} />
              <Route path="/mentorship" element={<PG><CommunityPage /></PG>} />
              <Route path="/mentorship-hub" element={<PG><MentorshipHubPage /></PG>} />
              <Route path="/messenger" element={<PG><MessengerPage /></PG>} />

              {/* Courses & Learning */}
              <Route path="/courses" element={<PG><Courses /></PG>} />
              <Route path="/my-courses" element={<PG><MyCoursesPage /></PG>} />
              <Route path="/course-catalog" element={<PG><CourseCatalogPage /></PG>} />
              <Route path="/create-course" element={<PG><CreateCoursePage /></PG>} />
              <Route path="/study-chat" element={<PG><StudyGroupChatPage /></PG>} />
              <Route path="/course/:courseId" element={<PG><CourseDetailPage /></PG>} />
              <Route path="/course/:courseId/assignments" element={<PG><AssignmentPage /></PG>} />
              <Route path="/lessons" element={<PG><LessonsPage /></PG>} />
              <Route path="/classroom" element={<PG><VirtualClassroomPage /></PG>} />
              <Route path="/video-learning" element={<PG><VideoLearningPage /></PG>} />
              <Route path="/youtube-learning" element={<PG><YouTubeLearningPage /></PG>} />
              <Route path="/adaptive-content" element={<PG><AdaptiveContentPage /></PG>} />
              <Route path="/live-learning" element={<PG><LiveLearningPage /></PG>} />
              <Route path="/goals-tracker" element={<PG><GoalsPage /></PG>} />
              <Route path="/journal" element={<PG><JournalingPage /></PG>} />
              <Route path="/mentors" element={<PG><MentorshipPage /></PG>} />

              {/* Study Materials & Resources */}
              <Route path="/materials" element={<PG><StudyMaterialRepository /></PG>} />
              <Route path="/study-tools" element={<PG><StudyToolsPage /></PG>} />
              <Route path="/study-materials" element={<PG><StudyMaterialsPage /></PG>} />
              <Route path="/skill-passport" element={<PG><SkillPassportPage /></PG>} />

              {/* ECZ & Zambian Resources */}
              <Route path="/zambian-resources" element={<PG><ZambianResourcesHubPage /></PG>} />
              <Route path="/ecz-resources" element={<PG><ZambianResourcesHubPage /></PG>} />
              <Route path="/ecz-past-papers" element={<PG><ECZPastPapersPage /></PG>} />
              <Route path="/ecz-videos" element={<PG><ECZVideoLibraryPage /></PG>} />
              <Route path="/ecz-exam-simulator" element={<PG><ECZExamSimulatorPage /></PG>} />
              <Route path="/ecz-practice-quiz" element={<PG><ECZPracticeQuizPage /></PG>} />
              <Route path="/ecz-resource-library" element={<PG><ECZResourcesExpandedPage /></PG>} />
              <Route path="/ecz-parent-support" element={<PG><ECZParentSupportHubPage /></PG>} />

              {/* Student Feature Pages */}
              <Route path="/my-assignments" element={<PG><MyAssignmentsPage /></PG>} />
              <Route path="/study-planner" element={<PG><StudyPlannerPage /></PG>} />
              <Route path="/guardian-link" element={<PG><GuardianLinkPage /></PG>} />
              <Route path="/guardian-reports" element={<PG><GuardianReportsPage /></PG>} />
              <Route path="/my-notes" element={<PG><MyNotesPage /></PG>} />
              <Route path="/focus-mode" element={<PG><FocusModePage /></PG>} />
              <Route path="/app-control" element={<PG><AppControlPage /></PG>} />

              {/* Parent Pages */}
              <Route path="/parent-children" element={<PG><ParentChildrenPage /></PG>} />
              <Route path="/parent-attendance" element={<PG><ParentAttendancePage /></PG>} />
              <Route path="/parent-grades" element={<PG><ParentGradesPage /></PG>} />
              <Route path="/parent-alerts" element={<PG><ParentAlertsPage /></PG>} />
              <Route path="/parent-messages" element={<PG><ParentMessagesPage /></PG>} />
              <Route path="/parent-teacher-contact" element={<PG><ParentTeacherContactPage /></PG>} />
              <Route path="/parent-school-updates" element={<PG><ParentSchoolUpdatesPage /></PG>} />
              <Route path="/parent-progress" element={<PG><ParentProgressTrackerPage /></PG>} />

              {/* School Admin Management Pages */}
              <Route path="/admin/users" element={<PG><AdminUserManagementPage /></PG>} />
              <Route path="/admin/curriculum" element={<PG><AdminCurriculumPage /></PG>} />
              <Route path="/admin/scheduling" element={<PG><AdminSchedulingPage /></PG>} />
              <Route path="/admin/analytics" element={<PG><AdminAnalyticsPage /></PG>} />
              <Route path="/admin/attendance" element={<PG><AdminAttendancePage /></PG>} />

              {/* Analytics & Progress */}
              <Route path="/analytics" element={<PG><LearningAnalytics /></PG>} />
              <Route path="/teacher-analytics" element={<PG><TeacherAnalyticsPage /></PG>} />
              <Route path="/achievements" element={<PG><Achievements /></PG>} />
              <Route path="/progress-report" element={<PG><ProgressReportPage /></PG>} />
              <Route path="/smart-recommendations" element={<PG><SmartRecommendationsPage /></PG>} />

              {/* Profile & Settings */}
              <Route path="/profile" element={<PG><ProfilePage /></PG>} />
              <Route path="/settings" element={<PG><SettingsPage /></PG>} />
              <Route path="/mfa-setup" element={<PG><MFASetupPage /></PG>} />
              <Route path="/sessions" element={<PG><SessionManagementPage /></PG>} />
              <Route path="/notifications" element={<PG><NotificationsPage /></PG>} />
              <Route path="/resource-library" element={<PG><ECZResourceLibraryPage /></PG>} />

              {/* Medical Pages */}
              <Route path="/medical/case-simulator" element={<PG><MedicalCaseSimulatorPage /></PG>} />
              <Route path="/medical/drug-reference" element={<PG><MedicalDrugReferencePage /></PG>} />
              <Route path="/medical/clinical-notes" element={<PG><MedicalClinicalNotesPage /></PG>} />
              <Route path="/medical/case-log" element={<PG><MedicalCaseLogPage /></PG>} />
              <Route path="/medical/rotations" element={<PG><MedicalRotationsPage /></PG>} />

              {/* Entrepreneur Pages */}
              <Route path="/entrepreneur/ventures" element={<PG><EntrepreneurVenturesPage /></PG>} />
              <Route path="/entrepreneur/business-plan" element={<PG><EntrepreneurBusinessPlanPage /></PG>} />
              <Route path="/entrepreneur/pitch-deck" element={<PG><EntrepreneurPitchDeckPage /></PG>} />
              <Route path="/entrepreneur/market-research" element={<PG><EntrepreneurMarketResearchPage /></PG>} />
              <Route path="/entrepreneur/milestones" element={<PG><EntrepreneurMilestonesPage /></PG>} />
              <Route path="/entrepreneur/financials" element={<PG><EntrepreneurFinancialsPage /></PG>} />
              <Route path="/entrepreneur/funding" element={<PG><EntrepreneurFundingPage /></PG>} />

              {/* Developer Pages */}
              <Route path="/developer/projects" element={<PG><DeveloperProjectsPage /></PG>} />
              <Route path="/developer/challenges" element={<PG><DeveloperChallengesPage /></PG>} />
              <Route path="/developer/code-review" element={<PG><DeveloperCodeReviewPage /></PG>} />
              <Route path="/developer/ide" element={<PG><DeveloperIDEPage /></PG>} />

              {/* Teacher Pages */}
              <Route path="/teacher-collaboration" element={<PG><TeacherCollaborationHubPage /></PG>} />

              {/* Ministry Pages */}
              <Route path="/ministry/provinces" element={<PG><MinistryProvincesPage /></PG>} />
              <Route path="/ministry/policies" element={<PG><MinistryPolicyTrackerPage /></PG>} />
              <Route path="/ministry/schools" element={<PG><MinistrySchoolRegistryPage /></PG>} />
              <Route path="/ministry/interventions" element={<PG><MinistryInterventionsPage /></PG>} />
              <Route path="/ministry/ecz-analytics" element={<PG><MinistryECZAnalyticsPage /></PG>} />
              <Route path="/ministry/reports" element={<PG><MinistryReportGeneratorPage /></PG>} />
              <Route path="/ministry/partnerships" element={<PG><MinistryPartnershipsPage /></PG>} />

              {/* Meal Planner */}
              <Route path="/meal-planner" element={<PG><MealPlannerPage /></PG>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SuspenseWrap>
          <Toaster />
          <CookieConsent />
          <InstallPrompt />
          <OfflineBanner />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
