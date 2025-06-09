
import React from 'react';
import AIFlashcardGenerator from '@/components/AI/AIFlashcardGenerator';

const AIFlashcardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Flashcard Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-generated flashcards from your lessons with adaptive spaced repetition learning
          </p>
        </div>
        <AIFlashcardGenerator />
      </div>
    </div>
  );
};

export default AIFlashcardPage;
