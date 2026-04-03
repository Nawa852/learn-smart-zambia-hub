import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, BookOpen, User, Trophy, Shield, Wrench, MessageCircle, Compass } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';

const roleNavItems: Record<string, { icon: typeof LayoutDashboard; label: string; path: string }[]> = {
  student: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Compass, label: 'Explore', path: '/course-catalog' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: MessageCircle, label: 'Chat', path: '/messenger' },
    { icon: User, label: 'Me', path: '/profile' },
  ],
  teacher: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Classes', path: '/courses' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: Trophy, label: 'Analytics', path: '/teacher-analytics' },
    { icon: User, label: 'Me', path: '/profile' },
  ],
  guardian: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Grades', path: '/parent-grades' },
    { icon: MessageCircle, label: 'Messages', path: '/parent-messages' },
    { icon: User, label: 'Me', path: '/profile' },
  ],
  institution: [
    { icon: LayoutDashboard, label: 'Home', path: '/school-admin' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: User, label: 'Me', path: '/profile' },
  ],
  cybersecurity: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Shield, label: 'Labs', path: '/cybersecurity/labs' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: User, label: 'Me', path: '/profile' },
  ],
  skills: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Wrench, label: 'Skills', path: '/skills/dashboard' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: User, label: 'Me', path: '/profile' },
  ],
};

export const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useProfile();
  const role = (profile?.role as string) || 'student';

  const items = roleNavItems[role] || roleNavItems.student;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-13 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full py-2 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-[2px] rounded-b bg-primary" />
              )}
              <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={cn("text-[10px] leading-none", isActive ? "font-bold" : "font-medium")}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
