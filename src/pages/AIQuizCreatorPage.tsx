
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Clock, Calendar, Globe, Lightbulb } from 'lucide-react';

const AIQuizCreatorPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <HelpCircle className="w-10 h-10 text-purple-600" />
        AI Quiz Creator
      </h1>
      <p className="text-lg text-gray-600 mb-8">Generates ECZ-aligned quizzes with AI-powered question creation</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: HelpCircle, title: "AI-Powered Quiz Generator", desc: "Creates ECZ quizzes with Grok", color: "purple" },
          { icon: Clock, title: "Dynamic Quiz Scheduler", desc: "Schedules quizzes with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Quiz Cache", desc: "Stores quizzes offline", color: "indigo" },
          { icon: Globe, title: "Multilingual Quiz Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Quiz Recommender", desc: "Suggests quizzes with DeepSeek", color: "orange" }
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

export default AIQuizCreatorPage;
