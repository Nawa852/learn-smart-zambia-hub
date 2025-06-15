
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import EnhancedNavigation from '@/components/Navigation/EnhancedNavigation';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import Profile from '@/pages/Profile';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AcknowledgmentPage from '@/pages/AcknowledgmentPage';
import AIStudyHelper from '@/pages/AIStudyHelper';
import AITutorPage from '@/pages/AITutorPage';
import LearningAnalytics from '@/pages/LearningAnalytics';
import Achievements from '@/pages/Achievements';
import SmartRecommendationsPage from '@/pages/SmartRecommendationsPage';
import AdaptiveContentPage from '@/pages/AdaptiveContentPage';
import LiveLearningPage from '@/pages/LiveLearningPage';
import VideoLearningPage from '@/pages/VideoLearningPage';
import YouTubeLearningPage from '@/pages/YouTubeLearningPage';
import AIContentGeneratorPage from '@/pages/AIContentGeneratorPage';
import MultiAITutorPage from '@/pages/MultiAITutorPage';

// New pages
import AILearningLab from '@/pages/AILearningLab';
import KnowledgeTree from '@/pages/KnowledgeTree';
import GameifyVault from '@/pages/GameifyVault';

// AI Features Pages
import AILearningPathPage from '@/pages/AILearningPathPage';
import AdaptiveDifficultyPage from '@/pages/AdaptiveDifficultyPage';
import ClaudeJournalingPage from '@/pages/ClaudeJournalingPage';
import DailyGoalCoachPage from '@/pages/DailyGoalCoachPage';
import AIFlashcardPage from '@/pages/AIFlashcardPage';
import SemanticSearchPage from '@/pages/SemanticSearchPage';
import EmotionDetectionPage from '@/pages/EmotionDetectionPage';
import MultilingualTranslatorPage from '@/pages/MultilingualTranslatorPage';
import RealTimeSummarizerPage from '@/pages/RealTimeSummarizerPage';
import VisualMindMapPage from '@/pages/VisualMindMapPage';
import TeachBackPage from '@/pages/TeachBackPage';

// Social Pages
import SocialFeedPage from '@/pages/SocialFeedPage';
import AcademicProfilePage from '@/pages/AcademicProfilePage';
import StudyGroupsPage from '@/pages/StudyGroupsPage';
import MessengerPage from '@/pages/MessengerPage';
import KnowledgeFeedPage from '@/pages/KnowledgeFeedPage';
import CampusMapPage from '@/pages/CampusMapPage';
import PeerFinderPage from '@/pages/PeerFinderPage';
import MentorshipHubPage from '@/pages/MentorshipHubPage';
import EventsLearningPage from '@/pages/EventsLearningPage';

// Error Pages
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <EnhancedNavigation />
          <main className="pt-0">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/acknowledgments" element={<AcknowledgmentPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
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

              {/* New Feature Routes */}
              <Route path="/ai-learning-lab" element={
                <ProtectedRoute>
                  <AILearningLab />
                </ProtectedRoute>
              } />
              <Route path="/knowledge-tree" element={
                <ProtectedRoute>
                  <KnowledgeTree />
                </ProtectedRoute>
              } />
              <Route path="/gameify-vault" element={
                <ProtectedRoute>
                  <GameifyVault />
                </ProtectedRoute>
              } />

              {/* AI & Learning Routes */}
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
              <Route path="/ai-tutor" element={
                <ProtectedRoute>
                  <AITutorPage />
                </ProtectedRoute>
              } />

              {/* AI Features Routes */}
              <Route path="/ai-learning-paths" element={
                <ProtectedRoute>
                  <AILearningPathPage />
                </ProtectedRoute>
              } />
              <Route path="/adaptive-difficulty" element={
                <ProtectedRoute>
                  <AdaptiveDifficultyPage />
                </ProtectedRoute>
              } />
              <Route path="/claude-journaling" element={
                <ProtectedRoute>
                  <ClaudeJournalingPage />
                </ProtectedRoute>
              } />
              <Route path="/daily-goal-coach" element={
                <ProtectedRoute>
                  <DailyGoalCoachPage />
                </ProtectedRoute>
              } />
              <Route path="/ai-flashcards" element={
                <ProtectedRoute>
                  <AIFlashcardPage />
                </ProtectedRoute>
              } />
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
              <Route path="/real-time-summarizer" element={
                <ProtectedRoute>
                  <RealTimeSummarizerPage />
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

              {/* Social Learning Routes */}
              <Route path="/social-feed" element={
                <ProtectedRoute>
                  <SocialFeedPage />
                </ProtectedRoute>
              } />
              <Route path="/academic-profile" element={
                <ProtectedRoute>
                  <AcademicProfilePage />
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
              <Route path="/knowledge-feed" element={
                <ProtectedRoute>
                  <KnowledgeFeedPage />
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
              <Route path="/mentorship-hub" element={
                <ProtectedRoute>
                  <MentorshipHubPage />
                </ProtectedRoute>
              } />
              <Route path="/events-learning" element={
                <ProtectedRoute>
                  <EventsLearningPage />
                </ProtectedRoute>
              } />

              {/* Analytics & Progress Routes */}
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

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
