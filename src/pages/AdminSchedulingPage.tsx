import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, ArrowLeft, Plus, BookOpen, Users, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

const AdminSchedulingPage = () => {
  const navigate = useNavigate();
  const typeColor = (t: string) => t === 'exam' ? 'bg-red-100 text-red-800' : t === 'meeting' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  const statusColor = (s: string) => s === 'active' ? 'default' : s === 'completed' ? 'secondary' : 'outline';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Scheduling</h1>
            <p className="text-muted-foreground">Academic calendar, timetables, and events</p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => toast.info('Event creation coming soon')}>
          <Plus className="w-4 h-4" />Add Event
        </Button>
      </div>

      {/* Term Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {termDates.map((term, i) => (
          <Card key={i} className={term.status === 'active' ? 'border-primary border-2' : ''}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{term.term}</h3>
                <Badge variant={statusColor(term.status) as any} className="capitalize">{term.status}</Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4" />{term.start} — {term.end}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4" />{term.weeks} weeks</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events" className="gap-2"><Calendar className="w-4 h-4" />Upcoming Events</TabsTrigger>
          <TabsTrigger value="timetable" className="gap-2"><Clock className="w-4 h-4" />Weekly Timetable</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events & Exams</CardTitle>
              <CardDescription>Scheduled activities for the current term</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((ev, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{ev.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ev.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.venue}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={typeColor(ev.type) + ' capitalize'}>{ev.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sample Weekly Timetable — Grade 12A</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Time</th>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
                      <th key={d} className="text-left p-2 font-semibold">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeklyTimetable.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium text-muted-foreground whitespace-nowrap">{row.time}</td>
                      {[row.mon, row.tue, row.wed, row.thu, row.fri].map((cell, j) => (
                        <td key={j} className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cell === 'Break' || cell === 'Lunch' || cell === 'Free Period' 
                              ? 'bg-muted text-muted-foreground' 
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {cell}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSchedulingPage;
