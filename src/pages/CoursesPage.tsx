
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, Users } from 'lucide-react';

const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: "Grade 12 Mathematics - ECZ",
      description: "Comprehensive mathematics course for ECZ Grade 12",
      duration: "6 months",
      students: 1250,
      rating: 4.8,
      curriculum: "ECZ"
    },
    {
      id: 2,
      title: "Cambridge IGCSE Biology",
      description: "Complete biology course for Cambridge IGCSE",
      duration: "8 months",
      students: 890,
      rating: 4.9,
      curriculum: "Cambridge"
    },
    {
      id: 3,
      title: "English Literature - Grade 11",
      description: "English literature for Zambian Grade 11 students",
      duration: "4 months",
      students: 567,
      rating: 4.7,
      curriculum: "ECZ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured learning paths aligned with Zambian curricula
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {course.curriculum}
                  </span>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{course.students}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
