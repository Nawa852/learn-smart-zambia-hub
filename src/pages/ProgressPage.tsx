
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BookOpen, Target, Award, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProgressPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
        <p className="text-gray-600">Track your academic journey and achievements</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Mathematics</span>
                <span>85%</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Science</span>
                <span>72%</span>
              </div>
              <Progress value={72} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>English</span>
                <span>90%</span>
              </div>
              <Progress value={90} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Trophy className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium">Quiz Master</p>
                  <p className="text-sm text-gray-600">Completed 10 quizzes</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium">Study Streak</p>
                  <p className="text-sm text-gray-600">7 days in a row</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
