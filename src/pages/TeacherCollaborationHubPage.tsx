
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Calendar, Globe, Share } from 'lucide-react';

const TeacherCollaborationHubPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Users className="w-10 h-10 text-blue-600" />
        Teacher Collaboration Hub
      </h1>
      <p className="text-lg text-gray-600 mb-8">Facilitates ECZ teacher collaboration with AI-powered matching</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Users, title: "AI-Powered Collaboration Matcher", desc: "Matches teachers by ECZ subjects with GPT-4o", color: "blue" },
          { icon: MessageSquare, title: "Dynamic Collaboration Chat", desc: "Facilitates discussions with Claude 3", color: "green" },
          { icon: Calendar, title: "Offline Collaboration Cache", desc: "Stores chats offline", color: "purple" },
          { icon: Globe, title: "Multilingual Collaboration Narrator", desc: "Narrates in 7 languages", color: "cyan" },
          { icon: Share, title: "AI-Powered Resource Sharer", desc: "Suggests teaching resources with DeepSeek", color: "orange" }
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

export default TeacherCollaborationHubPage;
