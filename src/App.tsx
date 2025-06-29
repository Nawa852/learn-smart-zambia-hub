import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/components/Auth/AuthProvider';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { User, Bell, Search } from "lucide-react";

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

// Component that uses auth
function AppContent() {
  const { user } = useAuth();

  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
          {user && <AppSidebar />}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Enhanced TopBar */}
            {user && (
              <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200" />
                    <div className="flex flex-col">
                      <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome{user ? `, ${user.user_metadata?.full_name || user.email?.split('@')[0]}` : ""}
                      </span>
                      <span className="text-xs text-gray-500">Ready to learn something new?</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <Search className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400/50 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
                        {user.user_metadata?.avatar_url ? (
                          <img src={user.user_metadata?.avatar_url} alt="avatar" className="object-cover w-10 h-10" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="hidden md:flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {user.user_metadata?.full_name || user.email?.split('@')[0]}
                        </span>
                        <span className="text-xs text-gray-500">Student</span>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
            )}
            
            <main className={`flex-1 ${user ? 'p-6 md:p-8 bg-gradient-to-br from-blue-50/30 via-white/50 to-purple-50/30' : ''}`}>
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
                <Route path="/smart-recommendations" element={
                  <ProtectedRoute>
                    <SmartRecommendationsPage />
                  </ProtectedRoute>
                } />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
