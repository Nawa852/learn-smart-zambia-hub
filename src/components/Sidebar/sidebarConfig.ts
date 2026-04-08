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
  Palette, MessageCircle,
  type LucideIcon
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
  shortTitle?: string;
  matchPrefixes?: string[];
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
    label: "Workspace",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
      {
        title: "My Learning",
        url: "/my-courses",
        icon: GraduationCap,
        shortTitle: "Learn",
        matchPrefixes: ["/course-catalog", "/course", "/lessons", "/classroom", "/video-learning", "/youtube-learning", "/adaptive-content", "/live-learning"],
      },
      {
        title: "AI Workspace",
        url: "/ai",
        icon: Brain,
        badge: "AI",
        shortTitle: "AI",
        matchPrefixes: ["/multi-ai-tutor", "/ai-tutor", "/learning-path", "/comprehensive-ai", "/study-assistant", "/mind-maps", "/adaptive-difficulty", "/teach-back", "/flashcards", "/ai-quiz", "/math-quiz", "/science-quiz", "/youtube-quiz", "/vocabulary-quiz"],
      },
      {
        title: "Study Planner",
        url: "/study-planner",
        icon: Calendar,
        shortTitle: "Plan",
        matchPrefixes: ["/focus-mode", "/my-notes", "/goals", "/journal", "/journaling"],
      },
    ],
  },
  {
    label: "Preparation",
    items: [
      {
        title: "ECZ Hub",
        url: "/ecz-past-papers",
        icon: FileText,
        shortTitle: "ECZ",
        matchPrefixes: ["/ecz-exam-simulator", "/ecz-videos", "/zambian-resources"],
      },
      {
        title: "Progress",
        url: "/analytics",
        icon: BarChart3,
        shortTitle: "Stats",
        matchPrefixes: ["/achievements", "/leaderboard", "/progress-report"],
      },
    ],
  },
  {
    label: "Connect",
    items: [
      {
        title: "Communication Hub",
        url: "/communication-hub",
        icon: MessageCircle,
        shortTitle: "Connect",
        matchPrefixes: ["/messenger", "/study-groups", "/community", "/social-feed"],
      },
      {
        title: "Personalization",
        url: "/personalization",
        icon: Palette,
        shortTitle: "Me",
        matchPrefixes: ["/profile", "/settings", "/notifications", "/bookmarks"],
      },
    ],
  },
];

// ─── Teacher Navigation ─────────────────────────────
export const teacherNavigation: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
      {
        title: "Class Workspace",
        url: "/courses",
        icon: School,
        shortTitle: "Classes",
        matchPrefixes: ["/create-course", "/course", "/lessons", "/classroom", "/video-learning", "/youtube-learning"],
      },
      {
        title: "Assessment Hub",
        url: "/teacher-gradebook",
        icon: ClipboardCheck,
        shortTitle: "Assess",
        matchPrefixes: ["/teacher-analytics", "/teacher-report-cards", "/teacher-attendance-qr"],
      },
      {
        title: "Teaching AI",
        url: "/ai",
        icon: Brain,
        badge: "AI",
        shortTitle: "AI",
        matchPrefixes: ["/teacher-lesson-plan", "/ai-quiz", "/multi-ai-tutor"],
      },
    ],
  },
  {
    label: "Connect",
    items: [
      {
        title: "Communication Hub",
        url: "/communication-hub",
        icon: MessageCircle,
        shortTitle: "Connect",
        matchPrefixes: ["/messenger", "/community", "/teacher-announcements"],
      },
      {
        title: "Personalization",
        url: "/personalization",
        icon: Palette,
        shortTitle: "Me",
        matchPrefixes: ["/profile", "/settings", "/notifications"],
      },
    ],
  },
];

// ─── Guardian Navigation ────────────────────────────
export const guardianNavigation: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
      { title: "My Children", url: "/parent-children", icon: Users, shortTitle: "Children" },
      {
        title: "Progress Overview",
        url: "/parent-grades",
        icon: BarChart3,
        shortTitle: "Progress",
        matchPrefixes: ["/parent-attendance", "/guardian-homework", "/guardian-activity-feed", "/parent-progress-tracker"],
      },
      {
        title: "Parental Controls",
        url: "/parental-controls",
        icon: Shield,
        shortTitle: "Safety",
        matchPrefixes: ["/screen-time"],
      },
    ],
  },
  {
    label: "Connect",
    items: [
      {
        title: "Communication Hub",
        url: "/communication-hub",
        icon: MessageCircle,
        shortTitle: "Connect",
        matchPrefixes: ["/parent-messages", "/parent-teacher-contact", "/parent-school-updates"],
      },
      {
        title: "Personalization",
        url: "/personalization",
        icon: Palette,
        shortTitle: "Me",
        matchPrefixes: ["/profile", "/settings", "/notifications"],
      },
    ],
  },
];

