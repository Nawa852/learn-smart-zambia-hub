
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flask, Eye, Calendar, Globe, Lightbulb } from 'lucide-react';

const ECZVirtualLabSimulatorPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Flask className="w-10 h-10 text-red-600" />
        ECZ Virtual Lab Simulator
      </h1>
      <p className="text-lg text-gray-600 mb-8">Simulates ECZ science labs with AI-powered experiments</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Flask, title: "AI-Powered Lab Simulator", desc: "Simulates ECZ experiments with Grok", color: "red" },
          { icon: Eye, title: "Dynamic Lab Visualizer", desc: "Displays simulations with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Lab Cache", desc: "Stores simulations offline", color: "purple" },
          { icon: Globe, title: "Multilingual Lab Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Lab Recommender", desc: "Suggests experiments with DeepSeek", color: "orange" }
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

export default ECZVirtualLabSimulatorPage;
