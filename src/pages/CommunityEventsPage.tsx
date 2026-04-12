import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Plus, Video, Clock, CalendarDays, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const EVENT_TYPES = [
  { value: 'study_session', label: '📚 Study Session', color: 'bg-blue-500/10 text-blue-600' },
  { value: 'workshop', label: '🛠️ Workshop', color: 'bg-purple-500/10 text-purple-600' },
  { value: 'exam_prep', label: '📝 Exam Prep', color: 'bg-amber-500/10 text-amber-600' },
  { value: 'meetup', label: '🤝 Meetup', color: 'bg-green-500/10 text-green-600' },
  { value: 'hackathon', label: '💻 Hackathon', color: 'bg-pink-500/10 text-pink-600' },
];

const CommunityEventsPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', event_type: 'study_session',
    event_date: '', location: '', is_virtual: true, meeting_link: '', subject: '', max_attendees: 50,
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ['community-events'],
    queryFn: async () => {
      const { data } = await supabase
        .from('community_events')
        .select('*')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(30);
      return data || [];
    },
  });

  const { data: myRsvps } = useQuery({
    queryKey: ['my-rsvps', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('event_attendees')
        .select('event_id, rsvp_status')
        .eq('user_id', user?.id || '');
      return data || [];
    },
    enabled: !!user,
  });

  const createEvent = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('community_events').insert({
        ...form,
        created_by: user?.id,
        max_attendees: Number(form.max_attendees),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Event created!');
      setShowCreate(false);
      setForm({ title: '', description: '', event_type: 'study_session', event_date: '', location: '', is_virtual: true, meeting_link: '', subject: '', max_attendees: 50 });
      queryClient.invalidateQueries({ queryKey: ['community-events'] });
    },
    onError: () => toast.error('Could not create event'),
  });

  const rsvpMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const existing = myRsvps?.find(r => r.event_id === eventId);
      if (existing) {
        await supabase.from('event_attendees').delete().eq('event_id', eventId).eq('user_id', user?.id || '');
      } else {
        const { error } = await supabase.from('event_attendees').insert({
          event_id: eventId, user_id: user?.id, rsvp_status: 'going',
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-rsvps'] });
      toast.success('RSVP updated!');
    },
  });

  const getTypeStyle = (type: string) => EVENT_TYPES.find(t => t.value === type) || EVENT_TYPES[0];

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-purple-500/10 via-primary/5 to-transparent rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Events & Meetups</h1>
              <p className="text-xs text-muted-foreground">Study sessions, workshops & more</p>
            </div>
          </div>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 text-xs">
                <Plus className="w-3 h-3 mr-1" /> Create
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-base">Create Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Event title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="text-sm" />
                <Textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="text-sm min-h-[60px]" />
                <Select value={form.event_type} onValueChange={v => setForm(f => ({ ...f, event_type: v }))}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input type="datetime-local" value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} className="text-sm" />
                <Input placeholder="Subject (optional)" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="text-sm" />
                <Input placeholder={form.is_virtual ? 'Meeting link' : 'Location'} value={form.is_virtual ? form.meeting_link : form.location}
                  onChange={e => setForm(f => ({ ...f, [f.is_virtual ? 'meeting_link' : 'location']: e.target.value }))} className="text-sm" />
                <div className="flex gap-2">
                  <Button size="sm" variant={form.is_virtual ? 'default' : 'outline'} className="flex-1 text-xs"
                    onClick={() => setForm(f => ({ ...f, is_virtual: true }))}>
                    <Video className="w-3 h-3 mr-1" /> Virtual
                  </Button>
                  <Button size="sm" variant={!form.is_virtual ? 'default' : 'outline'} className="flex-1 text-xs"
                    onClick={() => setForm(f => ({ ...f, is_virtual: false }))}>
                    <MapPin className="w-3 h-3 mr-1" /> In-Person
                  </Button>
                </div>
                <Button onClick={() => createEvent.mutate()} disabled={!form.title || !form.event_date || createEvent.isPending} className="w-full text-sm">
                  {createEvent.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Event'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Events List */}
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (events || []).length === 0 ? (
        <div className="text-center py-8">
          <CalendarDays className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No upcoming events. Create one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events?.map(event => {
            const typeStyle = getTypeStyle(event.event_type);
            const isRsvpd = myRsvps?.some(r => r.event_id === event.id);
            return (
              <Card key={event.id} className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-all overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${typeStyle.color} text-[10px] border-0`}>{typeStyle.label}</Badge>
                    {event.is_virtual && <Video className="w-3.5 h-3.5 text-blue-500" />}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
                  {event.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>}
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(event.event_date), 'MMM d, h:mm a')}
                    </div>
                    {event.subject && (
                      <Badge variant="outline" className="text-[10px] h-4">{event.subject}</Badge>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={isRsvpd ? 'outline' : 'default'}
                    className="w-full mt-3 text-xs h-8"
                    onClick={() => rsvpMutation.mutate(event.id)}
                  >
                    {isRsvpd ? '✓ Going — Tap to Cancel' : 'RSVP — Join This Event'}
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

export default CommunityEventsPage;
