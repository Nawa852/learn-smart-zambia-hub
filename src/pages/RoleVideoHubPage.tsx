import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Play, Eye, ThumbsUp, GraduationCap, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const teacherTopics = [
  { label: 'Lesson Planning', query: 'lesson planning strategies for teachers tutorial' },
  { label: 'Classroom Management', query: 'classroom management techniques effective teaching' },
  { label: 'EdTech Tools', query: 'best educational technology tools for teachers 2024' },
  { label: 'Assessment Design', query: 'how to design assessments rubrics for students' },
  { label: 'Differentiated Instruction', query: 'differentiated instruction strategies tutorial' },
  { label: 'Student Engagement', query: 'student engagement techniques active learning' },
];

const guardianTopics = [
  { label: 'Helping with Homework', query: 'how to help children with homework tips parents' },
  { label: 'Online Safety', query: 'internet safety for children parental guide' },
  { label: 'Screen Time Management', query: 'managing screen time for kids tips' },
  { label: 'Study Habits', query: 'how to build good study habits in children' },
  { label: 'Supporting Learning', query: 'how parents can support children education' },
  { label: 'STEM Activities', query: 'STEM activities for kids at home' },
];

const medicalTopics = [
  { label: 'Clinical Skills', query: 'clinical examination skills medical students tutorial' },
  { label: 'Anatomy', query: 'human anatomy medical lecture full course' },
  { label: 'Pharmacology', query: 'pharmacology basics for medical students' },
  { label: 'Pathology', query: 'pathology lecture medical student tutorial' },
  { label: 'OSCE Prep', query: 'OSCE exam preparation tips medical student' },
  { label: 'Surgery Basics', query: 'basic surgical skills tutorial medical' },
];

const developerTopics = [
  { label: 'React', query: 'React.js full tutorial for beginners 2024' },
  { label: 'Python', query: 'Python programming full course beginner' },
  { label: 'System Design', query: 'system design interview preparation tutorial' },
  { label: 'DevOps', query: 'DevOps tutorial CI/CD Docker Kubernetes beginner' },
  { label: 'Data Structures', query: 'data structures algorithms tutorial programming' },
  { label: 'API Design', query: 'REST API design best practices tutorial' },
];

interface Props {
  role: 'teacher' | 'guardian' | 'doctor' | 'developer';
}

const roleConfig = {
  teacher: { title: 'Teacher Video Hub', subtitle: 'Professional development & teaching strategies', topics: teacherTopics, icon: GraduationCap },
  guardian: { title: 'Parent Learning Hub', subtitle: 'Support your child\'s education journey', topics: guardianTopics, icon: BookOpen },
  doctor: { title: 'Medical Video Library', subtitle: 'Clinical lectures & exam preparation', topics: medicalTopics, icon: BookOpen },
  developer: { title: 'Developer Video Hub', subtitle: 'Programming tutorials & tech talks', topics: developerTopics, icon: BookOpen },
};

export default function RoleVideoHubPage({ role }: Props) {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const config = roleConfig[role];

  const search = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: q, maxResults: 12 },
      });
      if (error) throw error;
      setVideos(data?.videos || []);
    } catch {
      toast({ title: 'Error', description: 'Search failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><config.icon className="w-8 h-8 text-primary" /> {config.title}</h1>
        <p className="text-muted-foreground">{config.subtitle}</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {config.topics.map((t) => (
              <Button key={t.label} variant="outline" size="sm" onClick={() => { setQuery(t.query); search(t.query); }} disabled={loading}>
                {t.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search videos..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && search(query)} />
            <Button onClick={() => search(query)} disabled={loading}><Search className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {videos.length > 0 && (
        <ScrollArea className="h-[600px]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v: any) => (
              <Card key={v.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => window.open(`https://youtube.com/watch?v=${v.id}`, '_blank')}>
                <div className="relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  {v.duration && <Badge className="absolute bottom-2 right-2 bg-black/75 text-white">{v.duration}</Badge>}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{v.channelTitle}</p>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{parseInt(v.viewCount || '0').toLocaleString()}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{parseInt(v.likeCount || '0').toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
