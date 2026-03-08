import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Users, BookOpen, ClipboardCheck, TrendingUp, AlertCircle, Calendar, FileText, MessageSquare, Video, Award, PieChart, Brain, Wand2, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';
import { useTeacherStats } from '@/hooks/useTeacherStats';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface TeacherDashboardViewProps {
  userName: string;
}

export const TeacherDashboardView = ({ userName }: TeacherDashboardViewProps) => {
  const { courses, totalStudents, pendingCount, avgPerformance, pendingSubmissions, studentAlerts, loading } = useTeacherStats();
  const { toast } = useToast();

  // AI Lesson Generator state
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('Grade 10');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('40 minutes');
  const [generatedLesson, setGeneratedLesson] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
    { icon: PieChart, title: "Analytics", description: "Student insights", link: "/analytics", gradient: "from-purple-500 to-pink-500" },
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
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
            if (delta) {
              content += delta;
              setGeneratedLesson(content);
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error('Lesson generation error:', err);
      toast({ title: 'Failed to generate lesson', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LogoLoader size="lg" text="Loading teacher dashboard..." />
      </div>
    );
  }

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-xl">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="lesson-builder">
          <Wand2 className="w-4 h-4 mr-2" />
          AI Lesson Builder
        </TabsTrigger>
        <TabsTrigger value="marking">
          <ClipboardCheck className="w-4 h-4 mr-2" />
          Smart Marking
        </TabsTrigger>
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
              <Button asChild>
                <Link to="/create-course">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Create Course
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <OnboardingWelcomeBanner
          role="teacher"
          userName={userName}
          emoji="📚"
          subtitle="Here are some tips to make the most of your teaching tools."
          tips={[
            { icon: Wand2, title: 'AI Lesson Builder', desc: 'Generate ECZ-aligned lesson plans with AI assistance.' },
            { icon: ClipboardCheck, title: 'Smart Marking', desc: 'Use AI to auto-mark structured answers and save time.' },
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
          {/* My Classes */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                My Courses
              </CardTitle>
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
              ) : (
                courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {course.subject || 'No subject'} • {course.grade_level || 'All grades'}
                            </p>
                          </div>
                          <Badge variant={course.is_published ? 'default' : 'secondary'}>
                            {course.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Students Enrolled</p>
                            <p className="font-semibold text-lg">{course.enrollment_count}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Avg Score</p>
                            <p className="font-semibold text-lg">
                              {course.avg_score != null ? `${course.avg_score}%` : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild className="flex-1">
                            <Link to={`/course/${course.id}`}>View</Link>
                          </Button>
                          <Button size="sm" asChild className="flex-1">
                            <Link to={`/course/${course.id}/assignments`}>Assignments</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Student Alerts */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Student Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studentAlerts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No alerts — all students are performing well! 🎉
                </p>
              ) : (
                studentAlerts.map((alert, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'high' ? 'bg-destructive' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{alert.student_name}</p>
                        <p className="text-xs text-muted-foreground">{alert.course_title}</p>
                        <p className="text-xs text-destructive mt-1">{alert.issue}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pending Grading */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-green-600" />
              Pending Grading
            </CardTitle>
            <CardDescription>Submissions awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingSubmissions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No pending submissions — you're all caught up! ✅
              </p>
            ) : (
              <div className="space-y-3">
                {pendingSubmissions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <Badge variant="destructive">Ungraded</Badge>
                      <div>
                        <p className="font-medium">{sub.assignment_title}</p>
                        <p className="text-sm text-muted-foreground">
                          {sub.student_name} • {sub.course_title} • {format(new Date(sub.submitted_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/course/${sub.course_id}/assignments`}>Grade</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Teacher Tools */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Teaching Tools
            </CardTitle>
          </CardHeader>
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
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Lesson Generator
            </CardTitle>
            <CardDescription>Create ECZ-aligned lesson plans in seconds using AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-background">
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>English</option>
                  <option>Geography</option>
                  <option>History</option>
                  <option>Civic Education</option>
                  <option>Computer Studies</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Grade</label>
                <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-background">
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-background">
                  <option>40 minutes</option>
                  <option>80 minutes</option>
                  <option>120 minutes</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Topic</label>
              <Textarea
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g., Quadratic Equations, Newton's Laws of Motion, The Water Cycle..."
                className="mt-1"
              />
            </div>
            <Button className="w-full" onClick={handleGenerateLesson} disabled={isGenerating}>
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</>
              ) : (
                <><Wand2 className="w-4 h-4 mr-2" />Generate Complete Lesson Plan</>
              )}
            </Button>

            {generatedLesson && (
              <div className="mt-6 p-6 border rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Generated Lesson Plan
                </h4>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
                  {generatedLesson}
                </div>
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
            <CardDescription>AI-powered grading and feedback generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Grade Submissions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {pendingCount > 0 ? `${pendingCount} submission${pendingCount !== 1 ? 's' : ''} waiting` : 'No pending submissions'}
                  </p>
                  {courses.length > 0 && (
                    <Button className="w-full" asChild>
                      <Link to={`/course/${courses[0].id}/assignments`}>Go to Grading</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">AI Feedback Writer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate constructive feedback for student work
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
