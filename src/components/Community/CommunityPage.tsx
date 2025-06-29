
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { MessageCircle, Users, Plus, Search, Flame, Clock, ThumbsUp, Reply } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Forum {
  id: string;
  title: string;
  description: string;
  category: string;
  created_by: string;
  created_at: string;
  profiles?: {
    full_name: string;
  };
  _count?: {
    forum_posts: number;
  };
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  upvotes: number;
  created_at: string;
  author_id: string;
  forum_id: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  grade_level: string;
  created_by: string;
  max_members: number;
  is_public: boolean;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

const CommunityPage = () => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForum, setShowCreateForum] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();

  const [newForum, setNewForum] = useState({
    title: '',
    description: '',
    category: 'General'
  });

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    subject: '',
    grade_level: '',
    max_members: 20
  });

  const categories = [
    'General', 'Mathematics', 'Science', 'English', 'Social Studies',
    'ECZ Prep', 'Study Tips', 'Career Guidance', 'Technology'
  ];

  useEffect(() => {
    fetchForums();
    fetchRecentPosts();
    fetchStudyGroups();
  }, []);

  const fetchForums = async () => {
    try {
      const { data, error } = await supabase
        .from('forums')
        .select(`
          *,
          profiles:created_by (
            full_name
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setForums(data || []);
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles:author_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchStudyGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .select(`
          *,
          profiles:created_by (
            full_name
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setStudyGroups(data || []);
    } catch (error) {
      console.error('Error fetching study groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const createForum = async () => {
    if (!user || !newForum.title.trim()) return;

    try {
      const { error } = await supabase
        .from('forums')
        .insert({
          ...newForum,
          created_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Forum Created",
        description: "Your forum has been created successfully!",
      });

      setNewForum({ title: '', description: '', category: 'General' });
      setShowCreateForum(false);
      fetchForums();
    } catch (error) {
      console.error('Error creating forum:', error);
      toast({
        title: "Error",
        description: "Failed to create forum",
        variant: "destructive"
      });
    }
  };

  const createStudyGroup = async () => {
    if (!user || !newGroup.name.trim()) return;

    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert({
          ...newGroup,
          created_by: user.id,
          is_public: true
        })
        .select()
        .single();

      if (error) throw error;

      // Add creator as admin member
      await supabase
        .from('study_group_members')
        .insert({
          group_id: data.id,
          user_id: user.id,
          role: 'admin'
        });

      toast({
        title: "Study Group Created",
        description: "Your study group has been created successfully!",
      });

      setNewGroup({
        name: '',
        description: '',
        subject: '',
        grade_level: '',
        max_members: 20
      });
      setShowCreateGroup(false);
      fetchStudyGroups();
    } catch (error) {
      console.error('Error creating study group:', error);
      toast({
        title: "Error",
        description: "Failed to create study group",
        variant: "destructive"
      });
    }
  };

  const joinStudyGroup = async (groupId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('study_group_members')
        .insert({
          group_id: groupId,
          user_id: user.id,
          role: 'member'
        });

      if (error) throw error;

      toast({
        title: "Joined Study Group",
        description: "You have successfully joined the study group!",
      });
    } catch (error) {
      console.error('Error joining study group:', error);
      toast({
        title: "Error",
        description: "Failed to join study group",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Users className="w-8 h-8" />
              Community & Collaboration
            </CardTitle>
            <p className="text-purple-100">
              Connect, learn, and grow together with fellow students and educators
            </p>
          </CardHeader>
        </Card>

        {/* Search */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search forums, groups, and discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="forums" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forums">Discussion Forums</TabsTrigger>
            <TabsTrigger value="groups">Study Groups</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="forums" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Discussion Forums</h2>
              <Button onClick={() => setShowCreateForum(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Forum
              </Button>
            </div>

            {showCreateForum && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Create New Forum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Forum title"
                    value={newForum.title}
                    onChange={(e) => setNewForum(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Forum description"
                    value={newForum.description}
                    onChange={(e) => setNewForum(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <div className="flex gap-2">
                    <Button onClick={createForum}>Create</Button>
                    <Button variant="outline" onClick={() => setShowCreateForum(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forums.map((forum) => (
                <Card key={forum.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline">{forum.category}</Badge>
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{forum.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {forum.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>by {forum.profiles?.full_name || 'Anonymous'}</span>
                      <span>{new Date(forum.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Study Groups</h2>
              <Button onClick={() => setShowCreateGroup(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            {showCreateGroup && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Create Study Group</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Group name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Group description"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Subject"
                      value={newGroup.subject}
                      onChange={(e) => setNewGroup(prev => ({ ...prev, subject: e.target.value }))}
                    />
                    <Input
                      placeholder="Grade Level"
                      value={newGroup.grade_level}
                      onChange={(e) => setNewGroup(prev => ({ ...prev, grade_level: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={createStudyGroup}>Create</Button>
                    <Button variant="outline" onClick={() => setShowCreateGroup(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline">{group.subject}</Badge>
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {group.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{group.grade_level}</Badge>
                      <span className="text-sm text-gray-500">
                        Max {group.max_members} members
                      </span>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={() => joinStudyGroup(group.id)}
                    >
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.profiles?.avatar_url} />
                        <AvatarFallback>
                          {post.profiles?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{post.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            <Flame className="w-3 h-3 mr-1" />
                            {post.upvotes}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-3">
                          {post.content}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>by {post.profiles?.full_name || 'Anonymous'}</span>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <Button variant="ghost" size="sm">
                              <Reply className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
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

export default CommunityPage;
