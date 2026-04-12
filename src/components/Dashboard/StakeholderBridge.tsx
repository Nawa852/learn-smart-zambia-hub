import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, BookOpen, Brain, Shield, ClipboardCheck, BarChart3, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StakeholderAction {
  label: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const stakeholderActions: Record<string, StakeholderAction[]> = {
  student: [
    { label: 'Ask Teacher', description: 'Get help from your teachers', icon: MessageSquare, href: '/connect?tab=messenger' },
    { label: 'Study Group', description: 'Learn with peers', icon: Users, href: '/connect?tab=groups' },
    { label: 'Find Mentor', description: 'Connect with mentors', icon: Heart, href: '/connect?tab=mentorship' },
    { label: 'AI Tutor', description: 'Instant AI help', icon: Brain, href: '/ai?tab=tutor' },
  ],
  teacher: [
    { label: 'Message Students', description: 'Send announcements', icon: MessageSquare, href: '/connect?tab=messenger' },
    { label: 'Contact Parents', description: 'Update guardians', icon: Users, href: '/connect?tab=messenger' },
    { label: 'Post Announcement', description: 'Notify students', icon: ClipboardCheck, href: '/teach?tab=announcements' },
    { label: 'Grade Work', description: 'Review submissions', icon: BarChart3, href: '/teach?tab=gradebook' },
  ],
  guardian: [
    { label: 'Message Teacher', description: "Reach your child's teacher", icon: MessageSquare, href: '/connect?tab=messenger' },
    { label: 'Check Grades', description: 'Academic progress', icon: BarChart3, href: '/family?tab=grades' },
    { label: 'Set Controls', description: 'Screen time & filters', icon: Shield, href: '/family?tab=controls' },
    { label: 'View Homework', description: 'Track assignments', icon: BookOpen, href: '/family?tab=homework' },
  ],
};

const defaultActions: StakeholderAction[] = [
  { label: 'Messages', description: 'Chat with peers', icon: MessageSquare, href: '/connect?tab=messenger' },
  { label: 'Community', description: 'Join discussions', icon: Users, href: '/connect?tab=community' },
  { label: 'AI Assistant', description: 'AI-powered help', icon: Brain, href: '/ai?tab=chat' },
  { label: 'Find Peers', description: 'Connect with people', icon: Heart, href: '/connect?tab=mentorship' },
];

interface StakeholderBridgeProps {
  role: string;
}

export const StakeholderBridge: React.FC<StakeholderBridgeProps> = ({ role }) => {
  const navigate = useNavigate();
  const actions = stakeholderActions[role] || defaultActions;

  return (
    <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border/30">
        <h2 className="text-sm font-semibold text-foreground">Quick Connect</h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">Bridge to your network</p>
      </div>
      <div className="divide-y divide-border/20">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.href)}
            className="flex items-center gap-3 w-full px-4 py-3 text-left transition-colors hover:bg-secondary/40 active:scale-[0.99]"
          >
            <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-primary/8 text-primary">
              <action.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{action.label}</p>
              <p className="text-[11px] text-muted-foreground">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
