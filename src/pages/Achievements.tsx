import React from 'react';
import AchievementSystem from '@/components/Gamification/AchievementSystem';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useClipboard } from '@/hooks/useClipboard';
import { toast } from 'sonner';

const Achievements = () => {
  const { copy } = useClipboard();

  const handleShare = () => {
    copy(`🏆 Check out my achievements on Edu Zambia! ${window.location.origin}/achievements`);
    toast.success('Achievement link copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div />
        <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </div>
      <AchievementSystem />
    </div>
  );
};

export default Achievements;
