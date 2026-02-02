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
  FileText,
  Calendar,
  MessageSquare,
  Lightbulb,
  Target,
  ClipboardCheck,
  School,
  Building2,
  UserCheck,
  Bell,
  Shield,
  Map,
  TrendingUp,
  PieChart,
  FileBarChart,
  Briefcase,
  Globe,
  Heart,
  Compass,
  Wrench,
  type LucideIcon
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// Student Navigation
export const studentNavigation: NavGroup[] = [
  {
    label: "Learning",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "AI Tutor", url: "/ai", icon: Brain },
      { title: "My Courses", url: "/courses", icon: BookOpen },
      { title: "Lessons", url: "/lessons", icon: GraduationCap },
      { title: "Virtual Classroom", url: "/classroom", icon: Video },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Study Materials", url: "/materials", icon: FolderOpen },
      { title: "Study Tools", url: "/study-tools", icon: Wrench },
      { title: "Flashcards", url: "/flashcards", icon: FileText },
      { title: "Mind Maps", url: "/mind-maps", icon: Lightbulb },
    ],
  },
  {
    label: "Progress",
    items: [
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Achievements", url: "/achievements", icon: Trophy },
      { title: "Goals", url: "/goals", icon: Target },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Community Hub", url: "/community", icon: Users },
      { title: "Study Groups", url: "/study-groups", icon: MessageSquare },
      { title: "Mentorship", url: "/mentorship", icon: Heart },
    ],
  },
];

// Teacher Navigation
export const teacherNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/teacher-dashboard", icon: LayoutDashboard },
      { title: "My Classes", url: "/my-classes", icon: School },
      { title: "Schedule", url: "/schedule", icon: Calendar },
    ],
  },
  {
    label: "Teaching",
    items: [
      { title: "AI Lesson Generator", url: "/lesson-generator", icon: Brain },
      { title: "Curriculum", url: "/curriculum", icon: BookOpen },
      { title: "Create Lesson", url: "/create-lesson", icon: FileText },
      { title: "Virtual Classroom", url: "/classroom", icon: Video },
    ],
  },
  {
    label: "Assessment",
    items: [
      { title: "Auto Grading", url: "/grading", icon: ClipboardCheck },
      { title: "Quiz Creator", url: "/quiz-creator", icon: Target },
      { title: "Assignments", url: "/assignments", icon: FileBarChart },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Class Analytics", url: "/class-analytics", icon: BarChart3 },
      { title: "Student Progress", url: "/student-progress", icon: TrendingUp },
      { title: "Reports", url: "/reports", icon: PieChart },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Teacher Hub", url: "/teacher-collaboration", icon: Users },
      { title: "Resources", url: "/materials", icon: FolderOpen },
    ],
  },
];

// Parent/Guardian Navigation
export const parentNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/parent-dashboard", icon: LayoutDashboard },
      { title: "My Children", url: "/my-children", icon: Users },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { title: "Progress Tracker", url: "/child-progress", icon: TrendingUp },
      { title: "Attendance", url: "/attendance", icon: Calendar },
      { title: "Grades", url: "/grades", icon: FileBarChart },
      { title: "Alerts", url: "/alerts", icon: Bell, badge: "3" },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "AI Parent Advisor", url: "/parent-advisor", icon: Brain },
      { title: "Study Tips", url: "/study-tips", icon: Lightbulb },
      { title: "Resources", url: "/parent-resources", icon: FolderOpen },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Messages", url: "/messages", icon: MessageSquare },
      { title: "Teacher Contact", url: "/teacher-contact", icon: UserCheck },
      { title: "School Updates", url: "/school-updates", icon: School },
    ],
  },
];

// School Admin Navigation
export const schoolAdminNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/school-admin", icon: LayoutDashboard },
      { title: "School Profile", url: "/school-profile", icon: Building2 },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Teachers", url: "/manage-teachers", icon: UserCheck },
      { title: "Students", url: "/manage-students", icon: Users },
      { title: "Classes", url: "/manage-classes", icon: School },
      { title: "Departments", url: "/departments", icon: Briefcase },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "School Analytics", url: "/school-analytics", icon: BarChart3 },
      { title: "Performance", url: "/performance", icon: TrendingUp },
      { title: "Compliance", url: "/compliance", icon: Shield },
      { title: "Reports", url: "/admin-reports", icon: FileBarChart },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Curriculum", url: "/curriculum-admin", icon: BookOpen },
      { title: "Announcements", url: "/announcements", icon: Bell },
      { title: "Settings", url: "/admin-settings", icon: Settings },
    ],
  },
];

// Ministry/NGO Navigation
export const ministryNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/ministry-dashboard", icon: LayoutDashboard },
      { title: "National View", url: "/national-view", icon: Globe },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Provincial Stats", url: "/provincial-stats", icon: Map },
      { title: "District Comparison", url: "/district-comparison", icon: BarChart3 },
      { title: "Performance Trends", url: "/trends", icon: TrendingUp },
      { title: "Impact Analysis", url: "/impact", icon: PieChart },
    ],
  },
  {
    label: "Policy",
    items: [
      { title: "Policy Dashboard", url: "/policy", icon: FileText },
      { title: "Compliance", url: "/ministry-compliance", icon: Shield },
      { title: "Initiatives", url: "/initiatives", icon: Compass },
    ],
  },
  {
    label: "Reports",
    items: [
      { title: "National Reports", url: "/national-reports", icon: FileBarChart },
      { title: "School Reports", url: "/school-reports", icon: School },
      { title: "Export Data", url: "/export-data", icon: Briefcase },
    ],
  },
];

// Get navigation based on user type
export function getNavigationByRole(userType: string): NavGroup[] {
  switch (userType?.toLowerCase()) {
    case "teacher":
      return teacherNavigation;
    case "parent":
    case "guardian":
      return parentNavigation;
    case "admin":
    case "school_admin":
    case "institution":
      return schoolAdminNavigation;
    case "ministry":
    case "ngo":
      return ministryNavigation;
    case "student":
    default:
      return studentNavigation;
  }
}

// Get default dashboard route by role
export function getDefaultDashboard(userType: string): string {
  switch (userType?.toLowerCase()) {
    case "teacher":
      return "/teacher-dashboard";
    case "parent":
    case "guardian":
      return "/parent-dashboard";
    case "admin":
    case "school_admin":
    case "institution":
      return "/school-admin";
    case "ministry":
    case "ngo":
      return "/ministry-dashboard";
    case "student":
    default:
      return "/dashboard";
  }
}

// Role labels for display
export const roleLabels: Record<string, string> = {
  student: "Student",
  teacher: "Teacher",
  parent: "Parent/Guardian",
  guardian: "Parent/Guardian",
  admin: "School Admin",
  school_admin: "School Admin",
  institution: "Institution",
  ministry: "Ministry",
  ngo: "NGO Partner",
};
