
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  Upload, 
  Search, 
  Download, 
  FileText, 
  Video, 
  Image, 
  File,
  Star,
  Filter,
  Globe,
  Zap,
  BookOpen,
  GraduationCap,
  Users,
  TrendingUp
} from 'lucide-react';
import { useStudyMaterials } from '@/hooks/useStudyMaterials';
import { useAuth } from '@/components/Auth/AuthProvider';

const StudyMaterialRepository = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    materials,
    popularMaterials,
    uploadMaterial,
    searchMaterials,
    downloadMaterial,
    loading,
    error
  } = useStudyMaterials();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    subject: '',
    grade: '',
    curriculum: '',
    language: ''
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload materials.",
        variant: "destructive",
      });
      return;
    }

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      await uploadMaterial(file, {
        subject: filters.subject || 'General',
        grade: parseInt(filters.grade) || 1,
        curriculum: filters.curriculum || 'ECZ',
        language: filters.language || 'English'
      });
      
      clearInterval(interval);
      setUploadProgress(100);
      toast({
        title: "Upload Successful",
        description: "Your study material has been uploaded and is being processed for AI tagging.",
      });
      
      setTimeout(() => {
        setUploadProgress(0);
        setSelectedFile(null);
      }, 2000);
    } catch (error) {
      clearInterval(interval);
      setUploadProgress(0);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      await searchMaterials({
        search: searchQuery,
        subject: filters.subject || undefined,
        grade: filters.grade ? parseInt(filters.grade) : undefined,
        curriculum: filters.curriculum || undefined,
        language: filters.language || undefined
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "There was an error searching materials. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle file download
  const handleDownload = async (material: any) => {
    try {
      await downloadMaterial(material);
      toast({
        title: "Download Started",
        description: `Downloading ${material.file_name}...`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the file.",
        variant: "destructive",
      });
    }
  };

  // Get file icon
  const getFileIcon = (fileType: string) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="w-6 h-6" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Video className="w-6 h-6" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <Image className="w-6 h-6" />;
      default:
        return <File className="w-6 h-6" />;
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🇿🇲 EduZambia Study Repository
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Discover, share, and access educational materials in English, Bemba, Nyanja, and more. 
              Built for Zambian students with AI-powered search and offline support.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">25,000+</div>
                <div className="text-sm opacity-90">Study Materials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">ECZ & Cambridge</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-90">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">99%</div>
                <div className="text-sm opacity-90">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              AI-Powered Multilingual Search
            </CardTitle>
            <CardDescription>
              Search in English, Bemba, Nyanja, or other Zambian languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search materials... (Ufuna ukufunda English, icitaba ca Bemba...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={loading}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select value={filters.subject} onValueChange={(value) => setFilters({...filters, subject: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Bemba">Bemba</SelectItem>
                  <SelectItem value="Nyanja">Nyanja</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.grade} onValueChange={(value) => setFilters({...filters, grade: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: 12}, (_, i) => (
                    <SelectItem key={i+1} value={(i+1).toString()}>Grade {i+1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.curriculum} onValueChange={(value) => setFilters({...filters, curriculum: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Curriculum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ECZ">ECZ (Zambian)</SelectItem>
                  <SelectItem value="Cambridge">Cambridge IGCSE</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.language} onValueChange={(value) => setFilters({...filters, language: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Bemba">Bemba</SelectItem>
                  <SelectItem value="Nyanja">Nyanja</SelectItem>
                  <SelectItem value="Tonga">Tonga</SelectItem>
                  <SelectItem value="Lozi">Lozi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Materials</TabsTrigger>
            <TabsTrigger value="upload">Upload Materials</TabsTrigger>
            <TabsTrigger value="popular">Popular & Trending</TabsTrigger>
          </TabsList>

          {/* Browse Tab */}
          <TabsContent value="browse" className="space-y-6">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading materials...</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getFileIcon(material.file_type)}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{material.file_name}</CardTitle>
                          <CardDescription>
                            {material.subject} • Grade {material.grade} • {material.curriculum}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{material.subject}</Badge>
                      <Badge variant="outline">Grade {material.grade}</Badge>
                      <Badge variant="outline">{material.curriculum}</Badge>
                      <Badge variant="outline">{material.language}</Badge>
                    </div>
                    <Button 
                      onClick={() => handleDownload(material)}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {materials.length === 0 && !loading && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No materials found</h3>
                <p className="text-gray-500">Try adjusting your search filters or upload new materials.</p>
              </div>
            )}
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Study Materials
                </CardTitle>
                <CardDescription>
                  Share your notes, assignments, and study materials with the Zambian learning community
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Drag and Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drag and drop your files here</p>
                  <p className="text-gray-500 mb-4">or click to browse</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        handleFileUpload(file);
                      }
                    }}
                  />
                  <label htmlFor="file-upload">
                    <Button asChild className="cursor-pointer">
                      <span>Choose File</span>
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported: PDF, DOC, DOCX, PPT, PPTX, MP4, AVI, MOV (Max 10MB)
                  </p>
                </div>

                {uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                {/* Upload Metadata Form */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <Select value={filters.subject} onValueChange={(value) => setFilters({...filters, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Subject *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                      <SelectItem value="Bemba">Bemba</SelectItem>
                      <SelectItem value="Nyanja">Nyanja</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.grade} onValueChange={(value) => setFilters({...filters, grade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Grade *" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 12}, (_, i) => (
                        <SelectItem key={i+1} value={(i+1).toString()}>Grade {i+1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.curriculum} onValueChange={(value) => setFilters({...filters, curriculum: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Curriculum *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ECZ">ECZ (Zambian)</SelectItem>
                      <SelectItem value="Cambridge">Cambridge IGCSE</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.language} onValueChange={(value) => setFilters({...filters, language: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Language *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Bemba">Bemba</SelectItem>
                      <SelectItem value="Nyanja">Nyanja</SelectItem>
                      <SelectItem value="Tonga">Tonga</SelectItem>
                      <SelectItem value="Lozi">Lozi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Popular Tab */}
          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularMaterials.map((material, index) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {index < 3 && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                        {getFileIcon(material.file_type)}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{material.file_name}</CardTitle>
                          <CardDescription>
                            {material.subject} • Grade {material.grade} • {material.curriculum}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{material.subject}</Badge>
                      <Badge variant="outline">Grade {material.grade}</Badge>
                      <Badge variant="outline">{material.curriculum}</Badge>
                      {index < 3 && <Badge className="bg-yellow-500">Popular</Badge>}
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>{material.access_count || 0} downloads</span>
                    </div>
                    <Button 
                      onClick={() => handleDownload(material)}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyMaterialRepository;
