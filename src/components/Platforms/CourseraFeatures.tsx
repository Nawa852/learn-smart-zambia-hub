import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, Globe2, BookOpen, Award, Building2, 
  Users, TrendingUp, Download, Play, Star, Clock, CheckCircle2
} from "lucide-react";
import BrightSphereLogo from "@/assets/brightsphere-logo.svg";

const CourseraFeatures = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Spanish', 'French', 'Chinese', 'Arabic', 'Portuguese', 'German'];

  const specializations = [
    {
      title: "Data Science Specialization",
      partner: "Johns Hopkins University",
      courses: 10,
      hours: 200,
      enrolled: "1.2M",
      rating: 4.8,
      progress: 35
    },
    {
      title: "Machine Learning",
      partner: "Stanford University",
      courses: 5,
      hours: 120,
      enrolled: "4.5M",
      rating: 4.9,
      progress: 60
    },
    {
      title: "Google IT Support",
      partner: "Google",
      courses: 5,
      hours: 100,
      enrolled: "2.1M",
      rating: 4.7,
      progress: 0
    }
  ];

  const degrees = [
    { name: "Master of Computer Science", university: "University of Illinois", duration: "2-3 years" },
    { name: "MBA", university: "Imperial College London", duration: "2 years" },
    { name: "Master of Data Science", university: "University of Michigan", duration: "1-3 years" }
  ];

  const enterpriseFeatures = [
    { icon: Users, title: "Team Learning", desc: "Train teams at scale" },
    { icon: TrendingUp, title: "Analytics Dashboard", desc: "Track progress & ROI" },
    { icon: Building2, title: "Custom Content", desc: "Tailored learning paths" },
    { icon: Award, title: "Certificates", desc: "Professional credentials" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
        <div>
          <h2 className="text-2xl font-bold">Coursera-Style Features</h2>
          <p className="text-muted-foreground">University partnerships, specializations & degrees</p>
        </div>
      </div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="catalog">Course Catalog</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="degrees">Degrees</TabsTrigger>
          <TabsTrigger value="business">For Business</TabsTrigger>
        </TabsList>

        {/* Course Catalog */}
        <TabsContent value="catalog" className="space-y-6">
          {/* Multi-lingual Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-primary" />
                Multi-lingual Course Library
              </CardTitle>
              <CardDescription>Learn in your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {languages.map(lang => (
                  <Badge 
                    key={lang}
                    variant={selectedLanguage === lang ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Currently viewing courses in: <strong>{selectedLanguage}</strong>
              </p>
            </CardContent>
          </Card>

          {/* Mobile & Offline */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Offline Access</h3>
                    <p className="text-sm text-muted-foreground">Download courses for learning anywhere</p>
                  </div>
                </div>
                <Button className="mt-4 w-full">Download App</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/50 to-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Play className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mobile Learning</h3>
                    <p className="text-sm text-muted-foreground">iOS & Android apps available</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">Get Mobile App</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Specializations */}
        <TabsContent value="specializations" className="space-y-4">
          {specializations.map((spec, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">{spec.partner}</Badge>
                    <h3 className="text-lg font-semibold">{spec.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {spec.courses} courses
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {spec.hours} hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {spec.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {spec.enrolled} enrolled
                      </span>
                    </div>
                    {spec.progress > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{spec.progress}%</span>
                        </div>
                        <Progress value={spec.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                  <Button variant={spec.progress > 0 ? "default" : "outline"}>
                    {spec.progress > 0 ? "Continue" : "Enroll"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Degrees */}
        <TabsContent value="degrees" className="space-y-4">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                Online Degrees
              </CardTitle>
              <CardDescription>
                Earn accredited degrees from top universities
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            {degrees.map((degree, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <GraduationCap className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold">{degree.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{degree.university}</p>
                  <Badge variant="outline" className="mt-3">{degree.duration}</Badge>
                  <Button className="w-full mt-4" variant="outline">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Business */}
        <TabsContent value="business" className="space-y-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Building2 className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold">BrightSphere for Business</h3>
                  <p className="opacity-90">Train your teams with world-class content</p>
                </div>
              </div>
              <Button variant="secondary" className="mt-4">
                Request Demo
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-4 gap-4">
            {enterpriseFeatures.map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6 text-center">
                  <feature.icon className="w-8 h-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Generative AI Academy */}
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <Badge className="w-fit mb-2">New</Badge>
              <CardTitle className="flex items-center gap-2">
                <img src={BrightSphereLogo} alt="AI" className="w-6 h-6" />
                Generative AI Academy
              </CardTitle>
              <CardDescription>
                Specialized training on AI and ethical usage for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">AI Fundamentals</Badge>
                <Badge variant="outline">Prompt Engineering</Badge>
                <Badge variant="outline">AI Ethics</Badge>
                <Badge variant="outline">Implementation</Badge>
              </div>
              <Button className="mt-4">Explore AI Training</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseraFeatures;
