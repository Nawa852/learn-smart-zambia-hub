import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, CheckCircle, Info, Clock, TrendingDown, Award, BookOpen, Settings } from 'lucide-react';

const alerts = [
  { id: 1, type: 'urgent', icon: AlertTriangle, title: "Biology grade dropped below 70%", desc: "Brighton's Biology score decreased from 75% to 68%. Consider scheduling extra tutoring.", time: "2 hours ago", child: "Brighton", read: false },
  { id: 2, type: 'success', icon: Award, title: "Sarah earned 'Perfect Week' badge!", desc: "Sarah completed all assignments on time and scored above 90% in every quiz this week.", time: "5 hours ago", child: "Sarah", read: false },
  { id: 3, type: 'warning', icon: Clock, title: "Brighton was late to school", desc: "Arrived 15 minutes after the start of classes on Monday.", time: "1 day ago", child: "Brighton", read: true },
  { id: 4, type: 'info', icon: BookOpen, title: "New assignment posted", desc: "Chemistry lab report due next Friday for Grade 12 students.", time: "1 day ago", child: "Brighton", read: true },
  { id: 5, type: 'success', icon: CheckCircle, title: "Sarah reached 24-day study streak", desc: "Consistent daily learning maintained for over 3 weeks!", time: "2 days ago", child: "Sarah", read: true },
  { id: 6, type: 'warning', icon: TrendingDown, title: "Study time decreased this week", desc: "Brighton's average daily study time dropped from 3h to 1.5h.", time: "3 days ago", child: "Brighton", read: true },
  { id: 7, type: 'info', icon: Info, title: "Parent-Teacher meeting scheduled", desc: "Friday at 3:00 PM with Mrs. Phiri (Math department).", time: "3 days ago", child: "All", read: true },
];

const typeStyles: Record<string, { border: string; bg: string; badge: "default" | "secondary" | "destructive" | "outline" }> = {
  urgent: { border: 'border-l-red-500', bg: 'bg-red-50', badge: 'destructive' },
  warning: { border: 'border-l-yellow-500', bg: 'bg-yellow-50', badge: 'outline' },
  success: { border: 'border-l-green-500', bg: 'bg-green-50', badge: 'default' },
  info: { border: 'border-l-blue-500', bg: 'bg-blue-50', badge: 'secondary' },
};

const ParentAlertsPage = () => {
  const unread = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground mt-1">{unread} unread notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Mark all read</Button>
          <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-1" />Preferences</Button>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = typeStyles[alert.type];
          return (
            <Card key={alert.id} className={`border-l-4 ${style.border} ${!alert.read ? 'shadow-md' : 'opacity-80'} hover:shadow-lg transition-all`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center flex-shrink-0`}>
                  <alert.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${!alert.read ? '' : 'text-muted-foreground'}`}>{alert.title}</h4>
                    {!alert.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{alert.desc}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={style.badge} className="text-[10px]">{alert.type}</Badge>
                    <Badge variant="outline" className="text-[10px]">{alert.child}</Badge>
                    <span className="text-[10px] text-muted-foreground ml-auto">{alert.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ParentAlertsPage;
