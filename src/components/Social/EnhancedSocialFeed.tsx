
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, MessageSquare, Share, BookOpen, Trophy, Users,
  Camera, Video, Link as LinkIcon, MoreHorizontal,
  ThumbsUp, Star, Award, Target, Lightbulb, Zap
} from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';

const EnhancedSocialFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('feed');

  const samplePosts = [
    {
      id: 1,
      author: 'Sarah Mwansa',
      avatar: '/api/placeholder/40/40',
      time: '2 hours ago',
      content: 'Just completed my Grade 12 Mathematics revision! 📚 The AI tutor helped me understand quadratic equations with local examples - calculating maize farm yields made it so much clearer! #StudySuccess #ZambianEducation',
      likes: 24,
      comments: 8,
      shares: 3,
      type: 'achievement',
      badges: ['Math Wizard', 'Consistent Learner']
    },
    {
      id: 2,
      author: 'Teacher Phiri',
      avatar: '/api/placeholder/40/40',
      time: '4 hours ago',
      content: 'Sharing some free Biology notes for Grade 11 students focusing on photosynthesis. Remember: "Ukufunda kwaba bantu bonke" - Education is for everyone! 🌱',
      likes: 67,
      comments: 15,
      shares: 23,
      type: 'resource',
      attachments: ['biology_notes.pdf'],
      badges: ['Top Contributor', 'Mentor']
    },
    {
      id: 3,
      author: 'Study Group Lusaka',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      content: 'Weekly study group meeting tomorrow at 3 PM! We\'ll be covering Chemistry bonding. All Grade 12 students welcome. "Umuntu ngumuntu ngabantu" - We grow together! 🤝',
      likes: 45,
      comments: 12,
      shares: 18,
      type: 'event',
      badges: ['Community Leader']
    },
    {
      id: 4,
      author: 'James Banda',
      avatar: '/api/placeholder/40/40',
      time: '2 days ago',
      content: 'Got accepted to University of Zambia for Engineering! Thanks to everyone in this community who helped me with my studies. The AI tutoring and peer support made all the difference! 🎓',
      likes: 156,
      comments: 34,
      shares: 41,
      type: 'milestone',
      badges: ['High Achiever', 'Future Engineer']
    }
  ];

  const studyGroups = [
    { name: 'Grade 12 Mathematics', members: 234, active: true },
    { name: 'Biology Enthusiasts', members: 189, active: true },
    { name: 'English Literature Club', members: 156, active: false },
    { name: 'Physics Problem Solvers', members: 198, active: true },
    { name: 'Chemistry Study Circle', members: 167, active: false }
  ];

  const achievements = [
    { title: 'Study Streak', description: '7 days of consistent learning', icon: Zap, color: 'text-yellow-500' },
    { title: 'Helpful Peer', description: 'Helped 10 classmates this week', icon: Users, color: 'text-blue-500' },
    { title: 'Quiz Master', description: 'Scored 100% on 5 quizzes', icon: Trophy, color: 'text-green-500' },
    { title: 'Goal Achiever', description: 'Completed 3 learning goals', icon: Target, color: 'text-purple-500' }
  ];

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const getPostTypeColor = (type) => {
    switch(type) {
      case 'achievement': return 'border-l-green-500';
      case 'resource': return 'border-l-blue-500';
      case 'event': return 'border-l-purple-500';
      case 'milestone': return 'border-l-yellow-500';
      default: return 'border-l-gray-300';
    }
  };

  const PostCard = ({ post }) => (
    <Card className={`mb-6 border-l-4 ${getPostTypeColor(post.type)} hover:shadow-lg transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{post.author}</span>
                {post.badges?.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
              <span className="text-sm text-gray-500">{post.time}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="mb-4 text-gray-800 leading-relaxed">{post.content}</p>
        
        {post.attachments && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Attachment: {post.attachments[0]}</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-2 hover:text-red-500"
            >
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-blue-500">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-green-500">
              <Share className="w-4 h-4" />
              <span>{post.shares}</span>
            </Button>
          </div>
          
          <Badge variant="outline" className="capitalize">
            {post.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Learning Hub</h1>
          <p className="text-gray-600">Connect, share, and grow together with fellow Zambian learners</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {[
              { id: 'feed', label: 'Feed', icon: MessageSquare },
              { id: 'groups', label: 'Study Groups', icon: Users },
              { id: 'achievements', label: 'Achievements', icon: Trophy }
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center space-x-2 flex-1"
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'feed' && (
              <div>
                {/* Create Post */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Share your learning progress, ask questions, or celebrate achievements..."
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="min-h-[100px] resize-none border-0 bg-gray-50"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Camera className="w-4 h-4 mr-2" />
                              Photo
                            </Button>
                            <Button variant="outline" size="sm">
                              <Video className="w-4 h-4 mr-2" />
                              Video
                            </Button>
                            <Button variant="outline" size="sm">
                              <LinkIcon className="w-4 h-4 mr-2" />
                              Link
                            </Button>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Study Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studyGroups.map((group, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${group.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <div>
                              <h3 className="font-semibold">{group.name}</h3>
                              <p className="text-sm text-gray-600">{group.members} members</p>
                            </div>
                          </div>
                          <Button variant={group.active ? "default" : "outline"} size="sm">
                            {group.active ? 'Active' : 'Join'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full bg-gray-100 ${achievement.color}`}>
                          <achievement.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Posts Shared</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Peers Helped</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Study Streak</span>
                    <span className="font-semibold text-green-600">7 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Maria Tembo', 'John Lungu', 'Grace Zulu'].map((name, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{name}</span>
                      </div>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Motivation */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Lightbulb className="w-6 h-6" />
                  <span className="font-semibold">Daily Inspiration</span>
                </div>
                <p className="text-sm opacity-90">
                  "Ukufunda kwaba bantu bonse" - Education belongs to everyone. Keep learning, keep growing! 🌟
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSocialFeed;
