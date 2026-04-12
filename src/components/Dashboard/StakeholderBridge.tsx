import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MessageSquare, Users, BookOpen, Brain, Shield, ClipboardCheck,
  BarChart3, Heart, Megaphone, GraduationCap, Bell, Send,
  Smartphone, Calendar, Award, Lightbulb, ArrowRight
} from 'lucide-react';

interface StakeholderAction {
  label: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
  bg: string;
}

const stakeholderActions: Record<string, StakeholderAction[]> = {
  student: [
    { label: 'Ask Teacher', description: 'Get help with coursework', icon: Send, href: '/connect?tab=messenger', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Study Group', description: 'Learn with classmates', icon: Users, href: '/connect?tab=groups', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Find Mentor', description: 'Connect with mentors', icon: Heart, href: '/connect?tab=mentorship', color: 'text-destructive', bg: 'bg-destructive/10' },
    { label: 'AI Tutor', description: 'Instant AI assistance', icon: Brain, href: '/ai?tab=tutor', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Announcements', description: 'Class updates', icon: Bell, href: '/notifications', color: 'text-warning', bg: 'bg-warning/10' },
  ],
  teacher: [
    { label: 'Message Class', description: 'Broadcast to students', icon: Megaphone, href: '/connect?tab=messenger', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Contact Parents', description: 'Update guardians', icon: Users, href: '/connect?tab=messenger', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Post Announcement', description: 'Notify all students', icon: ClipboardCheck, href: '/teach?tab=announcements', color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Grade Work', description: 'Review submissions', icon: Award, href: '/teach?tab=gradebook', color: 'text-destructive', bg: 'bg-destructive/10' },
    { label: 'Analytics', description: 'Student insights', icon: BarChart3, href: '/teacher-analytics', color: 'text-primary', bg: 'bg-primary/10' },
  ],
  guardian: [
    { label: 'Message Teacher', description: "Reach your child's teacher", icon: MessageSquare, href: '/connect?tab=messenger', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Check Grades', description: 'Academic progress', icon: GraduationCap, href: '/family?tab=grades', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Set Controls', description: 'Screen time & filters', icon: Shield, href: '/family?tab=controls', color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'View Homework', description: 'Track assignments', icon: BookOpen, href: '/family?tab=homework', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Study Schedule', description: "Your child's timetable", icon: Calendar, href: '/family?tab=schedule', color: 'text-destructive', bg: 'bg-destructive/10' },
  ],
  institution: [
    { label: 'Staff Chat', description: 'Coordinate with teachers', icon: MessageSquare, href: '/connect?tab=messenger', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'School Stats', description: 'Performance overview', icon: BarChart3, href: '/institution?tab=analytics', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Events', description: 'Manage school events', icon: Calendar, href: '/institution?tab=events', color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Announcements', description: 'School-wide notices', icon: Megaphone, href: '/institution?tab=announcements', color: 'text-destructive', bg: 'bg-destructive/10' },
  ],
  doctor: [
    { label: 'Case Studies', description: 'Discuss with peers', icon: Users, href: '/connect?tab=groups', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'AI Diagnosis', description: 'Practice with AI', icon: Brain, href: '/ai?tab=medical', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Study Resources', description: 'Medical materials', icon: BookOpen, href: '/medical?tab=resources', color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Rotations', description: 'Clinical schedule', icon: Calendar, href: '/medical?tab=rotations', color: 'text-destructive', bg: 'bg-destructive/10' },
  ],
  entrepreneur: [
    { label: 'Mentor Connect', description: 'Find business mentors', icon: Lightbulb, href: '/connect?tab=mentorship', color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Peer Network', description: 'Fellow entrepreneurs', icon: Users, href: '/connect?tab=groups', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'AI Advisor', description: 'Business planning help', icon: Brain, href: '/ai?tab=business', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Resources', description: 'Startup materials', icon: BookOpen, href: '/entrepreneur?tab=resources', color: 'text-destructive', bg: 'bg-destructive/10' },
  ],
};

const defaultActions: StakeholderAction[] = [
  { label: 'Messages', description: 'Chat with peers', icon: MessageSquare, href: '/connect?tab=messenger', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Community', description: 'Join discussions', icon: Users, href: '/connect?tab=community', color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'AI Assistant', description: 'AI-powered help', icon: Brain, href: '/ai?tab=chat', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Find Peers', description: 'Connect with people', icon: Heart, href: '/connect?tab=mentorship', color: 'text-destructive', bg: 'bg-destructive/10' },
];

interface StakeholderBridgeProps {
  role: string;
}

export const StakeholderBridge: React.FC<StakeholderBridgeProps> = ({ role }) => {
  const navigate = useNavigate();
  const actions = stakeholderActions[role] || defaultActions;

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-primary" />
          </div>
          Quick Connect
        </CardTitle>
        <p className="text-[10px] text-muted-foreground mt-0.5">Bridge to your network</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/20">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.href)}
              className="flex items-center gap-3 w-full px-4 py-3 text-left transition-all duration-200 hover:bg-secondary/40 active:scale-[0.98] group"
            >
              <div className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-xl ${action.bg} transition-transform group-hover:scale-110`}>
                <action.icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-[10px] text-muted-foreground">{action.description}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
