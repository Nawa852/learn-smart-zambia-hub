import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MessageCircle, 
  User, 
  Settings,
  LogOut,
  Bell,
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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useTimeOfDay, getGreeting } from '@/hooks/useTimeOfDay';
import { roleLabels } from '@/components/Sidebar/sidebarConfig';
import EduZambiaLogo from '@/assets/edu-zambia-logo.svg';

export const TopNavbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const isOnline = useOnlineStatus();
  const timeOfDay = useTimeOfDay();
  const roleLabel = roleLabels[(profile?.role as string) || 'student'] || 'Student';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-xl border-b border-border">
      <div className="flex h-14 items-center px-4 gap-3">
        {/* Mobile Sidebar Trigger */}
        <SidebarTrigger className="lg:hidden -ml-1" />
        
        {/* Logo — mobile only since sidebar shows on desktop */}
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
            <img src={EduZambiaLogo} alt="Edu Zambia" className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm text-foreground">Edu Zambia</span>
        </Link>

        {/* Greeting — desktop */}
        <span className="hidden lg:block text-sm text-muted-foreground">
          {getGreeting(timeOfDay)}{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Quick search trigger — desktop */}
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="hidden md:flex items-center gap-2 h-9 px-3.5 rounded-lg bg-secondary/60 border border-border/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-border transition-all text-xs cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="ml-6 px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border/50">⌘K</kbd>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ProfileSwitcher />
          <ThemeSwitcher />
          <NotificationBell />

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg"
            onClick={() => navigate('/messenger')}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 ml-0.5">
                <Avatar className="h-8 w-8 ring-2 ring-border">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                {/* Online status dot */}
                <span className="absolute -bottom-0.5 -right-0.5">
                  <StatusDot status={isOnline ? 'online' : 'offline'} size="sm" pulse />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border-border" align="end" forceMount>
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-10 w-10 ring-2 ring-border">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-sm leading-tight">{profile?.full_name || 'User'}</p>
                  <Badge variant="secondary" className="text-[10px] w-fit px-1.5 py-0 font-medium">{roleLabel}</Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer gap-2">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/notification-preferences')} className="cursor-pointer gap-2">
                <Bell className="h-4 w-4" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer gap-2">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
