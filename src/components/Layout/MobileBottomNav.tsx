import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, BookOpen, User, Trophy, Shield, Wrench, Building2 } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';

const roleNavItems: Record<string, { icon: typeof LayoutDashboard; label: string; path: string }[]> = {
  student: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: BookOpen, label: 'Courses', path: '/my-courses' },
    { icon: Trophy, label: 'Progress', path: '/analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  teacher: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: Trophy, label: 'Analytics', path: '/teacher-analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  guardian: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Reports', path: '/guardian/reports' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  institution: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Building2, label: 'Admin', path: '/school-admin' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  ministry: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Building2, label: 'Schools', path: '/ministry-dashboard' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  cybersecurity: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Shield, label: 'Labs', path: '/cyber/network-lab' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: Trophy, label: 'CTF', path: '/cyber/ctf' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  skills: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Wrench, label: 'Skills', path: '/skills/assessment' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: BookOpen, label: 'Jobs', path: '/skills/job-board' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
};

export const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useProfile();
  const role = (profile?.role as string) || 'student';

  const items = roleNavItems[role] || roleNavItems.student;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {items.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
