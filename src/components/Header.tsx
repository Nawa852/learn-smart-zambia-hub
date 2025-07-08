
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/Auth/AuthProvider';
import { User, LogOut, Brain, BookOpen, BarChart3, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCoursesClick = () => {
    navigate('/courses');
  };

  return (
    <header className="sticky top-0 z-50 glass-premium border-b border-white/20 animate-slide-down">
      <div className="container mx-auto px-8 py-5 flex justify-between items-center">
        <Link 
          to={user ? "/dashboard" : "/"} 
          className="group flex items-center gap-3 animate-magnetic"
        >
          <div className="relative">
            <div className="absolute inset-0 gradient-hero rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-2 gradient-hero rounded-2xl">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold gradient-text-cosmic">
              EDU ZAMBIA
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              AI-Powered Learning
            </span>
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-10">
          {!user ? (
            <>
              <button 
                onClick={handleCoursesClick}
                className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-all duration-300 group cursor-pointer animate-magnetic"
              >
                Courses
                <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 gradient-card rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </button>
              <Link to="/about" className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-all duration-300 group animate-magnetic">
                About
                <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 gradient-card rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
              <Link to="/contact" className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-all duration-300 group animate-magnetic">
                Contact
                <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 gradient-card rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-all duration-300 group animate-magnetic">
                Dashboard
                <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 gradient-card rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
              <button 
                onClick={handleCoursesClick}
                className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-all duration-300 group cursor-pointer animate-magnetic"
              >
                Courses
                <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 gradient-card rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </button>
              <Link to="/smart-recommendations" className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-all duration-300 group animate-magnetic">
                Smart AI
                <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 gradient-card rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
              <Link to="/instructor" className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-all duration-300 group animate-magnetic">
                Instructor
                <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 gradient-card rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="group flex items-center space-x-3 px-4 py-2 glass-card hover:glass-premium transition-all duration-300 rounded-2xl animate-magnetic">
                  <div className="w-8 h-8 gradient-card rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{user.user_metadata?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-card border border-white/20 shadow-2xl rounded-2xl p-2">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center px-4 py-3 hover:glass-premium transition-all duration-200 rounded-xl">
                    <BarChart3 className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center px-4 py-3 hover:glass-premium transition-all duration-200 rounded-xl">
                    <User className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCoursesClick} className="flex items-center px-4 py-3 hover:glass-premium transition-all duration-200 rounded-xl cursor-pointer">
                  <BookOpen className="mr-3 h-5 w-5 text-primary" />
                  <span className="font-medium">My Courses</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/learning-analytics" className="flex items-center px-4 py-3 hover:glass-premium transition-all duration-200 rounded-xl">
                    <BarChart3 className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Learning Analytics</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-white/20" />
                <DropdownMenuItem asChild>
                  <Link to="/instructor" className="flex items-center px-4 py-3 hover:glass-premium transition-all duration-200 rounded-xl">
                    <GraduationCap className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Instructor Portal</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/smart-recommendations" className="flex items-center px-4 py-3 hover:glass-premium transition-all duration-200 rounded-xl">
                    <Brain className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Smart Recommendations</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/adaptive-content" className="flex items-center px-4 py-3 hover:glass-premium transition-all duration-200 rounded-xl">
                    <Brain className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Adaptive Learning</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-white/20" />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center px-4 py-3 hover:bg-destructive/10 transition-all duration-200 rounded-xl cursor-pointer text-destructive">
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="px-6 py-3 font-medium hover:glass-premium transition-all duration-300 rounded-2xl animate-magnetic">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="relative px-8 py-3 gradient-card text-white font-medium shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl animate-magnetic overflow-hidden group">
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 gradient-sunset opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
