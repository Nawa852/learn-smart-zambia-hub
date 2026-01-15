import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, UserPlus, Upload, Download, Shield,
  BarChart3, Clock, CheckCircle2, AlertTriangle, Settings,
  FileText, Mail, Calendar, TrendingUp, Filter, Search,
  RefreshCw, MoreVertical, Eye, Edit, Trash2, Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const EnterpriseOperationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-500' },
    { label: 'Active Enrollments', value: '1,234', change: '+8%', icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Compliance Rate', value: '94%', change: '+2%', icon: Shield, color: 'text-purple-500' },
    { label: 'Pending Actions', value: '23', change: '-5%', icon: AlertTriangle, color: 'text-orange-500' },
  ];

  const users = [
    { id: 1, name: 'John Banda', email: 'john.b@school.zm', role: 'Student', status: 'active', enrollments: 5, lastActive: '2 hours ago' },
    { id: 2, name: 'Mary Tembo', email: 'mary.t@school.zm', role: 'Teacher', status: 'active', enrollments: 3, lastActive: '1 hour ago' },
    { id: 3, name: 'Peter Mwanza', email: 'peter.m@school.zm', role: 'Student', status: 'pending', enrollments: 0, lastActive: 'Never' },
    { id: 4, name: 'Grace Phiri', email: 'grace.p@school.zm', role: 'Admin', status: 'active', enrollments: 8, lastActive: '30 min ago' },
    { id: 5, name: 'David Lungu', email: 'david.l@school.zm', role: 'Student', status: 'inactive', enrollments: 2, lastActive: '1 week ago' },
  ];

  const complianceItems = [
    { name: 'Data Privacy Training', required: 500, completed: 478, dueDate: 'Dec 31, 2024' },
    { name: 'Safety Awareness Course', required: 500, completed: 495, dueDate: 'Jan 15, 2025' },
    { name: 'ECZ Curriculum Alignment', required: 50, completed: 48, dueDate: 'Jan 31, 2025' },
    { name: 'Teacher Certification', required: 75, completed: 72, dueDate: 'Feb 28, 2025' },
  ];

  const automatedEnrollments = [
    { rule: 'New Grade 12 Students → ECZ Prep Course', status: 'active', enrolled: 156 },
    { rule: 'All Teachers → Platform Training', status: 'active', enrolled: 45 },
    { rule: 'Science Students → Lab Safety', status: 'active', enrolled: 89 },
    { rule: 'New Employees → Onboarding', status: 'paused', enrolled: 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Enterprise Operations Center
            </h1>
            <p className="text-muted-foreground mt-1">Manage users, enrollments, and compliance at scale</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" /> Bulk Import
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" /> Add Users
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="enrollments">Auto Enrollments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Users</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search users..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrollments</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.status === 'active' ? 'default' : 
                          user.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.enrollments}</TableCell>
                      <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Automated Enrollment Rules</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedEnrollments.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${rule.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <div>
                        <p className="font-medium">{rule.rule}</p>
                        <p className="text-sm text-muted-foreground">{rule.enrolled} enrolled</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                        {rule.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Due: {item.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.completed}/{item.required}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((item.completed / item.required) * 100)}% complete
                        </p>
                      </div>
                    </div>
                    <Progress value={(item.completed / item.required) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Available Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'User Activity Report',
                    'Course Completion Report',
                    'Compliance Status Report',
                    'Enrollment Summary',
                    'Performance Analytics',
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span>{report}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" /> Export
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Scheduled Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Weekly Summary', schedule: 'Every Monday 8:00 AM', next: 'Tomorrow' },
                    { name: 'Monthly Analytics', schedule: '1st of month', next: 'Jan 1, 2025' },
                    { name: 'Compliance Alert', schedule: 'Daily', next: 'Today 6:00 PM' },
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.schedule}</p>
                      </div>
                      <Badge variant="secondary">Next: {report.next}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseOperationsPage;
