import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Video, Users, Calendar, Clock, Mic, MicOff, VideoOff, Hand, MessageSquare, Share2 } from 'lucide-react';

const VirtualClassroomPage = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', topic: 'Trigonometry', teacher: 'Mr. Banda', time: '10:00 AM', date: 'Today', participants: 25 },
    { id: 2, subject: 'Physics', topic: 'Electricity', teacher: 'Mrs. Mwale', time: '2:00 PM', date: 'Today', participants: 18 },
    { id: 3, subject: 'Chemistry', topic: 'Organic Chemistry', teacher: 'Dr. Phiri', time: '9:00 AM', date: 'Tomorrow', participants: 22 },
  ];

  const participants = [
    { name: 'John M.', avatar: '', speaking: true },
    { name: 'Sarah K.', avatar: '', speaking: false },
    { name: 'David L.', avatar: '', speaking: false },
    { name: 'Grace N.', avatar: '', speaking: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Video className="h-8 w-8 text-primary" />
            Virtual Classroom
          </h1>
          <p className="text-muted-foreground">Join live classes and interact with teachers</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-6">
              <div className="aspect-video bg-black/90 rounded-lg flex items-center justify-center relative">
                <div className="text-center text-white">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No active class</p>
                  <p className="text-sm opacity-70">Join an upcoming class below</p>
                </div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <Button 
                    variant={isMuted ? "destructive" : "secondary"} 
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant={isVideoOff ? "destructive" : "secondary"} 
                    size="icon"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Hand className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map(cls => (
                <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{cls.subject}: {cls.topic}</h3>
                      <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" /> {cls.date}
                      <Clock className="h-4 w-4 ml-2" /> {cls.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Users className="h-4 w-4" /> {cls.participants} students
                    </div>
                  </div>
                  <Button>Join</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {participants.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={p.avatar} />
                      <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1">{p.name}</span>
                    {p.speaking && <Badge variant="default" className="text-xs">Speaking</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Class Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground flex items-center justify-center">
                Chat will appear here during class
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroomPage;
