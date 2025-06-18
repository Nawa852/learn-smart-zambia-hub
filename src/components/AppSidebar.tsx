
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, Home, BookOpen, User, LogOut, Settings, BarChart3, Sparkles, Brain, Users } from "lucide-react";
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

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Analytics", url: "/learning-analytics", icon: BarChart3 },
  { title: "AI Lab", url: "/ai-learning-lab", icon: Sparkles },
  { title: "Smart AI", url: "/smart-recommendations", icon: Brain },
  { title: "Groups", url: "/study-groups", icon: Users },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar className="min-h-screen shadow-3xl bg-gradient-to-b from-blue-50/90 via-white/90 to-purple-50/90">
      <SidebarHeader>
        <div
          className="flex items-center gap-3 my-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <GraduationCap className="w-7 h-7 text-blue-600" />
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EDU ZAMBIA</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url} active={location.pathname === item.url}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2 text-gray-700 hover:text-blue-700">
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button
          className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
