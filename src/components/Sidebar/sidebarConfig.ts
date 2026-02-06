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
  Sparkles,
  Youtube,
  Calculator,
  FlaskConical,
  Atom,
  Languages,
  BookMarked,
  Layers,
  Timer,
  Award,
  Gamepad2,
  Headphones,
  PenTool,
  Camera,
  Presentation,
  MessagesSquare,
  Library,
  Microscope,
  Bot,
  Zap,
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

// Student Navigation - Comprehensive with AceQuiz features
export const studentNavigation: NavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { title: "Home", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
  {
    label: "AI Quiz Tools",
    items: [
      { title: "AI Quiz Generator", url: "/ai-quiz", icon: Sparkles },
      { title: "Math Quiz", url: "/math-quiz", icon: Calculator },
      { title: "Science Quiz", url: "/science-quiz", icon: FlaskConical },
      { title: "YouTube Quiz", url: "/youtube-quiz", icon: Youtube },
      { title: "Vocabulary Quiz", url: "/vocabulary-quiz", icon: Languages },
    ],
  },
  {
    label: "AI Learning",
    items: [
      { title: "AI Tutor", url: "/ai", icon: Brain },
      { title: "Multi AI Tutor", url: "/multi-ai-tutor", icon: Bot },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
      { title: "Mind Maps", url: "/mind-maps", icon: Lightbulb },
      { title: "Study Assistant", url: "/study-assistant", icon: BookMarked },
      { title: "Learning Path", url: "/learning-path", icon: Compass },
    ],
  },
  {
    label: "Courses & Lessons",
    items: [
      { title: "My Courses", url: "/courses", icon: BookOpen },
      { title: "Lessons", url: "/lessons", icon: GraduationCap },
      { title: "Virtual Classroom", url: "/classroom", icon: Video },
      { title: "Video Learning", url: "/video-learning", icon: Presentation },
      { title: "YouTube Learning", url: "/youtube-learning", icon: Youtube },
    ],
  },
  {
    label: "🇿🇲 Zambian Resources",
    items: [
      { title: "Resources Hub", url: "/zambian-resources", icon: Library, badge: "NEW" },
      { title: "Resource Library", url: "/resource-library", icon: FolderOpen, badge: "60+" },
      { title: "ECZ Past Papers", url: "/ecz-past-papers", icon: FileText },
      { title: "Video Library", url: "/ecz-videos", icon: Youtube },
      { title: "Exam Simulator", url: "/ecz-exam-simulator", icon: Timer },
      { title: "Study Materials", url: "/materials", icon: FolderOpen },
      { title: "Study Tools", url: "/study-tools", icon: Wrench },
    ],
  },
  {
    label: "Progress & Goals",
    items: [
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Achievements", url: "/achievements", icon: Trophy },
      { title: "Daily Goals", url: "/goals", icon: Target },
      { title: "Skill Passport", url: "/skill-passport", icon: Award },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Community Hub", url: "/community", icon: Users },
      { title: "Study Groups", url: "/study-groups", icon: MessageSquare },
      { title: "Social Feed", url: "/social-feed", icon: MessagesSquare },
      { title: "Mentorship", url: "/mentorship", icon: Heart },
      { title: "Campus Map", url: "/campus-map", icon: Map },
    ],
  },
  {
    label: "More Tools",
    items: [
      { title: "Adaptive Content", url: "/adaptive-content", icon: Zap },
      { title: "Journaling", url: "/journaling", icon: PenTool },
      { title: "Teach Back", url: "/teach-back", icon: Presentation },
      { title: "Meal Planner", url: "/meal-planner", icon: Calendar },
    ],
  },
];

