import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenTool, FileText, Plus, Users, Zap, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SESSION_TYPES = [
  { value: 'whiteboard', label: '🎨 Whiteboard', icon: PenTool },
  { value: 'shared_notes', label: '📝 Shared Notes', icon: FileText },
  { value: 'code_collab', label: '💻 Code Collab', icon: Zap },
];

const LiveCollaborationPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [sessionType, setSessionType] = useState('whiteboard');
  const [subject, setSubject] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['collab-sessions', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('collaboration_sessions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);
      return data || [];
    },
    enabled: !!user,
  });

  const createSession = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from('collaboration_sessions').insert({
        title,
        session_type: sessionType,
        created_by: user?.id,
        participants: [user?.id],
        subject,
        content_data: { notes: '', drawings: [] },
        is_active: true,
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success('Session created!');
      setShowCreate(false);
      setTitle('');
      setActiveSession(data.id);
      queryClient.invalidateQueries({ queryKey: ['collab-sessions'] });
    },
    onError: () => toast.error('Could not create session'),
  });

  const joinSession = useMutation({
    mutationFn: async (sessionId: string) => {
      const session = sessions?.find(s => s.id === sessionId);
      const currentParticipants = (session?.participants as string[]) || [];
      if (!currentParticipants.includes(user?.id || '')) {
        const { error } = await supabase.from('collaboration_sessions')
          .update({ participants: [...currentParticipants, user?.id] })
          .eq('id', sessionId);
        if (error) throw error;
      }
      return sessionId;
    },
    onSuccess: (sessionId) => {
      setActiveSession(sessionId);
      toast.success('Joined session!');
    },
  });

  const saveNotes = useMutation({
    mutationFn: async () => {
      if (!activeSession) return;
      const { error } = await supabase.from('collaboration_sessions')
        .update({ content_data: { notes: noteContent }, updated_at: new Date().toISOString() })
        .eq('id', activeSession);
      if (error) throw error;
    },
    onSuccess: () => toast.success('Notes saved!'),
  });

  const currentSession = sessions?.find(s => s.id === activeSession);

  if (activeSession && currentSession) {
    return (
      <div className="space-y-4 pb-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">{currentSession.title}</h2>
            <p className="text-xs text-muted-foreground">
              {((currentSession.participants as string[]) || []).length} participant(s) • {currentSession.session_type}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setActiveSession(null)} className="text-xs h-7">
            Leave
          </Button>
        </div>

        <Card className="border-border/50 bg-card min-h-[400px]">
          <CardContent className="p-4">
            {currentSession.session_type === 'whiteboard' ? (
              <div className="border-2 border-dashed border-border rounded-xl min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <PenTool className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Whiteboard — Draw & collaborate</p>
                  <p className="text-xs text-muted-foreground mt-1">Real-time canvas coming soon!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Textarea
                  placeholder="Start typing shared notes here..."
                  value={noteContent || (currentSession.content_data as any)?.notes || ''}
                  onChange={e => setNoteContent(e.target.value)}
                  className="min-h-[300px] text-sm font-mono"
                />
                <Button size="sm" onClick={() => saveNotes.mutate()} disabled={saveNotes.isPending} className="text-xs">
                  {saveNotes.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                  Save Notes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-green-500/10 via-primary/5 to-transparent rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <PenTool className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Live Collaboration</h1>
              <p className="text-xs text-muted-foreground">Whiteboard, shared notes & code</p>
            </div>
          </div>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 text-xs"><Plus className="w-3 h-3 mr-1" /> New</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader><DialogTitle className="text-base">New Session</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Session title" value={title} onChange={e => setTitle(e.target.value)} className="text-sm" />
                <Select value={sessionType} onValueChange={setSessionType}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SESSION_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Subject (optional)" value={subject} onChange={e => setSubject(e.target.value)} className="text-sm" />
                <Button onClick={() => createSession.mutate()} disabled={!title || createSession.isPending} className="w-full text-sm">
                  {createSession.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Start Session'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (sessions || []).length === 0 ? (
        <div className="text-center py-8">
          <PenTool className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No active sessions. Start one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions?.map(session => {
            const typeInfo = SESSION_TYPES.find(t => t.value === session.session_type) || SESSION_TYPES[0];
            const participants = (session.participants as string[]) || [];
            return (
              <Card key={session.id} className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-[10px]">{typeInfo.label}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" /> {participants.length}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{session.title}</h3>
                  {session.subject && <p className="text-xs text-muted-foreground mt-0.5">{session.subject}</p>}
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Started {format(new Date(session.created_at), 'MMM d, h:mm a')}
                  </p>
                  <Button
                    size="sm"
                    className="w-full mt-3 text-xs h-8"
                    onClick={() => joinSession.mutate(session.id)}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" /> Join Session
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LiveCollaborationPage;
