
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import MainNavigation from '@/components/Navigation/MainNavigation';
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
import AIContentGeneratorPage from '@/pages/AIContentGeneratorPage';

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
          <MainNavigation />
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

              {/* AI & Learning Routes */}
              <Route path="/ai-study-helper" element={
                <ProtectedRoute>
                  <AIStudyHelper />
                </ProtectedRoute>
              } />
              <Route path="/ai-tutor" element={
                <ProtectedRoute>
                  <AITutorPage />
                </ProtectedRoute>
              } />
              <Route path="/smart-recommendations" element={
                <ProtectedRoute>
                  <SmartRecommendationsPage />
                </ProtectedRoute>
              } />
              <Route path="/adaptive-content" element={
                <ProtectedRoute>
                  <AdaptiveContentPage />
                </ProtectedRoute>
              } />
              <Route path="/live-learning" element={
                <ProtectedRoute>
                  <LiveLearningPage />
                </ProtectedRoute>
              } />
              <Route path="/video-learning" element={
                <ProtectedRoute>
                  <VideoLearningPage />
                </ProtectedRoute>
              } />
              <Route path="/ai-content-generator" element={
                <ProtectedRoute>
                  <AIContentGeneratorPage />
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
