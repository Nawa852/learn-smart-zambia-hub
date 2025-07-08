
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
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Popular Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Discover our most loved courses designed by Zambian educators 
            and enhanced with AI-powered personalization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border-0 bg-white/80 backdrop-blur-sm animate-fade-in hover:bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={handleEnrollClick}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-xl ${course.color} flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 shadow-lg animate-glow`}>
                  <course.icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="w-fit mb-2 bg-primary/10 text-primary border-primary/20">
                  {course.level}
                </Badge>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-gray-600">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 font-medium">
                  By {course.instructor}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center hover:text-primary transition-colors duration-200">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center hover:text-primary transition-colors duration-200">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1 animate-pulse" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnrollClick();
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl hover:scale-105 shadow-lg"
            onClick={handleBrowseAllClick}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Browse All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
