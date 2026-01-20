import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Building2, Users, GraduationCap, TrendingUp, BarChart3,
  MapPin, Download, FileText, Shield, Award, Target, Brain,
  Sparkles, PieChart, LineChart, Zap, AlertTriangle, CheckCircle,
  Eye, Filter, Calendar, Bell, Settings, Map, Layers, Activity,
  BookOpen, School, Flag, ChevronRight, ArrowUp, ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MainLayout } from '@/components/Layout/MainLayout';

const MinistryDashboard = () => {
  const [activeTab, setActiveTab] = useState('national');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  const nationalStats = [
    { label: 'Total Schools', value: '12,847', icon: School, color: 'bg-primary', change: '+234 this year' },
    { label: 'Total Students', value: '4.2M', icon: GraduationCap, color: 'bg-accent', change: '+180K enrolled' },
    { label: 'Teachers', value: '89,432', icon: Users, color: 'bg-success', change: '+5,200 trained' },
    { label: 'ECZ Pass Rate', value: '72%', icon: Target, color: 'bg-warning', change: '+4% from 2023' },
  ];

  const provinces = [
    { name: 'Lusaka', schools: 1845, students: 620000, passRate: 78, ecz: 82, trend: '+5%', risk: 'low' },
    { name: 'Copperbelt', schools: 1654, students: 485000, passRate: 75, ecz: 79, trend: '+4%', risk: 'low' },
    { name: 'Southern', schools: 1423, students: 380000, passRate: 71, ecz: 74, trend: '+3%', risk: 'medium' },
    { name: 'Central', schools: 1256, students: 345000, passRate: 69, ecz: 71, trend: '+2%', risk: 'medium' },
    { name: 'Eastern', schools: 1189, students: 312000, passRate: 67, ecz: 68, trend: '+3%', risk: 'medium' },
    { name: 'Northern', schools: 1098, students: 298000, passRate: 65, ecz: 66, trend: '+4%', risk: 'high' },
    { name: 'Luapula', schools: 987, students: 265000, passRate: 63, ecz: 64, trend: '+2%', risk: 'high' },
    { name: 'Northwestern', schools: 876, students: 234000, passRate: 64, ecz: 65, trend: '+3%', risk: 'high' },
    { name: 'Western', schools: 812, students: 218000, passRate: 62, ecz: 63, trend: '+1%', risk: 'critical' },
    { name: 'Muchinga', schools: 707, students: 178000, passRate: 61, ecz: 62, trend: '+2%', risk: 'critical' },
  ];

  const subjectPerformance = [
    { subject: 'English', national: 74, urban: 82, rural: 66, change: '+3%' },
    { subject: 'Mathematics', national: 68, urban: 76, rural: 60, change: '+4%' },
    { subject: 'Science', national: 71, urban: 79, rural: 63, change: '+2%' },
    { subject: 'Social Studies', national: 76, urban: 83, rural: 69, change: '+3%' },
    { subject: 'Local Languages', national: 82, urban: 78, rural: 86, change: '+1%' },
  ];

  const policyImpact = [
    { 
      policy: 'Free Education Initiative', 
      implemented: '2022', 
      target: 'Increase enrollment by 20%',
      actual: '18% increase achieved',
      status: 'on-track',
      budget: 'K2.5B'
    },
    { 
      policy: 'Teacher Training Program', 
      implemented: '2023', 
      target: 'Train 10,000 teachers',
      actual: '7,500 trained',
      status: 'in-progress',
      budget: 'K800M'
    },
    { 
      policy: 'Digital Learning Rollout', 
      implemented: '2024', 
      target: '500 schools connected',
      actual: '320 schools connected',
      status: 'delayed',
      budget: 'K1.2B'
    },
    { 
      policy: 'School Feeding Program', 
      implemented: '2021', 
      target: '2M students fed daily',
      actual: '2.3M students',
      status: 'exceeded',
      budget: 'K3.1B'
    },
  ];

  const interventionAreas = [
    { area: 'Western Province', issue: 'Low pass rates', priority: 'critical', students: 218000 },
    { area: 'Muchinga Province', issue: 'Teacher shortage', priority: 'critical', students: 178000 },
    { area: 'Rural Mathematics', issue: 'Below 60% pass rate', priority: 'high', students: 890000 },
    { area: 'Grade 7 Transition', issue: 'Dropout risk', priority: 'high', students: 120000 },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl">
                <Flag className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Ministry of Education</h1>
                <p className="text-muted-foreground mt-1">National Education Analytics Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-primary">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </motion.div>

        {/* National Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {nationalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-foreground mt-1">{stat.value}</h3>
                      <p className="text-xs text-success mt-1 flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`${stat.color} p-4 rounded-2xl`}>
                      <stat.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 flex-wrap">
            <TabsTrigger value="national" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              National Overview
            </TabsTrigger>
            <TabsTrigger value="provinces" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Provincial Data
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance Analytics
            </TabsTrigger>
            <TabsTrigger value="policy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Policy Impact
            </TabsTrigger>
            <TabsTrigger value="interventions" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Interventions
            </TabsTrigger>
          </TabsList>

          {/* National Overview Tab */}
          <TabsContent value="national" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Placeholder */}
              <Card className="lg:col-span-2 border-none shadow-lg min-h-[400px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Zambia Education Map
                  </CardTitle>
                  <CardDescription>Provincial performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center border-2 border-dashed border-muted">
                    <div className="text-center">
                      <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive Zambia Map</p>
                      <p className="text-sm text-muted-foreground">Click on provinces to view details</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-sm">High Performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-sm">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span className="text-sm">Needs Intervention</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Key Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'Literacy Rate', value: 86, target: 90 },
                      { label: 'Numeracy Rate', value: 72, target: 80 },
                      { label: 'School Completion', value: 78, target: 85 },
                      { label: 'Teacher-Student Ratio', value: 65, target: 70 },
                      { label: 'Digital Connectivity', value: 45, target: 60 },
                    ].map((indicator) => (
                      <div key={indicator.label}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{indicator.label}</span>
                          <span className="font-medium">{indicator.value}% / {indicator.target}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={indicator.value} className="h-2" />
                          <div 
                            className="absolute top-0 h-2 w-0.5 bg-primary"
                            style={{ left: `${indicator.target}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subject Performance */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  National Subject Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Subject</th>
                        <th className="text-center p-4 font-medium">National Avg</th>
                        <th className="text-center p-4 font-medium">Urban</th>
                        <th className="text-center p-4 font-medium">Rural</th>
                        <th className="text-center p-4 font-medium">Gap</th>
                        <th className="text-center p-4 font-medium">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectPerformance.map((subject, index) => (
                        <motion.tr
                          key={subject.subject}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-muted/30 hover:bg-muted/20"
                        >
                          <td className="p-4 font-medium">{subject.subject}</td>
                          <td className="p-4 text-center">
                            <Badge variant="default">{subject.national}%</Badge>
                          </td>
                          <td className="p-4 text-center text-success">{subject.urban}%</td>
                          <td className="p-4 text-center text-warning">{subject.rural}%</td>
                          <td className="p-4 text-center">
                            <Badge variant="destructive">{subject.urban - subject.rural}%</Badge>
                          </td>
                          <td className="p-4 text-center text-success">{subject.change}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Provinces Tab */}
          <TabsContent value="provinces" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Provinces</SelectItem>
                  {provinces.map(p => (
                    <SelectItem key={p.name} value={p.name.toLowerCase()}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Risk Level
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {provinces.map((province, index) => (
                <motion.div
                  key={province.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`border-none shadow-lg hover:shadow-xl transition-all border-l-4 ${
                    province.risk === 'critical' ? 'border-l-destructive' :
                    province.risk === 'high' ? 'border-l-warning' :
                    province.risk === 'medium' ? 'border-l-accent' : 'border-l-success'
                  }`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{province.name}</CardTitle>
                        <Badge variant={
                          province.risk === 'critical' ? 'destructive' :
                          province.risk === 'high' ? 'default' :
                          province.risk === 'medium' ? 'secondary' : 'outline'
                        }>
                          {province.risk}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-2 rounded-lg bg-muted/30">
                          <p className="text-muted-foreground">Schools</p>
                          <p className="font-bold text-lg">{province.schools.toLocaleString()}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/30">
                          <p className="text-muted-foreground">Students</p>
                          <p className="font-bold text-lg">{(province.students / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/30">
                          <p className="text-muted-foreground">Pass Rate</p>
                          <p className="font-bold text-lg text-primary">{province.passRate}%</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/30">
                          <p className="text-muted-foreground">ECZ Ready</p>
                          <p className="font-bold text-lg text-accent">{province.ecz}%</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-success flex items-center gap-1">
                          <ArrowUp className="h-3 w-3" />
                          {province.trend} YoY
                        </span>
                        <Button variant="ghost" size="sm">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Performance Analytics Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    ECZ Results Trend (5 Years)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Historical Trend Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Grade Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { grade: 'Distinction (75-100%)', percent: 18, color: 'bg-success' },
                      { grade: 'Merit (60-74%)', percent: 32, color: 'bg-primary' },
                      { grade: 'Credit (50-59%)', percent: 28, color: 'bg-accent' },
                      { grade: 'Pass (40-49%)', percent: 14, color: 'bg-warning' },
                      { grade: 'Fail (Below 40%)', percent: 8, color: 'bg-destructive' },
                    ].map((item) => (
                      <div key={item.grade}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{item.grade}</span>
                          <span className="font-medium">{item.percent}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: 'Predictive Analysis', 
                      desc: 'Based on current trends, Grade 12 pass rate projected to reach 76% by year end',
                      icon: Sparkles,
                      action: 'View Predictions'
                    },
                    { 
                      title: 'Resource Optimization', 
                      desc: 'Western Province needs 340 additional teachers to meet national ratio',
                      icon: Target,
                      action: 'View Recommendations'
                    },
                    { 
                      title: 'Early Warning System', 
                      desc: '12,500 students identified as at-risk for dropping out this term',
                      icon: AlertTriangle,
                      action: 'View At-Risk List'
                    },
                  ].map((insight) => (
                    <Card key={insight.title} className="border bg-gradient-to-br from-primary/5 to-accent/5">
                      <CardContent className="p-4">
                        <insight.icon className="h-8 w-8 text-primary mb-3" />
                        <h4 className="font-semibold mb-2">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{insight.desc}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          {insight.action}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policy Impact Tab */}
          <TabsContent value="policy" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Policy Implementation Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {policyImpact.map((policy, index) => (
                    <motion.div
                      key={policy.policy}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border-l-4 ${
                        policy.status === 'exceeded' ? 'border-l-success bg-success/5' :
                        policy.status === 'on-track' ? 'border-l-primary bg-primary/5' :
                        policy.status === 'in-progress' ? 'border-l-warning bg-warning/5' :
                        'border-l-destructive bg-destructive/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{policy.policy}</h4>
                          <p className="text-sm text-muted-foreground">Implemented: {policy.implemented}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            policy.status === 'exceeded' ? 'default' :
                            policy.status === 'on-track' ? 'secondary' :
                            policy.status === 'in-progress' ? 'outline' : 'destructive'
                          }>
                            {policy.status}
                          </Badge>
                          <p className="text-sm font-medium mt-1">Budget: {policy.budget}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-2 rounded-lg bg-muted/30">
                          <p className="text-muted-foreground">Target</p>
                          <p className="font-medium">{policy.target}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/30">
                          <p className="text-muted-foreground">Actual</p>
                          <p className="font-medium">{policy.actual}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions" className="space-y-6">
            <Card className="border-none shadow-lg border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Priority Intervention Areas
                </CardTitle>
                <CardDescription>Areas requiring immediate attention and resource allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interventionAreas.map((area, index) => (
                    <motion.div
                      key={area.area}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl ${
                        area.priority === 'critical' ? 'bg-destructive/10 border border-destructive/20' :
                        'bg-warning/10 border border-warning/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`h-5 w-5 ${
                            area.priority === 'critical' ? 'text-destructive' : 'text-warning'
                          }`} />
                          <h4 className="font-semibold">{area.area}</h4>
                        </div>
                        <Badge variant={area.priority === 'critical' ? 'destructive' : 'default'}>
                          {area.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{area.issue}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          <strong>{area.students.toLocaleString()}</strong> students affected
                        </span>
                        <Button size="sm" variant={area.priority === 'critical' ? 'destructive' : 'default'}>
                          Create Intervention Plan
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Resource Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start h-auto py-3">
                      <Users className="h-5 w-5 text-primary mr-3" />
                      <div className="text-left">
                        <span className="font-medium block">Deploy Teachers</span>
                        <span className="text-xs text-muted-foreground">Assign to underserved areas</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-auto py-3">
                      <BookOpen className="h-5 w-5 text-primary mr-3" />
                      <div className="text-left">
                        <span className="font-medium block">Distribute Materials</span>
                        <span className="text-xs text-muted-foreground">Textbooks & supplies</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-auto py-3">
                      <Zap className="h-5 w-5 text-primary mr-3" />
                      <div className="text-left">
                        <span className="font-medium block">Digital Infrastructure</span>
                        <span className="text-xs text-muted-foreground">Connectivity & devices</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Quick Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'National Performance Summary',
                      'Provincial Comparison Report',
                      'Resource Gap Analysis',
                      'ECZ Readiness Assessment',
                      'Teacher Deployment Status',
                    ].map((report) => (
                      <Button key={report} variant="outline" className="w-full justify-between">
                        <span>{report}</span>
                        <Download className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MinistryDashboard;
