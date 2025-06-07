
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, MessageCircle, Share2, BookOpen, Award, TrendingUp,
  Users, Brain, Globe, Clock, ThumbsUp, Lightbulb, HelpCircle
} from 'lucide-react';

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  type: 'achievement' | 'discussion' | 'project' | 'question' | 'announcement';
  timestamp: Date;
  course?: string;
  reactions: {
    applause: number;
    curious: number;
    inspired: number;
    confused: number;
  };
  comments: number;
  shares: number;
  aiSummary?: string;
}

const SocialFeed = () => {
  const [posts, setPosts] = useState<FeedPost[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: '/student1.jpg',
        role: 'Computer Science Student'
      },
      content: 'Just completed my machine learning capstone project! Built an AI model to predict student success rates. The insights are fascinating - study consistency matters more than total hours!',
      type: 'achievement',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      course: 'Advanced Machine Learning',
      reactions: { applause: 24, curious: 5, inspired: 18, confused: 1 },
      comments: 12,
      shares: 3,
      aiSummary: 'Sarah successfully completed an ML project focused on educational analytics, discovering that consistent study patterns outperform cramming.'
    },
    {
      id: '2',
      author: {
        name: 'Dr. Michael Chen',
        avatar: '/instructor2.jpg',
        role: 'Physics Professor'
      },
      content: 'Excited to announce our new Quantum Computing course! We\'ll be using IBM\'s quantum simulators and real quantum computers. Applications are open for the fall semester.',
      type: 'announcement',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      reactions: { applause: 45, curious: 28, inspired: 32, confused: 3 },
      comments: 23,
      shares: 15
    },
    {
      id: '3',
      author: {
        name: 'Emma Rodriguez',
        avatar: '/student2.jpg',
        role: 'Biology Major'
      },
      content: 'Can someone explain how CRISPR gene editing actually works at the molecular level? I understand the concept but struggling with the detailed mechanism.',
      type: 'question',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      reactions: { applause: 8, curious: 15, inspired: 4, confused: 12 },
      comments: 18,
      shares: 2,
      aiSummary: 'Emma is seeking detailed explanation of CRISPR molecular mechanisms beyond basic concepts.'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const getReactionIcon = (type: string) => {
    switch (type) {
      case 'applause': return '👏';
      case 'curious': return '🤔';
      case 'inspired': return '💡';
      case 'confused': return '😕';
      default: return '👍';
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return Award;
      case 'discussion': return MessageCircle;
      case 'project': return BookOpen;
      case 'question': return HelpCircle;
      case 'announcement': return TrendingUp;
      default: return MessageCircle;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea 
                placeholder="Share your learning journey, ask questions, or celebrate achievements..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-20 resize-none"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Project
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                    <HelpCircle className="w-3 h-3 mr-1" />
                    Question
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                    <Award className="w-3 h-3 mr-1" />
                    Achievement
                  </Badge>
                </div>
                <Button disabled={!newPost.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Posts */}
      {posts.map((post) => {
        const TypeIcon = getPostTypeIcon(post.type);
        
        return (
          <Card key={post.id}>
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{post.author.name}</h4>
                    <TypeIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600">{post.author.role}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatTimestamp(post.timestamp)}
                    {post.course && (
                      <>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">
                          {post.course}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
                
                {/* AI Summary */}
                {post.aiSummary && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">AI Summary</span>
                    </div>
                    <p className="text-sm text-blue-700">{post.aiSummary}</p>
                  </div>
                )}
              </div>

              {/* Reactions */}
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  {Object.entries(post.reactions).map(([type, count]) => (
                    <button
                      key={type}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-base">{getReactionIcon(type)}</span>
                      <span>{count}</span>
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <Share2 className="w-4 h-4" />
                    {post.shares}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1 pt-2 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="flex-1">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  React
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SocialFeed;
