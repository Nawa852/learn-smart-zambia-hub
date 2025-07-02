
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Calendar, TrendingUp, Globe, Lightbulb } from 'lucide-react';

const StudyGoalTrackerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Target className="w-10 h-10 text-yellow-600" />
            Study Goal Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Monitors ECZ-aligned study goals with AI-powered progress tracking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-600" />
                AI-Powered Goal Setter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Sets ECZ goals with Moonshot AI</p>
              <Button className="w-full">Set New Goals</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Dynamic Goal Visualizer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Displays progress as charts</p>
              <Button className="w-full">View Progress</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Offline Goal Cache
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Stores goals offline</p>
              <Button className="w-full">Sync Goals</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Multilingual Goal Narrator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Narrates in 7 languages</p>
              <Button className="w-full">Listen to Goals</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                AI-Powered Goal Recommender
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Suggests new goals</p>
              <Button className="w-full">Get Recommendations</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyGoalTrackerPage;
