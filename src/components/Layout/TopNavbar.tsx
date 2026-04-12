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
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-2xl border-b border-border/30">
      <div className="flex h-14 items-center px-3 sm:px-4 gap-2">
        {/* Desktop sidebar trigger */}
        <SidebarTrigger className="hidden lg:flex shrink-0 -ml-1 text-muted-foreground hover:text-foreground transition-colors" />
        
        {/* Mobile: Logo */}
        <div className="flex items-center gap-2 lg:hidden flex-1 min-w-0">
          <img src={nexusMark} alt="Nexus" className="w-8 h-8 shrink-0 rounded-xl" />
          <span className="font-semibold text-[15px] text-foreground">Nexus</span>
        </div>

        {/* Desktop: Search center — Google-style pill */}
        <div className="hidden lg:flex flex-1 justify-center">
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-3 h-10 w-full max-w-lg px-4 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:bg-secondary/80 hover:shadow-card-hover transition-all text-sm cursor-pointer group"
          >
            <Search className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="flex-1 text-left">Search anything...</span>
            <kbd className="ml-auto px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-mono border border-border/20">⌘K</kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground rounded-full"
            onClick={openCommandPalette}>
            <Search className="h-[18px] w-[18px]" />
          </Button>

          <ThemeSwitcher />

          <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9 text-muted-foreground hover:text-foreground rounded-full"
            onClick={() => navigate('/connect?tab=messenger')}>
            <MessageCircle className="h-[18px] w-[18px]" />
          </Button>

          <NotificationBell />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0 ml-0.5 hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl shadow-high" align="end" sideOffset={8}>
              <div className="px-3 py-3">
                <p className="font-semibold text-sm truncate">{profile?.full_name || 'User'}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{roleLabel}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer gap-2.5 py-2.5 rounded-lg mx-1">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/prepare?tab=bookmarks')} className="cursor-pointer gap-2.5 py-2.5 rounded-lg mx-1">
                <Bookmark className="h-4 w-4" /> Bookmarks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/profile?tab=settings')} className="cursor-pointer gap-2.5 py-2.5 rounded-lg mx-1">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive gap-2.5 py-2.5 rounded-lg mx-1">
                <LogOut className="h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
