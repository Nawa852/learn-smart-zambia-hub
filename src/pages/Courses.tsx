
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Users, 
  Star, 
  Search,
  Filter,
  Brain,
  TrendingUp,
  Award,
  ChevronRight,
  GraduationCap,
  Video,
  FileText,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Master calculus, linear algebra, and advanced mathematical concepts with AI-powered assistance.",
    instructor: "Dr. Sarah Mwansa",
    lessons: 24,
    hours: 36,
    enrolled: 1250,
    rating: 4.8,
    level: "Advanced",
    category: "Mathematics",
    progress: 65,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    features: ["AI Tutor", "Interactive Labs", "Real-time Help"],
    nextLesson: "Vector Calculus",
    isEnrolled: true
  },
  {
    id: 2,
    title: "Computer Science Fundamentals",
    description: "Learn programming, algorithms, and data structures with hands-on projects and AI guidance.",
    instructor: "Prof. James Banda",
    lessons: 32,
    hours: 48,
    enrolled: 2100,
    rating: 4.9,
    level: "Beginner",
    category: "Technology",
    progress: 0,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    features: ["Code Reviews", "AI Debugging", "Project Portfolio"],
    nextLesson: "Introduction to Programming",
    isEnrolled: false
  },
  {
    id: 3,
    title: "Zambian History & Culture",
    description: "Explore Zambia's rich heritage, from ancient kingdoms to modern independence.",
    instructor: "Dr. Mary Phiri",
    lessons: 16,
    hours: 20,
    enrolled: 890,
    rating: 4.7,
    level: "Intermediate",
    category: "History",
    progress: 45,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    features: ["Virtual Tours", "Cultural Immersion", "Local Experts"],
    nextLesson: "The Kingdom of Barotseland",
    isEnrolled: true
  },
  {
    id: 4,
    title: "Physics with AI Lab",
    description: "Interactive physics learning with virtual experiments and AI-powered problem solving.",
    instructor: "Dr. Peter Tembo",
    lessons: 28,
    hours: 42,
    enrolled: 1450,
    rating: 4.6,
    level: "Intermediate",
    category: "Science",
    progress: 20,
    image: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?auto=format&fit=crop&w=600&q=80",
    features: ["Virtual Labs", "3D Simulations", "AI Problem Solver"],
    nextLesson: "Quantum Mechanics Basics",
    isEnrolled: true
  },
  {
    id: 5,
    title: "Business & Entrepreneurship",
    description: "Learn to start and grow businesses in the Zambian market with modern strategies.",
    instructor: "Mrs. Grace Mukwasa",
    lessons: 20,
    hours: 30,
    enrolled: 750,
    rating: 4.5,
    level: "Beginner",
    category: "Business",
    progress: 0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    features: ["Case Studies", "Market Analysis", "Mentor Network"],
    nextLesson: "Business Plan Fundamentals",
    isEnrolled: false
  },
  {
    id: 6,
    title: "English Literature & Writing",
    description: "Develop critical thinking and writing skills through classic and contemporary literature.",
    instructor: "Prof. David Chilufya",
    lessons: 18,
    hours: 24,
    enrolled: 980,
    rating: 4.8,
    level: "Intermediate",
    category: "Language",
    progress: 80,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
    features: ["Writing Workshop", "AI Grammar Check", "Peer Reviews"],
    nextLesson: "Contemporary African Literature",
    isEnrolled: true
  }
];

const categories = ["All", "Mathematics", "Technology", "Science", "History", "Business", "Language"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "enrolled" && course.isEnrolled) ||
                      (activeTab === "available" && !course.isEnrolled);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  const enrolledCourses = courses.filter(course => course.isEnrolled);
  const avgProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Learning Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover world-class education powered by AI tutoring and interactive learning
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              <p className="text-sm text-gray-600">Total Courses</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{Math.round(avgProgress)}%</p>
              <p className="text-sm text-gray-600">Avg Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-600">AI Support</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Course Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${course.isEnrolled ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                        {course.isEnrolled ? 'Enrolled' : 'Available'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 text-gray-700">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{course.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      <span>{course.instructor}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1 text-blue-500" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-green-500" />
                          <span>{course.hours}h</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-purple-500" />
                        <span>{course.enrolled.toLocaleString()}</span>
                      </div>
                    </div>

                    {course.isEnrolled && course.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {course.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      {course.isEnrolled ? (
                        <Button asChild className="flex-1 bg-gradient-to-r from-green-500 to-teal-600">
                          <Link to={`/courses/${course.id}/lessons`}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continue Learning
                          </Link>
                        </Button>
                      ) : (
                        <Button asChild className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                          <Link to={`/courses/${course.id}`}>
                            Enroll Now
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/courses/${course.id}/preview`}>
                          Preview
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card className="text-center py-12 bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent>
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or explore our featured courses.</p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Access to AI Features */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Help with Your Studies?</h3>
                <p className="text-purple-100 mb-4">Get instant AI tutoring support for any course or topic</p>
                <div className="flex space-x-4">
                  <Button asChild variant="secondary">
                    <Link to="/multi-ai-tutor">
                      <Brain className="mr-2 h-4 w-4" />
                      AI Tutor Chat
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                    <Link to="/smart-recommendations">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Smart Recommendations
                    </Link>
                  </Button>
                </div>
              </div>
              <Brain className="w-24 h-24 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
