import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  User,
  Brain,
  Users,
  BarChart3,
  Trophy,
  FolderOpen,
  GraduationCap,
  Video,
  Settings,
  Zap
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import BrightSphereLogo from "@/assets/brightsphere-logo.svg"

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === 'collapsed'
  const location = useLocation()

  const userName = localStorage.getItem('edu-zambia-onboarding') 
    ? JSON.parse(localStorage.getItem('edu-zambia-onboarding') || '{}').fullName || 'Student'
    : 'Student'

  const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "AI Tutor", url: "/ai", icon: Brain },
    { title: "My Courses", url: "/courses", icon: BookOpen },
    { title: "Community", url: "/community", icon: Users },
    { title: "Materials", url: "/materials", icon: FolderOpen },
    { title: "Classroom", url: "/classroom", icon: Video },
    { title: "Lessons", url: "/lessons", icon: GraduationCap },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
    { title: "Achievements", url: "/achievements", icon: Trophy },
    { title: "Profile", url: "/profile", icon: User },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <Sidebar className={cn(
      collapsed ? "w-[70px]" : "w-[240px]",
      "transition-all duration-300 ease-in-out"
    )} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  BrightSphere
                </h2>
                <p className="text-xs text-muted-foreground">AI Learning</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 mx-2 my-2 rounded-xl bg-accent/20 border border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{userName}</h3>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-muted-foreground">Level 1</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-2 py-2 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "hover:bg-accent/50 text-foreground/80 hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="p-4 border-t border-border mt-auto">
          <NavLink 
            to="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors",
              collapsed && "justify-center"
            )}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span className="text-sm">Settings</span>}
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
