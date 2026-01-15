import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Shield, Star, Download, Share2, ExternalLink,
  CheckCircle2, Clock, TrendingUp, BookOpen, Code, Palette,
  Brain, Users, Globe, Verified, Lock, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SkillPassportPage = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certificates = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      issuer: 'ECZ Certified',
      date: 'Dec 2024',
      verified: true,
      blockchain: true,
      grade: 'A+',
      skills: ['Algebra', 'Calculus', 'Statistics'],
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Science Excellence',
      issuer: 'BrightSphere Academy',
      date: 'Nov 2024',
      verified: true,
      blockchain: true,
      grade: 'A',
      skills: ['Physics', 'Chemistry', 'Biology'],
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'English Proficiency',
      issuer: 'Cambridge Assessment',
      date: 'Oct 2024',
      verified: true,
      blockchain: false,
      grade: 'B+',
      skills: ['Writing', 'Reading', 'Speaking'],
      image: '/placeholder.svg'
    },
  ];

  const microCredentials = [
    { name: 'Problem Solving', level: 'Expert', progress: 95, verified: true },
    { name: 'Critical Thinking', level: 'Advanced', progress: 82, verified: true },
    { name: 'Data Analysis', level: 'Intermediate', progress: 68, verified: true },
    { name: 'Communication', level: 'Expert', progress: 90, verified: true },
    { name: 'Leadership', level: 'Intermediate', progress: 55, verified: false },
    { name: 'Creativity', level: 'Advanced', progress: 78, verified: true },
  ];

  const projects = [
    {
      id: 1,
      title: 'Solar Energy Calculator',
      description: 'Built an interactive tool to calculate solar panel efficiency',
      skills: ['Physics', 'Mathematics', 'Programming'],
      verified: true,
      rating: 4.8,
      views: 1250,
      date: 'Nov 2024'
    },
    {
      id: 2,
      title: 'Water Quality Analysis',
      description: 'Research project analyzing local water sources',
      skills: ['Chemistry', 'Data Analysis', 'Research'],
      verified: true,
      rating: 4.6,
      views: 890,
      date: 'Oct 2024'
    },
    {
      id: 3,
      title: 'Community Garden App',
      description: 'Mobile app for managing community gardening schedules',
      skills: ['Programming', 'Design', 'Biology'],
      verified: false,
      rating: 4.9,
      views: 2100,
      date: 'Sep 2024'
    },
  ];

  const skillCategories = [
    { name: 'STEM', icon: Brain, score: 92, color: 'text-blue-500' },
    { name: 'Languages', icon: Globe, score: 85, color: 'text-green-500' },
    { name: 'Arts', icon: Palette, score: 78, color: 'text-purple-500' },
    { name: 'Technology', icon: Code, score: 88, color: 'text-orange-500' },
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
              Skill Passport & Portfolio
            </h1>
            <p className="text-muted-foreground mt-1">Your verified achievements and credentials</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
            <Button>
              <Share2 className="w-4 h-4 mr-2" /> Share Portfolio
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Profile Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">JS</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">John Student</h2>
                  <Badge variant="default" className="gap-1">
                    <Verified className="w-3 h-3" /> Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground">Grade 12 • Lusaka, Zambia</p>
                <div className="flex gap-4 mt-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Certificates</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-muted-foreground">Micro-credentials</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">4.7</p>
                    <p className="text-xs text-muted-foreground">Overall Rating</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Blockchain Verified</span>
                </div>
                <p className="text-xs text-muted-foreground">ID: 0x7f3a...8b2c</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {skillCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <category.icon className={`w-8 h-8 mx-auto mb-2 ${category.color}`} />
              <p className="font-medium">{category.name}</p>
              <p className={`text-2xl font-bold ${category.color}`}>{category.score}%</p>
              <Progress value={category.score} className="h-1 mt-2" />
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="credentials">Micro-Credentials</TabsTrigger>
          <TabsTrigger value="projects">AI-Verified Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Award className="w-16 h-16 text-primary/50 group-hover:scale-110 transition-transform" />
                      {cert.blockchain && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="gap-1">
                            <Shield className="w-3 h-3" /> Blockchain
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <Badge variant="outline">{cert.grade}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{cert.date}</span>
                        {cert.verified && (
                          <>
                            <Verified className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">Verified</span>
                          </>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <ExternalLink className="w-3 h-3 mr-1" /> View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-3 h-3 mr-1" /> Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="credentials">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {microCredentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Star className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{cred.name}</h3>
                          <p className="text-sm text-muted-foreground">{cred.level}</p>
                        </div>
                      </div>
                      {cred.verified ? (
                        <Verified className="w-5 h-5 text-green-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{cred.progress}%</span>
                      </div>
                      <Progress value={cred.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          {project.verified && (
                            <Badge variant="default" className="gap-1">
                              <Verified className="w-3 h-3" /> AI Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{project.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{project.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{project.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" /> View Details
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" /> Open Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillPassportPage;
