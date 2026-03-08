import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, PlayCircle, Clock, Users, Star, Search,
  Brain, TrendingUp, ChevronRight, GraduationCap, PlusCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useTeacherStats } from "@/hooks/useTeacherStats";
import { LogoLoader } from "@/components/UI/LogoLoader";

// Hardcoded catalog for students
const catalogCourses = [
  {
    id: "catalog-1", title: "Advanced Mathematics",
    description: "Master calculus, linear algebra, and advanced mathematical concepts with AI-powered assistance.",
    instructor: "Dr. Sarah Mwansa", lessons: 24, hours: 36, enrolled: 1250, rating: 4.8,
    level: "Advanced", category: "Mathematics",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    features: ["AI Tutor", "Interactive Labs", "Real-time Help"],
  },
  {
    id: "catalog-2", title: "Computer Science Fundamentals",
    description: "Learn programming, algorithms, and data structures with hands-on projects and AI guidance.",
    instructor: "Prof. James Banda", lessons: 32, hours: 48, enrolled: 2100, rating: 4.9,
    level: "Beginner", category: "Technology",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    features: ["Code Reviews", "AI Debugging", "Project Portfolio"],
  },
  {
    id: "catalog-3", title: "Zambian History & Culture",
    description: "Explore Zambia's rich heritage, from ancient kingdoms to modern independence.",
    instructor: "Dr. Mary Phiri", lessons: 16, hours: 20, enrolled: 890, rating: 4.7,
    level: "Intermediate", category: "History",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    features: ["Virtual Tours", "Cultural Immersion", "Local Experts"],
  },
  {
    id: "catalog-4", title: "Physics with AI Lab",
    description: "Interactive physics learning with virtual experiments and AI-powered problem solving.",
    instructor: "Dr. Peter Tembo", lessons: 28, hours: 42, enrolled: 1450, rating: 4.6,
    level: "Intermediate", category: "Science",
    image: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?auto=format&fit=crop&w=600&q=80",
    features: ["Virtual Labs", "3D Simulations", "AI Problem Solver"],
  },
  {
    id: "catalog-5", title: "Business & Entrepreneurship",
    description: "Learn to start and grow businesses in the Zambian market with modern strategies.",
    instructor: "Mrs. Grace Mukwasa", lessons: 20, hours: 30, enrolled: 750, rating: 4.5,
    level: "Beginner", category: "Business",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    features: ["Case Studies", "Market Analysis", "Mentor Network"],
  },
  {
    id: "catalog-6", title: "English Literature & Writing",
    description: "Develop critical thinking and writing skills through classic and contemporary literature.",
    instructor: "Prof. David Chilufya", lessons: 18, hours: 24, enrolled: 980, rating: 4.8,
    level: "Intermediate", category: "Language",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
    features: ["Writing Workshop", "AI Grammar Check", "Peer Reviews"],
  },
];

// ─── Teacher Courses View ───────────────────────────
function TeacherCoursesView() {
  const { courses, totalStudents, loading } = useTeacherStats();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <LogoLoader size="lg" text="Loading your courses..." />;

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground">{courses.length} course{courses.length !== 1 ? 's' : ''} • {totalStudents} student{totalStudents !== 1 ? 's' : ''} enrolled</p>
          </div>
          <Button asChild>
            <Link to="/create-course"><PlusCircle className="w-4 h-4 mr-2" />Create Course</Link>
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search your courses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <BookOpen className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{courses.length === 0 ? 'No courses yet' : 'No matches'}</h3>
              <p className="text-muted-foreground mb-4">{courses.length === 0 ? 'Create your first course to get started.' : 'Try a different search term.'}</p>
              {courses.length === 0 && <Button asChild><Link to="/create-course">Create Course</Link></Button>}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <Card key={course.id} className="hover:shadow-lg transition-all group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={course.is_published ? 'default' : 'secondary'}>
                      {course.is_published ? 'Published' : 'Draft'}
                    </Badge>
                    {course.subject && <Badge variant="outline">{course.subject}</Badge>}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  <CardDescription>{course.grade_level || 'All grades'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-medium">{course.enrollment_count}</span>
                      <span className="text-muted-foreground">students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-foreground font-medium">{course.avg_score != null ? `${course.avg_score}%` : 'N/A'}</span>
                      <span className="text-muted-foreground">avg</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild className="flex-1">
                      <Link to={`/course/${course.id}`}>View</Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <Link to={`/course/${course.id}/assignments`}>Assignments</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Student Catalog View ───────────────────────────
function StudentCoursesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["All", "Mathematics", "Technology", "Science", "History", "Business", "Language"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = catalogCourses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "All" || c.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learning Courses</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Discover world-class education powered by AI tutoring and interactive learning</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search courses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-4 py-2 border rounded-md bg-background text-foreground">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <Card key={course.id} className="group hover:shadow-xl transition-all overflow-hidden">
              <div className="relative">
                <img src={course.image} alt={course.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <Badge className="absolute top-4 right-4 bg-background/90 text-foreground">{course.level}</Badge>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{course.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-foreground">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4 mr-1" /><span>{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-primary" />{course.lessons} lessons</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-green-600" />{course.hours}h</span>
                  </div>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4 text-purple-600" />{course.enrolled.toLocaleString()}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {course.features.map((f, i) => <Badge key={i} variant="outline" className="text-xs">{f}</Badge>)}
                </div>
                <Button asChild className="w-full">
                  <Link to="/course-catalog">Browse Catalog</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-2xl">
          <CardContent className="p-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need Help with Your Studies?</h3>
              <p className="opacity-90 mb-4">Get instant AI tutoring support for any course or topic</p>
              <div className="flex gap-4">
                <Button asChild variant="secondary"><Link to="/multi-ai-tutor"><Brain className="mr-2 h-4 w-4" />AI Tutor</Link></Button>
                <Button asChild variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/smart-recommendations"><ChevronRight className="mr-2 h-4 w-4" />Recommendations</Link>
                </Button>
              </div>
            </div>
            <Brain className="w-24 h-24 opacity-20 hidden md:block" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Courses() {
  const { profile, loading } = useProfile();

  if (loading) return <div className="flex items-center justify-center py-20"><LogoLoader size="lg" text="Loading..." /></div>;

  if (profile?.role === 'teacher') return <TeacherCoursesView />;
  return <StudentCoursesView />;
}
