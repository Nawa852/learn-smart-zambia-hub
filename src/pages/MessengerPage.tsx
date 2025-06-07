
import React from 'react';
import MessengerChat from '@/components/Social/MessengerChat';

const MessengerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect and collaborate with your learning community</p>
        </div>
        <MessengerChat />
      </div>
    </div>
  );
};

export default MessengerPage;
