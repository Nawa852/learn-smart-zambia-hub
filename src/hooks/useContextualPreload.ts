import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Route adjacency map: which routes are likely next from current route
const ROUTE_GRAPH: Record<string, string[]> = {
  '/dashboard': ['/my-courses', '/ai', '/focus-mode', '/study-planner', '/analytics', '/course-catalog'],
  '/my-courses': ['/dashboard', '/course-catalog', '/flashcards', '/ai-quiz'],
  '/course-catalog': ['/my-courses', '/dashboard'],
  '/ai': ['/dashboard', '/ai-quiz', '/flashcards', '/mind-maps'],
  '/focus-mode': ['/dashboard', '/pomodoro', '/study-planner'],
  '/study-planner': ['/dashboard', '/focus-mode', '/my-assignments'],
  '/flashcards': ['/spaced-repetition', '/ai-quiz', '/ai'],
  '/ai-quiz': ['/flashcards', '/ai', '/ecz-past-papers'],
  '/mind-maps': ['/ai', '/my-notes'],
  '/my-assignments': ['/dashboard', '/study-planner'],
  '/ecz-past-papers': ['/ecz-exam-simulator', '/ai-quiz'],
  '/ecz-exam-simulator': ['/ecz-past-papers', '/ai-quiz'],
  '/analytics': ['/dashboard', '/achievements', '/goals'],
  '/achievements': ['/analytics', '/dashboard'],
  '/goals': ['/analytics', '/study-planner'],
  '/my-notes': ['/dashboard', '/mind-maps'],
  '/pomodoro': ['/focus-mode', '/dashboard'],
  '/bookmarks': ['/dashboard', '/my-courses'],
  '/spaced-repetition': ['/flashcards', '/ai-quiz'],
  '/reading-list': ['/dashboard', '/bookmarks'],
  '/study-groups': ['/messenger', '/social-feed'],
  '/messenger': ['/study-groups', '/dashboard'],
  '/profile': ['/settings', '/dashboard'],
  '/settings': ['/profile', '/notification-preferences'],
  '/certificates': ['/achievements', '/my-courses'],
};

// Track user navigation patterns to learn preferences
const navigationHistory: string[] = [];
const transitionCounts: Record<string, Record<string, number>> = {};

function recordTransition(from: string, to: string) {
  if (!transitionCounts[from]) transitionCounts[from] = {};
  transitionCounts[from][to] = (transitionCounts[from][to] || 0) + 1;
  navigationHistory.push(to);
  if (navigationHistory.length > 100) navigationHistory.shift();
}

function getLearnedPredictions(currentPath: string): string[] {
  const counts = transitionCounts[currentPath];
  if (!counts) return [];
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([path]) => path);
}

export function useContextualPreload() {
  const location = useLocation();

  const preloadRoute = useCallback((path: string) => {
    // Use dynamic import to trigger React.lazy chunk loading
    const routeMap: Record<string, () => Promise<any>> = {
      '/dashboard': () => import('@/pages/Dashboard'),
      '/my-courses': () => import('@/pages/MyCourses'),
      '/course-catalog': () => import('@/pages/CourseCatalog'),
      '/ai': () => import('@/pages/AIStudyBuddy'),
      '/focus-mode': () => import('@/pages/FocusMode'),
      '/study-planner': () => import('@/pages/StudyPlanner'),
      '/flashcards': () => import('@/pages/Flashcards'),
      '/ai-quiz': () => import('@/pages/AIQuiz'),
      '/mind-maps': () => import('@/pages/MindMaps'),
      '/analytics': () => import('@/pages/Analytics'),
      '/achievements': () => import('@/pages/Achievements'),
      '/goals': () => import('@/pages/Goals'),
      '/my-notes': () => import('@/pages/MyNotes'),
      '/pomodoro': () => import('@/pages/Pomodoro'),
      '/bookmarks': () => import('@/pages/Bookmarks'),
      '/spaced-repetition': () => import('@/pages/SpacedRepetition'),
      '/reading-list': () => import('@/pages/ReadingList'),
      '/my-assignments': () => import('@/pages/MyAssignments'),
      '/ecz-past-papers': () => import('@/pages/ECZPastPapers'),
      '/ecz-exam-simulator': () => import('@/pages/ECZExamSimulator'),
      '/study-groups': () => import('@/pages/StudyGroups'),
      '/messenger': () => import('@/pages/Messenger'),
      '/profile': () => import('@/pages/Profile'),
      '/settings': () => import('@/pages/Settings'),
      '/certificates': () => import('@/pages/CertificatesPage'),
    };

    const loader = routeMap[path];
    if (loader) {
      // Silently preload - errors are fine, it's just a hint
      loader().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = navigationHistory[navigationHistory.length - 1];
    
    if (previousPath && previousPath !== currentPath) {
      recordTransition(previousPath, currentPath);
    }

    // Wait a bit after navigation settles, then preload predicted routes
    const timer = setTimeout(() => {
      // Combine static graph + learned predictions
      const staticPredictions = ROUTE_GRAPH[currentPath] || [];
      const learnedPredictions = getLearnedPredictions(currentPath);
      
      const combined = [...new Set([...learnedPredictions, ...staticPredictions])].slice(0, 4);
      
      combined.forEach((path, i) => {
        // Stagger preloads to avoid network congestion
        setTimeout(() => preloadRoute(path), i * 500);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname, preloadRoute]);

  return { preloadRoute };
}
