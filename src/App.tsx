
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/components/Auth/AuthProvider';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import LandingVersePage from '@/pages/LandingVerse';
import StudyMaterialRepositoryPage from '@/pages/StudyMaterialRepository';
import Dashboard from '@/pages/Dashboard';
import AIStudyHelper from '@/pages/AIStudyHelper';
import Courses from '@/pages/Courses';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/landing" element={<LandingVersePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/study-materials" element={<StudyMaterialRepositoryPage />} />
              <Route path="/ai-study-helper" element={<AIStudyHelper />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Add more feature pages */}
              <Route path="/ecz-exam-prep" element={<div className="p-8"><h1 className="text-2xl font-bold">ECZ Exam Prep - Coming Soon</h1></div>} />
              <Route path="/virtual-classroom" element={<div className="p-8"><h1 className="text-2xl font-bold">Virtual Classroom - Coming Soon</h1></div>} />
              <Route path="/community" element={<div className="p-8"><h1 className="text-2xl font-bold">Community - Coming Soon</h1></div>} />
              <Route path="/career-hub" element={<div className="p-8"><h1 className="text-2xl font-bold">Career Hub - Coming Soon</h1></div>} />
              <Route path="/meal-planner" element={<div className="p-8"><h1 className="text-2xl font-bold">Meal Planner - Coming Soon</h1></div>} />
              <Route path="/gamified-learning" element={<div className="p-8"><h1 className="text-2xl font-bold">Gamified Learning - Coming Soon</h1></div>} />
              <Route path="/virtual-labs" element={<div className="p-8"><h1 className="text-2xl font-bold">Virtual Labs - Coming Soon</h1></div>} />
              <Route path="/mentorship" element={<div className="p-8"><h1 className="text-2xl font-bold">Mentorship - Coming Soon</h1></div>} />
              <Route path="/scholarships" element={<div className="p-8"><h1 className="text-2xl font-bold">Scholarships - Coming Soon</h1></div>} />
              <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
