import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { RoleBasedSidebar } from '@/components/Sidebar/RoleBasedSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { MobileBottomNav } from '@/components/Layout/MobileBottomNav';
import { ScrollToTop } from '@/components/UI/ScrollToTop';
import { QuickNoteButton } from '@/components/UI/QuickNoteButton';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { ScheduleEnforcer } from '@/components/DeviceControl/ScheduleEnforcer';
import { MacroPanel } from '@/components/UI/MacroPanel';
import { OfflineBanner } from '@/components/PWA/OfflineBanner';
import { useContextualPreload } from '@/hooks/useContextualPreload';
import { useTimeCapsule } from '@/hooks/useTimeCapsule';
import { useDeepOffline } from '@/hooks/useDeepOffline';
import { Button } from '@/components/ui/button';
import { Calendar, Play, X, ChevronRight, Home, Search, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MainLayoutProps {
  children: React.ReactNode;
}

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  'my-courses': 'My Courses',
  'course-catalog': 'Course Catalog',
  ai: 'AI Study Buddy',
  'focus-mode': 'Focus Mode',
  'study-planner': 'Study Planner',
  flashcards: 'Flashcards',
  'ai-quiz': 'AI Quiz',
  'mind-maps': 'Mind Maps',
  'my-assignments': 'My Assignments',
  'ecz-past-papers': 'Past Papers',
  'ecz-exam-simulator': 'Exam Simulator',
  analytics: 'Analytics',
  achievements: 'Achievements',
  goals: 'Goals',
  'my-notes': 'My Notes',
  'pomodoro': 'Pomodoro Timer',
  'bookmarks': 'Bookmarks',
  'spaced-repetition': 'Spaced Repetition',
  'reading-list': 'Reading List',
  'data-export': 'Data Export',
  'teacher-report-cards': 'Report Cards',
  'teacher-announcements': 'Announcements',
  'teacher-rubric-builder': 'Rubric Builder',
  'guardian-homework': 'Homework Tracker',
  'guardian-rewards': 'Rewards',
  'guardian-study-comparison': 'Study Comparison',
  'notification-preferences': 'Notification Preferences',
  'study-groups': 'Study Groups',
  'social-feed': 'Social Feed',
  messenger: 'Messenger',
  profile: 'Profile',
  settings: 'Settings',
  notifications: 'Notifications',
  'teacher-analytics': 'Teacher Analytics',
  'create-course': 'Create Course',
  courses: 'Courses',
  'developer/projects': 'Projects',
  'developer/challenges': 'Challenges',
  'developer/code-review': 'Code Review',
  'developer/ide': 'IDE',
  'developer/api-playground': 'API Playground',
  'developer/algorithms': 'Algorithm Visualizer',
  'entrepreneur/ventures': 'Ventures',
  'entrepreneur/financials': 'Financials',
  'entrepreneur/funding': 'Funding',
  'medical/case-simulator': 'Case Simulator',
  'medical/rotations': 'Rotations',
  'teacher-lesson-plan': 'AI Lesson Plan',
  'teacher-bulk-grades': 'Bulk Grade Import',
  'teacher-assignment-analytics': 'Assignment Analytics',
  'teacher-attendance-qr': 'Attendance QR',
  'guardian-digest': 'Weekly Digest',
  'guardian-activity-feed': 'Activity Feed',
  'ministry/audit': 'Audit Trail',
  'ministry/school-comparison': 'School Comparison',
  'ministry/live-stats': 'Live Statistics',
  'ministry/province-map': 'Province Map',
  'cybersecurity/ctf': 'CTF Arena',
  'cybersecurity/vuln-scanner': 'Vuln Scanner',
  'cybersecurity/kill-chain': 'Kill Chain',
  'cybersecurity/report-writer': 'Report Writer',
  'cybersecurity/password-analyzer': 'Password Analyzer',
  'cybersecurity/phishing-sim': 'Phishing Simulator',
  'cybersecurity/glossary': 'Cyber Glossary',
  'skills/job-tracker': 'Job Tracker',
  'skills/apprenticeship-match': 'Apprenticeship Match',
  'skills/portfolio-gallery': 'Portfolio Gallery',
  'skills/assessment-quiz': 'Skills Assessment',
};

