import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseraFeatures from "@/components/Platforms/CourseraFeatures";
import UdemyFeatures from "@/components/Platforms/UdemyFeatures";
import LinkedInLearningFeatures from "@/components/Platforms/LinkedInLearningFeatures";
import KhanAcademyFeatures from "@/components/Platforms/KhanAcademyFeatures";
import FiloFeatures from "@/components/Platforms/FiloFeatures";
import ChatEDUFeatures from "@/components/Platforms/ChatEDUFeatures";

const PlatformFeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Platform Features Hub</h1>
        <p className="text-muted-foreground mb-6">
          All features from 25+ leading e-learning platforms, unified in BrightSphere
        </p>

        <Tabs defaultValue="coursera" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="coursera">Coursera</TabsTrigger>
            <TabsTrigger value="udemy">Udemy</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn Learning</TabsTrigger>
            <TabsTrigger value="khan">Khan Academy</TabsTrigger>
            <TabsTrigger value="filo">Filo</TabsTrigger>
            <TabsTrigger value="chatedu">ChatEDU</TabsTrigger>
          </TabsList>

          <TabsContent value="coursera"><CourseraFeatures /></TabsContent>
          <TabsContent value="udemy"><UdemyFeatures /></TabsContent>
          <TabsContent value="linkedin"><LinkedInLearningFeatures /></TabsContent>
          <TabsContent value="khan"><KhanAcademyFeatures /></TabsContent>
          <TabsContent value="filo"><FiloFeatures /></TabsContent>
          <TabsContent value="chatedu"><ChatEDUFeatures /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlatformFeaturesPage;
