
import React from 'react';
import VideoLearning from '@/components/Content/VideoLearning';

const VideoLearningPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Video Learning Hub</h1>
          <p className="text-gray-600">AI-enhanced video content with concept navigation and smart summaries</p>
        </div>
        <VideoLearning />
      </div>
    </div>
  );
};

export default VideoLearningPage;
