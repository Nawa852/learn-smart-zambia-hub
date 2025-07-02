
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Languages, Calendar, Volume2, Lightbulb } from 'lucide-react';

const ECZResourceTranslatorPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Globe className="w-10 h-10 text-cyan-600" />
        ECZ Resource Translator
      </h1>
      <p className="text-lg text-gray-600 mb-8">Translates ECZ resources into 7 Zambian languages</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Languages, title: "AI-Powered Translator", desc: "Translates ECZ content with Qwen", color: "cyan" },
          { icon: Calendar, title: "Dynamic Translation Scheduler", desc: "Schedules translations with GPT-4o", color: "blue" },
          { icon: Globe, title: "Offline Translation Cache", desc: "Stores translations offline", color: "purple" },
          { icon: Volume2, title: "Multilingual Translation Narrator", desc: "Narrates in 7 languages with Whisper", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Translation Recommender", desc: "Suggests content with DeepSeek", color: "orange" }
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

export default ECZResourceTranslatorPage;
