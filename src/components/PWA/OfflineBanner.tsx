import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw, CloudOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOfflineSync } from '@/hooks/useOfflineSync';

export function OfflineBanner() {
  const { isOnline, pendingCount, isSyncing, syncPendingActions } = useOfflineSync();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[9998] bg-destructive/90 backdrop-blur-sm text-destructive-foreground"
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive-foreground" />
              </span>
              <WifiOff className="w-4 h-4" />
              <span className="font-medium">You're offline</span>
              {pendingCount > 0 && (
                <span className="text-destructive-foreground/80">
                  · {pendingCount} change{pendingCount > 1 ? 's' : ''} pending
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-destructive-foreground/70 hidden sm:block">Changes will sync when you reconnect</span>
              <Button
                size="sm"
                variant="secondary"
                className="h-7 text-xs"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Retry
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {isOnline && isSyncing && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[9998] bg-primary/90 backdrop-blur-sm text-primary-foreground"
        >
          <div className="container mx-auto px-4 py-2 flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Syncing your offline changes...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
