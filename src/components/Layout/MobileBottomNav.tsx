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
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Frosted glass background */}
      <div className="absolute inset-0 bg-card/90 backdrop-blur-2xl border-t border-border/60" />
      
      <div className="relative flex items-end justify-around h-[72px] max-w-lg mx-auto px-1 pb-[env(safe-area-inset-bottom,8px)]">
        {items.map((item) => {
          const isActive = matchesNavItem(location.pathname, item);
          return (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 flex-1 pt-2 pb-1 transition-all duration-150 active:scale-90',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {/* Active pill indicator */}
              {isActive && (
                <div className="absolute -top-[1px] w-12 h-[3px] rounded-full bg-primary" />
              )}
              
              {/* Icon container */}
              <div className={cn(
                'flex items-center justify-center w-8 h-8 rounded-2xl transition-all duration-200',
                isActive && 'bg-primary/12 scale-105'
              )}>
                <item.icon 
                  className={cn("w-[22px] h-[22px]", isActive && "drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]")} 
                  strokeWidth={isActive ? 2.4 : 1.6} 
                />
              </div>
              
              {/* Label */}
              <span className={cn(
                "text-[10px] leading-tight tracking-tight",
                isActive ? "font-semibold" : "font-normal opacity-70"
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
