
import { Clock, Users, Star, BookOpen, Code, Palette, Calculator, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CoursesPreview = () => {
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

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Popular <span className="text-zambia-emerald">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most loved courses designed by Zambian educators 
            and enhanced with AI-powered personalization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <course.icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="w-fit mb-2">
                  {course.level}
                </Badge>
                <CardTitle className="text-lg line-clamp-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  By {course.instructor}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <Button size="sm" className="bg-zambia-copper hover:bg-orange-600">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-zambia-emerald text-zambia-emerald hover:bg-emerald-50">
            <BookOpen className="mr-2 h-5 w-5" />
            Browse All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
