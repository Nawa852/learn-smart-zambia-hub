import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, ArrowLeft, Plus, MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';

const termDates = [
  { term: 'Term 1', start: 'Jan 13, 2025', end: 'Apr 11, 2025', status: 'completed', weeks: 13 },
  { term: 'Term 2', start: 'May 5, 2025', end: 'Aug 8, 2025', status: 'active', weeks: 14 },
  { term: 'Term 3', start: 'Sep 1, 2025', end: 'Dec 5, 2025', status: 'upcoming', weeks: 14 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const typeConfig: Record<string, { bg: string; text: string }> = {
  exam: { bg: 'bg-destructive/10', text: 'text-destructive' },
  meeting: { bg: 'bg-primary/10', text: 'text-primary' },
  event: { bg: 'bg-green-500/10', text: 'text-green-700' },
  holiday: { bg: 'bg-amber-500/10', text: 'text-amber-700' },
};

const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'outline'; extra: string }> = {
  active: { variant: 'default', extra: 'bg-primary text-primary-foreground' },
  completed: { variant: 'secondary', extra: '' },
  upcoming: { variant: 'outline', extra: '' },
};

const AdminSchedulingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const schoolName = profile?.school || '';
  const [addOpen, setAddOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', event_date: '', event_type: 'event', venue: '', description: '' });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['school-events', schoolName],
    queryFn: async () => {
      if (!schoolName) return [];
      const { data } = await supabase
        .from('school_events')
        .select('*')
        .eq('school_name', schoolName)
        .order('event_date', { ascending: true });
      return data || [];
    },
    enabled: !!schoolName,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase.from('school_events').insert({
        school_name: schoolName,
        title: newEvent.title,
        event_date: newEvent.event_date,
        event_type: newEvent.event_type,
        venue: newEvent.venue || null,
        description: newEvent.description || null,
        created_by: user.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school-events'] });
      toast.success('Event created');
      setAddOpen(false);
      setNewEvent({ title: '', event_date: '', event_type: 'event', venue: '', description: '' });
    },
    onError: () => toast.error('Failed to create event'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('school_events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school-events'] });
      toast.success('Event deleted');
    },
  });

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Scheduling</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Academic calendar, timetables, and events</p>
          </div>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Plus className="w-4 h-4" />Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create School Event</DialogTitle>
              <DialogDescription>Add a new event to the school calendar.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Event Title" className="rounded-xl" value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} />
              <Input type="date" className="rounded-xl" value={newEvent.event_date} onChange={e => setNewEvent(p => ({ ...p, event_date: e.target.value }))} />
              <Select value={newEvent.event_type} onValueChange={v => setNewEvent(p => ({ ...p, event_type: v }))}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Venue (optional)" className="rounded-xl" value={newEvent.venue} onChange={e => setNewEvent(p => ({ ...p, venue: e.target.value }))} />
              <Input placeholder="Description (optional)" className="rounded-xl" value={newEvent.description} onChange={e => setNewEvent(p => ({ ...p, description: e.target.value }))} />
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-xl" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button className="rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground"
                disabled={!newEvent.title || !newEvent.event_date || addMutation.isPending}
                onClick={() => addMutation.mutate()}>
                {addMutation.isPending ? 'Creating...' : 'Create Event'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Term Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {termDates.map((term, i) => {
          const sc = statusConfig[term.status] || statusConfig.upcoming;
          return (
            <Card key={i} className={`border-border/40 hover:shadow-md transition-all duration-300 overflow-hidden ${term.status === 'active' ? 'ring-2 ring-primary/30' : ''}`}>
              <CardContent className="p-5 relative">
                {term.status === 'active' && <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{term.term}</h3>
                    <Badge variant={sc.variant} className={`capitalize rounded-lg ${sc.extra}`}>{term.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-primary/70" />{term.start} — {term.end}</p>
                    <p className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-primary/70" />{term.weeks} weeks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>School Events</CardTitle>
            <CardDescription>Events for {schoolName || 'your school'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading && <p className="text-muted-foreground text-sm">Loading events...</p>}
            {!isLoading && events.length === 0 && <p className="text-muted-foreground text-sm">No events scheduled. Click "Add Event" to create one.</p>}
            {events.map((ev: any, i: number) => {
              const tc = typeConfig[ev.event_type] || typeConfig.event;
              return (
                <motion.div key={ev.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{ev.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(ev.event_date).toLocaleDateString()}</span>
                        {ev.venue && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.venue}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${tc.bg} ${tc.text} border-0 capitalize rounded-lg text-[10px]`}>{ev.event_type}</Badge>
                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-destructive/10" onClick={() => deleteMutation.mutate(ev.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminSchedulingPage;
