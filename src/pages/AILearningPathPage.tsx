
import React from 'react';
import AILearningPathGenerator from '@/components/AI/AILearningPathGenerator';

const AILearningPathPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Learning Path Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let AI create personalized learning journeys tailored to your goals, skill level, and learning style
          </p>
        </div>
        <AILearningPathGenerator />
      </div>
    </div>
  );
};

export default AILearningPathPage;
