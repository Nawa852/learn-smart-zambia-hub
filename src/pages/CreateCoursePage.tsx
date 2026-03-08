import { useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Plus, Trash2, GripVertical, Save, ArrowLeft,
  Video, FileText, Clock, ChevronDown, ChevronUp
} from 'lucide-react';

interface LessonDraft {
  id: string;
  title: string;
  content: string;
  video_url: string;
  duration_minutes: number;
  order_index: number;
}

const subjects = ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Civic Education', 'Computer Studies'];
const grades = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const CreateCoursePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [lessons, setLessons] = useState<LessonDraft[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const addLesson = () => {
    const newLesson: LessonDraft = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      video_url: '',
      duration_minutes: 30,
      order_index: lessons.length,
    };
    setLessons(prev => [...prev, newLesson]);
    setExpandedLesson(newLesson.id);
  };

  const updateLesson = (id: string, updates: Partial<LessonDraft>) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const removeLesson = (id: string) => {
    setLessons(prev => prev.filter(l => l.id !== id).map((l, i) => ({ ...l, order_index: i })));
  };

  const moveLesson = (index: number, direction: 'up' | 'down') => {
    const newLessons = [...lessons];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newLessons.length) return;
    [newLessons[index], newLessons[swapIndex]] = [newLessons[swapIndex], newLessons[index]];
    setLessons(newLessons.map((l, i) => ({ ...l, order_index: i })));
  };

  const saveCourse = async (publish: boolean) => {
    if (!user || !title.trim()) {
      toast.error('Course title is required');
      return;
    }

    setSaving(true);
    try {
      // Create course
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          subject: subject || null,
          grade_level: gradeLevel || null,
          created_by: user.id,
          is_published: publish,
        })
        .select()
        .single();

      if (courseError || !course) throw courseError;

      // Create lessons
      if (lessons.length > 0) {
        const lessonsToInsert = lessons
          .filter(l => l.title.trim())
          .map(l => ({
            course_id: course.id,
            title: l.title.trim(),
            content: l.content.trim() || null,
            video_url: l.video_url.trim() || null,
            duration_minutes: l.duration_minutes || null,
            order_index: l.order_index,
          }));

        if (lessonsToInsert.length > 0) {
          const { error: lessonsError } = await supabase.from('lessons').insert(lessonsToInsert);
          if (lessonsError) throw lessonsError;
        }
      }

      toast.success(publish ? 'Course published!' : 'Course saved as draft!');
      navigate('/course-catalog');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Course</h1>
          <p className="text-sm text-muted-foreground">Build your course with structured lessons</p>
        </div>
      </div>

      {/* Course Details */}
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Course Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Course Title *</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Advanced Mathematics Grade 12" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What will students learn?" rows={3} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Grade Level</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Lessons
              <Badge variant="secondary">{lessons.length}</Badge>
            </CardTitle>
            <Button size="sm" onClick={addLesson}><Plus className="w-4 h-4 mr-1" /> Add Lesson</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {lessons.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No lessons yet. Add your first lesson.</p>
            </div>
          ) : (
            lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border rounded-lg overflow-hidden"
              >
                <div
                  className="flex items-center gap-2 p-3 bg-muted/30 cursor-pointer"
                  onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                  <span className="flex-1 text-sm font-medium text-foreground truncate">
                    {lesson.title || 'Untitled Lesson'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); moveLesson(index, 'up'); }} disabled={index === 0}>
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); moveLesson(index, 'down'); }} disabled={index === lessons.length - 1}>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={e => { e.stopPropagation(); removeLesson(lesson.id); }}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {expandedLesson === lesson.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="p-3 space-y-3 border-t border-border">
                    <div>
                      <Label>Lesson Title</Label>
                      <Input value={lesson.title} onChange={e => updateLesson(lesson.id, { title: e.target.value })} placeholder="Lesson title" />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea value={lesson.content} onChange={e => updateLesson(lesson.id, { content: e.target.value })} placeholder="Lesson content..." rows={4} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="flex items-center gap-1"><Video className="w-3 h-3" /> Video URL</Label>
                        <Input value={lesson.video_url} onChange={e => updateLesson(lesson.id, { video_url: e.target.value })} placeholder="https://..." />
                      </div>
                      <div>
                        <Label className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duration (min)</Label>
                        <Input type="number" value={lesson.duration_minutes} onChange={e => updateLesson(lesson.id, { duration_minutes: parseInt(e.target.value) || 0 })} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end sticky bottom-4">
        <Button variant="outline" onClick={() => saveCourse(false)} disabled={saving || !title.trim()}>
          <Save className="w-4 h-4 mr-2" /> Save Draft
        </Button>
        <Button onClick={() => saveCourse(true)} disabled={saving || !title.trim()} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
          {saving ? 'Publishing...' : 'Publish Course'}
        </Button>
      </div>
    </div>
  );
};

export default CreateCoursePage;
