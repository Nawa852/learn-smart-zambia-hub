import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Play, CheckCircle, Lock, Clock, BookOpen } from 'lucide-react';

const LessonsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const lessons = [
    { id: 1, title: 'Introduction to Algebra', subject: 'Mathematics', duration: '45 min', progress: 100, status: 'completed', grade: 'Grade 9' },
    { id: 2, title: 'Quadratic Equations', subject: 'Mathematics', duration: '60 min', progress: 75, status: 'in-progress', grade: 'Grade 10' },
    { id: 3, title: 'Cell Biology', subject: 'Biology', duration: '50 min', progress: 0, status: 'locked', grade: 'Grade 11' },
    { id: 4, title: 'Newton\'s Laws of Motion', subject: 'Physics', duration: '55 min', progress: 100, status: 'completed', grade: 'Grade 12' },
    { id: 5, title: 'Chemical Bonding', subject: 'Chemistry', duration: '40 min', progress: 30, status: 'in-progress', grade: 'Grade 11' },
    { id: 6, title: 'Essay Writing Skills', subject: 'English', duration: '35 min', progress: 0, status: 'available', grade: 'Grade 9' },
  ];

  const subjects = ['all', ...new Set(lessons.map(l => l.subject))];

  const filteredLessons = selectedSubject === 'all' 
    ? lessons 
    : lessons.filter(l => l.subject === selectedSubject);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Play className="h-5 w-5 text-blue-500" />;
      case 'locked': return <Lock className="h-5 w-5 text-muted-foreground" />;
      default: return <BookOpen className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            My Lessons
          </h1>
          <p className="text-muted-foreground">ECZ-aligned curriculum lessons</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {subjects.map(subject => (
          <Button
            key={subject}
            variant={selectedSubject === subject ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSubject(subject)}
          >
            {subject === 'all' ? 'All Subjects' : subject}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.map(lesson => (
          <Card key={lesson.id} className={lesson.status === 'locked' ? 'opacity-60' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(lesson.status)}
                  <Badge variant="secondary">{lesson.subject}</Badge>
                </div>
                <Badge variant="outline">{lesson.grade}</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{lesson.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {lesson.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{lesson.progress}%</span>
                </div>
                <Progress value={lesson.progress} />
                <Button 
                  className="w-full mt-2" 
                  disabled={lesson.status === 'locked'}
                  variant={lesson.status === 'completed' ? 'outline' : 'default'}
                >
                  {lesson.status === 'completed' ? 'Review' : lesson.status === 'in-progress' ? 'Continue' : 'Start Lesson'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
