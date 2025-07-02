import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

// Import all pages
import Index from '@/pages/Index';
import LoginPage from '@/components/Auth/LoginPage';
import SignUpPage from '@/components/Auth/SignUpPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import LandingVerse from '@/pages/LandingVerse';
import Dashboard from '@/pages/Dashboard';

// ECZ Platform Pages (35 pages total)
import ECZDashboard from '@/components/Dashboard/ECZDashboard';
import ECZCourses from '@/components/Courses/ECZCourses';

import StudyAssistantPage from '@/pages/StudyAssistantPage';
import AIStudyHelper from '@/pages/AIStudyHelper';
import MultiAITutorPage from '@/pages/MultiAITutorPage';
import AIFlashcardPage from '@/pages/AIFlashcardPage';
import SocialFeedPage from '@/pages/SocialFeedPage';
import EnhancedSocialFeed from '@/components/Social/EnhancedSocialFeed';
import MentorshipHubPage from '@/pages/MentorshipHubPage';
import MentorshipGoalCoaching from '@/components/Learning/MentorshipGoalCoaching';
import StudyGroupsPage from '@/pages/StudyGroupsPage';
import Courses from '@/pages/Courses';
import Profile from '@/pages/Profile';
import LearningAnalytics from '@/pages/LearningAnalytics';
import Achievements from '@/pages/Achievements';
import StudyMaterialRepository from '@/pages/StudyMaterialRepository';
import SemanticSearchPage from '@/pages/SemanticSearchPage';
import EmotionDetectionPage from '@/pages/EmotionDetectionPage';
import MultilingualTranslatorPage from '@/pages/MultilingualTranslatorPage';
import VisualMindMapPage from '@/pages/VisualMindMapPage';
import TeachBackPage from '@/pages/TeachBackPage';
import GameifyVault from '@/pages/GameifyVault';
import AILearningPathPage from '@/pages/AILearningPathPage';
import DailyGoalCoachPage from '@/pages/DailyGoalCoachPage';
import ClaudeJournalingPage from '@/pages/ClaudeJournalingPage';
import SmartRecommendationsPage from '@/pages/SmartRecommendationsPage';
import MessengerPage from '@/pages/MessengerPage';
import CampusMapPage from '@/pages/CampusMapPage';
import PeerFinderPage from '@/pages/PeerFinderPage';
import EventsLearningPage from '@/pages/EventsLearningPage';
import KnowledgeFeedPage from '@/pages/KnowledgeFeedPage';
import APIFlowchartPage from '@/pages/APIFlowchartPage';
import GroupCompetitionArenaPage from '@/pages/GroupCompetitionArenaPage';
import NotFound from '@/pages/NotFound';
import ComprehensiveAIStudyPage from '@/pages/ComprehensiveAIStudyPage';
import ComprehensiveAIPage from '@/pages/ComprehensiveAIPage';
import InteractiveLessons from '@/components/Learning/InteractiveLessons';
import VirtualClassroom from '@/components/Learning/VirtualClassroom';
import EnhancedAITutorPage from '@/pages/EnhancedAITutorPage';
import StudyMaterialsPageWrapper from '@/pages/StudyMaterialsPage';
import CommunityPageWrapper from '@/pages/CommunityPage';
import MealPlannerPageWrapper from '@/pages/MealPlannerPage';
import OnboardingFlow from '@/components/Onboarding/OnboardingFlow';

