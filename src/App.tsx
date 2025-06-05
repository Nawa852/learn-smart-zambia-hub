import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingVersePage from "./pages/LandingVerse";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import SmartRecommendationsPage from "./pages/SmartRecommendations";
import AdaptiveContent from "./pages/AdaptiveContent";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Instructor from "./pages/Instructor";
import LearningAnalyticsPage from "./pages/LearningAnalyticsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/landing-verse" element={<LandingVersePage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
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
                <LearningAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/ai-tutor" element={
              <ProtectedRoute>
                <AITutorPage />
              </ProtectedRoute>
            } />
            <Route path="/adaptive-learning" element={
              <ProtectedRoute>
                <AdaptiveLearning />
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
            <Route path="/ai-content-studio" element={
              <ProtectedRoute>
                <AIContentStudio />
              </ProtectedRoute>
            } />
            <Route path="/achievements" element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
