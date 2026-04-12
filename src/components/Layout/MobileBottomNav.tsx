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
      <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl border-t border-border/20" />
      
      <div className="relative flex items-center justify-around h-[60px] max-w-lg mx-auto px-1 pb-[env(safe-area-inset-bottom,2px)]">
        {items.map((item) => {
          const isActive = matchesNavItem(location.pathname, item);
          return (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 flex-1 py-1.5 transition-all duration-200 active:scale-95',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {/* Google-style active indicator */}
              <div className={cn(
                'flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300',
                isActive ? 'bg-primary/12' : ''
              )}>
                <item.icon
                  className={cn("w-[22px] h-[22px] transition-all", isActive && "text-primary")}
                  strokeWidth={isActive ? 2.2 : 1.6}
                />
              </div>
              
              <span className={cn(
                "text-[11px] leading-none transition-colors",
                isActive ? "font-semibold text-primary" : "font-medium text-muted-foreground"
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
