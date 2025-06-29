import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient } from 'react-query';

import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailsPage from '@/pages/CourseDetailsPage';
import AssignmentsPage from '@/pages/AssignmentsPage';
import NotesPage from '@/pages/NotesPage';
import StudySessionsPage from '@/pages/StudySessionsPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import DiscussionForumPage from '@/pages/DiscussionForumPage';
import VirtualLabsPage from '@/pages/VirtualLabsPage';
import ScholarshipsPage from '@/pages/ScholarshipsPage';
import TeacherTrainingPage from '@/pages/TeacherTrainingPage';
import MealPlansPage from '@/pages/MealPlansPage';
import StudyMaterialRepositoryPage from '@/pages/StudyMaterialRepository';

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/study-sessions" element={<StudySessionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/discussion-forum" element={<DiscussionForumPage />} />
            <Route path="/virtual-labs" element={<VirtualLabsPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/teacher-training" element={<TeacherTrainingPage />} />
            <Route path="/meal-plans" element={<MealPlansPage />} />
            <Route path="/study-materials" element={<StudyMaterialRepositoryPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClient>
  );
}

export default App;
