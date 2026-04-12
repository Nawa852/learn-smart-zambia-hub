import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle, User, Settings, LogOut, Bookmark } from 'lucide-react';
import { NotificationBell } from '@/components/Notifications/NotificationBell';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { roleLabels } from '@/components/Sidebar/sidebarConfig';
import nexusMark from '@/assets/nexus-mark.png';

export const TopNavbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const roleLabel = roleLabels[(profile?.role as string) || 'student'] || 'Student';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const openCommandPalette = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="flex h-12 lg:h-14 items-center px-3 lg:px-4 gap-2">
        {/* Desktop sidebar trigger */}
        <SidebarTrigger className="hidden lg:flex shrink-0 -ml-1 text-muted-foreground" />
        
        {/* Mobile: Logo + Title */}
        <div className="flex items-center gap-2.5 lg:hidden flex-1 min-w-0">
          <img src={nexusMark} alt="Nexus" className="w-8 h-8 shrink-0 rounded-xl" />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm text-foreground leading-tight">Nexus</span>
            <span className="text-[9px] text-muted-foreground leading-tight uppercase tracking-widest font-medium">Learning</span>
          </div>
        </div>

        {/* Desktop: Search center */}
        <div className="hidden lg:flex flex-1 justify-center">
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-2 h-9 w-full max-w-md px-4 rounded-xl bg-secondary/60 border border-border/40 text-muted-foreground hover:bg-secondary hover:border-border/60 transition-all text-sm cursor-pointer"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Search anything...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded-md bg-muted/80 text-[10px] font-mono border border-border/30">⌘K</kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-0.5 lg:gap-1">
          <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 text-muted-foreground rounded-full"
            onClick={openCommandPalette}>
            <Search className="h-[18px] w-[18px]" />
          </Button>

          <ThemeSwitcher />

          <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9 text-muted-foreground hover:text-foreground rounded-full"
            onClick={() => navigate('/connect?tab=messenger')}>
            <MessageCircle className="h-4 w-4" />
          </Button>

          <NotificationBell />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 lg:h-9 lg:w-9 rounded-full p-0 ml-0.5">
                <Avatar className="h-7 w-7 lg:h-8 lg:w-8 ring-2 ring-primary/20">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-[11px] font-bold">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-3 py-2.5">
                <p className="font-semibold text-sm truncate">{profile?.full_name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer gap-2">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/prepare?tab=bookmarks')} className="cursor-pointer gap-2">
                <Bookmark className="h-4 w-4" /> Bookmarks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/profile?tab=settings')} className="cursor-pointer gap-2">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
