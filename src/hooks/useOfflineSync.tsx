import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PendingAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

const DB_NAME = 'edu-zambia-offline';
const DB_VERSION = 3;
const STORE_NAME = 'pending-actions';
const CACHE_STORE = 'cached-data';
const LESSONS_STORE = 'offline-lessons';
const NOTES_STORE = 'offline-notes';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(CACHE_STORE)) db.createObjectStore(CACHE_STORE, { keyPath: 'key' });
      if (!db.objectStoreNames.contains(LESSONS_STORE)) db.createObjectStore(LESSONS_STORE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(NOTES_STORE)) db.createObjectStore(NOTES_STORE, { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Download a lesson for offline use
export async function downloadLessonOffline(lesson: any, courseName?: string) {
  try {
    const db = await openDB();
    const tx = db.transaction(LESSONS_STORE, 'readwrite');
    tx.objectStore(LESSONS_STORE).put({
      ...lesson,
      courseName: courseName || 'Unknown Course',
      downloadedAt: Date.now(),
    });
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    return true;
  } catch (e) {
    console.error('Failed to save lesson offline', e);
    return false;
  }
}

// Remove a lesson from offline storage
export async function removeLessonOffline(lessonId: string) {
  try {
    const db = await openDB();
    const tx = db.transaction(LESSONS_STORE, 'readwrite');
    tx.objectStore(LESSONS_STORE).delete(lessonId);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    return true;
  } catch {
    return false;
  }
}

// Get all offline lessons
export async function getOfflineLessons(): Promise<any[]> {
  try {
    const db = await openDB();
    const tx = db.transaction(LESSONS_STORE, 'readonly');
    const req = tx.objectStore(LESSONS_STORE).getAll();
    return new Promise(res => {
      req.onsuccess = () => res(req.result || []);
      req.onerror = () => res([]);
    });
  } catch {
    return [];
  }
}

// Download a note for offline use
export async function saveNoteOffline(note: any) {
  try {
    const db = await openDB();
    const tx = db.transaction(NOTES_STORE, 'readwrite');
    tx.objectStore(NOTES_STORE).put({
      ...note,
      savedAt: Date.now(),
    });
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    return true;
  } catch {
    return false;
  }
}

// Get all offline notes
export async function getOfflineNotes(): Promise<any[]> {
  try {
    const db = await openDB();
    const tx = db.transaction(NOTES_STORE, 'readonly');
    const req = tx.objectStore(NOTES_STORE).getAll();
    return new Promise(res => {
      req.onsuccess = () => res(req.result || []);
      req.onerror = () => res([]);
    });
  } catch {
    return [];
  }
}

// Remove a note from offline storage
export async function removeNoteOffline(noteId: string) {
  try {
    const db = await openDB();
    const tx = db.transaction(NOTES_STORE, 'readwrite');
    tx.objectStore(NOTES_STORE).delete(noteId);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    return true;
  } catch {
    return false;
  }
}

// Download all enrolled course lessons for offline
export async function downloadCourseOffline(courseId: string, courseName: string) {
  try {
    const { data: lessons } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');

    if (!lessons?.length) return 0;

    let count = 0;
    for (const lesson of lessons) {
      const ok = await downloadLessonOffline(lesson, courseName);
      if (ok) count++;
    }
    return count;
  } catch {
    return 0;
  }
}

// Get estimated offline storage size
export async function getOfflineStorageEstimate() {
  try {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const est = await navigator.storage.estimate();
      return {
        usage: est.usage || 0,
        quota: est.quota || 0,
        usageMB: Math.round((est.usage || 0) / (1024 * 1024) * 10) / 10,
        quotaMB: Math.round((est.quota || 0) / (1024 * 1024)),
      };
    }
  } catch {}
  return { usage: 0, quota: 0, usageMB: 0, quotaMB: 0 };
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const onOnline = () => {
      setIsOnline(true);
      toast.success('Back online', { description: 'Syncing your changes...' });
      syncPendingActions();
    };
    const onOffline = () => {
      setIsOnline(false);
      toast.warning('You\'re offline', { description: 'You can still access downloaded lessons and notes.' });
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    loadPendingCount();

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const loadPendingCount = async () => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const count = tx.objectStore(STORE_NAME).count();
      count.onsuccess = () => setPendingCount(count.result);
    } catch {}
  };

  const queueAction = useCallback(async (type: string, payload: any) => {
    const action: PendingAction = { id: crypto.randomUUID(), type, payload, timestamp: Date.now() };
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).add(action);
      await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
      setPendingCount(prev => prev + 1);
    } catch (e) {
      console.error('Failed to queue offline action', e);
    }
  }, []);

  const cacheData = useCallback(async (key: string, data: any) => {
    try {
      const db = await openDB();
      const tx = db.transaction(CACHE_STORE, 'readwrite');
      tx.objectStore(CACHE_STORE).put({ key, data, cachedAt: Date.now() });
    } catch {}
  }, []);

  const getCachedData = useCallback(async <T = any>(key: string): Promise<T | null> => {
    try {
      const db = await openDB();
      const tx = db.transaction(CACHE_STORE, 'readonly');
      const req = tx.objectStore(CACHE_STORE).get(key);
      return new Promise(res => {
        req.onsuccess = () => res(req.result?.data ?? null);
        req.onerror = () => res(null);
      });
    } catch {
      return null;
    }
  }, []);

  const syncPendingActions = useCallback(async () => {
    if (isSyncing || !navigator.onLine) return;
    setIsSyncing(true);
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const all = tx.objectStore(STORE_NAME).getAll();

      await new Promise<void>((resolve) => {
        all.onsuccess = async () => {
          const actions: PendingAction[] = all.result || [];
          if (actions.length === 0) { resolve(); return; }

          for (const action of actions) {
            try {
              // Process sync actions based on type
              if (action.type === 'create_note') {
                await supabase.from('student_notes').insert(action.payload);
              } else if (action.type === 'update_note') {
                await supabase.from('student_notes').update(action.payload.data).eq('id', action.payload.id);
              } else if (action.type === 'complete_lesson') {
                await supabase.from('lesson_completions').insert(action.payload);
              }

              const delTx = db.transaction(STORE_NAME, 'readwrite');
              delTx.objectStore(STORE_NAME).delete(action.id);
            } catch (e) {
              console.error('Failed to sync action:', action.id, e);
            }
          }
          setPendingCount(0);
          toast.success('All changes synced!');
          resolve();
        };
      });
    } catch (e) {
      console.error('Sync failed', e);
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  return {
    isOnline,
    pendingCount,
    isSyncing,
    queueAction,
    cacheData,
    getCachedData,
    syncPendingActions,
  };
}
