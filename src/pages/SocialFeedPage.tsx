import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share2, Send, Image, Trophy, BookOpen, Sparkles } from 'lucide-react';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'text' | 'achievement' | 'study';
  liked: boolean;
}

const SocialFeedPage = () => {
  const { user } = useSecureAuth();
  const { profile } = useProfile();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1', author: 'Mwila Chanda', avatar: 'MC',
      content: '🎉 Just completed the Grade 12 Physics course with 92%! Hard work pays off!',
      timestamp: '2 hours ago', likes: 24, comments: 8, type: 'achievement', liked: false,
    },
    {
      id: '2', author: 'Thandiwe Banda', avatar: 'TB',
      content: 'Anyone studying for the Biology midterm? I made some flashcards on cell division — happy to share!',
      timestamp: '4 hours ago', likes: 15, comments: 12, type: 'study', liked: false,
    },
    {
      id: '3', author: 'Bwalya Mutale', avatar: 'BM',
      content: 'The AI tutor helped me finally understand quadratic equations. This platform is amazing! 🚀',
      timestamp: '6 hours ago', likes: 31, comments: 5, type: 'text', liked: false,
    },
    {
      id: '4', author: 'Chileshe Mulenga', avatar: 'CM',
      content: '📚 Started a new study group for ECZ Science preparation. Join us if you\'re in Grade 9!',
      timestamp: '8 hours ago', likes: 18, comments: 14, type: 'study', liked: false,
    },
  ]);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: profile?.full_name || 'Student',
      avatar: (profile?.full_name || 'S').split(' ').map(n => n[0]).join('').slice(0, 2),
      content: newPost,
      timestamp: 'Just now',
      likes: 0, comments: 0, type: 'text', liked: false,
    };
    setPosts([post, ...posts]);
    setNewPost('');
    toast.success('Post shared!');
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const typeIcon = (type: string) => {
    if (type === 'achievement') return <Trophy className="w-4 h-4 text-amber-500" />;
    if (type === 'study') return <BookOpen className="w-4 h-4 text-blue-500" />;
    return <Sparkles className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Social Feed</h1>

      {/* Create Post */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {(profile?.full_name || 'S').split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share your learning journey..."
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <Image className="w-4 h-4" /> Photo
                </Button>
                <Button onClick={handlePost} disabled={!newPost.trim()} className="gap-2">
                  <Send className="w-4 h-4" /> Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="study">Study</TabsTrigger>
        </TabsList>

        {['all', 'achievements', 'study'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
            {posts
              .filter(p => tab === 'all' || p.type === (tab === 'achievements' ? 'achievement' : 'study'))
              .map(post => (
                <Card key={post.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="pt-5">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">{post.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{post.author}</span>
                          {typeIcon(post.type)}
                          <span className="text-xs text-muted-foreground ml-auto">{post.timestamp}</span>
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <Button variant="ghost" size="sm" className={`gap-1 ${post.liked ? 'text-red-500' : ''}`} onClick={() => handleLike(post.id)}>
                            <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} /> {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MessageCircle className="w-4 h-4" /> {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Share2 className="w-4 h-4" /> Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SocialFeedPage;
