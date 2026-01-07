import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  MessageCircle,
  Calendar,
  Search,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  MapPin,
  Clock,
  Video,
  UserPlus,
  Bell,
  Send,
  Image,
  Smile
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Feed Tab Component
const FeedTab = () => {
  const posts = [
    {
      id: 1,
      author: { name: 'Chanda Mwape', avatar: '', role: 'Grade 12 Student' },
      content: 'Just finished my biology revision! The photosynthesis chapter was really interesting. Who else is preparing for the ECZ exams?',
      likes: 24,
      comments: 8,
      time: '2 hours ago'
    },
    {
      id: 2,
      author: { name: 'Mutale Banda', avatar: '', role: 'Teacher' },
      content: 'Great news! I\'ve uploaded new study materials for Mathematics Grade 9. Check the resources section!',
      likes: 45,
      comments: 12,
      time: '5 hours ago'
    },
    {
      id: 3,
      author: { name: 'Bwalya Tembo', avatar: '', role: 'Grade 11 Student' },
      content: 'Can someone help me understand the difference between ionic and covalent bonds? Chemistry is tough! 😅',
      likes: 15,
      comments: 23,
      time: '8 hours ago'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Create Post */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">Y</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input 
                placeholder="What's on your mind?" 
                className="mb-3"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm"><Image className="w-4 h-4 mr-1" /> Photo</Button>
                  <Button variant="ghost" size="sm"><Video className="w-4 h-4 mr-1" /> Video</Button>
                  <Button variant="ghost" size="sm"><Smile className="w-4 h-4 mr-1" /> Emoji</Button>
                </div>
                <Button size="sm">Post</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map(post => (
        <Card key={post.id}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar>
                <AvatarFallback className="bg-primary/20 text-primary">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.role} • {post.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-sm mb-4">{post.content}</p>
            <div className="flex items-center gap-4 pt-3 border-t">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Heart className="w-4 h-4 mr-1" /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <MessageSquare className="w-4 h-4 mr-1" /> {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Share2 className="w-4 h-4 mr-1" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Study Groups Tab
const GroupsTab = () => {
  const groups = [
    { id: 1, name: 'ECZ Biology 2024', members: 156, category: 'Biology', active: true },
    { id: 2, name: 'Mathematics Grade 12', members: 234, category: 'Math', active: true },
    { id: 3, name: 'Chemistry Study Circle', members: 89, category: 'Chemistry', active: false },
    { id: 4, name: 'English Literature Club', members: 67, category: 'English', active: true },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search groups..." className="pl-9" />
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> Create Group</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map(group => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.members} members</p>
                  </div>
                </div>
                {group.active && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" size="sm">Join Group</Button>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Events Tab
const EventsTab = () => {
  const events = [
    { id: 1, title: 'ECZ Exam Prep Workshop', date: 'Jan 15, 2026', time: '14:00', location: 'Virtual', type: 'Workshop' },
    { id: 2, title: 'Mathematics Study Session', date: 'Jan 16, 2026', time: '10:00', location: 'Lusaka', type: 'Study Group' },
    { id: 3, title: 'Science Fair 2026', date: 'Jan 20, 2026', time: '09:00', location: 'Kitwe', type: 'Competition' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Upcoming Events</h3>
        <Button><Plus className="w-4 h-4 mr-2" /> Create Event</Button>
      </div>

      <div className="space-y-3">
        {events.map(event => (
          <Card key={event.id}>
            <CardContent className="pt-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs font-medium">{event.date.split(',')[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm">RSVP</Button>
                    <Button variant="outline" size="sm"><Bell className="w-3 h-3 mr-1" /> Remind Me</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Messages Tab
const MessagesTab = () => {
  const conversations = [
    { id: 1, name: 'Chanda Mwape', lastMessage: 'Thanks for the study notes!', time: '2m ago', unread: 2 },
    { id: 2, name: 'Biology Study Group', lastMessage: 'Meeting at 3pm tomorrow', time: '1h ago', unread: 0 },
    { id: 3, name: 'Mr. Banda (Teacher)', lastMessage: 'Your assignment looks good', time: '3h ago', unread: 1 },
  ];

  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Messages</CardTitle>
            <Button variant="ghost" size="icon"><Plus className="w-4 h-4" /></Button>
          </div>
          <Input placeholder="Search messages..." className="mt-2" />
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(60vh-120px)]">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors border-b",
                  selectedChat === conv.id && "bg-muted"
                )}
              >
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {conv.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm truncate">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {conv.unread}
                  </Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="md:col-span-2">
        {selectedChat ? (
          <div className="flex flex-col h-full">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">C</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Chanda Mwape</CardTitle>
                  <CardDescription className="text-xs">Online</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 flex flex-col justify-end">
              <div className="text-center text-muted-foreground text-sm py-8">
                Select a conversation to start chatting
              </div>
              <div className="flex gap-2 mt-auto">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon"><Send className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

// Mentors Tab
const MentorsTab = () => {
  const mentors = [
    { id: 1, name: 'Dr. Mulenga Chilufya', subject: 'Physics & Mathematics', rating: 4.9, students: 120 },
    { id: 2, name: 'Mrs. Grace Tembo', subject: 'Biology & Chemistry', rating: 4.8, students: 85 },
    { id: 3, name: 'Mr. John Phiri', subject: 'English & Literature', rating: 4.7, students: 95 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Find a mentor..." className="pl-9" />
        </div>
        <Button variant="outline"><UserPlus className="w-4 h-4 mr-2" /> Become a Mentor</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {mentors.map(mentor => (
          <Card key={mentor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{mentor.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{mentor.subject}</p>
              <div className="flex justify-center gap-4 text-sm mb-4">
                <span>⭐ {mentor.rating}</span>
                <span>{mentor.students} students</span>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" size="sm">Connect</Button>
                <Button variant="outline" size="sm">Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CommunityHub = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect, collaborate, and learn together with fellow students and mentors
          </p>
        </div>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Mentors</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed"><FeedTab /></TabsContent>
          <TabsContent value="groups"><GroupsTab /></TabsContent>
          <TabsContent value="events"><EventsTab /></TabsContent>
          <TabsContent value="messages"><MessagesTab /></TabsContent>
          <TabsContent value="mentors"><MentorsTab /></TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CommunityHub;
