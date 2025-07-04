
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Search, Upload, Download, Star, Eye, Filter, BookOpen, FileText, Video, Image } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudyMaterial {
  id: string;
  file_name: string;
  file_path: string;
  subject: string;
  grade: string;
  curriculum: string;
  file_type: string;
  user_id: string;
  upload_date: string;
  file_size: number | null;
  metadata?: any;
}

const StudyMaterialsPage = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [curriculumFilter, setCurriculumFilter] = useState('all');
  const { user } = useAuth();
  const { toast } = useToast();

  const subjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Civic Education',
    'Geography', 'History', 'Biology', 'Chemistry', 'Physics',
    'Computer Studies', 'Agriculture', 'Business Studies', 'Art'
  ];

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast({
        title: "Error",
        description: "Failed to load study materials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType?.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType?.includes('video')) return <Video className="w-5 h-5 text-blue-500" />;
    if (fileType?.includes('image')) return <Image className="w-5 h-5 text-green-500" />;
    return <BookOpen className="w-5 h-5 text-gray-500" />;
  };

  const handleDownload = async (material: StudyMaterial) => {
    try {
      window.open(material.file_path, '_blank');
      toast({
        title: "Download Started",
        description: `${material.file_name} is being downloaded`,
      });
    } catch (error) {
      console.error('Error downloading material:', error);
      toast({
        title: "Error",
        description: "Failed to download material",
        variant: "destructive"
      });
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || material.subject === subjectFilter;
    const matchesGrade = gradeFilter === 'all' || material.grade === gradeFilter;
    const matchesCurriculum = curriculumFilter === 'all' || material.curriculum === curriculumFilter;
    
    return matchesSearch && matchesSubject && matchesGrade && matchesCurriculum;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <BookOpen className="w-8 h-8" />
              Study Materials Repository
            </CardTitle>
            <p className="text-blue-100">
              Access thousands of ECZ-aligned study materials, notes, and resources
            </p>
          </CardHeader>
        </Card>

        {/* Search and Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={curriculumFilter} onValueChange={setCurriculumFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Curriculum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Curricula</SelectItem>
                  <SelectItem value="ECZ">ECZ</SelectItem>
                  <SelectItem value="Cambridge">Cambridge</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-md animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredMaterials.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredMaterials.map((material) => (
              <Card key={material.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    {getFileIcon(material.file_type)}
                    <Badge variant="outline" className="text-xs">
                      {material.curriculum}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {material.file_name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {material.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {material.grade}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>
                      {material.upload_date ? new Date(material.upload_date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownload(material)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleDownload(material)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
