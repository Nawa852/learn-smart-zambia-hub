
import React from 'react';
import StudyAssistant from '@/components/AI/StudyAssistant';

const StudyAssistantPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            AI Study Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your 24/7 AI-powered tutor supporting multiple languages and tailored to Zambian curriculum
          </p>
        </div>
        <StudyAssistant />
      </div>
    </div>
  );
};

export default StudyAssistantPage;
