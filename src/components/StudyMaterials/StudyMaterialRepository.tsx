
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useStudyMaterials } from '@/hooks/useStudyMaterials';
import { Upload, Download, Search, Filter, Eye, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

const StudyMaterialRepository = () => {
  const {
    materials,
    popularMaterials,
    loading,
    uploading,
    uploadMaterial,
    downloadMaterial,
    deleteMaterial,
    searchMaterials,
    getFilePreview,
    fetchMaterials
  } = useStudyMaterials();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [filters, setFilters] = useState({
    subject: '',
    grade: '',
    curriculum: '',
    language: 'English'
  });
  const [uploadMetadata, setUploadMetadata] = useState({
    subject: '',
    grade: '',
    curriculum: 'ECZ',
    language: 'English',
    isPublic: false
  });
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const subjects = [
    'Mathematics', 'English', 'Science', 'Biology', 'Chemistry', 'Physics',
    'History', 'Geography', 'Civic Education', 'Religious Education',
    'Computer Studies', 'Business Studies', 'Bemba', 'Nyanja', 'Tonga'
  ];

  const grades = Array.from({ length: 12 }, (_, i) => i + 1);
  const languages = ['English', 'Bemba', 'Nyanja', 'Tonga', 'Lozi', 'Kaonde', 'Lunda'];

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchMaterials(searchQuery, selectedLanguage);
    } else {
      await fetchMaterials(filters);
    }
  };

  const handleFilter = async () => {
    const filterObj = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    await fetchMaterials(filterObj);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    const metadata = {
      ...uploadMetadata,
      grade: uploadMetadata.grade ? parseInt(uploadMetadata.grade) : undefined
    };

    const result = await uploadMaterial(selectedFile, metadata);
    if (result) {
      setShowUploadForm(false);
      setSelectedFile(null);
      setUploadMetadata({
        subject: '',
        grade: '',
        curriculum: 'ECZ',
        language: 'English',
        isPublic: false
      });
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'ppt':
      case 'pptx': return '📊';
      case 'mp4': return '🎥';
      default: return '📁';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / (1024 * 1024)) + ' MB';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          📚 EduZambia Study Materials
        </h1>
        <p className="text-gray-600">
          Searchable repository for ECZ and Cambridge curriculum materials in multiple languages
        </p>
      </div>

      {/* Search and Language Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search in English, Bemba, Nyanja, or other languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Subject</Label>
              <Select value={filters.subject} onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Grade</Label>
              <Select value={filters.grade} onValueChange={(value) => setFilters(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Grades</SelectItem>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Curriculum</Label>
              <Select value={filters.curriculum} onValueChange={(value) => setFilters(prev => ({ ...prev, curriculum: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Curricula" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Curricula</SelectItem>
                  <SelectItem value="ECZ">ECZ</SelectItem>
                  <SelectItem value="Cambridge">Cambridge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleFilter} variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Materials
            </span>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-green-500 hover:bg-green-600"
            >
              {showUploadForm ? 'Cancel' : 'Upload New Material'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showUploadForm && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>File</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </div>
              <div>
                <Label>Subject</Label>
                <Select 
                  value={uploadMetadata.subject} 
                  onValueChange={(value) => setUploadMetadata(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Grade</Label>
                <Select 
                  value={uploadMetadata.grade} 
                  onValueChange={(value) => setUploadMetadata(prev => ({ ...prev, grade: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Curriculum</Label>
                <Select 
                  value={uploadMetadata.curriculum} 
                  onValueChange={(value) => setUploadMetadata(prev => ({ ...prev, curriculum: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ECZ">ECZ</SelectItem>
                    <SelectItem value="Cambridge">Cambridge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={uploadMetadata.isPublic}
                  onChange={(e) => setUploadMetadata(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
                Make this material public
              </label>
            </div>
            <Button 
              onClick={handleUpload} 
              disabled={uploading || !selectedFile}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {uploading ? 'Uploading...' : 'Upload Material'}
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Popular Materials */}
      {popularMaterials.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Popular Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularMaterials.slice(0, 6).map((material) => (
                <div key={material.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getFileIcon(material.file_type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium truncate">{material.file_name}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">{material.subject}</Badge>
                        <Badge variant="outline">Grade {material.grade}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Downloaded {material.access_count} times
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-2xl">{getFileIcon(material.file_type)}</span>
                <span className="truncate">{material.file_name}</span>
              </CardTitle>
              <CardDescription>
                {material.subject && material.grade && (
                  <span>{material.subject} • Grade {material.grade}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {material.curriculum && (
                  <Badge variant="default">{material.curriculum}</Badge>
                )}
                {material.language && (
                  <Badge variant="secondary">{material.language}</Badge>
                )}
                {material.is_public && (
                  <Badge variant="outline">Public</Badge>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => downloadMaterial(material)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => getFilePreview(material)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                </div>
                
                {material.user_id && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMaterial(material.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                {material.metadata?.size && (
                  <span>Size: {formatFileSize(material.metadata.size)}</span>
                )}
                {material.created_at && (
                  <span className="ml-2">
                    Uploaded: {new Date(material.created_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {materials.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No materials found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or upload some materials to get started.
            </p>
            <Button onClick={() => setShowUploadForm(true)} className="bg-green-500 hover:bg-green-600">
              Upload First Material
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudyMaterialRepository;
