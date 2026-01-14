import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Play, Brain, BookOpen, GraduationCap, 
  Youtube, Facebook, MessageCircle, Clock, Search, ExternalLink,
  Sparkles, Target, Trophy, Users, Globe, Smartphone, Video,
  PenTool, Calculator, Beaker, Languages, BookMarked, Lightbulb,
  CheckCircle2, Star, TrendingUp, Zap, Filter, ChevronDown, ChevronRight,
  Upload, Eye, Image, Music, Microscope, Atom, History, MapPin,
  Laptop, Headphones, PieChart, Code, Palette, Dumbbell, Heart,
  Leaf, Scale, Building, Briefcase, Coins, ShoppingBag, Camera,
  Mic, Radio, Newspaper, BookText, Library, ScrollText, Bookmark,
  FolderOpen, Grid3X3, List, RefreshCw, Award, Flame, Rocket
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

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

// Extended Past Papers Data from ZEDPastPapers
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
  { title: "ECZ Physics Paper 1 2024", subject: "Physics", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1physics2024" },
  { title: "ECZ Chemistry Paper 2 2024", subject: "Chemistry", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1chemistry2024" },
  { title: "ECZ Additional Mathematics 2024", subject: "Additional Mathematics", grade: "12", isNew: true, url: "https://drive.google.com/uc?export=download&id=1addmaths2024" },
  { title: "ECZ Religious Education 2024", subject: "Religious Education", grade: "12", isNew: false, url: "https://drive.google.com/uc?export=download&id=1re2024" },
  { title: "ECZ French Paper 1 2024", subject: "French", grade: "12", isNew: false, url: "https://drive.google.com/uc?export=download&id=1french2024" },
];

// Grade 9 Papers
const grade9Papers = [
  { title: "ECZ Mathematics Paper 1 2024 G9", subject: "Mathematics", grade: "9", isNew: true, url: "https://drive.google.com/uc?export=download&id=g9maths1" },
  { title: "ECZ English Paper 2 2024 G9", subject: "English", grade: "9", isNew: true, url: "https://drive.google.com/uc?export=download&id=g9eng2" },
  { title: "ECZ Science Paper 1 2024 G9", subject: "Science", grade: "9", isNew: true, url: "https://drive.google.com/uc?export=download&id=g9sci1" },
  { title: "ECZ Social Studies 2024 G9", subject: "Social Studies", grade: "9", isNew: true, url: "https://drive.google.com/uc?export=download&id=g9ss" },
  { title: "ECZ Zambian Languages 2024 G9", subject: "Zambian Languages", grade: "9", isNew: false, url: "https://drive.google.com/uc?export=download&id=g9zl" },
];

// Grade 7 Papers
const grade7Papers = [
  { title: "ECZ Mathematics 2024 G7", subject: "Mathematics", grade: "7", isNew: true, url: "https://drive.google.com/uc?export=download&id=g7maths" },
  { title: "ECZ English 2024 G7", subject: "English", grade: "7", isNew: true, url: "https://drive.google.com/uc?export=download&id=g7eng" },
  { title: "ECZ Science 2024 G7", subject: "Science", grade: "7", isNew: true, url: "https://drive.google.com/uc?export=download&id=g7sci" },
  { title: "ECZ Social Studies 2024 G7", subject: "Social Studies", grade: "7", isNew: false, url: "https://drive.google.com/uc?export=download&id=g7ss" },
];

const allPapers = [...recentPapers, ...grade9Papers, ...grade7Papers];

const gradeCategories = [
  { grade: "7", label: "Grade 7", description: "Primary school final exams", subjects: ["Mathematics", "English", "Science", "Social Studies", "Zambian Languages", "Creative & Technology Studies"], url: "https://zedpastpapers.com/downloads/grade7/index.html", color: "from-green-500 to-emerald-600" },
  { grade: "9", label: "Grade 9", description: "Junior secondary exams (Form 4)", subjects: ["Mathematics", "English", "Science", "Geography", "History", "Civic Education", "Computer Studies", "Religious Education"], url: "https://zedpastpapers.com/downloads/grade9/index.html", color: "from-blue-500 to-cyan-600" },
  { grade: "12", label: "Grade 12", description: "Senior secondary / GCE exams", subjects: ["Mathematics", "English", "Physics", "Chemistry", "Biology", "Commerce", "Accounts", "Geography", "History", "Computer Studies", "Additional Mathematics"], url: "https://zedpastpapers.com/downloads/grade12/index.html", color: "from-purple-500 to-pink-600" },
];

const quizCategories = [
  { grade: "7", title: "Grade 7 Exam Quizzes", description: "Test yourself with real ECZ Grade 7 questions", url: "https://zedpastpapers.com/quizzes/grade-7-quizzes.html", icon: Target, color: "from-green-500 to-emerald-600" },
  { grade: "9", title: "Grade 9 Exam Quizzes", description: "Practice Form 4 exam questions with answers", url: "https://zedpastpapers.com/quizzes/grade-9-quizzes.html", icon: Brain, color: "from-blue-500 to-cyan-600" },
  { grade: "12", title: "Grade 12 Exam Quizzes", description: "GCE level practice questions", url: "https://zedpastpapers.com/quizzes/grade-12-quizzes.html", icon: Trophy, color: "from-purple-500 to-pink-600" },
];

// Extended Study Sites with more platforms
const studySites = [
  { name: "Khan Academy", description: "Free world-class education with personalized learning", url: "https://www.khanacademy.org", category: "Learning Platform", icon: GraduationCap, features: ["Video lessons", "Practice exercises", "Progress tracking", "Mastery system"], rating: 4.9 },
  { name: "BBC Bitesize", description: "Curriculum-aligned revision and learning support", url: "https://www.bbc.co.uk/bitesize", category: "Revision", icon: BookOpen, features: ["GCSE content", "Interactive quizzes", "Study guides", "Video clips"], rating: 4.7 },
  { name: "Quizlet", description: "Create flashcards and practice quizzes collaboratively", url: "https://quizlet.com", category: "Flashcards", icon: Brain, features: ["Flashcard maker", "Study games", "Collaborative study", "Audio pronunciation"], rating: 4.8 },
  { name: "Coursera", description: "University courses and professional certificates", url: "https://www.coursera.org", category: "MOOCs", icon: GraduationCap, features: ["University courses", "Certificates", "AI guidance", "Free audits"], rating: 4.8 },
  { name: "edX", description: "Learn from top universities worldwide", url: "https://www.edx.org", category: "MOOCs", icon: Globe, features: ["MIT courses", "Harvard courses", "Professional certificates", "MicroMasters"], rating: 4.7 },
  { name: "Duolingo", description: "Learn languages with AI-powered lessons", url: "https://www.duolingo.com", category: "Languages", icon: Languages, features: ["Gamified learning", "AI feedback", "Daily streaks", "40+ languages"], rating: 4.9 },
  { name: "Socratic by Google", description: "AI homework assistant with photo analysis", url: "https://socratic.org", category: "AI Tutor", icon: Sparkles, features: ["Photo answers", "Step explanations", "Multiple subjects", "Free to use"], rating: 4.6 },
  { name: "Brainly", description: "Community learning with AI-enhanced answers", url: "https://brainly.com", category: "Q&A", icon: Users, features: ["Community answers", "AI explanations", "Verified solutions", "All subjects"], rating: 4.5 },
  { name: "Mathway", description: "AI-powered math problem solver", url: "https://www.mathway.com", category: "Math", icon: Calculator, features: ["Step-by-step", "All math levels", "Graph plotting", "Camera input"], rating: 4.7 },
  { name: "SparkNotes", description: "Literature guides and study resources", url: "https://www.sparknotes.com", category: "Literature", icon: BookMarked, features: ["Book summaries", "Character analysis", "Theme guides", "Essay help"], rating: 4.4 },
  { name: "Udemy", description: "On-demand courses with AI-enhanced skill mapping", url: "https://www.udemy.com", category: "Online Courses", icon: Video, features: ["150K+ courses", "Lifetime access", "Certificate", "Mobile app"], rating: 4.6 },
  { name: "Labster", description: "AI/VR simulated science labs with adaptive difficulty", url: "https://www.labster.com", category: "Science Labs", icon: Beaker, features: ["Virtual labs", "VR support", "Adaptive learning", "100+ simulations"], rating: 4.8 },
  { name: "Photomath", description: "Math problem solver with step-by-step explanations", url: "https://photomath.com", category: "Math", icon: Camera, features: ["Camera scan", "Animated steps", "Multiple methods", "Graphing"], rating: 4.9 },
  { name: "Wolfram Alpha", description: "Computational knowledge engine for any calculation", url: "https://www.wolframalpha.com", category: "Computation", icon: Atom, features: ["Math solver", "Science data", "Statistics", "Step-by-step"], rating: 4.7 },
  { name: "Grammarly", description: "AI writing assistant for grammar and style", url: "https://www.grammarly.com", category: "Writing", icon: PenTool, features: ["Grammar check", "Style suggestions", "Plagiarism", "Tone detector"], rating: 4.8 },
  { name: "Brilliant.org", description: "Interactive STEM learning with problem-solving focus", url: "https://brilliant.org", category: "STEM", icon: Lightbulb, features: ["Interactive", "Problem-solving", "Math & Science", "Daily challenges"], rating: 4.7 },
];

// Extended AI Tutor Apps
const aiTutorApps = [
  { name: "QANDA", description: "AI-based homework solver with step-by-step explanations", category: "Homework Helper", rating: 4.8, platform: "iOS/Android", features: ["Photo scan", "Step solutions", "Live tutors"] },
  { name: "Gauth AI", description: "AI study companion for all subjects with instant answers", category: "Study Assistant", rating: 4.7, platform: "iOS/Android", features: ["All subjects", "Essay help", "Quiz mode"] },
  { name: "Talkpal AI", description: "Conversational AI for language practice with native accents", category: "Language Learning", rating: 4.6, platform: "iOS/Android", features: ["77 languages", "Voice chat", "Role-play"] },
  { name: "Sizzle AI", description: "Interactive AI tutor for problem reasoning and critical thinking", category: "Critical Thinking", rating: 4.5, platform: "iOS/Android", features: ["Guided hints", "No direct answers", "Math focus"] },
  { name: "ChatGPT", description: "General AI for tutoring across all subjects and disciplines", category: "General AI", rating: 4.9, platform: "Web/iOS/Android", features: ["All topics", "Essay writing", "Code help"] },
  { name: "Khanmigo", description: "Khan Academy's AI tutor with personalized guidance", category: "Learning Platform", rating: 4.7, platform: "Web", features: ["Socratic method", "Writing coach", "Debate partner"] },
  { name: "Claude AI", description: "Anthropic's AI assistant for complex learning tasks", category: "General AI", rating: 4.8, platform: "Web/iOS", features: ["Long context", "Analysis", "Coding"] },
  { name: "Perplexity AI", description: "AI search engine with citations for research", category: "Research", rating: 4.7, platform: "Web/iOS/Android", features: ["Citations", "Real-time", "Academic"] },
  { name: "Elicit", description: "AI research assistant for academic papers", category: "Research", rating: 4.5, platform: "Web", features: ["Paper search", "Summarize", "Extract data"] },
  { name: "Wyzant", description: "AI-powered tutor matching platform", category: "Live Tutoring", rating: 4.6, platform: "Web/iOS/Android", features: ["Expert tutors", "All subjects", "1-on-1"] },
  { name: "Studyverse", description: "AI-powered study planner and scheduler", category: "Planning", rating: 4.4, platform: "iOS/Android", features: ["Smart scheduling", "Progress tracking", "Reminders"] },
  { name: "Quillbot", description: "AI paraphrasing and writing enhancement tool", category: "Writing", rating: 4.6, platform: "Web/Extension", features: ["Paraphrase", "Summarize", "Grammar check"] },
];

// Extended YouTube Channels
const youtubeChannels = [
  { name: "Khan Academy", subscribers: "8.5M+", focus: "Math, Science, Economics", url: "https://youtube.com/@khanacademy", category: "General" },
  { name: "3Blue1Brown", subscribers: "6M+", focus: "Mathematics Visualized", url: "https://youtube.com/@3blue1brown", category: "Math" },
  { name: "CrashCourse", subscribers: "15M+", focus: "All Subjects", url: "https://youtube.com/@crashcourse", category: "General" },
  { name: "Professor Dave Explains", subscribers: "3.5M+", focus: "Science & Math", url: "https://youtube.com/@ProfessorDaveExplains", category: "Science" },
  { name: "Organic Chemistry Tutor", subscribers: "7M+", focus: "Math, Chemistry, Physics", url: "https://youtube.com/@TheOrganicChemistryTutor", category: "Science" },
  { name: "Physics Wallah", subscribers: "12M+", focus: "Physics & Chemistry", url: "https://youtube.com/@PhysicsWallah", category: "Science" },
  { name: "Numberphile", subscribers: "4.5M+", focus: "Number Theory & Math", url: "https://youtube.com/@numberphile", category: "Math" },
  { name: "Veritasium", subscribers: "15M+", focus: "Science & Engineering", url: "https://youtube.com/@veritasium", category: "Science" },
  { name: "SmarterEveryDay", subscribers: "11M+", focus: "Science Experiments", url: "https://youtube.com/@smartereveryday", category: "Science" },
  { name: "TED-Ed", subscribers: "19M+", focus: "Educational Animations", url: "https://youtube.com/@TEDEd", category: "General" },
  { name: "Kurzgesagt", subscribers: "22M+", focus: "Science & Philosophy", url: "https://youtube.com/@kurzgesagt", category: "Science" },
  { name: "Mark Rober", subscribers: "27M+", focus: "Engineering & Science", url: "https://youtube.com/@MarkRober", category: "Engineering" },
  { name: "Vsauce", subscribers: "18M+", focus: "Science & Philosophy", url: "https://youtube.com/@Vsauce", category: "Science" },
  { name: "MinutePhysics", subscribers: "5.5M+", focus: "Physics Explained", url: "https://youtube.com/@MinutePhysics", category: "Physics" },
  { name: "freeCodeCamp", subscribers: "9M+", focus: "Programming & CS", url: "https://youtube.com/@freecodecamp", category: "Tech" },
  { name: "The Coding Train", subscribers: "1.8M+", focus: "Creative Coding", url: "https://youtube.com/@TheCodingTrain", category: "Tech" },
];

// Extended Social Groups
const socialGroups = [
  { platform: "Facebook", name: "ECZ Past Papers Discussion", members: "50K+", type: "Study Group", url: "https://facebook.com/groups/eczpastpapers" },
  { platform: "Facebook", name: "Zambian Students Hub", members: "35K+", type: "Community", url: "https://facebook.com/groups/zambianstudents" },
  { platform: "Facebook", name: "Grade 12 Mathematics Help", members: "28K+", type: "Subject Group", url: "https://facebook.com/groups/g12maths" },
  { platform: "Facebook", name: "Science Students Zambia", members: "22K+", type: "Subject Group", url: "https://facebook.com/groups/sciencezm" },
  { platform: "WhatsApp", name: "Grade 12 Study Circles", members: "5K+", type: "Chat Groups", url: "#" },
  { platform: "WhatsApp", name: "ECZ Exam Prep 2024", members: "3K+", type: "Chat Groups", url: "#" },
  { platform: "Telegram", name: "ECZ Resources Channel", members: "15K+", type: "Resource Sharing", url: "https://t.me/eczresources" },
  { platform: "Telegram", name: "Zambian Scholarships", members: "12K+", type: "Opportunities", url: "https://t.me/zmscholarships" },
  { platform: "Discord", name: "African Students Study Hall", members: "8K+", type: "Community", url: "https://discord.gg/studyhall" },
  { platform: "Reddit", name: "r/ZambiaEducation", members: "5K+", type: "Community", url: "https://reddit.com/r/zambiaeducation" },
];

// Extended Productivity Tools
const productivityTools = [
  { name: "Notion", description: "All-in-one workspace for notes, docs, and databases", category: "Notes", icon: PenTool, url: "https://notion.so" },
  { name: "Obsidian", description: "Knowledge base with linked notes and graphs", category: "Notes", icon: Brain, url: "https://obsidian.md" },
  { name: "Anki", description: "Spaced repetition flashcards for long-term memory", category: "Memory", icon: BookOpen, url: "https://apps.ankiweb.net" },
  { name: "Forest App", description: "Stay focused and grow virtual trees", category: "Focus", icon: Leaf, url: "https://forestapp.cc" },
  { name: "Todoist", description: "Task management and to-do lists", category: "Productivity", icon: CheckCircle2, url: "https://todoist.com" },
  { name: "Google Keep", description: "Quick notes, lists, and reminders", category: "Notes", icon: Lightbulb, url: "https://keep.google.com" },
  { name: "Canva", description: "Create study materials and presentations", category: "Design", icon: Palette, url: "https://canva.com" },
  { name: "Miro", description: "Collaborative whiteboard for mind maps", category: "Collaboration", icon: Grid3X3, url: "https://miro.com" },
  { name: "Trello", description: "Visual project management boards", category: "Organization", icon: List, url: "https://trello.com" },
  { name: "Focus@Will", description: "Music scientifically designed for focus", category: "Focus", icon: Headphones, url: "https://focusatwill.com" },
  { name: "Pomofocus", description: "Simple Pomodoro timer for study sessions", category: "Focus", icon: Clock, url: "https://pomofocus.io" },
  { name: "RescueTime", description: "Track time spent on apps and websites", category: "Analytics", icon: PieChart, url: "https://rescuetime.com" },
];

// African EdTech Platforms
const africanEdtech = [
  { name: "uLesson", description: "African EdTech platform with personalized video lessons", url: "https://ulesson.com", country: "Nigeria", features: ["Video lessons", "Practice tests", "Offline access"] },
  { name: "Gradely", description: "AI-focused tutoring and assessment platform", url: "https://gradely.co", country: "Nigeria", features: ["AI tutor", "Assessments", "Progress tracking"] },
  { name: "ScholarX", description: "Scholarship search platform for African students", url: "https://scholar-x.com", country: "Africa-wide", features: ["Scholarships", "Applications", "Notifications"] },
  { name: "M-Shule", description: "SMS-based personalized education delivery", url: "https://m-shule.com", country: "Kenya", features: ["SMS learning", "No internet needed", "Adaptive"] },
  { name: "Eneza Education", description: "Mobile learning platform for underserved communities", url: "https://enezaeducation.com", country: "Kenya", features: ["USSD/SMS", "Low data", "Curriculum aligned"] },
  { name: "Tuteria", description: "On-demand tutoring marketplace", url: "https://tuteria.com", country: "Nigeria", features: ["Live tutors", "All subjects", "Verified tutors"] },
];

// Subject Icons mapping
const subjectIcons: { [key: string]: React.ElementType } = {
  Mathematics: Calculator,
  English: BookOpen,
  Science: Beaker,
  Physics: Atom,
  Chemistry: Beaker,
  Biology: Microscope,
  Geography: MapPin,
  History: History,
  "Computer Studies": Laptop,
  "Civic Education": Scale,
  "Social Studies": Users,
  Commerce: Briefcase,
  Accounts: Coins,
  "Religious Education": Heart,
  French: Languages,
  "Additional Mathematics": Calculator,
};

const StudyToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoadingMaterials(true);
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoadingMaterials(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType?.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType?.includes('video')) return <Video className="w-5 h-5 text-blue-500" />;
    if (fileType?.includes('image')) return <Image className="w-5 h-5 text-green-500" />;
    if (fileType?.includes('audio')) return <Music className="w-5 h-5 text-purple-500" />;
    return <BookOpen className="w-5 h-5 text-muted-foreground" />;
  };

  const handleDownload = (url: string, title: string) => {
    window.open(url, '_blank');
    toast({
      title: "Download Started",
      description: `${title} is being downloaded`,
    });
  };

  const filteredPapers = allPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || paper.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject;
    return matchesSearch && matchesGrade && matchesSubject;
  });

  const subjects = [...new Set(allPapers.map(p => p.subject))];

  const stats = [
    { label: "Past Papers", value: "500+", icon: FileText, color: "from-blue-500 to-cyan-500" },
    { label: "Subjects", value: "25+", icon: BookOpen, color: "from-green-500 to-emerald-500" },
    { label: "Study Sites", value: "50+", icon: Globe, color: "from-purple-500 to-pink-500" },
    { label: "AI Tutors", value: "12+", icon: Sparkles, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Study Tools & Resources
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Access ECZ past papers, AI tutors, global learning platforms, and curated study resources—all in one place.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search papers, subjects, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-full border-2 border-primary/20 focus:border-primary"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-md bg-gradient-to-br from-card to-muted/50">
                    <CardContent className="p-4 text-center">
                      <div className={`w-10 h-10 mx-auto rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mb-2`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="papers" className="space-y-6">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-2">
            {[
              { value: "papers", label: "Past Papers", icon: FileText },
              { value: "materials", label: "My Materials", icon: FolderOpen },
              { value: "quizzes", label: "Quizzes", icon: Target },
              { value: "sites", label: "Study Sites", icon: Globe },
              { value: "ai-tutors", label: "AI Tutors", icon: Sparkles },
              { value: "african", label: "African EdTech", icon: Rocket },
              { value: "youtube", label: "YouTube", icon: Youtube },
              { value: "social", label: "Social Groups", icon: Users },
              { value: "tools", label: "Productivity", icon: Zap },
            ].map(tab => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5 rounded-full"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Past Papers Tab */}
          <TabsContent value="papers" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="7">Grade 7</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2 ml-auto">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grade Selection Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {gradeCategories.map((grade, index) => (
                <motion.div
                  key={grade.grade}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 cursor-pointer h-full overflow-hidden"
                    onClick={() => window.open(grade.url, '_blank')}
                  >
                    <div className={`h-2 bg-gradient-to-r ${grade.color}`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-lg px-4 py-1">
                          {grade.label}
                        </Badge>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardTitle className="text-lg mt-2">{grade.description}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5">
                        {grade.subjects.slice(0, 5).map(subject => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {grade.subjects.length > 5 && (
                          <Badge variant="outline" className="text-xs bg-primary/10">
                            +{grade.subjects.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Papers List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Available Past Papers ({filteredPapers.length})
                </CardTitle>
                <CardDescription>Download ECZ exam papers for practice</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-3' : 'space-y-2'}>
                    {filteredPapers.map((paper, index) => {
                      const SubjectIcon = subjectIcons[paper.subject] || FileText;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <SubjectIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{paper.title}</span>
                                {paper.isNew && (
                                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-xs">
                                    NEW
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">{paper.subject}</Badge>
                                <span>Grade {paper.grade}</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDownload(paper.url, paper.title)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Visit ZEDPastPapers CTA */}
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
              <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">Need More Past Papers?</h3>
                  <p className="text-muted-foreground">Visit ZEDPastPapers for the complete collection of ECZ exam papers</p>
                </div>
                <Button size="lg" onClick={() => window.open('https://zedpastpapers.com', '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit ZEDPastPapers
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  My Study Materials
                </CardTitle>
                <CardDescription>Access your uploaded study materials from the database</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingMaterials ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-4">
                          <div className="h-4 bg-muted rounded mb-3"></div>
                          <div className="h-3 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : materials.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No materials yet</h3>
                    <p className="text-muted-foreground mb-4">Upload your study materials to access them here</p>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Material
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {materials.map((material) => (
                      <Card key={material.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            {getFileIcon(material.file_type)}
                            <Badge variant="outline" className="text-xs">{material.curriculum}</Badge>
                          </div>
                          <h3 className="font-semibold mb-2 line-clamp-2">{material.file_name}</h3>
                          <div className="flex flex-wrap gap-1 mb-3">
                            <Badge variant="secondary" className="text-xs">{material.subject}</Badge>
                            <Badge variant="outline" className="text-xs">{material.grade}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {quizCategories.map((quiz, index) => (
                <motion.div
                  key={quiz.grade}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${quiz.color}`} />
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${quiz.color} flex items-center justify-center mb-4`}>
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Quiz Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { icon: CheckCircle2, title: "Real ECZ Questions", desc: "Actual exam questions" },
                    { icon: Target, title: "Instant Feedback", desc: "Know immediately" },
                    { icon: TrendingUp, title: "Progress Tracking", desc: "See improvement" },
                    { icon: Flame, title: "Streak System", desc: "Stay motivated" },
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
          <TabsContent value="sites" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {studySites.map((site, index) => (
                <motion.div
                  key={site.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <site.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm">{site.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base mt-2">{site.name}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-xs">{site.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{site.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {site.features.slice(0, 2).map(feature => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={() => window.open(site.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* AI Tutors Tab */}
          <TabsContent value="ai-tutors" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {aiTutorApps.map((app, index) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-primary/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">{app.category}</Badge>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{app.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        {app.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
                      <Badge variant="outline" className="text-xs mb-3">{app.platform}</Badge>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {app.features.map(feature => (
                          <Badge key={feature} variant="outline" className="text-xs bg-primary/5">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Get App
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
              <CardHeader>
                <CardTitle>Why Use AI Tutors?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { title: "24/7 Availability", desc: "Get help anytime", icon: Clock },
                    { title: "Personalized", desc: "AI adapts to you", icon: Brain },
                    { title: "Step-by-Step", desc: "Understand the why", icon: Lightbulb },
                    { title: "Multi-Language", desc: "Learn in your language", icon: Languages },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-card">
                      <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* African EdTech Tab */}
          <TabsContent value="african" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-red-500/10 border-2 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-green-600" />
                  African EdTech Platforms
                </CardTitle>
                <CardDescription>Education technology built for Africa, by Africans</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {africanEdtech.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <Badge variant="secondary">{platform.country}</Badge>
                      </div>
                      <CardDescription>{platform.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {platform.features.map(feature => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(platform.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Platform
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* YouTube Tab */}
          <TabsContent value="youtube" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {youtubeChannels.map((channel, index) => (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-red-500/30">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                          <Youtube className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{channel.name}</h4>
                          <p className="text-xs text-muted-foreground">{channel.subscribers} subs</p>
                        </div>
                      </div>
                      <Badge className="mb-3" variant="secondary">{channel.category}</Badge>
                      <p className="text-sm text-muted-foreground mb-3">{channel.focus}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                        onClick={() => window.open(channel.url, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  TikTok Study Content
                </CardTitle>
                <CardDescription>Short-form revision tips and memory tricks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["#ECZPrep", "#ZambiaStudents", "#ExamRevision", "#MathTricks", "#StudyTips", "#PastPapers", "#Grade12", "#StudyMotivation", "#ScienceHacks", "#ExamSuccess"].map(tag => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Groups Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {socialGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        group.platform === 'Facebook' ? 'bg-blue-500/10' :
                        group.platform === 'WhatsApp' ? 'bg-green-500/10' :
                        group.platform === 'Telegram' ? 'bg-sky-500/10' :
                        group.platform === 'Discord' ? 'bg-indigo-500/10' :
                        'bg-orange-500/10'
                      }`}>
                        {group.platform === 'Facebook' ? <Facebook className="w-6 h-6 text-blue-500" /> :
                         group.platform === 'Discord' ? <MessageCircle className="w-6 h-6 text-indigo-500" /> :
                         <MessageCircle className={`w-6 h-6 ${
                           group.platform === 'WhatsApp' ? 'text-green-500' :
                           group.platform === 'Telegram' ? 'text-sky-500' :
                           'text-orange-500'
                         }`} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{group.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">{group.platform}</Badge>
                          <Badge variant="secondary" className="text-xs">{group.type}</Badge>
                          <span>{group.members}</span>
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

            <Card className="bg-gradient-to-r from-blue-500/5 via-green-500/5 to-purple-500/5">
              <CardHeader>
                <CardTitle>Study Group Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Share past papers and notes with fellow students",
                    "Ask questions and help others understand difficult topics",
                    "Form study circles for specific subjects",
                    "Use voice notes for quick explanations",
                    "Stay consistent with group study sessions",
                  ].map((tip, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Productivity Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {productivityTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{tool.name}</h4>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        <Badge variant="outline" className="mt-1 text-xs">{tool.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Effective Study Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Pomodoro Technique", desc: "Study for 25 minutes, break for 5. Repeat 4 times, then take a longer break." },
                    { title: "Spaced Repetition", desc: "Review material at increasing intervals to improve long-term retention." },
                    { title: "Active Recall", desc: "Test yourself frequently instead of just re-reading notes." },
                    { title: "Feynman Technique", desc: "Explain concepts in simple terms to solidify your understanding." },
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
