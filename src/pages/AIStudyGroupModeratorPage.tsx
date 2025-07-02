
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Calendar, Globe, Lightbulb } from 'lucide-react';

const AIStudyGroupModeratorPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Shield className="w-10 h-10 text-red-600" />
        AI Study Group Moderator
      </h1>
      <p className="text-lg text-gray-600 mb-8">Moderates ECZ study groups with AI-powered oversight</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "AI-Powered Group Moderator", desc: "Moderates ECZ discussions with GPT-4o", color: "red" },
          { icon: Users, title: "Dynamic Group Chat", desc: "Facilitates discussions with Claude 3", color: "blue" },
          { icon: Calendar, title: "Offline Group Cache", desc: "Stores chats offline", color: "purple" },
          { icon: Globe, title: "Multilingual Group Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Group Recommender", desc: "Suggests topics with DeepSeek", color: "orange" }
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

export default AIStudyGroupModeratorPage;
