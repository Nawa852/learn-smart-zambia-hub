import { useState, useCallback, useEffect } from 'react';

export type AppProfileType = 'default' | 'work' | 'personal' | 'exam';

interface AppProfile {
  id: AppProfileType;
  name: string;
  icon: string;
  theme: 'light' | 'dark' | 'system';
  pinnedRoutes: string[];
  hiddenSidebarItems: string[];
  dashboardLayout: 'full' | 'compact' | 'focus';
  notificationsEnabled: boolean;
}

const DEFAULT_PROFILES: AppProfile[] = [
  {
    id: 'default',
    name: 'Default',
    icon: '🏠',
    theme: 'system',
    pinnedRoutes: ['/dashboard', '/my-courses', '/ai'],
    hiddenSidebarItems: [],
    dashboardLayout: 'full',
    notificationsEnabled: true,
  },
  {
    id: 'work',
    name: 'Study Mode',
    icon: '📚',
    theme: 'light',
    pinnedRoutes: ['/focus-mode', '/my-assignments', '/study-planner', '/pomodoro'],
    hiddenSidebarItems: ['messenger', 'social-feed', 'study-groups'],
    dashboardLayout: 'focus',
    notificationsEnabled: false,
  },
  {
    id: 'personal',
    name: 'Casual',
    icon: '🎮',
    theme: 'dark',
    pinnedRoutes: ['/achievements', '/study-groups', '/messenger', '/social-feed'],
    hiddenSidebarItems: ['ecz-past-papers', 'ecz-exam-simulator'],
    dashboardLayout: 'full',
    notificationsEnabled: true,
  },
  {
    id: 'exam',
    name: 'Exam Prep',
    icon: '🎯',
    theme: 'light',
    pinnedRoutes: ['/ecz-past-papers', '/ecz-exam-simulator', '/ai-quiz', '/flashcards', '/spaced-repetition'],
    hiddenSidebarItems: ['messenger', 'social-feed', 'study-groups', 'achievements'],
    dashboardLayout: 'compact',
    notificationsEnabled: false,
  },
];

const STORAGE_KEY = 'edu-zambia-app-profile';
const PROFILES_KEY = 'edu-zambia-app-profiles';

export function useAppProfile() {
  const [activeProfileId, setActiveProfileId] = useState<AppProfileType>(() => {
    return (localStorage.getItem(STORAGE_KEY) as AppProfileType) || 'default';
  });

  const [profiles, setProfiles] = useState<AppProfile[]>(() => {
    try {
      const stored = localStorage.getItem(PROFILES_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PROFILES;
    } catch {
      return DEFAULT_PROFILES;
    }
  });

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeProfileId);
  }, [activeProfileId]);

  useEffect(() => {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  }, [profiles]);

  // Apply theme when profile changes
  useEffect(() => {
    if (activeProfile.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (activeProfile.theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
    // 'system' = leave as-is (handled by next-themes)
  }, [activeProfile.theme]);

  const switchProfile = useCallback((profileId: AppProfileType) => {
    setActiveProfileId(profileId);
  }, []);

  const updateProfile = useCallback((profileId: AppProfileType, updates: Partial<AppProfile>) => {
    setProfiles(prev => prev.map(p => p.id === profileId ? { ...p, ...updates } : p));
  }, []);

  const isRouteHidden = useCallback((route: string) => {
    return activeProfile.hiddenSidebarItems.some(item => route.includes(item));
  }, [activeProfile]);

  const isPinned = useCallback((route: string) => {
    return activeProfile.pinnedRoutes.includes(route);
  }, [activeProfile]);

  return {
    activeProfile,
    profiles,
    switchProfile,
    updateProfile,
    isRouteHidden,
    isPinned,
  };
}
