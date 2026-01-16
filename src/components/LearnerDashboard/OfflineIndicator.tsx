import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, WifiOff, Download, Cloud, HardDrive, 
  RefreshCw, Check, AlertTriangle, Smartphone
} from 'lucide-react';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'syncing'>('synced');
  const [downloadedContent, setDownloadedContent] = useState({
    lessons: 12,
    quizzes: 8,
    total: 20,
    sizeInMB: 45
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Card className={`border ${
      isOnline ? 'border-green-200 bg-green-50/30' : 'border-orange-200 bg-orange-50/30'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-green-600" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center animate-pulse">
                <WifiOff className="w-5 h-5 text-orange-600" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">
                  {isOnline ? 'Online' : 'Offline Mode'}
                </p>
                {syncStatus === 'synced' && isOnline && (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                    <Check className="w-3 h-3 mr-1" />
                    Synced
                  </Badge>
                )}
                {syncStatus === 'pending' && (
                  <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {isOnline 
                  ? 'All features available' 
                  : `${downloadedContent.lessons} lessons available offline`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <HardDrive className="w-4 h-4" />
              {downloadedContent.sizeInMB}MB saved
            </div>
            {isOnline && (
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download More
              </Button>
            )}
          </div>
        </div>

        {!isOnline && (
          <div className="mt-3 pt-3 border-t border-orange-200">
            <p className="text-xs text-orange-600 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Working offline. Your progress will sync when you reconnect.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