// ─── Institution Navigation ─────────────────────────
export const institutionNavigation: NavGroup[] = [
  {
    label: "Operations",
    items: [
      { title: "Dashboard", url: "/school-admin", icon: LayoutDashboard, shortTitle: "Home" },
      { title: "User Management", url: "/admin/users", icon: Users, shortTitle: "Users" },
      {
        title: "Curriculum & Scheduling",
        url: "/admin/curriculum",
        icon: BookOpen,
        shortTitle: "Plan",
        matchPrefixes: ["/admin/scheduling"],
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart3,
        shortTitle: "Analytics",
        matchPrefixes: ["/admin/attendance"],
      },
    ],
  },
];

const rolePrimaryNavigation: Record<string, NavItem[]> = {
  student: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    {
      title: "Learn",
      url: "/my-courses",
      icon: GraduationCap,
      shortTitle: "Learn",
      matchPrefixes: ["/course-catalog", "/course", "/lessons", "/classroom", "/video-learning", "/youtube-learning"],
    },
    {
      title: "AI",
      url: "/ai",
      icon: Brain,
      shortTitle: "AI",
      matchPrefixes: ["/multi-ai-tutor", "/ai-tutor", "/flashcards", "/ai-quiz", "/mind-maps", "/learning-path", "/study-assistant"],
    },
    {
      title: "Connect",
      url: "/communication-hub",
      icon: MessageCircle,
      shortTitle: "Connect",
      matchPrefixes: ["/messenger", "/study-groups", "/community"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/personalization", "/settings", "/notifications", "/bookmarks"],
    },
  ],
  teacher: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    {
      title: "Classes",
      url: "/courses",
      icon: School,
      shortTitle: "Classes",
      matchPrefixes: ["/create-course", "/course", "/lessons", "/classroom"],
    },
    {
      title: "Assess",
      url: "/teacher-gradebook",
      icon: ClipboardCheck,
      shortTitle: "Assess",
      matchPrefixes: ["/teacher-analytics", "/teacher-report-cards", "/teacher-attendance-qr"],
    },
    {
      title: "Connect",
      url: "/communication-hub",
      icon: MessageCircle,
      shortTitle: "Connect",
      matchPrefixes: ["/messenger", "/community", "/teacher-announcements"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/personalization", "/settings", "/notifications"],
    },
  ],
  guardian: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    { title: "Children", url: "/parent-children", icon: Users, shortTitle: "Children" },
    {
      title: "Progress",
      url: "/parent-grades",
      icon: BarChart3,
      shortTitle: "Progress",
      matchPrefixes: ["/parent-attendance", "/guardian-homework", "/guardian-activity-feed"],
    },
    {
      title: "Connect",
      url: "/communication-hub",
      icon: MessageCircle,
      shortTitle: "Connect",
      matchPrefixes: ["/parent-messages", "/parent-teacher-contact", "/parent-school-updates"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/personalization", "/settings", "/notifications"],
    },
  ],
  institution: [
    { title: "Home", url: "/school-admin", icon: LayoutDashboard, shortTitle: "Home" },
    { title: "Users", url: "/admin/users", icon: Users, shortTitle: "Users" },
    {
      title: "Plan",
      url: "/admin/curriculum",
      icon: BookOpen,
      shortTitle: "Plan",
      matchPrefixes: ["/admin/scheduling"],
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
      shortTitle: "Analytics",
      matchPrefixes: ["/admin/attendance"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/settings", "/personalization"],
    },
  ],
  ministry: [
    { title: "Home", url: "/ministry-dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    { title: "Schools", url: "/ministry/schools", icon: Building2, shortTitle: "Schools" },
    {
      title: "Analytics",
      url: "/ministry/ecz-analytics",
      icon: PieChart,
      shortTitle: "Analytics",
      matchPrefixes: ["/ministry/live-stats", "/ministry/province-map", "/ministry/school-comparison"],
    },
    {
      title: "Policy",
      url: "/ministry/policies",
      icon: Shield,
      shortTitle: "Policy",
      matchPrefixes: ["/ministry/budget", "/ministry/reports", "/ministry/announcements"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/settings", "/personalization"],
    },
  ],
  doctor: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    {
      title: "Clinical",
      url: "/medical/case-simulator",
      icon: Microscope,
      shortTitle: "Clinical",
      matchPrefixes: ["/medical/case-log", "/medical/rotations", "/medical/clinical-notes"],
    },
    {
      title: "AI",
      url: "/ai",
      icon: Brain,
      shortTitle: "AI",
      matchPrefixes: ["/medical/drug-reference"],
    },
    {
      title: "Connect",
      url: "/messenger",
      icon: MessageCircle,
      shortTitle: "Connect",
      matchPrefixes: ["/study-groups"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/settings", "/personalization"],
    },
  ],
  entrepreneur: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    {
      title: "Ventures",
      url: "/entrepreneur/ventures",
      icon: Rocket,
      shortTitle: "Ventures",
      matchPrefixes: ["/entrepreneur/financials", "/entrepreneur/milestones"],
    },
    {
      title: "AI",
      url: "/entrepreneur/business-plan",
      icon: Sparkles,
      shortTitle: "AI",
      matchPrefixes: ["/entrepreneur/pitch-deck", "/entrepreneur/market-research", "/entrepreneur/funding", "/ai"],
    },
    {
      title: "Connect",
      url: "/mentorship-hub",
      icon: Heart,
      shortTitle: "Connect",
      matchPrefixes: ["/messenger"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/settings", "/personalization"],
    },
  ],
  developer: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    {
      title: "Projects",
      url: "/developer/projects",
      icon: Layers,
      shortTitle: "Projects",
      matchPrefixes: ["/developer/ide", "/developer/api-playground", "/developer/algorithms"],
    },
    {
      title: "AI",
      url: "/developer/code-review",
      icon: Sparkles,
      shortTitle: "AI",
      matchPrefixes: ["/developer/challenges", "/ai"],
    },
    {
      title: "Connect",
      url: "/study-groups",
      icon: MessageCircle,
      shortTitle: "Connect",
      matchPrefixes: ["/messenger"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/settings", "/personalization"],
    },
  ],
  skills: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    {
      title: "Skills",
      url: "/skills/dashboard",
      icon: Wrench,
      shortTitle: "Skills",
      matchPrefixes: ["/skills/videos", "/skills/assessment-quiz", "/skills/portfolio-gallery"],
    },
    {
      title: "Career",
      url: "/skills/jobs",
      icon: Briefcase,
      shortTitle: "Career",
      matchPrefixes: ["/skills/job-tracker", "/skills/resume", "/skills/apprenticeship-match"],
    },
    {
      title: "Connect",
      url: "/study-groups",
      icon: MessageCircle,
      shortTitle: "Connect",
      matchPrefixes: ["/messenger", "/ai"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/settings", "/personalization"],
    },
  ],
  cybersecurity: [
    { title: "Home", url: "/dashboard", icon: LayoutDashboard, shortTitle: "Home" },
    {
      title: "Labs",
      url: "/cybersecurity/labs",
      icon: Monitor,
      shortTitle: "Labs",
      matchPrefixes: ["/cybersecurity/ctf", "/cybersecurity/terminal"],
    },
    {
      title: "Tools",
      url: "/cybersecurity/vuln-scanner",
      icon: Shield,
      shortTitle: "Tools",
      matchPrefixes: ["/cybersecurity/phishing-sim", "/cybersecurity/password-analyzer", "/cybersecurity/report-writer", "/cybersecurity/glossary"],
    },
    {
      title: "AI",
      url: "/ai",
      icon: Brain,
      shortTitle: "AI",
      matchPrefixes: ["/cybersecurity/videos"],
    },
    {
      title: "Me",
      url: "/profile",
      icon: User,
      shortTitle: "Me",
      matchPrefixes: ["/settings", "/personalization"],
    },
  ],
};

const commonCommandItems: Array<NavItem & { group: string }> = [
  { title: "Profile", url: "/profile", icon: User, group: "Account", shortTitle: "Me", matchPrefixes: ["/profile"] },
  { title: "Settings", url: "/settings", icon: Settings, group: "Account", matchPrefixes: ["/settings", "/personalization", "/notifications"] },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmark, group: "Account", matchPrefixes: ["/bookmarks"] },
];

export function matchesNavItem(pathname: string, item: Pick<NavItem, "url" | "matchPrefixes">) {
  const candidates = [item.url, ...(item.matchPrefixes ?? [])];
  return candidates.some((candidate) => pathname === candidate || pathname.startsWith(`${candidate}/`));
}

export function getPrimaryNavigationByRole(role: string): NavItem[] {
  return rolePrimaryNavigation[role] || rolePrimaryNavigation.student;
}

export function getCommandNavigationByRole(role: string): Array<NavItem & { group: string }> {
  const seen = new Set<string>();
  return [...getNavigationByRole(role).flatMap((group) => group.items.map((item) => ({ ...item, group: group.label }))), ...commonCommandItems]
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    });
}

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
