import { useState, useEffect } from 'react';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen, ArrowLeft, Play, FileText, Clock, CheckCircle,
  ChevronRight, Layers, Lock, ClipboardCheck, StickyNote, Save
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  order_index: number;
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  grade_level: string | null;
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [noteContent, setNoteContent] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    const fetchData = async () => {
      const [{ data: courseData }, { data: lessonsData }] = await Promise.all([
        supabase.from('courses').select('*').eq('id', courseId).single(),
        supabase.from('lessons').select('*').eq('course_id', courseId).order('order_index'),
      ]);

      if (courseData) setCourse(courseData);
      if (lessonsData) {
        setLessons(lessonsData);
        if (lessonsData.length > 0) setActiveLesson(lessonsData[0]);
      }

      if (user) {
        const [{ data: enrollment }, { data: completions }] = await Promise.all([
          supabase.from('enrollments').select('id').eq('course_id', courseId).eq('user_id', user.id).maybeSingle(),
          supabase.from('lesson_completions').select('lesson_id').eq('course_id', courseId).eq('user_id', user.id),
        ]);
        setIsEnrolled(!!enrollment);
        if (completions) setCompletedLessons(new Set(completions.map(c => c.lesson_id)));
      }
      setLoading(false);
    };
    fetchData();
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user || !courseId) return;
    const { error } = await supabase.from('enrollments').insert({ user_id: user.id, course_id: courseId });
    if (error) {
      toast.error('Failed to enroll');
    } else {
      setIsEnrolled(true);
      toast.success('Enrolled successfully!');
    }
  };

  const markComplete = async (lessonId: string) => {
    if (!user || !courseId) return;
    const { error } = await supabase.from('lesson_completions').insert({
      user_id: user.id,
      lesson_id: lessonId,
      course_id: courseId,
    });
    if (error && !error.message.includes('duplicate')) {
      toast.error('Failed to save progress');
      return;
    }
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    const nextIndex = lessons.findIndex(l => l.id === lessonId) + 1;
    if (nextIndex < lessons.length) setActiveLesson(lessons[nextIndex]);

    // Update enrollment progress
    const newProgress = ((completedLessons.size + 1) / lessons.length) * 100;
    await supabase.from('enrollments').update({ progress: Math.min(newProgress, 100) })
      .eq('user_id', user.id).eq('course_id', courseId);

    toast.success('Lesson completed!');
  };

  const saveNote = async () => {
    if (!user || !courseId || !activeLesson || !noteContent.trim()) return;
    setSavingNote(true);
    await (supabase as any).from('student_notes').insert({
      user_id: user.id,
      lesson_id: activeLesson.id,
      course_id: courseId,
      content: noteContent.trim(),
    });
    setNoteContent('');
    setSavingNote(false);
    toast.success('Note saved!');
  };

  const progress = lessons.length > 0 ? (completedLessons.size / lessons.length) * 100 : 0;

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <LogoLoader text="Loading course..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 text-center">
        <BookOpen className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
        <h2 className="text-xl font-semibold mb-2">Course not found</h2>
        <Button onClick={() => navigate('/course-catalog')}>Back to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/course-catalog')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {course.subject && <Badge variant="secondary">{course.subject}</Badge>}
            {course.grade_level && <Badge variant="outline">{course.grade_level}</Badge>}
            <Badge variant="outline"><Layers className="w-3 h-3 mr-1" />{lessons.length} lessons</Badge>
          </div>
          {course.description && <p className="text-sm text-muted-foreground mt-2">{course.description}</p>}
          {isEnrolled && (
            <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate(`/course/${courseId}/assignments`)}>
              <ClipboardCheck className="w-4 h-4 mr-1" /> Assignments
            </Button>
          )}
        </div>
      </div>

      {/* Enrollment banner */}
      {!isEnrolled && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-foreground">Enroll to access all lessons</p>
              <p className="text-sm text-muted-foreground">Get full access to course content and track your progress.</p>
            </div>
            <Button onClick={handleEnroll}>Enroll Now</Button>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      {isEnrolled && lessons.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Main content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Lesson Content */}
        <div className="md:col-span-2 space-y-4">
          {activeLesson ? (
            <motion.div key={activeLesson.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card>
                <CardContent className="p-0">
                  {/* Video */}
                  {activeLesson.video_url && (() => {
                    const embedUrl = getYouTubeEmbedUrl(activeLesson.video_url);
                    return embedUrl ? (
                      <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                        <iframe
                          src={embedUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={activeLesson.title}
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                        <a href={activeLesson.video_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                          Open video in new tab
                        </a>
                      </div>
                    );
                  })()}

                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-foreground">{activeLesson.title}</h2>
                      {activeLesson.duration_minutes && (
                        <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />{activeLesson.duration_minutes} min</Badge>
                      )}
                    </div>

                    {activeLesson.content ? (
                      <div className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">
                        {activeLesson.content}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No written content for this lesson.</p>
                    )}

                    {isEnrolled && (
                      <div className="flex justify-end pt-2">
                        {completedLessons.has(activeLesson.id) ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                            <CheckCircle className="w-4 h-4 mr-1" /> Completed
                          </Badge>
                        ) : (
                          <Button onClick={() => markComplete(activeLesson.id)}>
                            <CheckCircle className="w-4 h-4 mr-2" /> Mark as Complete
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Notes Panel */}
                    {isEnrolled && (
                      <div className="border-t border-border/50 pt-4 mt-4">
                        <Button variant="ghost" size="sm" onClick={() => setShowNotes(!showNotes)} className="mb-2 text-muted-foreground">
                          <StickyNote className="w-4 h-4 mr-2" /> {showNotes ? 'Hide Notes' : 'Take Notes'}
                        </Button>
                        {showNotes && (
                          <div className="space-y-2">
                            <Textarea
                              value={noteContent}
                              onChange={e => setNoteContent(e.target.value)}
                              placeholder="Write your notes for this lesson..."
                              className="min-h-[80px] bg-secondary/30"
                            />
                            <Button size="sm" onClick={saveNote} disabled={!noteContent.trim() || savingNote}>
                              <Save className="w-3.5 h-3.5 mr-1" /> Save Note
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No lessons available for this course yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lesson List */}
        <div>
          <Card>
            <CardContent className="p-0">
              <div className="p-3 border-b border-border">
                <h3 className="font-semibold text-sm text-foreground">Course Lessons</h3>
              </div>
              <div className="divide-y divide-border">
                {lessons.map((lesson, i) => {
                  const isActive = activeLesson?.id === lesson.id;
                  const isComplete = completedLessons.has(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => isEnrolled && setActiveLesson(lesson)}
                      disabled={!isEnrolled}
                      className={`w-full p-3 flex items-center gap-3 text-left transition-colors text-sm ${
                        isActive ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-muted/50'
                      } ${!isEnrolled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${
                        isComplete ? 'bg-emerald-500 text-white' : isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {isComplete ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-foreground">{lesson.title}</p>
                        {lesson.duration_minutes && (
                          <p className="text-xs text-muted-foreground">{lesson.duration_minutes} min</p>
                        )}
                      </div>
                      {!isEnrolled ? (
                        <Lock className="w-3 h-3 text-muted-foreground" />
                      ) : lesson.video_url ? (
                        <Play className="w-3 h-3 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
