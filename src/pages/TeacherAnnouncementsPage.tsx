import { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Megaphone, Plus, Trash2, Inbox } from 'lucide-react';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { formatDistanceToNow } from 'date-fns';

const TeacherAnnouncementsPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('normal');

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: c } = await supabase.from('courses').select('id, title').eq('created_by', user.id);
      setCourses(c || []);
      const { data: a } = await (supabase as any).from('class_announcements').select('*').eq('teacher_id', user.id).order('created_at', { ascending: false });
      if (a && c) {
        const cMap = Object.fromEntries((c || []).map((x: any) => [x.id, x.title]));
        setAnnouncements(a.map((x: any) => ({ ...x, course_title: cMap[x.course_id] })));
      }
      setLoading(false);
    })();
  }, [user]);

  const post = async () => {
    if (!title.trim() || !courseId) return;
    const { data } = await (supabase as any).from('class_announcements').insert({ course_id: courseId, teacher_id: user!.id, title, content, priority }).select().single();
    if (data) {
      const cTitle = courses.find(c => c.id === courseId)?.title;
      setAnnouncements([{ ...data, course_title: cTitle }, ...announcements]);
    }
    setTitle(''); setContent(''); setDialogOpen(false); toast.success('Announcement posted!');
  };

  const remove = async (id: string) => {
    await (supabase as any).from('class_announcements').delete().eq('id', id);
    setAnnouncements(announcements.filter(a => a.id !== id)); toast.success('Deleted');
  };

  if (loading) return <div className="max-w-3xl mx-auto py-12 px-4"><LogoLoader text="Loading..." /></div>;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Megaphone className="w-6 h-6 text-primary" /> Announcements</h1>
          <p className="text-sm text-muted-foreground">Post announcements to your classes</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Announcement</DialogTitle></DialogHeader>
            <Select value={courseId} onValueChange={setCourseId}><SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger><SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent></Select>
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            <Select value={priority} onValueChange={setPriority}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="normal">Normal</SelectItem><SelectItem value="important">Important</SelectItem><SelectItem value="urgent">Urgent</SelectItem></SelectContent></Select>
            <Button onClick={post}>Post</Button>
          </DialogContent>
        </Dialog>
      </div>

      {announcements.length === 0 ? (
        <Card><CardContent className="py-16 text-center"><Inbox className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" /><p className="font-medium">No announcements</p></CardContent></Card>
      ) : announcements.map(a => (
        <Card key={a.id} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{a.title}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">{a.course_title}</Badge>
                  <Badge variant={a.priority === 'urgent' ? 'destructive' : a.priority === 'important' ? 'default' : 'outline'} className="text-xs">{a.priority}</Badge>
                </div>
                {a.content && <p className="text-sm text-muted-foreground mt-2">{a.content}</p>}
                <p className="text-[10px] text-muted-foreground/60 mt-2">{formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(a.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeacherAnnouncementsPage;
