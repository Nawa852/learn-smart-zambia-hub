
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import MainNavigation from "@/components/Navigation/MainNavigation";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import LandingVersePage from "./pages/LandingVerse";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import SmartRecommendationsPage from "./pages/SmartRecommendations";
import AdaptiveContent from "./pages/AdaptiveContent";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Instructor from "./pages/Instructor";
import LearningAnalytics from "./pages/LearningAnalytics";
import Dashboard from "./pages/Dashboard";
import Achievements from "./pages/Achievements";
import AIContentStudio from "./pages/AIContentStudio";
import AIStudyHelper from "./pages/AIStudyHelper";
import LiveLearningPage from "./pages/LiveLearningPage";
import VideoLearningPage from "./pages/VideoLearningPage";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50">
            <MainNavigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/landing-verse" element={<LandingVersePage />} />
              <Route path="/courses" element={<Courses />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <ComprehensiveDashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/instructor" element={
                <ProtectedRoute>
                  <Instructor />
                </ProtectedRoute>
              } />
              <Route path="/learning-analytics" element={
                <ProtectedRoute>
                  <LearningAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/adaptive-content" element={
                <ProtectedRoute>
                  <AdaptiveContent />
                </ProtectedRoute>
              } />
              <Route path="/smart-recommendations" element={
                <ProtectedRoute>
                  <SmartRecommendationsPage />
                </ProtectedRoute>
              } />
              <Route path="/achievements" element={
                <ProtectedRoute>
                  <Achievements />
                </ProtectedRoute>
              } />

              {/* AI Features */}
              <Route path="/ai-content-studio" element={
                <ProtectedRoute>
                  <AIContentStudio />
                </ProtectedRoute>
              } />
              <Route path="/ai-study-helper" element={
                <ProtectedRoute>
                  <AIStudyHelper />
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

              {/* Feature Pages */}
              <Route path="/discussions" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Discussion Forums</h1>
                    <p>Interactive discussion boards and forums - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Learning Schedule</h1>
                    <p>Personalized learning calendar and scheduling - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Learning Resources</h1>
                    <p>Digital library and resource center - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/virtual-classroom" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Virtual Classroom</h1>
                    <p>3D virtual learning environments - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/challenges" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Learning Challenges</h1>
                    <p>Gamified learning challenges and competitions - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Study Groups and Social Features */}
              <Route path="/study-groups" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Study Groups</h1>
                    <p>Join and create study groups with your peers - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/homework-help" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Homework Help</h1>
                    <p>Get help with your homework from AI and peers - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/parent-teacher-conferences" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Parent-Teacher Conferences</h1>
                    <p>Schedule and manage parent-teacher meetings - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/grade-tracking" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Grade Tracking</h1>
                    <p>Track and monitor academic progress - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Teacher Features */}
              <Route path="/course-creation" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Course Creation</h1>
                    <p>Create and manage your courses - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/class-management" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Class Management</h1>
                    <p>Manage your classes and students - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/assessment-tools" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Assessment Tools</h1>
                    <p>Create and manage assessments and quizzes - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Parent Features */}
              <Route path="/parent-dashboard" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Parent Dashboard</h1>
                    <p>Monitor your child's academic progress - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/child-progress" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Child Progress</h1>
                    <p>Detailed view of your child's learning journey - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Admin Features */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p>Administrative controls and analytics - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/user-management" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p>Manage users, roles, and permissions - Coming soon</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
