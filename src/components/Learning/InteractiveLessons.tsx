
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Eye, 
  Mic, 
  CheckCircle, 
  Clock,
  BookOpen,
  Target,
  Brain,
  Lightbulb,
  Globe,
  Award
} from 'lucide-react';

interface LessonContent {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  progress: number;
  type: 'video' | 'interactive' | 'quiz' | 'simulation';
  content: any;
  isCompleted: boolean;
}

const InteractiveLessons = () => {
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedGrade, setSelectedGrade] = useState('9');

  const lessons: LessonContent[] = [
    {
      id: '1',
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      grade: '9',
      duration: 45,
      progress: 75,
      type: 'interactive',
      content: {
        sections: [
          'Introduction to Quadratic Equations',
          'Standard Form: ax² + bx + c = 0',
          'Solving by Factoring',
          'Using the Quadratic Formula',
          'Practice Problems'
        ]
      },
      isCompleted: false
    },
    {
      id: '2',
      title: 'Photosynthesis Process',
      subject: 'Biology',
      grade: '10',
      duration: 35,
      progress: 100,
      type: 'simulation',
      content: {
        sections: [
          'Light Reactions',
          'Calvin Cycle',
          'Factors Affecting Photosynthesis',
          'Virtual Lab Simulation'
        ]
      },
      isCompleted: true
    },
    {
      id: '3',
      title: 'Zambian Independence',
      subject: 'History',
      grade: '8',
      duration: 30,
      progress: 0,
      type: 'video',
      content: {
        sections: [
          'Colonial Period',
          'Freedom Fighters',
          'October 24, 1964',
          'Kenneth Kaunda\'s Leadership'
        ]
      },
      isCompleted: false
    }
  ];

  const subjects = ['Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'English'];
  const grades = ['7', '8', '9', '10', '11', '12'];

  const filteredLessons = lessons.filter(lesson => 
    lesson.subject === selectedSubject && lesson.grade === selectedGrade
  );

  useEffect(() => {
    if (filteredLessons.length > 0 && !currentLesson) {
      setCurrentLesson(filteredLessons[0]);
    }
  }, [filteredLessons, currentLesson]);

  const handleLessonSelect = (lesson: LessonContent) => {
    setCurrentLesson(lesson);
    setProgress(lesson.progress);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate lesson progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  const LessonPlayer = ({ lesson }: { lesson: LessonContent }) => {
    return (
      <div className="space-y-4">
        {/* Video/Content Area */}
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              {lesson.type === 'video' && <Play className="w-8 h-8" />}
              {lesson.type === 'interactive' && <Brain className="w-8 h-8" />}
              {lesson.type === 'simulation' && <Eye className="w-8 h-8" />}
              {lesson.type === 'quiz' && <Target className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
            <p className="text-gray-300">
              {lesson.type === 'video' && 'Interactive Video Lesson'}
              {lesson.type === 'interactive' && 'Interactive Learning Experience'}
              {lesson.type === 'simulation' && 'Virtual Lab Simulation'}
              {lesson.type === 'quiz' && 'Practice Quiz'}
            </p>
          </div>
          
          {/* Overlay Controls */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Lesson Sections */}
        <div className="space-y-2">
          <h4 className="font-semibold">Lesson Sections</h4>
          <div className="space-y-1">
            {lesson.content.sections.map((section: string, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                <CheckCircle className={`w-4 h-4 ${index < progress / 20 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className="text-sm">{section}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Interactive Lessons
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          ECZ-aligned interactive lessons with AI-powered content generation and multilingual support
        </p>
      </div>

      {/* Subject and Grade Selection */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="space-y-2">
          <label className="text-sm font-medium">Subject</label>
          <div className="flex flex-wrap gap-2">
            {subjects.map(subject => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Grade</label>
          <div className="flex gap-2">
            {grades.map(grade => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGrade(grade)}
              >
                Grade {grade}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Available Lessons
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredLessons.map(lesson => (
              <div
                key={lesson.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  currentLesson?.id === lesson.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleLessonSelect(lesson)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{lesson.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {lesson.subject}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Grade {lesson.grade}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {lesson.duration} min
                    </div>
                  </div>
                  {lesson.isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <Progress value={lesson.progress} className="h-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Lesson Player */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{currentLesson?.title || 'Select a Lesson'}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {currentLesson?.subject} - Grade {currentLesson?.grade}
                </Badge>
                <Button size="sm" variant="outline">
                  <Award className="w-4 h-4 mr-1" />
                  Earn Points
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentLesson ? (
              <LessonPlayer lesson={currentLesson} />
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Select a lesson to start learning
                </h3>
                <p className="text-gray-500">
                  Choose from our ECZ-aligned interactive lessons
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Learning Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold">AI-Powered</h3>
          <p className="text-sm text-gray-600">Adaptive content generation</p>
        </Card>
        <Card className="text-center p-4">
          <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold">Multilingual</h3>
          <p className="text-sm text-gray-600">Available in local languages</p>
        </Card>
        <Card className="text-center p-4">
          <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold">Visual Learning</h3>
          <p className="text-sm text-gray-600">Interactive simulations</p>
        </Card>
        <Card className="text-center p-4">
          <Lightbulb className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <h3 className="font-semibold">Smart Hints</h3>
          <p className="text-sm text-gray-600">AI-powered guidance</p>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveLessons;
