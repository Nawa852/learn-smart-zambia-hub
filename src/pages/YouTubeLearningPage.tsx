
import React from 'react';
import YouTubeLearningHub from '@/components/Learning/YouTubeLearningHub';
import AcademicAvatar from '@/components/Gamification/AcademicAvatar';
import { useAuth } from '@/components/Auth/AuthProvider';

const YouTubeLearningPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-4">
            YouTube Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover curated educational content, create personalized learning paths, and earn rewards while you learn
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <YouTubeLearningHub />
          </div>
          
          {/* Sidebar with Avatar and Progress */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <AcademicAvatar
                userId={user?.id || ''}
                currentLevel={1}
                currentXP={0}
                totalCoins={100}
                studyStreak={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeLearningPage;
