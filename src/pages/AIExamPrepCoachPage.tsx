
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, Calendar, Globe, Lightbulb } from 'lucide-react';

const AIExamPrepCoachPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <GraduationCap className="w-10 h-10 text-violet-600" />
        AI Exam Prep Coach
      </h1>
      <p className="text-lg text-gray-600 mb-8">Prepares students for ECZ exams with AI-powered coaching</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: GraduationCap, title: "AI-Powered Prep Generator", desc: "Creates ECZ prep plans with Minimax", color: "violet" },
          { icon: Clock, title: "Dynamic Prep Scheduler", desc: "Schedules prep tasks with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Prep Cache", desc: "Stores plans offline", color: "purple" },
          { icon: Globe, title: "Multilingual Prep Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Prep Recommender", desc: "Suggests prep materials with DeepSeek", color: "orange" }
        ].map((feature, index) => (
          <Card key={index} className={`border-l-4 border-${feature.color}-500`}>
            <CardHeader><CardTitle className="flex items-center gap-2"><feature.icon className={`w-5 h-5 text-${feature.color}-600`} />{feature.title}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">{feature.desc}</p><Button className="w-full">Access Feature</Button></CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default AIExamPrepCoachPage;
