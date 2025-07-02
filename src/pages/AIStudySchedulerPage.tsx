
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ListTodo, Globe, Lightbulb } from 'lucide-react';

const AIStudySchedulerPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Calendar className="w-10 h-10 text-blue-600" />
        AI Study Scheduler
      </h1>
      <p className="text-lg text-gray-600 mb-8">Optimizes ECZ study schedules with AI-powered planning</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Calendar, title: "AI-Powered Schedule Optimizer", desc: "Optimizes ECZ schedules with Moonshot AI", color: "blue" },
          { icon: ListTodo, title: "Dynamic Task Scheduler", desc: "Schedules tasks with GPT-4o", color: "green" },
          { icon: Clock, title: "Offline Schedule Cache", desc: "Stores schedules offline", color: "purple" },
          { icon: Globe, title: "Multilingual Schedule Narrator", desc: "Narrates in 7 languages", color: "teal" },
          { icon: Lightbulb, title: "AI-Powered Schedule Recommender", desc: "Suggests tasks with DeepSeek", color: "orange" }
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

export default AIStudySchedulerPage;
