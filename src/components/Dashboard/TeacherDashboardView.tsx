import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Users, BookOpen, ClipboardCheck, TrendingUp, AlertCircle, FileText, MessageSquare, Video, Award, PieChart, Brain, Wand2, Sparkles, Loader2, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ClassPerformanceHeatmap } from './ClassPerformanceHeatmap';
import { GradingQueue } from './GradingQueue';
import { AttendanceOverview } from './AttendanceOverview';
import { QuickAnnouncementWidget } from './QuickAnnouncementWidget';
import { TopStudentsWidget } from './TopStudentsWidget';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';
import { useTeacherStats } from '@/hooks/useTeacherStats';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';

interface TeacherDashboardViewProps {
  userName: string;
}

export const TeacherDashboardView = ({ userName }: TeacherDashboardViewProps) => {
  const { courses, totalStudents, pendingCount, avgPerformance, pendingSubmissions, studentAlerts, loading, refetch } = useTeacherStats();
  const { user } = useSecureAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // AI Lesson Generator state
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('Grade 10');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('40 minutes');
  const [generatedLesson, setGeneratedLesson] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Inline grading state
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');
  const [isGrading, setIsGrading] = useState(false);

  const quickStats = [
    { title: "Total Students", value: totalStudents.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: `${courses.length} course${courses.length !== 1 ? 's' : ''}` },
    { title: "Active Classes", value: courses.filter(c => c.is_published).length.toString(), icon: BookOpen, color: "text-green-600", bg: "bg-green-50", change: `${courses.length} total` },
    { title: "Pending Grading", value: pendingCount.toString(), icon: ClipboardCheck, color: "text-orange-600", bg: "bg-orange-50", change: "To review" },
    { title: "Avg Performance", value: avgPerformance > 0 ? `${avgPerformance}%` : "N/A", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50", change: avgPerformance > 0 ? "From graded work" : "No grades yet" },
  ];

  const teacherTools = [
    { icon: FileText, title: "Course Builder", description: "Create lessons", link: "/create-course", gradient: "from-blue-500 to-purple-600" },
    { icon: Video, title: "Live Classes", description: "Virtual classroom", link: "/classroom", gradient: "from-green-500 to-teal-500" },
    { icon: ClipboardCheck, title: "Course Catalog", description: "Browse courses", link: "/course-catalog", gradient: "from-orange-500 to-red-500" },
    { icon: PieChart, title: "Analytics", description: "Student insights", link: "/teacher-analytics", gradient: "from-purple-500 to-pink-500" },
    { icon: MessageSquare, title: "Study Groups", description: "Group chats", link: "/study-groups", gradient: "from-cyan-500 to-blue-500" },
    { icon: Award, title: "ECZ Resources", description: "Past papers", link: "/zambian-resources", gradient: "from-yellow-500 to-orange-500" },
  ];

  const handleGenerateLesson = async () => {
    if (!topic.trim()) {
      toast({ title: "Please enter a topic", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    setGeneratedLesson('');

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-lesson-generator`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
          body: JSON.stringify({ subject, grade, topic, duration }),
        }
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: 'Generation failed' }));
        toast({ title: err.error || 'Generation failed', variant: 'destructive' });
        setIsGenerating(false);
        return;
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error('No stream');
      const decoder = new TextDecoder();
      let buffer = '';
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) { content += delta; setGeneratedLesson(content); }
          } catch { buffer = line + '\n' + buffer; break; }
        }
      }
    } catch (err) {
      console.error('Lesson generation error:', err);
      toast({ title: 'Failed to generate lesson', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAsCourse = async () => {
    if (!user?.id || !generatedLesson) return;
    setIsSaving(true);
    try {
      const { data: course, error: courseErr } = await supabase
        .from('courses')
        .insert({ title: `${subject}: ${topic}`, description: `AI-generated lesson plan for ${grade}`, subject, grade_level: grade, created_by: user.id, is_published: false })
        .select('id')
        .single();

      if (courseErr || !course) throw courseErr;

      await supabase.from('lessons').insert({ course_id: course.id, title: topic, content: generatedLesson, order_index: 0, duration_minutes: parseInt(duration) || 40 });

      toast({ title: 'Course created!', description: 'Your AI-generated lesson has been saved as a draft course.' });
      navigate(`/course/${course.id}`);
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to save', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInlineGrade = async (submissionId: string) => {
    if (!gradeScore.trim()) { toast({ title: 'Enter a score', variant: 'destructive' }); return; }
    setIsGrading(true);
    try {
      const { error } = await supabase.from('submissions').update({
        score: parseFloat(gradeScore),
        feedback: gradeFeedback || null,
        graded_at: new Date().toISOString(),
      }).eq('id', submissionId);

      if (error) throw error;
      toast({ title: 'Graded successfully!' });
      setGradingId(null);
      setGradeScore('');
      setGradeFeedback('');
      refetch();
    } catch (err) {
      console.error(err);
      toast({ title: 'Grading failed', variant: 'destructive' });
    } finally {
      setIsGrading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><LogoLoader size="lg" text="Loading teacher dashboard..." /></div>;
  }

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-xl">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="lesson-builder"><Wand2 className="w-4 h-4 mr-2" />AI Lesson Builder</TabsTrigger>
        <TabsTrigger value="marking"><ClipboardCheck className="w-4 h-4 mr-2" />Smart Marking</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Welcome */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {userName}! 👨‍🏫</h1>
                <p className="text-muted-foreground">
                  {pendingCount > 0 ? `You have ${pendingCount} submission${pendingCount !== 1 ? 's' : ''} to grade` : 'All caught up — no pending grades!'}
                </p>
              </div>
              <Button asChild><Link to="/create-course"><BookOpen className="w-4 h-4 mr-2" />Create Course</Link></Button>
            </div>
          </CardContent>
        </Card>

        <OnboardingWelcomeBanner
          role="teacher" userName={userName} emoji="📚" subtitle="Here are some tips to make the most of your teaching tools."
          tips={[
            { icon: Wand2, title: 'AI Lesson Builder', desc: 'Generate ECZ-aligned lesson plans with AI assistance.' },
            { icon: ClipboardCheck, title: 'Smart Marking', desc: 'Grade submissions inline with score and feedback.' },
            { icon: Users, title: 'Track Students', desc: 'Monitor attendance, performance, and engagement.' },
            { icon: PieChart, title: 'Class Analytics', desc: 'View detailed reports on class and student progress.' },
          ]}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: My Classes + Pending */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />My Courses</CardTitle>
                <CardDescription>Your created courses and enrollment stats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No courses yet</p>
                    <p className="text-sm mb-4">Create your first course to get started</p>
                    <Button asChild size="sm"><Link to="/create-course">Create Course</Link></Button>
                  </div>
                ) : courses.map(course => (
                  <Card key={course.id} className="border-border/40">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base">{course.title}</h3>
                          <p className="text-xs text-muted-foreground">{course.subject || 'No subject'} • {course.grade_level || 'All grades'}</p>
                        </div>
                        <Badge variant={course.is_published ? 'default' : 'secondary'} className="text-[10px]">{course.is_published ? 'Published' : 'Draft'}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><p className="text-muted-foreground mb-0.5 text-xs">Students</p><p className="font-bold text-lg">{course.enrollment_count}</p></div>
                        <div><p className="text-muted-foreground mb-0.5 text-xs">Avg Score</p><p className="font-bold text-lg">{course.avg_score != null ? `${course.avg_score}%` : 'N/A'}</p></div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild className="flex-1"><Link to={`/course/${course.id}`}>View</Link></Button>
                        <Button size="sm" asChild className="flex-1"><Link to={`/course/${course.id}/assignments`}>Assignments</Link></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Student Performance Alerts */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertCircle className="w-5 h-5 text-warning" />Performance Alerts</CardTitle>
                <CardDescription>Students scoring below 50%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentAlerts.length === 0 ? (
                  <div className="text-center py-6">
                    <TrendingUp className="w-10 h-10 mx-auto mb-2 text-accent opacity-60" />
                    <p className="text-sm text-muted-foreground">All students performing well! 🎉</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive" className="text-[10px]">{studentAlerts.filter(a => a.severity === 'high').length} critical</Badge>
                      <Badge variant="secondary" className="text-[10px]">{studentAlerts.filter(a => a.severity === 'medium').length} warning</Badge>
                    </div>
                    {studentAlerts.map((alert, index) => (
                      <div key={index} className={`p-3 border rounded-xl transition-all ${alert.severity === 'high' ? 'border-destructive/30 bg-destructive/5' : 'border-warning/30 bg-warning/5'}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${alert.severity === 'high' ? 'bg-destructive' : 'bg-warning'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{alert.student_name}</p>
                            <p className="text-xs text-muted-foreground truncate">{alert.course_title}</p>
                            <p className={`text-xs mt-1 font-medium ${alert.severity === 'high' ? 'text-destructive' : 'text-warning'}`}>{alert.issue}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="shrink-0 text-xs h-7" onClick={() => navigate('/connect?tab=messenger')}>
                            <MessageSquare className="w-3 h-3 mr-1" />Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Interactive Widgets */}
          <div className="space-y-5">
            <ClassPerformanceHeatmap />
            <GradingQueue />
            <AttendanceOverview />
            <QuickAnnouncementWidget />
            <TopStudentsWidget />
          </div>
        </div>

        {/* Pending Grading */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardCheck className="w-5 h-5 text-green-600" />Pending Grading</CardTitle>
            <CardDescription>Submissions awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingSubmissions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No pending submissions — you're all caught up! ✅</p>
            ) : (
              <div className="space-y-3">
                {pendingSubmissions.map(sub => (
                  <div key={sub.id} className="p-4 border rounded-lg hover:shadow-md transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="destructive">Ungraded</Badge>
                        <div>
                          <p className="font-medium">{sub.assignment_title}</p>
                          <p className="text-sm text-muted-foreground">{sub.student_name} • {sub.course_title} • {format(new Date(sub.submitted_at), 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                      <Button size="sm" variant={gradingId === sub.id ? 'secondary' : 'default'} onClick={() => { setGradingId(gradingId === sub.id ? null : sub.id); setGradeScore(''); setGradeFeedback(''); }}>
                        {gradingId === sub.id ? 'Cancel' : 'Grade'}
                      </Button>
                    </div>
                    {/* Inline grading form */}
                    {gradingId === sub.id && (
                      <div className="ml-4 p-4 border rounded-lg bg-muted/30 space-y-3">
                        {sub.content && <div className="text-sm text-foreground bg-background p-3 rounded border"><p className="text-xs text-muted-foreground mb-1">Student's submission:</p>{sub.content}</div>}
                        {sub.file_url && <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">View attached file</a>}
                        <div className="flex gap-3">
                          <div className="w-32">
                            <label className="text-xs font-medium text-muted-foreground">Score</label>
                            <Input type="number" min="0" max="100" placeholder="0-100" value={gradeScore} onChange={e => setGradeScore(e.target.value)} />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs font-medium text-muted-foreground">Feedback (optional)</label>
                            <Input placeholder="Great work! Consider..." value={gradeFeedback} onChange={e => setGradeFeedback(e.target.value)} />
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleInlineGrade(sub.id)} disabled={isGrading}>
                          {isGrading ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Saving...</> : <><Save className="w-3 h-3 mr-1" />Submit Grade</>}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Teacher Tools */}
        <Card className="border-0 shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-purple-600" />Teaching Tools</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {teacherTools.map((tool, index) => (
                <Link key={index} to={tool.link}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-4 text-center space-y-2">
                      <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm">{tool.title}</h3>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* AI Lesson Builder */}
      <TabsContent value="lesson-builder">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />AI Lesson Generator</CardTitle>
            <CardDescription>Create ECZ-aligned lesson plans in seconds using AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-background">
                  {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Geography', 'History', 'Civic Education', 'Computer Studies'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Grade</label>
                <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-background">
                  {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-background">
                  {['40 minutes', '80 minutes', '120 minutes'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Topic</label>
              <Textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Quadratic Equations, Newton's Laws of Motion, The Water Cycle..." className="mt-1" />
            </div>
            <Button className="w-full" onClick={handleGenerateLesson} disabled={isGenerating}>
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Wand2 className="w-4 h-4 mr-2" />Generate Complete Lesson Plan</>}
            </Button>

            {generatedLesson && (
              <div className="mt-6 p-6 border rounded-lg bg-muted/30 space-y-4">
                <h4 className="font-semibold flex items-center gap-2"><Brain className="w-5 h-5 text-primary" />Generated Lesson Plan</h4>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">{generatedLesson}</div>
                <Button onClick={handleSaveAsCourse} disabled={isSaving} className="w-full sm:w-auto">
                  {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save as Draft Course</>}
                </Button>
              </div>
            )}

            {!generatedLesson && !isGenerating && (
              <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">What will be generated:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Lesson objectives (ECZ-aligned)</li>
                  <li>✓ Starter activities</li>
                  <li>✓ Main teaching content with examples</li>
                  <li>✓ Student activities & worksheets</li>
                  <li>✓ Assessment questions</li>
                  <li>✓ Homework assignments</li>
                  <li>✓ Differentiation strategies</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Smart Marking */}
      <TabsContent value="marking">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Smart Marking System</CardTitle>
            <CardDescription>Grade submissions directly from your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardCheck className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">All caught up!</h3>
                <p className="text-muted-foreground">No pending submissions to grade.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{pendingSubmissions.length} submission{pendingSubmissions.length !== 1 ? 's' : ''} awaiting your review</p>
                {pendingSubmissions.map(sub => (
                  <div key={sub.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{sub.assignment_title}</p>
                        <p className="text-sm text-muted-foreground">{sub.student_name} • {sub.course_title} • {format(new Date(sub.submitted_at), 'MMM d, yyyy')}</p>
                      </div>
                      <Button size="sm" variant={gradingId === sub.id ? 'secondary' : 'default'} onClick={() => { setGradingId(gradingId === sub.id ? null : sub.id); setGradeScore(''); setGradeFeedback(''); }}>
                        {gradingId === sub.id ? 'Cancel' : 'Grade Now'}
                      </Button>
                    </div>
                    {sub.content && <div className="text-sm text-foreground/80 bg-muted/30 p-3 rounded border"><p className="text-xs text-muted-foreground mb-1">Submission:</p>{sub.content}</div>}
                    {sub.file_url && <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">View attached file</a>}
                    {gradingId === sub.id && (
                      <div className="p-4 border rounded-lg bg-muted/20 space-y-3">
                        <div className="flex gap-3">
                          <div className="w-32">
                            <label className="text-xs font-medium text-muted-foreground">Score</label>
                            <Input type="number" min="0" max="100" placeholder="0-100" value={gradeScore} onChange={e => setGradeScore(e.target.value)} />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs font-medium text-muted-foreground">Feedback</label>
                            <Input placeholder="Well done! Consider improving..." value={gradeFeedback} onChange={e => setGradeFeedback(e.target.value)} />
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleInlineGrade(sub.id)} disabled={isGrading}>
                          {isGrading ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Saving...</> : <><Save className="w-3 h-3 mr-1" />Submit Grade</>}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
