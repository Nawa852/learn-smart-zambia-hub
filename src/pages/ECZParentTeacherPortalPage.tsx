
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Calendar, Globe, Share } from 'lucide-react';

const ECZParentTeacherPortalPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Users className="w-10 h-10 text-rose-600" />
        ECZ Parent-Teacher Portal
      </h1>
      <p className="text-lg text-gray-600 mb-8">Connects parents and teachers for ECZ updates with AI support</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Users, title: "AI-Powered Communication Matcher", desc: "Matches parents to teachers with GPT-4o", color: "rose" },
          { icon: MessageSquare, title: "Dynamic Communication Notifier", desc: "Sends SMS updates with Twilio", color: "blue" },
          { icon: Calendar, title: "Offline Communication Cache", desc: "Stores messages offline", color: "purple" },
          { icon: Globe, title: "Multilingual Communication Narrator", desc: "Narrates in 7 languages", color: "green" },
          { icon: Share, title: "AI-Powered Resource Sharer", desc: "Suggests resources with DeepSeek", color: "orange" }
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

export default ECZParentTeacherPortalPage;
