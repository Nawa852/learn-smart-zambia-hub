import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, FileText, Bookmark, Search, Plus, Filter,
  Clock, Star, Tag, MoreVertical, Download, Share2, Trash2,
  Brain, Lightbulb, BookOpen, Video, Link, Image,
  ChevronRight, SortAsc, Grid, List
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const KnowledgeRepositoryPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const folders = [
    { name: 'Mathematics', items: 24, color: 'bg-blue-500' },
    { name: 'Science', items: 18, color: 'bg-green-500' },
    { name: 'English', items: 15, color: 'bg-purple-500' },
    { name: 'History', items: 12, color: 'bg-orange-500' },
    { name: 'Geography', items: 8, color: 'bg-cyan-500' },
  ];

  const recentNotes = [
    {
      id: 1,
      title: 'Quadratic Equations Summary',
      type: 'note',
      subject: 'Mathematics',
      lastModified: '2 hours ago',
      starred: true,
      aiIndexed: true,
      tags: ['algebra', 'formulas', 'exam-prep']
    },
    {
      id: 2,
      title: 'Chemical Bonding Notes',
      type: 'note',
      subject: 'Chemistry',
      lastModified: '5 hours ago',
      starred: false,
      aiIndexed: true,
      tags: ['chemistry', 'bonds', 'molecules']
    },
    {
      id: 3,
      title: 'Physics Lab Report',
      type: 'document',
      subject: 'Physics',
      lastModified: 'Yesterday',
      starred: true,
      aiIndexed: true,
      tags: ['lab', 'experiment', 'report']
    },
    {
      id: 4,
      title: 'Essay: Climate Change',
      type: 'document',
      subject: 'English',
      lastModified: '2 days ago',
      starred: false,
      aiIndexed: true,
      tags: ['essay', 'environment']
    },
  ];

  const bookmarks = [
    {
      id: 1,
      title: 'Khan Academy - Calculus',
      url: 'https://khanacademy.org',
      type: 'link',
      subject: 'Mathematics',
      savedOn: 'Last week'
    },
    {
      id: 2,
      title: 'Photosynthesis Explained',
      url: 'https://youtube.com',
      type: 'video',
      subject: 'Biology',
      savedOn: '3 days ago'
    },
    {
      id: 3,
      title: 'Periodic Table Reference',
      url: 'https://example.com',
      type: 'link',
      subject: 'Chemistry',
      savedOn: 'Yesterday'
    },
  ];

  const moduleSummaries = [
    {
      id: 1,
      title: 'Chapter 5: Quadratic Functions',
      course: 'Advanced Mathematics',
      completion: 100,
      keyPoints: 8,
      generated: '2 days ago'
    },
    {
      id: 2,
      title: 'Unit 3: Chemical Reactions',
      course: 'Chemistry Grade 12',
      completion: 85,
      keyPoints: 6,
      generated: 'Last week'
    },
    {
      id: 3,
      title: 'Module 2: Cell Biology',
      course: 'Biology Essentials',
      completion: 100,
      keyPoints: 10,
      generated: '5 days ago'
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'note': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'document': return <BookOpen className="w-5 h-5 text-green-500" />;
      case 'video': return <Video className="w-5 h-5 text-red-500" />;
      case 'link': return <Link className="w-5 h-5 text-purple-500" />;
      case 'image': return <Image className="w-5 h-5 text-orange-500" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Personal Knowledge Repository
            </h1>
            <p className="text-muted-foreground mt-1">Your AI-indexed library of notes, bookmarks, and summaries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Brain className="w-4 h-4 mr-2" /> AI Search
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Content
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search your knowledge base with AI..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
              <Button variant="outline">
                <SortAsc className="w-4 h-4 mr-2" /> Sort
              </Button>
              <div className="flex border rounded-md">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Folders */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Quick Access Folders
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {folders.map((folder, index) => (
            <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${folder.color} bg-opacity-20 flex items-center justify-center`}>
                    <FolderOpen className={`w-5 h-5 ${folder.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{folder.name}</p>
                    <p className="text-xs text-muted-foreground">{folder.items} items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="notes">Notes & Documents</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="summaries">Module Summaries</TabsTrigger>
        </TabsList>

        <TabsContent value="notes">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
            {recentNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        {getTypeIcon(note.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                              {note.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{note.subject}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {note.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" /> Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 mr-2" /> Share
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{note.lastModified}</span>
                          {note.aiIndexed && (
                            <>
                              <Brain className="w-3 h-3 text-primary" />
                              <span className="text-primary">AI Indexed</span>
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks">
          <div className="space-y-4">
            {bookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          {getTypeIcon(bookmark.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{bookmark.title}</h3>
                          <p className="text-sm text-muted-foreground">{bookmark.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1">Saved {bookmark.savedOn}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Link className="w-4 h-4 mr-1" /> Open
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="summaries">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">AI-Generated Summaries</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic summaries of completed modules with key points extracted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {moduleSummaries.map((summary, index) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{summary.title}</h3>
                          <p className="text-sm text-muted-foreground">{summary.course}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Brain className="w-3 h-3" /> {summary.keyPoints} key points
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Generated {summary.generated}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm">
                        View Summary <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeRepositoryPage;
