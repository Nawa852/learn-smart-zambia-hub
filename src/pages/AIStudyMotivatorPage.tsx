
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Calendar, Globe, Lightbulb } from 'lucide-react';

const AIStudyMotivatorPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Zap className="w-10 h-10 text-yellow-600" />
        AI Study Motivator
      </h1>
      <p className="text-lg text-gray-600 mb-8">Boosts ECZ study motivation with AI-powered content</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: "AI-Powered Motivation Generator", desc: "Creates ECZ motivational content with Grok", color: "yellow" },
          { icon: Clock, title: "Dynamic Motivation Scheduler", desc: "Schedules motivational messages with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Motivation Cache", desc: "Stores messages offline", color: "purple" },
          { icon: Globe, title: "Multilingual Motivation Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Motivation Recommender", desc: "Suggests content with DeepSeek", color: "orange" }
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

export default AIStudyMotivatorPage;
