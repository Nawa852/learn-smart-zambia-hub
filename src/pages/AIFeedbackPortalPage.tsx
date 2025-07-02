
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, BarChart3, Calendar, Globe, Lightbulb } from 'lucide-react';

const AIFeedbackPortalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <MessageSquare className="w-10 h-10 text-sky-600" />
            AI Feedback Portal
          </h1>
          <p className="text-lg text-gray-600">Collects and analyzes ECZ feedback with AI-powered insights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: MessageSquare, title: "AI-Powered Feedback Analyzer", desc: "Analyzes ECZ feedback with Moonshot AI", color: "sky" },
            { icon: BarChart3, title: "Dynamic Feedback Visualizer", desc: "Displays trends with Gemini", color: "blue" },
            { icon: Calendar, title: "Offline Feedback Cache", desc: "Stores feedback offline", color: "purple" },
            { icon: Globe, title: "Multilingual Feedback Narrator", desc: "Narrates in 7 languages", color: "green" },
            { icon: Lightbulb, title: "AI-Powered Feedback Recommender", desc: "Suggests improvements with DeepSeek", color: "orange" }
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

export default AIFeedbackPortalPage;
