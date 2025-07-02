
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Clock, Calendar, Globe, Lightbulb } from 'lucide-react';

const AIStudyTaskManagerPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <CheckSquare className="w-10 h-10 text-slate-600" />
        AI Study Task Manager
      </h1>
      <p className="text-lg text-gray-600 mb-8">Manages ECZ study tasks with AI-powered organization</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: CheckSquare, title: "AI-Powered Task Generator", desc: "Creates ECZ tasks with LLaMA 4", color: "slate" },
          { icon: Clock, title: "Dynamic Task Scheduler", desc: "Schedules tasks with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Task Cache", desc: "Stores tasks offline", color: "purple" },
          { icon: Globe, title: "Multilingual Task Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Task Recommender", desc: "Suggests tasks with DeepSeek", color: "orange" }
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

export default AIStudyTaskManagerPage;
