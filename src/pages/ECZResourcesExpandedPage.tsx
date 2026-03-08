import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen, FileText, Video, Globe, Download, ExternalLink,
  Search, GraduationCap, Calculator, FlaskConical, Languages,
  Microscope, Scale, Leaf, Monitor, Heart, Briefcase
} from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'practice';
  grade: string;
  subject: string;
  url: string;
  icon: any;
}

const resources: Resource[] = [
  // Grade 7
  { title: 'Grade 7 Mathematics Past Paper 2023', description: 'Official ECZ examination paper with marking scheme', type: 'pdf', grade: '7', subject: 'Mathematics', url: '#', icon: Calculator },
  { title: 'Grade 7 English Language Past Paper 2023', description: 'Comprehension, grammar, and composition sections', type: 'pdf', grade: '7', subject: 'English', url: '#', icon: Languages },
  { title: 'Grade 7 Science Past Paper 2023', description: 'Integrated science with practical questions', type: 'pdf', grade: '7', subject: 'Science', url: '#', icon: FlaskConical },
  { title: 'Grade 7 Social Studies Past Paper 2023', description: 'Geography, history, and civic education', type: 'pdf', grade: '7', subject: 'Social Studies', url: '#', icon: Globe },
  { title: 'Grade 7 Mathematics Past Paper 2022', description: 'Full paper with solutions guide', type: 'pdf', grade: '7', subject: 'Mathematics', url: '#', icon: Calculator },
  { title: 'Grade 7 English Past Paper 2022', description: 'Complete language assessment', type: 'pdf', grade: '7', subject: 'English', url: '#', icon: Languages },
  // Grade 9
  { title: 'Grade 9 Mathematics Paper 1 & 2 (2023)', description: 'Both papers with detailed marking scheme', type: 'pdf', grade: '9', subject: 'Mathematics', url: '#', icon: Calculator },
  { title: 'Grade 9 English Language (2023)', description: 'Reading, writing, and listening components', type: 'pdf', grade: '9', subject: 'English', url: '#', icon: Languages },
  { title: 'Grade 9 Integrated Science (2023)', description: 'Biology, chemistry, and physics combined', type: 'pdf', grade: '9', subject: 'Science', url: '#', icon: FlaskConical },
  { title: 'Grade 9 Biology (2023)', description: 'Cell biology, ecology, and human anatomy', type: 'pdf', grade: '9', subject: 'Biology', url: '#', icon: Microscope },
  { title: 'Grade 9 Civic Education (2023)', description: 'Governance, rights, and responsibilities', type: 'pdf', grade: '9', subject: 'Civic Education', url: '#', icon: Scale },
  { title: 'Grade 9 Agriculture Science (2023)', description: 'Crop production, animal husbandry', type: 'pdf', grade: '9', subject: 'Agriculture', url: '#', icon: Leaf },
  { title: 'Grade 9 Computer Studies (2023)', description: 'Theory and practical components', type: 'pdf', grade: '9', subject: 'Computer Studies', url: '#', icon: Monitor },
  // Grade 12
  { title: 'Grade 12 Mathematics Paper 1 (2023)', description: 'Pure mathematics – algebra, calculus, trigonometry', type: 'pdf', grade: '12', subject: 'Mathematics', url: '#', icon: Calculator },
  { title: 'Grade 12 Mathematics Paper 2 (2023)', description: 'Applied mathematics – statistics, mechanics', type: 'pdf', grade: '12', subject: 'Mathematics', url: '#', icon: Calculator },
  { title: 'Grade 12 English Language (2023)', description: 'Advanced composition and comprehension', type: 'pdf', grade: '12', subject: 'English', url: '#', icon: Languages },
  { title: 'Grade 12 Biology Paper 1 & 2 (2023)', description: 'Theory and practical papers', type: 'pdf', grade: '12', subject: 'Biology', url: '#', icon: Microscope },
  { title: 'Grade 12 Chemistry Paper 1 & 2 (2023)', description: 'Organic, inorganic, and physical chemistry', type: 'pdf', grade: '12', subject: 'Chemistry', url: '#', icon: FlaskConical },
  { title: 'Grade 12 Physics Paper 1 & 2 (2023)', description: 'Mechanics, waves, electricity, modern physics', type: 'pdf', grade: '12', subject: 'Physics', url: '#', icon: FlaskConical },
  { title: 'Grade 12 Civic Education (2023)', description: 'Constitution, governance, human rights', type: 'pdf', grade: '12', subject: 'Civic Education', url: '#', icon: Scale },
  { title: 'Grade 12 Business Studies (2023)', description: 'Accounting, marketing, management', type: 'pdf', grade: '12', subject: 'Business Studies', url: '#', icon: Briefcase },
  // Video Resources
  { title: 'ECZ Mathematics Walkthrough – Grade 9', description: 'Step-by-step solutions for 2023 paper', type: 'video', grade: '9', subject: 'Mathematics', url: 'https://youtube.com', icon: Calculator },
  { title: 'Biology Revision – Grade 12', description: 'Cell division, genetics, and ecology review', type: 'video', grade: '12', subject: 'Biology', url: 'https://youtube.com', icon: Microscope },
  { title: 'Chemistry Revision – Grade 12', description: 'Organic chemistry and stoichiometry', type: 'video', grade: '12', subject: 'Chemistry', url: 'https://youtube.com', icon: FlaskConical },
  { title: 'English Language Tips – All Grades', description: 'Comprehension and essay writing techniques', type: 'video', grade: 'all', subject: 'English', url: 'https://youtube.com', icon: Languages },
  // External Links
  { title: 'ZEDPastPapers.com', description: 'Complete archive of ECZ past examination papers', type: 'link', grade: 'all', subject: 'All', url: 'https://zedpastpapers.com', icon: Globe },
  { title: 'ECZ Official Website', description: 'Examinations Council of Zambia official portal', type: 'link', grade: 'all', subject: 'All', url: 'https://www.exams-council.org.zm', icon: Globe },
  { title: 'Khan Academy Zambia', description: 'Free math and science lessons aligned to curriculum', type: 'link', grade: 'all', subject: 'All', url: 'https://khanacademy.org', icon: Globe },
  { title: 'BBC Bitesize', description: 'Revision materials for science and English', type: 'link', grade: 'all', subject: 'All', url: 'https://bbc.co.uk/bitesize', icon: Globe },
];

