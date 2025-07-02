
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Search, Calendar, Globe, Lightbulb } from 'lucide-react';

const AIStudyGroupFinderPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Users className="w-10 h-10 text-orange-600" />
        AI Study Group Finder
      </h1>
      <p className="text-lg text-gray-600 mb-8">Connects students to ECZ study groups with AI matching</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Users, title: "AI-Powered Group Matcher", desc: "Matches students by ECZ subjects with LLaMA 4", color: "orange" },
          { icon: Search, title: "Dynamic Group Browser", desc: "Displays groups with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Group Cache", desc: "Stores groups offline", color: "purple" },
          { icon: Globe, title: "Multilingual Group Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Group Recommender", desc: "Suggests groups with DeepSeek", color: "yellow" }
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

export default AIStudyGroupFinderPage;
