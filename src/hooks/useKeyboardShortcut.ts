import { useEffect } from 'react';

interface ShortcutOptions {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export function useKeyboardShortcut(
  options: ShortcutOptions,
  callback: (e: KeyboardEvent) => void,
  deps: any[] = []
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (options.ctrl && !e.ctrlKey && !e.metaKey) return;
      if (options.meta && !e.metaKey) return;
      if (options.shift && !e.shiftKey) return;
      if (options.alt && !e.altKey) return;
      if (e.key.toLowerCase() !== options.key.toLowerCase()) return;
      e.preventDefault();
      callback(e);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [options.key, ...deps]);
}