const ECZResourcesExpandedPage = () => {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const grades = ['all', '7', '9', '12'];
  const subjects = [...new Set(resources.map(r => r.subject))];

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === 'all' || r.grade === gradeFilter || r.grade === 'all';
    const matchSubject = subjectFilter === 'all' || r.subject === subjectFilter;
    return matchSearch && matchGrade && matchSubject;
  });

  const pdfs = filtered.filter(r => r.type === 'pdf');
  const videos = filtered.filter(r => r.type === 'video');
  const links = filtered.filter(r => r.type === 'link');

  const ResourceCard = ({ r }: { r: Resource }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="hover:shadow-md transition-all group">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <r.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {r.grade !== 'all' && <Badge variant="outline" className="text-xs">Grade {r.grade}</Badge>}
                <Badge variant="secondary" className="text-xs">{r.subject}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0" asChild>
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.type === 'pdf' ? <Download className="w-4 h-4" /> :
                 r.type === 'video' ? <Video className="w-4 h-4" /> :
                 <ExternalLink className="w-4 h-4" />}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" /> ECZ Resource Library
        </h1>
        <p className="text-sm text-muted-foreground">{resources.length} resources · Past papers, videos & study materials</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1">
          {grades.map(g => (
            <Button
              key={g}
              size="sm"
              variant={gradeFilter === g ? 'default' : 'outline'}
              onClick={() => setGradeFilter(g)}
            >
              {g === 'all' ? 'All Grades' : `Grade ${g}`}
            </Button>
          ))}
        </div>
      </div>

      {/* Subject Pills */}
      <div className="flex flex-wrap gap-1.5">
        <Badge
          variant={subjectFilter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSubjectFilter('all')}
        >All Subjects</Badge>
        {subjects.filter(s => s !== 'All').map(s => (
          <Badge
            key={s}
            variant={subjectFilter === s ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSubjectFilter(s)}
          >{s}</Badge>
        ))}
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="papers">
        <TabsList>
          <TabsTrigger value="papers"><FileText className="w-3 h-3 mr-1" /> Past Papers ({pdfs.length})</TabsTrigger>
          <TabsTrigger value="videos"><Video className="w-3 h-3 mr-1" /> Videos ({videos.length})</TabsTrigger>
          <TabsTrigger value="links"><Globe className="w-3 h-3 mr-1" /> Study Sites ({links.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="papers" className="space-y-2 mt-4">
          {pdfs.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No papers match your filters.</CardContent></Card>
          ) : pdfs.map((r, i) => <ResourceCard key={i} r={r} />)}
        </TabsContent>
        <TabsContent value="videos" className="space-y-2 mt-4">
          {videos.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No videos match your filters.</CardContent></Card>
          ) : videos.map((r, i) => <ResourceCard key={i} r={r} />)}
        </TabsContent>
        <TabsContent value="links" className="space-y-2 mt-4">
          {links.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No links match your filters.</CardContent></Card>
          ) : links.map((r, i) => <ResourceCard key={i} r={r} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ECZResourcesExpandedPage;
