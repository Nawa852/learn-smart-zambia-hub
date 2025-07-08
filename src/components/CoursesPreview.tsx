
import { Clock, Users, Star, BookOpen, Code, Palette, Calculator, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const CoursesPreview = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Learn the fundamentals of programming and computational thinking",
      instructor: "Dr. Mwansa Mukuka",
      duration: "8 weeks",
      students: 1240,
      rating: 4.8,
      level: "Beginner",
      icon: Code,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Digital Art & Design",
      description: "Master digital creativity with modern design tools and techniques",
      instructor: "Joyce Chipango",
      duration: "6 weeks",
      students: 892,
      rating: 4.9,
      level: "Intermediate",
      icon: Palette,
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Mathematics for Everyone",
      description: "Build strong mathematical foundations with interactive lessons",
      instructor: "Prof. James Banda",
      duration: "10 weeks",
      students: 2156,
      rating: 4.7,
      level: "Beginner",
      icon: Calculator,
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "English Language Mastery",
      description: "Improve your English skills for academic and professional success",
      instructor: "Sarah Mwanawasa",
      duration: "12 weeks",
      students: 3420,
      rating: 4.8,
      level: "All Levels",
      icon: Globe,
      color: "bg-orange-500"
    }
  ];

  const handleEnrollClick = () => {
    navigate('/courses');
  };

  const handleBrowseAllClick = () => {
    navigate('/courses');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-primary/5 to-accent/5"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 gradient-emerald opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 gradient-copper opacity-15 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="container px-8 mx-auto relative z-10">
        <div className="text-center mb-20 animate-entrance">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-premium rounded-full mb-8">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Featured Learning Paths</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-hero leading-tight">
            Transform Your Future
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover premium courses crafted by Zambian educators and enhanced with cutting-edge AI technology for personalized learning experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="group relative overflow-hidden glass-card hover:glass-premium transition-all duration-500 cursor-pointer border-0 rounded-3xl animate-magnetic animate-entrance"
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={handleEnrollClick}
            >
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 gradient-card opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <CardHeader className="pb-4 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 gradient-card rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 gradient-card rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                    <course.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge className="glass-premium text-xs font-semibold px-3 py-1 rounded-full">
                    {course.level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-foreground">{course.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300 leading-tight">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-emerald rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Prof. {course.instructor.split(' ')[1]}</p>
                    <p className="text-xs text-muted-foreground">Course Instructor</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 glass-premium rounded-2xl">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full gradient-card text-white font-semibold py-3 rounded-2xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnrollClick();
                  }}
                >
                  <span className="relative z-10">Start Learning</span>
                  <div className="absolute inset-0 gradient-sunset opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-entrance" style={{ animationDelay: '0.8s' }}>
          <Button 
            size="lg" 
            className="group relative px-10 py-4 glass-card hover:glass-premium transition-all duration-300 rounded-2xl animate-magnetic overflow-hidden"
            onClick={handleBrowseAllClick}
          >
            <span className="relative z-10 flex items-center gap-3 font-semibold text-lg">
              <BookOpen className="h-6 w-6" />
              Explore All Courses
            </span>
            <div className="absolute inset-0 gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
