import {
  LayoutDashboard, BookOpen, User, Brain, Users, BarChart3, Trophy,
  FolderOpen, GraduationCap, Video, Settings, FileText, Calendar,
  MessageSquare, Lightbulb, Target, ClipboardCheck, School, Building2,
  UserCheck, Bell, Shield, Map, TrendingUp, PieChart, FileBarChart,
  Briefcase, Globe, Heart, Compass, Wrench, Sparkles, Youtube,
  Calculator, FlaskConical, Atom, Languages, BookMarked, Layers,
  Timer, Award, Gamepad2, Headphones, PenTool, Camera, Presentation,
  MessagesSquare, Library, Microscope, Bot, Zap, Rocket, Monitor, Coins,
  DollarSign, Package, Megaphone, Database, AlertTriangle, Laptop,
  Flag, Lock, Eye, Bug, Wifi, Palette, Search, Bookmark, Gift, Code,
  Flame,
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
      { title: "Pomodoro Timer", url: "/pomodoro", icon: Timer, badge: "NEW" },
      { title: "App Control", url: "/app-control", icon: Wrench, badge: "NEW" },
      { title: "Study Planner", url: "/study-planner", icon: Calendar, badge: "NEW" },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
      { title: "Spaced Repetition", url: "/spaced-repetition", icon: Brain, badge: "NEW" },
      { title: "AI Quiz", url: "/ai-quiz", icon: Sparkles },
      { title: "Mind Maps", url: "/mind-maps", icon: Lightbulb },
      { title: "Reading List", url: "/reading-list", icon: BookMarked, badge: "NEW" },
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
      { title: "ECZ Video Hub", url: "/student-videos", icon: Youtube, badge: "NEW" },
      { title: "Resources Hub", url: "/zambian-resources", icon: Globe },
    ],
  },
  {
    label: "Progress",
    items: [
      { title: "Progress Report", url: "/progress-report", icon: TrendingUp },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Leaderboard", url: "/leaderboard", icon: Trophy, badge: "NEW" },
      { title: "Badges", url: "/badges", icon: Award, badge: "NEW" },
      { title: "Achievements", url: "/achievements", icon: Gamepad2 },
      { title: "Goals", url: "/goals", icon: Target },
      { title: "Screen Time", url: "/screen-time", icon: Monitor },
      { title: "My Notes", url: "/my-notes", icon: PenTool },
      { title: "Bookmarks", url: "/bookmarks", icon: Bookmark, badge: "NEW" },
      { title: "Data Export", url: "/data-export", icon: Database, badge: "NEW" },
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
      { title: "Study Streak", url: "/study-streak", icon: Flame },
      { title: "Notification Prefs", url: "/notification-preferences", icon: Bell },
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
      { title: "AI Lesson Plan", url: "/teacher-lesson-plan", icon: Sparkles, badge: "AI" },
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
      { title: "Assignment Analytics", url: "/teacher-assignment-analytics", icon: PieChart, badge: "NEW" },
      { title: "Gradebook", url: "/teacher-gradebook", icon: ClipboardCheck, badge: "NEW" },
      { title: "Report Cards", url: "/teacher-report-cards", icon: FileText, badge: "NEW" },
      { title: "Bulk Grade Import", url: "/teacher-bulk-grades", icon: FileText, badge: "NEW" },
      { title: "Attendance QR", url: "/teacher-attendance-qr", icon: UserCheck, badge: "NEW" },
      { title: "Rubric Builder", url: "/teacher-rubric-builder", icon: ClipboardCheck, badge: "NEW" },
      { title: "Announcements", url: "/teacher-announcements", icon: Megaphone, badge: "NEW" },
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
      { title: "Notification Prefs", url: "/notification-preferences", icon: Bell },
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
      { title: "Parental Controls", url: "/parental-controls", icon: Shield, badge: "NEW" },
      { title: "Activity Feed", url: "/guardian-activity-feed", icon: Zap, badge: "LIVE" },
      { title: "Weekly Digest", url: "/guardian-digest", icon: FileBarChart, badge: "NEW" },
      { title: "Homework Tracker", url: "/guardian-homework", icon: ClipboardCheck, badge: "NEW" },
      { title: "Grades", url: "/parent-grades", icon: BarChart3 },
      { title: "Attendance", url: "/parent-attendance", icon: Calendar },
      { title: "Progress Tracker", url: "/parent-progress", icon: TrendingUp },
      { title: "Study Comparison", url: "/guardian-study-comparison", icon: Users, badge: "NEW" },
      { title: "Rewards", url: "/guardian-rewards", icon: Gift, badge: "NEW" },
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
      { title: "Notification Prefs", url: "/notification-preferences", icon: Bell },
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
      { title: "Attendance", url: "/admin/attendance", icon: UserCheck, badge: "NEW" },
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
      { title: "Live Stats", url: "/ministry/live-stats", icon: Zap, badge: "LIVE" },
      { title: "ECZ Analytics", url: "/ministry/ecz-analytics", icon: PieChart },
      { title: "Province Map", url: "/ministry/province-map", icon: Globe, badge: "NEW" },
    ],
  },
  {
    label: "Schools & Teachers",
    items: [
      { title: "School Registry", url: "/ministry/schools", icon: Building2 },
      { title: "Provincial Data", url: "/ministry/provinces", icon: Globe },
      { title: "School Inspections", url: "/ministry/inspections", icon: ClipboardCheck, badge: "NEW" },
      { title: "Teacher Deployment", url: "/ministry/teacher-deployment", icon: Users, badge: "NEW" },
      { title: "Teacher Training", url: "/ministry/teacher-training", icon: GraduationCap, badge: "NEW" },
      { title: "Infrastructure Audit", url: "/ministry/infrastructure", icon: Building2, badge: "NEW" },
    ],
  },
  {
    label: "Students & Welfare",
    items: [
      { title: "Dropout Tracker", url: "/ministry/dropout-tracker", icon: AlertTriangle, badge: "NEW" },
      { title: "Scholarships", url: "/ministry/scholarships", icon: Award, badge: "NEW" },
      { title: "Student Welfare", url: "/ministry/welfare", icon: Heart, badge: "NEW" },
    ],
  },
  {
    label: "Policy & Impact",
    items: [
      { title: "Policy Tracker", url: "/ministry/policies", icon: Shield },
      { title: "Interventions", url: "/ministry/interventions", icon: Target },
      { title: "NGO Partnerships", url: "/ministry/partnerships", icon: Heart },
      { title: "Compliance", url: "/ministry/compliance", icon: Shield, badge: "NEW" },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Budget Allocation", url: "/ministry/budget", icon: DollarSign, badge: "NEW" },
      { title: "Resource Allocation", url: "/ministry/resources", icon: Package, badge: "NEW" },
      { title: "Announcements", url: "/ministry/announcements", icon: Megaphone, badge: "NEW" },
      { title: "Data Export", url: "/ministry/data-export", icon: Database, badge: "NEW" },
      { title: "Report Generator", url: "/ministry/reports", icon: FileText },
      { title: "Audit Trail", url: "/ministry/audit", icon: Shield, badge: "NEW" },
      { title: "School Comparison", url: "/ministry/school-comparison", icon: Building2, badge: "NEW" },
    ],
  },
  {
    label: "Programs",
    items: [
      { title: "Digital Literacy", url: "/ministry/digital-literacy", icon: Laptop, badge: "NEW" },
      { title: "Research Hub", url: "/ministry/research", icon: BookOpen, badge: "NEW" },
      { title: "Feedback", url: "/ministry/feedback", icon: MessageSquare, badge: "NEW" },
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
      { title: "Video Academy", url: "/entrepreneur/videos", icon: Youtube, badge: "NEW" },
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
      { title: "API Playground", url: "/developer/api-playground", icon: Globe, badge: "NEW" },
      { title: "Algorithm Visualizer", url: "/developer/algorithms", icon: Code, badge: "NEW" },
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

// ─── Skills Development Navigation ──────────────────
export const skillsNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    ],
  },
  {
    label: "Skills",
    items: [
      { title: "Skills Hub", url: "/skills/dashboard", icon: Wrench, badge: "NEW" },
      { title: "Choose Focus", url: "/skills/categories", icon: Target, badge: "NEW" },
      { title: "Video Tutorials", url: "/skills/videos", icon: Video, badge: "NEW" },
      { title: "Assessment Quiz", url: "/skills/assessment-quiz", icon: Target, badge: "NEW" },
      { title: "Portfolio Gallery", url: "/skills/portfolio-gallery", icon: Palette, badge: "NEW" },
    ],
  },
  {
    label: "Career",
    items: [
      { title: "Job Tracker", url: "/skills/job-tracker", icon: Briefcase, badge: "NEW" },
      { title: "Apprenticeship Match", url: "/skills/apprenticeship-match", icon: Search, badge: "NEW" },
      { title: "Job Board", url: "/skills/jobs", icon: Globe },
      { title: "Resume Builder", url: "/skills/resume", icon: FileText },
      { title: "Interview Prep", url: "/skills/interview-prep", icon: Users },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "AI Coach", url: "/ai", icon: Brain },
      { title: "Focus Mode", url: "/focus-mode", icon: Shield },
      { title: "Study Planner", url: "/study-planner", icon: Calendar },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
    ],
  },
  {
    label: "Progress",
    items: [
      { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
      { title: "Badges", url: "/badges", icon: Award },
      { title: "Goals", url: "/goals", icon: Target },
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

// ─── Cybersecurity Navigation ───────────────────────
export const cybersecurityNavigation: NavGroup[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    ],
  },
  {
    label: "Cyber Training",
    items: [
      { title: "Cyber Dashboard", url: "/cybersecurity/dashboard", icon: Shield, badge: "NEW" },
      { title: "Practice Labs", url: "/cybersecurity/labs", icon: Monitor, badge: "NEW" },
      { title: "Video Academy", url: "/cybersecurity/videos", icon: Video, badge: "NEW" },
      { title: "Hacking Terminal", url: "/cybersecurity/terminal", icon: Monitor, badge: "🔥" },
      { title: "CTF Arena", url: "/cybersecurity/ctf", icon: Flag, badge: "LIVE" },
      { title: "Kill Chain", url: "/cybersecurity/kill-chain", icon: Shield, badge: "NEW" },
      { title: "Vuln Scanner", url: "/cybersecurity/vuln-scanner", icon: Search, badge: "NEW" },
      { title: "Report Writer", url: "/cybersecurity/report-writer", icon: FileText, badge: "AI" },
      { title: "Password Analyzer", url: "/cybersecurity/password-analyzer", icon: Lock, badge: "NEW" },
      { title: "Phishing Simulator", url: "/cybersecurity/phishing-sim", icon: AlertTriangle, badge: "NEW" },
      { title: "Cyber Glossary", url: "/cybersecurity/glossary", icon: BookOpen, badge: "NEW" },
    ],
  },
  {
    label: "Study",
    items: [
      { title: "AI Mentor", url: "/ai", icon: Brain },
      { title: "Focus Mode", url: "/focus-mode", icon: Shield },
      { title: "Study Planner", url: "/study-planner", icon: Calendar },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
    ],
  },
  {
    label: "Progress",
    items: [
      { title: "CTF Leaderboard", url: "/leaderboard", icon: Trophy },
      { title: "Badges", url: "/badges", icon: Award },
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
