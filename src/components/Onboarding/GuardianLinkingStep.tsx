import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Heart, Eye, Bell } from "lucide-react";
import { toast } from "sonner";

interface GuardianData {
  fullName: string;
  relationship: string;
  phone: string;
  email: string;
  mode: 'motivator' | 'monitor' | 'watcher';
}

interface GuardianLinkingStepProps {
  onComplete: (data: GuardianData) => void;
  onSkip: () => void;
}

export const GuardianLinkingStep = ({ onComplete, onSkip }: GuardianLinkingStepProps) => {
  const [guardianData, setGuardianData] = useState<GuardianData>({
    fullName: '',
    relationship: '',
    phone: '',
    email: '',
    mode: 'monitor'
  });

  const handleSubmit = () => {
    if (!guardianData.fullName || !guardianData.phone) {
      toast.error("Please fill in guardian's name and phone number");
      return;
    }
    onComplete(guardianData);
  };

  const modes = [
    {
      id: 'motivator' as const,
      icon: Heart,
      label: "Motivator",
      description: "Sends encouragement and positive reinforcement",
      color: "text-pink-500"
    },
    {
      id: 'monitor' as const,
      icon: Shield,
      label: "Monitor",
      description: "Receives progress reports and insights",
      color: "text-blue-500"
    },
    {
      id: 'watcher' as const,
      icon: Eye,
      label: "Silent Watcher",
      description: "No notifications, just dashboard insights",
      color: "text-purple-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2 mb-8">
        <motion.div
          className="inline-block"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>
        <h2 className="text-3xl font-bold gradient-text-bright-sphere">Guardian Bonding Protocol</h2>
        <p className="text-muted-foreground text-lg">Every learner deserves a guiding light.</p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
          <CardDescription>
            Connect with a trusted guardian who will support your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guardianName">Full Name *</Label>
              <Input
                id="guardianName"
                placeholder="Guardian's full name"
                value={guardianData.fullName}
                onChange={(e) => setGuardianData({ ...guardianData, fullName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship *</Label>
              <Select
                value={guardianData.relationship}
                onValueChange={(value) => setGuardianData({ ...guardianData, relationship: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="guardian">Legal Guardian</SelectItem>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (WhatsApp) *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+260..."
                value={guardianData.phone}
                onChange={(e) => setGuardianData({ ...guardianData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="guardian@example.com"
                value={guardianData.email}
                onChange={(e) => setGuardianData({ ...guardianData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Guardian Mode Preferences</Label>
            <RadioGroup
              value={guardianData.mode}
              onValueChange={(value: any) => setGuardianData({ ...guardianData, mode: value })}
              className="grid md:grid-cols-3 gap-4"
            >
              {modes.map((mode) => (
                <motion.div
                  key={mode.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      guardianData.mode === mode.id
                        ? 'border-primary shadow-lg'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <RadioGroupItem value={mode.id} id={mode.id} className="sr-only" />
                      <label htmlFor={mode.id} className="cursor-pointer space-y-3">
                        <mode.icon className={`w-10 h-10 ${mode.color}`} />
                        <div>
                          <h4 className="font-semibold">{mode.label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{mode.description}</p>
                        </div>
                      </label>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </RadioGroup>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex gap-3">
              <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-sm">Neural Bond Visualization</p>
                <p className="text-sm text-muted-foreground">
                  Once linked, your dashboard will show a living connection that grows brighter with consistent learning.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={onSkip}>
          Skip for Now
        </Button>
        <Button onClick={handleSubmit} className="min-w-32">
          Create Guardian Link
        </Button>
      </div>
    </motion.div>
  );
};
