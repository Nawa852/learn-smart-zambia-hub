
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Search, Calendar, Volume2, Lightbulb } from 'lucide-react';

const ECZStudyResourcePortalPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Globe className="w-10 h-10 text-indigo-600" />
        ECZ Study Resource Portal
      </h1>
      <p className="text-lg text-gray-600 mb-8">Central portal for ECZ resources with AI-powered curation and management</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Globe, title: "AI-Powered Resource Portal", desc: "Curates ECZ resources with Minimax", color: "indigo" },
          { icon: Search, title: "Dynamic Resource Browser", desc: "Displays resources with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Resource Cache", desc: "Stores resources offline", color: "purple" },
          { icon: Volume2, title: "Multilingual Resource Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Resource Recommender", desc: "Suggests resources with DeepSeek", color: "orange" }
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

export default ECZStudyResourcePortalPage;
