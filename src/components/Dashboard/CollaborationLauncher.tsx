import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Users, MessageSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const actions = [
  {
    label: 'Study Room',
    description: 'Join a virtual study room with peers',
    icon: Video,
    href: '/connect?tab=groups',
    gradient: 'from-purple-500/10 to-blue-500/10',
    iconColor: 'text-purple-500',
  },
  {
    label: 'Whiteboard',
    description: 'Collaborate on ideas visually',
    icon: BookOpen,
    href: '/ai?tab=mind-maps',
    gradient: 'from-green-500/10 to-emerald-500/10',
    iconColor: 'text-green-500',
  },
  {
    label: 'Group Chat',
    description: 'Chat with your study group',
    icon: MessageSquare,
    href: '/connect?tab=messenger',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Find Partners',
    description: 'Connect with study partners',
    icon: Users,
    href: '/connect?tab=groups',
    gradient: 'from-orange-500/10 to-amber-500/10',
    iconColor: 'text-orange-500',
  },
];

export const CollaborationLauncher = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <Users className="w-4 h-4 text-cyan-500" />
        <h3 className="text-sm font-semibold text-foreground">Collaborate</h3>
      </div>
      <div className="grid grid-cols-2 gap-0">
        {actions.map((action, i) => (
          <button
            key={action.label}
            onClick={() => navigate(action.href)}
            className={cn(
              "flex flex-col items-center gap-2 px-3 py-4 text-center hover:bg-muted/30 transition-colors",
              i < 2 && "border-b border-border/30",
              i % 2 === 0 && "border-r border-border/30"
            )}
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", action.gradient)}>
              <action.icon className={cn("w-5 h-5", action.iconColor)} />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{action.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
