import { useState, useEffect } from 'react';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote, BookOpen, Trash2, Edit3, Save, X, Inbox, Printer } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Note {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  lesson_id: string | null;
  course_id: string | null;
  lesson_title?: string;
  course_title?: string;
}

const MyNotesPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await (supabase as any)
        .from('student_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (data) {
        const courseIds = [...new Set(data.filter((n: any) => n.course_id).map((n: any) => n.course_id))] as string[];
        const lessonIds = [...new Set(data.filter((n: any) => n.lesson_id).map((n: any) => n.lesson_id))] as string[];

        const [{ data: courses }, { data: lessons }] = await Promise.all([
          courseIds.length ? supabase.from('courses').select('id, title').in('id', courseIds) : { data: [] as any[] },
          lessonIds.length ? supabase.from('lessons').select('id, title').in('id', lessonIds) : { data: [] as any[] },
        ]);

        const courseMap = Object.fromEntries((courses || []).map((c: any) => [c.id, c.title]));
        const lessonMap = Object.fromEntries((lessons || []).map((l: any) => [l.id, l.title]));

        setNotes(data.map((n: any) => ({
          ...n,
          course_title: courseMap[n.course_id] || undefined,
          lesson_title: lessonMap[n.lesson_id] || undefined,
        })));
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const deleteNote = async (id: string) => {
    await (supabase as any).from('student_notes').delete().eq('id', id);
    setNotes(prev => prev.filter(n => n.id !== id));
    toast.success('Note deleted');
  };

  const saveEdit = async (id: string) => {
    await (supabase as any).from('student_notes').update({ content: editContent, updated_at: new Date().toISOString() }).eq('id', id);
    setNotes(prev => prev.map(n => n.id === id ? { ...n, content: editContent, updated_at: new Date().toISOString() } : n));
    setEditingId(null);
    toast.success('Note updated');
  };

  if (loading) return <div className="max-w-3xl mx-auto py-12 px-4"><LogoLoader text="Loading notes..." /></div>;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <StickyNote className="w-6 h-6 text-primary" /> My Notes
        </h1>
        <p className="text-sm text-muted-foreground">{notes.length} notes saved</p>
      </div>

      {notes.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Inbox className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-medium text-foreground">No notes yet</p>
            <p className="text-sm text-muted-foreground mt-1">Take notes while studying lessons and they'll appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notes.map(note => (
            <motion.div key={note.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {note.course_title && <Badge variant="secondary" className="text-xs"><BookOpen className="w-3 h-3 mr-1" />{note.course_title}</Badge>}
                      {note.lesson_title && <Badge variant="outline" className="text-xs">{note.lesson_title}</Badge>}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {editingId === note.id ? (
                        <>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => saveEdit(note.id)}><Save className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingId(null)}><X className="w-3.5 h-3.5" /></Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditingId(note.id); setEditContent(note.content); }}><Edit3 className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteNote(note.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                        </>
                      )}
                    </div>
                  </div>
                  {editingId === note.id ? (
                    <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="min-h-[80px]" />
                  ) : (
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap">{note.content}</p>
                  )}
                  <p className="text-[10px] text-muted-foreground/60 mt-2">
                    {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNotesPage;
