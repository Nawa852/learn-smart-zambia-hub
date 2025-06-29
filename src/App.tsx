
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
import EnhancedIndex from '@/pages/EnhancedIndex';
import LoginPage from '@/components/Auth/LoginPage';
import SignUpPage from '@/components/Auth/SignUpPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import LandingVerse from '@/pages/LandingVerse';
import Dashboard from '@/pages/Dashboard';
import AdaptiveDashboard from '@/components/Dashboard/AdaptiveDashboard';
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
import InteractiveLessons from '@/components/Learning/InteractiveLessons';
import VirtualClassroom from '@/components/Learning/VirtualClassroom';

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
            <Route path="/" element={<Index />} />
            <Route path="/enhanced-home" element={<EnhancedIndex />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/landing-verse" element={<LandingVerse />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <AppSidebar />
                  <main className="flex-1">
                    <Dashboard />
                  </main>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/adaptive-dashboard" element={
              <ProtectedRoute>
                <AdaptiveDashboard />
              </ProtectedRoute>
            } />

            <Route path="/enhanced-social" element={
              <ProtectedRoute>
                <EnhancedSocialFeed />
              </ProtectedRoute>
            } />
            
            <Route path="/mentorship-coaching" element={
              <ProtectedRoute>
                <MentorshipGoalCoaching />
              </ProtectedRoute>
            } />

            {/* New API Integration Routes */}
            <Route path="/api-flowchart" element={
              <ProtectedRoute>
                <APIFlowchartPage />
              </ProtectedRoute>
            } />
            
            <Route path="/group-competition-arena" element={
              <ProtectedRoute>
                <GroupCompetitionArenaPage />
              </ProtectedRoute>
            } />
            
            {/* AI Features */}
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

            {/* Social Features */}
            <Route path="/social-feed" element={
              <ProtectedRoute>
                <SocialFeedPage />
              </ProtectedRoute>
            } />
            
            <Route path="/mentorship-hub" element={
              <ProtectedRoute>
                <MentorshipHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/study-groups" element={
              <ProtectedRoute>
                <StudyGroupsPage />
              </ProtectedRoute>
            } />

            {/* Core Features */}
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
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

            {/* Study Materials */}
            <Route path="/study-materials" element={
              <ProtectedRoute>
                <StudyMaterialRepository />
              </ProtectedRoute>
            } />

            {/* AI Tools */}
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
              </ProtectedRoute>
            } />
            
            <Route path="/gameify-vault" element={
              <ProtectedRoute>
                <GameifyVault />
              </ProtectedRoute>
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
            
            {/* New comprehensive AI features */}
            <Route path="/comprehensive-ai-study" element={
              <ProtectedRoute>
                <ComprehensiveAIStudyPage />
              </ProtectedRoute>
            } />
            
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

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
