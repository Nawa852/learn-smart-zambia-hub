import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import EnhancedSocialFeed from '@/components/Social/EnhancedSocialFeed';

const SocialFeedPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text-bright-sphere mb-2">
            Learning Community Feed
          </h1>
          <p className="text-muted-foreground">
            Connect, share, and learn together with the Zambian educational community
          </p>
        </div>
        <EnhancedSocialFeed />
      </div>
    </MainLayout>
  );
};

export default SocialFeedPage;