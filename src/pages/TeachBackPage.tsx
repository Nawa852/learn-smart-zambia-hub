
import React from 'react';
import TeachBackAssessment from '@/components/AI/TeachBackAssessment';

const TeachBackPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI "Teach Back" Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demonstrate your understanding by teaching concepts back to AI for personalized feedback
          </p>
        </div>
        <TeachBackAssessment />
      </div>
    </div>
  );
};

export default TeachBackPage;
