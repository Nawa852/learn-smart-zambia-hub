
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Clock, Calendar, Globe, Lightbulb } from 'lucide-react';

const ECZVirtualTutorPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Bot className="w-10 h-10 text-green-600" />
        ECZ Virtual Tutor
      </h1>
      <p className="text-lg text-gray-600 mb-8">Provides virtual ECZ tutoring with AI-powered personalization</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Bot, title: "AI-Powered Tutor Simulator", desc: "Delivers ECZ tutoring with Claude 3", color: "green" },
          { icon: Clock, title: "Dynamic Tutor Scheduler", desc: "Schedules sessions with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Tutor Cache", desc: "Stores responses offline", color: "purple" },
          { icon: Globe, title: "Multilingual Tutor Narrator", desc: "Narrates in 7 languages", color: "teal" },
          { icon: Lightbulb, title: "AI-Powered Tutor Recommender", desc: "Suggests topics with DeepSeek", color: "orange" }
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

export default ECZVirtualTutorPage;
