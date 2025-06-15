
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  GraduationCap, Home, BookOpen, User, LogOut, Settings, BarChart3, 
  Sparkles, Brain, Users, Shield, Award, Bot, GitBranch, Target, FileText, 
  BookCopy, Search, Languages, Smile, BrainCircuit, Gamepad2, Rss, MapPin, 
  UserPlus, Calendar, MessageSquare, Heart 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useProfile } from "@/hooks/useProfile";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home, badge: "New" },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Analytics", url: "/learning-analytics", icon: BarChart3 },
  { title: "Achievements", url: "/achievements", icon: Award },
];

const aiToolsItems = [
  { title: "AI Learning Lab", url: "/ai-learning-lab", icon: Sparkles, badge: "Hot" },
  { title: "Multi-AI Tutor", url: "/multi-ai-tutor", icon: Bot },
  { title: "AI Study Helper", url: "/ai-study-helper", icon: Brain },
  { title: "Learning Paths", url: "/ai-learning-paths", icon: GitBranch },
  { title: "Goal Coach", url: "/daily-goal-coach", icon: Target },
  { title: "Claude Journaling", url: "/claude-journaling", icon: FileText },
  { title: "AI Flashcards", url: "/ai-flashcards", icon: BookCopy },
  { title: "Semantic Search", url: "/semantic-search", icon: Search },
  { title: "Emotion Detection", url: "/emotion-detection", icon: Smile },
  { title: "Translator", url: "/multilingual-translator", icon: Languages },
  { title: "Mind Maps", url: "/visual-mind-map", icon: GitBranch },
  { title: "Teach Back", url: "/teach-back-assessment", icon: BrainCircuit },
  { title: "Gameify Vault", url: "/gameify-vault", icon: Gamepad2 },
];

const socialItems = [
  { title: "Social Feed", url: "/social-feed", icon: Heart },
  { title: "Knowledge Feed", url: "/knowledge-feed", icon: Rss },
  { title: "Study Groups", url: "/study-groups", icon: Users },
  { title: "Messenger", url: "/messenger", icon: MessageSquare, badge: "3" },
  { title: "Campus Map", url: "/campus-map", icon: MapPin },
  { title: "Find Peers", url: "/peer-finder", icon: UserPlus },
  { title: "Mentorship Hub", url: "/mentorship-hub", icon: GraduationCap },
  { title: "Learning Events", url: "/events-learning", icon: Calendar },
];

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroupProps {
  label: string;
  items: NavItem[];
  defaultColorClass: string;
}

const NavGroup: React.FC<NavGroupProps> = ({ label, items, defaultColorClass }) => {
  const location = useLocation();
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-semibold text-gray-600 mb-3 px-2 mt-6">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                className={`group hover:bg-gradient-to-r ${defaultColorClass} rounded-lg transition-all duration-200 relative`}
              >
                <a href={item.url} className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-700">
                  <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                    location.pathname === item.url
                      ? 'bg-blue-100 text-blue-600'
                      : 'group-hover:bg-blue-50 group-hover:text-blue-600'
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium flex-1">{item.title}</span>
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "New" ? "default" : "secondary"} 
                      className="text-xs h-5 px-1.5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export function AppSidebar() {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar className="min-h-screen shadow-2xl bg-gradient-to-b from-slate-50/95 via-white/98 to-blue-50/95 backdrop-blur-lg border-r border-blue-100/50">
      <SidebarHeader className="border-b border-blue-100/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80">
        <div
          className="flex items-center gap-3 my-4 cursor-pointer group hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              EDU ZAMBIA
            </span>
            <span className="text-xs text-gray-500 font-medium">Learning Platform</span>
          </div>
        </div>
        
        {/* User Profile Section */}
        {profile && (
          <div className="mb-4 p-3 bg-white/60 rounded-lg border border-blue-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile.full_name || 'Student'}
                </p>
                <p className="text-xs text-gray-500 capitalize">{profile.role || 'student'}</p>
              </div>
            </div>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <NavGroup label="Main Navigation" items={mainItems} defaultColorClass="hover:from-blue-50 hover:to-purple-50 hover:border-blue-200/50" />
        <NavGroup label="AI Tools" items={aiToolsItems} defaultColorClass="hover:from-purple-50 hover:to-pink-50 hover:border-purple-200/50" />
        <NavGroup label="Social & Community" items={socialItems} defaultColorClass="hover:from-green-50 hover:to-blue-50 hover:border-green-200/50" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-600 mb-3 px-2 mt-6">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/profile"}
                  className="group hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:border-gray-200/50 rounded-lg transition-all duration-200"
                >
                  <a href="/profile" className="flex items-center gap-3 p-3 text-gray-700 hover:text-gray-900">
                    <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                      location.pathname === "/profile" 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'group-hover:bg-gray-50 group-hover:text-gray-600'
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-blue-100/50 bg-gradient-to-r from-red-50/80 to-orange-50/80 p-4">
        <button
          className="w-full flex items-center justify-center gap-3 p-3 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-lg transition-all duration-300 font-medium shadow-sm hover:shadow-md"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
