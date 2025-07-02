
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Calendar, Globe, Lightbulb } from 'lucide-react';

const ECZStudyResourceAnalyzerPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <BarChart3 className="w-10 h-10 text-pink-600" />
        ECZ Study Resource Analyzer
      </h1>
      <p className="text-lg text-gray-600 mb-8">Analyzes ECZ resource effectiveness with AI-powered insights</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: BarChart3, title: "AI-Powered Resource Analyzer", desc: "Evaluates ECZ resources with Grok", color: "pink" },
          { icon: FileText, title: "Dynamic Analysis Visualizer", desc: "Displays results as charts with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Analysis Cache", desc: "Stores data offline", color: "purple" },
          { icon: Globe, title: "Multilingual Analysis Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Analysis Recommender", desc: "Suggests improvements with DeepSeek", color: "orange" }
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

export default ECZStudyResourceAnalyzerPage;
