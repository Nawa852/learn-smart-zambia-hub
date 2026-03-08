import React from 'react';
import { BarChart3, Users, BookOpen, School, GraduationCap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const MinistryLiveStatsPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['platform-live-stats'],
    queryFn: async () => {
      const { data } = await supabase.rpc('get_platform_stats');
      return data as any;
    },
    refetchInterval: 30000,
  });

  const items = [
    { label: 'Total Students', value: stats?.total_students || 0, icon: Users, color: 'text-blue-500' },
    { label: 'Total Teachers', value: stats?.total_teachers || 0, icon: GraduationCap, color: 'text-green-500' },
    { label: 'Total Courses', value: stats?.total_courses || 0, icon: BookOpen, color: 'text-purple-500' },
    { label: 'Total Schools', value: stats?.total_schools || 0, icon: School, color: 'text-orange-500' },
    { label: 'Total Enrollments', value: stats?.total_enrollments || 0, icon: TrendingUp, color: 'text-pink-500' },
    { label: 'Average Grade', value: `${stats?.avg_grade || 0}%`, icon: BarChart3, color: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" /> Live Platform Statistics
          </h1>
          <p className="text-muted-foreground mt-1">Real-time metrics refreshed every 30 seconds</p>
        </div>
        <Badge variant="outline" className="animate-pulse bg-green-500/10 text-green-600">● Live</Badge>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <Card key={item.label} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <item.icon className={`h-10 w-10 mx-auto mb-3 ${item.color}`} />
                <p className="text-4xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinistryLiveStatsPage;
