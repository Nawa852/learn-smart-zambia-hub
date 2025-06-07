
import React from 'react';
import SocialFeed from '@/components/Social/SocialFeed';

const SocialFeedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Community</h1>
          <p className="text-gray-600">Stay connected with your learning community</p>
        </div>
        <SocialFeed />
      </div>
    </div>
  );
};

export default SocialFeedPage;
