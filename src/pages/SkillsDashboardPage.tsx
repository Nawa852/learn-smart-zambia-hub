import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  Wrench, BookOpen, Brain, Target, Trophy, TrendingUp,
  Video, Users, Calendar, Sparkles, Layers, Compass
} from 'lucide-react';

const skillPaths = [
  { title: 'Digital Literacy', desc: 'Computer basics, internet safety, productivity tools', progress: 0, icon: Wrench, color: 'from-blue-500 to-cyan-500' },
  { title: 'Communication Skills', desc: 'Public speaking, writing, presentation skills', progress: 0, icon: Users, color: 'from-green-500 to-emerald-500' },
  { title: 'Financial Literacy', desc: 'Budgeting, saving, investing fundamentals', progress: 0, icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
  { title: 'Project Management', desc: 'Planning, execution, agile methodologies', progress: 0, icon: Target, color: 'from-purple-500 to-pink-500' },
  { title: 'Creative Thinking', desc: 'Problem solving, design thinking, innovation', progress: 0, icon: Sparkles, color: 'from-pink-500 to-rose-500' },
  { title: 'Leadership', desc: 'Team management, decision making, mentorship', progress: 0, icon: Compass, color: 'from-indigo-500 to-violet-500' },
];

const certifications = [
  { name: 'Google Digital Skills', provider: 'Google', level: 'Beginner', duration: '40 hours' },
  { name: 'Project Management Basics', provider: 'PMI', level: 'Beginner', duration: '20 hours' },
  { name: 'Data Analysis Foundations', provider: 'IBM', level: 'Intermediate', duration: '30 hours' },
];

export default function SkillsDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="w-8 h-8 text-primary" />
          Skills Development Hub
        </h1>
        <p className="text-muted-foreground">Build practical skills for the modern workforce — tailored for Zambia</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/course-catalog')}>
          <BookOpen className="w-5 h-5" />
          <span className="text-xs">Browse Courses</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/ai')}>
          <Brain className="w-5 h-5" />
          <span className="text-xs">AI Coach</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/skills/videos')}>
          <Video className="w-5 h-5" />
          <span className="text-xs">Video Tutorials</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/leaderboard')}>
          <Trophy className="w-5 h-5" />
          <span className="text-xs">Leaderboard</span>
        </Button>
      </div>

      {/* Skill Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Layers className="w-5 h-5" /> Skill Paths</CardTitle>
          <CardDescription>Follow structured learning paths to master in-demand skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillPaths.map((path, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className={`w-12 h-12 mb-3 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center`}>
                    <path.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{path.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{path.desc}</p>
                  <Progress value={path.progress} className="h-1.5 mb-1" />
                  <p className="text-xs text-muted-foreground">{path.progress}% complete</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Available Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <h4 className="font-semibold text-sm">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground">{cert.provider} · {cert.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{cert.level}</Badge>
                  <Button size="sm">Start</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
