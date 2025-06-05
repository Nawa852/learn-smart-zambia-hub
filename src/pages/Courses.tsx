
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Search, Filter, Star, Clock, Users, Play,
  Brain, Sparkles, TrendingUp, Globe, Award
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id(full_name),
          enrollments(count)
        `)
        .eq('is_published', true);
      
      if (error) throw error;
      return data;
    }
  });

  const categories = [
    'all', 'technology', 'mathematics', 'science', 'languages', 
    'business', 'arts', 'history', 'engineering'
  ];

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty = difficulty === 'all' || course.difficulty_level === difficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header with AI-powered search */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <BookOpen className="mr-3 h-10 w-10 text-zambia-copper" />
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover AI-powered courses tailored for Zambian learners
          </p>
          
          {/* AI-Enhanced Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Ask me anything... 'I want to learn Python programming' or 'Courses about Zambian history'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-blue-200 focus:border-blue-500"
            />
            <Badge className="absolute right-3 top-2 bg-gradient-to-r from-purple-500 to-blue-500">
              <Brain className="w-3 h-3 mr-1" />
              AI Search
            </Badge>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* AI Recommendations Section */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Sparkles className="mr-2 h-6 w-6" />
              AI-Powered Recommendations
            </CardTitle>
            <CardDescription className="text-purple-600">
              Courses personalized for your learning style and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <Brain className="h-8 w-8 text-blue-500 mb-2" />
                <h4 className="font-semibold">Adaptive Learning</h4>
                <p className="text-sm text-gray-600">Content adjusts to your pace and style</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                <h4 className="font-semibold">Skill Gap Analysis</h4>
                <p className="text-sm text-gray-600">AI identifies what you need to learn next</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <Globe className="h-8 w-8 text-orange-500 mb-2" />
                <h4 className="font-semibold">Zambian Context</h4>
                <p className="text-sm text-gray-600">Content relevant to local culture and needs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses?.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                {course.thumbnail_url ? (
                  <img 
                    src={course.thumbnail_url} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white" />
                  </div>
                )}
                <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800">
                  {course.difficulty_level}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration_hours}h
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.enrollments?.[0]?.count || 0} enrolled
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      4.8
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      by {course.profiles?.full_name}
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      {course.price > 0 ? `K${course.price}` : 'Free'}
                    </span>
                  </div>
                  
                  <Button className="w-full bg-zambia-copper hover:bg-orange-600">
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses?.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
