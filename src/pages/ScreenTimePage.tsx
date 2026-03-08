import React from 'react';
import { ScreenTimeDashboard } from '@/components/DeviceControl/ScreenTimeDashboard';
import { Monitor } from 'lucide-react';

const ScreenTimePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Monitor className="w-8 h-8 text-primary" /> Screen Time
        </h1>
        <p className="text-muted-foreground mt-1">Monitor your daily app usage</p>
      </div>
      <ScreenTimeDashboard />
    </div>
  );
};

export default ScreenTimePage;
