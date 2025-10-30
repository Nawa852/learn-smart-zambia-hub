import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Bookmark,
  Send,
  Smile,
  Image,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Laugh,
  Angry,
  Eye,
  UserPlus,
  Flag,
  Copy,
  ExternalLink,
  ChevronDown,
  Video,
  Camera,
  Mic,
  Clock,
  Globe,
  Users
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Reaction {
  type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  emoji: string;
  count: number;
  hasReacted: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    title?: string;
    location?: string;
    isVerified?: boolean;
    mutualFriends?: number;
  };
  content: string;
  images?: string[];
  video?: string;
  link?: {
    url: string;
    title: string;
    description: string;
    image: string;
  };
  timestamp: string;
  reactions: Reaction[];
  comments: Comment[];
  shares: number;
  views?: number;
  privacy: 'public' | 'friends' | 'private';
  isLiked: boolean;
  isSaved: boolean;
  subject?: string;
  tags?: string[];
  feeling?: string;
  activity?: string;
  checkedIn?: string;
  mentionedUsers?: string[];
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    totalVotes: number;
  };
  event?: {
    name: string;
    date: string;
    location: string;
  };
}

export type { Post, Reaction, Comment };

interface FacebookStylePostProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string) => void;
}

export const FacebookStylePost: React.FC<FacebookStylePostProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onSave
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [reactions, setReactions] = useState(post.reactions);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const reactionEmojis = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
    { type: 'haha', emoji: '😂', label: 'Haha' },
    { type: 'wow', emoji: '😮', label: 'Wow' },
    { type: 'sad', emoji: '😢', label: 'Sad' },
    { type: 'angry', emoji: '😡', label: 'Angry' }
  ];

  const handleReaction = (reactionType: string) => {
    const newReactions = reactions.map(r => {
      if (r.type === reactionType) {
        return { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted };
      }
      return r.hasReacted ? { ...r, count: r.count - 1, hasReacted: false } : r;
    });
    setReactions(newReactions);
    setShowReactionPicker(false);
    onLike?.(post.id);
  };

  const getTopReactions = () => {
    return reactions
      .filter(r => r.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  };

  const getTotalReactions = () => {
    return reactions.reduce((sum, r) => sum + r.count, 0);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(post.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment?.(post.id, commentText);
      setCommentText('');
      setShowComments(true);
    }
  };

  return (
    <Card className="glass-card hover-lift transition-all duration-300 border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="gradient-bright-sphere text-white">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{post.author.name}</h4>
                {post.subject && (
                  <Badge variant="secondary" className="text-xs">
                    {post.subject}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {post.author.title && <span>{post.author.title}</span>}
                {post.author.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{post.author.location}</span>
                    </div>
                  </>
                )}
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Post Content */}
        <div className="space-y-3">
          <p className="text-foreground leading-relaxed">{post.content}</p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs hover:bg-primary/10">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {post.images && post.images.length > 0 && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={post.images[0]} 
                alt="Post content" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between py-2 border-y">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-sm text-muted-foreground">{getTotalReactions()}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {post.comments.length} comments
            </span>
            <span className="text-sm text-muted-foreground">
              {post.shares} shares
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={`h-8 w-8 ${isSaved ? 'text-primary' : ''}`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => handleReaction('like')}
            className={`flex items-center gap-2 flex-1 ${
              reactions.find(r => r.type === 'like')?.hasReacted ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${reactions.find(r => r.type === 'like')?.hasReacted ? 'fill-current' : ''}`} />
            <span className="font-medium">Like</span>
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 flex-1 hover:text-blue-500"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Comment</span>
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onShare?.(post.id)}
            className="flex items-center gap-2 flex-1 hover:text-green-500"
          >
            <Share2 className="h-5 w-5" />
            <span className="font-medium">Share</span>
          </Button>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="space-y-3 pt-3 border-t">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="gradient-bright-sphere text-white text-xs">
                  You
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  className="flex-1 bg-muted/50 border-0 rounded-full"
                />
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="h-8 w-8"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};