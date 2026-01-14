import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Play, Brain, BookOpen, GraduationCap, 
  Youtube, Facebook, MessageCircle, Clock, Search, ExternalLink,
  Sparkles, Target, Trophy, Users, Globe, Smartphone, Video,
  PenTool, Calculator, Beaker, Languages, BookMarked, Lightbulb,
  CheckCircle2, Star, TrendingUp, Zap, Filter, ChevronDown, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Past Papers Data from ZEDPastPapers
const recentPapers = [
  { title: "ECZ Mathematics Paper 2 2024", subject: "Mathematics", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1lPGj6KTd84khlbkjymiTJCAr_QI7YhKm" },
  { title: "ECZ Science Paper 2 2024 GCE", subject: "Science", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1tzuTg-FgEjR63RlfsKqlEjUwco9iRKsm" },
  { title: "ECZ Science Paper 1 2024 GCE", subject: "Science", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1AalvzQ9qTOqF6FwX3S8HtT4vGbH_fENN" },
  { title: "ECZ English Paper 1 2024", subject: "English", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1IKpTOqNy53qG4en7grBANrtI_yV75RAl" },
  { title: "ECZ Biology Paper 2 2024", subject: "Biology", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1JnqbEs6Uz91gQU2n-Swzjy_3pvT9xK6n" },
  { title: "ECZ Civic Education 2024", subject: "Civic Education", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1_Za8rkJG0zHrqhQhk8I-U6afCZXAcfDm" },
  { title: "ECZ Geography Paper 1 2024", subject: "Geography", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=12ricMGn5wA202L2Sf1K-6goRe2kEpq6s" },
  { title: "ECZ History Paper 2 2024", subject: "History", grade: "12", isNew: false, url: "https://drive.google.com/uc?export=download&id=1zAOiAZZfil9vGtCk33eAumHeRpudEVrp" },
  { title: "ECZ Computer Studies Paper 1 2024", subject: "Computer Studies", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1tSAno9MV-DnxI4NJ9TfwPuMO4Chp_ZkB" },
  { title: "ECZ Social Studies 2024 GCE", subject: "Social Studies", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1owJ8qO61BxJGLbbHb-s9jEpDEIRplWDq" },
];

const gradeCategories = [
  { grade: "7", label: "Grade 7", description: "Primary school final exams", subjects: ["Mathematics", "English", "Science", "Social Studies", "Zambian Languages"], url: "https://zedpastpapers.com/downloads/grade7/index.html" },
  { grade: "9", label: "Grade 9", description: "Junior secondary exams (Form 4)", subjects: ["Mathematics", "English", "Science", "Geography", "History", "Civic Education"], url: "https://zedpastpapers.com/downloads/grade9/index.html" },
  { grade: "12", label: "Grade 12", description: "Senior secondary / GCE exams", subjects: ["Mathematics", "English", "Physics", "Chemistry", "Biology", "Commerce", "Accounts"], url: "https://zedpastpapers.com/downloads/grade12/index.html" },
];

const quizCategories = [
  { grade: "7", title: "Grade 7 Exam Quizzes", description: "Test yourself with real ECZ Grade 7 questions", url: "https://zedpastpapers.com/quizzes/grade-7-quizzes.html", icon: Target },
  { grade: "9", title: "Grade 9 Exam Quizzes", description: "Practice Form 4 exam questions with answers", url: "https://zedpastpapers.com/quizzes/grade-9-quizzes.html", icon: Brain },
  { grade: "12", title: "Grade 12 Exam Quizzes", description: "GCE level practice questions", url: "https://zedpastpapers.com/quizzes/grade-12-quizzes.html", icon: Trophy },
];

const studySites = [
  { name: "Khan Academy", description: "Free world-class education with personalized learning", url: "https://www.khanacademy.org", category: "Learning Platform", icon: GraduationCap, features: ["Video lessons", "Practice exercises", "Progress tracking"] },
  { name: "BBC Bitesize", description: "Curriculum-aligned revision and learning support", url: "https://www.bbc.co.uk/bitesize", category: "Revision", icon: BookOpen, features: ["GCSE content", "Interactive quizzes", "Study guides"] },
  { name: "Quizlet", description: "Create flashcards and practice quizzes collaboratively", url: "https://quizlet.com", category: "Flashcards", icon: Brain, features: ["Flashcard maker", "Study games", "Collaborative study"] },
  { name: "Coursera", description: "University courses and professional certificates", url: "https://www.coursera.org", category: "MOOCs", icon: GraduationCap, features: ["University courses", "Certificates", "AI guidance"] },
  { name: "edX", description: "Learn from top universities worldwide", url: "https://www.edx.org", category: "MOOCs", icon: Globe, features: ["MIT courses", "Harvard courses", "Professional certificates"] },
  { name: "Duolingo", description: "Learn languages with AI-powered lessons", url: "https://www.duolingo.com", category: "Languages", icon: Languages, features: ["Gamified learning", "AI feedback", "Daily streaks"] },
  { name: "Socratic by Google", description: "AI homework assistant with photo analysis", url: "https://socratic.org", category: "AI Tutor", icon: Sparkles, features: ["Photo answers", "Step explanations", "Multiple subjects"] },
  { name: "Brainly", description: "Community learning with AI-enhanced answers", url: "https://brainly.com", category: "Q&A", icon: Users, features: ["Community answers", "AI explanations", "Verified solutions"] },
  { name: "Mathway", description: "AI-powered math problem solver", url: "https://www.mathway.com", category: "Math", icon: Calculator, features: ["Step-by-step", "All math levels", "Graph plotting"] },
  { name: "SparkNotes", description: "Literature guides and study resources", url: "https://www.sparknotes.com", category: "Literature", icon: BookMarked, features: ["Book summaries", "Character analysis", "Theme guides"] },
];

const aiTutorApps = [
  { name: "QANDA", description: "AI-based homework solver with step-by-step explanations", category: "Homework Helper", rating: 4.8 },
  { name: "Gauth AI", description: "AI study companion for all subjects", category: "Study Assistant", rating: 4.7 },
  { name: "Talkpal AI", description: "Conversational AI for language practice", category: "Language Learning", rating: 4.6 },
  { name: "Sizzle AI", description: "Interactive AI tutor for problem reasoning", category: "Critical Thinking", rating: 4.5 },
  { name: "ChatGPT", description: "General AI for tutoring across all subjects", category: "General AI", rating: 4.9 },
  { name: "Khanmigo", description: "Khan Academy's AI tutor", category: "Learning Platform", rating: 4.7 },
];

const youtubeChannels = [
  { name: "Khan Academy", subscribers: "8M+", focus: "Math, Science, Economics", url: "https://youtube.com/@khanacademy" },
  { name: "3Blue1Brown", subscribers: "5M+", focus: "Mathematics Visualized", url: "https://youtube.com/@3blue1brown" },
  { name: "CrashCourse", subscribers: "15M+", focus: "All Subjects", url: "https://youtube.com/@crashcourse" },
  { name: "Professor Dave Explains", subscribers: "3M+", focus: "Science & Math", url: "https://youtube.com/@ProfessorDaveExplains" },
  { name: "Organic Chemistry Tutor", subscribers: "6M+", focus: "Math & Chemistry", url: "https://youtube.com/@TheOrganicChemistryTutor" },
  { name: "Physics Wallah", subscribers: "10M+", focus: "Physics & Chemistry", url: "https://youtube.com/@PhysicsWallah" },
];

const socialGroups = [
  { platform: "Facebook", name: "ECZ Past Papers Discussion", members: "50K+", type: "Study Group", url: "https://facebook.com/groups" },
  { platform: "Facebook", name: "Zambian Students Hub", members: "30K+", type: "Community", url: "https://facebook.com/groups" },
  { platform: "WhatsApp", name: "Grade 12 Study Groups", members: "Various", type: "Chat Groups", url: "#" },
  { platform: "Telegram", name: "ECZ Resources Channel", members: "10K+", type: "Resource Sharing", url: "https://t.me" },
];

const productivityTools = [
  { name: "Notion", description: "All-in-one workspace for notes and planning", category: "Notes", icon: PenTool },
  { name: "Pomodoro Timer", description: "Focus technique for productive study sessions", category: "Focus", icon: Clock },
  { name: "Anki", description: "Spaced repetition flashcards", category: "Memory", icon: Brain },
  { name: "Forest App", description: "Stay focused and grow virtual trees", category: "Focus", icon: Target },
  { name: "Google Keep", description: "Quick notes and reminders", category: "Notes", icon: Lightbulb },
  { name: "Canva", description: "Create study materials and presentations", category: "Design", icon: PenTool },
];

const StudyToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("papers");

  const filteredPapers = recentPapers.filter(paper => 
    paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
        <motion.div 
          className="container mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" /> Powered by ZEDPastPapers & BrightSphere AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Study Tools & Resources
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access ECZ past papers, interactive quizzes, AI tutors, and curated learning resources—all in one place.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search papers, subjects, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-full border-2 border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="papers" className="space-y-8">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-2">
            {[
              { value: "papers", label: "Past Papers", icon: FileText },
              { value: "quizzes", label: "Quizzes", icon: Target },
              { value: "sites", label: "Study Sites", icon: Globe },
              { value: "ai-tutors", label: "AI Tutors", icon: Sparkles },
              { value: "youtube", label: "YouTube", icon: Youtube },
              { value: "social", label: "Social Groups", icon: Users },
              { value: "tools", label: "Productivity", icon: Zap },
            ].map(tab => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 rounded-full"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Past Papers Tab */}
          <TabsContent value="papers" className="space-y-8">
            {/* Grade Selection */}
            <div className="grid md:grid-cols-3 gap-6">
              {gradeCategories.map((grade, index) => (
                <motion.div
                  key={grade.grade}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 cursor-pointer h-full"
                    onClick={() => window.open(grade.url, '_blank')}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-lg px-4 py-1">
                          {grade.label}
                        </Badge>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardTitle className="text-xl mt-2">{grade.description}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {grade.subjects.slice(0, 5).map(subject => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {grade.subjects.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{grade.subjects.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Papers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Uploads from ZEDPastPapers
                </CardTitle>
                <CardDescription>Latest ECZ exam papers available for download</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {filteredPapers.map((paper, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{paper.title}</span>
                              {paper.isNew && (
                                <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-xs">
                                  NEW
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">{paper.subject}</Badge>
                              <span>Grade {paper.grade}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(paper.url, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Visit ZEDPastPapers CTA */}
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
              <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Need More Past Papers?</h3>
                  <p className="text-muted-foreground">Visit ZEDPastPapers for the complete collection of ECZ exam papers</p>
                </div>
                <Button size="lg" onClick={() => window.open('https://zedpastpapers.com', '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit ZEDPastPapers
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {quizCategories.map((quiz, index) => (
                <motion.div
                  key={quiz.grade}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <quiz.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{quiz.title}</CardTitle>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button 
                        className="w-full"
                        onClick={() => window.open(quiz.url, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quiz Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Interactive Quiz Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { icon: CheckCircle2, title: "Real ECZ Questions", desc: "Actual exam questions from past papers" },
                    { icon: Target, title: "Instant Feedback", desc: "Know if you're right immediately" },
                    { icon: TrendingUp, title: "Progress Tracking", desc: "See your improvement over time" },
                    { icon: Brain, title: "Adaptive Difficulty", desc: "Questions adjust to your level" },
                  ].map((feature, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                      <feature.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Sites Tab */}
          <TabsContent value="sites" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studySites.map((site, index) => (
                <motion.div
                  key={site.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <site.icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="secondary">{site.category}</Badge>
                      </div>
                      <CardTitle className="text-lg mt-3">{site.name}</CardTitle>
                      <CardDescription>{site.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {site.features.map(feature => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={() => window.open(site.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* AI Tutors Tab */}
          <TabsContent value="ai-tutors" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiTutorApps.map((app, index) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{app.category}</Badge>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{app.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        {app.name}
                      </CardTitle>
                      <CardDescription>{app.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Get App
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* AI Features */}
            <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
              <CardHeader>
                <CardTitle>Why Use AI Tutors?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "24/7 Availability", desc: "Get help anytime, anywhere", icon: Clock },
                    { title: "Personalized Learning", desc: "AI adapts to your pace", icon: Brain },
                    { title: "Step-by-Step Solutions", desc: "Understand the 'why' behind answers", icon: Lightbulb },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* YouTube Tab */}
          <TabsContent value="youtube" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youtubeChannels.map((channel, index) => (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-red-500/30">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                          <Youtube className="w-7 h-7 text-red-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{channel.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge className="mb-4">{channel.focus}</Badge>
                      <Button 
                        variant="outline" 
                        className="w-full border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                        onClick={() => window.open(channel.url, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Videos
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* TikTok Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  TikTok Study Tips
                </CardTitle>
                <CardDescription>Short-form content for quick revision and memory tips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["#ECZPrep", "#ZambiaStudents", "#ExamRevision", "#MathTricks", "#StudyTips", "#PastPapers", "#Grade12", "#StudyMotivation"].map(tag => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Groups Tab */}
          <TabsContent value="social" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {socialGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="flex items-center gap-4 py-6">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        group.platform === 'Facebook' ? 'bg-blue-500/10' :
                        group.platform === 'WhatsApp' ? 'bg-green-500/10' :
                        'bg-sky-500/10'
                      }`}>
                        {group.platform === 'Facebook' ? (
                          <Facebook className="w-7 h-7 text-blue-500" />
                        ) : group.platform === 'WhatsApp' ? (
                          <MessageCircle className="w-7 h-7 text-green-500" />
                        ) : (
                          <MessageCircle className="w-7 h-7 text-sky-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{group.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{group.type}</Badge>
                          <span>{group.members} members</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => window.open(group.url, '_blank')}>
                        Join
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Community Tips */}
            <Card className="bg-gradient-to-r from-blue-500/5 via-green-500/5 to-purple-500/5">
              <CardHeader>
                <CardTitle>Study Group Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Share past papers and notes with fellow students",
                    "Ask questions and help others understand difficult topics",
                    "Form study circles for specific subjects",
                    "Use voice notes for quick explanations",
                    "Stay consistent with group study sessions",
                  ].map((tip, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Productivity Tools Tab */}
          <TabsContent value="tools" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productivityTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="flex items-center gap-4 py-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{tool.name}</h4>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">{tool.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Study Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Effective Study Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Pomodoro Technique", desc: "Study for 25 minutes, break for 5. Repeat 4 times, then take a longer break." },
                    { title: "Spaced Repetition", desc: "Review material at increasing intervals to improve long-term retention." },
                    { title: "Active Recall", desc: "Test yourself frequently instead of just re-reading notes." },
                    { title: "Teach What You Learn", desc: "Explain concepts to others to solidify your understanding." },
                  ].map((strategy, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">{strategy.title}</h4>
                      <p className="text-sm text-muted-foreground">{strategy.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyToolsPage;
