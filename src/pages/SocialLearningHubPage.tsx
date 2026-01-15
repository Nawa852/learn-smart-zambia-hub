import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MessageCircle, Video, Lightbulb, BookOpen, 
  ThumbsUp, Share2, MoreHorizontal, Send, Mic, Camera,
  Plus, Search, Filter, TrendingUp, Award, Star,
  Clock, CheckCircle2, Brain, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SocialLearningHubPage = () => {
  const [message, setMessage] = useState('');

  const cohorts = [
    {
      id: 1,
      name: 'Grade 12 Mathematics',
      members: 45,
      active: 12,
      unread: 5,
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Science Study Group',
      members: 32,
      active: 8,
      unread: 2,
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'ECZ Exam Prep 2024',
      members: 156,
      active: 34,
      unread: 12,
      avatar: '/placeholder.svg'
    },
  ];

  const discussions = [
    {
      id: 1,
      author: 'Sarah M.',
      avatar: 'SM',
      content: 'Can someone explain the difference between velocity and acceleration? I keep getting confused in physics problems.',
      time: '15 min ago',
      likes: 12,
      replies: 8,
      subject: 'Physics'
    },
    {
      id: 2,
      author: 'James K.',
      avatar: 'JK',
      content: 'Just finished the quadratic equations practice test! Here are some tips that helped me...',
      time: '1 hour ago',
      likes: 34,
      replies: 15,
      subject: 'Mathematics'
    },
    {
      id: 3,
      author: 'Mary N.',
      avatar: 'MN',
      content: 'Anyone want to form a study group for the upcoming chemistry exam? We could meet virtually!',
      time: '2 hours ago',
      likes: 23,
      replies: 18,
      subject: 'Chemistry'
    },
  ];

  const brainstormRooms = [
    {
      id: 1,
      title: 'Solving Complex Equations',
      host: 'Prof. Banda',
      participants: 8,
      maxParticipants: 15,
      status: 'live',
      subject: 'Mathematics'
    },
    {
      id: 2,
      title: 'Essay Writing Workshop',
      host: 'Ms. Tembo',
      participants: 12,
      maxParticipants: 20,
      status: 'live',
      subject: 'English'
    },
    {
      id: 3,
      title: 'Physics Problem Solving',
      host: 'Dr. Mwanza',
      participants: 5,
      maxParticipants: 10,
      status: 'starting',
      subject: 'Physics'
    },
  ];

  const peerAssessments = [
    {
      id: 1,
      title: 'Essay: Climate Change Impact',
      author: 'Anonymous Student',
      dueDate: 'Tomorrow',
      status: 'pending',
      xp: 100
    },
    {
      id: 2,
      title: 'Math Problem Set Solution',
      author: 'Anonymous Student',
      dueDate: 'In 2 days',
      status: 'pending',
      xp: 75
    },
    {
      id: 3,
      title: 'Science Lab Report',
      author: 'Anonymous Student',
      dueDate: 'Completed',
      status: 'completed',
      xp: 100
    },
  ];

  const topContributors = [
    { name: 'David M.', avatar: 'DM', xp: 2450, badge: 'Gold Helper' },
    { name: 'Grace K.', avatar: 'GK', xp: 2120, badge: 'Silver Helper' },
    { name: 'Peter N.', avatar: 'PN', xp: 1890, badge: 'Bronze Helper' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Social Learning Hub
            </h1>
            <p className="text-muted-foreground mt-1">Connect, collaborate, and learn together</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Video className="w-4 h-4 mr-2" /> Start Room
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Create Group
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Cohorts */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                My Cohorts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={cohort.avatar} />
                      <AvatarFallback>{cohort.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{cohort.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {cohort.active} online • {cohort.members} members
                      </p>
                    </div>
                    {cohort.unread > 0 && (
                      <Badge variant="destructive" className="rounded-full">
                        {cohort.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Top Contributors */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  Top Contributors
                </h4>
                <div className="space-y-2">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm font-bold text-muted-foreground w-4">
                        {index + 1}
                      </span>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{contributor.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">{contributor.xp} XP</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {contributor.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="brainstorm">Brainstorm Rooms</TabsTrigger>
              <TabsTrigger value="peer">Peer Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions">
              {/* New Post Input */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input 
                        placeholder="Ask a question or share something with your cohort..."
                        className="mb-3"
                      />
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Camera className="w-4 h-4 mr-1" /> Photo
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mic className="w-4 h-4 mr-1" /> Voice
                          </Button>
                        </div>
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-1" /> Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Discussions Feed */}
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarFallback>{discussion.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{discussion.author}</span>
                              <Badge variant="secondary" className="text-xs">{discussion.subject}</Badge>
                              <span className="text-xs text-muted-foreground">{discussion.time}</span>
                            </div>
                            <p className="text-muted-foreground mb-3">{discussion.content}</p>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ThumbsUp className="w-4 h-4" /> {discussion.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <MessageCircle className="w-4 h-4" /> {discussion.replies}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="ml-auto">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="brainstorm">
              <div className="space-y-4">
                {brainstormRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`hover:shadow-lg transition-all ${room.status === 'live' ? 'border-green-500/50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              room.status === 'live' ? 'bg-green-500/20' : 'bg-primary/20'
                            }`}>
                              <Lightbulb className={`w-6 h-6 ${room.status === 'live' ? 'text-green-500' : 'text-primary'}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{room.title}</h3>
                                {room.status === 'live' && (
                                  <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Hosted by {room.host} • {room.subject}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {room.participants}/{room.maxParticipants} participants
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button variant={room.status === 'live' ? 'default' : 'outline'}>
                            {room.status === 'live' ? 'Join Now' : 'Set Reminder'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="peer">
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Peer Assessment</h3>
                      <p className="text-sm text-muted-foreground">
                        Review classmates' work and earn XP while helping others improve
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {peerAssessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={assessment.status === 'completed' ? 'opacity-60' : ''}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              assessment.status === 'completed' ? 'bg-green-500/20' : 'bg-primary/20'
                            }`}>
                              {assessment.status === 'completed' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <BookOpen className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{assessment.title}</h3>
                              <p className="text-sm text-muted-foreground">By {assessment.author}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{assessment.dueDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-2">
                              <Zap className="w-3 h-3 mr-1" /> {assessment.xp} XP
                            </Badge>
                            <br />
                            <Button 
                              size="sm" 
                              variant={assessment.status === 'completed' ? 'outline' : 'default'}
                              disabled={assessment.status === 'completed'}
                            >
                              {assessment.status === 'completed' ? 'Completed' : 'Review Now'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { topic: 'Quadratic Equations', posts: 156 },
                  { topic: 'Essay Writing Tips', posts: 134 },
                  { topic: 'ECZ Exam Prep', posts: 98 },
                  { topic: 'Science Projects', posts: 87 },
                  { topic: 'Study Techniques', posts: 76 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <span className="font-medium">#{item.topic}</span>
                    <span className="text-xs text-muted-foreground">{item.posts} posts</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Study Buddies Online</h4>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i} className="border-2 border-background w-8 h-8">
                      <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    +23
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialLearningHubPage;
