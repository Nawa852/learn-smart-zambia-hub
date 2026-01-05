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
  Home,
  GraduationCap,
  Settings,
  Zap,
  FileText,
  Lightbulb,
  Target,
  Gamepad2,
  Briefcase,
  BarChart3,
  BookOpen,
  Play,
  Search,
  Upload,
  Camera,
  Mic,
  Globe2,
  Award,
  Star,
  Grid3X3
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
import BrightSphereLogo from "@/assets/brightsphere-logo.svg"

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === 'collapsed'
  const location = useLocation()
  const [aiExpanded, setAiExpanded] = React.useState(true)
  const [practiceExpanded, setPracticeExpanded] = React.useState(false)
  const [socialExpanded, setSocialExpanded] = React.useState(false)
  const [analyticsExpanded, setAnalyticsExpanded] = React.useState(false)

  const userName = localStorage.getItem('edu-zambia-onboarding') 
    ? JSON.parse(localStorage.getItem('edu-zambia-onboarding') || '{}').fullName || 'Student'
    : 'Student'

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Mega Dashboard", url: "/mega-dashboard", icon: Grid3X3, badge: "164 Features" },
    { title: "My Courses", url: "/courses", icon: BookOpen },
    { title: "My Profile", url: "/profile", icon: User },
  ]

  const aiFeatures = [
    { title: "AI Tutor Hub", url: "/multi-ai-tutor", icon: Brain, badge: "Popular" },
    { title: "Photo Solver", url: "/comprehensive-ai-study", icon: Camera },
    { title: "Flashcard Generator", url: "/ai-flashcards", icon: Lightbulb },
    { title: "Mind Map Builder", url: "/visual-mind-map", icon: Network },
    { title: "Study Assistant", url: "/study-assistant", icon: Sparkles },
    { title: "Voice Learning", url: "/comprehensive-ai-hub", icon: Mic },
    { title: "Translator", url: "/multilingual-translator", icon: Languages },
    { title: "Smart Search", url: "/semantic-search", icon: Search },
  ]

  const practiceFeatures = [
    { title: "Quiz Creator", url: "/ai-quiz-creator", icon: Target },
    { title: "Exam Simulator", url: "/ecz-exam-simulator", icon: FileText },
    { title: "Interactive Games", url: "/interactive-ecz-games", icon: Gamepad2 },
    { title: "Virtual Lab", url: "/ecz-virtual-lab-simulator", icon: Play },
    { title: "Assignment Hub", url: "/ecz-assignment-hub", icon: Upload },
  ]

  const socialFeatures = [
    { title: "Study Groups", url: "/study-groups", icon: Users },
    { title: "Messages", url: "/messenger", icon: MessageCircle },
    { title: "Peer Finder", url: "/peer-finder", icon: Globe2 },
    { title: "Events", url: "/events-learning", icon: Calendar },
    { title: "Campus Map", url: "/campus-map", icon: MapPin },
    { title: "Knowledge Feed", url: "/knowledge-feed", icon: Star },
  ]

  const analyticsFeatures = [
    { title: "Learning Analytics", url: "/learning-analytics", icon: BarChart3 },
    { title: "Progress Tracker", url: "/ai-study-progress-tracker", icon: TrendingUp },
    { title: "Achievements", url: "/achievements", icon: Trophy },
    { title: "Goal Coach", url: "/daily-goal-coach", icon: Award },
    { title: "Live Classes", url: "/virtual-classroom", icon: Video },
  ]

  const isActive = (path: string) => location.pathname === path

  const renderNavSection = (
    items: typeof mainItems, 
    expanded: boolean, 
    setExpanded: (val: boolean) => void, 
    label: string
  ) => (
    <Collapsible open={expanded} onOpenChange={setExpanded} className="px-2">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 hover:bg-accent/30 rounded-lg transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
            {!collapsed && (
              <ChevronDown className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                !expanded && "-rotate-90"
              )} />
            )}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="animate-accordion-down">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5 mt-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                        isActive(item.url)
                          ? "bg-primary/10 text-primary border-l-2 border-primary" 
                          : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="text-sm flex-1">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )

  return (
    <Sidebar className={cn(
      collapsed ? "w-[70px]" : "w-[280px]",
      "transition-all duration-300 ease-in-out"
    )} collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-card via-card to-card/95 border-r border-border/50">
        {/* BrightSphere Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center overflow-hidden">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-sm bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  BrightSphere
                </h2>
                <p className="text-xs text-muted-foreground">AI Learning Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 mx-2 my-2 rounded-xl bg-gradient-to-br from-accent/50 to-accent/20 border border-border/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{userName}</h3>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-muted-foreground">Level 1 Learner</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-2 py-2">
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

        {/* AI Learning Hub */}
        {renderNavSection(aiFeatures as any, aiExpanded, setAiExpanded, "🤖 AI Learning Hub")}

        {/* Practice Lab */}
        {renderNavSection(practiceFeatures as any, practiceExpanded, setPracticeExpanded, "🎯 Practice Lab")}

        {/* Social & Community */}
        {renderNavSection(socialFeatures as any, socialExpanded, setSocialExpanded, "👥 Community")}

        {/* Analytics & Progress */}
        {renderNavSection(analyticsFeatures as any, analyticsExpanded, setAnalyticsExpanded, "📊 Progress")}

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
                  <img src={BrightSphereLogo} alt="BrightSphere" className="w-5 h-5" />
                  <span className="text-xs font-medium">Powered by</span>
                </div>
                <p className="text-sm font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mt-1">
                  BrightSphere AI
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Inspired by ChatEDU, Filo, Coursera & More
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
