
import React from 'react';
import SmartRecommendations from '@/components/Advanced/SmartRecommendations';

const SmartRecommendationsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Smart Learning Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered personalized recommendations to accelerate your learning journey
          </p>
        </div>
        <SmartRecommendations />
      </div>
    </div>
  );
};

export default SmartRecommendationsPage;
