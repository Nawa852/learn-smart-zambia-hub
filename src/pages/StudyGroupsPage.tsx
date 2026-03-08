import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, Search, MessageSquare, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  is_group: boolean;
  created_by: string | null;
  created_at: string;
  member_count?: number;
  is_member?: boolean;
}

const StudyGroupsPage = () => {
  const { user } = useSecureAuth();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });

  useEffect(() => {
    if (user) fetchGroups();
  }, [user]);

  const fetchGroups = async () => {
    // Get all group chat rooms
    const { data: rooms } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('is_group', true)
      .order('created_at', { ascending: false });

    if (!rooms) { setLoading(false); return; }

    // Get member counts and membership status
    const enriched = await Promise.all(rooms.map(async (room) => {
      const { count } = await supabase
        .from('chat_members')
        .select('*', { count: 'exact', head: true })
        .eq('room_id', room.id);
      const { data: membership } = await supabase
        .from('chat_members')
        .select('id')
        .eq('room_id', room.id)
        .eq('user_id', user!.id)
        .maybeSingle();
      return { ...room, member_count: count || 0, is_member: !!membership };
    }));

    setGroups(enriched);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newGroup.name.trim()) { toast.error('Please enter a group name'); return; }
    const { data: room, error } = await supabase
      .from('chat_rooms')
      .insert({ name: newGroup.name, description: newGroup.description || null, is_group: true, created_by: user!.id })
      .select()
      .single();
    if (error || !room) { toast.error('Failed to create group'); return; }
    // Auto-join creator
    await supabase.from('chat_members').insert({ room_id: room.id, user_id: user!.id });
    toast.success('Study group created!');
    setNewGroup({ name: '', description: '' });
    setShowCreate(false);
    fetchGroups();
  };

  const handleJoin = async (roomId: string) => {
    const { error } = await supabase.from('chat_members').insert({ room_id: roomId, user_id: user!.id });
    if (error) { toast.error('Failed to join group'); return; }
    toast.success('Joined group!');
    fetchGroups();
  };

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    (g.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'ICT', 'Business'];

  return (
    <div className="container mx-auto p-6 max-w-5xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Study Groups</h1>
            <p className="text-muted-foreground">Collaborate and learn together</p>
          </div>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Create Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Study Group</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Group Name *</Label>
                <Input placeholder="e.g. Grade 12 Physics Study Group" value={newGroup.name} onChange={e => setNewGroup({ ...newGroup, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="What will you study together?" value={newGroup.description} onChange={e => setNewGroup({ ...newGroup, description: e.target.value })} />
              </div>
              <Button onClick={handleCreate} className="w-full">Create Group</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search groups..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Subject" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading groups...</div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Study Groups Found</h3>
            <p className="text-muted-foreground mb-4">Create one and invite your classmates!</p>
            <Button onClick={() => setShowCreate(true)} className="gap-2"><Plus className="w-4 h-4" /> Create First Group</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(g => (
            <Card key={g.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{g.name}</CardTitle>
                    {g.description && <CardDescription className="mt-1">{g.description}</CardDescription>}
                  </div>
                  <Badge variant="secondary" className="gap-1"><Users className="w-3 h-3" />{g.member_count}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Created {new Date(g.created_at).toLocaleDateString()}</span>
                {g.is_member ? (
                  <Button size="sm" variant="secondary" className="gap-2" onClick={() => navigate('/study-chat')}>
                    <MessageSquare className="w-4 h-4" /> Open Chat
                  </Button>
                ) : (
                  <Button size="sm" className="gap-2" onClick={() => handleJoin(g.id)}>
                    <Plus className="w-4 h-4" /> Join
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyGroupsPage;
