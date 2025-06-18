import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { User, Award, Shield, DollarSign, Zap, Flame } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AcademicAvatarProps {
  userId: string;
  currentLevel: number;
  currentXP: number;
  totalCoins: number;
  studyStreak: number;
}

const AcademicAvatar: React.FC<AcademicAvatarProps> = ({
  userId,
  currentLevel,
  currentXP,
  totalCoins,
  studyStreak,
}) => {
  const xpToNextLevel = currentLevel * 100;
  const progressPercentage = (currentXP / xpToNextLevel) * 100;
  const userName = "Student"; // Replace with actual user name

  return (
    <Card className="shadow-lg animate-fade-in border-purple-200">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-purple-300">
            <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${userId}`} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">{userName}</CardTitle>
            <p className="text-sm text-purple-600 font-semibold">Level {currentLevel}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>XP Progress</span>
              <span>{currentXP} / {xpToNextLevel}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-purple-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center mt-4 text-xs text-gray-600">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold mt-1">{totalCoins}</span>
                  <span>Coins</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your total EduCoins!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold mt-1">5</span>
                  <span>Badges</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Achievements you've unlocked.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                  <Flame className="w-5 h-5 text-red-500" />
                  <span className="font-semibold mt-1">{studyStreak}</span>
                  <span>Streak</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Keep your study streak going!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicAvatar;
