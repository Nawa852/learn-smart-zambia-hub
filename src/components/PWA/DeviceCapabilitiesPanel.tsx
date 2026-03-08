import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import {
  Camera, MapPin, Bell, Wifi, HardDrive, Vibrate,
  Share2, Clipboard, Maximize, Monitor, Smartphone,
  Tablet, Mic, Volume2, Battery, Globe, Bluetooth, Check, X
} from 'lucide-react';

const capabilityMeta = [
  { key: 'camera', label: 'Camera', icon: Camera },
  { key: 'geolocation', label: 'Location', icon: MapPin },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'offline', label: 'Offline Mode', icon: Wifi },
  { key: 'storage', label: 'Storage', icon: HardDrive },
  { key: 'vibration', label: 'Vibration', icon: Vibrate },
  { key: 'share', label: 'Share', icon: Share2 },
  { key: 'clipboard', label: 'Clipboard', icon: Clipboard },
  { key: 'fullscreen', label: 'Fullscreen', icon: Maximize },
  { key: 'speechRecognition', label: 'Speech Input', icon: Mic },
  { key: 'speechSynthesis', label: 'Text-to-Speech', icon: Volume2 },
  { key: 'bluetooth', label: 'Bluetooth', icon: Bluetooth },
  { key: 'battery', label: 'Battery', icon: Battery },
  { key: 'networkInfo', label: 'Network Info', icon: Globe },
] as const;

const platformIcons: Record<string, typeof Monitor> = {
  windows: Monitor, macos: Monitor, linux: Monitor,
  android: Smartphone, ios: Smartphone, unknown: Globe,
};

export function DeviceCapabilitiesPanel() {
  const { capabilities, deviceInfo } = useDeviceCapabilities();
  const PlatformIcon = platformIcons[deviceInfo.platform] || Globe;

  const supported = capabilityMeta.filter(c => capabilities[c.key as keyof typeof capabilities]);
  const unsupported = capabilityMeta.filter(c => !capabilities[c.key as keyof typeof capabilities]);

  return (
    <div className="space-y-4">
      {/* Device info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                {deviceInfo.isTablet ? <Tablet className="w-5 h-5 text-primary" /> :
                 deviceInfo.isMobile ? <Smartphone className="w-5 h-5 text-primary" /> :
                 <PlatformIcon className="w-5 h-5 text-primary" />}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground capitalize">{deviceInfo.platform} · {deviceInfo.browser}</h3>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px]">
                    {deviceInfo.isDesktop ? 'Desktop' : deviceInfo.isTablet ? 'Tablet' : 'Mobile'}
                  </Badge>
                  {deviceInfo.isPWA && <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]">Installed PWA</Badge>}
                  <Badge variant={deviceInfo.isOnline ? 'default' : 'destructive'} className="text-[10px]">
                    {deviceInfo.isOnline ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Supported capabilities */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Available Features ({supported.length})
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {supported.map((cap, i) => (
            <motion.div key={cap.key} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-success/5 border border-success/20">
                <cap.icon className="w-3.5 h-3.5 text-success" />
                <span className="text-xs font-medium text-foreground">{cap.label}</span>
                <Check className="w-3 h-3 text-success ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Unsupported */}
      {unsupported.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Not Available ({unsupported.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {unsupported.map(cap => (
              <div key={cap.key} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/20">
                <cap.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{cap.label}</span>
                <X className="w-3 h-3 text-muted-foreground/50 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
