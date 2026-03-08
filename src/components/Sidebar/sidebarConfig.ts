import {
  LayoutDashboard, BookOpen, User, Brain, Users, BarChart3, Trophy,
  FolderOpen, GraduationCap, Video, Settings, FileText, Calendar,
  MessageSquare, Lightbulb, Target, ClipboardCheck, School, Building2,
  UserCheck, Bell, Shield, Map, TrendingUp, PieChart, FileBarChart,
  Briefcase, Globe, Heart, Compass, Wrench, Sparkles, Youtube,
  Calculator, FlaskConical, Atom, Languages, BookMarked, Layers,
  Timer, Award, Gamepad2, Headphones, PenTool, Camera, Presentation,
  MessagesSquare, Library, Microscope, Bot, Zap, Rocket,
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

export const roleLabels: Record<string, string> = {
  student: 'Student',
  teacher: 'Teacher',
  guardian: 'Guardian',
  institution: 'Institution',
  ministry: 'Ministry',
  doctor: 'Doctor',
  entrepreneur: 'Entrepreneur',
  developer: 'Developer',
};

export function getNavigationByRole(role: string): NavGroup[] {
  switch (role) {
    case 'teacher': return teacherNavigation;
    case 'guardian': return guardianNavigation;
    case 'institution': return institutionNavigation;
    case 'ministry': return ministryNavigation;
    case 'doctor': return doctorNavigation;
    case 'entrepreneur': return entrepreneurNavigation;
    case 'developer': return developerNavigation;
    default: return studentNavigation;
  }
}

// ─── Student Navigation ─────────────────────────────
export const studentNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Courses", url: "/my-courses", icon: GraduationCap },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen, badge: "NEW" },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "AI Study Buddy", url: "/ai", icon: Brain },
      { title: "Focus Mode", url: "/focus-mode", icon: Shield, badge: "NEW" },
      { title: "App Control", url: "/app-control", icon: Wrench, badge: "NEW" },
      { title: "Study Planner", url: "/study-planner", icon: Calendar, badge: "NEW" },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
      { title: "AI Quiz", url: "/ai-quiz", icon: Sparkles },
      { title: "Mind Maps", url: "/mind-maps", icon: Lightbulb },
    ],
  },
  {
    label: "Assignments",
    items: [
      { title: "My Assignments", url: "/my-assignments", icon: ClipboardCheck, badge: "NEW" },
    ],
  },
  {
    label: "ECZ Resources",
    items: [
      { title: "Resource Library", url: "/ecz-resource-library", icon: Library, badge: "NEW" },
      { title: "Past Papers", url: "/ecz-past-papers", icon: FileText },
      { title: "Practice Quiz", url: "/ecz-practice-quiz", icon: Timer },
      { title: "Exam Simulator", url: "/ecz-exam-simulator", icon: Calculator },
      { title: "Video Library", url: "/ecz-videos", icon: Youtube },
      { title: "Resources Hub", url: "/zambian-resources", icon: Globe },
    ],
  },
  {
    label: "Progress",
    items: [
      { title: "Progress Report", url: "/progress-report", icon: TrendingUp },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Achievements", url: "/achievements", icon: Trophy },
      { title: "Goals", url: "/goals", icon: Target },
      { title: "My Notes", url: "/my-notes", icon: PenTool, badge: "NEW" },
    ],
  },
  {
    label: "Family",
    items: [
      { title: "My Guardian", url: "/guardian-link", icon: Shield },
      { title: "Guardian Reports", url: "/guardian-reports", icon: FileBarChart },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Study Groups", url: "/study-groups", icon: Users, badge: "NEW" },
      { title: "Group Chat", url: "/study-chat", icon: MessageSquare, badge: "LIVE" },
      { title: "Messenger", url: "/messenger", icon: MessagesSquare },
      { title: "Social Feed", url: "/social-feed", icon: MessagesSquare },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

// ─── Teacher Navigation ─────────────────────────────
export const teacherNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
      { title: "Create Course", url: "/create-course", icon: Layers, badge: "NEW" },
    ],
  },
  {
    label: "Teaching",
    items: [
      { title: "My Classes", url: "/courses", icon: School },
      { title: "Virtual Classroom", url: "/classroom", icon: Video },
      { title: "Resource Library", url: "/materials", icon: FolderOpen },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "AI Quiz Creator", url: "/ai-quiz", icon: Sparkles },
      { title: "AI Assistant", url: "/ai", icon: Brain },
      { title: "Content Generator", url: "/flashcards", icon: FileText },
    ],
  },
  {
    label: "ECZ Resources",
    items: [
      { title: "Resources Hub", url: "/zambian-resources", icon: Library },
      { title: "Past Papers", url: "/ecz-past-papers", icon: FileText },
      { title: "Video Library", url: "/ecz-videos", icon: Youtube },
    ],
  },
  {
    label: "Assessment",
    items: [
      { title: "Class Analytics", url: "/teacher-analytics", icon: BarChart3 },
      { title: "Reports", url: "/teacher-analytics", icon: PieChart },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Teacher Hub", url: "/community", icon: Users },
      { title: "Collaboration", url: "/teacher-collaboration", icon: MessagesSquare, badge: "NEW" },
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

// ─── Guardian Navigation ────────────────────────────
export const guardianNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Children", url: "/parent-children", icon: Users },
    ],
  },
  {
    label: "Monitor",
    items: [
      { title: "Grades", url: "/parent-grades", icon: BarChart3 },
      { title: "Attendance", url: "/parent-attendance", icon: Calendar },
      { title: "Progress Tracker", url: "/parent-progress", icon: TrendingUp },
      { title: "Alerts", url: "/parent-alerts", icon: Bell },
    ],
  },
  {
    label: "Communicate",
    items: [
      { title: "Messages", url: "/parent-messages", icon: MessageSquare },
      { title: "Teacher Contact", url: "/parent-teacher-contact", icon: UserCheck },
      { title: "School Updates", url: "/parent-school-updates", icon: School },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "ECZ Support Hub", url: "/ecz-parent-support", icon: Library },
      { title: "Resources Hub", url: "/zambian-resources", icon: FolderOpen },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

// ─── Institution Navigation ─────────────────────────
export const institutionNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/school-admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "User Management", url: "/admin/users", icon: Users },
      { title: "Curriculum", url: "/admin/curriculum", icon: BookOpen },
      { title: "Scheduling", url: "/admin/scheduling", icon: Calendar },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Notifications", url: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

