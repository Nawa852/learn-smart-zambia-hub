
import React from 'react';
import VideoLearning from '@/components/Content/VideoLearning';

const VideoLearningPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Video Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access curated video content, AI-powered summaries, and interactive learning experiences
          </p>
        </div>
        <VideoLearning />
      </div>
    </div>
  );
};

export default VideoLearningPage;