const COMMAND_ITEMS = [
  { label: 'Dashboard', url: '/dashboard', group: 'Navigation' },
  { label: 'Course Catalog', url: '/course-catalog', group: 'Navigation' },
  { label: 'My Courses', url: '/my-courses', group: 'Navigation' },
  { label: 'Bookmarks', url: '/bookmarks', group: 'Navigation' },
  { label: 'AI Study Buddy', url: '/ai', group: 'AI Tools' },
  { label: 'AI Quiz', url: '/ai-quiz', group: 'AI Tools' },
  { label: 'Flashcards', url: '/flashcards', group: 'AI Tools' },
  { label: 'Spaced Repetition', url: '/spaced-repetition', group: 'AI Tools' },
  { label: 'Mind Maps', url: '/mind-maps', group: 'AI Tools' },
  { label: 'Focus Mode', url: '/focus-mode', group: 'Study' },
  { label: 'Pomodoro Timer', url: '/pomodoro', group: 'Study' },
  { label: 'Study Planner', url: '/study-planner', group: 'Study' },
  { label: 'My Assignments', url: '/my-assignments', group: 'Study' },
  { label: 'My Notes', url: '/my-notes', group: 'Study' },
  { label: 'Reading List', url: '/reading-list', group: 'Study' },
  { label: 'Past Papers', url: '/ecz-past-papers', group: 'Resources' },
  { label: 'Exam Simulator', url: '/ecz-exam-simulator', group: 'Resources' },
  { label: 'Video Library', url: '/ecz-videos', group: 'Resources' },
  { label: 'Analytics', url: '/analytics', group: 'Progress' },
  { label: 'Achievements', url: '/achievements', group: 'Progress' },
  { label: 'Goals', url: '/goals', group: 'Progress' },
  { label: 'Data Export', url: '/data-export', group: 'Progress' },
  { label: 'Study Groups', url: '/study-groups', group: 'Community' },
  { label: 'Messenger', url: '/messenger', group: 'Community' },
  { label: 'Mentorship Hub', url: '/mentorship-hub', group: 'Community' },
  { label: 'Profile', url: '/profile', group: 'Account' },
  { label: 'Settings', url: '/settings', group: 'Account' },
  { label: 'Notification Preferences', url: '/notification-preferences', group: 'Account' },
];

const SHORTCUTS = [
  { keys: ['⌘', 'K'], description: 'Open command palette' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
  { keys: ['Esc'], description: 'Close dialogs' },
  { keys: ['⌘', '/'], description: 'Focus search' },
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useSecurityAlerts();
  useContextualPreload();
  useTimeCapsule();
  useDeepOffline();
  const { getActiveNow } = useStudySchedule();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollProgress = useScrollProgress();
  const [activeSchedule, setActiveSchedule] = useState<ReturnType<typeof getActiveNow>>(undefined);
  const [dismissed, setDismissed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const check = () => setActiveSchedule(getActiveNow());
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [getActiveNow]);

  // Cmd+K handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // ? key for shortcuts overlay
  useKeyboardShortcut({ key: '?' }, () => {
    setShortcutsOpen(o => !o);
  });

  // Generate breadcrumbs
  const breadcrumbs = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, i, arr) => {
      const path = '/' + arr.slice(0, i + 1).join('/');
      const key = arr.slice(0, i + 1).join('/');
      const label = ROUTE_LABELS[key] || ROUTE_LABELS[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return { label, path, isLast: i === arr.length - 1 };
    });

  return (
    <SidebarProvider>
      <ScheduleEnforcer />
      {/* Skip to content (a11y) */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
        Skip to content
      </a>

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="min-h-screen flex w-full bg-background">
        <RoleBasedSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />
          
          {/* Schedule enforcement banner */}
          {activeSchedule && !dismissed && (
            <div className="bg-primary/5 border-b border-primary/20 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="relative">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <span className="text-foreground text-sm">Study time: <strong>{activeSchedule.subject}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="default" className="h-7 text-xs" onClick={() => navigate(`/focus-mode?subject=${encodeURIComponent(activeSchedule.subject)}`)}>
                  <Play className="w-3 h-3 mr-1" />Start
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setDismissed(true)}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="px-4 lg:px-6 pt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors p-0.5">
                <Home className="w-3.5 h-3.5" />
              </Link>
              {breadcrumbs.map((bc) => (
                <span key={bc.path} className="inline-flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                  {bc.isLast ? (
                    <span className="text-foreground font-medium">{bc.label}</span>
                  ) : (
                    <Link to={bc.path} className="hover:text-foreground transition-colors">{bc.label}</Link>
                  )}
                </span>
              ))}
            </div>
          )}
          
          <main id="main-content" className="flex-1 px-4 py-4 pb-20 lg:px-6 lg:py-5 lg:pb-5 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
          
          <MobileBottomNav />
          <QuickNoteButton />
          <ScrollToTop />
        </div>
      </div>

      {/* Cmd+K Command Palette */}
      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Where do you want to go?" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {['Navigation', 'AI Tools', 'Study', 'Resources', 'Progress', 'Community', 'Account'].map(group => {
            const items = COMMAND_ITEMS.filter(i => i.group === group);
            if (!items.length) return null;
            return (
              <CommandGroup key={group} heading={group}>
                {items.map(item => (
                  <CommandItem key={item.url} onSelect={() => { navigate(item.url); setCmdOpen(false); }}>
                    <Search className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>

      {/* Keyboard Shortcuts Overlay */}
      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-primary" />
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-1 pt-2">
            {SHORTCUTS.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-secondary/50">
                <span className="text-sm text-foreground">{s.description}</span>
                <div className="flex items-center gap-1">
                  {s.keys.map((k, j) => (
                    <kbd key={j} className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-mono border border-border/50">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};
