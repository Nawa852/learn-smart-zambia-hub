import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Sparkles, Star, MessageSquare, UserPlus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const SUBJECTS = ['Mathematics', 'Science', 'English', 'Biology', 'Chemistry', 'Physics', 'Social Studies', 'Geography'];

const PeerMatchingPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const { data: existingMatches, isLoading: loadingMatches } = useQuery({
    queryKey: ['peer-matches', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('peer_matches')
        .select('*')
        .or(`requester_id.eq.${user?.id},matched_user_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  const findMatchesMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('peer-matcher', {
        body: { subjects: selectedSubjects, grade_level: null }
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data?.matches?.length > 0) {
        toast.success(`Found ${data.matches.length} study buddies!`);
      } else {
        toast.info('No matches found yet. Try different subjects or invite classmates!');
      }
    },
    onError: () => toast.error('Could not find matches. Try again.'),
  });

  const sendRequestMutation = useMutation({
    mutationFn: async (match: any) => {
      const { error } = await supabase.from('peer_matches').insert({
        requester_id: user?.id,
        matched_user_id: match.user_id,
        match_score: match.score,
        subjects: match.complementary_subjects || selectedSubjects,
        message: match.reason,
        status: 'pending',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Request sent!');
      queryClient.invalidateQueries({ queryKey: ['peer-matches'] });
    },
  });

  const toggleSubject = (s: string) => {
    setSelectedSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const aiMatches = findMatchesMutation.data?.matches || [];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Find Study Buddies</h1>
            <p className="text-xs text-muted-foreground">AI-powered peer matching</p>
          </div>
        </div>
      </div>

      {/* Subject Selection */}
      <Card className="border-border/50 bg-card shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Select Subjects You Need Help With
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {SUBJECTS.map(s => (
              <Badge
                key={s}
                variant={selectedSubjects.includes(s) ? 'default' : 'outline'}
                className="cursor-pointer text-xs transition-all hover:scale-105"
                onClick={() => toggleSubject(s)}
              >
                {s}
              </Badge>
            ))}
          </div>
          <Button
            onClick={() => findMatchesMutation.mutate()}
            disabled={findMatchesMutation.isPending || selectedSubjects.length === 0}
            className="w-full"
          >
            {findMatchesMutation.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Finding Matches...</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" /> Find Study Buddies</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* AI Matches */}
      {aiMatches.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">🎯 AI Recommended Matches</h2>
          {aiMatches.map((match: any, i: number) => (
            <Card key={i} className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={match.avatar_url} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {(match.full_name || '?')[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{match.full_name}</p>
                    <p className="text-xs text-muted-foreground">{match.grade || 'Student'} • {match.school || 'Zambia'}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">{match.score}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">"{match.reason}"</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(match.complementary_subjects || []).map((s: string) => (
                    <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                    <MessageSquare className="w-3 h-3 mr-1" /> Message
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs h-8"
                    onClick={() => sendRequestMutation.mutate(match)}
                    disabled={sendRequestMutation.isPending}
                  >
                    <UserPlus className="w-3 h-3 mr-1" /> Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Existing Matches */}
      {(existingMatches || []).length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">📚 Your Study Buddies</h2>
          {existingMatches?.map((m: any) => (
            <Card key={m.id} className="border-border/50 bg-card p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{m.message || 'Study buddy'}</p>
                    <div className="flex gap-1 mt-0.5">
                      {(m.subjects || []).slice(0, 3).map((s: string) => (
                        <Badge key={s} variant="outline" className="text-[9px] h-4">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge variant={m.status === 'accepted' ? 'default' : 'secondary'} className="text-[10px]">
                  {m.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loadingMatches && (existingMatches || []).length === 0 && aiMatches.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Select subjects and find your study buddies!</p>
        </div>
      )}
    </div>
  );
};

export default PeerMatchingPage;
