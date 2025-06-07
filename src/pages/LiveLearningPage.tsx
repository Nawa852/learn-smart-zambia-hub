
import React from 'react';
import LiveLearning from '@/components/Learning/LiveLearning';

const LiveLearningPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Learning Sessions</h1>
          <p className="text-gray-600">Join interactive live classes with AI-moderated discussions and real-time collaboration</p>
        </div>
        <LiveLearning />
      </div>
    </div>
  );
};

export default LiveLearningPage;
