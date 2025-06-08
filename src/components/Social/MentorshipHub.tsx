
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, Briefcase, Star, MessageCircle, Calendar,
  Award, Clock, Globe, Brain, BookOpen, Users, TrendingUp
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  availability: string;
  hourlyRate?: number;
  bio: string;
  achievements: string[];
}

const MentorshipHub = () => {
  const [activeTab, setActiveTab] = useState('find-mentors');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Emily Rodriguez',
      title: 'Senior AI Researcher',
      company: 'Google DeepMind',
      expertise: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
      experience: 8,
      rating: 4.9,
      reviewCount: 47,
      availability: 'Weekends',
      hourlyRate: 120,
      bio: 'PhD in Computer Science from Stanford. Leading research in AI safety and computer vision applications.',
      achievements: ['Published 30+ papers', 'Speaker at NeurIPS', 'AI Ethics Board Member']
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Product Manager',
      company: 'Meta',
      expertise: ['Product Strategy', 'Data Analysis', 'User Experience'],
      experience: 6,
      rating: 4.8,
      reviewCount: 32,
      availability: 'Evenings',
      bio: 'Former consultant turned PM. Passionate about helping students break into tech.',
      achievements: ['Launched 5+ products', 'MBA from Wharton', '500+ mentees']
    },
    {
      id: '3',
      name: 'Sarah Kim',
      title: 'Full Stack Developer',
      company: 'Startup Founder',
      expertise: ['Web Development', 'Entrepreneurship', 'React'],
      experience: 5,
      rating: 4.7,
      reviewCount: 28,
      availability: 'Flexible',
      bio: 'Self-taught developer who built and sold two startups. Now helping others learn to code.',
      achievements: ['2x Startup Founder', 'Open Source Contributor', 'Tech Speaker']
    }
  ];

  const myMentees = [
    { name: 'Alex Thompson', goal: 'Break into Data Science', progress: 75 },
    { name: 'Maria Garcia', goal: 'Learn React Development', progress: 60 },
    { name: 'James Wilson', goal: 'Career Change to Tech', progress: 40 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
            Mentorship Hub
          </h1>
          <p className="text-gray-600">Connect with industry experts and guide the next generation</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="my-mentors">My Mentors</TabsTrigger>
          <TabsTrigger value="my-mentees">My Mentees</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback>
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-gray-600 text-sm">{mentor.title}</p>
                      <p className="text-gray-500 text-xs">{mentor.company}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                          <span className="text-xs text-gray-500">({mentor.reviewCount})</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {mentor.experience}y exp
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Achievements</h4>
                      <div className="space-y-1">
                        {mentor.achievements.slice(0, 2).map(achievement => (
                          <div key={achievement} className="flex items-center gap-2 text-xs text-gray-600">
                            <Award className="w-3 h-3" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-3 h-3" />
                          {mentor.availability}
                        </div>
                        {mentor.hourlyRate && (
                          <div className="font-medium">${mentor.hourlyRate}/hr</div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-mentors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">You haven't connected with any mentors yet. Browse available mentors to get started!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-mentees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your Mentees
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Become a Mentor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myMentees.map((mentee, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {mentee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{mentee.name}</h4>
                      <p className="text-sm text-gray-600">{mentee.goal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{mentee.progress}%</div>
                      <div className="text-xs text-gray-500">Progress</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorshipHub;
