import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrightSphereLogo from '@/assets/brightsphere-logo.svg';
import {
  Rocket, CreditCard, Video, Users, Star, Sparkles,
  FileText, Play, Upload, CheckCircle, Zap, DollarSign
} from 'lucide-react';

const TeachableFeatures = () => {
  const [activeTab, setActiveTab] = useState('setup');

  const setupSteps = [
    { id: 1, title: 'Create Your School', desc: 'Name and brand your online school', completed: true },
    { id: 2, title: 'Upload Content', desc: 'Add videos, PDFs, and resources', completed: true },
    { id: 3, title: 'Set Pricing', desc: 'Choose your pricing strategy', completed: false },
    { id: 4, title: 'Launch!', desc: 'Publish and start selling', completed: false },
  ];

  const contentTypes = [
    { name: 'Video', icon: Video, count: 45, color: 'bg-blue-500' },
    { name: 'PDF', icon: FileText, count: 28, color: 'bg-green-500' },
    { name: 'Text', icon: FileText, count: 15, color: 'bg-purple-500' },
    { name: 'Quiz', icon: CheckCircle, count: 12, color: 'bg-orange-500' },
  ];

  const pricingModels = [
    { id: 1, name: 'One-Time Purchase', price: 'K 500', desc: 'Single payment, lifetime access', popular: true },
    { id: 2, name: 'Subscription', price: 'K 100/mo', desc: 'Recurring monthly access', popular: false },
    { id: 3, name: 'Payment Plan', price: '3 x K 200', desc: 'Split into installments', popular: false },
    { id: 4, name: 'Free with Upsell', price: 'Free', desc: 'Free course with paid upgrade', popular: false },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Teachable-Style Easy Setup</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-4 h-4" />
              <span>Powered by BrightSphere AI</span>
            </div>
          </div>
        </div>
        <Badge className="bg-orange-500">No Tech Skills Needed</Badge>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="setup">Easy Setup</TabsTrigger>
          <TabsTrigger value="content">Content Types</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="affiliate">Affiliates</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6 mt-6">
          {/* Setup Wizard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Quick Setup Wizard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {setupSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-muted'}`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-muted-foreground font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                    {!step.completed && index === setupSteps.findIndex(s => !s.completed) && (
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Continue</Button>
                    )}
                  </div>
                ))}
              </div>
              <Progress value={50} className="mt-6" />
              <p className="text-sm text-muted-foreground mt-2">50% complete - almost there!</p>
            </CardContent>
          </Card>

          {/* No Tech Skills */}
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">No Technical Skills Required</h3>
                <p className="text-sm text-muted-foreground">Create beautiful, professional course pages without any coding or design experience.</p>
              </div>
              <Button variant="outline" className="border-orange-500 text-orange-600">Watch Demo</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-orange-500" />
                Supported Content Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div key={type.name} className="p-4 rounded-lg border text-center hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 ${type.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-muted-foreground">{type.count} files</p>
                    </div>
                  );
                })}
              </div>

              {/* Video Hosting */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <Video className="w-10 h-10 text-orange-500" />
                  <div className="flex-1">
                    <h4 className="font-medium">Included Video Hosting</h4>
                    <p className="text-sm text-muted-foreground">Upload unlimited videos with included hosting - no extra fees.</p>
                  </div>
                  <Badge variant="secondary">Unlimited Storage</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                Flexible Pricing Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {pricingModels.map((model) => (
                  <div key={model.id} className={`p-4 rounded-lg border ${model.popular ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : ''} relative`}>
                    {model.popular && (
                      <Badge className="absolute -top-2 right-2 bg-orange-500">Popular</Badge>
                    )}
                    <h4 className="font-semibold text-lg">{model.name}</h4>
                    <p className="text-2xl font-bold text-orange-500 my-2">{model.price}</p>
                    <p className="text-sm text-muted-foreground">{model.desc}</p>
                  </div>
                ))}
              </div>

              {/* Built-in Payments */}
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
                <div className="flex items-center gap-4">
                  <DollarSign className="w-10 h-10 text-orange-500" />
                  <div className="flex-1">
                    <h4 className="font-medium">Built-in Payment Processing</h4>
                    <p className="text-sm text-muted-foreground">Accept payments via credit card, mobile money, and more with built-in processor.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliate" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Affiliate Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Let others promote your courses and earn commissions for every sale they generate.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-orange-500">25</div>
                  <div className="text-sm text-muted-foreground">Active Affiliates</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-orange-500">K 12,450</div>
                  <div className="text-sm text-muted-foreground">Affiliate Sales</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-orange-500">30%</div>
                  <div className="text-sm text-muted-foreground">Commission Rate</div>
                </div>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Star className="w-4 h-4 mr-2" />
                Manage Affiliates
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeachableFeatures;
