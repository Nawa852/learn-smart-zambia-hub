import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, Mic, MicOff, Camera, CameraOff, MessageSquare, 
  Users, Languages, Captions, Share, Clock
} from 'lucide-react';

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  subject: string;
  participants: number;
  maxParticipants: number;
  duration: string;
  startTime: Date;
  language: string;
  hasTranslation: boolean;
  hasCaptions: boolean;
  status: 'upcoming' | 'live' | 'ended';
}

const LiveLearning = () => {
  const [sessions, setSessions] = useState<LiveSession[]>([
    {
      id: '1',
      title: 'Advanced Mathematics: Calculus Integration',
      instructor: 'Dr. Sarah Johnson',
      instructorAvatar: '/instructor1.jpg',
      subject: 'Mathematics',
      participants: 45,
      maxParticipants: 50,
      duration: '60 min',
      startTime: new Date(Date.now() + 30 * 60 * 1000),
      language: 'English',
      hasTranslation: true,
      hasCaptions: true,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Physics: Quantum Mechanics Basics',
      instructor: 'Prof. Michael Chen',
      instructorAvatar: '/instructor2.jpg',
      subject: 'Physics',
      participants: 32,
      maxParticipants: 40,
      duration: '90 min',
      startTime: new Date(),
      language: 'English',
      hasTranslation: true,
      hasCaptions: true,
      status: 'live'
    }
  ]);

  const [currentSession, setCurrentSession] = useState<LiveSession | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const joinSession = (session: LiveSession) => {
    setCurrentSession(session);
  };

  const leaveSession = () => {
    setCurrentSession(null);
    setIsVideoOn(false);
    setIsAudioOn(false);
  };

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (currentSession) {
    return (
      <div className="h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">{currentSession.title}</h2>
            <Badge className="bg-red-600">LIVE</Badge>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users className="w-4 h-4" />
              {currentSession.participants} participants
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Languages className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Captions className="w-4 h-4" />
            </Button>
            <Button variant="destructive" onClick={leaveSession}>
              Leave Session
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-full">
          {/* Video Area */}
          <div className="flex-1 relative bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Video feed would appear here</p>
              </div>
            </div>
            
            {/* Instructor Video */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <Avatar className="w-16 h-16">
                  <AvatarFallback>
                    {currentSession.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-2 left-2 text-xs">
                {currentSession.instructor}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudio}
                className={isAudioOn ? 'text-white' : 'text-red-500'}
              >
                {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVideo}
                className={isVideoOn ? 'text-white' : 'text-red-500'}
              >
                {isVideoOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="w-80 bg-gray-800 border-l border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold">Live Chat</h3>
              </div>
              <div className="flex-1 p-4 space-y-3 max-h-96 overflow-y-auto">
                <div className="text-sm">
                  <span className="font-semibold text-blue-400">Student1:</span>
                  <span className="ml-2">Great explanation of integration!</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-green-400">Student2:</span>
                  <span className="ml-2">Can you explain the chain rule again?</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-purple-400">AI Moderator:</span>
                  <span className="ml-2">📝 Summary: We've covered basic integration techniques and are moving to advanced methods.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-6 h-6" />
            Live Learning Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {sessions.map((session) => (
              <Card key={session.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{session.title}</h3>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback>
                              {session.instructor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{session.instructor}</span>
                        </div>
                        <Badge variant="outline">{session.subject}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {session.participants}/{session.maxParticipants}
                        </span>
                        <span>{session.startTime.toLocaleTimeString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {session.hasTranslation && (
                          <Badge variant="outline" className="text-xs">
                            <Languages className="w-3 h-3 mr-1" />
                            Multi-language
                          </Badge>
                        )}
                        {session.hasCaptions && (
                          <Badge variant="outline" className="text-xs">
                            <Captions className="w-3 h-3 mr-1" />
                            Captions
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {session.status === 'live' && (
                        <Button onClick={() => joinSession(session)} className="bg-red-600 hover:bg-red-700">
                          Join Live
                        </Button>
                      )}
                      {session.status === 'upcoming' && (
                        <Button variant="outline" onClick={() => joinSession(session)}>
                          Set Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveLearning;
