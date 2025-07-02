
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Users, Calendar, Globe, Lightbulb } from 'lucide-react';

const ECZVirtualWhiteboardPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Edit className="w-10 h-10 text-gray-600" />
        ECZ Virtual Whiteboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">Collaborative ECZ study tool with AI-powered features</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Edit, title: "AI-Powered Whiteboard Generator", desc: "Creates ECZ whiteboards with Claude 3", color: "gray" },
          { icon: Users, title: "Dynamic Whiteboard Collaborator", desc: "Enables real-time collaboration with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Whiteboard Cache", desc: "Stores whiteboards offline", color: "purple" },
          { icon: Globe, title: "Multilingual Whiteboard Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Whiteboard Recommender", desc: "Suggests templates with DeepSeek", color: "orange" }
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

export default ECZVirtualWhiteboardPage;
