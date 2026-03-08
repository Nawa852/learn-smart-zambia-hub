import { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { StickyNote, BookOpen, Trash2, Edit3, Save, X, Inbox, Printer } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Note {
  id: string;
  title: string | null;
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
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data, error } = await (supabase as any)
        .from('student_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) { toast.error('Failed to load notes'); setLoading(false); return; }

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
    const { error } = await (supabase as any).from('student_notes').delete().eq('id', id);
    if (error) { toast.error('Failed to delete note'); return; }
    setNotes(prev => prev.filter(n => n.id !== id));
    toast.success('Note deleted');
  };

  const saveEdit = async (id: string) => {
    const { error } = await (supabase as any).from('student_notes').update({ 
      title: editTitle || null, content: editContent, updated_at: new Date().toISOString() 
    }).eq('id', id);
    if (error) { toast.error('Failed to save note'); return; }
    setNotes(prev => prev.map(n => n.id === id ? { ...n, title: editTitle || null, content: editContent, updated_at: new Date().toISOString() } : n));
    setEditingId(null);
    toast.success('Note updated');
  };

  if (loading) return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
      {[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <StickyNote className="w-6 h-6 text-primary" /> My Notes
          </h1>
          <p className="text-sm text-muted-foreground">{notes.length} notes saved</p>
        </div>
        {notes.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />Export PDF
          </Button>
        )}
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
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditingId(note.id); setEditTitle(note.title || ''); setEditContent(note.content); }}><Edit3 className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteNote(note.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                        </>
                      )}
                    </div>
                  </div>
                  {editingId === note.id ? (
                    <div className="space-y-2">
                      <Input placeholder="Note title (optional)" value={editTitle} onChange={e => setEditTitle(e.target.value)} className="font-medium" />
                      <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="min-h-[80px]" />
                    </div>
                  ) : (
                    <>
                      {note.title && <p className="text-sm font-semibold text-foreground mb-1">{note.title}</p>}
                      <p className="text-sm text-foreground/80 whitespace-pre-wrap">{note.content}</p>
                    </>
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
