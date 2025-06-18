
import React from 'react';
import MultiAITutorChat from '@/components/AI/MultiAITutorChat';

const MultiAITutorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Multi-AI Tutor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help from multiple AI models - each with unique strengths for different subjects and learning styles
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-green-700 mb-2">OpenAI GPT-4o-mini</h3>
            <p className="text-sm text-gray-600">Excellent for general tutoring, explanations, and creative problem-solving across all subjects.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-orange-700 mb-2">Anthropic Claude</h3>
            <p className="text-sm text-gray-600">Great for detailed analysis, critical thinking, and comprehensive explanations.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-blue-700 mb-2">DeepSeek</h3>
            <p className="text-sm text-gray-600">Specialized in mathematics, coding, and technical subjects with step-by-step solutions.</p>
          </div>
        </div>
        
        <MultiAITutorChat />
      </div>
    </div>
  );
};

export default MultiAITutorPage;
