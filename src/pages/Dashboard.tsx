
import React from 'react';
import { EnhancedLayout } from '@/components/layout/EnhancedLayout';
import { StatsOverview } from '@/components/enhanced/StatsOverview';
import { QuickActions } from '@/components/enhanced/QuickActions';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { useCourses } from '@/hooks/useCourses';
import { 
  BookOpen, Clock, TrendingUp, Bell, Calendar,
  ChevronRight, Star, Users, Award
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { enrolledCourses } = useCourses();

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const recentActivity = [
    { action: 'Completed lesson', course: 'React Fundamentals', time: '2 hours ago' },
    { action: 'Started quiz', course: 'JavaScript Basics', time: '1 day ago' },
    { action: 'Joined study group', course: 'Web Development', time: '2 days ago' },
  ];

  const upcomingEvents = [
    { title: 'AI Study Session', time: 'Today 3:00 PM', type: 'Study Group' },
    { title: 'Math Quiz Due', time: 'Tomorrow 11:59 PM', type: 'Assignment' },
    { title: 'Weekly Mentor Meeting', time: 'Friday 2:00 PM', type: 'Meeting' },
  ];

  return (
    <EnhancedLayout
      title={`${getCurrentGreeting()}, ${profile?.full_name || user?.email?.split('@')[0] || 'Student'}!`}
      description="Ready to continue your learning journey?"
      showHeader={true}
      headerActions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Continue Learning */}
            <EnhancedCard
              title="Continue Learning"
              description="Pick up where you left off"
              variant="gradient"
            >
              <div className="space-y-4">
                {enrolledCourses?.slice(0, 3).map((enrollment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/70 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{enrollment.course?.title}</h3>
                        <p className="text-sm text-gray-600">
                          {enrollment.course?.instructor?.full_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{enrollment.progress_percentage || 0}%</p>
                        <Progress value={enrollment.progress_percentage || 0} className="w-20" />
                      </div>
                      <Button size="sm" variant="ghost">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </EnhancedCard>

            {/* Recent Activity */}
            <EnhancedCard
              title="Recent Activity"
              description="Your latest learning actions"
            >
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.course}</p>
                    </div>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </EnhancedCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Learning Goals */}
            <EnhancedCard
              title="Today's Goals"
              badge="3/5"
              badgeVariant="secondary"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-sm line-through text-gray-500">Complete React lesson</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-sm line-through text-gray-500">Review flashcards</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-sm line-through text-gray-500">Join study group</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  <span className="text-sm">Practice coding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  <span className="text-sm">Submit assignment</span>
                </div>
              </div>
            </EnhancedCard>

            {/* Upcoming Events */}
            <EnhancedCard
              title="Upcoming Events"
              description="Don't miss these important dates"
            >
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">{event.type}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </p>
                  </div>
                ))}
              </div>
            </EnhancedCard>

            {/* Achievements */}
            <EnhancedCard
              title="Recent Achievements"
              description="Keep up the great work!"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Course Completion</p>
                    <p className="text-xs text-gray-600">JavaScript Fundamentals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Study Group Leader</p>
                    <p className="text-xs text-gray-600">Led 5 study sessions</p>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </div>
        </div>
      </div>
    </EnhancedLayout>
  );
};

export default Dashboard;
