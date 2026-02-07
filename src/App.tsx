import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { MainLayout } from '@/components/Layout/MainLayout';

// Core Pages
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import WelcomePage from '@/pages/WelcomePage';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import ProfilePage from '@/pages/ProfilePage';
import OnboardingFlow from '@/components/Onboarding/OnboardingFlow';

// Unified Pages
import AIChat from '@/pages/AIChat';
import CommunityHub from '@/pages/CommunityHub';

// Learning Features
import LearningAnalytics from '@/pages/LearningAnalytics';
import Achievements from '@/pages/Achievements';
import StudyMaterialRepository from '@/pages/StudyMaterialRepository';
import StudyToolsPage from '@/pages/StudyToolsPage';
import InteractiveLessons from '@/components/Learning/InteractiveLessons';
import VirtualClassroom from '@/components/Learning/VirtualClassroom';

// ChatEdu Landing
import ChatEduLanding from '@/pages/ChatEduLanding';

// Role-Specific Dashboards
import TeacherDashboard from '@/pages/TeacherDashboard';
import ParentDashboard from '@/pages/ParentDashboard';
import SchoolAdminDashboard from '@/pages/SchoolAdminDashboard';
import MinistryDashboard from '@/pages/MinistryDashboard';

// AI Quiz Pages (AceQuiz-style)
import AIQuizGeneratorPage from '@/pages/AIQuizGeneratorPage';
import AIMathQuizPage from '@/pages/AIMathQuizPage';
import AIScienceQuizPage from '@/pages/AIScienceQuizPage';
import AIYouTubeQuizPage from '@/pages/AIYouTubeQuizPage';
import AIVocabularyQuizPage from '@/pages/AIVocabularyQuizPage';

// AI Features
import AIFlashcardPage from '@/pages/AIFlashcardPage';
import AITutorPage from '@/pages/AITutorPage';
import AILearningPathPage from '@/pages/AILearningPathPage';
import ComprehensiveAIPage from '@/pages/ComprehensiveAIPage';
import StudyAssistantPage from '@/pages/StudyAssistantPage';
import DailyGoalCoachPage from '@/pages/DailyGoalCoachPage';
import VisualMindMapPage from '@/pages/VisualMindMapPage';
import AdaptiveDifficultyPage from '@/pages/AdaptiveDifficultyPage';
import ClaudeJournalingPage from '@/pages/ClaudeJournalingPage';
import TeachBackPage from '@/pages/TeachBackPage';
import MultiAITutorPage from '@/pages/MultiAITutorPage';

// Social & Community
import StudyGroupsPage from '@/pages/StudyGroupsPage';
import SocialFeedPage from '@/pages/SocialFeedPage';
import CampusMapPage from '@/pages/CampusMapPage';
import AcademicProfilePage from '@/pages/AcademicProfilePage';

// Other Pages
import VideoLearningPage from '@/pages/VideoLearningPage';
import AdaptiveContentPage from '@/pages/AdaptiveContentPage';
import SmartRecommendationsPage from '@/pages/SmartRecommendationsPage';
import YouTubeLearningPage from '@/pages/YouTubeLearningPage';
import MealPlannerPage from '@/pages/MealPlannerPage';
import StudyMaterialsPage from '@/pages/StudyMaterialsPage';
import CommunityPage from '@/pages/CommunityPage';
import SkillPassportPage from '@/pages/SkillPassportPage';
import LiveLearningPage from '@/pages/LiveLearningPage';
import MentorshipHubPage from '@/pages/MentorshipHubPage';
import LessonsPage from '@/pages/LessonsPage';
import VirtualClassroomPage from '@/pages/VirtualClassroomPage';
import GoalsPage from '@/pages/GoalsPage';
import JournalingPage from '@/pages/JournalingPage';
import MentorshipPage from '@/pages/MentorshipPage';

// ECZ & Zambian Resources
import ECZExamSimulatorPage from '@/pages/ECZExamSimulatorPage';
import ECZParentSupportHubPage from '@/pages/ECZParentSupportHubPage';
import ZambianResourcesHubPage from '@/pages/ZambianResourcesHubPage';
import ECZVideoLibraryPage from '@/pages/ECZVideoLibraryPage';
import ECZPastPapersPage from '@/pages/ECZPastPapersPage';
import ECZResourceLibraryPage from '@/pages/ECZResourceLibraryPage';
import SettingsPage from '@/pages/SettingsPage';

