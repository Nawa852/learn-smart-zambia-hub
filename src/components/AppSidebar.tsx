
import React from "react"
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
} from "lucide-react"

import { NavItem } from "@/components/ui/nav-item"
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { useSidebar } from "@/components/ui/sidebar"

interface SidebarProps {
  className?: string
}

export function AppSidebar({ className }: SidebarProps) {
  const { state } = useSidebar()

  const sidebarItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      description: "Overview of your learning progress and goals",
    },
    {
      title: "Courses",
      url: "/courses",
      icon: Book,
      description: "Explore available courses and learning paths",
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      description: "Manage your profile and account settings",
    },
    {
      title: "Learning Analytics",
      url: "/learning-analytics",
      icon: Settings,
      description: "Track your learning progress and performance",
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: HelpCircle,
      description: "View your achievements and earned rewards",
    },
  ]

  const aiFeatures = [
    {
      title: "AI Flashcards",
      url: "/ai-flashcards",
      icon: GraduationCap,
      description: "Generate flashcards with AI for efficient learning",
    },
    {
      title: "Multi-AI Tutor",
      url: "/multi-ai-tutor",
      icon: Brain,
      description: "Get help from multiple AI models for different subjects",
    },
    {
      title: "AI Study Helper",
      url: "/ai-study-helper",
      icon: Search,
      description: "Your personal AI tutor, scheduler, and learning companion",
    },
    {
      title: "Smart Recommendations",
      url: "/smart-recommendations",
      icon: Lightbulb,
      description: "AI-powered personalized learning recommendations",
    },
    {
      title: "Semantic Search",
      url: "/semantic-search",
      icon: Search,
      description: "AI-powered intelligent search across learning content",
    },
    {
      title: "Emotion Detection",
      url: "/emotion-detection",
      icon: MessageSquare,
      description: "Analyze emotions in text for better understanding",
    },
    {
      title: "Multilingual Translator",
      url: "/multilingual-translator",
      icon: Languages,
      description: "AI-powered course translation for global learning",
    },
    {
      title: "Visual Mind Map",
      url: "/visual-mind-map",
      icon: Network,
      description: "Create interactive mind maps with AI assistance",
    },
    {
      title: "Teach Back Assessment",
      url: "/teach-back-assessment",
      icon: Presentation,
      description: "Demonstrate understanding by teaching concepts to AI",
    },
    {
      title: "Gameify Vault",
      url: "/gameify-vault",
      icon: Gamepad2,
      description: "Gamified learning experiences and rewards",
    },
    {
      title: "AI Learning Paths",
      url: "/ai-learning-paths",
      icon: Compass,
      description: "AI-generated personalized learning paths",
    },
    {
      title: "Daily Goal Coach",
      url: "/daily-goal-coach",
      icon: Target,
      description: "AI-powered daily goal setting and tracking",
    },
    {
      title: "Claude Journaling",
      url: "/claude-journaling",
      icon: PenBox,
      description: "AI-assisted journaling with Claude for reflection",
    },
    {
      title: "Study Assistant",
      url: "/study-assistant",
      icon: Brain,
      description: "24/7 AI tutor with multilingual support"
    },
  ];

  const socialFeatures = [
    {
      title: "Social Feed",
      url: "/social-feed",
      icon: MessageCircle,
      description: "Connect with peers and share learning experiences",
    },
    {
      title: "Study Groups",
      url: "/study-groups",
      icon: Users,
      description: "Join or create study groups for collaborative learning",
    },
    {
      title: "Messenger",
      url: "/messenger",
      icon: MessageSquare,
      description: "Real-time messaging with peers and mentors",
    },
    {
      title: "Campus Map",
      url: "/campus-map",
      icon: MapPin,
      description: "Explore campus resources and locations",
    },
    {
      title: "Peer Finder",
      url: "/peer-finder",
      icon: Search,
      description: "Find peers with similar interests and goals",
    },
    {
      title: "Mentorship Hub",
      url: "/mentorship-hub",
      icon: Handshake,
      description: "Connect with mentors for guidance and support",
    },
    {
      title: "Events Learning",
      url: "/events-learning",
      icon: Calendar,
      description: "Discover and participate in learning events",
    },
    {
      title: "Knowledge Feed",
      url: "/knowledge-feed",
      icon: Newspaper,
      description: "Stay updated with the latest learning resources",
    },
  ]

  const studyMaterials = [
    {
      title: "Study Material Repository",
      url: "/study-materials",
      icon: FileText,
      description: "Access shared study materials and resources",
    },
  ]

  return (
    <div className={`hidden border-r bg-gray-100/40 lg:block dark:border-muted/40 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Platform
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <NavItem
                key={item.title}
                title={item.title}
                href={item.url}
                icon={item.icon}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            AI Features
          </h2>
          <div className="space-y-1">
            {aiFeatures.map((item) => (
              <NavItem
                key={item.title}
                title={item.title}
                href={item.url}
                icon={item.icon}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Social Learning
          </h2>
          <div className="space-y-1">
            {socialFeatures.map((item) => (
              <NavItem
                key={item.title}
                title={item.title}
                href={item.url}
                icon={item.icon}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Study Materials
          </h2>
          <div className="space-y-1">
            {studyMaterials.map((item) => (
              <NavItem
                key={item.title}
                title={item.title}
                href={item.url}
                icon={item.icon}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
