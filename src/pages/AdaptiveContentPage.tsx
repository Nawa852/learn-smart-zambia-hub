
import React from 'react';
import AdaptiveContentDelivery from '@/components/Learning/AdaptiveContentDelivery';

const AdaptiveContentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Adaptive Content Delivery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience AI-powered learning that adapts to your unique style, pace, and preferences
          </p>
        </div>
        <AdaptiveContentDelivery />
      </div>
    </div>
  );
};

export default AdaptiveContentPage;
