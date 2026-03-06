import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, ArrowLeft, Plus, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const termDates = [
  { term: 'Term 1', start: 'Jan 13, 2025', end: 'Apr 11, 2025', status: 'completed', weeks: 13 },
  { term: 'Term 2', start: 'May 5, 2025', end: 'Aug 8, 2025', status: 'active', weeks: 14 },
  { term: 'Term 3', start: 'Sep 1, 2025', end: 'Dec 5, 2025', status: 'upcoming', weeks: 14 },
];

const upcomingEvents = [
  { title: 'Mid-Term Examinations', date: 'Jun 16-20, 2025', type: 'exam', venue: 'All Classrooms' },
  { title: 'Science Fair', date: 'Jul 12, 2025', type: 'event', venue: 'School Hall' },
  { title: 'Parent-Teacher Meeting', date: 'Jul 25, 2025', type: 'meeting', venue: 'Main Hall' },
  { title: 'Inter-School Sports Day', date: 'Aug 2, 2025', type: 'event', venue: 'Sports Ground' },
  { title: 'End of Term Exams', date: 'Aug 4-8, 2025', type: 'exam', venue: 'All Classrooms' },
];

const weeklyTimetable = [
  { time: '07:30 - 08:30', mon: 'Mathematics', tue: 'English', wed: 'Physics', thu: 'Chemistry', fri: 'Biology' },
  { time: '08:30 - 09:30', mon: 'English', tue: 'Mathematics', wed: 'Biology', thu: 'Physics', fri: 'History' },
  { time: '09:30 - 10:00', mon: 'Break', tue: 'Break', wed: 'Break', thu: 'Break', fri: 'Break' },
  { time: '10:00 - 11:00', mon: 'Physics', tue: 'Chemistry', wed: 'Mathematics', thu: 'English', fri: 'Geography' },
  { time: '11:00 - 12:00', mon: 'History', tue: 'Biology', wed: 'English', thu: 'Social Studies', fri: 'Mathematics' },
  { time: '12:00 - 13:00', mon: 'Lunch', tue: 'Lunch', wed: 'Lunch', thu: 'Lunch', fri: 'Lunch' },
  { time: '13:00 - 14:00', mon: 'Geography', tue: 'ICT', wed: 'Art', thu: 'PE', fri: 'Free Period' },
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
};

const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'outline'; extra: string }> = {
  active: { variant: 'default', extra: 'bg-primary text-primary-foreground' },
  completed: { variant: 'secondary', extra: '' },
  upcoming: { variant: 'outline', extra: '' },
};

const AdminSchedulingPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Scheduling
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">Academic calendar, timetables, and events</p>
          </div>
        </div>
        <Button className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-primary to-accent text-primary-foreground" onClick={() => toast.info('Event creation coming soon')}>
          <Plus className="w-4 h-4" />Add Event
        </Button>
      </motion.div>

      {/* Term Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {termDates.map((term, i) => {
          const sc = statusConfig[term.status] || statusConfig.upcoming;
          return (
            <Card key={i} className={`border-border/40 hover:shadow-md transition-all duration-300 overflow-hidden ${term.status === 'active' ? 'ring-2 ring-primary/30' : ''}`}>
              <CardContent className="p-5 relative">
                {term.status === 'active' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                )}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{term.term}</h3>
                    <Badge variant={sc.variant} className={`capitalize rounded-lg ${sc.extra}`}>{term.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-primary/70" />{term.start} — {term.end}
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-primary/70" />{term.weeks} weeks
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="events">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="events" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Calendar className="w-4 h-4" />Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="timetable" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Clock className="w-4 h-4" />Weekly Timetable
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-4">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Upcoming Events & Exams</CardTitle>
                <CardDescription>Scheduled activities for the current term</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((ev, i) => {
                  const tc = typeConfig[ev.type] || typeConfig.event;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{ev.title}</h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ev.date}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.venue}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${tc.bg} ${tc.text} border-0 capitalize rounded-lg text-[10px]`}>{ev.type}</Badge>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetable" className="mt-4">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Sample Weekly Timetable — Grade 12A</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left p-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Time</th>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
                        <th key={d} className="text-left p-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyTimetable.map((row, i) => (
                      <tr key={i} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium text-muted-foreground whitespace-nowrap text-xs">{row.time}</td>
                        {[row.mon, row.tue, row.wed, row.thu, row.fri].map((cell, j) => {
                          const isBreak = ['Break', 'Lunch', 'Free Period'].includes(cell);
                          return (
                            <td key={j} className="p-2">
                              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                                isBreak
                                  ? 'bg-muted/60 text-muted-foreground'
                                  : 'bg-primary/8 text-primary hover:bg-primary/15'
                              }`}>
                                {cell}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdminSchedulingPage;
