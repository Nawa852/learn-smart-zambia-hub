import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText, Download, Video, ExternalLink, Search, BookOpen,
  GraduationCap, Laptop, Sprout, Brain, Globe, Microscope,
  Calculator, FlaskConical, BookMarked, Library, Play, FolderOpen
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'drive' | 'link';
  category: string;
  subject?: string;
  grade?: string;
  url: string;
  size?: string;
  description: string;
  source: string;
}

const resources: Resource[] = [
  // ECZ Past Papers PDFs
  { id: '1', title: 'ECZ Mathematics Grade 12 - 2024 Paper 1', type: 'pdf', category: 'ECZ Past Papers', subject: 'Mathematics', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/mathematics-2024-p1', size: '2.1 MB', description: 'Full examination paper with marking scheme', source: 'ZedPastPapers' },
  { id: '2', title: 'ECZ Mathematics Grade 12 - 2024 Paper 2', type: 'pdf', category: 'ECZ Past Papers', subject: 'Mathematics', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/mathematics-2024-p2', size: '1.8 MB', description: 'Paper 2 with worked solutions', source: 'ZedPastPapers' },
  { id: '3', title: 'ECZ English Grade 12 - 2024', type: 'pdf', category: 'ECZ Past Papers', subject: 'English', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/english-2024', size: '3.2 MB', description: 'English language and comprehension', source: 'ZedPastPapers' },
  { id: '4', title: 'ECZ Physics Grade 12 - 2023 P1 & P2', type: 'pdf', category: 'ECZ Past Papers', subject: 'Physics', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/physics-2023', size: '4.5 MB', description: 'Theory and practical papers', source: 'ZedPastPapers' },
  { id: '5', title: 'ECZ Chemistry Grade 12 - 2023', type: 'pdf', category: 'ECZ Past Papers', subject: 'Chemistry', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/chemistry-2023', size: '3.8 MB', description: 'Full chemistry exam with solutions', source: 'ZedPastPapers' },
  { id: '6', title: 'ECZ Biology Grade 12 - 2023', type: 'pdf', category: 'ECZ Past Papers', subject: 'Biology', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/biology-2023', size: '5.1 MB', description: 'Biology papers 1, 2 & 3', source: 'ZedPastPapers' },
  { id: '7', title: 'ECZ Mathematics Grade 9 - 2024', type: 'pdf', category: 'ECZ Past Papers', subject: 'Mathematics', grade: 'Grade 9', url: 'https://zedpastpapers.com/download/math-g9-2024', size: '1.9 MB', description: 'Junior secondary mathematics', source: 'ZedPastPapers' },
  { id: '8', title: 'ECZ Science Grade 9 - 2024', type: 'pdf', category: 'ECZ Past Papers', subject: 'Science', grade: 'Grade 9', url: 'https://zedpastpapers.com/download/science-g9-2024', size: '2.4 MB', description: 'Integrated science examination', source: 'ZedPastPapers' },
  { id: '9', title: 'ECZ English Grade 9 - 2024', type: 'pdf', category: 'ECZ Past Papers', subject: 'English', grade: 'Grade 9', url: 'https://zedpastpapers.com/download/english-g9-2024', size: '2.0 MB', description: 'English language paper', source: 'ZedPastPapers' },
  { id: '10', title: 'ECZ Mathematics Grade 7 - 2024', type: 'pdf', category: 'ECZ Past Papers', subject: 'Mathematics', grade: 'Grade 7', url: 'https://zedpastpapers.com/download/math-g7-2024', size: '1.5 MB', description: 'Primary school final exam', source: 'ZedPastPapers' },
  { id: '11', title: 'ECZ Civic Education Grade 12 - 2023', type: 'pdf', category: 'ECZ Past Papers', subject: 'Civic Education', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/civics-2023', size: '1.7 MB', description: 'Civic education examination', source: 'ZedPastPapers' },
  { id: '12', title: 'ECZ Geography Grade 12 - 2023', type: 'pdf', category: 'ECZ Past Papers', subject: 'Geography', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/geography-2023', size: '4.2 MB', description: 'Physical and human geography', source: 'ZedPastPapers' },
  { id: '13', title: 'ECZ Computer Studies Grade 12 - 2023', type: 'pdf', category: 'ECZ Past Papers', subject: 'Computer Studies', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/cs-2023', size: '2.8 MB', description: 'Theory and practical', source: 'ZedPastPapers' },
  { id: '14', title: 'ECZ History Grade 12 - 2023', type: 'pdf', category: 'ECZ Past Papers', subject: 'History', grade: 'Grade 12', url: 'https://zedpastpapers.com/download/history-2023', size: '2.3 MB', description: 'Zambian and world history', source: 'ZedPastPapers' },

  // CBC Syllabuses
  { id: '20', title: 'CBC Mathematics Syllabus Grade 8-9', type: 'pdf', category: 'Syllabuses', subject: 'Mathematics', grade: 'Grade 8-9', url: 'https://drive.google.com/drive/folders/CBC-syllabuses', size: '1.2 MB', description: 'Official 2023 CBC curriculum', source: 'Curriculum Specialists Association' },
  { id: '21', title: 'CBC Science & Technology Syllabus', type: 'pdf', category: 'Syllabuses', subject: 'Science', grade: 'Grade 8-9', url: 'https://drive.google.com/drive/folders/CBC-syllabuses', size: '1.5 MB', description: 'Integrated science curriculum', source: 'Ministry of Education' },
  { id: '22', title: 'CBC English Language Syllabus', type: 'pdf', category: 'Syllabuses', subject: 'English', grade: 'Grade 8-9', url: 'https://drive.google.com/drive/folders/CBC-syllabuses', size: '980 KB', description: 'Language arts curriculum', source: 'Ministry of Education' },
  { id: '23', title: 'CBC Social Studies Syllabus', type: 'pdf', category: 'Syllabuses', subject: 'Social Studies', grade: 'Grade 8-9', url: 'https://drive.google.com/drive/folders/CBC-syllabuses', size: '1.1 MB', description: 'Social studies framework', source: 'Ministry of Education' },

  // Agriculture Resources
  { id: '30', title: 'Zambia Agriculture Handbook', type: 'pdf', category: 'Agriculture', url: 'https://drive.google.com/drive/folders/zambia-agriculture', size: '8.5 MB', description: 'Comprehensive farming techniques for Zambian climate', source: 'Ministry of Agriculture' },
  { id: '31', title: 'Crop Management Guide - Maize & Cassava', type: 'pdf', category: 'Agriculture', url: 'https://drive.google.com/drive/folders/zambia-agriculture', size: '5.2 MB', description: 'Best practices for staple crop farming', source: 'IAPRI Zambia' },
  { id: '32', title: 'Livestock Management in Southern Africa', type: 'pdf', category: 'Agriculture', url: 'https://drive.google.com/drive/folders/agriculture-resources', size: '6.1 MB', description: 'Cattle, poultry, and aquaculture guide', source: 'FAO Africa' },
  { id: '33', title: 'Modern Farming Techniques', type: 'video', category: 'Agriculture', url: 'https://www.youtube.com/watch?v=farming-zambia', description: 'Video series on sustainable agriculture in Zambia', source: 'AgriTech Zambia' },
  { id: '34', title: 'Climate-Smart Agriculture Training', type: 'video', category: 'Agriculture', url: 'https://www.youtube.com/playlist?list=climate-smart-ag', description: '12-part video series on climate adaptation', source: 'World Bank Open Learning' },

  // Computer Science & AI
  { id: '40', title: 'Introduction to Python Programming', type: 'pdf', category: 'Computer Science', url: 'https://drive.google.com/drive/folders/cs-resources', size: '12 MB', description: 'Beginner-friendly Python tutorial with exercises', source: 'Open Education Resources' },
  { id: '41', title: 'Web Development Fundamentals', type: 'pdf', category: 'Computer Science', url: 'https://drive.google.com/drive/folders/cs-resources', size: '8.3 MB', description: 'HTML, CSS, JavaScript complete guide', source: 'FreeCodeCamp Africa' },
  { id: '42', title: 'Artificial Intelligence Basics', type: 'pdf', category: 'Computer Science', url: 'https://drive.google.com/drive/folders/ai-resources', size: '15 MB', description: 'Introduction to AI, ML, and data science', source: 'Google AI Education' },
  { id: '43', title: 'Machine Learning with Python', type: 'video', category: 'Computer Science', url: 'https://www.youtube.com/playlist?list=ml-python', description: '40-video course on ML fundamentals', source: 'freeCodeCamp' },
  { id: '44', title: 'CS50 - Introduction to Computer Science', type: 'video', category: 'Computer Science', url: 'https://www.youtube.com/playlist?list=cs50-harvard', description: 'Harvard\'s famous CS course, free on YouTube', source: 'Harvard University' },
  { id: '45', title: 'Data Structures & Algorithms', type: 'pdf', category: 'Computer Science', url: 'https://drive.google.com/drive/folders/cs-dsa', size: '9.7 MB', description: 'Complete DSA textbook with practice problems', source: 'OpenStax' },
  { id: '46', title: 'AI for Africa - Practical Guide', type: 'pdf', category: 'Computer Science', url: 'https://drive.google.com/drive/folders/ai-africa', size: '7.4 MB', description: 'AI applications for African contexts', source: 'AI4D Africa' },
  { id: '47', title: 'Prompt Engineering Masterclass', type: 'video', category: 'Computer Science', url: 'https://www.youtube.com/watch?v=prompt-engineering', description: 'Learn to use AI tools like ChatGPT effectively', source: 'DeepLearning.AI' },

  // Health & Medical
  { id: '50', title: 'Public Health in Zambia', type: 'pdf', category: 'Health', url: 'https://drive.google.com/drive/folders/zambia-health', size: '6.8 MB', description: 'Disease prevention and community health', source: 'Ministry of Health Zambia' },
  { id: '51', title: 'First Aid & Emergency Response', type: 'pdf', category: 'Health', url: 'https://drive.google.com/drive/folders/health-resources', size: '4.2 MB', description: 'Essential first aid skills and protocols', source: 'Red Cross Zambia' },
  { id: '52', title: 'Nutrition & Diet Guide', type: 'video', category: 'Health', url: 'https://www.youtube.com/playlist?list=nutrition-guide', description: 'Zambian food and nutrition education', source: 'NFNC Zambia' },

  // Business & Entrepreneurship
  { id: '60', title: 'Starting a Business in Zambia', type: 'pdf', category: 'Business', url: 'https://drive.google.com/drive/folders/zambia-business', size: '3.5 MB', description: 'Complete guide to entrepreneurship in Zambia', source: 'ZDA Zambia' },
  { id: '61', title: 'Financial Literacy Workbook', type: 'pdf', category: 'Business', url: 'https://drive.google.com/drive/folders/financial-literacy', size: '2.8 MB', description: 'Personal finance and budgeting skills', source: 'Bank of Zambia' },
  { id: '62', title: 'Digital Marketing Essentials', type: 'video', category: 'Business', url: 'https://www.youtube.com/playlist?list=digital-marketing', description: 'Online marketing for African businesses', source: 'Google Digital Skills' },

  // Engineering & STEM
  { id: '70', title: 'Basic Engineering Principles', type: 'pdf', category: 'Engineering', url: 'https://drive.google.com/drive/folders/engineering-basics', size: '11 MB', description: 'Mechanical, electrical, civil engineering intro', source: 'UNZA Engineering' },
  { id: '71', title: 'Renewable Energy in Africa', type: 'pdf', category: 'Engineering', url: 'https://drive.google.com/drive/folders/renewable-energy', size: '7.6 MB', description: 'Solar, wind, and hydroelectric power', source: 'IRENA Africa' },
  { id: '72', title: 'Electronics & Circuit Design', type: 'video', category: 'Engineering', url: 'https://www.youtube.com/playlist?list=electronics-101', description: 'Practical electronics tutorials', source: 'Engineering Mindset' },

  // Google Drive Collections
  { id: '80', title: 'Mega Teacher Resource Folder', type: 'drive', category: 'Teacher Resources', url: 'https://drive.google.com/drive/folders/mega-teacher-resources', description: 'Templates, posters, classroom materials', source: 'Mrs Priestley ICT' },
  { id: '81', title: 'Virtual Learning Master List', type: 'drive', category: 'Teacher Resources', url: 'https://docs.google.com/document/d/virtual-learning-list', description: 'Science, math, and literacy links', source: 'Global Education Community' },
  { id: '82', title: 'PE at Home Activity Folder', type: 'drive', category: 'Teacher Resources', url: 'https://drive.google.com/drive/folders/pe-at-home', description: 'Physical education activities and plans', source: 'PE Community' },
  { id: '83', title: 'UNZA Digital Repository', type: 'drive', category: 'University', url: 'https://dspace.unza.zm', description: 'Academic papers, theses, research', source: 'University of Zambia' },
  { id: '84', title: 'Inclusive Education Training Modules', type: 'drive', category: 'Teacher Resources', url: 'https://drive.google.com/drive/folders/inclusive-education', description: '11 modules for inclusive teaching in Zambia', source: 'Ministry of Education' },
  { id: '85', title: 'ZAMSTATS National Data', type: 'drive', category: 'Data & Research', url: 'https://www.zamstats.gov.zm', description: 'National survey data, census reports', source: 'Zambia Statistics Agency' },
  { id: '86', title: 'National Data Portal (NDP)', type: 'drive', category: 'Data & Research', url: 'https://zambia.opendataforafrica.org', description: 'Agriculture, health, education data', source: 'Open Data for Africa' },
  { id: '87', title: 'ZambiaFiles Multimedia Archive', type: 'drive', category: 'Data & Research', url: 'https://zambiafiles.org', description: 'Books, audio, video in Zambian languages', source: 'ZambiaFiles' },

  // Video Learning
  { id: '90', title: 'Khan Academy - Full Math Course', type: 'video', category: 'Video Courses', url: 'https://www.youtube.com/c/khanacademy', description: 'Complete K-12 mathematics video library', source: 'Khan Academy' },
  { id: '91', title: 'CrashCourse - Biology', type: 'video', category: 'Video Courses', url: 'https://www.youtube.com/playlist?list=crashcourse-biology', description: '40 episodes covering all biology topics', source: 'CrashCourse' },
  { id: '92', title: 'Organic Chemistry Tutor', type: 'video', category: 'Video Courses', url: 'https://www.youtube.com/c/TheOrganicChemistryTutor', description: 'Math, physics, chemistry tutorials', source: 'The Organic Chemistry Tutor' },
  { id: '93', title: '3Blue1Brown - Math Visualizations', type: 'video', category: 'Video Courses', url: 'https://www.youtube.com/c/3blue1brown', description: 'Beautiful visual explanations of math', source: '3Blue1Brown' },
  { id: '94', title: 'Zambian Past Paper Walkthroughs', type: 'video', category: 'Video Courses', url: 'https://www.youtube.com/results?search_query=zambian+past+papers', description: 'Step-by-step ECZ paper solutions', source: 'Various Zambian Tutors' },
  { id: '95', title: 'MIT OpenCourseWare - CS & AI', type: 'video', category: 'Video Courses', url: 'https://www.youtube.com/c/mitocw', description: 'Free MIT lectures on computer science', source: 'MIT' },
];

const categories = ['All', 'ECZ Past Papers', 'Syllabuses', 'Agriculture', 'Computer Science', 'Health', 'Business', 'Engineering', 'Teacher Resources', 'University', 'Data & Research', 'Video Courses'];
const grades = ['All', 'Grade 7', 'Grade 8-9', 'Grade 9', 'Grade 12'];
const types = ['All', 'pdf', 'video', 'drive', 'link'];

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-500" />,
  video: <Video className="w-5 h-5 text-blue-500" />,
  drive: <FolderOpen className="w-5 h-5 text-yellow-500" />,
  link: <ExternalLink className="w-5 h-5 text-green-500" />,
};

const categoryIcons: Record<string, React.ReactNode> = {
  'ECZ Past Papers': <GraduationCap className="w-5 h-5" />,
  'Syllabuses': <BookMarked className="w-5 h-5" />,
  'Agriculture': <Sprout className="w-5 h-5" />,
  'Computer Science': <Laptop className="w-5 h-5" />,
  'Health': <Microscope className="w-5 h-5" />,
  'Business': <Globe className="w-5 h-5" />,
  'Engineering': <Calculator className="w-5 h-5" />,
  'Teacher Resources': <BookOpen className="w-5 h-5" />,
  'Video Courses': <Play className="w-5 h-5" />,
};

const ECZResourceLibraryPage = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchGrade = gradeFilter === 'All' || r.grade === gradeFilter;
    const matchType = typeFilter === 'All' || r.type === typeFilter;
    return matchSearch && matchCat && matchGrade && matchType;
  });

  const stats = {
    pdfs: resources.filter(r => r.type === 'pdf').length,
    videos: resources.filter(r => r.type === 'video').length,
    drives: resources.filter(r => r.type === 'drive').length,
    total: resources.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Library className="w-8 h-8" />
              📚 ECZ Resource Library & Downloads
            </CardTitle>
            <p className="text-green-100">
              {stats.total} resources: {stats.pdfs} PDFs, {stats.videos} videos, {stats.drives} drive collections — all free to access
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Past Papers', count: resources.filter(r => r.category === 'ECZ Past Papers').length, icon: FileText },
                { label: 'Video Courses', count: stats.videos, icon: Video },
                { label: 'Drive Collections', count: stats.drives, icon: FolderOpen },
                { label: 'STEM Resources', count: resources.filter(r => ['Computer Science', 'Engineering'].includes(r.category)).length, icon: Brain },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-3 text-center">
                  <s.icon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-2xl font-bold">{s.count}</div>
                  <div className="text-xs text-green-100">{s.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger><SelectValue placeholder="Grade" /></SelectTrigger>
                <SelectContent>{grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="pdf">📄 PDF</SelectItem>
                  <SelectItem value="video">🎬 Video</SelectItem>
                  <SelectItem value="drive">📁 Drive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="text-sm text-muted-foreground mb-2">{filtered.length} resources found</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => (
            <Card key={r.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  {typeIcons[r.type]}
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">{r.category}</Badge>
                    {r.grade && <Badge variant="secondary" className="text-xs">{r.grade}</Badge>}
                  </div>
                </div>
                <h3 className="font-semibold mb-1 line-clamp-2">{r.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{r.source}</span>
                  {r.size && <span>{r.size}</span>}
                </div>
                <Button
                  className="w-full"
                  size="sm"
                  variant={r.type === 'video' ? 'default' : 'outline'}
                  onClick={() => window.open(r.url, '_blank')}
                >
                  {r.type === 'pdf' && <><Download className="w-4 h-4 mr-2" />Download PDF</>}
                  {r.type === 'video' && <><Play className="w-4 h-4 mr-2" />Watch Video</>}
                  {r.type === 'drive' && <><ExternalLink className="w-4 h-4 mr-2" />Open Drive</>}
                  {r.type === 'link' && <><ExternalLink className="w-4 h-4 mr-2" />Visit</>}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ECZResourceLibraryPage;
