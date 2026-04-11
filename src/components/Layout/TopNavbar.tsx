import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import eduIcon from '@/assets/edu-zambia-icon.png';

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
    <nav className="sticky top-0 z-50 w-full h-14 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="flex h-full items-center px-4 gap-3">
        {/* Mobile sidebar trigger + logo */}
        <SidebarTrigger className="shrink-0 -ml-1 text-muted-foreground" />
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden shrink-0">
          <img src={eduIcon} alt="Edu Zambia" className="w-7 h-7" />
        </Link>

        {/* Search — center */}
        <div className="flex-1 flex justify-center">
          <button
            onClick={openCommandPalette}
            className="hidden md:flex items-center gap-2 h-9 w-full max-w-md px-4 rounded-lg bg-secondary/50 border border-border/50 text-muted-foreground hover:bg-secondary hover:border-border transition-all text-sm cursor-pointer"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Search anything...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded bg-muted/60 text-[10px] font-mono border border-border/30">⌘K</kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 text-muted-foreground"
            onClick={openCommandPalette}>
            <Search className="h-4 w-4" />
          </Button>

          <ThemeSwitcher />

          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/connect?tab=messenger')}>
            <MessageCircle className="h-4 w-4" />
          </Button>

          <NotificationBell />

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0 ml-1">
                <Avatar className="h-8 w-8 ring-2 ring-border">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
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
