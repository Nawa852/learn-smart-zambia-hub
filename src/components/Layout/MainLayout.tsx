import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { RoleBasedSidebar } from '@/components/Sidebar/RoleBasedSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { MobileBottomNav } from '@/components/Layout/MobileBottomNav';
import { ScrollToTop } from '@/components/UI/ScrollToTop';
import { QuickNoteButton } from '@/components/UI/QuickNoteButton';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { ScheduleEnforcer } from '@/components/DeviceControl/ScheduleEnforcer';
import { OfflineBanner } from '@/components/PWA/OfflineBanner';
import { useContextualPreload } from '@/hooks/useContextualPreload';
import { useTimeCapsule } from '@/hooks/useTimeCapsule';
import { useDeepOffline } from '@/hooks/useDeepOffline';
import { Button } from '@/components/ui/button';
import { Calendar, Play, X, ChevronRight, Home, Search } from 'lucide-react';
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';

interface MainLayoutProps {
  children: React.ReactNode;
}

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard', 'my-courses': 'My Courses', 'course-catalog': 'Courses',
  ai: 'AI Tutor', 'focus-mode': 'Focus Mode', 'study-planner': 'Planner',
  flashcards: 'Flashcards', 'ai-quiz': 'AI Quiz', 'mind-maps': 'Mind Maps',
  'my-assignments': 'Assignments', 'ecz-past-papers': 'Past Papers',
  'ecz-exam-simulator': 'Exam Simulator', analytics: 'Analytics',
  achievements: 'Achievements', goals: 'Goals', 'my-notes': 'Notes',
  bookmarks: 'Bookmarks', 'study-groups': 'Study Groups', messenger: 'Messenger',
  profile: 'Profile', settings: 'Settings', notifications: 'Notifications',
  leaderboard: 'Leaderboard',
};

const COMMAND_ITEMS = [
  { label: 'Dashboard', url: '/dashboard', group: 'Navigate' },
  { label: 'Explore Courses', url: '/course-catalog', group: 'Navigate' },
  { label: 'My Courses', url: '/my-courses', group: 'Navigate' },
  { label: 'AI Tutor', url: '/ai', group: 'AI' },
  { label: 'AI Quiz', url: '/ai-quiz', group: 'AI' },
  { label: 'Flashcards', url: '/flashcards', group: 'AI' },
  { label: 'Focus Mode', url: '/focus-mode', group: 'Study' },
  { label: 'Study Planner', url: '/study-planner', group: 'Study' },
  { label: 'My Notes', url: '/my-notes', group: 'Study' },
  { label: 'Past Papers', url: '/ecz-past-papers', group: 'Resources' },
  { label: 'Exam Simulator', url: '/ecz-exam-simulator', group: 'Resources' },
  { label: 'Analytics', url: '/analytics', group: 'Progress' },
  { label: 'Achievements', url: '/achievements', group: 'Progress' },
  { label: 'Messenger', url: '/messenger', group: 'Social' },
  { label: 'Study Groups', url: '/study-groups', group: 'Social' },
  { label: 'Profile', url: '/profile', group: 'Account' },
  { label: 'Settings', url: '/settings', group: 'Account' },
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useSecurityAlerts();
  useContextualPreload();
  useTimeCapsule();
  useDeepOffline();
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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setCmdOpen(o => !o); }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const breadcrumbs = location.pathname.split('/').filter(Boolean).map((segment, i, arr) => {
    const path = '/' + arr.slice(0, i + 1).join('/');
    const label = ROUTE_LABELS[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return { label, path, isLast: i === arr.length - 1 };
  });

  return (
    <SidebarProvider>
      <ScheduleEnforcer />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
        Skip to content
      </a>

      <div className="min-h-screen flex w-full bg-background">
        <RoleBasedSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />

          {activeSchedule && !dismissed && (
            <div className="bg-primary/5 border-b border-primary/20 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Study time: <strong>{activeSchedule.subject}</strong></span>
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

          {breadcrumbs.length > 0 && (
            <div className="px-4 lg:px-6 pt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">
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
            {children}
          </main>

          <MobileBottomNav />
          <QuickNoteButton />
          <ScrollToTop />
          <OfflineBanner />
        </div>
      </div>

      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          {['Navigate', 'AI', 'Study', 'Resources', 'Progress', 'Social', 'Account'].map(group => {
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
    </SidebarProvider>
  );
};
