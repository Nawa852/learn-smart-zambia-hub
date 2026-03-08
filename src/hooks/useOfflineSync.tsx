import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface PendingAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

const DB_NAME = 'edu-zambia-offline';
const STORE_NAME = 'pending-actions';
const CACHE_STORE = 'cached-data';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(CACHE_STORE)) db.createObjectStore(CACHE_STORE, { keyPath: 'key' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
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
      toast.warning('You\'re offline', { description: 'Changes will sync when you reconnect.' });
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
      const store = tx.objectStore(STORE_NAME);
      const count = store.count();
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
    } catch (e) { console.error('Failed to queue offline action', e); }
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
      return new Promise(res => { req.onsuccess = () => res(req.result?.data ?? null); req.onerror = () => res(null); });
    } catch { return null; }
  }, []);

  const syncPendingActions = useCallback(async () => {
    if (isSyncing || !navigator.onLine) return;
    setIsSyncing(true);
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const all = store.getAll();
      
      await new Promise<void>((resolve) => {
        all.onsuccess = async () => {
          const actions: PendingAction[] = all.result || [];
          if (actions.length === 0) { resolve(); return; }

          // Process each action - in a real app, these would call Supabase
          for (const action of actions) {
            try {
              // Actions will be processed by the app's sync handler
              window.dispatchEvent(new CustomEvent('offline-sync', { detail: action }));
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
