import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, BookOpen, User, Trophy, Shield, Wrench, Building2, MessageCircle } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const roleNavItems: Record<string, { icon: typeof LayoutDashboard; label: string; path: string }[]> = {
  student: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: BookOpen, label: 'Courses', path: '/my-courses' },
    { icon: MessageCircle, label: 'Chat', path: '/messenger' },
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
    { icon: BookOpen, label: 'Reports', path: '/guardian-reports' },
    { icon: MessageCircle, label: 'Messages', path: '/parent-messages' },
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
    { icon: Shield, label: 'Labs', path: '/cybersecurity/network-lab' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: Trophy, label: 'CTF', path: '/cybersecurity/ctf' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  skills: [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Wrench, label: 'Skills', path: '/skills/assessment' },
    { icon: Brain, label: 'AI', path: '/ai' },
    { icon: BookOpen, label: 'Jobs', path: '/skills/jobs' },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-sm border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-150 relative',
                isActive ? 'text-primary' : 'text-muted-foreground active:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full bg-primary"
                />
              )}
              <item.icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className={cn("text-[10px]", isActive ? "font-semibold" : "font-medium")}>{item.label}</span>
              {/* Active dot indicator */}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  className="w-1 h-1 rounded-full bg-primary mt-0.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
