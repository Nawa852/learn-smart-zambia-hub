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
      <div className="absolute inset-0 bg-card/95 backdrop-blur-2xl border-t border-border/30" />
      
      <div className="relative flex items-center justify-around h-16 max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom,4px)]">
        {items.map((item) => {
          const isActive = matchesNavItem(location.pathname, item);
          return (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-[3px] flex-1 py-1 transition-all duration-200 active:scale-90',
                isActive ? 'text-primary' : 'text-muted-foreground/70'
              )}
            >
              {/* Active background pill */}
              <div className={cn(
                'flex items-center justify-center w-10 h-8 rounded-2xl transition-all duration-300',
                isActive ? 'bg-primary/12' : ''
              )}>
                <item.icon
                  className={cn("w-5 h-5 transition-all", isActive && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]")}
                  strokeWidth={isActive ? 2.2 : 1.5}
                />
              </div>
              
              <span className={cn(
                "text-[10px] leading-none",
                isActive ? "font-semibold text-primary" : "font-normal"
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
