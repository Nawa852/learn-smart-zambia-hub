import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { RoleBasedSidebar } from '@/components/Sidebar/RoleBasedSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { MobileBottomNav } from '@/components/Layout/MobileBottomNav';
import { OnboardingTour } from '@/components/Onboarding/OnboardingTour';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { ScheduleEnforcer } from '@/components/DeviceControl/ScheduleEnforcer';
import { Button } from '@/components/ui/button';
import { Calendar, Play, X, ChevronRight, Home, Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Link } from 'react-router-dom';

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
  'entrepreneur/ventures': 'Ventures',
  'entrepreneur/financials': 'Financials',
  'entrepreneur/funding': 'Funding',
  'medical/case-simulator': 'Case Simulator',
  'medical/rotations': 'Rotations',
};

const COMMAND_ITEMS = [
  { label: 'Dashboard', url: '/dashboard', group: 'Navigation' },
  { label: 'Course Catalog', url: '/course-catalog', group: 'Navigation' },
  { label: 'AI Study Buddy', url: '/ai', group: 'AI Tools' },
  { label: 'AI Quiz', url: '/ai-quiz', group: 'AI Tools' },
  { label: 'Flashcards', url: '/flashcards', group: 'AI Tools' },
  { label: 'Mind Maps', url: '/mind-maps', group: 'AI Tools' },
  { label: 'Focus Mode', url: '/focus-mode', group: 'Study' },
  { label: 'Study Planner', url: '/study-planner', group: 'Study' },
  { label: 'My Assignments', url: '/my-assignments', group: 'Study' },
  { label: 'My Notes', url: '/my-notes', group: 'Study' },
  { label: 'Analytics', url: '/analytics', group: 'Progress' },
  { label: 'Achievements', url: '/achievements', group: 'Progress' },
  { label: 'Goals', url: '/goals', group: 'Progress' },
  { label: 'Study Groups', url: '/study-groups', group: 'Community' },
  { label: 'Messenger', url: '/messenger', group: 'Community' },
  { label: 'Profile', url: '/profile', group: 'Account' },
  { label: 'Settings', url: '/settings', group: 'Account' },
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useSecurityAlerts();
  const { getActiveNow } = useStudySchedule();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSchedule, setActiveSchedule] = useState<ReturnType<typeof getActiveNow>>(undefined);
  const [dismissed, setDismissed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

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

  // Generate breadcrumbs from current path
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
      <div className="min-h-screen flex w-full bg-background">
        <RoleBasedSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          {/* Schedule enforcement banner */}
          {activeSchedule && !dismissed && (
            <div className="bg-primary/10 border-b border-primary/30 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">It's study time for <strong>{activeSchedule.subject}</strong>!</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => navigate(`/focus-mode?subject=${encodeURIComponent(activeSchedule.subject)}`)}>
                  <Play className="w-3 h-3 mr-1" />Start Focus
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setDismissed(true)}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="px-6 pt-3 pb-0 flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">
                <Home className="w-3.5 h-3.5" />
              </Link>
              {breadcrumbs.map((bc) => (
                <React.Fragment key={bc.path}>
                  <ChevronRight className="w-3 h-3" />
                  {bc.isLast ? (
                    <span className="text-foreground font-medium">{bc.label}</span>
                  ) : (
                    <Link to={bc.path} className="hover:text-foreground transition-colors">{bc.label}</Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          <main className="flex-1 p-6 pb-20 lg:pb-6 overflow-auto">
            {children}
          </main>
          <footer className="hidden lg:block border-t bg-card p-4">
            <div className="text-center text-sm text-muted-foreground">
              Powered by{' '}
              <span className="font-semibold text-primary">
                Edu Zambia
              </span>{' '}
              - Smart Learning for Zambia •{' '}
              <button onClick={() => setCmdOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">⌘K</kbd> Search
              </button>
            </div>
          </footer>
          <MobileBottomNav />
        </div>
      </div>

      {/* Onboarding Tour */}
      <OnboardingTour />

      {/* Cmd+K Command Palette */}
      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Search pages, tools, features..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {['Navigation', 'AI Tools', 'Study', 'Progress', 'Community', 'Account'].map(group => (
            <CommandGroup key={group} heading={group}>
              {COMMAND_ITEMS.filter(i => i.group === group).map(item => (
                <CommandItem key={item.url} onSelect={() => { navigate(item.url); setCmdOpen(false); }}>
                  <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </SidebarProvider>
  );
};
