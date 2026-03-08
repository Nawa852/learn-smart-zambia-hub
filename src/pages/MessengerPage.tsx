import React from 'react';
import MessengerChat from '@/components/Social/MessengerChat';

const MessengerPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-sm text-muted-foreground">Connect and collaborate with your learning community</p>
      </div>
      <MessengerChat />
    </div>
  );
};

export default MessengerPage;
