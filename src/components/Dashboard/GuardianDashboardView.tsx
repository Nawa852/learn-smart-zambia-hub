import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, AlertCircle, MessageSquare, BookOpen, Target, Users, Activity, Bell, UserPlus, Shield, AlertTriangle, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Skeleton } from '@/components/ui/skeleton';
import { GuardianWeeklyReport } from './GuardianWeeklyReport';
import { GuardianCourseTracker } from './GuardianCourseTracker';
import { GuardianActivityFeed } from './GuardianActivityFeed';
import { GuardianRewardSystem } from './GuardianRewardSystem';
import { ScreenTimeSummary } from './ScreenTimeSummary';
import { ProfileCompletenessCard } from './ProfileCompletenessCard';

interface GuardianDashboardViewProps {
  userName: string;
}

export const GuardianDashboardView = ({ userName }: GuardianDashboardViewProps) => {
  const { students, loading } = useGuardianData();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ProfileCompletenessCard />

      {/* Empty State */}
      {students.length === 0 && (
        <Card className="border-2 border-dashed border-border/40">
          <CardContent className="p-10 text-center">
            <UserPlus className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <h2 className="text-lg font-bold mb-1">Link your first child</h2>
            <p className="text-sm text-muted-foreground mb-4">Connect to your child's account to monitor progress, attendance, and grades.</p>
            <Link to="/family?tab=children"><Button className="gap-2"><UserPlus className="w-4 h-4" /> Add a child</Button></Link>
          </CardContent>
        </Card>
      )}

      {students.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Students + Activity */}
          <div className="lg:col-span-2 space-y-5">
            {/* Linked Students */}
            {students.map((student) => (
              <Card key={student.id} className="border-border/40">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-base">{student.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{student.grade}{student.school ? ` · ${student.school}` : ''}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{student.relationship}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Enrollments */}
                  {student.enrollments.length > 0 ? (
                    <div className="space-y-2">
                      {student.enrollments.slice(0, 3).map((enrollment) => (
                        <div key={enrollment.courseId} className="flex items-center gap-3 p-2.5 rounded-xl border border-border/30">
                          <BookOpen className="w-4 h-4 text-primary shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{enrollment.courseTitle}</p>
                            <Progress value={enrollment.progress} className="h-1.5 mt-1" />
                          </div>
                          <span className="text-xs font-bold text-foreground shrink-0">{enrollment.progress}%</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No course enrollments yet.</p>
                  )}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-secondary/30">
                      <p className="text-base font-bold">{student.lessonCompletionsCount}</p>
                      <p className="text-[9px] text-muted-foreground">Lessons</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/30">
                      <p className="text-base font-bold">{student.quizStats.totalAttempts}</p>
                      <p className="text-[9px] text-muted-foreground">Quizzes</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/30">
                      <p className="text-base font-bold">{student.focusStats.totalMinutes}m</p>
                      <p className="text-[9px] text-muted-foreground">Focus</p>
                    </div>
                  </div>

                  {student.focusStats.gaveUpCount > 0 && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Gave up {student.focusStats.gaveUpCount} time{student.focusStats.gaveUpCount > 1 ? 's' : ''} recently
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Activity Feed */}
            <GuardianActivityFeed />
          </div>

          {/* Right: Widgets */}
          <div className="space-y-5">
            <GuardianWeeklyReport />
            <ScreenTimeSummary />
            <GuardianCourseTracker />
            <GuardianRewardSystem />

            {/* Quick Actions */}
            <Card className="border-border/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Controls', icon: Shield, href: '/family?tab=controls' },
                  { label: 'Grades', icon: TrendingUp, href: '/family?tab=grades' },
                  { label: 'Alerts', icon: Bell, href: '/family?tab=alerts' },
                  { label: 'Messages', icon: MessageSquare, href: '/connect?tab=messenger' },
                ].map(a => (
                  <Link key={a.href} to={a.href}>
                    <Button variant="outline" className="w-full h-12 flex-col gap-1 text-[10px] border-border/40">
                      <a.icon className="w-4 h-4" />
                      {a.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
