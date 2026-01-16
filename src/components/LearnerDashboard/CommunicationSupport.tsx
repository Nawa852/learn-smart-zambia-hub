import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, Users, Bell, Video, Mic, Send,
  BookOpen, Clock, ChevronRight, Megaphone, UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommunicationSupport = () => {
  const teachers = [
    { name: 'Mr. Banda', subject: 'Mathematics', avatar: '', online: true, lastMessage: 'Great progress on quadratics!' },
    { name: 'Mrs. Mwanza', subject: 'English', avatar: '', online: false, lastMessage: 'Essay feedback attached' },
    { name: 'Mr. Tembo', subject: 'Science', avatar: '', online: true, lastMessage: 'Lab report due Friday' },
  ];

  const studyGroups = [
    { name: 'Grade 9 Math Study', members: 12, active: 3, topic: 'Quadratic Equations' },
    { name: 'Science Lab Partners', members: 8, active: 2, topic: 'Photosynthesis' },
    { name: 'English Essay Club', members: 15, active: 5, topic: 'Essay Writing Tips' },
  ];

  const announcements = [
    { from: 'School Admin', message: 'Exam timetable released - check your dashboard', time: '2h ago', urgent: true },
    { from: 'Mr. Banda', message: 'Extra math class on Saturday 9 AM', time: '1d ago', urgent: false },
    { from: 'Library', message: 'New science textbooks available', time: '2d ago', urgent: false },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Teacher Messaging */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                Teacher Messages
              </span>
              <Badge variant="secondary">3 teachers</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teachers.map((teacher, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback className="bg-primary/10">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {teacher.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{teacher.name}</h4>
                    <Badge variant="outline" className="text-xs">{teacher.subject}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{teacher.lastMessage}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
            <Link to="/messenger">
              <Button variant="outline" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Open Messages
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Study Groups */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                Study Groups
              </span>
              <Button size="sm" variant="ghost" className="gap-1">
                <UserPlus className="w-4 h-4" />
                Join
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {studyGroups.map((group, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{group.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-green-500">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {group.active} active
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {group.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">{group.members} members</p>
                </div>
              </div>
            ))}
            <Link to="/study-groups">
              <Button variant="outline" className="w-full gap-2">
                <Users className="w-4 h-4" />
                Browse All Groups
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Megaphone className="w-5 h-5 text-orange-500" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {announcements.map((ann, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border ${
                ann.urgent ? 'border-red-200 bg-red-50/50' : 'border-border/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {ann.urgent && <Bell className="w-4 h-4 text-red-500 mt-0.5" />}
                  <div>
                    <p className="text-sm font-medium">{ann.from}</p>
                    <p className="text-sm text-muted-foreground">{ann.message}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{ann.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
