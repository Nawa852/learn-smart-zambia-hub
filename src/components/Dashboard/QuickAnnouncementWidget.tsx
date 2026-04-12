import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { useToast } from '@/hooks/use-toast';
import { Megaphone, Send, Loader2 } from 'lucide-react';

export const QuickAnnouncementWidget = () => {
  const { user } = useSecureAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from('courses').select('id, title').eq('created_by', user.id).eq('is_published', true)
      .then(({ data }) => {
        if (data?.length) {
          setCourses(data);
          setSelectedCourse(data[0].id);
        }
      });
  }, [user]);

  const handleSend = async () => {
    if (!title.trim() || !selectedCourse || !user) return;
    setSending(true);
    try {
      const { error } = await supabase.from('class_announcements').insert({
        course_id: selectedCourse,
        teacher_id: user.id,
        title: title.trim(),
        content: content.trim() || null,
        priority: 'normal',
      });
      if (error) throw error;
      toast({ title: 'Announcement posted!' });
      setTitle('');
      setContent('');
    } catch {
      toast({ title: 'Failed to post', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  if (courses.length === 0) return null;

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-primary" /> Quick Announcement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full h-9 rounded-lg border border-border bg-secondary/30 px-3 text-sm text-foreground"
        >
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <Input
          placeholder="Announcement title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-9 text-sm"
        />
        <Textarea
          placeholder="Details (optional)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
          className="text-sm resize-none"
        />
        <Button onClick={handleSend} disabled={sending || !title.trim()} size="sm" className="w-full gap-2">
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Post Announcement
        </Button>
      </CardContent>
    </Card>
  );
};
