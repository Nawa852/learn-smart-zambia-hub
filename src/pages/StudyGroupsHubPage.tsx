import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, MessageSquare, Video, FileUp, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface Group {
  id: string; name: string; description: string | null; subject: string | null;
  grade_level: string | null; is_public: boolean; created_by: string; created_at: string;
}

const StudyGroupsHubPage: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [memberIds, setMemberIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', subject: '', grade_level: '' });

  const load = async () => {
    const { data } = await supabase.from('study_groups').select('*').order('created_at', { ascending: false });
    setGroups((data as Group[]) || []);
    if (user) {
      const { data: mems } = await supabase.from('study_group_members').select('group_id').eq('user_id', user.id);
      setMemberIds(new Set((mems || []).map((m: any) => m.group_id)));
    }
  };

  useEffect(() => { load(); }, [user]);

  const create = async () => {
    if (!user || !form.name.trim()) return;
    const { data, error } = await supabase.from('study_groups').insert({
      ...form, name: form.name.trim(), created_by: user.id,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    await supabase.from('study_group_members').insert({ group_id: (data as any).id, user_id: user.id, role: 'owner' });
    toast.success('Group created'); setOpen(false); setForm({ name: '', description: '', subject: '', grade_level: '' }); load();
  };

  const join = async (g: Group) => {
    if (!user) return;
    const { error } = await supabase.from('study_group_members').insert({ group_id: g.id, user_id: user.id });
    if (error) toast.error(error.message); else { toast.success(`Joined ${g.name}`); load(); }
  };

  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || (g.subject || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="h-7 w-7 text-primary" /> Study Groups</h1>
          <p className="text-muted-foreground">Find or create groups to study together.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> New Group</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Study Group</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Subject</Label><Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Mathematics" /></div>
              <div><Label>Grade / Level</Label><Input value={form.grade_level} onChange={e => setForm({ ...form, grade_level: e.target.value })} placeholder="Grade 12 / College" /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <Button onClick={create} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groups..." />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(g => {
          const joined = memberIds.has(g.id) || g.created_by === user?.id;
          return (
            <Card key={g.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="truncate">{g.name}</span>
                  {g.subject && <Badge variant="secondary">{g.subject}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {g.description && <p className="text-sm text-muted-foreground line-clamp-2">{g.description}</p>}
                {g.grade_level && <p className="text-xs text-muted-foreground">{g.grade_level}</p>}
                {joined ? (
                  <div className="flex gap-2 pt-2 flex-wrap">
                    <Button asChild size="sm" variant="outline"><Link to={`/group/${g.id}/chat`}><MessageSquare className="h-4 w-4 mr-1" /> Chat</Link></Button>
                    <Button asChild size="sm" variant="outline"><Link to={`/group/${g.id}/files`}><FileUp className="h-4 w-4 mr-1" /> Files</Link></Button>
                    <Button asChild size="sm"><Link to={`/group/${g.id}/video`}><Video className="h-4 w-4 mr-1" /> Video</Link></Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full mt-2" onClick={() => join(g)}>Join Group</Button>
                )}
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground col-span-full">No groups yet — create the first one!</p>}
      </div>
    </div>
  );
};

export default StudyGroupsHubPage;
