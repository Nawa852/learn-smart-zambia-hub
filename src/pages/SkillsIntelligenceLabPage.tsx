import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Target, TrendingUp, Users, BarChart3, PieChart,
  AlertCircle, CheckCircle2, Clock, Zap, Filter, Download,
  ChevronRight, ArrowUp, ArrowDown, Minus, RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SkillsIntelligenceLabPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const overviewStats = [
    { label: 'Overall Readiness', value: 78, target: 85, status: 'improving' },
    { label: 'Critical Skills Coverage', value: 65, target: 80, status: 'at-risk' },
    { label: 'Learning Velocity', value: 92, target: 90, status: 'on-track' },
    { label: 'Skill Retention', value: 84, target: 85, status: 'stable' },
  ];

  const skillGaps = [
    { skill: 'Advanced Mathematics', gap: 35, priority: 'critical', affected: 156, trend: 'improving' },
    { skill: 'Scientific Analysis', gap: 28, priority: 'high', affected: 98, trend: 'stable' },
    { skill: 'English Writing', gap: 22, priority: 'medium', affected: 134, trend: 'improving' },
    { skill: 'Digital Literacy', gap: 45, priority: 'critical', affected: 245, trend: 'declining' },
    { skill: 'Critical Thinking', gap: 18, priority: 'medium', affected: 87, trend: 'improving' },
  ];

  const departments = [
    { name: 'Grade 12 Science', readiness: 82, members: 156, skills: 24 },
    { name: 'Grade 12 Arts', readiness: 75, members: 98, skills: 18 },
    { name: 'Grade 11 Science', readiness: 68, members: 178, skills: 22 },
    { name: 'Grade 11 Arts', readiness: 71, members: 145, skills: 16 },
  ];

  const predictions = [
    { period: 'Q1 2025', predicted: 82, factors: ['New math curriculum', 'AI tutoring expansion'] },
    { period: 'Q2 2025', predicted: 86, factors: ['Summer intensives', 'Peer learning program'] },
    { period: 'Q3 2025', predicted: 89, factors: ['ECZ exam prep focus', 'Mentorship program'] },
    { period: 'Q4 2025', predicted: 92, factors: ['Full AI integration', 'Skill certification'] },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-500';
      case 'at-risk': return 'text-red-500';
      case 'improving': return 'text-blue-500';
      default: return 'text-yellow-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      default: return 'secondary';
    }
  };

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
              Skills Intelligence Lab
            </h1>
            <p className="text-muted-foreground mt-1">Predictive analytics for workforce readiness</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button>
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <Badge variant="outline" className={getStatusColor(stat.status)}>
                  {stat.status}
                </Badge>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-3xl font-bold">{stat.value}%</p>
                <p className="text-sm text-muted-foreground mb-1">/ {stat.target}% target</p>
              </div>
              <Progress value={stat.value} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Gaps Analysis */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillGaps.map((gap, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{gap.skill}</h3>
                        <Badge variant={getPriorityColor(gap.priority) as any}>
                          {gap.priority}
                        </Badge>
                        {getTrendIcon(gap.trend)}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{gap.gap}%</p>
                        <p className="text-xs text-muted-foreground">gap</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{gap.affected} learners affected</span>
                      <Button variant="ghost" size="sm">
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            gap.priority === 'critical' ? 'bg-red-500' : 
                            gap.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${gap.gap}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Overview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Department Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => setSelectedDepartment(dept.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{dept.name}</p>
                      <Badge variant={dept.readiness >= 80 ? 'default' : 'secondary'}>
                        {dept.readiness}%
                      </Badge>
                    </div>
                    <Progress value={dept.readiness} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{dept.members} members</span>
                      <span>{dept.skills} skills tracked</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Predictive Analytics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Predictive Workforce Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {predictions.map((prediction, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{prediction.period}</p>
                    <p className="text-3xl font-bold text-primary mb-3">{prediction.predicted}%</p>
                    <div className="space-y-1">
                      {prediction.factors.map((factor, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Zap className="w-3 h-3 text-primary" />
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SkillsIntelligenceLabPage;
