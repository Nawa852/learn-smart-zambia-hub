import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Ann { id: string; school: string; title: string; body: string | null; priority: string; audience: string; created_at: string; author_id: string; }

const SchoolAnnouncementsPage: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Ann[]>([]);
  const [school, setSchool] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', priority: 'normal', audience: 'all' });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: prof } = await supabase.from('profiles').select('school').eq('id', user.id).single();
      setSchool((prof as any)?.school || '');
      const { data } = await supabase.from('school_announcements').select('*').order('created_at', { ascending: false });
      setItems((data as Ann[]) || []);
    })();
  }, [user]);

  const create = async () => {
    if (!user || !school || !form.title.trim()) { toast.error('Set your school in profile first'); return; }
    const { error } = await supabase.from('school_announcements').insert({
      ...form, school, author_id: user.id, title: form.title.trim(),
    });
    if (error) return toast.error(error.message);
    toast.success('Posted'); setOpen(false); setForm({ title: '', body: '', priority: 'normal', audience: 'all' });
    const { data } = await supabase.from('school_announcements').select('*').order('created_at', { ascending: false });
    setItems((data as Ann[]) || []);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Megaphone className="h-6 w-6 text-primary" /> School Announcements</h1>
          <p className="text-sm text-muted-foreground">{school || 'Set your school in profile'}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> New</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Announcement</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Body</Label><Textarea rows={5} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>Priority</Label>
                  <select className="w-full border rounded px-2 py-2 bg-background" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                    <option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option>
                  </select>
                </div>
                <div><Label>Audience</Label>
                  <select className="w-full border rounded px-2 py-2 bg-background" value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })}>
                    <option value="all">Everyone</option><option value="students">Students</option><option value="teachers">Teachers</option><option value="parents">Parents</option>
                  </select>
                </div>
              </div>
              <Button onClick={create} className="w-full">Post</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {items.map(a => (
          <Card key={a.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{a.title}</span>
                <div className="flex gap-1">
                  {a.priority !== 'normal' && <Badge variant={a.priority === 'urgent' ? 'destructive' : 'default'}>{a.priority}</Badge>}
                  <Badge variant="outline">{a.audience}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {a.body && <p className="text-sm whitespace-pre-wrap">{a.body}</p>}
              <p className="text-xs text-muted-foreground mt-2">{a.school} · {new Date(a.created_at).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground">No announcements yet.</p>}
      </div>
    </div>
  );
};

export default SchoolAnnouncementsPage;
