import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, AlertCircle, Calendar, MessageSquare, Award, BookOpen, Clock, Target, Users, Activity, Bell, UserPlus, Shield, AlertTriangle, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Skeleton } from '@/components/ui/skeleton';

interface GuardianDashboardViewProps {
  userName: string;
}

export const GuardianDashboardView = ({ userName }: GuardianDashboardViewProps) => {
  const { students, loading, weeklySummary } = useGuardianData();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName}! 👪</h1>
              <p className="text-muted-foreground">
                {students.length > 0
                  ? `Monitoring ${students.length} student${students.length > 1 ? 's' : ''}`
                  : 'Link a student to start monitoring their progress'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/parent-messages">
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <OnboardingWelcomeBanner
        role="guardian"
        userName={userName}
        emoji="👨‍👩‍👧‍👦"
        subtitle="Here's how to stay connected with your child's education."
        tips={[
          { icon: TrendingUp, title: 'Track Progress', desc: "View your child's grades, scores, and learning streaks." },
          { icon: MessageSquare, title: 'Message Teachers', desc: 'Communicate directly with teachers about performance.' },
          { icon: Bell, title: 'Set Alerts', desc: 'Get notified about attendance, grades, and upcoming events.' },
          { icon: BookOpen, title: 'AI Parent Advisor', desc: 'Get AI-powered tips for supporting learning at home.' },
        ]}
      />

      {/* Empty State */}
      {students.length === 0 && (
        <Card className="border-2 border-dashed">
          <CardContent className="p-12 text-center">
            <UserPlus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Students Linked Yet</h2>
            <p className="text-muted-foreground mb-4">Ask your child to link you as a guardian from their dashboard to start monitoring their progress.</p>
          </CardContent>
        </Card>
      )}

      {students.length > 0 && (
        <>
          {/* Weekly Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                This Week's Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{weeklySummary.lessonsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{weeklySummary.quizzesTaken}</p>
                  <p className="text-xs text-muted-foreground">Quizzes</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{weeklySummary.avgScore > 0 ? `${weeklySummary.avgScore}%` : '--'}</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{weeklySummary.focusMinutes}m</p>
                  <p className="text-xs text-muted-foreground">Focus Time</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Flame className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{weeklySummary.focusSessions}</p>
                  <p className="text-xs text-muted-foreground">Focus Sessions</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
                  <p className="text-2xl font-bold">{weeklySummary.gaveUpCount}</p>
                  <p className="text-xs text-muted-foreground">Gave Up</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linked Students */}
          {students.map((student) => (
            <Card key={student.id} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <CardTitle>{student.name}</CardTitle>
                      <CardDescription>{student.grade}{student.school ? ` • ${student.school}` : ''}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{student.relationship}</Badge>
                    <Link to="/parent-children">
                      <Button size="sm" variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Enrollments Progress */}
                {student.enrollments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {student.enrollments.slice(0, 3).map((enrollment) => (
                      <Card key={enrollment.courseId}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-sm truncate">{enrollment.courseTitle}</h4>
                            </div>
                            <Progress value={enrollment.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground text-right">{enrollment.progress}% complete</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No course enrollments yet.</p>
                )}

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-muted-foreground">
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    {student.lessonCompletionsCount} lessons this week
                  </span>
                  <span className="text-muted-foreground">
                    <Target className="w-4 h-4 inline mr-1" />
                    {student.quizStats.totalAttempts} quizzes ({student.quizStats.avgScore > 0 ? `${student.quizStats.avgScore}% avg` : 'no data'})
                  </span>
                  <span className="text-muted-foreground">
                    <Shield className="w-4 h-4 inline mr-1" />
                    {student.focusStats.totalMinutes}m focus ({student.focusStats.sessionsCompleted} sessions)
                  </span>
                  {student.focusStats.gaveUpCount > 0 && (
                    <span className="text-destructive">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      {student.focusStats.gaveUpCount} gave up
                    </span>
                  )}
                  {(student as any).focusStats?.distractionCount > 0 && (
                    <span className="text-destructive">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      {(student as any).focusStats.distractionCount} distractions
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Guardian Actions</CardTitle>
          <CardDescription>Support your children's learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link to="/parental-controls">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Shield className="w-6 h-6" />
                <span className="text-xs">Parental Controls</span>
              </Button>
            </Link>
            <Link to="/parent-grades">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <TrendingUp className="w-6 h-6" />
                <span className="text-xs">View Grades</span>
              </Button>
            </Link>
            <Link to="/parent-alerts">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Bell className="w-6 h-6" />
                <span className="text-xs">Alerts</span>
              </Button>
            </Link>
            <Link to="/parent-progress">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Activity className="w-6 h-6" />
                <span className="text-xs">Progress</span>
              </Button>
            </Link>
            <Link to="/parent-children">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span className="text-xs">My Children</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
