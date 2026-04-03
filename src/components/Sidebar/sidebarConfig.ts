import {
  LayoutDashboard, BookOpen, User, Brain, Users, BarChart3, Trophy,
  GraduationCap, Video, Settings, FileText, Calendar,
  MessageSquare, Target, ClipboardCheck, School, Building2,
  UserCheck, Bell, Shield, Map, TrendingUp, PieChart,
  Briefcase, Globe, Heart, Compass, Wrench, Sparkles, Youtube,
  Layers, Timer, Award, PenTool, Presentation,
  MessagesSquare, Library, Microscope, Bot, Zap, Rocket, Monitor,
  DollarSign, Package, Megaphone, Database, AlertTriangle, Laptop,
  Flag, Lock, Search, Bookmark, Code, Flame, FlaskConical,
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
  skills: 'Skills Development',
  cybersecurity: 'Cybersecurity',
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
    case 'skills': return skillsNavigation;
    case 'cybersecurity': return cybersecurityNavigation;
    default: return studentNavigation;
  }
}

// ─── Student Navigation (consolidated) ──────────────
export const studentNavigation: NavGroup[] = [
  {
    label: "Learn",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Courses", url: "/my-courses", icon: GraduationCap },
      { title: "Explore Courses", url: "/course-catalog", icon: BookOpen },
      { title: "AI Study Buddy", url: "/ai", icon: Brain, badge: "AI" },
    ],
  },
  {
    label: "Study Tools",
    items: [
      { title: "Focus Mode", url: "/focus-mode", icon: Timer },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
      { title: "AI Quiz", url: "/ai-quiz", icon: Sparkles },
      { title: "Study Planner", url: "/study-planner", icon: Calendar },
      { title: "My Notes", url: "/my-notes", icon: PenTool },
    ],
  },
  {
    label: "ECZ Resources",
    items: [
      { title: "Past Papers", url: "/ecz-past-papers", icon: FileText },
      { title: "Exam Simulator", url: "/ecz-exam-simulator", icon: Target },
      { title: "Video Library", url: "/ecz-videos", icon: Youtube },
    ],
  },
  {
    label: "Progress",
    items: [
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Achievements", url: "/achievements", icon: Trophy },
      { title: "Goals", url: "/goals", icon: Target },
      { title: "Leaderboard", url: "/leaderboard", icon: Award },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Messenger", url: "/messenger", icon: MessagesSquare },
      { title: "Study Groups", url: "/study-groups", icon: Users },
      { title: "Social Feed", url: "/social-feed", icon: MessageSquare },
    ],
  },
];

// ─── Teacher Navigation ─────────────────────────────
export const teacherNavigation: NavGroup[] = [
  {
    label: "Teaching",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Classes", url: "/courses", icon: School },
      { title: "Create Course", url: "/create-course", icon: Layers },
      { title: "Virtual Classroom", url: "/classroom", icon: Video },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "AI Lesson Plan", url: "/teacher-lesson-plan", icon: Sparkles, badge: "AI" },
      { title: "AI Quiz Creator", url: "/ai-quiz", icon: Brain },
      { title: "AI Assistant", url: "/ai", icon: Brain },
    ],
  },
  {
    label: "Assessment",
    items: [
      { title: "Gradebook", url: "/teacher-gradebook", icon: ClipboardCheck },
      { title: "Class Analytics", url: "/teacher-analytics", icon: BarChart3 },
      { title: "Report Cards", url: "/teacher-report-cards", icon: FileText },
      { title: "Attendance QR", url: "/teacher-attendance-qr", icon: UserCheck },
      { title: "Announcements", url: "/teacher-announcements", icon: Megaphone },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Past Papers", url: "/ecz-past-papers", icon: FileText },
      { title: "Video Library", url: "/ecz-videos", icon: Youtube },
      { title: "Resources Hub", url: "/zambian-resources", icon: Library },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Teacher Hub", url: "/community", icon: Users },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
    ],
  },
];

// ─── Guardian Navigation ────────────────────────────
export const guardianNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Children", url: "/parent-children", icon: Users },
    ],
  },
  {
    label: "Monitor",
    items: [
      { title: "Activity Feed", url: "/guardian-activity-feed", icon: Zap, badge: "LIVE" },
      { title: "Grades", url: "/parent-grades", icon: BarChart3 },
      { title: "Attendance", url: "/parent-attendance", icon: Calendar },
      { title: "Homework Tracker", url: "/guardian-homework", icon: ClipboardCheck },
      { title: "Parental Controls", url: "/parental-controls", icon: Shield },
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
];

// ─── Institution Navigation ─────────────────────────
export const institutionNavigation: NavGroup[] = [
  {
    label: "Admin",
    items: [
      { title: "Dashboard", url: "/school-admin", icon: LayoutDashboard },
      { title: "User Management", url: "/admin/users", icon: Users },
      { title: "Curriculum", url: "/admin/curriculum", icon: BookOpen },
      { title: "Scheduling", url: "/admin/scheduling", icon: Calendar },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    ],
  },
];

// ─── Ministry Navigation ────────────────────────────
export const ministryNavigation: NavGroup[] = [
  {
    label: "National Overview",
    items: [
      { title: "Dashboard", url: "/ministry-dashboard", icon: LayoutDashboard },
      { title: "Live Stats", url: "/ministry/live-stats", icon: Zap, badge: "LIVE" },
      { title: "Province Map", url: "/ministry/province-map", icon: Globe },
      { title: "ECZ Analytics", url: "/ministry/ecz-analytics", icon: PieChart },
    ],
  },
  {
    label: "Schools & Teachers",
    items: [
      { title: "School Registry", url: "/ministry/schools", icon: Building2 },
      { title: "Inspections", url: "/ministry/inspections", icon: ClipboardCheck },
      { title: "Teacher Deployment", url: "/ministry/teacher-deployment", icon: Users },
      { title: "Infrastructure", url: "/ministry/infrastructure", icon: Building2 },
    ],
  },
  {
    label: "Students & Welfare",
    items: [
      { title: "Dropout Tracker", url: "/ministry/dropout-tracker", icon: AlertTriangle },
      { title: "Scholarships", url: "/ministry/scholarships", icon: Award },
      { title: "Student Welfare", url: "/ministry/welfare", icon: Heart },
    ],
  },
  {
    label: "Policy & Operations",
    items: [
      { title: "Policy Tracker", url: "/ministry/policies", icon: Shield },
      { title: "Budget", url: "/ministry/budget", icon: DollarSign },
      { title: "Reports", url: "/ministry/reports", icon: FileText },
      { title: "Announcements", url: "/ministry/announcements", icon: Megaphone },
    ],
  },
];

// ─── Doctor Navigation ──────────────────────────────
export const doctorNavigation: NavGroup[] = [
  {
    label: "Clinical",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Case Simulator", url: "/medical/case-simulator", icon: Microscope, badge: "AI" },
      { title: "Case Log", url: "/medical/case-log", icon: FileText },
      { title: "Rotations", url: "/medical/rotations", icon: Compass },
      { title: "Drug Reference", url: "/medical/drug-reference", icon: FlaskConical, badge: "AI" },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "AI Assistant", url: "/ai", icon: Brain },
      { title: "Focus Mode", url: "/focus-mode", icon: Timer },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Study Groups", url: "/study-groups", icon: Users },
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
    ],
  },
];

