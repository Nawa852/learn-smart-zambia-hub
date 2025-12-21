import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Camera, Video, Clock, Star, Users, Zap, Brain, 
  Image, FileText, MessageCircle, Globe2, Sparkles, Play
} from "lucide-react";
import BrightSphereLogo from "@/assets/brightsphere-logo.svg";

const FiloFeatures = () => {
  const [connecting, setConnecting] = useState(false);
  const [timer, setTimer] = useState(60);

  const tutors = [
    { name: "Dr. Sarah Chen", subject: "Mathematics", rating: 4.9, sessions: 1234, available: true },
    { name: "Prof. James Miller", subject: "Physics", rating: 4.8, sessions: 987, available: true },
    { name: "Dr. Emily Brown", subject: "Chemistry", rating: 4.9, sessions: 756, available: false },
    { name: "Dr. Michael Lee", subject: "Biology", rating: 4.7, sessions: 543, available: true }
  ];

  const subjects = [
    { name: "Chemistry", icon: "🧪", color: "from-green-500 to-emerald-500" },
    { name: "Mathematics", icon: "📐", color: "from-blue-500 to-cyan-500" },
    { name: "Physics", icon: "⚛️", color: "from-purple-500 to-violet-500" },
    { name: "Biology", icon: "🧬", color: "from-pink-500 to-rose-500" },
    { name: "Geography", icon: "🌍", color: "from-orange-500 to-amber-500" },
    { name: "Statistics", icon: "📊", color: "from-indigo-500 to-blue-500" }
  ];

  const visualizations = [
    { type: "Graphs", icon: "📈", desc: "Mathematical functions" },
    { type: "Diagrams", icon: "🔬", desc: "Scientific processes" },
    { type: "Geometry", icon: "📐", desc: "Shapes & proofs" },
    { type: "Biology", icon: "🧬", desc: "Cell structures" },
    { type: "Statistics", icon: "📊", desc: "Data charts" },
    { type: "Maps", icon: "🗺️", desc: "Geographic features" }
  ];

  const startConnect = () => {
    setConnecting(true);
    // Simulate connection countdown
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setConnecting(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
        <div>
          <h2 className="text-2xl font-bold">Filo-Style Instant Tutoring</h2>
          <p className="text-muted-foreground">Connect to tutors in &lt;60 seconds, 24/7 availability</p>
        </div>
      </div>

      {/* Instant Connect Banner */}
      <Card className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground border-0">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-2xl">Connect in Under 60 Seconds</h3>
                <p className="text-primary-foreground/80">
                  24/7 instant 1-on-1 video tutoring with qualified experts
                </p>
              </div>
            </div>
            {connecting ? (
              <div className="text-center">
                <div className="text-4xl font-bold">{timer}s</div>
                <p className="text-sm">Connecting...</p>
              </div>
            ) : (
              <Button variant="secondary" size="lg" onClick={startConnect}>
                <Video className="w-5 h-5 mr-2" />
                Connect Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Photo Homework Solver */}
      <Card className="border-2 border-dashed border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary" />
            Photo Homework Solver
            <Badge className="ml-2">AI-Powered</Badge>
          </CardTitle>
          <CardDescription>
            Upload an image of your homework and get instant step-by-step solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="font-medium">Click to upload or drag & drop</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports: Images, PDFs, equations, diagrams
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button>
                <Image className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Upload PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SuperAI Assistant */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src={BrightSphereLogo} alt="AI" className="w-6 h-6" />
            Filo SuperAI
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">BrightSphere Powered</Badge>
          </CardTitle>
          <CardDescription>
            AI assistant for step-by-step answers with high accuracy & exam-ready formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-card border">
              <Sparkles className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-semibold">Step-by-Step</h4>
              <p className="text-sm text-muted-foreground">Detailed solution breakdowns</p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
              <Brain className="w-6 h-6 text-pink-500 mb-2" />
              <h4 className="font-semibold">Natural Explanations</h4>
              <p className="text-sm text-muted-foreground">Easy to understand language</p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
              <FileText className="w-6 h-6 text-indigo-500 mb-2" />
              <h4 className="font-semibold">Exam-Ready Format</h4>
              <p className="text-sm text-muted-foreground">Proper marking scheme format</p>
            </div>
          </div>
          <div className="relative">
            <Input placeholder="Ask any question... (math, science, coding, etc.)" className="pr-24" />
            <Button className="absolute right-1 top-1 bottom-1" size="sm">
              <Sparkles className="w-4 h-4 mr-1" />
              Ask AI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Academic Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            Academic Visualization Tools
          </CardTitle>
          <CardDescription>
            Graphs, diagrams, and maps for visual learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {visualizations.map((viz, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all cursor-pointer text-center"
              >
                <span className="text-3xl">{viz.icon}</span>
                <h4 className="font-medium mt-2">{viz.type}</h4>
                <p className="text-xs text-muted-foreground">{viz.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-primary" />
            Multi-Subject Coverage
          </CardTitle>
          <CardDescription>
            40M+ questions across all major subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {subjects.map((subject, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-xl bg-gradient-to-br ${subject.color} bg-opacity-10 text-center hover:scale-105 transition-transform cursor-pointer`}
              >
                <span className="text-3xl">{subject.icon}</span>
                <h4 className="font-medium mt-2 text-foreground">{subject.name}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Tutors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Available Tutors
          </CardTitle>
          <CardDescription>
            Qualified experts ready to help 24/7
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {tutors.map((tutor, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                  {tutor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold">{tutor.name}</h4>
                  <p className="text-sm text-muted-foreground">{tutor.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{tutor.rating}</span>
                    <span className="text-xs text-muted-foreground">({tutor.sessions} sessions)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={tutor.available ? "default" : "secondary"}>
                  {tutor.available ? "Available" : "Busy"}
                </Badge>
                <Button disabled={!tutor.available}>
                  <Video className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filo Chrome Extension */}
      <Card className="border-2 border-primary/20">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Filo Chrome Plugin</h3>
                <p className="text-muted-foreground">
                  Quick screenshots and instant solutions from any study site
                </p>
              </div>
            </div>
            <Button variant="outline">
              Install Extension
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiloFeatures;
