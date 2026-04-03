import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MessageCircle, User, Settings, LogOut, Bell, Bookmark } from 'lucide-react';
import { NotificationBell } from '@/components/Notifications/NotificationBell';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { roleLabels } from '@/components/Sidebar/sidebarConfig';
import eduLogo from '@/assets/edu-zambia-mark.png';

export const TopNavbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const roleLabel = roleLabels[(profile?.role as string) || 'student'] || 'Student';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-12 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex h-full items-center px-3 lg:px-4 gap-2">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="lg:hidden -ml-1 text-muted-foreground" />

        {/* Mobile logo */}
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden shrink-0">
          <img src={eduLogo} alt="Edu Zambia" className="w-7 h-7 rounded-md" />
        </Link>

        {/* Search — center */}
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="hidden md:flex items-center gap-2 h-8 w-full max-w-sm px-3 rounded-md bg-secondary/60 border border-border/50 text-muted-foreground hover:bg-secondary hover:border-border transition-all text-xs cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span>Search...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded bg-muted/60 text-[10px] font-mono border border-border/30 shrink-0">⌘K</kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 rounded-md text-muted-foreground"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          >
            <Search className="h-4 w-4" />
          </Button>

          <ThemeSwitcher />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/messenger')}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>

          <NotificationBell />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0 ml-0.5">
                <Avatar className="h-7 w-7 ring-1 ring-border">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-3 py-2">
                <p className="font-medium text-sm truncate">{profile?.full_name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer gap-2">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/bookmarks')} className="cursor-pointer gap-2">
                <Bookmark className="h-4 w-4" /> Bookmarks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer gap-2">
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
