
import React from 'react';
import RealTimeSummarizer from '@/components/AI/RealTimeSummarizer';

const RealTimeSummarizerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Real-Time Content Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Instantly summarize any video, PDF, or text content with AI-powered analysis
          </p>
        </div>
        <RealTimeSummarizer />
      </div>
    </div>
  );
};

export default RealTimeSummarizerPage;
