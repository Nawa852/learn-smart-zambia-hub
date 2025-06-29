
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Users, 
  MessageSquare, 
  Hand, 
  Settings,
  Globe,
  Eye,
  Volume2,
  Phone,
  PhoneOff,
  Share,
  Download,
  Clock,
  UserCheck
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isHandRaised: boolean;
}

interface ClassSession {
  id: string;
  title: string;
  subject: string;
  grade: string;
  teacher: string;
  startTime: Date;
  duration: number;
  participants: Participant[];
  isRecording: boolean;
}

const VirtualClassroom = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'main' | 'whiteboard' | 'screen'>('main');

  const currentSession: ClassSession = {
    id: '1',
    title: 'Advanced Mathematics - Quadratic Equations',
    subject: 'Mathematics',
    grade: '12',
    teacher: 'Mrs. Sarah Mwansa',
    startTime: new Date(),
    duration: 60,
    participants: [
      {
        id: '1',
        name: 'Mrs. Sarah Mwansa',
        role: 'teacher',
        isVideoOn: true,
        isAudioOn: true,
        isHandRaised: false
      },
      {
        id: '2',
        name: 'John Banda',
        role: 'student',
        isVideoOn: true,
        isAudioOn: false,
        isHandRaised: true
      },
      {
        id: '3',
        name: 'Mary Phiri',
        role: 'student',
        isVideoOn: false,
        isAudioOn: true,
        isHandRaised: false
      },
      {
        id: '4',
        name: 'David Tembo',
        role: 'student',
        isVideoOn: true,
        isAudioOn: true,
        isHandRaised: false
      }
    ],
    isRecording: true
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: Date.now(),
        sender: 'You',
        message: chatMessage,
        timestamp: new Date()
      }]);
      setChatMessage('');
    }
  };

  const ParticipantVideo = ({ participant }: { participant: Participant }) => (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      {participant.isVideoOn ? (
        <img
          src={participant.avatar || '/api/placeholder/300/200'}
          alt={participant.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Avatar className="w-16 h-16">
            <AvatarImage src={participant.avatar} />
            <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      {/* Participant Info Overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Badge variant={participant.role === 'teacher' ? 'default' : 'secondary'} className="text-xs">
            {participant.name}
          </Badge>
          {participant.role === 'teacher' && (
            <Badge variant="outline" className="text-xs">Teacher</Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {!participant.isAudioOn && <MicOff className="w-3 h-3 text-red-500" />}
          {participant.isHandRaised && <Hand className="w-3 h-3 text-yellow-500" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{currentSession.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline">{currentSession.subject} - Grade {currentSession.grade}</Badge>
            <Badge variant="outline">Teacher: {currentSession.teacher}</Badge>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {currentSession.duration} minutes
            </div>
            {currentSession.isRecording && (
              <Badge variant="destructive">● Recording</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Video Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Teacher's Main Video */}
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Video className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{currentSession.teacher}</h3>
                    <p className="text-gray-300">Teaching: {currentSession.title}</p>
                  </div>
                </div>
                
                {/* Live Translation Overlay */}
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary" className="bg-black/50 text-white">
                    <Globe className="w-4 h-4 mr-1" />
                    Bemba
                  </Button>
                </div>

                {/* Accessibility Features */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-black/50 text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-black/50 text-white">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* View Options */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={currentView === 'main' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('main')}
                >
                  Main View
                </Button>
                <Button
                  variant={currentView === 'whiteboard' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('whiteboard')}
                >
                  Whiteboard
                </Button>
                <Button
                  variant={currentView === 'screen' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('screen')}
                >
                  Screen Share
                </Button>
              </div>

              {/* Interactive Whiteboard */}
              {currentView === 'whiteboard' && (
                <div className="aspect-video bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Monitor className="w-8 h-8" />
                    </div>
                    <p>Interactive Whiteboard</p>
                    <p className="text-sm">Draw, write, and collaborate in real-time</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Video Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Students ({currentSession.participants.filter(p => p.role === 'student').length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentSession.participants
                  .filter(p => p.role === 'student')
                  .map(participant => (
                    <ParticipantVideo key={participant.id} participant={participant} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={isVideoOn ? "default" : "destructive"}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className="flex items-center gap-2"
                >
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  Video
                </Button>
                <Button
                  variant={isAudioOn ? "default" : "destructive"}
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className="flex items-center gap-2"
                >
                  {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  Audio
                </Button>
                <Button
                  variant={isScreenSharing ? "default" : "outline"}
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className="flex items-center gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant={isHandRaised ? "default" : "outline"}
                  onClick={() => setIsHandRaised(!isHandRaised)}
                  className="flex items-center gap-2"
                >
                  <Hand className="w-4 h-4" />
                  Raise Hand
                </Button>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="destructive" className="w-full">
                  <PhoneOff className="w-4 h-4 mr-2" />
                  Leave Class
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Participants ({currentSession.participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentSession.participants.map(participant => (
                  <div key={participant.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{participant.name}</p>
                      <div className="flex items-center gap-1">
                        {participant.role === 'teacher' && (
                          <Badge variant="outline" className="text-xs">Teacher</Badge>
                        )}
                        {!participant.isVideoOn && <VideoOff className="w-3 h-3 text-gray-400" />}
                        {!participant.isAudioOn && <MicOff className="w-3 h-3 text-gray-400" />}
                        {participant.isHandRaised && <Hand className="w-3 h-3 text-yellow-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-48 overflow-y-auto border rounded p-2 space-y-2">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="text-sm">
                    <span className="font-medium">{msg.sender}:</span> {msg.message}
                  </div>
                ))}
                {chatMessages.length === 0 && (
                  <p className="text-gray-500 text-sm text-center">No messages yet</p>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroom;