// Parent-Specific Pages
import ParentChildrenPage from '@/pages/ParentChildrenPage';
import ParentAttendancePage from '@/pages/ParentAttendancePage';
import ParentGradesPage from '@/pages/ParentGradesPage';
import ParentAlertsPage from '@/pages/ParentAlertsPage';
import ParentMessagesPage from '@/pages/ParentMessagesPage';
import ParentTeacherContactPage from '@/pages/ParentTeacherContactPage';
import ParentSchoolUpdatesPage from '@/pages/ParentSchoolUpdatesPage';
import ParentProgressTrackerPage from '@/pages/ParentProgressTrackerPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/chatedu" element={<ChatEduLanding />} />
            
            {/* Role-Specific Dashboards */}
            <Route path="/teacher-dashboard" element={<ProtectedRoute><MainLayout><TeacherDashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-dashboard" element={<ProtectedRoute><MainLayout><ParentDashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/school-admin" element={<ProtectedRoute><MainLayout><SchoolAdminDashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/ministry-dashboard" element={<ProtectedRoute><MainLayout><MinistryDashboard /></MainLayout></ProtectedRoute>} />
            
            {/* Main Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Onboarding */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingFlow onComplete={() => window.location.href = '/dashboard'} />
              </ProtectedRoute>
            } />

            {/* AI Quiz Tools (AceQuiz-style) */}
            <Route path="/ai-quiz" element={<ProtectedRoute><MainLayout><AIQuizGeneratorPage /></MainLayout></ProtectedRoute>} />
            <Route path="/math-quiz" element={<ProtectedRoute><MainLayout><AIMathQuizPage /></MainLayout></ProtectedRoute>} />
            <Route path="/science-quiz" element={<ProtectedRoute><MainLayout><AIScienceQuizPage /></MainLayout></ProtectedRoute>} />
            <Route path="/youtube-quiz" element={<ProtectedRoute><MainLayout><AIYouTubeQuizPage /></MainLayout></ProtectedRoute>} />
            <Route path="/vocabulary-quiz" element={<ProtectedRoute><MainLayout><AIVocabularyQuizPage /></MainLayout></ProtectedRoute>} />

            {/* AI Features */}
            <Route path="/ai" element={<ProtectedRoute><MainLayout><AIChat /></MainLayout></ProtectedRoute>} />
            <Route path="/flashcards" element={<ProtectedRoute><MainLayout><AIFlashcardPage /></MainLayout></ProtectedRoute>} />
            <Route path="/ai-tutor" element={<ProtectedRoute><MainLayout><AITutorPage /></MainLayout></ProtectedRoute>} />
            <Route path="/learning-path" element={<ProtectedRoute><MainLayout><AILearningPathPage /></MainLayout></ProtectedRoute>} />
            <Route path="/comprehensive-ai" element={<ProtectedRoute><MainLayout><ComprehensiveAIPage /></MainLayout></ProtectedRoute>} />
            <Route path="/study-assistant" element={<ProtectedRoute><MainLayout><StudyAssistantPage /></MainLayout></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><MainLayout><DailyGoalCoachPage /></MainLayout></ProtectedRoute>} />
            <Route path="/mind-maps" element={<ProtectedRoute><MainLayout><VisualMindMapPage /></MainLayout></ProtectedRoute>} />
            <Route path="/adaptive-difficulty" element={<ProtectedRoute><MainLayout><AdaptiveDifficultyPage /></MainLayout></ProtectedRoute>} />
            <Route path="/journaling" element={<ProtectedRoute><MainLayout><ClaudeJournalingPage /></MainLayout></ProtectedRoute>} />
            <Route path="/teach-back" element={<ProtectedRoute><MainLayout><TeachBackPage /></MainLayout></ProtectedRoute>} />
            <Route path="/multi-ai-tutor" element={<ProtectedRoute><MainLayout><MultiAITutorPage /></MainLayout></ProtectedRoute>} />

            {/* Community & Social */}
            <Route path="/community" element={<ProtectedRoute><MainLayout><CommunityHub /></MainLayout></ProtectedRoute>} />
            <Route path="/study-groups" element={<ProtectedRoute><MainLayout><StudyGroupsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/social-feed" element={<ProtectedRoute><MainLayout><SocialFeedPage /></MainLayout></ProtectedRoute>} />
            <Route path="/campus-map" element={<ProtectedRoute><MainLayout><CampusMapPage /></MainLayout></ProtectedRoute>} />
            <Route path="/academic-profile" element={<ProtectedRoute><MainLayout><AcademicProfilePage /></MainLayout></ProtectedRoute>} />
            <Route path="/mentorship" element={<ProtectedRoute><MainLayout><CommunityPage /></MainLayout></ProtectedRoute>} />
            <Route path="/mentorship-hub" element={<ProtectedRoute><MainLayout><MentorshipHubPage /></MainLayout></ProtectedRoute>} />

            {/* Courses & Learning */}
            <Route path="/courses" element={<ProtectedRoute><MainLayout><Courses /></MainLayout></ProtectedRoute>} />
            <Route path="/lessons" element={<ProtectedRoute><MainLayout><LessonsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/classroom" element={<ProtectedRoute><MainLayout><VirtualClassroomPage /></MainLayout></ProtectedRoute>} />
            <Route path="/video-learning" element={<ProtectedRoute><MainLayout><VideoLearningPage /></MainLayout></ProtectedRoute>} />
            <Route path="/youtube-learning" element={<ProtectedRoute><MainLayout><YouTubeLearningPage /></MainLayout></ProtectedRoute>} />
            <Route path="/adaptive-content" element={<ProtectedRoute><MainLayout><AdaptiveContentPage /></MainLayout></ProtectedRoute>} />
            <Route path="/live-learning" element={<ProtectedRoute><MainLayout><LiveLearningPage /></MainLayout></ProtectedRoute>} />
            <Route path="/goals-tracker" element={<ProtectedRoute><MainLayout><GoalsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><MainLayout><JournalingPage /></MainLayout></ProtectedRoute>} />
            <Route path="/mentors" element={<ProtectedRoute><MainLayout><MentorshipPage /></MainLayout></ProtectedRoute>} />

            {/* Study Materials & Resources */}
            <Route path="/materials" element={<ProtectedRoute><MainLayout><StudyMaterialRepository /></MainLayout></ProtectedRoute>} />
            <Route path="/study-tools" element={<ProtectedRoute><MainLayout><StudyToolsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/study-materials" element={<ProtectedRoute><MainLayout><StudyMaterialsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/skill-passport" element={<ProtectedRoute><MainLayout><SkillPassportPage /></MainLayout></ProtectedRoute>} />
            
            {/* ECZ & Zambian Resources */}
            <Route path="/zambian-resources" element={<ProtectedRoute><MainLayout><ZambianResourcesHubPage /></MainLayout></ProtectedRoute>} />
            <Route path="/ecz-resources" element={<ProtectedRoute><MainLayout><ZambianResourcesHubPage /></MainLayout></ProtectedRoute>} />
            <Route path="/ecz-past-papers" element={<ProtectedRoute><MainLayout><ECZPastPapersPage /></MainLayout></ProtectedRoute>} />
            <Route path="/ecz-videos" element={<ProtectedRoute><MainLayout><ECZVideoLibraryPage /></MainLayout></ProtectedRoute>} />
            <Route path="/ecz-exam-simulator" element={<ProtectedRoute><MainLayout><ECZExamSimulatorPage /></MainLayout></ProtectedRoute>} />
            <Route path="/ecz-parent-support" element={<ProtectedRoute><MainLayout><ECZParentSupportHubPage /></MainLayout></ProtectedRoute>} />

            {/* Parent-Specific Pages */}
            <Route path="/parent-children" element={<ProtectedRoute><MainLayout><ParentChildrenPage /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-attendance" element={<ProtectedRoute><MainLayout><ParentAttendancePage /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-grades" element={<ProtectedRoute><MainLayout><ParentGradesPage /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-alerts" element={<ProtectedRoute><MainLayout><ParentAlertsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-messages" element={<ProtectedRoute><MainLayout><ParentMessagesPage /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-teacher-contact" element={<ProtectedRoute><MainLayout><ParentTeacherContactPage /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-school-updates" element={<ProtectedRoute><MainLayout><ParentSchoolUpdatesPage /></MainLayout></ProtectedRoute>} />
            <Route path="/parent-progress" element={<ProtectedRoute><MainLayout><ParentProgressTrackerPage /></MainLayout></ProtectedRoute>} />

            {/* Analytics & Progress */}
            <Route path="/analytics" element={<ProtectedRoute><MainLayout><LearningAnalytics /></MainLayout></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><MainLayout><Achievements /></MainLayout></ProtectedRoute>} />
            <Route path="/smart-recommendations" element={<ProtectedRoute><MainLayout><SmartRecommendationsPage /></MainLayout></ProtectedRoute>} />

            {/* Profile & Settings */}
            <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><MainLayout><SettingsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/resource-library" element={<ProtectedRoute><MainLayout><ECZResourceLibraryPage /></MainLayout></ProtectedRoute>} />

            {/* Meal Planner */}
            <Route path="/meal-planner" element={<ProtectedRoute><MainLayout><MealPlannerPage /></MainLayout></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
