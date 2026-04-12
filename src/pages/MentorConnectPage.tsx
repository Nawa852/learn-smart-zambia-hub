import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, UserPlus, GraduationCap, Target, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const MentorConnectPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [subjectArea, setSubjectArea] = useState('');
  const [goals, setGoals] = useState('');

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('profiles').select('role').eq('id', user?.id).single();
      return data;
    },
    enabled: !!user,
  });

  const isMentor = profile?.role === 'teacher' || profile?.role === 'entrepreneur' || profile?.role === 'developer';

  const { data: mentorships, isLoading } = useQuery({
    queryKey: ['mentorships', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('mentorships')
        .select('*')
        .or(`mentor_id.eq.${user?.id},mentee_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  // Find potential mentors (teachers, entrepreneurs, developers)
  const { data: mentors } = useQuery({
    queryKey: ['available-mentors'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, role, school, avatar_url, bio, grade')
        .in('role', ['teacher', 'entrepreneur', 'developer'])
        .neq('id', user?.id || '')
        .limit(20);
      return data || [];
    },
    enabled: !!user && !isMentor,
  });

  const requestMentorship = useMutation({
    mutationFn: async (mentorId: string) => {
      const { error } = await supabase.from('mentorships').insert({
        mentor_id: mentorId,
        mentee_id: user?.id,
        subject_area: subjectArea || 'General',
        goals: goals || 'Looking for guidance',
        status: 'pending',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Mentorship request sent!');
      queryClient.invalidateQueries({ queryKey: ['mentorships'] });
    },
    onError: () => toast.error('Could not send request'),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('mentorships').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      toast.success(`Mentorship ${vars.status}!`);
      queryClient.invalidateQueries({ queryKey: ['mentorships'] });
    },
  });

  const pendingRequests = mentorships?.filter(m => m.status === 'pending' && m.mentor_id === user?.id) || [];
  const activeConnections = mentorships?.filter(m => m.status === 'accepted') || [];

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-pink-500/10 via-primary/5 to-transparent rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {isMentor ? 'Mentor Dashboard' : 'Find a Mentor'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isMentor ? 'Guide the next generation' : 'Connect with experienced guides'}
            </p>
          </div>
        </div>
      </div>

      {/* Pending requests for mentors */}
      {isMentor && pendingRequests.length > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700 dark:text-amber-400">
              📩 {pendingRequests.length} Pending Request{pendingRequests.length > 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.map(req => (
              <div key={req.id} className="flex items-center justify-between bg-card rounded-xl p-3 border border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{req.subject_area}</p>
                  <p className="text-xs text-muted-foreground">{req.goals}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7"
                    onClick={() => updateStatus.mutate({ id: req.id, status: 'declined' })}>
                    Decline
                  </Button>
                  <Button size="sm" className="text-xs h-7"
                    onClick={() => updateStatus.mutate({ id: req.id, status: 'accepted' })}>
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Find mentors (for students) */}
      {!isMentor && (
        <>
          <Card className="border-border/50 bg-card shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">What do you need help with?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Subject area (e.g. Mathematics, Career advice)"
                value={subjectArea}
                onChange={e => setSubjectArea(e.target.value)}
                className="text-sm"
              />
              <Textarea
                placeholder="Your goals (e.g. I want to improve my ECZ exam scores)"
                value={goals}
                onChange={e => setGoals(e.target.value)}
                className="text-sm min-h-[60px]"
              />
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">🎓 Available Mentors</h2>
            {(mentors || []).length === 0 ? (
              <div className="text-center py-8">
                <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No mentors available yet</p>
              </div>
            ) : (
              mentors?.map(mentor => (
                <Card key={mentor.id} className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-pink-500/10 text-pink-600 text-xs">
                          {(mentor.full_name || '?')[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{mentor.full_name || 'Mentor'}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px] capitalize">{mentor.role}</Badge>
                          {mentor.school && <span className="text-[10px] text-muted-foreground">{mentor.school}</span>}
                        </div>
                      </div>
                    </div>
                    {mentor.bio && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{mentor.bio}</p>}
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                        <MessageSquare className="w-3 h-3 mr-1" /> Message
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs h-8"
                        onClick={() => requestMentorship.mutate(mentor.id)}
                        disabled={requestMentorship.isPending}
                      >
                        <UserPlus className="w-3 h-3 mr-1" /> Request Mentorship
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </>
      )}

      {/* Active Mentorships */}
      {activeConnections.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">🤝 Active Mentorships</h2>
          {activeConnections.map(m => (
            <Card key={m.id} className="border-green-500/30 bg-green-500/5 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.subject_area}</p>
                    <p className="text-xs text-muted-foreground">{m.goals}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 text-[10px]">Active</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorConnectPage;
