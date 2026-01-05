import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrightSphereLogo from '@/assets/brightsphere-logo.svg';
import {
  Palette, Video, MessageSquare, Users, DollarSign, Star, Play,
  Heart, Share2, Bookmark, Clock, Award, TrendingUp, Brush, Camera, Music
} from 'lucide-react';

const SkillshareFeatures = () => {
  const [activeTab, setActiveTab] = useState('classes');

  const trendingClasses = [
    { id: 1, title: 'Digital Illustration Masterclass', instructor: 'Sarah Chen', students: 45200, rating: 4.9, duration: '2h 15m', category: 'Illustration' },
    { id: 2, title: 'Brand Identity Design', instructor: 'Marcus Webb', students: 32100, rating: 4.8, duration: '1h 45m', category: 'Branding' },
    { id: 3, title: 'Photography Fundamentals', instructor: 'Lisa Park', students: 28500, rating: 4.7, duration: '3h 20m', category: 'Photography' },
    { id: 4, title: 'Music Production Basics', instructor: 'DJ Alex', students: 21300, rating: 4.9, duration: '4h 10m', category: 'Music' },
  ];

  const myProjects = [
    { id: 1, title: 'Logo Design Project', class: 'Brand Identity Design', status: 'in-progress', feedback: 12 },
    { id: 2, title: 'Portrait Series', class: 'Photography Fundamentals', status: 'completed', feedback: 28 },
    { id: 3, title: 'Album Cover Art', class: 'Digital Illustration', status: 'draft', feedback: 0 },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Illustration': return Brush;
      case 'Photography': return Camera;
      case 'Music': return Music;
      default: return Palette;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Skillshare-Style Creative Hub</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-4 h-4" />
              <span>Powered by BrightSphere AI</span>
            </div>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
          <Play className="w-4 h-4 mr-2" />
          Start Creating
        </Button>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-6 mt-6">
          {/* Trending Classes */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Trending Creative Classes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingClasses.map((cls) => {
                const CategoryIcon = getCategoryIcon(cls.category);
                return (
                  <Card key={cls.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <CategoryIcon className="w-12 h-12 text-green-500" />
                      </div>
                      <Badge variant="secondary" className="mb-2">{cls.category}</Badge>
                      <h3 className="font-semibold mb-1">{cls.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by {cls.instructor}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{cls.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{(cls.students / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{cls.duration}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Heart className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                          <Play className="w-4 h-4 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bite-sized Learning */}
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Video className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Bite-Sized Creative Lessons</h3>
                  <p className="text-sm text-muted-foreground">Learn in 20-60 minute focused sessions with hands-on projects</p>
                </div>
                <Button variant="outline" className="border-green-500 text-green-600">
                  Browse All Classes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Creative Projects</h2>
            <Button className="bg-green-500 hover:bg-green-600">
              Start New Project
            </Button>
          </div>
          <div className="grid gap-4">
            {myProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center">
                    <Brush className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">From: {project.class}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={project.status === 'completed' ? 'default' : project.status === 'in-progress' ? 'secondary' : 'outline'}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {project.feedback} feedback
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Creative Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Connect with fellow creatives, share your work, and get feedback from the community.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-green-500">12M+</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-green-500">35K+</div>
                  <div className="text-sm text-muted-foreground">Classes</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-green-500">500K+</div>
                  <div className="text-sm text-muted-foreground">Projects Shared</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Course Monetization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Earn royalties and referral bonuses by creating and sharing your creative expertise.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">This Month's Royalties</div>
                  <div className="text-2xl font-bold text-green-500">K 2,450</div>
                  <Progress value={65} className="mt-2" />
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">Referral Earnings</div>
                  <div className="text-2xl font-bold text-green-500">K 890</div>
                  <Progress value={35} className="mt-2" />
                </div>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <Award className="w-4 h-4 mr-2" />
                Become an Instructor
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillshareFeatures;
