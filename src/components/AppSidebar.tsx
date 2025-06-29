
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Book,
  Calendar,
  Settings,
  Users,
  ListChecks,
  GraduationCap,
  FolderOpen,
  Brain,
  MessageSquare,
  Award,
  BarChart3,
  Camera,
  Globe,
  Utensils,
  Briefcase,
  Heart,
  Gamepad2,
  Newspaper,
  HelpCircle,
  Shield,
  Wifi,
  BookOpenCheck,
  Video,
  UserCheck,
  PenTool,
  Eye,
  Trophy,
  Bell,
  MessageCircle
} from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<any>;
  isActive: boolean;
  items?: { title: string; url: string }[];
}

const navAdmin: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
    isActive: false,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: Book,
    isActive: false,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    isActive: false,
  },
];

const navMain: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    isActive: false,
  },
  {
    title: "AI Study Assistant",
    url: "/ai-study-helper",
    icon: Brain,
    isActive: false,
  },
  {
    title: "Study Materials",
    url: "/study-materials",
    icon: FolderOpen,
    isActive: false,
    items: [
      {
        title: "Repository",
        url: "/study-materials",
      },
      {
        title: "Upload Materials",
        url: "/study-materials#upload",
      },
      {
        title: "Popular Materials",
        url: "/study-materials#popular",
      },
    ],
  },
  {
    title: "Courses & Tutorials",
    url: "/courses",
    icon: Book,
    isActive: false,
  },
  {
    title: "ECZ Exam Prep",
    url: "/ecz-exam-prep",
    icon: BookOpenCheck,
    isActive: false,
  },
  {
    title: "Virtual Classroom",
    url: "/virtual-classroom",
    icon: Video,
    isActive: false,
  },
  {
    title: "Community",
    url: "/community",
    icon: MessageSquare,
    isActive: false,
  },
  {
    title: "Career Hub",
    url: "/career-hub",
    icon: Briefcase,
    isActive: false,
  },
  {
    title: "Meal Planner",
    url: "/meal-planner",
    icon: Utensils,
    isActive: false,
  },
  {
    title: "Gamified Learning",
    url: "/gamified-learning",
    icon: Gamepad2,
    isActive: false,
  },
  {
    title: "Virtual Labs",
    url: "/virtual-labs",
    icon: GraduationCap,
    isActive: false,
  },
  {
    title: "Mentorship",
    url: "/mentorship",
    icon: UserCheck,
    isActive: false,
  },
  {
    title: "Scholarships",
    url: "/scholarships",
    icon: Award,
    isActive: false,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    isActive: false,
  },
];

interface AppSidebarProps {
  isAdmin?: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isAdmin = false }) => {
  const location = useLocation();
  const navigation = isAdmin ? navAdmin : navMain;

  return (
    <div className="flex flex-col w-64 bg-secondary border-r border-muted">
      <div className="p-4">
        <h1 className="text-lg font-semibold">EduZambia</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <div key={item.title}>
            <Link
              to={item.url}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground",
                {
                  "bg-accent text-accent-foreground": location.pathname === item.url,
                }
              )}
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.title}</span>
            </Link>
            {item.items && location.pathname === item.url && (
              <div className="ml-4 space-y-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.title}
                    to={subItem.url}
                    className="block p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AppSidebar;
