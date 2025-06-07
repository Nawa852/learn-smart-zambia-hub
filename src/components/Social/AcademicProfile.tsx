
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Award, Users, Brain, MapPin, Calendar,
  Edit, MessageCircle, UserPlus, TrendingUp, Star,
  Globe, Clock, Target, Lightbulb, Heart
} from 'lucide-react';

const AcademicProfile = () => {
  const [isOwnProfile] = useState(true);
  
  const profile = {
    name: 'Alex Thompson',
    role: 'Computer Science Student',
    university: 'University of Zambia',
    location: 'Lusaka, Zambia',
    joinDate: 'September 2023',
    bio: 'Passionate about AI and machine learning. Currently working on my thesis about neural networks in educational technology. Love collaborating on open-source projects!',
    stats: {
      coursesCompleted: 24,
      certificatesEarned: 8,
      studyStreak: 45,
      peers: 156,
      posts: 89,
      helpfulAnswers: 134
    },
    skills: [
      { name: 'Python', level: 90, endorsed: 23 },
      { name: 'Machine Learning', level: 75, endorsed: 18 },
      { name: 'React', level: 80, endorsed: 15 },
      { name: 'Data Analysis', level: 85, endorsed: 21 },
      { name: 'Mathematics', level: 70, endorsed: 12 }
    ],
    recentAchievements: [
      { title: 'ML Specialist', date: '2 days ago', icon: Brain },
      { title: 'Helpful Peer', date: '1 week ago', icon: Heart },
      { title: 'Consistent Learner', date: '2 weeks ago', icon: Target }
    ],
    currentCourses: [
      { title: 'Advanced Deep Learning', progress: 78, instructor: 'Dr. Sarah Johnson' },
      { title: 'Computer Vision', progress: 45, instructor: 'Prof. Michael Chen' },
      { title: 'Natural Language Processing', progress: 92, instructor: 'Dr. Lisa Wang' }
    ],
    recentPosts: [
      {
        content: 'Just implemented my first GAN! The results are amazing...',
        timestamp: '2 hours ago',
        reactions: 24
      },
      {
        content: 'Looking for study partners for the upcoming AI ethics course',
        timestamp: '1 day ago',
        reactions: 12
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isOwnProfile ? (
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button className="flex-1">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{profile.role}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {profile.university}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {profile.joinDate}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{profile.bio}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{profile.stats.coursesCompleted}</div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{profile.stats.certificatesEarned}</div>
                  <div className="text-xs text-gray-600">Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{profile.stats.studyStreak}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{profile.stats.peers}</div>
                  <div className="text-xs text-gray-600">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{profile.stats.posts}</div>
                  <div className="text-xs text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">{profile.stats.helpfulAnswers}</div>
                  <div className="text-xs text-gray-600">Helpful</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Skills & Endorsements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Skills & Endorsements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.endorsed} endorsements</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Endorse Skills
              </Button>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <achievement.icon className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Current Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.currentCourses.map((course, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{course.title}</h4>
                    <Badge variant="secondary">{course.progress}%</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Recent Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.recentPosts.map((post, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 mb-2">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.timestamp}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.reactions} reactions
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Posts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AcademicProfile;
