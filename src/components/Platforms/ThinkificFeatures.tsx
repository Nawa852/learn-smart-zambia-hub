import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import BrightSphereLogo from '@/assets/brightsphere-logo.svg';
import {
  Smartphone, Palette, ShoppingCart, Users, BarChart3, Globe,
  Layout, Zap, Mail, CreditCard, Settings, Play, FileText, Layers
} from 'lucide-react';

const ThinkificFeatures = () => {
  const [activeTab, setActiveTab] = useState('builder');

  const courseTemplates = [
    { id: 1, name: 'Mini Course', lessons: 5, price: 'Free', color: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'Flagship Course', lessons: 20, price: 'K 1,500', color: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'Membership Site', lessons: '50+', price: 'K 500/mo', color: 'from-orange-500 to-amber-500' },
    { id: 4, name: 'Coaching Program', lessons: 12, price: 'K 5,000', color: 'from-green-500 to-emerald-500' },
  ];

  const integrations = [
    { name: 'Stripe', icon: CreditCard, connected: true },
    { name: 'Mailchimp', icon: Mail, connected: true },
    { name: 'Zapier', icon: Zap, connected: false },
    { name: 'Analytics', icon: BarChart3, connected: true },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Thinkific-Style Course Builder</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-4 h-4" />
              <span>Powered by BrightSphere AI</span>
            </div>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <Zap className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="builder">Course Builder</TabsTrigger>
          <TabsTrigger value="website">Website Builder</TabsTrigger>
          <TabsTrigger value="mobile">Mobile App</TabsTrigger>
          <TabsTrigger value="selling">Selling Tools</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6 mt-6">
          {/* AI-Powered Course Creation */}
          <Card className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <img src={BrightSphereLogo} alt="AI" className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">AI-Powered Course Pages</h3>
                  <p className="text-sm text-muted-foreground">Let BrightSphere AI create your course landing page automatically</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Generate with AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Course Templates */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Course Templates</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courseTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className={`aspect-square bg-gradient-to-br ${template.color} rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Layers className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.lessons} lessons</p>
                    <Badge variant="secondary" className="mt-2">{template.price}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Blended Learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Blended Learning Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Combine online courses with in-person coaching and workshops.</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Play className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium">Video Lessons</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium">PDFs & Resources</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium">Live Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="website" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                Website Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Build a complete website with CMS for sales pages and marketing funnels.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Site Pages</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Homepage</span>
                      <Badge variant="secondary">Published</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Course Catalog</span>
                      <Badge variant="secondary">Published</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>About Page</span>
                      <Badge variant="outline">Draft</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Custom Domain</h4>
                  <Input placeholder="yourbrand.com" className="mb-2" />
                  <Button size="sm" variant="outline" className="w-full">Connect Domain</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6 mt-6">
          <Card className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-32 h-56 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-xl">
                  <Smartphone className="w-16 h-16 text-white" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-2 bg-blue-600">Premium Feature</Badge>
                  <h3 className="text-2xl font-bold mb-2">White-Label Mobile App</h3>
                  <p className="text-muted-foreground mb-4">Get your own branded mobile app on iOS and Android. Your students can access courses on the go.</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      Custom branding & logo
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      Push notifications
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      Offline viewing
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-700">Launch Mobile App</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selling" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                E-commerce & Selling Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {integrations.map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <div key={integration.name} className="p-4 rounded-lg border text-center">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-medium text-sm">{integration.name}</div>
                      <Badge variant={integration.connected ? "default" : "outline"} className="mt-2 text-xs">
                        {integration.connected ? "Connected" : "Connect"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="text-2xl font-bold text-blue-600">K 45,280</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground">Students Enrolled</div>
                  <div className="text-2xl font-bold text-blue-600">1,234</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Course Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                  <div className="text-2xl font-bold text-blue-600">72%</div>
                  <Progress value={72} className="mt-2" />
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">Engagement</div>
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <Progress value={85} className="mt-2" />
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <Progress value={94} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThinkificFeatures;
