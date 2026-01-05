import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrightSphereLogo from '@/assets/brightsphere-logo.svg';
import {
  Crown, Mail, Video, Users, TrendingUp, Calendar,
  FileText, Play, Palette, Zap, Target, Globe, Layout
} from 'lucide-react';

const KajabiFeatures = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const funnelTemplates = [
    { id: 1, name: 'Webinar Funnel', conversions: '4.2%', color: 'from-yellow-500 to-orange-500' },
    { id: 2, name: 'Product Launch', conversions: '3.8%', color: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'Lead Magnet', conversions: '12.5%', color: 'from-blue-500 to-cyan-500' },
    { id: 4, name: 'Sales Page', conversions: '2.1%', color: 'from-green-500 to-emerald-500' },
  ];

  const emailCampaigns = [
    { name: 'Welcome Series', emails: 5, openRate: '45%', status: 'active' },
    { name: 'Course Launch', emails: 8, openRate: '38%', status: 'draft' },
    { name: 'Re-engagement', emails: 3, openRate: '22%', status: 'active' },
  ];

  const liveEventTypes = [
    { name: 'Webinar', icon: Video, desc: 'Live teaching sessions' },
    { name: 'Summit', icon: Users, desc: 'Multi-speaker events' },
    { name: 'Workshop', icon: Target, desc: 'Interactive training' },
    { name: 'Q&A', icon: Calendar, desc: 'Live audience sessions' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Kajabi-Style All-in-One Platform</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-4 h-4" />
              <span>Powered by BrightSphere AI</span>
            </div>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">All-in-One</Badge>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="courses">Course Builder</TabsTrigger>
          <TabsTrigger value="funnels">Funnels</TabsTrigger>
          <TabsTrigger value="email">Email Automation</TabsTrigger>
          <TabsTrigger value="events">Live Events</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-yellow-500" />
                Course Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Create comprehensive courses with videos, PDFs, quizzes, and more.</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border text-center">
                  <Video className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="font-medium">Video Hosting</div>
                  <p className="text-xs text-muted-foreground">Integrated streaming</p>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="font-medium">Downloads</div>
                  <p className="text-xs text-muted-foreground">PDFs & resources</p>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="font-medium">Quizzes</div>
                  <p className="text-xs text-muted-foreground">Assessments</p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <div className="text-xl font-bold text-yellow-500">12</div>
                  <div className="text-xs text-muted-foreground">Courses</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <div className="text-xl font-bold text-yellow-500">156</div>
                  <div className="text-xs text-muted-foreground">Videos</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <div className="text-xl font-bold text-yellow-500">2,340</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <div className="text-xl font-bold text-yellow-500">K 89K</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnels" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                Sales Funnels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build high-converting funnels for webinars, product launches, and more.</p>
              <div className="grid grid-cols-2 gap-4">
                {funnelTemplates.map((funnel) => (
                  <Card key={funnel.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className={`h-24 bg-gradient-to-br ${funnel.color} rounded-lg mb-3 flex items-center justify-center`}>
                        <Layout className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="font-semibold">{funnel.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">Avg. conversion</span>
                        <Badge variant="secondary">{funnel.conversions}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-500" />
                Email Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Create automated email sequences and drip campaigns.</p>
              <div className="space-y-3">
                {emailCampaigns.map((campaign) => (
                  <div key={campaign.name} className="p-4 rounded-lg border flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <p className="text-sm text-muted-foreground">{campaign.emails} emails • {campaign.openRate} open rate</p>
                    </div>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Email Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-500">15,420</div>
                  <div className="text-xs text-muted-foreground">Subscribers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-500">42%</div>
                  <div className="text-xs text-muted-foreground">Avg. Open Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-500">8.5%</div>
                  <div className="text-xs text-muted-foreground">Click Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                Live Events & Webinars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Host live events with built-in templates for summits and webinars.</p>
              <div className="grid grid-cols-4 gap-4">
                {liveEventTypes.map((event) => {
                  const Icon = event.icon;
                  return (
                    <div key={event.name} className="p-4 rounded-lg border text-center hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-yellow-500" />
                      </div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-xs text-muted-foreground">{event.desc}</p>
                    </div>
                  );
                })}
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                <Zap className="w-4 h-4 mr-2" />
                Schedule Live Event
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-yellow-500" />
                Theme Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Choose from beautiful custom designs or create your own.</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Dark Pro</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                  <span className="text-slate-800 text-sm">Clean Light</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Vibrant</span>
                </div>
              </div>

              {/* CMS Feature */}
              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <Globe className="w-10 h-10 text-yellow-500" />
                  <div className="flex-1">
                    <h4 className="font-medium">Built-in CMS</h4>
                    <p className="text-sm text-muted-foreground">Create pages, blogs, and landing pages with drag-and-drop editor.</p>
                  </div>
                  <Button variant="outline" className="border-yellow-500 text-yellow-600">Open Editor</Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KajabiFeatures;
