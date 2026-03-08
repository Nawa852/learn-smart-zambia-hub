import { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Search, Filter, Plus, CheckCircle, Layers, ArrowRight
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  grade_level: string | null;
  thumbnail_url: string | null;
  created_by: string | null;
  is_published: boolean;
  created_at: string;
  lesson_count?: number;
}

const subjectColors: Record<string, string> = {
  Mathematics: 'from-blue-500 to-cyan-500',
  English: 'from-purple-500 to-pink-500',
  Science: 'from-emerald-500 to-green-500',
  Physics: 'from-indigo-500 to-blue-500',
  Chemistry: 'from-orange-500 to-yellow-500',
  Biology: 'from-green-500 to-teal-500',
  Geography: 'from-amber-500 to-orange-500',
  History: 'from-rose-500 to-red-500',
  'Civic Education': 'from-violet-500 to-purple-500',
  'Computer Studies': 'from-slate-500 to-gray-500',
};

const CourseCatalogPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (coursesData) {
        const courseIds = coursesData.map(c => c.id);
        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('course_id')
          .in('course_id', courseIds.length ? courseIds : ['none']);

        const lessonCounts: Record<string, number> = {};
        lessonsData?.forEach(l => { lessonCounts[l.course_id] = (lessonCounts[l.course_id] || 0) + 1; });
        setCourses(coursesData.map(c => ({ ...c, lesson_count: lessonCounts[c.id] || 0 })));
      }

      if (user) {
        const { data: enrollData } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', user.id);
        if (enrollData) setEnrollments(new Set(enrollData.map(e => e.course_id)));
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleEnroll = async (courseId: string) => {
    if (!user) { toast.error('Please sign in to enroll'); return; }
    setEnrolling(true);
    const { error } = await supabase.from('enrollments').insert({ user_id: user.id, course_id: courseId });
    if (error) {
      toast.error(error.message.includes('duplicate') ? 'Already enrolled!' : 'Failed to enroll');
    } else {
      setEnrollments(prev => new Set([...prev, courseId]));
      toast.success('Successfully enrolled!');
    }
    setEnrolling(false);
    setSelectedCourse(null);
  };

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || (c.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchSubject = subjectFilter === 'all' || c.subject === subjectFilter;
    const matchGrade = gradeFilter === 'all' || c.grade_level === gradeFilter;
    return matchSearch && matchSubject && matchGrade;
  });

  const uniqueSubjects = [...new Set(courses.map(c => c.subject).filter(Boolean))];
  const uniqueGrades = [...new Set(courses.map(c => c.grade_level).filter(Boolean))];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary" /> Course Catalog</h1>
          <p className="text-sm text-muted-foreground">{courses.length} courses available</p>
        </div>
        <Button onClick={() => navigate('/create-course')}><Plus className="w-4 h-4 mr-2" /> Create Course</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search courses..." className="pl-9" />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-[160px]"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Subject" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {uniqueSubjects.map(s => <SelectItem key={s!} value={s!}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Grade" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {uniqueGrades.map(g => <SelectItem key={g!} value={g!}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse"><CardContent className="p-0"><div className="h-32 bg-muted rounded-t-lg" /><div className="p-4 space-y-2"><div className="h-4 bg-muted rounded w-3/4" /><div className="h-3 bg-muted rounded w-1/2" /></div></CardContent></Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
          <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or create a new course.</p>
          <Button onClick={() => navigate('/create-course')}>Create Course</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course, i) => {
            const isEnrolled = enrollments.has(course.id);
            const gradient = subjectColors[course.subject || ''] || 'from-primary to-accent';
            return (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group" onClick={() => isEnrolled ? navigate(`/course/${course.id}`) : setSelectedCourse(course)}>
                  <div className={`h-28 bg-gradient-to-br ${gradient} relative flex items-end p-4`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 flex items-center gap-2">
                      {course.subject && <Badge className="bg-white/20 text-white border-0 text-xs">{course.subject}</Badge>}
                      {course.grade_level && <Badge className="bg-white/20 text-white border-0 text-xs">{course.grade_level}</Badge>}
                    </div>
                    {isEnrolled && <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1"><CheckCircle className="w-4 h-4 text-emerald-500" /></div>}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{course.description || 'No description'}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {course.lesson_count} lessons</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        {selectedCourse && (
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{selectedCourse.title}</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {selectedCourse.subject && <Badge variant="secondary">{selectedCourse.subject}</Badge>}
                {selectedCourse.grade_level && <Badge variant="outline">{selectedCourse.grade_level}</Badge>}
                <Badge variant="outline"><Layers className="w-3 h-3 mr-1" /> {selectedCourse.lesson_count} lessons</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{selectedCourse.description || 'No description available.'}</p>
              {enrollments.has(selectedCourse.id) ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-700">You're enrolled in this course</span>
                </div>
              ) : (
                <Button className="w-full" onClick={() => handleEnroll(selectedCourse.id)} disabled={enrolling}>
                  {enrolling ? 'Enrolling...' : 'Enroll Now'} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CourseCatalogPage;
