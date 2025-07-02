
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Calendar, Globe, Lightbulb } from 'lucide-react';

const ECZResourceAnnotatorPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <FileText className="w-10 h-10 text-slate-600" />
        ECZ Resource Annotator
      </h1>
      <p className="text-lg text-gray-600 mb-8">Annotates ECZ resources with AI insights and explanations</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: FileText, title: "AI-Powered Annotation Generator", desc: "Annotates ECZ resources with LLaMA 4", color: "slate" },
          { icon: Eye, title: "Dynamic Annotation Viewer", desc: "Displays annotations with GPT-4o", color: "blue" },
          { icon: Calendar, title: "Offline Annotation Cache", desc: "Stores annotations offline", color: "purple" },
          { icon: Globe, title: "Multilingual Annotation Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Lightbulb, title: "AI-Powered Annotation Recommender", desc: "Suggests annotations with DeepSeek", color: "orange" }
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

export default ECZResourceAnnotatorPage;
