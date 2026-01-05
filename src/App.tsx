
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { MainLayout } from '@/components/Layout/MainLayout';

// Import all pages
import Index from '@/pages/Index';
import LoginPage from '@/components/Auth/LoginPage';
import SignUpPage from '@/components/Auth/SignUpPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import LandingVerse from '@/pages/LandingVerse';
import Dashboard from '@/pages/Dashboard';
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
import ProfilePage from '@/pages/ProfilePage';
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
import WelcomePage from '@/pages/WelcomePage';

// Import all 50 new AI-powered pages
import AICurriculumMapperPage from '@/pages/AICurriculumMapperPage';
import VirtualStudyRoomPage from '@/pages/VirtualStudyRoomPage';
import ECZExamSimulatorPage from '@/pages/ECZExamSimulatorPage';
import PeerMentorshipPortalPage from '@/pages/PeerMentorshipPortalPage';
import AIResourceCuratorPage from '@/pages/AIResourceCuratorPage';
import StudyGoalTrackerPage from '@/pages/StudyGoalTrackerPage';
import ECZVideoLibraryPage from '@/pages/ECZVideoLibraryPage';
import AIStudyBuddyPage from '@/pages/AIStudyBuddyPage';
import InteractiveECZGamesPage from '@/pages/InteractiveECZGamesPage';
import ECZAssignmentHubPage from '@/pages/ECZAssignmentHubPage';
import VirtualECZLibraryPage from '@/pages/VirtualECZLibraryPage';
import ECZStudyNotesEditorPage from '@/pages/ECZStudyNotesEditorPage';
import AIProgressDashboardPage from '@/pages/AIProgressDashboardPage';
import ECZStudyPlannerPage from '@/pages/ECZStudyPlannerPage';
import AIFeedbackPortalPage from '@/pages/AIFeedbackPortalPage';
import ECZProjectShowcasePage from '@/pages/ECZProjectShowcasePage';
import AIStudyGroupFinderPage from '@/pages/AIStudyGroupFinderPage';
import ECZResourceTranslatorPage from '@/pages/ECZResourceTranslatorPage';
import AIQuizCreatorPage from '@/pages/AIQuizCreatorPage';
import ECZParentSupportHubPage from '@/pages/ECZParentSupportHubPage';
import TeacherCollaborationHubPage from '@/pages/TeacherCollaborationHubPage';
import ECZVirtualTutorPage from '@/pages/ECZVirtualTutorPage';
import AIStudyAnalyticsPage from '@/pages/AIStudyAnalyticsPage';
import ECZResourceMarketplacePage from '@/pages/ECZResourceMarketplacePage';
import AIExamPrepCoachPage from '@/pages/AIExamPrepCoachPage';
import ECZStudyCommunityPage from '@/pages/ECZStudyCommunityPage';
import AIStudyMentorPage from '@/pages/AIStudyMentorPage';
import ECZResourceAnnotatorPage from '@/pages/ECZResourceAnnotatorPage';
import AIStudyMotivatorPage from '@/pages/AIStudyMotivatorPage';
import ECZParentTeacherPortalPage from '@/pages/ECZParentTeacherPortalPage';
import AIStudyJournalPage from '@/pages/AIStudyJournalPage';
import ECZVirtualWhiteboardPage from '@/pages/ECZVirtualWhiteboardPage';
import AIStudyInsightsPage from '@/pages/AIStudyInsightsPage';
import ECZResourceValidatorPage from '@/pages/ECZResourceValidatorPage';
import AIStudySchedulerPage from '@/pages/AIStudySchedulerPage';
import ECZResourceSharingHubPage from '@/pages/ECZResourceSharingHubPage';
import AIStudyProgressTrackerPage from '@/pages/AIStudyProgressTrackerPage';
import ECZVirtualLabSimulatorPage from '@/pages/ECZVirtualLabSimulatorPage';
import AIStudyResourceFinderPage from '@/pages/AIStudyResourceFinderPage';
import ECZStudyGroupChatPage from '@/pages/ECZStudyGroupChatPage';
import AIStudyResourceEditorPage from '@/pages/AIStudyResourceEditorPage';
import ECZStudyCommunityForumPage from '@/pages/ECZStudyCommunityForumPage';
import AIStudyProgressVisualizerPage from '@/pages/AIStudyProgressVisualizerPage';
import ECZStudyResourceHubPage from '@/pages/ECZStudyResourceHubPage';
import AIStudyTaskManagerPage from '@/pages/AIStudyTaskManagerPage';
import ECZStudyResourceAnalyzerPage from '@/pages/ECZStudyResourceAnalyzerPage';
import AIStudyGroupModeratorPage from '@/pages/AIStudyGroupModeratorPage';
import ECZStudyResourceCreatorPage from '@/pages/ECZStudyResourceCreatorPage';
import AIStudyProgressMonitorPage from '@/pages/AIStudyProgressMonitorPage';
import ECZStudyResourcePortalPage from '@/pages/ECZStudyResourcePortalPage';
import MegaDashboard from '@/pages/MegaDashboard';
import PlatformFeaturesPage from '@/pages/PlatformFeaturesPage';

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
            <Route path="/welcome" element={<WelcomePage />} />
            
            {/* Protected Dashboard Routes */}
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
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
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
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* 50 NEW AI-POWERED PAGES */}
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
            
            <Route path="/ecz-exam-simulator" element={
              <ProtectedRoute>
                <ECZExamSimulatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/peer-mentorship-portal" element={
              <ProtectedRoute>
                <PeerMentorshipPortalPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-resource-curator" element={
              <ProtectedRoute>
                <AIResourceCuratorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/study-goal-tracker" element={
              <ProtectedRoute>
                <StudyGoalTrackerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-video-library" element={
              <ProtectedRoute>
                <ECZVideoLibraryPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-buddy" element={
              <ProtectedRoute>
                <AIStudyBuddyPage />
              </ProtectedRoute>
            } />
            
            <Route path="/interactive-ecz-games" element={
              <ProtectedRoute>
                <InteractiveECZGamesPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-assignment-hub" element={
              <ProtectedRoute>
                <ECZAssignmentHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/virtual-ecz-library" element={
              <ProtectedRoute>
                <VirtualECZLibraryPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-notes-editor" element={
              <ProtectedRoute>
                <ECZStudyNotesEditorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-progress-dashboard" element={
              <ProtectedRoute>
                <AIProgressDashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-planner" element={
              <ProtectedRoute>
                <ECZStudyPlannerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-feedback-portal" element={
              <ProtectedRoute>
                <AIFeedbackPortalPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-project-showcase" element={
              <ProtectedRoute>
                <ECZProjectShowcasePage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-group-finder" element={
              <ProtectedRoute>
                <AIStudyGroupFinderPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-resource-translator" element={
              <ProtectedRoute>
                <ECZResourceTranslatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-quiz-creator" element={
              <ProtectedRoute>
                <AIQuizCreatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-parent-support-hub" element={
              <ProtectedRoute>
                <ECZParentSupportHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher-collaboration-hub" element={
              <ProtectedRoute>
                <TeacherCollaborationHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-virtual-tutor" element={
              <ProtectedRoute>
                <ECZVirtualTutorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-analytics" element={
              <ProtectedRoute>
                <AIStudyAnalyticsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-resource-marketplace" element={
              <ProtectedRoute>
                <ECZResourceMarketplacePage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-exam-prep-coach" element={
              <ProtectedRoute>
                <AIExamPrepCoachPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-community" element={
              <ProtectedRoute>
                <ECZStudyCommunityPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-mentor" element={
              <ProtectedRoute>
                <AIStudyMentorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-resource-annotator" element={
              <ProtectedRoute>
                <ECZResourceAnnotatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-motivator" element={
              <ProtectedRoute>
                <AIStudyMotivatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-parent-teacher-portal" element={
              <ProtectedRoute>
                <ECZParentTeacherPortalPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-journal" element={
              <ProtectedRoute>
                <AIStudyJournalPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-virtual-whiteboard" element={
              <ProtectedRoute>
                <ECZVirtualWhiteboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-insights" element={
              <ProtectedRoute>
                <AIStudyInsightsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-resource-validator" element={
              <ProtectedRoute>
                <ECZResourceValidatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-scheduler" element={
              <ProtectedRoute>
                <AIStudySchedulerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-resource-sharing-hub" element={
              <ProtectedRoute>
                <ECZResourceSharingHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-progress-tracker" element={
              <ProtectedRoute>
                <AIStudyProgressTrackerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-virtual-lab-simulator" element={
              <ProtectedRoute>
                <ECZVirtualLabSimulatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-resource-finder" element={
              <ProtectedRoute>
                <AIStudyResourceFinderPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-group-chat" element={
              <ProtectedRoute>
                <ECZStudyGroupChatPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-resource-editor" element={
              <ProtectedRoute>
                <AIStudyResourceEditorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-community-forum" element={
              <ProtectedRoute>
                <ECZStudyCommunityForumPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-progress-visualizer" element={
              <ProtectedRoute>
                <AIStudyProgressVisualizerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-resource-hub" element={
              <ProtectedRoute>
                <ECZStudyResourceHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-task-manager" element={
              <ProtectedRoute>
                <AIStudyTaskManagerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-resource-analyzer" element={
              <ProtectedRoute>
                <ECZStudyResourceAnalyzerPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-group-moderator" element={
              <ProtectedRoute>
                <AIStudyGroupModeratorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-resource-creator" element={
              <ProtectedRoute>
                <ECZStudyResourceCreatorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-progress-monitor" element={
              <ProtectedRoute>
                <AIStudyProgressMonitorPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ecz-study-resource-portal" element={
              <ProtectedRoute>
                <ECZStudyResourcePortalPage />
              </ProtectedRoute>
            } />

            {/* Mega Dashboard - All 164 Features */}
            <Route path="/mega-dashboard" element={
              <ProtectedRoute>
                <MegaDashboard />
              </ProtectedRoute>
            } />

            {/* Platform Features Hub */}
            <Route path="/platform-features" element={
              <ProtectedRoute>
                <PlatformFeaturesPage />
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
