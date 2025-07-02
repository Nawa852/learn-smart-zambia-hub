
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Presentation, Eye, Calendar, Globe, Lightbulb } from 'lucide-react';

const ECZProjectShowcasePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-green-50 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Presentation className="w-10 h-10 text-lime-600" />
          ECZ Project Showcase
        </h1>
        <p className="text-lg text-gray-600">Displays student ECZ projects with AI-powered curation</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Presentation, title: "AI-Powered Project Curator", desc: "Curates ECZ projects with StealthGPT", color: "lime" },
          { icon: Eye, title: "Dynamic Project Viewer", desc: "Shows project details with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Project Cache", desc: "Stores projects offline", color: "purple" },
          { icon: Globe, title: "Multilingual Project Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Project Recommender", desc: "Suggests projects with DeepSeek", color: "orange" }
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

export default ECZProjectShowcasePage;
