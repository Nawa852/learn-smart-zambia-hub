
import React from "react"
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Book,
  User,
  Settings,
  HelpCircle,
  GraduationCap,
  Brain,
  Search,
  Lightbulb,
  MessageSquare,
  Users,
  MapPin,
  Handshake,
  Calendar,
  Newspaper,
  Sparkles,
  Target,
  PenBox,
  BookOpenCheck,
  Languages,
  Network,
  Presentation,
  Gamepad2,
  FileText,
  MessageCircle,
  Compass,
  Home,
  Heart,
  Share2,
  TrendingUp,
  Video,
  Image,
  Trophy,
  ChevronDown,
  ChevronRight
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
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === 'collapsed'
  const [socialExpanded, setSocialExpanded] = React.useState(true)
  const [aiExpanded, setAiExpanded] = React.useState(false)
  const [learningExpanded, setLearningExpanded] = React.useState(false)

  const mainItems = [
    {
      title: "Home Feed",
      url: "/dashboard",
      icon: Home,
      color: "text-primary"
    },
    {
      title: "My Profile",
      url: "/profile",
      icon: User,
      color: "text-accent"
    },
    {
      title: "Courses",
      url: "/courses",
      icon: Book,
      color: "text-zambia-emerald"
    },
  ]

  const socialFeatures = [
    {
      title: "News Feed",
      url: "/social-feed",
      icon: Newspaper,
      badge: "3 new"
    },
    {
      title: "Study Groups",
      url: "/study-groups",
      icon: Users,
      badge: "5 active"
    },
    {
      title: "Messages",
      url: "/messenger",
      icon: MessageCircle,
      badge: "2"
    },
    {
      title: "Friends",
      url: "/peer-finder",
      icon: Heart,
      badge: "12 online"
    },
    {
      title: "Campus Map",
      url: "/campus-map",
      icon: MapPin,
    },
    {
      title: "Events",
      url: "/events-learning",
      icon: Calendar,
      badge: "Today"
    },
    {
      title: "Marketplace",
      url: "/study-materials",
      icon: Share2,
    },
  ]

  const aiFeatures = [
    {
      title: "AI Tutor",
      url: "/multi-ai-tutor",
      icon: Brain,
    },
    {
      title: "Smart Study",
      url: "/ai-study-helper",
      icon: Sparkles,
    },
    {
      title: "Flashcards",
      url: "/ai-flashcards",
      icon: GraduationCap,
    },
    {
      title: "Mind Maps",
      url: "/visual-mind-map",
      icon: Network,
    },
    {
      title: "Translator",
      url: "/multilingual-translator",
      icon: Languages,
    },
  ]

  const learningFeatures = [
    {
      title: "Analytics",
      url: "/learning-analytics",
      icon: TrendingUp,
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: Trophy,
    },
    {
      title: "Live Classes",
      url: "/virtual-classroom",
      icon: Video,
    },
    {
      title: "Gallery",
      url: "/knowledge-feed",
      icon: Image,
    },
  ]


  const isActive = (path: string) => window.location.pathname === path

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="bg-card/50 backdrop-blur-md border-r">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bright-sphere flex items-center justify-center">
              <span className="text-white font-bold">BS</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg gradient-text-bright-sphere">Learn Smart</h1>
                <p className="text-xs text-muted-foreground">Zambia Hub</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarMenu>
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-12">
                  <NavLink 
                    to={item.url}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all hover-lift ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'hover:bg-muted/50'
                      }`
                    }
                  >
                    <item.icon className={`h-5 w-5 ${item.color || ''}`} />
                    {!collapsed && <span className="font-medium">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Social Features */}
        <Collapsible open={socialExpanded} onOpenChange={setSocialExpanded}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg">
                <span className="font-semibold text-facebook-blue">Social</span>
                {!collapsed && (
                  socialExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {socialFeatures.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url}
                          className={({ isActive }) => 
                            `flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-all hover:bg-muted/50 ${
                              isActive ? 'bg-facebook-blue/10 text-facebook-blue border-l-2 border-facebook-blue' : ''
                            }`
                          }
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            {!collapsed && <span className="text-sm">{item.title}</span>}
                          </div>
                          {!collapsed && item.badge && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                              {item.badge}
                            </span>
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

        {/* AI Features */}
        <Collapsible open={aiExpanded} onOpenChange={setAiExpanded}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg">
                <span className="font-semibold text-accent">AI Tools</span>
                {!collapsed && (
                  aiExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {aiFeatures.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url}
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-muted/50 ${
                              isActive ? 'bg-accent/10 text-accent border-l-2 border-accent' : ''
                            }`
                          }
                        >
                          <item.icon className="h-4 w-4" />
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
        <Collapsible open={learningExpanded} onOpenChange={setLearningExpanded}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg">
                <span className="font-semibold text-zambia-emerald">Learning</span>
                {!collapsed && (
                  learningExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {learningFeatures.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url}
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-muted/50 ${
                              isActive ? 'bg-zambia-emerald/10 text-zambia-emerald border-l-2 border-zambia-emerald' : ''
                            }`
                          }
                        >
                          <item.icon className="h-4 w-4" />
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
        <div className="mt-auto p-4 border-t">
          <div className="text-center text-xs text-muted-foreground">
            Powered by
            <div className="font-semibold gradient-text-bright-sphere text-sm">
              Bright Sphere
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
