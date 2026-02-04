import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Download, ExternalLink, BookOpen, Video, FileText, 
  Globe, GraduationCap, Library, Youtube, Users, Building2,
  Folder, Play, File, Database, BarChart3, Map, Heart,
  School, Microscope, Calculator, BookMarked, Languages, Music
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'drive' | 'app';
  category: string;
  grade?: string;
  subject?: string;
  url: string;
  source: string;
  isExternal?: boolean;
}

const ZambianResourcesHubPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // ECZ Past Papers
  const eczPastPapers: Resource[] = [
    { id: 'ecz1', title: 'Grade 12 Mathematics Past Papers (2020-2024)', description: 'Complete collection of Grade 12 Mathematics ECZ examination papers', type: 'drive', category: 'Past Papers', grade: '12', subject: 'Mathematics', url: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz2', title: 'Grade 12 English Language Past Papers', description: 'ECZ English Language papers with marking schemes', type: 'drive', category: 'Past Papers', grade: '12', subject: 'English', url: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz3', title: 'Grade 12 Physics Past Papers', description: 'Physics examination papers with solutions', type: 'drive', category: 'Past Papers', grade: '12', subject: 'Physics', url: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz4', title: 'Grade 12 Chemistry Past Papers', description: 'Chemistry papers with detailed marking guides', type: 'drive', category: 'Past Papers', grade: '12', subject: 'Chemistry', url: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz5', title: 'Grade 12 Biology Past Papers', description: 'Biology examination papers and solutions', type: 'drive', category: 'Past Papers', grade: '12', subject: 'Biology', url: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz6', title: 'Grade 9 Mathematics Past Papers (2018-2024)', description: 'Complete Grade 9 Mathematics ECZ papers', type: 'drive', category: 'Past Papers', grade: '9', subject: 'Mathematics', url: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz7', title: 'Grade 9 English Past Papers', description: 'English Language papers for Grade 9', type: 'drive', category: 'Past Papers', grade: '9', subject: 'English', url: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz8', title: 'Grade 9 Science Past Papers', description: 'Integrated Science ECZ examination papers', type: 'drive', category: 'Past Papers', grade: '9', subject: 'Science', url: 'https://zedpastpapers.com/grade-9-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz9', title: 'Grade 7 Composite Examination Papers', description: 'Grade 7 ECZ examination papers collection', type: 'drive', category: 'Past Papers', grade: '7', subject: 'All Subjects', url: 'https://zedpastpapers.com/grade-7-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz10', title: 'Grade 7 Mathematics Past Papers', description: 'Mathematics papers for Grade 7 exams', type: 'drive', category: 'Past Papers', grade: '7', subject: 'Mathematics', url: 'https://zedpastpapers.com/grade-7-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz11', title: 'Grade 12 Civic Education Past Papers', description: 'Civic Education examination papers', type: 'drive', category: 'Past Papers', grade: '12', subject: 'Civic Education', url: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
    { id: 'ecz12', title: 'Grade 12 Geography Past Papers', description: 'Geography ECZ papers with maps', type: 'drive', category: 'Past Papers', grade: '12', subject: 'Geography', url: 'https://zedpastpapers.com/grade-12-past-papers/', source: 'ZedPastPapers' },
  ];

  // CBC Syllabuses
  const syllabuses: Resource[] = [
    { id: 'syl1', title: '2023-2024 CBC School Syllabuses Collection', description: 'Complete signed school syllabuses for all subjects from Curriculum Specialists', type: 'drive', category: 'Syllabuses', url: 'https://drive.google.com/drive/folders/1ABC123', source: 'Curriculum Specialists Association', isExternal: true },
    { id: 'syl2', title: 'Grade 1-7 CBC Curriculum Framework', description: 'Official Competency-Based Curriculum framework documents', type: 'pdf', category: 'Syllabuses', url: 'https://www.moe.gov.zm/?page_id=1024', source: 'Ministry of Education' },
    { id: 'syl3', title: 'Grade 8-9 Revised Curriculum', description: 'Junior Secondary revised curriculum guidelines', type: 'pdf', category: 'Syllabuses', url: 'https://www.moe.gov.zm/?page_id=1024', source: 'Ministry of Education' },
    { id: 'syl4', title: 'Grade 10-12 Senior Secondary Syllabus', description: 'Senior Secondary school curriculum documents', type: 'pdf', category: 'Syllabuses', url: 'https://www.moe.gov.zm/?page_id=1024', source: 'Ministry of Education' },
    { id: 'syl5', title: 'Mathematics Syllabus (All Grades)', description: 'Complete Mathematics curriculum from Grade 1-12', type: 'pdf', category: 'Syllabuses', subject: 'Mathematics', url: 'https://www.moe.gov.zm/', source: 'ECZ' },
    { id: 'syl6', title: 'Science Syllabus Collection', description: 'Physics, Chemistry, Biology syllabuses', type: 'pdf', category: 'Syllabuses', subject: 'Science', url: 'https://www.moe.gov.zm/', source: 'ECZ' },
    { id: 'syl7', title: 'Languages Syllabus (English & Local)', description: 'English and Zambian Languages curriculum', type: 'pdf', category: 'Syllabuses', subject: 'Languages', url: 'https://www.moe.gov.zm/', source: 'ECZ' },
  ];

  // Video Learning Resources
  const videoResources: Resource[] = [
    { id: 'vid1', title: 'Zambian Educational Videos - DSTV Education', description: 'Educational content aligned with Zambian curriculum', type: 'video', category: 'Video Learning', url: 'https://www.dstv.com/en-zm/education', source: 'DSTV Zambia' },
    { id: 'vid2', title: 'Khan Academy - Mathematics', description: 'Free world-class mathematics education', type: 'video', category: 'Video Learning', subject: 'Mathematics', url: 'https://www.khanacademy.org/math', source: 'Khan Academy' },
    { id: 'vid3', title: 'Khan Academy - Science', description: 'Physics, Chemistry, Biology video lessons', type: 'video', category: 'Video Learning', subject: 'Science', url: 'https://www.khanacademy.org/science', source: 'Khan Academy' },
    { id: 'vid4', title: 'BBC Bitesize - GCSE Resources', description: 'Interactive lessons and revision materials', type: 'video', category: 'Video Learning', url: 'https://www.bbc.co.uk/bitesize', source: 'BBC' },
    { id: 'vid5', title: 'CrashCourse - Science & History', description: 'Engaging educational videos', type: 'video', category: 'Video Learning', url: 'https://www.youtube.com/@crashcourse', source: 'YouTube' },
    { id: 'vid6', title: 'Professor Dave Explains', description: 'Science and math tutorials', type: 'video', category: 'Video Learning', subject: 'Science', url: 'https://www.youtube.com/@ProfessorDaveExplains', source: 'YouTube' },
    { id: 'vid7', title: '3Blue1Brown - Visual Mathematics', description: 'Beautiful visual math explanations', type: 'video', category: 'Video Learning', subject: 'Mathematics', url: 'https://www.youtube.com/@3blue1brown', source: 'YouTube' },
    { id: 'vid8', title: 'Organic Chemistry Tutor', description: 'Math, Physics, Chemistry tutorials', type: 'video', category: 'Video Learning', subject: 'Science', url: 'https://www.youtube.com/@TheOrganicChemistryTutor', source: 'YouTube' },
    { id: 'vid9', title: 'uLesson Education', description: 'African curriculum-aligned video lessons', type: 'video', category: 'Video Learning', url: 'https://www.ulesson.com/', source: 'uLesson' },
    { id: 'vid10', title: 'Gradely - Personalized Learning', description: 'AI-powered African education platform', type: 'video', category: 'Video Learning', url: 'https://gradely.co/', source: 'Gradely' },
  ];

  // Google Drive Resource Collections
  const driveResources: Resource[] = [
    { id: 'gd1', title: 'Mega Teacher Resource Folder', description: 'Massive collection of templates, posters, and classroom materials', type: 'drive', category: 'Google Drive', url: 'https://drive.google.com/drive/folders/teacher-resources', source: 'Mrs Priestley ICT', isExternal: true },
    { id: 'gd2', title: '2024-2025 School Year Resources', description: 'Current session resources for lesson planning', type: 'drive', category: 'Google Drive', url: 'https://drive.google.com/drive/folders/school-2024-2025', source: 'Teacher Community', isExternal: true },
    { id: 'gd3', title: 'Global Educational Resources Sheet', description: 'Extensive spreadsheet with 100+ free vetted resources', type: 'drive', category: 'Google Drive', url: 'https://docs.google.com/spreadsheets/global-edu-resources', source: 'Open Education', isExternal: true },
    { id: 'gd4', title: 'Virtual Learning Master List', description: 'Comprehensive doc of science, math, and literacy links', type: 'drive', category: 'Google Drive', url: 'https://docs.google.com/document/virtual-learning', source: 'Distance Learning Hub', isExternal: true },
    { id: 'gd5', title: 'PE at Home Activities Folder', description: 'Physical Education activities collection', type: 'drive', category: 'Google Drive', subject: 'PE', url: 'https://drive.google.com/drive/folders/pe-at-home', source: 'PE Teachers Network', isExternal: true },
    { id: 'gd6', title: 'Digital Learning Tools Repository', description: 'Links for distance learning and tech integration', type: 'drive', category: 'Google Drive', url: 'https://drive.google.com/drive/folders/digital-learning', source: 'EdTech Community', isExternal: true },
    { id: 'gd7', title: 'AAC and Literacy Resources', description: 'Specialist resources for complex communication needs', type: 'drive', category: 'Google Drive', url: 'https://drive.google.com/drive/folders/aac-literacy', source: 'Inclusive Education', isExternal: true },
    { id: 'gd8', title: 'Zambian Teaching Materials Collection', description: 'Locally curated teaching resources for Zambian schools', type: 'drive', category: 'Google Drive', url: 'https://drive.google.com/drive/folders/zambia-teaching', source: 'Zambian Teachers Network', isExternal: true },
  ];

  // Official Zambian Portals
  const officialPortals: Resource[] = [
    { id: 'off1', title: 'Ministry of Education Zambia', description: 'Official curriculum downloads and policy documents', type: 'link', category: 'Official Portals', url: 'https://www.moe.gov.zm/', source: 'Government of Zambia' },
    { id: 'off2', title: 'Examinations Council of Zambia (ECZ)', description: 'Official examination body - results, past papers, announcements', type: 'link', category: 'Official Portals', url: 'https://www.exams-council.org.zm/', source: 'ECZ' },
    { id: 'off3', title: 'UNZA Digital Repository', description: 'Academic resources, theses, and papers from University of Zambia', type: 'link', category: 'Official Portals', url: 'http://dspace.unza.zm/', source: 'UNZA' },
    { id: 'off4', title: 'Zambia National Data Portal', description: 'Official data on education, health, economy, agriculture', type: 'link', category: 'Official Portals', url: 'https://zambia.opendataforafrica.org/', source: 'ZAMSTATS' },
    { id: 'off5', title: 'Zambia Statistics Agency (ZAMSTATS)', description: 'National survey data and census reports', type: 'link', category: 'Official Portals', url: 'https://www.zamstats.gov.zm/', source: 'Government of Zambia' },
    { id: 'off6', title: 'ZedPastPapers Official', description: 'Largest collection of ECZ past examination papers', type: 'link', category: 'Official Portals', url: 'https://zedpastpapers.com/', source: 'ZedPastPapers' },
    { id: 'off7', title: 'Zed Materials App', description: 'Mobile app for accessing ECZ past papers', type: 'app', category: 'Official Portals', url: 'https://play.google.com/store/apps/details?id=com.zedmaterials', source: 'Zed Materials' },
  ];

  // Global Learning Platforms
  const globalPlatforms: Resource[] = [
    { id: 'glob1', title: 'Khan Academy', description: 'Free world-class education for anyone, anywhere', type: 'link', category: 'Global Platforms', url: 'https://www.khanacademy.org/', source: 'Khan Academy' },
    { id: 'glob2', title: 'Coursera', description: 'University courses and professional certificates', type: 'link', category: 'Global Platforms', url: 'https://www.coursera.org/', source: 'Coursera' },
    { id: 'glob3', title: 'edX', description: 'Free online courses from top universities', type: 'link', category: 'Global Platforms', url: 'https://www.edx.org/', source: 'edX' },
    { id: 'glob4', title: 'OpenStax', description: 'Free, peer-reviewed textbooks', type: 'link', category: 'Global Platforms', url: 'https://openstax.org/', source: 'Rice University' },
    { id: 'glob5', title: 'MIT OpenCourseWare', description: 'Free MIT course materials', type: 'link', category: 'Global Platforms', url: 'https://ocw.mit.edu/', source: 'MIT' },
    { id: 'glob6', title: 'CK-12 Foundation', description: 'Free textbooks and interactive content', type: 'link', category: 'Global Platforms', url: 'https://www.ck12.org/', source: 'CK-12' },
    { id: 'glob7', title: 'National Geographic Kids', description: 'Science and nature educational content', type: 'link', category: 'Global Platforms', url: 'https://kids.nationalgeographic.com/', source: 'National Geographic' },
    { id: 'glob8', title: 'Starfall', description: 'Early reading and math curriculum', type: 'link', category: 'Global Platforms', url: 'https://www.starfall.com/', source: 'Starfall' },
    { id: 'glob9', title: 'OpenLibrary', description: 'Borrow thousands of digital books for free', type: 'link', category: 'Global Platforms', url: 'https://openlibrary.org/', source: 'Internet Archive' },
    { id: 'glob10', title: 'Storynory', description: 'Free audio stories for kids', type: 'link', category: 'Global Platforms', url: 'https://www.storynory.com/', source: 'Storynory' },
  ];

  // African EdTech Platforms
  const africanEdtech: Resource[] = [
    { id: 'afr1', title: 'uLesson Education', description: 'African curriculum video lessons and practice', type: 'link', category: 'African EdTech', url: 'https://www.ulesson.com/', source: 'uLesson' },
    { id: 'afr2', title: 'Gradely', description: 'AI-powered personalized learning for Africa', type: 'link', category: 'African EdTech', url: 'https://gradely.co/', source: 'Gradely' },
    { id: 'afr3', title: 'Tuteria', description: 'African tutoring marketplace', type: 'link', category: 'African EdTech', url: 'https://www.tuteria.com/', source: 'Tuteria' },
    { id: 'afr4', title: 'Eneza Education', description: 'Mobile learning for African students', type: 'link', category: 'African EdTech', url: 'https://enezaeducation.com/', source: 'Eneza' },
    { id: 'afr5', title: 'M-Shule', description: 'SMS-based learning platform', type: 'link', category: 'African EdTech', url: 'https://m-shule.com/', source: 'M-Shule' },
    { id: 'afr6', title: 'ZambiaFiles', description: 'Books, audio, video in Zambian languages', type: 'link', category: 'African EdTech', url: 'https://www.zambiafiles.com/', source: 'ZambiaFiles' },
    { id: 'afr7', title: 'African Digital Health Library - Zambia', description: 'Health reports and medical research', type: 'link', category: 'African EdTech', url: 'https://digitallibrary.un.org/', source: 'UN Digital Library' },
  ];

  // YouTube Channels for Learning
  const youtubeChannels: Resource[] = [
    { id: 'yt1', title: 'Khan Academy', description: 'Math, Science, Computing, History', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@khanacademy', source: 'YouTube' },
    { id: 'yt2', title: 'CrashCourse', description: 'Engaging educational videos on all subjects', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@crashcourse', source: 'YouTube' },
    { id: 'yt3', title: 'Veritasium', description: 'Science and engineering explanations', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@veritasium', source: 'YouTube' },
    { id: 'yt4', title: 'Numberphile', description: 'Videos about numbers and mathematics', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@numberphile', source: 'YouTube' },
    { id: 'yt5', title: 'TED-Ed', description: 'Educational animated videos', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@TEDEd', source: 'YouTube' },
    { id: 'yt6', title: 'MinutePhysics', description: 'Quick physics explanations', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@minutephysics', source: 'YouTube' },
    { id: 'yt7', title: 'SciShow', description: 'Explore the unexpected science in everyday life', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@SciShow', source: 'YouTube' },
    { id: 'yt8', title: 'Professor Dave Explains', description: 'Science and math tutorials', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@ProfessorDaveExplains', source: 'YouTube' },
    { id: 'yt9', title: '3Blue1Brown', description: 'Beautiful visual mathematics', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@3blue1brown', source: 'YouTube' },
    { id: 'yt10', title: 'The Organic Chemistry Tutor', description: 'Math, Chemistry, Physics tutorials', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@TheOrganicChemistryTutor', source: 'YouTube' },
    { id: 'yt11', title: 'Kurzgesagt', description: 'Science and philosophy animations', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@kurzgesagt', source: 'YouTube' },
    { id: 'yt12', title: 'Physics Girl', description: 'Physics adventures and experiments', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@physicsgirl', source: 'YouTube' },
    { id: 'yt13', title: 'Mathologer', description: 'Mathematical visual proofs', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@Mathologer', source: 'YouTube' },
    { id: 'yt14', title: 'History Matters', description: 'Short history explanations', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@HistoryMatters', source: 'YouTube' },
    { id: 'yt15', title: 'NileRed', description: 'Chemistry experiments and explanations', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@NileRed', source: 'YouTube' },
    { id: 'yt16', title: 'Primer', description: 'Simulations about science and society', type: 'video', category: 'YouTube Channels', url: 'https://www.youtube.com/@PrimerBlobs', source: 'YouTube' },
  ];

  // Study Apps & Tools
  const studyApps: Resource[] = [
    { id: 'app1', title: 'Quizlet', description: 'Flashcards and study sets', type: 'app', category: 'Study Apps', url: 'https://quizlet.com/', source: 'Quizlet' },
    { id: 'app2', title: 'Anki', description: 'Spaced repetition flashcards', type: 'app', category: 'Study Apps', url: 'https://apps.ankiweb.net/', source: 'Anki' },
    { id: 'app3', title: 'Notion', description: 'All-in-one study workspace', type: 'app', category: 'Study Apps', url: 'https://www.notion.so/', source: 'Notion' },
    { id: 'app4', title: 'Forest', description: 'Focus and productivity timer', type: 'app', category: 'Study Apps', url: 'https://www.forestapp.cc/', source: 'Forest' },
    { id: 'app5', title: 'Todoist', description: 'Task and assignment management', type: 'app', category: 'Study Apps', url: 'https://todoist.com/', source: 'Todoist' },
    { id: 'app6', title: 'GoodNotes', description: 'Digital note-taking', type: 'app', category: 'Study Apps', url: 'https://www.goodnotes.com/', source: 'GoodNotes' },
    { id: 'app7', title: 'Wolfram Alpha', description: 'Computational knowledge engine', type: 'app', category: 'Study Apps', url: 'https://www.wolframalpha.com/', source: 'Wolfram' },
    { id: 'app8', title: 'Photomath', description: 'Math problem solver with camera', type: 'app', category: 'Study Apps', url: 'https://photomath.com/', source: 'Photomath' },
    { id: 'app9', title: 'Desmos', description: 'Free graphing calculator', type: 'app', category: 'Study Apps', url: 'https://www.desmos.com/', source: 'Desmos' },
    { id: 'app10', title: 'GeoGebra', description: 'Dynamic mathematics software', type: 'app', category: 'Study Apps', url: 'https://www.geogebra.org/', source: 'GeoGebra' },
  ];

  // All resources combined
  const allResources = [
    ...eczPastPapers,
    ...syllabuses,
    ...videoResources,
    ...driveResources,
    ...officialPortals,
    ...globalPlatforms,
    ...africanEdtech,
    ...youtubeChannels,
    ...studyApps
  ];

  // Filter resources based on search and tab
  const getFilteredResources = () => {
    let resources = allResources;
    
    if (activeTab !== 'all') {
      switch (activeTab) {
        case 'ecz':
          resources = eczPastPapers;
          break;
        case 'syllabuses':
          resources = syllabuses;
          break;
        case 'videos':
          resources = [...videoResources, ...youtubeChannels];
          break;
        case 'drive':
          resources = driveResources;
          break;
        case 'zambia':
          resources = [...officialPortals, ...africanEdtech];
          break;
        case 'global':
          resources = globalPlatforms;
          break;
        case 'apps':
          resources = studyApps;
          break;
      }
    }

    if (searchTerm) {
      resources = resources.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return resources;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'video': return <Video className="h-5 w-5 text-purple-500" />;
      case 'drive': return <Folder className="h-5 w-5 text-yellow-500" />;
      case 'app': return <Download className="h-5 w-5 text-blue-500" />;
      default: return <Globe className="h-5 w-5 text-green-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'drive': return 'bg-yellow-100 text-yellow-800';
      case 'app': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const filteredResources = getFilteredResources();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Library className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  🇿🇲 Zambian Educational Resources Hub
                </CardTitle>
                <CardDescription className="text-emerald-100 text-lg">
                  ECZ Past Papers • Syllabuses • Videos • Google Drive Collections • Learning Platforms
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search all resources (past papers, subjects, topics...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg bg-white/95 text-gray-900 border-0 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'Past Papers', count: eczPastPapers.length, icon: FileText, color: 'bg-red-500' },
            { label: 'Syllabuses', count: syllabuses.length, icon: BookOpen, color: 'bg-orange-500' },
            { label: 'Videos', count: videoResources.length + youtubeChannels.length, icon: Video, color: 'bg-purple-500' },
            { label: 'Drive Links', count: driveResources.length, icon: Folder, color: 'bg-yellow-500' },
            { label: 'Zambia Portals', count: officialPortals.length, icon: Map, color: 'bg-emerald-500' },
            { label: 'Global Platforms', count: globalPlatforms.length, icon: Globe, color: 'bg-blue-500' },
            { label: 'African EdTech', count: africanEdtech.length, icon: Heart, color: 'bg-pink-500' },
            { label: 'Study Apps', count: studyApps.length, icon: Download, color: 'bg-indigo-500' },
          ].map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3 text-center">
                <div className={`${stat.color} w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1 h-auto p-1 bg-white shadow-sm rounded-xl">
            <TabsTrigger value="all" className="text-xs md:text-sm py-2">All</TabsTrigger>
            <TabsTrigger value="ecz" className="text-xs md:text-sm py-2">ECZ Papers</TabsTrigger>
            <TabsTrigger value="syllabuses" className="text-xs md:text-sm py-2">Syllabuses</TabsTrigger>
            <TabsTrigger value="videos" className="text-xs md:text-sm py-2">Videos</TabsTrigger>
            <TabsTrigger value="drive" className="text-xs md:text-sm py-2">Drive</TabsTrigger>
            <TabsTrigger value="zambia" className="text-xs md:text-sm py-2">Zambia</TabsTrigger>
            <TabsTrigger value="global" className="text-xs md:text-sm py-2">Global</TabsTrigger>
            <TabsTrigger value="apps" className="text-xs md:text-sm py-2">Apps</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Results count */}
            <p className="text-sm text-gray-600 mb-4">
              Showing {filteredResources.length} resources
              {searchTerm && ` for "${searchTerm}"`}
            </p>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                          {resource.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{resource.source}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge className={`text-xs ${getTypeBadgeColor(resource.type)}`}>
                        {resource.type.toUpperCase()}
                      </Badge>
                      {resource.grade && (
                        <Badge variant="outline" className="text-xs">Grade {resource.grade}</Badge>
                      )}
                      {resource.subject && (
                        <Badge variant="outline" className="text-xs">{resource.subject}</Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full gap-2" 
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {resource.type === 'pdf' ? 'Download PDF' : 
                       resource.type === 'video' ? 'Watch Now' :
                       resource.type === 'drive' ? 'Open Drive' :
                       resource.type === 'app' ? 'Get App' : 'Visit Site'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-600">Try adjusting your search or changing the category</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Collections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                ECZ Exam Centre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 opacity-90">Access all Grade 7, 9 & 12 past examination papers with marking schemes</p>
              <Button variant="secondary" className="w-full" onClick={() => window.open('https://zedpastpapers.com/', '_blank')}>
                <FileText className="h-4 w-4 mr-2" />
                Browse Past Papers
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-6 w-6" />
                Video Learning Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 opacity-90">Curated educational videos from Khan Academy, CrashCourse, and more</p>
              <Button variant="secondary" className="w-full" onClick={() => setActiveTab('videos')}>
                <Play className="h-4 w-4 mr-2" />
                Explore Videos
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-6 w-6" />
                Zambian Portals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 opacity-90">Official Ministry of Education, ECZ, and national data resources</p>
              <Button variant="secondary" className="w-full" onClick={() => setActiveTab('zambia')}>
                <Building2 className="h-4 w-4 mr-2" />
                Access Portals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZambianResourcesHubPage;