// New 50 Pages - AI-Powered Features
import AICurriculumMapperPage from '@/pages/AICurriculumMapperPage';
import VirtualStudyRoomPage from '@/pages/VirtualStudyRoomPage';

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
            <Route path="/landing-verse" element={<LandingVerse />} />
            
            {/* ECZ Platform Routes - 35 Pages with 350 Features */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <ECZDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/courses" element={
              <ProtectedRoute>
                <ECZCourses />
              </ProtectedRoute>
            } />

            {/* Onboarding */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingFlow onComplete={() => window.location.href = '/dashboard'} />
              </ProtectedRoute>
            } />

            {/* Comprehensive AI Hub - NEW MAIN FEATURE */}
            <Route path="/comprehensive-ai-hub" element={
              <ProtectedRoute>
                <ComprehensiveAIPage />
              </ProtectedRoute>
            } />

            {/* Enhanced AI Features - Core Learning */}
            <Route path="/study-assistant" element={
              <ProtectedRoute>
                <StudyAssistantPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-helper" element={
              <ProtectedRoute>
                <AIStudyHelper />
              </ProtectedRoute>
            } />
            
            <Route path="/multi-ai-tutor" element={
              <ProtectedRoute>
                <MultiAITutorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-flashcards" element={
              <ProtectedRoute>
                <AIFlashcardPage />
              </ProtectedRoute>
            } />

            <Route path="/comprehensive-ai-study" element={
              <ProtectedRoute>
                <ComprehensiveAIStudyPage />
              </ProtectedRoute>
            } />

            <Route path="/enhanced-ai-tutor" element={
              <ProtectedRoute>
                <EnhancedAITutorPage />
              </ProtectedRoute>
            } />

            {/* AI-Powered Tools */}
            <Route path="/semantic-search" element={
              <ProtectedRoute>
                <SemanticSearchPage />
              </ProtectedRoute>
            } />
            
            <Route path="/emotion-detection" element={
              <ProtectedRoute>
                <EmotionDetectionPage />
              </ProtectedRoute>
            } />
            
            <Route path="/multilingual-translator" element={
              <ProtectedRoute>
                <MultilingualTranslatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/visual-mind-map" element={
              <ProtectedRoute>
                <VisualMindMapPage />
              </ProtectedRoute>
            } />
            
            <Route path="/teach-back-assessment" element={
              <ProtectedRoute>
                <TeachBackPage />
              }</ProtectedRoute>
            } />
            
            <Route path="/ai-learning-paths" element={
              <ProtectedRoute>
                <AILearningPathPage />
              </ProtectedRoute>
            } />
            
            <Route path="/daily-goal-coach" element={
              <ProtectedRoute>
                <DailyGoalCoachPage />
              </ProtectedRoute>
            } />
            
            <Route path="/claude-journaling" element={
              <ProtectedRoute>
                <ClaudeJournalingPage />
              </ProtectedRoute>
            } />
            
            <Route path="/smart-recommendations" element={
              <ProtectedRoute>
                <SmartRecommendationsPage />
              </ProtectedRoute>
            } />

            {/* Social & Community Features */}
            <Route path="/social-feed" element={
              <ProtectedRoute>
                <SocialFeedPage />
              </ProtectedRoute>
            } />

            <Route path="/enhanced-social" element={
              <ProtectedRoute>
                <EnhancedSocialFeed />
              </ProtectedRoute>
            } />
            
            <Route path="/mentorship-hub" element={
              <ProtectedRoute>
                <MentorshipHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/mentorship-coaching" element={
              <ProtectedRoute>
                <MentorshipGoalCoaching />
              </ProtectedRoute>
            } />
            
            <Route path="/study-groups" element={
              <ProtectedRoute>
                <StudyGroupsPage />
              </ProtectedRoute>
            } />

            <Route path="/messenger" element={
              <ProtectedRoute>
                <MessengerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/campus-map" element={
              <ProtectedRoute>
                <CampusMapPage />
              </ProtectedRoute>
            } />
            
            <Route path="/peer-finder" element={
              <ProtectedRoute>
                <PeerFinderPage />
              </ProtectedRoute>
            } />
            
            <Route path="/events-learning" element={
              <ProtectedRoute>
                <EventsLearningPage />
              </ProtectedRoute>
            } />
            
            <Route path="/knowledge-feed" element={
              <ProtectedRoute>
                <KnowledgeFeedPage />
              </ProtectedRoute>
            } />

            {/* Study Materials & Resources */}
            <Route path="/study-materials" element={
              <ProtectedRoute>
                <StudyMaterialRepository />
              </ProtectedRoute>
            } />

            <Route path="/study-materials-repo" element={
              <ProtectedRoute>
                <StudyMaterialsPageWrapper />
              </ProtectedRoute>
            } />

            {/* Community & Collaboration */}
            <Route path="/community-collaboration" element={
              <ProtectedRoute>
                <CommunityPageWrapper />
              </ProtectedRoute>
            } />

            {/* Health & Wellness */}
            <Route path="/meal-planner" element={
              <ProtectedRoute>
                <MealPlannerPageWrapper />
              </ProtectedRoute>
            } />

            {/* Core Academic Features */}
            <Route path="/interactive-lessons" element={
              <ProtectedRoute>
                <InteractiveLessons />
              </ProtectedRoute>
            } />
            
            <Route path="/virtual-classroom" element={
              <ProtectedRoute>
                <VirtualClassroom />
              </ProtectedRoute>
            } />

            {/* Analytics & Progress */}
            <Route path="/learning-analytics" element={
              <ProtectedRoute>
                <LearningAnalytics />
              </ProtectedRoute>
            } />
            
            <Route path="/achievements" element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            } />

            {/* Gamification */}
            <Route path="/gameify-vault" element={
              <ProtectedRoute>
                <GameifyVault />
              </ProtectedRoute>
            } />
            
            <Route path="/group-competition-arena" element={
              <ProtectedRoute>
                <GroupCompetitionArenaPage />
              </ProtectedRoute>
            } />

            {/* Technical & Developer */}
            <Route path="/api-flowchart" element={
              <ProtectedRoute>
                <APIFlowchartPage />
              </ProtectedRoute>
            } />

            {/* User Management */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* New 50 Pages - AI-Powered Features */}
            <Route path="/ai-curriculum-mapper" element={
              <ProtectedRoute>
                <AICurriculumMapperPage />
              </ProtectedRoute>
            } />
            
            <Route path="/virtual-study-room" element={
              <ProtectedRoute>
                <VirtualStudyRoomPage />
              </ProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
