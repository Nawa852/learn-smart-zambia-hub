
import React from 'react';
import LearningAnalytics from '@/components/Dashboard/LearningAnalytics';

const LearningAnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
          <p className="text-gray-600">Track your progress and optimize your learning journey</p>
        </div>
        <LearningAnalytics />
      </div>
    </div>
  );
};

export default LearningAnalyticsPage;
