import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Book,
  User,
  Brain,
  MessageCircle,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  Languages,
  Network,
  TrendingUp,
  Video,
  Trophy,
  ChevronDown,
  ChevronRight,
  Home,
  GraduationCap,
  Settings,
  LogOut,
  Bell
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === 'collapsed'
  const location = useLocation()
  const [socialExpanded, setSocialExpanded] = React.useState(true)
  const [aiExpanded, setAiExpanded] = React.useState(false)
  const [learningExpanded, setLearningExpanded] = React.useState(false)

  const userName = localStorage.getItem('edu-zambia-onboarding') 
    ? JSON.parse(localStorage.getItem('edu-zambia-onboarding') || '{}').fullName || 'Student'
    : 'Student'

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "My Profile", url: "/profile", icon: User },
    { title: "Courses", url: "/courses", icon: Book },
  ]

  const socialFeatures = [
    { title: "Study Groups", url: "/study-groups", icon: Users },
    { title: "Messages", url: "/messenger", icon: MessageCircle },
    { title: "Campus Map", url: "/campus-map", icon: MapPin },
    { title: "Events", url: "/events-learning", icon: Calendar },
  ]

  const aiFeatures = [
    { title: "AI Tutor", url: "/multi-ai-tutor", icon: Brain },
    { title: "Smart Study", url: "/ai-study-helper", icon: Sparkles },
    { title: "Flashcards", url: "/ai-flashcards", icon: GraduationCap },
    { title: "Mind Maps", url: "/visual-mind-map", icon: Network },
    { title: "Translator", url: "/multilingual-translator", icon: Languages },
  ]

  const learningFeatures = [
    { title: "Analytics", url: "/learning-analytics", icon: TrendingUp },
    { title: "Achievements", url: "/achievements", icon: Trophy },
    { title: "Live Classes", url: "/virtual-classroom", icon: Video },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <Sidebar className={cn(
      collapsed ? "w-[70px]" : "w-[280px]",
      "transition-all duration-300 ease-in-out"
    )} collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-card via-card to-card/95 border-r border-border/50">
        {/* Header with User Profile */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm truncate">{userName}</h2>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-2 py-4">
          <SidebarMenu className="space-y-1">
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-11">
                  <NavLink 
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                      isActive(item.url)
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" 
                        : "hover:bg-accent/50 text-foreground/80 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span className="font-medium text-sm">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Social Features */}
        <Collapsible open={socialExpanded} onOpenChange={setSocialExpanded} className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 hover:bg-accent/30 rounded-lg transition-colors">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Social</span>
                {!collapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    !socialExpanded && "-rotate-90"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="animate-accordion-down">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5 mt-1">
                  {socialFeatures.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                            isActive(item.url)
                              ? "bg-accent text-accent-foreground" 
                              : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span className="text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* AI Features */}
        <Collapsible open={aiExpanded} onOpenChange={setAiExpanded} className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 hover:bg-accent/30 rounded-lg transition-colors">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Tools</span>
                {!collapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    !aiExpanded && "-rotate-90"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="animate-accordion-down">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5 mt-1">
                  {aiFeatures.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                            isActive(item.url)
                              ? "bg-accent text-accent-foreground" 
                              : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span className="text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Learning Features */}
        <Collapsible open={learningExpanded} onOpenChange={setLearningExpanded} className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 hover:bg-accent/30 rounded-lg transition-colors">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Learning</span>
                {!collapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    !learningExpanded && "-rotate-90"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="animate-accordion-down">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5 mt-1">
                  {learningFeatures.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                            isActive(item.url)
                              ? "bg-accent text-accent-foreground" 
                              : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span className="text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-border/50">
          {!collapsed ? (
            <div className="space-y-3">
              <NavLink 
                to="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </NavLink>
              <div className="px-3 py-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium">Powered by</span>
                </div>
                <p className="text-sm font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mt-1">
                  Bright Sphere
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}