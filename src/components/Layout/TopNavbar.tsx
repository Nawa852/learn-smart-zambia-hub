import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MessageCircle, 
  User, 
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  Bookmark,
  Shield,
} from 'lucide-react';
import { NotificationBell } from '@/components/Notifications/NotificationBell';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { StatusDot } from '@/components/UI/StatusDot';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ProfileSwitcher } from '@/components/UI/ProfileSwitcher';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { roleLabels } from '@/components/Sidebar/sidebarConfig';
import eduLogo from '@/assets/edu-zambia-mark.png';

export const TopNavbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const isOnline = useOnlineStatus();
  const roleLabel = roleLabels[(profile?.role as string) || 'student'] || 'Student';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      <div className="flex h-14 items-center px-3 lg:px-5 gap-2">
        {/* Mobile Sidebar Trigger */}
        <SidebarTrigger className="lg:hidden -ml-1 text-muted-foreground" />
        
        {/* Logo — mobile only */}
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden shrink-0">
          <img src={eduLogo} alt="Edu Zambia" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-sm text-foreground">Edu Zambia</span>
        </Link>

        {/* Spacer */}
        <div className="flex-1 flex justify-center">
          {/* Search bar — center aligned like LinkedIn */}
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="hidden md:flex items-center gap-2.5 h-9 w-full max-w-md px-4 rounded-full bg-secondary/80 border border-border/60 text-muted-foreground hover:bg-secondary hover:border-border transition-all text-sm cursor-pointer"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="text-xs">Search courses, tools, pages...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded bg-muted/80 text-[10px] font-mono border border-border/40 shrink-0">⌘K</kbd>
          </button>
        </div>

        {/* Actions — right side like Facebook/LinkedIn */}
        <div className="flex items-center gap-0.5">
          {/* Mobile search */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          >
            <Search className="h-[18px] w-[18px]" />
          </Button>

          <ProfileSwitcher />
          <ThemeSwitcher />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={() => navigate('/messenger')}
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </Button>

          <NotificationBell />

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 ml-0.5">
                <Avatar className="h-8 w-8 ring-2 ring-border hover:ring-primary/50 transition-all">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5">
                  <StatusDot status={isOnline ? 'online' : 'offline'} size="sm" pulse />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-popover border-border shadow-elevated" align="end" forceMount>
              {/* Profile header */}
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 ring-2 ring-border">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">{profile?.full_name || 'User'}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium h-4">{roleLabel}</Badge>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-accent' : 'bg-muted-foreground'}`} />
                        {isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider px-3 py-1">Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer gap-2.5 px-3 py-2">
                <User className="h-4 w-4 text-muted-foreground" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/bookmarks')} className="cursor-pointer gap-2.5 px-3 py-2">
                <Bookmark className="h-4 w-4 text-muted-foreground" /> Bookmarks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/notification-preferences')} className="cursor-pointer gap-2.5 px-3 py-2">
                <Bell className="h-4 w-4 text-muted-foreground" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer gap-2.5 px-3 py-2">
                <Settings className="h-4 w-4 text-muted-foreground" /> Settings & Privacy
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive gap-2.5 px-3 py-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
