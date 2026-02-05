import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Heart, Search, Star, MessageSquare, Calendar, Users, BookOpen, Award, Video } from 'lucide-react';

const MentorshipPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mentors = [
    { id: 1, name: 'Dr. Sarah Banda', subject: 'Mathematics', rating: 4.9, reviews: 156, experience: '15 years', available: true, avatar: '', bio: 'Former ECZ examiner with expertise in advanced mathematics' },
    { id: 2, name: 'Mr. James Phiri', subject: 'Physics', rating: 4.8, reviews: 134, experience: '12 years', available: true, avatar: '', bio: 'Physics specialist with focus on practical applications' },
    { id: 3, name: 'Mrs. Grace Mwale', subject: 'Chemistry', rating: 4.7, reviews: 98, experience: '10 years', available: false, avatar: '', bio: 'Organic chemistry expert and research scientist' },
    { id: 4, name: 'Dr. David Tembo', subject: 'Biology', rating: 4.9, reviews: 187, experience: '18 years', available: true, avatar: '', bio: 'Medical doctor and biology educator' },
    { id: 5, name: 'Ms. Linda Zulu', subject: 'English', rating: 4.6, reviews: 112, experience: '8 years', available: true, avatar: '', bio: 'Literature specialist and creative writing coach' },
  ];

  const upcomingSessions = [
    { mentor: 'Dr. Sarah Banda', subject: 'Mathematics', topic: 'Calculus Review', date: 'Tomorrow', time: '3:00 PM' },
    { mentor: 'Mr. James Phiri', subject: 'Physics', topic: 'Electricity & Magnetism', date: 'Jan 25', time: '4:30 PM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            Mentorship Hub
          </h1>
          <p className="text-muted-foreground">Connect with expert mentors for personalized guidance</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">50+</p>
            <p className="text-sm text-muted-foreground">Expert Mentors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Subjects Covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Video className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">5,000+</p>
            <p className="text-sm text-muted-foreground">Sessions Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors by name or subject..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Available Mentors</h2>
          {mentors.map(mentor => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{mentor.name}</h3>
                        <Badge variant="secondary" className="mt-1">{mentor.subject}</Badge>
                      </div>
                      <Badge variant={mentor.available ? 'default' : 'outline'}>
                        {mentor.available ? 'Available' : 'Busy'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{mentor.bio}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" /> {mentor.rating}
                      </span>
                      <span className="text-muted-foreground">{mentor.reviews} reviews</span>
                      <span className="text-muted-foreground">{mentor.experience} experience</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" disabled={!mentor.available}>
                        <Calendar className="h-4 w-4 mr-1" /> Book Session
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <p className="font-medium">{session.topic}</p>
                      <p className="text-sm text-muted-foreground">{session.mentor}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date} at {session.time}</span>
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        <Video className="h-4 w-4 mr-1" /> Join
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No upcoming sessions</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="pt-6 text-center">
              <Award className="h-10 w-10 text-primary mx-auto mb-2" />
              <h3 className="font-bold">Become a Mentor</h3>
              <p className="text-sm text-muted-foreground mb-4">Share your knowledge and help others succeed</p>
              <Button variant="outline" className="w-full">Apply Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;
