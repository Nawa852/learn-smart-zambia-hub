
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
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
import LearningAnalyticsPage from '@/pages/LearningAnalytics';
import Achievements from '@/pages/Achievements';

// AI Features
import AIFlashcardPage from '@/pages/AIFlashcardPage';
import MultiAITutorPage from '@/pages/MultiAITutorPage';
import AIStudyHelper from '@/pages/AIStudyHelper';
import SmartRecommendationsPage from '@/pages/SmartRecommendationsPage';
import SemanticSearchPage from '@/pages/SemanticSearchPage';
import EmotionDetectionPage from '@/pages/EmotionDetectionPage';
import MultilingualTranslatorPage from '@/pages/MultilingualTranslatorPage';
import VisualMindMapPage from '@/pages/VisualMindMapPage';
import TeachBackPage from '@/pages/TeachBackPage';
import GameifyVault from '@/pages/GameifyVault';
import AILearningPathPage from '@/pages/AILearningPathPage';
import DailyGoalCoachPage from '@/pages/DailyGoalCoachPage';
import ClaudeJournalingPage from '@/pages/ClaudeJournalingPage';

// Social Features
import SocialFeedPage from '@/pages/SocialFeedPage';
import StudyGroupsPage from '@/pages/StudyGroupsPage';
import MessengerPage from '@/pages/MessengerPage';
import CampusMapPage from '@/pages/CampusMapPage';
import PeerFinderPage from '@/pages/PeerFinderPage';
import MentorshipHubPage from '@/pages/MentorshipHubPage';
import EventsLearningPage from '@/pages/EventsLearningPage';
import KnowledgeFeedPage from '@/pages/KnowledgeFeedPage';

// Study Materials
import StudyMaterialRepository from '@/pages/StudyMaterialRepository';

// Layout Components
import Header from '@/components/Header';
import { AppSidebar } from '@/components/AppSidebar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected Routes with Sidebar */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <Dashboard />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/courses" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <Courses />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <Profile />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/learning-analytics" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <LearningAnalyticsPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/achievements" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <Achievements />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />

            {/* AI Features */}
            <Route path="/ai-flashcards" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <AIFlashcardPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/multi-ai-tutor" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <MultiAITutorPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/ai-study-helper" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <AIStudyHelper />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/smart-recommendations" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <SmartRecommendationsPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />

            {/* Study Materials */}
            <Route path="/study-materials" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <StudyMaterialRepository />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />

            {/* Additional AI Features - all wrapped with the same layout pattern */}
            <Route path="/semantic-search" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <SemanticSearchPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/emotion-detection" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <EmotionDetectionPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/multilingual-translator" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <MultilingualTranslatorPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/visual-mind-map" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <VisualMindMapPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/teach-back-assessment" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <TeachBackPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/gameify-vault" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <GameifyVault />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/ai-learning-paths" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <AILearningPathPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/daily-goal-coach" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <DailyGoalCoachPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/claude-journaling" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <ClaudeJournalingPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />

            {/* Social Features */}
            <Route path="/social-feed" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <SocialFeedPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/study-groups" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <StudyGroupsPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/messenger" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <MessengerPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/campus-map" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <CampusMapPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/peer-finder" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <PeerFinderPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/mentorship-hub" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <MentorshipHubPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/events-learning" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <EventsLearningPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/knowledge-feed" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="flex-1">
                        <KnowledgeFeedPage />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
