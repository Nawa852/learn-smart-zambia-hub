import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, Calendar, FileText, Megaphone, BookOpen, Users, Clock, ExternalLink } from 'lucide-react';

const updates = [
  { type: 'announcement', icon: Megaphone, title: "Term 2 Fee Structure Released", desc: "The administration has published the updated fee structure for Term 2, 2026. Early payment discounts available until February 28.", date: "Feb 5, 2026", priority: "high" },
  { type: 'event', icon: Calendar, title: "Parent-Teacher Conference", desc: "Annual PTC scheduled for all grades. Individual sessions will be 15 minutes each. Sign-up sheet available online.", date: "Feb 14, 2026", priority: "high" },
  { type: 'academic', icon: BookOpen, title: "Mock Exam Timetable Published", desc: "Grade 9 and 12 mock examinations will begin March 3. Full timetable is now available for download.", date: "Feb 3, 2026", priority: "medium" },
  { type: 'event', icon: Users, title: "Science Fair 2026", desc: "Students from all grades are invited to participate. Registration closes February 20. Prizes for top 3 in each category.", date: "Mar 15, 2026", priority: "medium" },
  { type: 'announcement', icon: Megaphone, title: "New School Library Hours", desc: "Extended library hours from 7:00 AM to 6:00 PM on weekdays. Weekend access available for Grade 12 students.", date: "Feb 1, 2026", priority: "low" },
  { type: 'policy', icon: FileText, title: "Updated Uniform Policy", desc: "Minor updates to the school uniform guidelines for Term 2. Please review the attached document.", date: "Jan 30, 2026", priority: "low" },
  { type: 'event', icon: Calendar, title: "Sports Day", desc: "Inter-house sports competition. Parents are welcome to attend and cheer for their children.", date: "Mar 22, 2026", priority: "medium" },
];

const priorityColor = (p: string) => p === 'high' ? 'destructive' : p === 'medium' ? 'default' : 'secondary';

const ParentSchoolUpdatesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <School className="w-8 h-8 text-primary" />
          School Updates
        </h1>
        <p className="text-muted-foreground mt-1">Stay informed with the latest from school</p>
      </div>
      <Button variant="outline" size="sm"><Calendar className="w-4 h-4 mr-1" />View Calendar</Button>
    </div>

    {/* Pinned */}
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="destructive" className="text-[10px]">📌 Pinned</Badge>
              <span className="text-xs text-muted-foreground">Feb 14, 2026</span>
            </div>
            <h3 className="font-bold text-lg">Parent-Teacher Conference — Feb 14</h3>
            <p className="text-sm text-muted-foreground mt-1">Annual PTC for all grades. Book your 15-minute slot with each teacher online.</p>
            <Button className="mt-3" size="sm">Book Your Slot</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Updates List */}
    <div className="space-y-3">
      {updates.map((u, i) => (
        <Card key={i} className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <u.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="font-semibold text-sm">{u.title}</h4>
                <Badge variant={priorityColor(u.priority)} className="text-[10px]">{u.priority}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{u.desc}</p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{u.date}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0"><ExternalLink className="w-4 h-4" /></Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ParentSchoolUpdatesPage;
