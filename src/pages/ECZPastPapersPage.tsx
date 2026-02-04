import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Download, FileText, ExternalLink, BookOpen, 
  GraduationCap, Calendar, CheckCircle, Clock, Star, Filter
} from 'lucide-react';

interface PastPaper {
  id: string;
  title: string;
  year: string;
  grade: string;
  subject: string;
  paper: string;
  hasMarkingScheme: boolean;
  downloadUrl: string;
  source: string;
}

const ECZPastPapersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const pastPapers: PastPaper[] = [
    // Grade 12 Papers
    { id: 'g12-m-2024', title: 'Mathematics Paper 1', year: '2024', grade: '12', subject: 'Mathematics', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-m2-2024', title: 'Mathematics Paper 2', year: '2024', grade: '12', subject: 'Mathematics', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-e-2024', title: 'English Language Paper 1', year: '2024', grade: '12', subject: 'English', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-e2-2024', title: 'English Language Paper 2', year: '2024', grade: '12', subject: 'English', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-p-2024', title: 'Physics Paper 1', year: '2024', grade: '12', subject: 'Physics', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-p2-2024', title: 'Physics Paper 2', year: '2024', grade: '12', subject: 'Physics', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-c-2024', title: 'Chemistry Paper 1', year: '2024', grade: '12', subject: 'Chemistry', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-c2-2024', title: 'Chemistry Paper 2', year: '2024', grade: '12', subject: 'Chemistry', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-b-2024', title: 'Biology Paper 1', year: '2024', grade: '12', subject: 'Biology', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-b2-2024', title: 'Biology Paper 2', year: '2024', grade: '12', subject: 'Biology', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-ce-2024', title: 'Civic Education', year: '2024', grade: '12', subject: 'Civic Education', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-geo-2024', title: 'Geography Paper 1', year: '2024', grade: '12', subject: 'Geography', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    
    // 2023 Papers
    { id: 'g12-m-2023', title: 'Mathematics Paper 1', year: '2023', grade: '12', subject: 'Mathematics', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-m2-2023', title: 'Mathematics Paper 2', year: '2023', grade: '12', subject: 'Mathematics', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-e-2023', title: 'English Language Paper 1', year: '2023', grade: '12', subject: 'English', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-p-2023', title: 'Physics Paper 1', year: '2023', grade: '12', subject: 'Physics', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-c-2023', title: 'Chemistry Paper 1', year: '2023', grade: '12', subject: 'Chemistry', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-b-2023', title: 'Biology Paper 1', year: '2023', grade: '12', subject: 'Biology', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    
    // Grade 9 Papers
    { id: 'g9-m-2024', title: 'Mathematics Paper 1', year: '2024', grade: '9', subject: 'Mathematics', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'g9-m2-2024', title: 'Mathematics Paper 2', year: '2024', grade: '9', subject: 'Mathematics', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'g9-e-2024', title: 'English Paper 1', year: '2024', grade: '9', subject: 'English', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'g9-s-2024', title: 'Science Paper 1', year: '2024', grade: '9', subject: 'Science', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'g9-s2-2024', title: 'Science Paper 2', year: '2024', grade: '9', subject: 'Science', paper: 'Paper 2', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'g9-ss-2024', title: 'Social Studies', year: '2024', grade: '9', subject: 'Social Studies', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    
    // Grade 7 Papers
    { id: 'g7-m-2024', title: 'Mathematics', year: '2024', grade: '7', subject: 'Mathematics', paper: 'Composite', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-7-past-papers/', source: 'ZedPastPapers' },
    { id: 'g7-e-2024', title: 'English', year: '2024', grade: '7', subject: 'English', paper: 'Composite', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-7-past-papers/', source: 'ZedPastPapers' },
    { id: 'g7-s-2024', title: 'Science', year: '2024', grade: '7', subject: 'Science', paper: 'Composite', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-7-past-papers/', source: 'ZedPastPapers' },
    { id: 'g7-ss-2024', title: 'Social Studies', year: '2024', grade: '7', subject: 'Social Studies', paper: 'Composite', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-7-past-papers/', source: 'ZedPastPapers' },
    
    // More years
    { id: 'g12-m-2022', title: 'Mathematics Paper 1', year: '2022', grade: '12', subject: 'Mathematics', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-p-2022', title: 'Physics Paper 1', year: '2022', grade: '12', subject: 'Physics', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-c-2022', title: 'Chemistry Paper 1', year: '2022', grade: '12', subject: 'Chemistry', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'g12-b-2022', title: 'Biology Paper 1', year: '2022', grade: '12', subject: 'Biology', paper: 'Paper 1', hasMarkingScheme: true, downloadUrl: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
  ];

  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Civic Education', 'Geography', 'Science', 'Social Studies'];
  const grades = ['7', '9', '12'];
  const years = ['2024', '2023', '2022', '2021', '2020'];

  const filteredPapers = pastPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || paper.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject;
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear;
    return matchesSearch && matchesGrade && matchesSubject && matchesYear;
  });

  const groupedByGrade = {
    '12': filteredPapers.filter(p => p.grade === '12'),
    '9': filteredPapers.filter(p => p.grade === '9'),
    '7': filteredPapers.filter(p => p.grade === '7'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  📝 ECZ Past Examination Papers
                </CardTitle>
                <CardDescription className="text-orange-100 text-lg">
                  Grade 7, 9 & 12 Past Papers with Marking Schemes
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search papers by subject or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 bg-white/95 text-gray-900 border-0 rounded-xl"
                />
              </div>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="bg-white/95 text-gray-900 border-0">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {grades.map(g => (
                    <SelectItem key={g} value={g}>Grade {g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-white/95 text-gray-900 border-0">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-white/95 text-gray-900 border-0">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(y => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Papers', value: pastPapers.length, icon: FileText, color: 'text-red-600 bg-red-100' },
            { label: 'With Marking Schemes', value: pastPapers.filter(p => p.hasMarkingScheme).length, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
            { label: 'Subjects', value: subjects.length, icon: BookOpen, color: 'text-blue-600 bg-blue-100' },
            { label: 'Years Available', value: years.length, icon: Calendar, color: 'text-purple-600 bg-purple-100' },
          ].map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access to Official Sources */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">Official ECZ Past Papers</h3>
                  <p className="text-sm text-gray-600">Access the complete collection from ZedPastPapers</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => window.open('https://zedpastpapers.com/grade-7-past-papers/', '_blank')}>
                  Grade 7
                </Button>
                <Button onClick={() => window.open('https://zedpastpapers.com/grade-9-past-papers/', '_blank')}>
                  Grade 9
                </Button>
                <Button onClick={() => window.open('https://zedpastpapers.com/grade-12-past-papers/', '_blank')}>
                  Grade 12
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Papers by Grade */}
        <Tabs defaultValue="12" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="12" className="gap-2">
              <GraduationCap className="h-4 w-4" /> Grade 12 ({groupedByGrade['12'].length})
            </TabsTrigger>
            <TabsTrigger value="9" className="gap-2">
              <GraduationCap className="h-4 w-4" /> Grade 9 ({groupedByGrade['9'].length})
            </TabsTrigger>
            <TabsTrigger value="7" className="gap-2">
              <GraduationCap className="h-4 w-4" /> Grade 7 ({groupedByGrade['7'].length})
            </TabsTrigger>
          </TabsList>

          {['12', '9', '7'].map(grade => (
            <TabsContent key={grade} value={grade} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedByGrade[grade as keyof typeof groupedByGrade].map((paper) => (
                  <Card key={paper.id} className="border-0 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-red-500" />
                          <Badge variant="outline">{paper.year}</Badge>
                        </div>
                        {paper.hasMarkingScheme && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" /> Marking Scheme
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{paper.title}</h4>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge className="bg-blue-100 text-blue-800">{paper.subject}</Badge>
                        <Badge variant="outline">{paper.paper}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">Source: {paper.source}</p>
                      <Button 
                        className="w-full gap-2 bg-gradient-to-r from-red-600 to-orange-500"
                        onClick={() => window.open(paper.downloadUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" /> Download Paper
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {groupedByGrade[grade as keyof typeof groupedByGrade].length === 0 && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No papers found</h3>
                    <p className="text-gray-600">Try adjusting your filters</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* External Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" /> ZedPastPapers.com
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 opacity-90">The largest collection of ECZ past examination papers online</p>
              <Button variant="secondary" className="w-full" onClick={() => window.open('https://zedpastpapers.com/', '_blank')}>
                Visit ZedPastPapers
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" /> Zed Materials App
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 opacity-90">Download the mobile app for offline access to past papers</p>
              <Button variant="secondary" className="w-full" onClick={() => window.open('https://play.google.com/store/apps/details?id=com.zedmaterials', '_blank')}>
                Get the App
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ECZPastPapersPage;
