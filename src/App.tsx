
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

              {/* New Feature Pages */}
              <Route path="/discussions" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Discussion Forums</h1>
                    <p>Coming soon - Interactive discussion boards and forums</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Learning Schedule</h1>
                    <p>Coming soon - Personalized learning calendar and scheduling</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Learning Resources</h1>
                    <p>Coming soon - Digital library and resource center</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/virtual-classroom" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Virtual Classroom</h1>
                    <p>Coming soon - 3D virtual learning environments</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/challenges" element={
                <ProtectedRoute>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold">Learning Challenges</h1>
                    <p>Coming soon - Gamified learning challenges and competitions</p>
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
