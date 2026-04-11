import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, BookOpen, Brain, Shield, ClipboardCheck, BarChart3, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StakeholderAction {
  label: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const stakeholderActions: Record<string, StakeholderAction[]> = {
  student: [
    { label: 'Ask Teacher', description: 'Message your teachers for help', icon: MessageSquare, href: '/connect?tab=messenger', color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Study Group', description: 'Join or create a study group', icon: Users, href: '/connect?tab=groups', color: 'text-green-400 bg-green-500/10' },
    { label: 'Find Mentor', description: 'Connect with experienced mentors', icon: Heart, href: '/connect?tab=mentorship', color: 'text-pink-400 bg-pink-500/10' },
    { label: 'AI Tutor', description: 'Get instant AI-powered help', icon: Brain, href: '/ai?tab=tutor', color: 'text-purple-400 bg-purple-500/10' },
  ],
  teacher: [
    { label: 'Message Students', description: 'Send announcements or direct messages', icon: MessageSquare, href: '/connect?tab=messenger', color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Contact Parents', description: 'Update guardians on progress', icon: Users, href: '/connect?tab=messenger', color: 'text-green-400 bg-green-500/10' },
    { label: 'Post Announcement', description: 'Notify all enrolled students', icon: ClipboardCheck, href: '/teach?tab=announcements', color: 'text-amber-400 bg-amber-500/10' },
    { label: 'Grade Work', description: 'Review and grade submissions', icon: BarChart3, href: '/teach?tab=gradebook', color: 'text-purple-400 bg-purple-500/10' },
  ],
  guardian: [
    { label: 'Message Teacher', description: "Reach out to your child's teacher", icon: MessageSquare, href: '/connect?tab=messenger', color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Check Grades', description: "View your child's academic progress", icon: BarChart3, href: '/family?tab=grades', color: 'text-green-400 bg-green-500/10' },
    { label: 'Set Controls', description: 'Manage screen time and content filters', icon: Shield, href: '/family?tab=controls', color: 'text-amber-400 bg-amber-500/10' },
    { label: 'View Homework', description: 'Track assignments and due dates', icon: BookOpen, href: '/family?tab=homework', color: 'text-purple-400 bg-purple-500/10' },
  ],
};

// Fallback for other roles
const defaultActions: StakeholderAction[] = [
  { label: 'Messages', description: 'Chat with peers and collaborators', icon: MessageSquare, href: '/connect?tab=messenger', color: 'text-blue-400 bg-blue-500/10' },
  { label: 'Community', description: 'Join discussions and share ideas', icon: Users, href: '/connect?tab=community', color: 'text-green-400 bg-green-500/10' },
  { label: 'AI Assistant', description: 'Get AI-powered help anytime', icon: Brain, href: '/ai?tab=chat', color: 'text-purple-400 bg-purple-500/10' },
  { label: 'Find Peers', description: 'Connect with people in your field', icon: Heart, href: '/connect?tab=mentorship', color: 'text-pink-400 bg-pink-500/10' },
];

interface StakeholderBridgeProps {
  role: string;
}

export const StakeholderBridge: React.FC<StakeholderBridgeProps> = ({ role }) => {
  const navigate = useNavigate();
  const actions = stakeholderActions[role] || defaultActions;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Quick Connect</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Bridge to your stakeholders</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
          <Users className="w-3 h-3" />
          Live
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {actions.map((action, i) => (
          <button
            key={action.label}
            onClick={() => navigate(action.href)}
            className={cn(
              "flex items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/50",
              i < actions.length - (actions.length % 2 === 0 ? 2 : 1) && "border-b border-border/30",
              i % 2 === 0 && "sm:border-r sm:border-border/30"
            )}
          >
            <div className={cn("shrink-0 flex items-center justify-center w-9 h-9 rounded-lg", action.color)}>
              <action.icon className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
