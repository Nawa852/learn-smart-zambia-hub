import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  MessageCircle, 
  Heart, 
  User, 
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export const TopNavbar = () => {
  const [notifications] = useState(5);
  const [messages] = useState(3);
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Mobile Sidebar Trigger */}
        <SidebarTrigger className="lg:hidden" />
        
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gradient-bright-sphere flex items-center justify-center">
            <span className="text-white font-bold text-sm">BS</span>
          </div>
          <span className="hidden md:block font-bold text-lg gradient-text-bright-sphere">
            Learn Smart Zambia
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for courses, people, or content..."
              className="pl-10 bg-muted/50 border-0 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover-lift">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative hover-lift">
            <MessageCircle className="h-5 w-5" />
            {messages > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary">
                {messages}
              </Badge>
            )}
          </Button>

          {/* Likes/Activity */}
          <Button variant="ghost" size="icon" className="hover-lift">
            <Heart className="h-5 w-5" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-lift">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="gradient-bright-sphere text-white">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{profile?.full_name || 'User'}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};