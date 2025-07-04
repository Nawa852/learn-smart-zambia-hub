import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/components/Auth/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import StakeholderOnboarding from '@/components/Onboarding/StakeholderOnboarding';

// Pages
import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import StudyAssistantPage from '@/pages/StudyAssistantPage';
import MultiAITutorPage from '@/pages/MultiAITutorPage';
import FlashcardsPage from '@/pages/FlashcardsPage';
import QuizPage from '@/pages/QuizPage';
import ProgressPage from '@/pages/ProgressPage';
import CommunityPage from '@/pages/CommunityPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';

// Components
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import Layout from '@/components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const { user, loading, needsOnboarding, completeOnboarding } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show onboarding for authenticated users who haven't completed setup
  if (user && needsOnboarding) {
    return <StakeholderOnboarding onComplete={completeOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-assistant"
          element={
            <ProtectedRoute>
              <Layout>
                <StudyAssistantPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/multi-ai-tutor"
          element={
            <ProtectedRoute>
              <Layout>
                <MultiAITutorPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/flashcards"
          element={
            <ProtectedRoute>
              <Layout>
                <FlashcardsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Layout>
                <QuizPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Layout>
                <ProgressPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Layout>
                <CommunityPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
