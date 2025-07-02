
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Video, Calendar, Globe, Lightbulb } from 'lucide-react';

const ECZVideoLibraryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Video className="w-10 h-10 text-red-600" />
            ECZ Video Library
          </h1>
          <p className="text-lg text-gray-600">
            Hosts ECZ-aligned video content with AI-powered curation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-600" />
                AI-Powered Video Curator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Curates ECZ videos with YouTube API</p>
              <Button className="w-full">Browse Videos</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" />
                Dynamic Video Playlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Organizes videos by subject</p>
              <Button className="w-full">View Playlists</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Offline Video Cache
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Stores videos offline</p>
              <Button className="w-full">Download Videos</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Multilingual Video Narrator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Narrates in 7 languages</p>
              <Button className="w-full">Select Language</Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                AI-Powered Video Recommender
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Suggests videos based on learning</p>
              <Button className="w-full">Get Recommendations</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ECZVideoLibraryPage;
