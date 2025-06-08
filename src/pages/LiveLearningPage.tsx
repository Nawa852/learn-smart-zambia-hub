
import React from 'react';
import LiveLearning from '@/components/Learning/LiveLearning';

const LiveLearningPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Live Learning Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join interactive live sessions, collaborate in real-time, and learn with AI-powered assistance
          </p>
        </div>
        <LiveLearning />
      </div>
    </div>
  );
};

export default LiveLearningPage;
