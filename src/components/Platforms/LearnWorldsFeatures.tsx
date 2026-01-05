import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrightSphereLogo from '@/assets/brightsphere-logo.svg';
import {
  Video, Play, MessageSquare, Users, Smartphone, FileText,
  Award, CheckCircle, Layers, Sparkles, BookOpen, Globe
} from 'lucide-react';

const LearnWorldsFeatures = () => {
  const [activeTab, setActiveTab] = useState('interactive');

  const interactiveVideoFeatures = [
    { id: 1, name: 'In-Video Quizzes', desc: 'Add questions at any point', icon: MessageSquare },
    { id: 2, name: 'Pop-up CTAs', desc: 'Clickable overlays & buttons', icon: Layers },
    { id: 3, name: 'Hotspot Links', desc: 'Interactive clickable areas', icon: Play },
    { id: 4, name: 'Chapter Markers', desc: 'Navigate to key moments', icon: BookOpen },
  ];

  const assessmentTypes = [
    { name: 'Multiple Choice', count: 150, icon: '📝' },
    { name: 'Fill in Blank', count: 80, icon: '✍️' },
    { name: 'Essay Questions', count: 45, icon: '📄' },
    { name: 'File Upload', count: 30, icon: '📁' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">LearnWorlds-Style Interactive Learning</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-4 h-4" />
              <span>Powered by BrightSphere AI</span>
            </div>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-teal-500 to-cyan-600">
          <Sparkles className="w-4 h-4 mr-2" />
          Create Interactive Content
        </Button>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="interactive">Interactive Video</TabsTrigger>
          <TabsTrigger value="ebooks">E-Books</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="community">Social Network</TabsTrigger>
          <TabsTrigger value="mobile">Mobile App</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive" className="space-y-6 mt-6">
          {/* Interactive Video Hero */}
          <Card className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-64 h-40 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center relative">
                  <Play className="w-16 h-16 text-white" />
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur rounded px-2 py-1 text-xs text-white">
                    Interactive
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white/20 backdrop-blur rounded px-2 py-1 text-xs text-white">
                    📝 Quiz at 2:30
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Interactive Video Player</h3>
                  <p className="text-muted-foreground mb-4">Create engaging videos with pop-ups, quizzes, and clickable links that boost completion rates by 40%.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {interactiveVideoFeatures.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <div key={feature.id} className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4 text-teal-500" />
                          <span>{feature.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Analytics */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-teal-500">89%</div>
                <div className="text-sm text-muted-foreground">Watch Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-teal-500">45%</div>
                <div className="text-sm text-muted-foreground">Interaction Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-teal-500">12</div>
                <div className="text-sm text-muted-foreground">Avg. Clicks/Video</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-teal-500">92%</div>
                <div className="text-sm text-muted-foreground">Quiz Completion</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ebooks" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-500" />
                Interactive E-Books with Note-Taking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-6">
                <div className="w-48 h-64 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-16 h-16 text-teal-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Digital Textbooks</h3>
                  <p className="text-muted-foreground mb-4">Students can highlight, annotate, and take notes directly within e-books. All notes sync across devices.</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">Highlight & annotate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">Export notes as PDF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">Search within content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">Offline access</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-500" />
                Assessment Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {assessmentTypes.map((type) => (
                  <div key={type.name} className="p-4 rounded-lg border text-center hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-muted-foreground">{type.count} questions</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">AI-Powered Grading</h4>
                <p className="text-sm text-muted-foreground">BrightSphere AI automatically grades essays and provides detailed feedback.</p>
                <Progress value={78} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">78% of assignments auto-graded</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-500" />
                Built-in Social Network
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Foster a community of learners with discussion forums, profiles, and social features built right into your school.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-teal-500">5,420</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-teal-500">1,280</div>
                  <div className="text-sm text-muted-foreground">Discussions</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-teal-500">8,900</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6 mt-6">
          <Card className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20">
            <CardContent className="p-6 flex items-center gap-6">
              <div className="w-32 h-56 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl">
                <Smartphone className="w-16 h-16 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="mb-2 bg-teal-500">Mobile App Builder</Badge>
                <h3 className="text-2xl font-bold mb-2">Custom Mobile Apps</h3>
                <p className="text-muted-foreground mb-4">Build and publish your own branded mobile app to the App Store and Google Play.</p>
                <Button className="bg-teal-500 hover:bg-teal-600">Build Your App</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnWorldsFeatures;
