import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, GraduationCap, BookOpen, TrendingUp, BarChart3,
  Calendar, Bell, Settings, Download, FileText, Shield, Award,
  Clock, CheckCircle, AlertTriangle, Eye, Edit, PlusCircle,
  Search, Filter, ChevronRight, Mail, Phone, MapPin, Target,
  Brain, Sparkles, PieChart, LineChart, Zap, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MainLayout } from '@/components/Layout/MainLayout';

const SchoolAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const stats = [
    { label: 'Total Students', value: '1,247', icon: GraduationCap, color: 'bg-primary', change: '+48 this term' },
    { label: 'Teaching Staff', value: '52', icon: Users, color: 'bg-accent', change: '3 new hires' },
    { label: 'Avg. Pass Rate', value: '78%', icon: TrendingUp, color: 'bg-success', change: '+5% from last year' },
    { label: 'ECZ Ready', value: '84%', icon: Target, color: 'bg-warning', change: 'Above target' },
  ];

  const departments = [
    { name: 'Sciences', head: 'Mr. Banda', teachers: 12, students: 320, avgScore: 76, trend: '+4%' },
    { name: 'Mathematics', head: 'Mrs. Tembo', teachers: 8, students: 310, avgScore: 72, trend: '+6%' },
    { name: 'Languages', head: 'Mr. Phiri', teachers: 10, students: 315, avgScore: 81, trend: '+2%' },
    { name: 'Social Sciences', head: 'Mrs. Mwanza', teachers: 9, students: 302, avgScore: 79, trend: '+3%' },
    { name: 'Technical', head: 'Mr. Chanda', teachers: 8, students: 180, avgScore: 74, trend: '+5%' },
    { name: 'Arts & PE', head: 'Mrs. Zimba', teachers: 5, students: 120, avgScore: 85, trend: '+1%' },
  ];

  const teachers = [
    { name: 'Mr. Joseph Banda', dept: 'Sciences', subject: 'Physics', classes: 4, students: 156, performance: 82, lessonPlans: 95 },
    { name: 'Mrs. Grace Tembo', dept: 'Mathematics', subject: 'Mathematics', classes: 5, students: 195, performance: 88, lessonPlans: 100 },
    { name: 'Mr. David Phiri', dept: 'Languages', subject: 'English', classes: 4, students: 148, performance: 79, lessonPlans: 88 },
    { name: 'Mrs. Mary Mwanza', dept: 'Social Sciences', subject: 'History', classes: 3, students: 112, performance: 85, lessonPlans: 92 },
  ];

  const gradePerformance = [
    { grade: 'Grade 12', students: 280, avgScore: 74, passRate: 82, ecz: 86 },
    { grade: 'Grade 11', students: 295, avgScore: 76, passRate: 85, ecz: 78 },
    { grade: 'Grade 10', students: 310, avgScore: 78, passRate: 88, ecz: 72 },
    { grade: 'Grade 9', students: 362, avgScore: 77, passRate: 86, ecz: 68 },
  ];

  const recentReports = [
    { title: 'Term 1 Academic Report', type: 'academic', date: '2024-01-15', status: 'completed' },
    { title: 'Teacher Performance Q1', type: 'staff', date: '2024-01-12', status: 'completed' },
    { title: 'ECZ Readiness Analysis', type: 'exam', date: '2024-01-10', status: 'pending' },
    { title: 'Attendance Summary', type: 'attendance', date: '2024-01-08', status: 'completed' },
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
              <div className="bg-primary/10 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Lusaka National High School</h1>
                <p className="text-muted-foreground mt-1">School Administration Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <Badge variant="destructive" className="ml-1">8</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button className="bg-primary">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="h-6 w-6 text-white" />
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
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Department Summary */}
              <Card className="lg:col-span-2 border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Department Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.slice(0, 4).map((dept, index) => (
                      <motion.div
                        key={dept.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{dept.name}</h4>
                            <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-lg font-bold">{dept.teachers}</p>
                            <p className="text-xs text-muted-foreground">Teachers</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold">{dept.students}</p>
                            <p className="text-xs text-muted-foreground">Students</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-primary">{dept.avgScore}%</p>
                            <p className="text-xs text-success">{dept.trend}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { icon: FileText, label: 'Generate Report', desc: 'Academic summary' },
                      { icon: Brain, label: 'AI Analysis', desc: 'Performance insights' },
                      { icon: Mail, label: 'Send Notices', desc: 'Mass communication' },
                      { icon: Calendar, label: 'Schedule Event', desc: 'School calendar' },
                      { icon: UserCheck, label: 'Attendance', desc: 'Daily overview' },
                    ].map((action) => (
                      <Button
                        key={action.label}
                        variant="outline"
                        className="w-full justify-start h-auto py-3"
                      >
                        <action.icon className="h-5 w-5 text-primary mr-3" />
                        <div className="text-left">
                          <span className="font-medium block">{action.label}</span>
                          <span className="text-xs text-muted-foreground">{action.desc}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grade Performance */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Grade-Level Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {gradePerformance.map((grade, index) => (
                    <motion.div
                      key={grade.grade}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-muted/30 text-center"
                    >
                      <h4 className="font-semibold mb-2">{grade.grade}</h4>
                      <p className="text-3xl font-bold text-primary mb-1">{grade.avgScore}%</p>
                      <p className="text-xs text-muted-foreground mb-3">Avg Score</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Students</span>
                          <span className="font-medium">{grade.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pass Rate</span>
                          <span className="font-medium text-success">{grade.passRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ECZ Ready</span>
                          <span className="font-medium text-accent">{grade.ecz}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(d => (
                      <SelectItem key={d.name} value={d.name.toLowerCase()}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <Badge variant="outline">{dept.trend}</Badge>
                      </div>
                      <CardDescription>Head: {dept.head}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="text-lg font-bold text-primary">{dept.teachers}</p>
                          <p className="text-xs text-muted-foreground">Teachers</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="text-lg font-bold text-accent">{dept.students}</p>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="text-lg font-bold text-success">{dept.avgScore}%</p>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search teachers..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button className="bg-primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </div>

            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Teacher</th>
                        <th className="text-left p-4 font-medium">Department</th>
                        <th className="text-left p-4 font-medium">Subject</th>
                        <th className="text-center p-4 font-medium">Classes</th>
                        <th className="text-center p-4 font-medium">Students</th>
                        <th className="text-center p-4 font-medium">Performance</th>
                        <th className="text-center p-4 font-medium">Lesson Plans</th>
                        <th className="text-center p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher, index) => (
                        <motion.tr
                          key={teacher.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-muted/30 hover:bg-muted/20"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {teacher.name.split(' ').slice(1).map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{teacher.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{teacher.dept}</td>
                          <td className="p-4">{teacher.subject}</td>
                          <td className="p-4 text-center">{teacher.classes}</td>
                          <td className="p-4 text-center">{teacher.students}</td>
                          <td className="p-4 text-center">
                            <Badge variant={teacher.performance >= 85 ? 'default' : 'secondary'}>
                              {teacher.performance}%
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            <Progress value={teacher.lessonPlans} className="h-2 w-20 mx-auto" />
                            <span className="text-xs text-muted-foreground">{teacher.lessonPlans}%</span>
                          </td>
                          <td className="p-4 text-center">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Subject Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { subject: 'Mathematics', current: 76, previous: 70, change: '+6%' },
                      { subject: 'English', current: 81, previous: 79, change: '+2%' },
                      { subject: 'Physics', current: 72, previous: 68, change: '+4%' },
                      { subject: 'Biology', current: 78, previous: 75, change: '+3%' },
                      { subject: 'Chemistry', current: 74, previous: 72, change: '+2%' },
                    ].map((subject, index) => (
                      <div key={subject.subject} className="p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{subject.subject}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">{subject.current}%</span>
                            <Badge variant="outline" className="text-success">{subject.change}</Badge>
                          </div>
                        </div>
                        <Progress value={subject.current} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    ECZ Exam Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-primary mb-2">84%</div>
                    <p className="text-muted-foreground">Overall School Readiness</p>
                    <Badge variant="default" className="mt-2">Above National Average</Badge>
                  </div>
                  <div className="space-y-3">
                    {gradePerformance.map((grade) => (
                      <div key={grade.grade} className="flex items-center justify-between">
                        <span>{grade.grade}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={grade.ecz} className="h-2 w-32" />
                          <span className="text-sm font-medium w-12">{grade.ecz}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Generated Reports</h3>
              <Button className="bg-primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { icon: FileText, label: 'Academic Report', desc: 'Term summary' },
                { icon: Users, label: 'Staff Report', desc: 'Performance review' },
                { icon: Target, label: 'ECZ Analysis', desc: 'Exam readiness' },
                { icon: CheckCircle, label: 'Attendance', desc: 'Daily/Weekly' },
              ].map((type) => (
                <Button
                  key={type.label}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <type.icon className="h-8 w-8 text-primary" />
                  <span className="font-medium">{type.label}</span>
                  <span className="text-xs text-muted-foreground">{type.desc}</span>
                </Button>
              ))}
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={report.title} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SchoolAdminDashboard;
