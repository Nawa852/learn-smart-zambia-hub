
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Trophy, Calendar, Globe, Lightbulb } from 'lucide-react';

const InteractiveECZGamesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Gamepad2 className="w-10 h-10 text-indigo-600" />
            Interactive ECZ Games
          </h1>
          <p className="text-lg text-gray-600">Hosts ECZ-aligned educational games with AI-powered generation</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-indigo-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Gamepad2 className="w-5 h-5 text-indigo-600" />AI-Powered Game Generator</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Creates ECZ games with LLaMA 4</p><Button className="w-full">Generate Game</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-yellow-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-600" />Dynamic Game Leaderboard</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Ranks players with Moonshot AI</p><Button className="w-full">View Rankings</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-purple-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-600" />Offline Game Cache</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Stores games offline</p><Button className="w-full">Download Games</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-green-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-green-600" />Multilingual Game Narrator</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Narrates in 7 languages</p><Button className="w-full">Select Language</Button></CardContent>
          </Card>
          
          <Card className="border-l-4 border-orange-500">
            <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-orange-600" />AI-Powered Game Recommender</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600 mb-4">Suggests games based on learning</p><Button className="w-full">Get Recommendations</Button></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveECZGamesPage;
