
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Calendar, Globe, MessageSquare } from 'lucide-react';

const ECZAssignmentHubPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <FileText className="w-10 h-10 text-slate-600" />
            ECZ Assignment Hub
          </h1>
          <p className="text-lg text-gray-600">Manages ECZ assignments with AI support and automated feedback</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-slate-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-slate-600" />AI-Powered Assignment Generator</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Creates ECZ assignments with Grok</p><Button className="w-full">Generate Assignment</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-blue-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" />Dynamic Submission Tracker</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Monitors submissions with GPT-4o</p><Button className="w-full">Track Progress</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-purple-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-600" />Offline Assignment Cache</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Stores assignments offline</p><Button className="w-full">Sync Assignments</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-green-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-green-600" />Multilingual Assignment Narrator</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Narrates in 7 languages</p><Button className="w-full">Select Language</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-orange-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-orange-600" />AI-Powered Feedback Generator</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Provides assignment feedback with Claude 3</p><Button className="w-full">Get Feedback</Button></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ECZAssignmentHubPage;
