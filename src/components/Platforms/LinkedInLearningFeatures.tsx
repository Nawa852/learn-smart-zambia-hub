import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Linkedin, Brain, Target, TrendingUp, Briefcase, Users, 
  Sparkles, BookOpen, Award, CheckCircle2, ArrowRight
} from "lucide-react";
import BrightSphereLogo from "@/assets/brightsphere-logo.svg";

const LinkedInLearningFeatures = () => {
  const [goals, setGoals] = useState(['Leadership', 'Data Analysis']);

  const aiRecommendations = [
    { title: "Python for Data Science", reason: "Based on your Data Analysis goal", match: 95 },
    { title: "Strategic Leadership", reason: "Trending among your connections", match: 88 },
    { title: "Project Management Pro", reason: "Complements your current skills", match: 82 }
  ];

  const learningPaths = [
    {
      title: "Become a Data Analyst",
      courses: 12,
      hours: 35,
      skills: ["Excel", "SQL", "Tableau", "Python"],
      progress: 45
    },
    {
      title: "Become a Project Manager",
      courses: 10,
      hours: 28,
      skills: ["Agile", "Scrum", "Risk Management", "Leadership"],
      progress: 0
    },
    {
      title: "Become a UX Designer",
      courses: 15,
      hours: 42,
      skills: ["Figma", "User Research", "Prototyping", "Design Thinking"],
      progress: 20
    }
  ];

  const businessSkills = [
    "Leadership", "Communication", "Project Management", 
    "Strategic Thinking", "Negotiation", "Time Management"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
        <div>
          <h2 className="text-2xl font-bold">LinkedIn Learning Features</h2>
          <p className="text-muted-foreground">AI coaching, personalized paths & career development</p>
        </div>
      </div>

      {/* AI-Powered Coaching */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            AI-Powered Career Coach
            <Badge className="ml-2 bg-primary/20 text-primary">Powered by BrightSphere</Badge>
          </CardTitle>
          <CardDescription>
            Get personalized recommendations and content creation assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-card border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <Badge variant="outline">{rec.match}% match</Badge>
                </div>
                <h4 className="font-semibold">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                <Button size="sm" className="mt-3 w-full">Start Course</Button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={BrightSphereLogo} alt="AI" className="w-8 h-8" />
              <div>
                <h4 className="font-medium">AI Content Assistant</h4>
                <p className="text-sm text-muted-foreground">Get help creating learning content & summaries</p>
              </div>
            </div>
            <Button variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Ask AI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Learning Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Personalized Learning Plan
          </CardTitle>
          <CardDescription>
            Your goals shape your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Your Learning Goals</p>
            <div className="flex flex-wrap gap-2">
              {goals.map((goal, idx) => (
                <Badge key={idx} className="px-3 py-1">
                  {goal}
                  <button 
                    className="ml-2 hover:text-destructive"
                    onClick={() => setGoals(goals.filter(g => g !== goal))}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button variant="outline" size="sm">+ Add Goal</Button>
            </div>
          </div>

          <div className="space-y-4">
            {learningPaths.map((path, idx) => (
              <div key={idx} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      {path.title}
                      {path.progress > 0 && (
                        <Badge variant="secondary">{path.progress}% complete</Badge>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {path.courses} courses • {path.hours} hours
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {path.skills.map((skill, sidx) => (
                        <Badge key={sidx} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant={path.progress > 0 ? "default" : "outline"}>
                    {path.progress > 0 ? "Continue" : "Start Path"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                {path.progress > 0 && (
                  <Progress value={path.progress} className="mt-4 h-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* LinkedIn Integration */}
      <Card className="bg-[#0077B5]/10 border-[#0077B5]/30">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">LinkedIn Profile Integration</h3>
                <p className="text-muted-foreground">
                  Connect to display certificates and sync career goals
                </p>
              </div>
            </div>
            <Button className="bg-[#0077B5] hover:bg-[#0077B5]/90">
              Connect LinkedIn
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <Award className="w-5 h-5 text-[#0077B5] mb-2" />
              <h4 className="font-medium">Show Certificates</h4>
              <p className="text-xs text-muted-foreground">Display on your profile</p>
            </div>
            <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <Users className="w-5 h-5 text-[#0077B5] mb-2" />
              <h4 className="font-medium">Network Insights</h4>
              <p className="text-xs text-muted-foreground">See what connections learn</p>
            </div>
            <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <Briefcase className="w-5 h-5 text-[#0077B5] mb-2" />
              <h4 className="font-medium">Job Matching</h4>
              <p className="text-xs text-muted-foreground">Skills-based recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Skills Focus */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Business & Soft Skills
          </CardTitle>
          <CardDescription>
            Essential skills for career advancement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {businessSkills.map((skill, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 hover:from-primary/10 hover:to-primary/5 transition-colors cursor-pointer"
              >
                <h4 className="font-medium">{skill}</h4>
                <p className="text-xs text-muted-foreground mt-1">12+ courses</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Career Development Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { skill: "Leadership", current: 75, target: 100, courses: 3 },
              { skill: "Data Analysis", current: 45, target: 100, courses: 5 },
              { skill: "Communication", current: 90, target: 100, courses: 2 }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.courses} courses remaining
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={item.current} className="flex-1 h-3" />
                  <span className="text-sm font-medium w-12">{item.current}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInLearningFeatures;
