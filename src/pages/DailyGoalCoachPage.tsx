
import React from 'react';
import DailyGoalCoach from '@/components/AI/DailyGoalCoach';

const DailyGoalCoachPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Daily Goal Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered daily goal setting, progress tracking, and personalized coaching for optimal learning
          </p>
        </div>
        <DailyGoalCoach />
      </div>
    </div>
  );
};

export default DailyGoalCoachPage;
