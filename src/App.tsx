import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { MainLayout } from '@/components/Layout/MainLayout';

// Core Pages
import Index from '@/pages/Index';
import LoginPage from '@/components/Auth/LoginPage';
import SignUpPage from '@/components/Auth/SignUpPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import WelcomePage from '@/pages/WelcomePage';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import ProfilePage from '@/pages/ProfilePage';
import OnboardingFlow from '@/components/Onboarding/OnboardingFlow';

// Unified Pages
import AIChat from '@/pages/AIChat';
import CommunityHub from '@/pages/CommunityHub';

// Learning Features
import LearningAnalytics from '@/pages/LearningAnalytics';
import Achievements from '@/pages/Achievements';
import StudyMaterialRepository from '@/pages/StudyMaterialRepository';
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
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/welcome" element={<WelcomePage />} />
            
            {/* Dashboard */}
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

            {/* AI Chat - Single unified AI interface */}
            <Route path="/ai" element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            } />

            {/* Community Hub - All social features */}
            <Route path="/community" element={
              <ProtectedRoute>
                <CommunityHub />
              </ProtectedRoute>
            } />

            {/* Courses */}
            <Route path="/courses" element={
              <ProtectedRoute>
                <MainLayout>
                  <Courses />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/lessons" element={
              <ProtectedRoute>
                <MainLayout>
                  <InteractiveLessons />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/classroom" element={
              <ProtectedRoute>
                <MainLayout>
                  <VirtualClassroom />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Study Materials */}
            <Route path="/materials" element={
              <ProtectedRoute>
                <MainLayout>
                  <StudyMaterialRepository />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Analytics & Progress */}
            <Route path="/analytics" element={
              <ProtectedRoute>
                <MainLayout>
                  <LearningAnalytics />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/achievements" element={
              <ProtectedRoute>
                <MainLayout>
                  <Achievements />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Profile */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
