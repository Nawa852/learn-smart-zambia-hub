
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FlashcardsPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Flashcards</h1>
        <p className="text-gray-600">Create and study with AI-generated flashcards</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Mathematics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">25 cards</p>
            <Button className="mt-4 w-full">Study Now</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Science
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">18 cards</p>
            <Button className="mt-4 w-full">Study Now</Button>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full p-8">
            <Plus className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center">Create New Flashcard Set</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlashcardsPage;
