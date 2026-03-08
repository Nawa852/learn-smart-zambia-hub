import { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen, Brain, Target, Trophy, Clock, ArrowRight,
  Layers, CheckCircle, Flame, TrendingUp, Sparkles,
  MessageSquare, ClipboardCheck, GraduationCap
} from 'lucide-react';

interface EnrolledCourse {
  id: string;
  title: string;
  subject: string | null;
  grade_level: string | null;
  progress: number;
  lesson_count: number;
  completed_count: number;
}

interface UpcomingAssignment {
  id: string;
  title: string;
  due_date: string | null;
  course_title: string;
  course_id: string;
  max_score: number;
  is_submitted: boolean;
}

interface DashboardStats {
  totalCourses: number;
  completedLessons: number;
  totalLessons: number;
  averageProgress: number;
  streak: number;
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

const subjectColors: Record<string, string> = {
  Mathematics: 'from-blue-500 to-cyan-500',
  English: 'from-purple-500 to-pink-500',
  Science: 'from-emerald-500 to-green-500',
  Physics: 'from-indigo-500 to-blue-500',
  Chemistry: 'from-orange-500 to-yellow-500',
  Biology: 'from-green-500 to-teal-500',
};

export const StudentDashboardView = ({ userName }: { userName: string }) => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [assignments, setAssignments] = useState<UpcomingAssignment[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ totalCourses: 0, completedLessons: 0, totalLessons: 0, averageProgress: 0, streak: 3 });
  const [loading, setLoading] = useState(true);

  const displayName = profile?.full_name || userName || 'Learner';

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Fetch enrollments with course data
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id, progress, courses(id, title, subject, grade_level)')
        .eq('user_id', user.id);

      if (enrollments) {
        const courseIds = enrollments.map(e => e.course_id);

        // Fetch lesson counts and completions in parallel
        const [{ data: lessons }, { data: completions }] = await Promise.all([
          supabase.from('lessons').select('id, course_id').in('course_id', courseIds.length ? courseIds : ['none']),
          supabase.from('lesson_completions').select('lesson_id, course_id').eq('user_id', user.id),
        ]);

        const lessonMap: Record<string, number> = {};
        lessons?.forEach(l => { lessonMap[l.course_id] = (lessonMap[l.course_id] || 0) + 1; });

        const completionMap: Record<string, number> = {};
        completions?.forEach(c => { completionMap[c.course_id] = (completionMap[c.course_id] || 0) + 1; });

        const enrolledCourses: EnrolledCourse[] = enrollments.map((e: any) => ({
          id: e.courses?.id || e.course_id,
          title: e.courses?.title || 'Course',
          subject: e.courses?.subject,
          grade_level: e.courses?.grade_level,
          progress: e.progress || 0,
          lesson_count: lessonMap[e.course_id] || 0,
          completed_count: completionMap[e.course_id] || 0,
        }));

        setCourses(enrolledCourses);

        const totalLessons = enrolledCourses.reduce((s, c) => s + c.lesson_count, 0);
        const completedLessons = enrolledCourses.reduce((s, c) => s + c.completed_count, 0);
        setStats({
          totalCourses: enrolledCourses.length,
          completedLessons,
          totalLessons,
          averageProgress: enrolledCourses.length > 0 ? enrolledCourses.reduce((s, c) => s + c.progress, 0) / enrolledCourses.length : 0,
          streak: 3,
        });

        // Fetch upcoming assignments
        if (courseIds.length > 0) {
          const { data: assignmentsData } = await supabase
            .from('assignments')
            .select('id, title, due_date, max_score, course_id, courses:course_id(title)')
            .in('course_id', courseIds)
            .order('due_date', { ascending: true })
            .limit(5);

          const { data: subs } = await supabase
            .from('submissions')
            .select('assignment_id')
            .eq('user_id', user.id);
          const submittedSet = new Set(subs?.map(s => s.assignment_id) || []);

          if (assignmentsData) {
            setAssignments(assignmentsData.map((a: any) => ({
              ...a,
              course_title: a.courses?.title || 'Course',
              is_submitted: submittedSet.has(a.id),
            })));
          }
        }
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-muted rounded-xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
          </div>
          <div className="h-48 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome Card */}
      <motion.div variants={item}>
        <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{greeting()}, {displayName}! 👋</h1>
                <p className="text-muted-foreground mt-1">
                  {stats.totalCourses > 0
                    ? `You're enrolled in ${stats.totalCourses} course${stats.totalCourses !== 1 ? 's' : ''} · ${stats.completedLessons}/${stats.totalLessons} lessons done`
                    : 'Start by enrolling in a course from the catalog!'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-semibold">{stats.streak} day streak</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Courses', value: stats.totalCourses, icon: BookOpen, color: 'text-blue-500' },
          { label: 'Lessons Done', value: stats.completedLessons, icon: CheckCircle, color: 'text-emerald-500' },
          { label: 'Avg Progress', value: `${Math.round(stats.averageProgress)}%`, icon: TrendingUp, color: 'text-purple-500' },
          { label: 'Assignments', value: assignments.filter(a => !a.is_submitted).length, icon: ClipboardCheck, color: 'text-amber-500' },
        ].map((s, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* My Courses */}
        <motion.div variants={item} className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> My Courses
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/course-catalog')}>
                  Browse All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {courses.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground mb-3">No courses yet</p>
                  <Button size="sm" onClick={() => navigate('/course-catalog')}>
                    <Sparkles className="w-4 h-4 mr-1" /> Explore Courses
                  </Button>
                </div>
              ) : (
                courses.slice(0, 4).map(course => {
                  const gradient = subjectColors[course.subject || ''] || 'from-primary to-accent';
                  const pct = course.lesson_count > 0 ? (course.completed_count / course.lesson_count) * 100 : 0;
                  return (
                    <div
                      key={course.id}
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/30 cursor-pointer transition-all"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{course.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={pct} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {course.completed_count}/{course.lesson_count}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={item} className="space-y-6">
          {/* Upcoming Assignments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-primary" /> Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {assignments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No assignments yet 🎉</p>
              ) : (
                assignments.slice(0, 4).map(a => (
                  <div
                    key={a.id}
                    onClick={() => navigate(`/course/${a.course_id}/assignments`)}
                    className="p-2.5 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                      {a.is_submitted ? (
                        <Badge variant="secondary" className="text-[10px] shrink-0">Done</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] shrink-0">Pending</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.course_title}</p>
                    {a.due_date && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(a.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: 'AI Study Buddy', icon: Brain, path: '/ai', color: 'text-purple-500' },
                { label: 'Study Groups', icon: MessageSquare, path: '/study-chat', color: 'text-blue-500' },
                { label: 'ECZ Past Papers', icon: Target, path: '/ecz-past-papers', color: 'text-amber-500' },
                { label: 'Achievements', icon: Trophy, path: '/achievements', color: 'text-emerald-500' },
              ].map(action => (
                <Button
                  key={action.path}
                  variant="ghost"
                  className="w-full justify-start h-auto py-2.5"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className={`w-4 h-4 mr-2.5 ${action.color}`} />
                  <span className="text-sm">{action.label}</span>
                  <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
