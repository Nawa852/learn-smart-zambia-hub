
import { BookOpen, Menu, Search, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg zambia-gradient flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
              Learn Smart Zambia
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-zambia-copper transition-colors">
            Courses
          </a>
          <a href="#" className="text-sm font-medium hover:text-zambia-copper transition-colors">
            Community
          </a>
          <a href="#" className="text-sm font-medium hover:text-zambia-copper transition-colors">
            Progress
          </a>
          <a href="#" className="text-sm font-medium hover:text-zambia-copper transition-colors">
            Resources
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10 w-64"
              />
            </div>
          </div>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          
          <Button className="hidden md:inline-flex bg-zambia-copper hover:bg-orange-600">
            Sign Up
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