// ─── Entrepreneur Navigation ────────────────────────
export const entrepreneurNavigation: NavGroup[] = [
  {
    label: "Business",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Ventures", url: "/entrepreneur/ventures", icon: Rocket },
      { title: "Financials", url: "/entrepreneur/financials", icon: PieChart },
      { title: "Milestones", url: "/entrepreneur/milestones", icon: Target },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "Business Plan", url: "/entrepreneur/business-plan", icon: FileText, badge: "AI" },
      { title: "Pitch Deck", url: "/entrepreneur/pitch-deck", icon: Presentation, badge: "AI" },
      { title: "Market Research", url: "/entrepreneur/market-research", icon: Globe, badge: "AI" },
      { title: "Funding", url: "/entrepreneur/funding", icon: Briefcase, badge: "AI" },
    ],
  },
  {
    label: "Learn",
    items: [
      { title: "AI Assistant", url: "/ai", icon: Brain },
      { title: "Video Academy", url: "/entrepreneur/videos", icon: Youtube },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Mentorship", url: "/mentorship-hub", icon: Heart },
    ],
  },
];

// ─── Developer Navigation ───────────────────────────
export const developerNavigation: NavGroup[] = [
  {
    label: "Dev",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Projects", url: "/developer/projects", icon: Layers },
      { title: "IDE", url: "/developer/ide", icon: Bot, badge: "BETA" },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { title: "Code Challenges", url: "/developer/challenges", icon: Zap, badge: "AI" },
      { title: "Code Review", url: "/developer/code-review", icon: Sparkles, badge: "AI" },
      { title: "API Playground", url: "/developer/api-playground", icon: Globe },
      { title: "Algorithm Viz", url: "/developer/algorithms", icon: Code },
      { title: "AI Assistant", url: "/ai", icon: Brain },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Study Groups", url: "/study-groups", icon: Users },
    ],
  },
];

// ─── Skills Development Navigation ──────────────────
export const skillsNavigation: NavGroup[] = [
  {
    label: "Skills",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Skills Hub", url: "/skills/dashboard", icon: Wrench },
      { title: "Video Tutorials", url: "/skills/videos", icon: Video },
      { title: "Assessment", url: "/skills/assessment-quiz", icon: Target },
      { title: "Portfolio", url: "/skills/portfolio-gallery", icon: PenTool },
    ],
  },
  {
    label: "Career",
    items: [
      { title: "Job Board", url: "/skills/jobs", icon: Globe },
      { title: "Job Tracker", url: "/skills/job-tracker", icon: Briefcase },
      { title: "Resume Builder", url: "/skills/resume", icon: FileText },
      { title: "Apprenticeships", url: "/skills/apprenticeship-match", icon: Search },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "AI Coach", url: "/ai", icon: Brain },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
      { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Study Groups", url: "/study-groups", icon: Users },
    ],
  },
];

// ─── Cybersecurity Navigation ───────────────────────
export const cybersecurityNavigation: NavGroup[] = [
  {
    label: "Cyber",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Practice Labs", url: "/cybersecurity/labs", icon: Monitor },
      { title: "CTF Arena", url: "/cybersecurity/ctf", icon: Flag, badge: "LIVE" },
      { title: "Hacking Terminal", url: "/cybersecurity/terminal", icon: Monitor },
    ],
  },
  {
    label: "Tools",
    items: [
      { title: "Vuln Scanner", url: "/cybersecurity/vuln-scanner", icon: Search },
      { title: "Phishing Sim", url: "/cybersecurity/phishing-sim", icon: AlertTriangle },
      { title: "Password Analyzer", url: "/cybersecurity/password-analyzer", icon: Lock },
      { title: "Report Writer", url: "/cybersecurity/report-writer", icon: FileText, badge: "AI" },
      { title: "Glossary", url: "/cybersecurity/glossary", icon: BookOpen },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "AI Mentor", url: "/ai", icon: Brain },
      { title: "Video Academy", url: "/cybersecurity/videos", icon: Video },
      { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Study Groups", url: "/study-groups", icon: Users },
    ],
  },
];
