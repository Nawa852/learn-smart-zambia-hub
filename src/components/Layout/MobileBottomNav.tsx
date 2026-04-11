import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { getPrimaryNavigationByRole, matchesNavItem } from '@/components/Sidebar/sidebarConfig';

export const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useProfile();
  const role = (profile?.role as string) || 'student';
  const items = getPrimaryNavigationByRole(role).slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/98 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2 safe-area-bottom">
        {items.map((item) => {
          const isActive = matchesNavItem(location.pathname, item);
          return (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 transition-all duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground active:scale-95'
              )}
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-[3px] rounded-b-full bg-primary shadow-[0_2px_8px_0_hsl(var(--primary)/0.4)]" />
              )}
              <div className={cn(
                'flex items-center justify-center w-10 h-7 rounded-xl transition-colors',
                isActive && 'bg-primary/10'
              )}>
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className={cn(
                "text-[10px] leading-none",
                isActive ? "font-bold" : "font-medium"
              )}>
                {item.shortTitle ?? item.title}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
