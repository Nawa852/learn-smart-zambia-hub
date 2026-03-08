import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Star, Coins } from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';

export const XPBar: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { stats, xpProgress, xpToNextLevel } = useUserStats();

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="gap-1 text-xs">
          <Star className="w-3 h-3" /> Lv.{stats.level}
        </Badge>
        <Badge variant="outline" className="gap-1 text-xs">
          <Zap className="w-3 h-3" /> {stats.xp} XP
        </Badge>
        <Badge variant="outline" className="gap-1 text-xs">
          <Coins className="w-3 h-3" /> {stats.edu_coins}
        </Badge>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {stats.level}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Level {stats.level}</p>
            <p className="text-xs text-muted-foreground">{stats.xp} / {xpToNextLevel} XP</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{stats.xp}</p>
            <p className="text-[10px] text-muted-foreground">XP</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-accent-foreground">{stats.edu_coins}</p>
            <p className="text-[10px] text-muted-foreground">Coins</p>
          </div>
        </div>
      </div>
      <Progress value={xpProgress} className="h-2" />
    </div>
  );
};
