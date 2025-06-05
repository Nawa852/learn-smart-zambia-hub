
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Upload, Play, Users, BookOpen, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Python Programming',
      description: 'Learn the fundamentals of Python programming language',
      instructor: 'Dr. John Mwila',
      enrollments: 245,
      status: 'published',
      category: 'Technology',
      duration: '8 weeks',
      lessons: 24,
      price: 150
    },
    {
      id: 2,
      title: 'Zambian History and Culture',
      description: 'Explore the rich history and cultural heritage of Zambia',
      instructor: 'Prof. Mary Banda',
      enrollments: 189,
      status: 'published',
      category: 'History',
      duration: '6 weeks',
      lessons: 18,
      price: 0
    },
    {
      id: 3,
      title: 'Business Mathematics',
      description: 'Mathematical concepts for business applications',
      instructor: 'Mr. David Phiri',
      enrollments: 67,
      status: 'draft',
      category: 'Mathematics',
      duration: '10 weeks',
      lessons: 30,
      price: 200
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    price: 0
  });

  const { toast } = useToast();

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const course = {
      id: courses.length + 1,
      ...newCourse,
      instructor: 'Current User',
      enrollments: 0,
      status: 'draft',
      lessons: 0
    };

    setCourses([...courses, course]);
    setNewCourse({ title: '', description: '', category: '', duration: '', price: 0 });
    
    toast({
      title: "Course Created",
      description: "Your new course has been created successfully",
    });
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    toast({
      title: "Course Deleted",
      description: "The course has been removed from the system",
    });
  };

  const handlePublishCourse = (id: number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: 'published' } : course
    ));
    toast({
      title: "Course Published",
      description: "Your course is now live and available to students",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-gray-600">Create, edit, and manage your courses</p>
        </div>
        <Button onClick={() => {}} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Import from YouTube
        </Button>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="create">Create New Course</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {course.title}
                        <Badge 
                          variant={course.status === 'published' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {course.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-blue-500" />
                      {course.enrollments} students
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4 text-green-500" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4 text-purple-500" />
                      {course.category}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">💰</span>
                      {course.price === 0 ? 'Free' : `K${course.price}`}
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    {course.status === 'draft' && (
                      <Button 
                        size="sm" 
                        onClick={() => handlePublishCourse(course.id)}
                      >
                        Publish Course
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Manage Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Course</CardTitle>
              <CardDescription>
                Set up a new course with AI-powered content suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course Title</label>
                  <Input
                    placeholder="Enter course title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    placeholder="e.g., Technology, Mathematics"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe what students will learn in this course"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    placeholder="e.g., 8 weeks, 20 hours"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (Kwacha)</label>
                  <Input
                    type="number"
                    placeholder="0 for free course"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleCreateCourse}>
                  Create Course
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import from Template
                </Button>
                <Button variant="outline">
                  AI Content Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">501</div>
                <p className="text-sm text-gray-600">Across all courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">K 15,750</div>
                <p className="text-sm text-gray-600">+23% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">87%</div>
                <p className="text-sm text-gray-600">Above average</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;