// ─── Ministry Navigation ────────────────────────────
export const ministryNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/ministry-dashboard", icon: LayoutDashboard },
      { title: "National Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Schools", url: "/admin/users", icon: Building2 },
      { title: "Curriculum", url: "/admin/curriculum", icon: BookOpen },
      { title: "Resources", url: "/zambian-resources", icon: Library },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Notifications", url: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

// ─── Doctor Navigation ──────────────────────────────
export const doctorNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    ],
  },
  {
    label: "Clinical",
    items: [
      { title: "Case Simulator", url: "/medical/case-simulator", icon: Microscope, badge: "AI" },
      { title: "Case Log", url: "/medical/case-log", icon: FileText },
      { title: "Rotations", url: "/medical/rotations", icon: Compass },
      { title: "Clinical Notes", url: "/medical/clinical-notes", icon: PenTool, badge: "AI" },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "Drug Reference", url: "/medical/drug-reference", icon: FlaskConical, badge: "AI" },
      { title: "AI Assistant", url: "/ai", icon: Brain },
      { title: "Focus Mode", url: "/focus-mode", icon: Shield },
      { title: "Study Planner", url: "/study-planner", icon: Calendar },
      { title: "Resources", url: "/materials", icon: FolderOpen },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Study Groups", url: "/study-groups", icon: Users },
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

// ─── Entrepreneur Navigation ────────────────────────
export const entrepreneurNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    ],
  },
  {
    label: "Business",
    items: [
      { title: "My Ventures", url: "/entrepreneur/ventures", icon: Rocket, badge: "NEW" },
      { title: "Milestones", url: "/entrepreneur/milestones", icon: Target },
      { title: "Financials", url: "/entrepreneur/financials", icon: PieChart, badge: "NEW" },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "Business Plan", url: "/entrepreneur/business-plan", icon: FileText, badge: "AI" },
      { title: "Pitch Deck", url: "/entrepreneur/pitch-deck", icon: Presentation, badge: "AI" },
      { title: "Market Research", url: "/entrepreneur/market-research", icon: Globe, badge: "AI" },
      { title: "Funding", url: "/entrepreneur/funding", icon: Briefcase, badge: "AI" },
      { title: "AI Assistant", url: "/ai", icon: Brain },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "Focus Mode", url: "/focus-mode", icon: Shield },
      { title: "Study Planner", url: "/study-planner", icon: Calendar },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Study Groups", url: "/study-groups", icon: Users },
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

// ─── Developer Navigation ───────────────────────────
export const developerNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    ],
  },
  {
    label: "Projects",
    items: [
      { title: "My Projects", url: "/developer/projects", icon: Layers, badge: "NEW" },
      { title: "IDE", url: "/developer/ide", icon: Bot, badge: "BETA" },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "Code Challenges", url: "/developer/challenges", icon: Zap, badge: "AI" },
      { title: "Code Review", url: "/developer/code-review", icon: Sparkles, badge: "AI" },
      { title: "AI Assistant", url: "/ai", icon: Brain },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "Focus Mode", url: "/focus-mode", icon: Shield },
      { title: "Study Planner", url: "/study-planner", icon: Calendar },
    ],
  },
  {
    label: "Community",
    items: [
      { title: "Study Groups", url: "/study-groups", icon: Users },
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];
