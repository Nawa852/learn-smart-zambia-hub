
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, Home, BookOpen, User, LogOut, Settings, BarChart3, Sparkles, Brain, Users, Shield, Award } from "lucide-react";
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
import { useAuth } from "@/components/Auth/AuthProvider";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Analytics", url: "/learning-analytics", icon: BarChart3 },
];

const aiItems = [
  { title: "AI Lab", url: "/ai-learning-lab", icon: Sparkles },
  { title: "Smart AI", url: "/smart-recommendations", icon: Brain },
  { title: "AI Tutor", url: "/ai-tutor", icon: Brain },
];

const socialItems = [
  { title: "Study Groups", url: "/study-groups", icon: Users },
  { title: "Social Feed", url: "/social-feed", icon: Users },
  { title: "Achievements", url: "/achievements", icon: Award },
];

export function AppSidebar() {
  const { signOut } = useAuth();
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
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-600 mb-3 px-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-200/50 rounded-lg transition-all duration-200"
                  >
                    <a href={item.url} className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-700">
                      <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                        location.pathname === item.url 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-600 mb-3 px-2 mt-6">
            AI Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {aiItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="group hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200/50 rounded-lg transition-all duration-200"
                  >
                    <a href={item.url} className="flex items-center gap-3 p-3 text-gray-700 hover:text-purple-700">
                      <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                        location.pathname === item.url 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'group-hover:bg-purple-50 group-hover:text-purple-600'
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-600 mb-3 px-2 mt-6">
            Social & Progress
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {socialItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="group hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-200/50 rounded-lg transition-all duration-200"
                  >
                    <a href={item.url} className="flex items-center gap-3 p-3 text-gray-700 hover:text-green-700">
                      <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                        location.pathname === item.url 
                          ? 'bg-green-100 text-green-600' 
                          : 'group-hover:bg-green-50 group-hover:text-green-600'
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
