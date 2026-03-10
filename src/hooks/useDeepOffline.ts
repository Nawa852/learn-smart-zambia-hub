import { useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOfflineSync } from './useOfflineSync';
import { toast } from 'sonner';

const CACHE_DB = 'edu-zambia-offline';
const CACHE_STORE = 'cached-data';

// Tables that support offline CRUD
type OfflineTable = 'student_notes' | 'flashcard_decks' | 'flashcard_cards' | 'study_goals' | 'reading_list' | 'bookmarks' | 'daily_checkins';

interface OfflineMutation {
  table: OfflineTable;
  operation: 'insert' | 'update' | 'delete';
  data: any;
  id?: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(CACHE_DB, 3);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(CACHE_STORE)) db.createObjectStore(CACHE_STORE, { keyPath: 'key' });
      if (!db.objectStoreNames.contains('pending-actions')) db.createObjectStore('pending-actions', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('offline-mutations')) db.createObjectStore('offline-mutations', { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function useDeepOffline() {
  const { isOnline, queueAction, cacheData, getCachedData } = useOfflineSync();
  const syncInProgressRef = useRef(false);

  // Pre-cache essential data when online
  const precacheEssentials = useCallback(async () => {
    if (!navigator.onLine) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Cache user's courses
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*, courses(*)')
        .eq('user_id', user.id);
      if (enrollments) await cacheData('my-enrollments', enrollments);

      // Cache user's notes
      const { data: notes } = await supabase
        .from('student_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(50);
      if (notes) await cacheData('my-notes', notes);

      // Cache flashcard decks
      const { data: decks } = await supabase
        .from('flashcard_decks')
        .select('*, flashcard_cards(*)')
        .eq('user_id', user.id);
      if (decks) await cacheData('my-flashcards', decks);

      // Cache study goals
      const { data: goals } = await supabase
        .from('study_goals')
        .select('*')
        .eq('user_id', user.id);
      if (goals) await cacheData('my-goals', goals);

      // Cache reading list
      const { data: readingList } = await supabase
        .from('reading_list')
        .select('*')
        .eq('user_id', user.id);
      if (readingList) await cacheData('my-reading-list', readingList);

      // Cache user stats
      const { data: stats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (stats) await cacheData('my-stats', stats);

      // Cache profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profile) await cacheData('my-profile', profile);

    } catch (e) {
      console.warn('Precache failed:', e);
    }
  }, [cacheData]);

  // Queue an offline mutation
  const offlineMutate = useCallback(async (mutation: OfflineMutation) => {
    if (navigator.onLine) {
      // Try online first
      try {
        return await executeOnlineMutation(mutation);
      } catch {
        // Fall through to offline queue
      }
    }

    // Queue for later sync
    const id = crypto.randomUUID();
    await queueAction(`${mutation.table}:${mutation.operation}`, {
      ...mutation,
      queuedAt: Date.now(),
    });

    // Update local cache optimistically
    await updateLocalCache(mutation);
    
    toast.info('Saved offline', { description: 'Will sync when you reconnect.' });
    return { id, offline: true };
  }, [queueAction]);

  // Execute mutation online
  const executeOnlineMutation = async (mutation: OfflineMutation) => {
    const { table, operation, data, id } = mutation;
    
    switch (operation) {
      case 'insert':
        return await supabase.from(table).insert(data).select().single();
      case 'update':
        return await supabase.from(table).update(data).eq('id', id!).select().single();
      case 'delete':
        return await supabase.from(table).delete().eq('id', id!);
    }
  };

  // Update local IndexedDB cache optimistically
  const updateLocalCache = async (mutation: OfflineMutation) => {
    const cacheKey = `my-${mutation.table.replace('_', '-')}`;
    const cached = await getCachedData<any[]>(cacheKey);
    if (!cached) return;

    let updated: any[];
    switch (mutation.operation) {
      case 'insert':
        updated = [{ ...mutation.data, id: mutation.data.id || crypto.randomUUID() }, ...cached];
        break;
      case 'update':
        updated = cached.map(item => item.id === mutation.id ? { ...item, ...mutation.data } : item);
        break;
      case 'delete':
        updated = cached.filter(item => item.id !== mutation.id);
        break;
      default:
        updated = cached;
    }
    await cacheData(cacheKey, updated);
  };

  // Sync pending mutations when coming back online
  useEffect(() => {
    const handleSync = async (e: Event) => {
      const action = (e as CustomEvent).detail;
      if (!action?.payload?.table) return;

      try {
        await executeOnlineMutation(action.payload as OfflineMutation);
      } catch (err) {
        console.error('Offline sync mutation failed:', err);
      }
    };

    window.addEventListener('offline-sync', handleSync);
    return () => window.removeEventListener('offline-sync', handleSync);
  }, []);

  // Pre-cache when app loads and user is online
  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(precacheEssentials, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, precacheEssentials]);

  return {
    isOnline,
    offlineMutate,
    getCachedData,
    precacheEssentials,
  };
}
