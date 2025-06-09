
import React from 'react';
import EmotionDetectionSystem from '@/components/AI/EmotionDetectionSystem';

const EmotionDetectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Emotion Detection System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered emotion recognition to optimize your learning experience with privacy-first design
          </p>
        </div>
        <EmotionDetectionSystem />
      </div>
    </div>
  );
};

export default EmotionDetectionPage;
