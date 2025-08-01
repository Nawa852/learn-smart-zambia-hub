import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  MapPin, 
  Smile, 
  FileText,
  Send,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/useProfile';

interface CreatePostProps {
  onSubmit?: (post: {
    content: string;
    subject?: string;
    tags: string[];
    location?: string;
    attachments: string[];
  }) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [location, setLocation] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const { profile } = useProfile();

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Chemistry', 'Physics', 'Biology', 'Computer Science', 'Art'
  ];

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit?.({
        content: content.trim(),
        subject: subject || undefined,
        tags,
        location: location || undefined,
        attachments
      });
      
      // Reset form
      setContent('');
      setSubject('');
      setTags([]);
      setLocation('');
      setAttachments([]);
    }
  };

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
            <AvatarFallback className="gradient-bright-sphere text-white">
              {profile?.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold">{profile?.full_name || 'User'}</h4>
            <p className="text-sm text-muted-foreground">Share your learning journey</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Subject Selection */}
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a subject (optional)" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subj) => (
              <SelectItem key={subj} value={subj}>
                {subj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Content Textarea */}
        <Textarea
          placeholder="What's on your mind? Share your thoughts, questions, or discoveries..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none border-0 bg-muted/30 focus:bg-background transition-colors"
        />

        {/* Tags Input */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add tags (press Enter)"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleAddTag} variant="outline" size="sm">
              Add Tag
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Add location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <Image className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
              <FileText className="h-4 w-4 mr-2" />
              Document
            </Button>
            <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
              <Smile className="h-4 w-4 mr-2" />
              Feeling
            </Button>
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};