
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AITutorChat from '@/components/AI/AITutorChat';
import StudyScheduler from '@/components/AI/StudyScheduler';
import { Brain, Calendar, Upload, MessageSquare } from 'lucide-react';

const AIStudyHelper = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Study Helper</h1>
          <p className="text-gray-600">Your personal AI tutor, study scheduler, and learning companion</p>
        </div>

        <Tabs defaultValue="tutor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Study Scheduler
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Materials
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutor">
            <AITutorChat />
          </TabsContent>

          <TabsContent value="scheduler">
            <StudyScheduler />
          </TabsContent>

          <TabsContent value="materials">
            <div className="text-center py-12">
              <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload Study Materials</h3>
              <p className="text-gray-600 mb-4">Upload PDFs, documents, or images for AI analysis</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Upload Files
              </button>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="text-center py-12">
              <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learning Insights</h3>
              <p className="text-gray-600">AI-powered analysis of your learning patterns coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIStudyHelper;
