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
      {/* Premium frosted glass background */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-3xl border-t border-border/15" />
      
      <div className="relative flex items-center justify-around h-[64px] max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom,2px)]">
        {items.map((item) => {
          const isActive = matchesNavItem(location.pathname, item);
          return (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 transition-all duration-300 active:scale-90',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {/* Active pill indicator */}
              <div className={cn(
                'flex items-center justify-center w-14 h-8 rounded-2xl transition-all duration-300',
                isActive ? 'bg-primary/12 shadow-sm shadow-primary/10' : 'bg-transparent'
              )}>
                <item.icon
                  className={cn(
                    "w-[20px] h-[20px] transition-all duration-300",
                    isActive && "text-primary scale-105"
                  )}
                  strokeWidth={isActive ? 2.4 : 1.5}
                />
              </div>
              
              <span className={cn(
                "text-[10px] leading-none transition-all duration-300 mt-0.5",
                isActive ? "font-bold text-primary" : "font-medium text-muted-foreground/70"
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
