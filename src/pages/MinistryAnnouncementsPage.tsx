import React, { useState } from 'react';
import { Megaphone, Plus, Send, Globe, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const announcements = [
  { id: 1, title: '2026 Academic Calendar Released', audience: 'All', date: '2026-03-01', priority: 'high', views: 45200 },
  { id: 2, title: 'Teacher Registration Deadline Extended', audience: 'Teachers', date: '2026-02-28', priority: 'medium', views: 12300 },
  { id: 3, title: 'New Curriculum Guidelines for Grade 10-12', audience: 'Schools', date: '2026-02-20', priority: 'high', views: 38100 },
  { id: 4, title: 'School Feeding Program Expansion', audience: 'Rural Schools', date: '2026-02-15', priority: 'medium', views: 8900 },
  { id: 5, title: 'ICT Equipment Distribution Schedule', audience: 'All', date: '2026-02-10', priority: 'low', views: 15600 },
  { id: 6, title: 'National Day of Learning - March 15', audience: 'All', date: '2026-02-05', priority: 'high', views: 52000 },
  { id: 7, title: 'Teacher Transfer Window Opens', audience: 'Teachers', date: '2026-01-30', priority: 'medium', views: 9800 },
  { id: 8, title: 'COVID-19 Safety Protocol Updates', audience: 'Schools', date: '2026-01-25', priority: 'low', views: 22100 },
];

const priorityColors: Record<string, string> = {
  high: 'bg-red-500/10 text-red-600',
  medium: 'bg-yellow-500/10 text-yellow-600',
  low: 'bg-green-500/10 text-green-600',
};

const MinistryAnnouncementsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-primary" /> National Announcements
          </h1>
          <p className="text-muted-foreground mt-1">Broadcast announcements to schools nationwide</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> New Announcement</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Announcement</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input placeholder="Announcement title..." /></div>
              <div><Label>Message</Label><Textarea placeholder="Write your announcement..." rows={4} /></div>
              <div><Label>Target Audience</Label>
                <Select defaultValue="all">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stakeholders</SelectItem>
                    <SelectItem value="teachers">Teachers Only</SelectItem>
                    <SelectItem value="schools">Schools Only</SelectItem>
                    <SelectItem value="parents">Parents Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => { setOpen(false); toast.success('Announcement published!'); }}>
                <Send className="h-4 w-4 mr-2" /> Publish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold text-primary">{announcements.length}</p>
          <p className="text-sm text-muted-foreground">Total Announcements</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold">{(announcements.reduce((a, b) => a + b.views, 0) / 1000).toFixed(0)}K</p>
          <p className="text-sm text-muted-foreground">Total Views</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold text-green-500">{announcements.filter(a => a.priority === 'high').length}</p>
          <p className="text-sm text-muted-foreground">High Priority</p>
        </CardContent></Card>
      </div>

      <div className="space-y-3">
        {announcements.map(a => (
          <Card key={a.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <div className="flex gap-2 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{a.date}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{a.audience}</span>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{a.views.toLocaleString()} views</span>
                </div>
              </div>
              <Badge className={priorityColors[a.priority]}>{a.priority}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinistryAnnouncementsPage;
