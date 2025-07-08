
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg animate-slide-down">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to={user ? "/dashboard" : "/"} 
          className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          EDU ZAMBIA
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {!user ? (
            <>
              <button 
                onClick={handleCoursesClick}
                className="text-gray-600 hover:text-primary transition-all duration-300 relative group cursor-pointer"
              >
                Courses
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Link to="/about" className="text-gray-600 hover:text-primary transition-all duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary transition-all duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-all duration-300 relative group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <button 
                onClick={handleCoursesClick}
                className="text-gray-600 hover:text-primary transition-all duration-300 relative group cursor-pointer"
              >
                Courses
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Link to="/smart-recommendations" className="text-gray-600 hover:text-primary transition-all duration-300 relative group">
                Smart AI
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/instructor" className="text-gray-600 hover:text-primary transition-all duration-300 relative group">
                Instructor
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-primary/10 transition-all duration-300 rounded-xl">
                  <User className="h-4 w-4" />
                  <span>{user.user_metadata?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-xl">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center hover:bg-primary/10 transition-colors duration-200">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center hover:bg-primary/10 transition-colors duration-200">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCoursesClick} className="hover:bg-primary/10 transition-colors duration-200">
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Courses
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/learning-analytics" className="flex items-center hover:bg-primary/10 transition-colors duration-200">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Learning Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/instructor" className="flex items-center hover:bg-primary/10 transition-colors duration-200">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Instructor Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/smart-recommendations" className="flex items-center hover:bg-primary/10 transition-colors duration-200">
                    <Brain className="mr-2 h-4 w-4" />
                    Smart Recommendations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/adaptive-content" className="flex items-center hover:bg-primary/10 transition-colors duration-200">
                    <Brain className="mr-2 h-4 w-4" />
                    Adaptive Learning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="hover:bg-destructive/10 transition-colors duration-200">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300 rounded-xl">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                  Sign Up
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
