import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface MacroAction {
  type: 'navigate' | 'click' | 'input' | 'scroll' | 'wait';
  target?: string; // CSS selector or route
  value?: string;
  timestamp: number;
  delay: number; // ms since previous action
}

interface Macro {
  id: string;
  name: string;
  actions: MacroAction[];
  createdAt: number;
  lastRun?: number;
  runCount: number;
}

const DB_NAME = 'edu-zambia-macros';
const STORE_NAME = 'macros';

function openMacroDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function useMacroRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [macros, setMacros] = useState<Macro[]>([]);
  const actionsRef = useRef<MacroAction[]>([]);
  const lastTimeRef = useRef<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Load macros from IndexedDB
  const loadMacros = useCallback(async () => {
    try {
      const db = await openMacroDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAll();
      req.onsuccess = () => setMacros(req.result || []);
    } catch {}
  }, []);

  useEffect(() => { loadMacros(); }, [loadMacros]);

  // Record navigation changes
  useEffect(() => {
    if (!isRecording) return;
    const now = Date.now();
    actionsRef.current.push({
      type: 'navigate',
      target: location.pathname + location.search,
      timestamp: now,
      delay: lastTimeRef.current ? now - lastTimeRef.current : 0,
    });
    lastTimeRef.current = now;
  }, [location.pathname, location.search, isRecording]);

  // Record clicks during recording
  useEffect(() => {
    if (!isRecording) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Build a reasonable selector
      const selector = buildSelector(target);
      if (!selector) return;

      const now = Date.now();
      actionsRef.current.push({
        type: 'click',
        target: selector,
        value: target.textContent?.slice(0, 50),
        timestamp: now,
        delay: lastTimeRef.current ? now - lastTimeRef.current : 0,
      });
      lastTimeRef.current = now;
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isRecording]);

  const startRecording = useCallback(() => {
    actionsRef.current = [];
    lastTimeRef.current = Date.now();
    setIsRecording(true);
    toast.info('🔴 Macro recording started', { description: 'Perform your actions, then stop recording.' });
  }, []);

  const stopRecording = useCallback(async (name: string) => {
    setIsRecording(false);
    if (actionsRef.current.length === 0) {
      toast.warning('No actions recorded');
      return null;
    }

    const macro: Macro = {
      id: crypto.randomUUID(),
      name,
      actions: [...actionsRef.current],
      createdAt: Date.now(),
      runCount: 0,
    };

    try {
      const db = await openMacroDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(macro);
      await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
      toast.success(`Macro "${name}" saved with ${macro.actions.length} actions`);
      loadMacros();
      return macro;
    } catch {
      toast.error('Failed to save macro');
      return null;
    }
  }, [loadMacros]);

  const playMacro = useCallback(async (macroId: string) => {
    const macro = macros.find(m => m.id === macroId);
    if (!macro || isPlaying) return;

    setIsPlaying(true);
    toast.info(`▶ Playing macro: ${macro.name}`);

    for (const action of macro.actions) {
      await new Promise(r => setTimeout(r, Math.min(action.delay, 2000)));

      switch (action.type) {
        case 'navigate':
          if (action.target) navigate(action.target);
          break;
        case 'click':
          if (action.target) {
            const el = document.querySelector<HTMLElement>(action.target);
            el?.click();
          }
          break;
        case 'input':
          if (action.target && action.value) {
            const el = document.querySelector<HTMLInputElement>(action.target);
            if (el) {
              el.value = action.value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
          break;
      }
    }

    // Update run count
    try {
      const db = await openMacroDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      macro.runCount++;
      macro.lastRun = Date.now();
      tx.objectStore(STORE_NAME).put(macro);
    } catch {}

    setIsPlaying(false);
    toast.success(`Macro "${macro.name}" completed`);
    loadMacros();
  }, [macros, isPlaying, navigate, loadMacros]);

  const deleteMacro = useCallback(async (macroId: string) => {
    try {
      const db = await openMacroDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(macroId);
      await new Promise((res) => { tx.oncomplete = res; });
      toast.success('Macro deleted');
      loadMacros();
    } catch {}
  }, [loadMacros]);

  return {
    isRecording,
    isPlaying,
    macros,
    startRecording,
    stopRecording,
    playMacro,
    deleteMacro,
  };
}

function buildSelector(el: HTMLElement): string | null {
  if (el.id) return `#${el.id}`;
  if (el.dataset.testid) return `[data-testid="${el.dataset.testid}"]`;
  
  // Try to build a reasonable path
  const tag = el.tagName.toLowerCase();
  const classes = Array.from(el.classList).slice(0, 2).join('.');
  if (classes) return `${tag}.${classes}`;
  
  // Use aria-label or role
  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel) return `[aria-label="${ariaLabel}"]`;
  
  return null;
}
