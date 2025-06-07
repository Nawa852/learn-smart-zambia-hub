
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { 
  User, LogOut, Brain, BookOpen, BarChart3, GraduationCap,
  Users, Calendar, MessageCircle, Award, Settings, Bell,
  Home, Search, Video, FileText, Globe, Smartphone
} from 'lucide-react';

const MainNavigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const mainMenuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/smart-recommendations', label: 'AI Tutor', icon: Brain },
    { to: '/ai-study-helper', label: 'Study Helper', icon: Brain },
    { to: '/ai-content-studio', label: 'Content Studio', icon: FileText },
    { to: '/learning-analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/achievements', label: 'Achievements', icon: Award },
    { to: '/discussions', label: 'Discussions', icon: MessageCircle },
    { to: '/study-groups', label: 'Study Groups', icon: Users },
    { to: '/homework-help', label: 'Homework Help', icon: HelpCircle },
    { to: '/schedule', label: 'Schedule', icon: Calendar },
    { to: '/resources', label: 'Resources', icon: FileText },
  ];

  const teacherMenuItems = [
    { to: '/instructor', label: 'Instructor Portal', icon: GraduationCap },
    { to: '/course-creation', label: 'Create Course', icon: BookOpen },
    { to: '/class-management', label: 'Manage Classes', icon: Users },
    { to: '/parent-conferences', label: 'Parent Conferences', icon: Video },
    { to: '/assessment-tools', label: 'Assessments', icon: FileText },
  ];

  const parentMenuItems = [
    { to: '/parent-dashboard', label: 'Parent Dashboard', icon: Home },
    { to: '/child-progress', label: 'Child Progress', icon: BarChart3 },
    { to: '/parent-teacher-chat', label: 'Teacher Chat', icon: MessageCircle },
    { to: '/school-events', label: 'School Events', icon: Calendar },
    { to: '/fee-management', label: 'Fee Management', icon: Settings },
  ];

  const adminMenuItems = [
    { to: '/admin-dashboard', label: 'Admin Dashboard', icon: Settings },
    { to: '/user-management', label: 'User Management', icon: Users },
    { to: '/school-management', label: 'School Management', icon: Globe },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
    { to: '/system-settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-blue-600 flex items-center">
          <GraduationCap className="w-8 h-8 mr-2" />
          EDU ZAMBIA
        </Link>
        
        <nav className="hidden lg:flex space-x-6">
          {user && mainMenuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors ${
                location.pathname === item.to ? 'text-blue-600 font-medium' : ''
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:block">{user.user_metadata?.full_name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel className="text-xs font-normal text-gray-500">Learning</DropdownMenuLabel>
                  {mainMenuItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-normal text-gray-500">Teaching</DropdownMenuLabel>
                  {teacherMenuItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-normal text-gray-500">Parent Portal</DropdownMenuLabel>
                  {parentMenuItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-normal text-gray-500">Administration</DropdownMenuLabel>
                  {adminMenuItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
