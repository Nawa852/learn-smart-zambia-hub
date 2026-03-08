import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Wrench, BookOpen, Brain, Video, Trophy, Target, TrendingUp, Sparkles } from 'lucide-react';

const SkillsDashboardView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome to Skills Development</h2>
        <p className="text-muted-foreground">Build practical, career-ready skills</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'My Courses', icon: BookOpen, path: '/course-catalog', color: 'text-blue-500' },
          { label: 'AI Coach', icon: Brain, path: '/ai', color: 'text-purple-500' },
          { label: 'Video Tutorials', icon: Video, path: '/skills/videos', color: 'text-red-500' },
          { label: 'Achievements', icon: Trophy, path: '/badges', color: 'text-yellow-500' },
        ].map((item) => (
          <Card key={item.label} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(item.path)}>
            <CardContent className="p-4 text-center">
              <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              <p className="text-sm font-medium">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" /> Current Goals</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between text-sm mb-1"><span>Complete Digital Literacy Path</span><span>0%</span></div>
            <Progress value={0} className="h-2" />
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between text-sm mb-1"><span>Earn First Certification</span><span>0%</span></div>
            <Progress value={0} className="h-2" />
          </div>
          <Button className="w-full" onClick={() => navigate('/goals')}>Set New Goal</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsDashboardView;
