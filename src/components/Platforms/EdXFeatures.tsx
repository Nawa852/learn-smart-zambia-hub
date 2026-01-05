import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrightSphereLogo from '@/assets/brightsphere-logo.svg';
import {
  GraduationCap, Award, Building2, Globe, BookOpen, Users,
  Clock, Star, CheckCircle, Trophy, FileText, Play, BarChart3
} from 'lucide-react';

const EdXFeatures = () => {
  const [activeTab, setActiveTab] = useState('programs');

  const microMasterPrograms = [
    { id: 1, title: 'Data Science', university: 'MIT', courses: 5, duration: '1 year', enrolled: 125000, verified: true },
    { id: 2, title: 'Artificial Intelligence', university: 'Columbia', courses: 4, duration: '8 months', enrolled: 98000, verified: true },
    { id: 3, title: 'Supply Chain Management', university: 'MIT', courses: 5, duration: '1 year', enrolled: 76000, verified: true },
    { id: 4, title: 'Cybersecurity', university: 'RIT', courses: 4, duration: '10 months', enrolled: 54000, verified: true },
  ];

  const professionalCerts = [
    { id: 1, title: 'Google IT Support', provider: 'Google', duration: '6 months', skills: ['IT Support', 'Networking', 'Security'] },
    { id: 2, title: 'IBM Data Science', provider: 'IBM', duration: '5 months', skills: ['Python', 'SQL', 'Machine Learning'] },
    { id: 3, title: 'AWS Cloud Practitioner', provider: 'Amazon', duration: '3 months', skills: ['Cloud', 'AWS', 'DevOps'] },
  ];

  const universityPartners = [
    { name: 'Harvard', courses: 150, logo: '🏛️' },
    { name: 'MIT', courses: 180, logo: '⚙️' },
    { name: 'Berkeley', courses: 120, logo: '🐻' },
    { name: 'Oxford', courses: 90, logo: '🎓' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">edX-Style Academic Platform</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-4 h-4" />
              <span>Powered by BrightSphere AI</span>
            </div>
          </div>
        </div>
        <Badge className="bg-red-600">University Partner Network</Badge>
      </div>

      {/* University Partners */}
      <div className="grid grid-cols-4 gap-4">
        {universityPartners.map((uni) => (
          <Card key={uni.name} className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-4xl mb-2">{uni.logo}</div>
              <h3 className="font-semibold">{uni.name}</h3>
              <p className="text-sm text-muted-foreground">{uni.courses} courses</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="programs">MicroMasters</TabsTrigger>
          <TabsTrigger value="certificates">Prof. Certificates</TabsTrigger>
          <TabsTrigger value="degrees">Online Degrees</TabsTrigger>
          <TabsTrigger value="analytics">Admin Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-red-600" />
              MicroMasters Programs
            </h2>
            <Button variant="outline">View All Programs</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {microMasterPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-red-600">{program.university}</span>
                    </div>
                    {program.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">MicroMasters in {program.title}</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{program.courses} courses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{(program.enrolled / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Audit Free</Button>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">Get Certificate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6 mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-red-600" />
            Professional Certificates
          </h2>
          <div className="grid gap-4">
            {professionalCerts.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-900/10 rounded-lg flex items-center justify-center">
                    <Award className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">by {cert.provider} • {cert.duration}</p>
                    <div className="flex gap-2 mt-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Global Access Feature */}
          <Card className="bg-gradient-to-r from-red-600/10 to-red-500/10 border-red-500/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Global Access</h3>
                <p className="text-sm text-muted-foreground">Audit courses for free, upgrade anytime for verified certificates</p>
              </div>
              <Button variant="outline" className="border-red-600 text-red-600">Learn More</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="degrees" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-red-600" />
                Online Degrees from Top Universities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Earn accredited Bachelor's and Master's degrees 100% online from world-renowned universities.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-red-600">50+</div>
                  <div className="text-sm text-muted-foreground">Degree Programs</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-red-600">200+</div>
                  <div className="text-sm text-muted-foreground">Universities</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-red-600">45M+</div>
                  <div className="text-sm text-muted-foreground">Learners</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-red-600">4,000+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">Explore Degree Programs</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-600" />
                Admin Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Track learner progress, completion rates, and program effectiveness.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">Average Completion</div>
                  <div className="text-2xl font-bold text-red-600">78%</div>
                  <Progress value={78} className="mt-2" />
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">Certificate Earned</div>
                  <div className="text-2xl font-bold text-red-600">1,250</div>
                  <Progress value={62} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EdXFeatures;