// Teacher Navigation
export const teacherNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/teacher-dashboard", icon: LayoutDashboard },
      { title: "My Profile", url: "/profile", icon: User },
      { title: "My Classes", url: "/courses", icon: School },
      { title: "Schedule", url: "/goals", icon: Calendar },
    ],
  },
  {
    label: "AI Teaching Tools",
    items: [
      { title: "AI Quiz Creator", url: "/ai-quiz", icon: Sparkles },
      { title: "AI Lesson Generator", url: "/ai", icon: Brain },
      { title: "Content Generator", url: "/flashcards", icon: FileText },
      { title: "Math Quiz Builder", url: "/math-quiz", icon: Calculator },
      { title: "Science Quiz Builder", url: "/science-quiz", icon: FlaskConical },
    ],
  },
  {
    label: "Teaching",
    items: [
      { title: "Curriculum", url: "/courses", icon: BookOpen },
      { title: "Create Lesson", url: "/lessons", icon: FileText },
      { title: "Virtual Classroom", url: "/classroom", icon: Video },
      { title: "Live Learning", url: "/live-learning", icon: Presentation },
      { title: "Resource Library", url: "/materials", icon: FolderOpen },
    ],
  },
  {
    label: "🇿🇲 Zambian Resources",
    items: [
      { title: "Resources Hub", url: "/zambian-resources", icon: Library, badge: "NEW" },
      { title: "ECZ Past Papers", url: "/ecz-past-papers", icon: FileText },
      { title: "Video Library", url: "/ecz-videos", icon: Youtube },
      { title: "Exam Simulator", url: "/ecz-exam-simulator", icon: Timer },
    ],
  },
  {
    label: "Assessment",
    items: [
      { title: "Auto Grading", url: "/analytics", icon: ClipboardCheck },
      { title: "Quiz Creator", url: "/ai-quiz", icon: Target },
      { title: "Assignments", url: "/courses", icon: FileBarChart },
      { title: "Exam Prep", url: "/ecz-exam-simulator", icon: Timer },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Class Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Student Progress", url: "/analytics", icon: TrendingUp },
      { title: "Reports", url: "/analytics", icon: PieChart },
      { title: "Insights", url: "/smart-recommendations", icon: Lightbulb },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Teacher Hub", url: "/community", icon: Users },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
      { title: "Forums", url: "/study-groups", icon: MessageSquare },
    ],
  },
];

// Parent/Guardian Navigation
export const parentNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/parent-dashboard", icon: LayoutDashboard },
      { title: "My Children", url: "/analytics", icon: Users },
      { title: "My Profile", url: "/profile", icon: User },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { title: "Progress Tracker", url: "/analytics", icon: TrendingUp },
      { title: "Attendance", url: "/analytics", icon: Calendar },
      { title: "Grades", url: "/analytics", icon: FileBarChart },
      { title: "Alerts", url: "/community", icon: Bell, badge: "3" },
      { title: "Learning Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "AI Parent Advisor", url: "/ai", icon: Brain },
      { title: "Quiz Review", url: "/ai-quiz", icon: Sparkles },
      { title: "Study Tips", url: "/smart-recommendations", icon: Lightbulb },
    ],
  },
  {
    label: "🇿🇲 Zambian Resources",
    items: [
      { title: "Resources Hub", url: "/zambian-resources", icon: Library, badge: "NEW" },
      { title: "ECZ Past Papers", url: "/ecz-past-papers", icon: FileText },
      { title: "Video Library", url: "/ecz-videos", icon: Youtube },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "Resources", url: "/materials", icon: FolderOpen },
      { title: "Parent Support Hub", url: "/ecz-parent-support", icon: Heart },
      { title: "Meal Planner", url: "/meal-planner", icon: Calendar },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Messages", url: "/community", icon: MessageSquare },
      { title: "Teacher Contact", url: "/community", icon: UserCheck },
      { title: "School Updates", url: "/community", icon: School },
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
    label: "AI Tools",
    items: [
      { title: "AI Analytics", url: "/ai-analytics", icon: Brain },
      { title: "Quiz Generator", url: "/ai-quiz", icon: Sparkles },
      { title: "Content Curator", url: "/content-curator", icon: Library },
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
      { title: "Resources", url: "/school-resources", icon: FolderOpen },
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
    label: "AI Tools",
    items: [
      { title: "AI Insights", url: "/ai-insights", icon: Brain },
      { title: "Data Analysis", url: "/data-analysis", icon: Sparkles },
      { title: "Predictive Models", url: "/predictions", icon: Zap },
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