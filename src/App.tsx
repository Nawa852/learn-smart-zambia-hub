import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { MainLayout } from '@/components/Layout/MainLayout';

// Core Pages
import Index from '@/pages/Index';
import LoginPage from '@/components/Auth/LoginPage';
import SignUpPage from '@/components/Auth/SignUpPage';
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
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

            {/* Community & Social */}
            <Route path="/community" element={<ProtectedRoute><MainLayout><CommunityHub /></MainLayout></ProtectedRoute>} />
            <Route path="/study-groups" element={<ProtectedRoute><MainLayout><StudyGroupsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/social-feed" element={<ProtectedRoute><MainLayout><SocialFeedPage /></MainLayout></ProtectedRoute>} />
            <Route path="/campus-map" element={<ProtectedRoute><MainLayout><CampusMapPage /></MainLayout></ProtectedRoute>} />
            <Route path="/academic-profile" element={<ProtectedRoute><MainLayout><AcademicProfilePage /></MainLayout></ProtectedRoute>} />
            <Route path="/mentorship" element={<ProtectedRoute><MainLayout><CommunityPage /></MainLayout></ProtectedRoute>} />

            {/* Courses & Learning */}
            <Route path="/courses" element={<ProtectedRoute><MainLayout><Courses /></MainLayout></ProtectedRoute>} />
            <Route path="/lessons" element={<ProtectedRoute><MainLayout><InteractiveLessons /></MainLayout></ProtectedRoute>} />
            <Route path="/classroom" element={<ProtectedRoute><MainLayout><VirtualClassroom /></MainLayout></ProtectedRoute>} />
            <Route path="/video-learning" element={<ProtectedRoute><MainLayout><VideoLearningPage /></MainLayout></ProtectedRoute>} />
            <Route path="/youtube-learning" element={<ProtectedRoute><MainLayout><YouTubeLearningPage /></MainLayout></ProtectedRoute>} />
            <Route path="/adaptive-content" element={<ProtectedRoute><MainLayout><AdaptiveContentPage /></MainLayout></ProtectedRoute>} />

            {/* Study Materials */}
            <Route path="/materials" element={<ProtectedRoute><MainLayout><StudyMaterialRepository /></MainLayout></ProtectedRoute>} />
            <Route path="/study-tools" element={<ProtectedRoute><MainLayout><StudyToolsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/study-materials" element={<ProtectedRoute><MainLayout><StudyMaterialsPage /></MainLayout></ProtectedRoute>} />

            {/* Analytics & Progress */}
            <Route path="/analytics" element={<ProtectedRoute><MainLayout><LearningAnalytics /></MainLayout></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><MainLayout><Achievements /></MainLayout></ProtectedRoute>} />
            <Route path="/smart-recommendations" element={<ProtectedRoute><MainLayout><SmartRecommendationsPage /></MainLayout></ProtectedRoute>} />

            {/* Profile */}
            <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />

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
