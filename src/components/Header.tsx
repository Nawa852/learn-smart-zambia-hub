
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

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-blue-600">
          EDU ZAMBIA
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          {!user ? (
            <>
              <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                Courses
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                Courses
              </Link>
              <Link to="/smart-recommendations" className="text-gray-600 hover:text-blue-600 transition-colors">
                Smart AI
              </Link>
              <Link to="/instructor" className="text-gray-600 hover:text-blue-600 transition-colors">
                Instructor
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{user.user_metadata?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/courses" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/learning-analytics" className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Learning Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/instructor" className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Instructor Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/smart-recommendations" className="flex items-center">
                    <Brain className="mr-2 h-4 w-4" />
                    Smart Recommendations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/adaptive-content" className="flex items-center">
                    <Brain className="mr-2 h-4 w-4" />
                    Adaptive Learning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

export default Header;
