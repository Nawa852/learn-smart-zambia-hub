
import React from 'react';
import ClaudeJournalingAssistant from '@/components/AI/ClaudeJournalingAssistant';

const ClaudeJournalingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Claude Reflective Journaling
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered reflective learning companion that helps you process and deepen your understanding
          </p>
        </div>
        <ClaudeJournalingAssistant />
      </div>
    </div>
  );
};

export default ClaudeJournalingPage;
