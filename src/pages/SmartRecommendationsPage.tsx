import React from 'react';
import SmartRecommendations from '@/components/Advanced/SmartRecommendations';

const SmartRecommendationsPage = () => {
  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Smart Recommendations
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered insights based on your learning patterns, quiz scores, and study habits
          </p>
        </div>
        <SmartRecommendations />
      </div>
    </div>
  );
};

export default SmartRecommendationsPage;