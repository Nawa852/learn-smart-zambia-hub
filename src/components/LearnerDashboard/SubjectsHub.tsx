import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Calculator, Globe, FlaskConical, BookText, 
  Music, Palette, Activity, Lock, CheckCircle2, AlertTriangle,
  Play, Clock, TrendingUp, Star, ChevronRight, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  icon: any;
  color: string;
  progress: number;
  weakAreas: string[];
  lastActivity: string;
  teacher?: string;
  nextLesson?: string;
  grade: number;
}

interface SubjectsHubProps {
  onSubjectSelect?: (subjectId: string) => void;
}

export const SubjectsHub = ({ onSubjectSelect }: SubjectsHubProps) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const subjects: Subject[] = [
    { 
      id: 'math', name: 'Mathematics', icon: Calculator, 
      color: 'from-blue-500 to-indigo-600', progress: 72,
      weakAreas: ['Quadratic Equations', 'Trigonometry'],
      lastActivity: '2 hours ago', teacher: 'Mr. Banda',
      nextLesson: 'Circle Theorems', grade: 9
    },
    { 
      id: 'english', name: 'English Language', icon: BookText, 
      color: 'from-emerald-500 to-teal-600', progress: 85,
      weakAreas: ['Essay Writing'],
      lastActivity: 'Yesterday', teacher: 'Mrs. Mwanza',
      nextLesson: 'Comprehension Skills', grade: 9
    },
    { 
      id: 'science', name: 'Integrated Science', icon: FlaskConical, 
      color: 'from-purple-500 to-pink-600', progress: 58,
      weakAreas: ['Chemistry - Acids & Bases', 'Physics - Electricity'],
      lastActivity: '3 days ago', teacher: 'Mr. Tembo',
      nextLesson: 'Photosynthesis', grade: 9
    },
    { 
      id: 'geography', name: 'Geography', icon: Globe, 
      color: 'from-orange-500 to-red-600', progress: 64,
      weakAreas: ['Map Reading'],
      lastActivity: '1 week ago', teacher: 'Ms. Phiri',
      nextLesson: 'Climate Zones', grade: 9
    },
    { 
      id: 'history', name: 'History', icon: BookOpen, 
      color: 'from-amber-500 to-yellow-600', progress: 78,
      weakAreas: [],
      lastActivity: 'Today', teacher: 'Mr. Mulenga',
      nextLesson: 'Colonial Era', grade: 9
    },
    { 
      id: 'civics', name: 'Civic Education', icon: Activity, 
      color: 'from-cyan-500 to-blue-600', progress: 90,
      weakAreas: [],
      lastActivity: '2 days ago', teacher: 'Mrs. Chanda',
      nextLesson: 'Human Rights', grade: 9
    },
  ];

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    onSubjectSelect?.(subject.id);
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Subjects Hub
          <Badge variant="secondary" className="ml-2">ECZ Aligned</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="all">All Subjects</TabsTrigger>
            <TabsTrigger value="active">In Progress</TabsTrigger>
            <TabsTrigger value="weak">Need Attention</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Card 
                  key={subject.id}
                  className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <subject.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {subject.weakAreas.length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {subject.weakAreas.length} weak
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{subject.lastActivity}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-1">{subject.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">Grade {subject.grade} • {subject.teacher}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mastery</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>

                    {subject.nextLesson && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          Next: {subject.nextLesson}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.filter(s => s.progress < 100 && s.progress > 50).map((subject) => (
                <Card key={subject.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                      <subject.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{subject.name}</h4>
                      <Progress value={subject.progress} className="h-1.5 mt-1" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weak" className="space-y-4">
            <div className="space-y-3">
              {subjects.filter(s => s.weakAreas.length > 0).map((subject) => (
                <Card key={subject.id} className="border-red-200 bg-red-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                        <subject.icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-medium">{subject.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subject.weakAreas.map((area, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white">
                          <AlertTriangle className="w-3 h-3 mr-1 text-red-500" />
                          {area}
                        </Badge>
                      ))}
                    </div>
                    <Link to="/multi-ai-tutor">
                      <Button size="sm" variant="outline" className="mt-3 gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Get AI Help
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
