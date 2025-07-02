
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ListTodo, Globe, Lightbulb } from 'lucide-react';

const ECZStudyPlannerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Calendar className="w-10 h-10 text-rose-600" />
            ECZ Study Planner
          </h1>
          <p className="text-lg text-gray-600">Plans ECZ study schedules with AI-powered optimization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: "AI-Powered Schedule Generator", desc: "Creates ECZ schedules with Minimax", color: "rose" },
            { icon: ListTodo, title: "Dynamic Task Prioritizer", desc: "Prioritizes tasks with GPT-4o", color: "blue" },
            { icon: Clock, title: "Offline Schedule Cache", desc: "Stores schedules offline", color: "purple" },
            { icon: Globe, title: "Multilingual Schedule Narrator", desc: "Narrates in 7 languages", color: "green" },
            { icon: Lightbulb, title: "AI-Powered Schedule Recommender", desc: "Suggests tasks with DeepSeek", color: "orange" }
          ].map((feature, index) => (
            <Card key={index} className={`border-l-4 border-${feature.color}-500`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className={`w-5 h-5 text-${feature.color}-600`} />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{feature.desc}</p>
                <Button className="w-full">Access Feature</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ECZStudyPlannerPage;
