import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FacebookStylePost } from '@/components/Social/FacebookStylePost';
import {
  User,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  Settings,
  Camera,
  Edit3,
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const ProfilePage = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    grade_level: profile?.grade_level || '',
    bio: '',
    location: '',
    interests: [] as string[]
  });

  const userPosts = [
    {
      id: '1',
      author: {
        name: profile?.full_name || 'Student',
        avatar: profile?.avatar_url || '/api/placeholder/40/40',
        title: profile?.grade_level ? `Grade ${profile.grade_level} Student` : 'Student',
        location: 'Zambia'
      },
      content: 'Just completed my first AI-powered study session! The personalized learning path really helped me understand complex mathematics concepts. Excited to share my progress with everyone! 🚀📚',
      subject: 'Mathematics',
      timestamp: '3 hours ago',
      likes: 24,
      comments: 12,
      shares: 6,
      isLiked: true,
      isSaved: false,
      tags: ['studying', 'mathematics', 'ai-learning']
    }
  ];

  const achievements = [
    { name: 'Study Streak', description: '30 days consecutive', icon: Target, color: 'text-orange-500' },
    { name: 'Top Performer', description: 'Mathematics', icon: Trophy, color: 'text-yellow-500' },
    { name: 'Community Helper', description: '50+ answers', icon: Users, color: 'text-blue-500' },
    { name: 'AI Explorer', description: 'Used all AI tools', icon: Star, color: 'text-purple-500' }
  ];

  const subjects = [
    { name: 'Mathematics', progress: 85, grade: 'A-' },
    { name: 'Physics', progress: 78, grade: 'B+' },
    { name: 'Chemistry', progress: 92, grade: 'A' },
    { name: 'English', progress: 88, grade: 'A-' },
    { name: 'History', progress: 76, grade: 'B+' }
  ];

  const handleSave = async () => {
    const result = await updateProfile({
      full_name: formData.full_name,
      grade_level: formData.grade_level
    });
    if (result.success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Cover Photo & Profile Header */}
        <Card className="glass-card border-0 shadow-xl mb-6 overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 gradient-hero relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/20 text-white hover:bg-black/40"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="gradient-bright-sphere text-white text-3xl">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-white hover:bg-primary/90 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold gradient-text-hero mb-2">
                      {profile?.full_name || 'Student Name'}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                      {profile?.grade_level && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Grade {profile.grade_level}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>Zambia</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined September 2024</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Student</Badge>
                      <Badge variant="outline">Active Learner</Badge>
                      <Badge variant="outline">AI Explorer</Badge>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">127</div>
                <div className="text-sm text-muted-foreground">Study Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">8</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">24</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">156</div>
                <div className="text-sm text-muted-foreground">Friends</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {userPosts.map((post) => (
                  <FacebookStylePost
                    key={post.id}
                    post={post}
                    onLike={(postId) => console.log('Liked:', postId)}
                    onComment={(postId, comment) => console.log('Comment:', comment)}
                    onShare={(postId) => console.log('Shared:', postId)}
                  />
                ))}
              </div>
              
              <div className="space-y-6">
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Liked Sarah's mathematics post</span>
                    </div>
                    <div className="flex items-center gap-3 p-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Commented on physics discussion</span>
                    </div>
                    <div className="flex items-center gap-3 p-2">
                      <BookOpen className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Completed Chemistry Chapter 5</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gradeLevel">Grade Level</Label>
                        <Input
                          id="gradeLevel"
                          value={formData.grade_level}
                          onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{profile?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grade:</span>
                        <span>{profile?.grade_level || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">User Type:</span>
                        <span className="capitalize">{profile?.user_type || 'Student'}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Learning Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'].map((interest) => (
                      <Badge key={interest} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.name} className="glass-card border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{subject.name}</h3>
                      <Badge variant="outline">{subject.grade}</Badge>
                    </div>
                    <Progress value={subject.progress} className="mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{subject.progress}% Complete</span>
                      <span>Grade: {subject.grade}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="glass-card hover-lift border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center ${achievement.color}`}>
                      <achievement.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <Card key={i} className="glass-card hover-lift border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="gradient-bright-sphere text-white">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">Friend {i + 1}</h4>
                        <p className="text-sm text-muted-foreground">Grade 12 Student</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;