import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, Trophy, Target, Zap, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GamificationSetupProps {
  onComplete: (data: { theme: string; avatar: string }) => void;
}

export const GamificationSetup = ({ onComplete }: GamificationSetupProps) => {
  const [selectedTheme, setSelectedTheme] = useState('explorer');
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1');

  const themes = [
    {
      id: 'explorer',
      icon: Sparkles,
      label: "Knowledge Explorer",
      description: "Discover new territories of learning",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 'mastermind',
      icon: Crown,
      label: "Mastermind",
      description: "Conquer every challenge strategically",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 'scholar',
      icon: Trophy,
      label: "Scholar Sage",
      description: "Pursue wisdom and excellence",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 'whisperer',
      icon: Zap,
      label: "AI Whisperer",
      description: "Master the art of AI collaboration",
      color: "from-orange-500 to-red-500"
    }
  ];

  const avatarOptions = [
    { id: 'avatar1', color: 'bg-gradient-to-br from-blue-500 to-purple-500', initials: 'AS' },
    { id: 'avatar2', color: 'bg-gradient-to-br from-green-500 to-cyan-500', initials: 'KE' },
    { id: 'avatar3', color: 'bg-gradient-to-br from-orange-500 to-pink-500', initials: 'LP' },
    { id: 'avatar4', color: 'bg-gradient-to-br from-purple-500 to-red-500', initials: 'MW' },
  ];

  const rewards = [
    { label: "Setup Complete", amount: "+100", icon: Trophy, color: "text-yellow-500" },
    { label: "Guardian Linked", amount: "+50", icon: Target, color: "text-green-500" },
    { label: "Curiosity Shown", amount: "+10 XP", icon: Sparkles, color: "text-blue-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>
        <h2 className="text-3xl font-bold gradient-text-bright-sphere">Gamified Soul Setup</h2>
        <p className="text-muted-foreground">Choose your learning identity and unlock your potential</p>
      </div>

      {/* XP Theme Selection */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Choose Your XP Theme</Label>
        <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme} className="grid md:grid-cols-2 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer border-2 transition-all ${
                  selectedTheme === theme.id
                    ? 'border-primary shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <CardContent className="p-6">
                  <RadioGroupItem value={theme.id} id={theme.id} className="sr-only" />
                  <label htmlFor={theme.id} className="cursor-pointer flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${theme.color}`}>
                      <theme.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{theme.label}</h3>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                  </label>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </RadioGroup>
      </div>

      {/* Avatar Customizer */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Build Your Digital Identity</Label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {avatarOptions.map((avatar) => (
            <motion.div
              key={avatar.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`cursor-pointer ${
                selectedAvatar === avatar.id ? 'ring-4 ring-primary rounded-full' : ''
              }`}
            >
              <Avatar className={`w-16 h-16 ${avatar.color}`}>
                <AvatarFallback className="text-white font-bold">{avatar.initials}</AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Your avatar will grow and evolve as you progress through your learning journey
        </p>
      </div>

      {/* Immediate Rewards */}
      <Card className="bg-gradient-to-br from-primary/10 via-background to-purple-500/10 border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Your Starting Rewards
          </h3>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50"
              >
                <div className="flex items-center gap-3">
                  <reward.icon className={`w-5 h-5 ${reward.color}`} />
                  <span className="text-sm">{reward.label}</span>
                </div>
                <span className="font-bold text-primary">{reward.amount}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-center">
              <span className="font-semibold">Every action earns resonance</span> — XP, EduCoins, and respect
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={() => onComplete({ theme: selectedTheme, avatar: selectedAvatar })}
          size="lg"
          className="min-w-48"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Complete Setup
        </Button>
      </div>
    </motion.div>
  );
};
