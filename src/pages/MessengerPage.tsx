import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import MessengerChat from '@/components/Social/MessengerChat';

const MessengerPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text-bright-sphere mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Connect and collaborate with your learning community
          </p>
        </div>
        <MessengerChat />
      </div>
    </MainLayout>
  );
};

export default MessengerPage;