
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuizPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Quizzes</h1>
        <p className="text-gray-600">Test your knowledge with AI-generated quizzes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Mathematics Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                15 min
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                20 points
              </div>
            </div>
            <Button className="w-full">Start Quiz</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Science Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                12 min
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                15 points
              </div>
            </div>
            <Button className="w-full">Start Quiz</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
