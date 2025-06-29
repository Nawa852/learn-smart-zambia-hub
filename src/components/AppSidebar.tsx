import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Dashboard,
  Book,
  Calendar,
  Settings,
  Users,
  ListChecks,
  GraduationCap,
  FolderOpen,
} from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<any>;
  isActive: boolean;
  items?: { title: string; url: string }[];
}

const navAdmin = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Dashboard,
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

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Dashboard,
    isActive: false,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: Book,
    isActive: false,
  },
  {
    title: "Assignments",
    url: "/assignments",
    icon: ListChecks,
    isActive: false,
  },
  {
    title: "Study Planner",
    url: "/study-planner",
    icon: Calendar,
    isActive: false,
  },
  {
    title: "Virtual Labs",
    url: "/virtual-labs",
    icon: GraduationCap,
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
  const pathname = usePathname();
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
              href={item.url}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground",
                {
                  "bg-accent text-accent-foreground": pathname === item.url,
                }
              )}
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.title}</span>
            </Link>
            {item.items && pathname === item.url && (
              <div className="ml-4 space-y-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.title}
                    href={subItem.url}
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
