import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useTabFromUrl(defaultTab: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || defaultTab;

  const setTab = useCallback((value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  }, [setSearchParams]);

  return [tab, setTab] as const;
}
