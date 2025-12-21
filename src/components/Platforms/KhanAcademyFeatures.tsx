import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, Trophy, Star, Target, BookOpen, Users, 
  GraduationCap, CheckCircle2, Award, Flame, Crown
} from "lucide-react";
import BrightSphereLogo from "@/assets/brightsphere-logo.svg";

const KhanAcademyFeatures = () => {
  const [streak, setStreak] = useState(7);
  const [points, setPoints] = useState(12450);

  const subjects = [
    { name: "Mathematics", mastery: 78, color: "from-blue-500 to-cyan-500" },
    { name: "Science", mastery: 65, color: "from-green-500 to-emerald-500" },
    { name: "Computing", mastery: 82, color: "from-purple-500 to-pink-500" },
    { name: "Arts & Humanities", mastery: 45, color: "from-orange-500 to-amber-500" }
  ];

  const badges = [
    { name: "Consistent Learner", icon: Flame, unlocked: true },
    { name: "Math Master", icon: Trophy, unlocked: true },
    { name: "Science Explorer", icon: Star, unlocked: true },
    { name: "Quick Thinker", icon: Zap, unlocked: false },
    { name: "Team Player", icon: Users, unlocked: false },
    { name: "Perfect Week", icon: Crown, unlocked: true }
  ];

  const assignments = [
    { title: "Algebra Basics", subject: "Math", due: "Today", questions: 10, completed: 7 },
    { title: "Cell Biology", subject: "Science", due: "Tomorrow", questions: 15, completed: 0 },
    { title: "World History", subject: "Humanities", due: "Fri", questions: 12, completed: 12 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
        <div>
          <h2 className="text-2xl font-bold">Khan Academy Features</h2>
          <p className="text-muted-foreground">Gamification, adaptive learning & free access</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{points.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Energy Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Mastery Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Adaptive Learning - Subject Mastery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Adaptive Subject Mastery
          </CardTitle>
          <CardDescription>
            AI-powered personalized learning for K-12 and beyond
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjects.map((subject, idx) => (
            <div key={idx} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{subject.name}</h4>
                <Badge variant={subject.mastery >= 80 ? "default" : "secondary"}>
                  {subject.mastery}% Mastery
                </Badge>
              </div>
              <div className="relative">
                <Progress value={subject.mastery} className="h-3" />
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${subject.color} opacity-30`}
                  style={{ width: `${subject.mastery}%` }}
                />
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">Practice</Button>
                <Button size="sm" variant="ghost">View Skills</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Gamification - Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Achievement Badges
          </CardTitle>
          <CardDescription>
            Earn badges by completing challenges and maintaining streaks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map((badge, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-xl text-center transition-all ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border-2 border-yellow-500/30' 
                    : 'bg-muted/50 opacity-50 grayscale'
                }`}
              >
                <badge.icon className={`w-8 h-8 mx-auto ${badge.unlocked ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                <p className="text-xs font-medium mt-2">{badge.name}</p>
                {badge.unlocked && (
                  <CheckCircle2 className="w-4 h-4 mx-auto mt-1 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teacher Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Teacher Assignments
          </CardTitle>
          <CardDescription>
            Lessons assigned by your teachers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {assignments.map((assignment, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  assignment.completed === assignment.questions 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {assignment.completed === assignment.questions ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="font-bold">{assignment.completed}/{assignment.questions}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {assignment.subject} • Due {assignment.due}
                  </p>
                </div>
              </div>
              <Button 
                variant={assignment.completed === assignment.questions ? "secondary" : "default"}
                size="sm"
              >
                {assignment.completed === assignment.questions ? "Review" : "Continue"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Free Access Banner */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl">100% Free Forever</h3>
                <p className="text-white/80">
                  World-class education for anyone, anywhere. No subscriptions, no fees.
                </p>
              </div>
            </div>
            <Button variant="secondary" size="lg">
              Start Learning Free
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Daily Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Complete 3 lessons</span>
              <span className="text-green-500">2/3 ✓</span>
            </div>
            <Progress value={66} className="h-3" />
            
            <div className="flex items-center justify-between">
              <span>Earn 500 energy points</span>
              <span className="text-primary">425/500</span>
            </div>
            <Progress value={85} className="h-3" />
            
            <div className="flex items-center justify-between">
              <span>Practice for 30 minutes</span>
              <span className="text-green-500">30/30 ✓</span>
            </div>
            <Progress value={100} className="h-3" />
          </div>
          
          <Button className="w-full mt-4">
            <Zap className="w-4 h-4 mr-2" />
            Keep Going! +200 Bonus Points
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default KhanAcademyFeatures;
