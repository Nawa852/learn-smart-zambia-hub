import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrightSphereLogo from '@/assets/brightsphere-logo.svg';
import {
  Search, Sparkles, BookOpen, Brain, Target, Users, Trophy, BarChart3,
  Video, MessageSquare, Zap, Globe, Shield, Smartphone, Settings, Star,
  GraduationCap, Code, FileText, Clock, Award, TrendingUp, Lightbulb,
  Palette, Play, Mic, Camera, Download, Share2, Link, Layers, Grid3X3,
  PenTool, Database, Cpu, Rocket, Heart, Coffee, Music, Map, Calendar,
  Bell, Mail, Phone, Lock, Key, Eye, Edit, Trash, Plus, Check, X,
  ChevronRight, ExternalLink, Folder, File, Image, Film, Headphones
} from 'lucide-react';

// All 164 features organized by category
const featureCategories = [
  {
    id: 'course-content',
    name: 'Course & Content',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    features: [
      { id: 1, name: 'Multi-lingual Support', desc: 'Courses in 7+ Zambian languages', route: '/courses', status: 'active' },
      { id: 2, name: 'Extensive Course Library', desc: 'Thousands of ECZ-aligned courses', route: '/courses', status: 'active' },
      { id: 3, name: 'Course Categories', desc: 'Organized by subject/grade', route: '/courses', status: 'active' },
      { id: 4, name: 'Course Ratings & Reviews', desc: 'Community feedback system', route: '/courses', status: 'active' },
      { id: 5, name: 'Specializations', desc: 'Multi-course structured programs', route: '/ai-learning-paths', status: 'active' },
      { id: 6, name: 'Online Degrees', desc: 'Accredited certifications', route: '/courses', status: 'coming' },
      { id: 7, name: 'MicroCredentials', desc: 'Short skill certifications', route: '/achievements', status: 'active' },
      { id: 8, name: 'Professional Certificates', desc: 'Industry-recognized credentials', route: '/achievements', status: 'active' },
      { id: 9, name: 'Marketplace Model', desc: 'Creator economy platform', route: '/courses', status: 'coming' },
      { id: 10, name: 'Topic Discovery', desc: 'Curated learning resources', route: '/semantic-search', status: 'active' },
      { id: 11, name: 'Drag & Drop Builder', desc: 'Easy course creation', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 12, name: 'AI Outline Builder', desc: 'Automated course structuring', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 13, name: 'Course Builder', desc: 'Video, PDFs, quizzes', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 14, name: 'White-label Mobile App', desc: 'Custom branded apps', route: '/dashboard', status: 'coming' },
      { id: 15, name: 'Video Hosting', desc: 'Integrated streaming', route: '/ecz-video-library', status: 'active' },
      { id: 16, name: 'Content Import', desc: 'PDF, PPT, Word processing', route: '/study-materials', status: 'active' },
      { id: 17, name: 'Bulk Course Creation', desc: 'Efficient batch setup', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 18, name: 'MOOC Builder', desc: 'Massive open courses', route: '/courses', status: 'coming' },
      { id: 19, name: 'Template Library', desc: 'Pre-built course templates', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 20, name: 'Versioning & Review', desc: 'Draft/review/publish workflow', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 21, name: 'Multi-format Lectures', desc: 'Video, PDF, PPT, text', route: '/ecz-video-library', status: 'active' },
      { id: 22, name: 'Interactive Videos', desc: 'Pop-ups, quizzes, links', route: '/ecz-video-library', status: 'active' },
      { id: 23, name: 'Celebrity-led Courses', desc: 'Expert masterclasses', route: '/courses', status: 'coming' },
      { id: 24, name: 'Live Sessions', desc: 'Live coaching/classes', route: '/virtual-classroom', status: 'active' },
      { id: 25, name: 'Virtual Classrooms', desc: 'Interactive collaboration', route: '/virtual-classroom', status: 'active' },
      { id: 26, name: 'E-books', desc: 'With note-taking', route: '/virtual-ecz-library', status: 'active' },
      { id: 27, name: 'Session Recordings', desc: 'Replay past sessions', route: '/ecz-video-library', status: 'active' },
      { id: 28, name: 'Video Chapters', desc: 'Indexed content navigation', route: '/ecz-video-library', status: 'active' },
    ]
  },
  {
    id: 'ai-powered',
    name: 'BrightSphere AI',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    features: [
      { id: 29, name: 'AI-Powered Coaching', desc: 'Personalized recommendations', route: '/smart-recommendations', status: 'active' },
      { id: 30, name: 'Fine-tuned Chatbots', desc: 'Course-specific AI tutors', route: '/multi-ai-tutor', status: 'active' },
      { id: 31, name: 'Instant Tutoring', desc: 'Connect in <60 seconds', route: '/multi-ai-tutor', status: 'active' },
      { id: 32, name: 'SuperAI Assistant', desc: 'Step-by-step answers', route: '/comprehensive-ai-hub', status: 'active' },
      { id: 33, name: 'AI Chat Integration', desc: 'Chat with materials', route: '/ai-study-helper', status: 'active' },
      { id: 34, name: 'Performance Insights', desc: 'Study recommendations', route: '/ai-study-analytics', status: 'active' },
      { id: 35, name: 'AI Content Recommendations', desc: 'Personalized suggestions', route: '/smart-recommendations', status: 'active' },
      { id: 36, name: 'AI Course Assistance', desc: 'For course building', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 37, name: 'Photo Homework Solver', desc: 'Upload images for solutions', route: '/ai-study-helper', status: 'active' },
      { id: 38, name: 'Writing Tools', desc: 'Essay help, explanations', route: '/claude-journaling', status: 'active' },
      { id: 39, name: 'Material Transformation', desc: 'PDFs → interactive tools', route: '/ai-study-helper', status: 'active' },
      { id: 40, name: 'Note-Taking Assistance', desc: 'Auto-record & organize', route: '/ecz-study-notes-editor', status: 'active' },
      { id: 41, name: 'Study Guide Generator', desc: 'Auto-generated guides', route: '/ai-study-helper', status: 'active' },
      { id: 42, name: 'Automatic Summarization', desc: 'Clear lecture summaries', route: '/ai-study-helper', status: 'active' },
      { id: 43, name: 'AI-Powered Pages', desc: 'Automated page creation', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 44, name: 'Adaptive Learning', desc: 'Personalized for all subjects', route: '/ai-learning-paths', status: 'active' },
      { id: 45, name: 'Personalized Learning Plans', desc: 'Tailored paths', route: '/ai-learning-paths', status: 'active' },
      { id: 46, name: 'Learning Paths', desc: 'Curated sequences', route: '/ai-learning-paths', status: 'active' },
      { id: 47, name: 'Personalized Paths', desc: 'Tailored content', route: '/ai-learning-paths', status: 'active' },
      { id: 48, name: 'Drip Campaigns', desc: 'Timed content release', route: '/ai-study-scheduler', status: 'active' },
    ]
  },
  {
    id: 'assessment',
    name: 'Assessment & Practice',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
    features: [
      { id: 49, name: 'Practice Questions', desc: 'Multiple-choice quizzes', route: '/ai-quiz-creator', status: 'active' },
      { id: 50, name: 'Advanced Quizzing', desc: 'Dynamic questions', route: '/ai-quiz-creator', status: 'active' },
      { id: 51, name: 'Assessment Management', desc: 'Tests, grading, feedback', route: '/ecz-exam-simulator', status: 'active' },
      { id: 52, name: 'Automatic Grading', desc: 'For quizzes/assessments', route: '/ai-quiz-creator', status: 'active' },
      { id: 53, name: 'Peer Assessment', desc: 'Workshops and surveys', route: '/study-groups', status: 'active' },
      { id: 54, name: 'Item Bank', desc: 'Question database', route: '/ai-quiz-creator', status: 'active' },
      { id: 55, name: 'Adaptive Testing', desc: 'CAT difficulty adjustment', route: '/ecz-exam-simulator', status: 'active' },
      { id: 56, name: 'Plagiarism Detection', desc: 'Academic integrity tools', route: '/ecz-exam-simulator', status: 'coming' },
      { id: 57, name: 'Interactive Examples', desc: 'Hands-on demonstrations', route: '/interactive-lessons', status: 'active' },
      { id: 58, name: 'Coding Exercises', desc: 'Interactive challenges', route: '/interactive-ecz-games', status: 'active' },
      { id: 59, name: 'Academic Visualization', desc: 'Graphs, diagrams, maps', route: '/visual-mind-map', status: 'active' },
      { id: 60, name: 'Interactive Learning', desc: 'Hands-on coding/projects', route: '/interactive-lessons', status: 'active' },
      { id: 61, name: 'Hands-on Projects', desc: 'Project-based learning', route: '/ecz-project-showcase', status: 'active' },
      { id: 62, name: 'Interactive Mind Maps', desc: 'Visual learning paths', route: '/visual-mind-map', status: 'active' },
      { id: 63, name: 'Study Guides', desc: 'Step-by-step breakdowns', route: '/ai-study-helper', status: 'active' },
      { id: 64, name: 'Homework Solving', desc: 'Step-by-step solutions', route: '/ai-study-helper', status: 'active' },
      { id: 65, name: 'Assignment Help', desc: 'Problem-solving support', route: '/ecz-assignment-hub', status: 'active' },
      { id: 66, name: 'Question Solving', desc: 'Millions of questions', route: '/ai-study-helper', status: 'active' },
      { id: 67, name: 'Content Assignment', desc: 'Teachers assign lessons', route: '/ecz-assignment-hub', status: 'active' },
      { id: 68, name: 'Essay Writing Support', desc: 'Structure and drafting', route: '/claude-journaling', status: 'active' },
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics & Tracking',
    icon: BarChart3,
    color: 'from-orange-500 to-amber-500',
    features: [
      { id: 69, name: 'Progress Tracking', desc: 'Monitor completion', route: '/learning-analytics', status: 'active' },
      { id: 70, name: 'Admin Analytics', desc: 'Dashboards for tracking', route: '/ai-progress-dashboard', status: 'active' },
      { id: 71, name: 'Reporting Dashboard', desc: 'Analytics insights', route: '/ai-study-analytics', status: 'active' },
      { id: 72, name: 'Comparative Dashboards', desc: 'Outcome analysis', route: '/ai-study-insights', status: 'active' },
      { id: 73, name: 'Skill Heatmap', desc: 'Visual skill mastery', route: '/learning-analytics', status: 'active' },
      { id: 74, name: 'Learning Streak', desc: 'Engagement tracking', route: '/gameify-vault', status: 'active' },
      { id: 75, name: 'Time Analytics', desc: 'Time spent on learning', route: '/learning-analytics', status: 'active' },
      { id: 76, name: 'Risk Scoring', desc: 'Dropout prediction', route: '/ai-study-insights', status: 'coming' },
      { id: 77, name: 'Course Analytics', desc: 'Engagement by module', route: '/ai-study-analytics', status: 'active' },
      { id: 78, name: 'Curriculum Mapping', desc: 'Auto-align to objectives', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 79, name: 'Revenue Analytics', desc: 'Sales and subscription data', route: '/dashboard', status: 'coming' },
      { id: 80, name: 'Conversion Funnels', desc: 'Marketing analytics', route: '/dashboard', status: 'coming' },
      { id: 81, name: 'Enterprise Reports', desc: 'L&D adoption metrics', route: '/ai-progress-dashboard', status: 'active' },
    ]
  },
  {
    id: 'gamification',
    name: 'Gamification & Achievements',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    features: [
      { id: 82, name: 'Gamification', desc: 'Points and rewards', route: '/gameify-vault', status: 'active' },
      { id: 83, name: 'Digital Certifications', desc: 'Badges and progress', route: '/achievements', status: 'active' },
      { id: 84, name: 'Certificates', desc: 'Auto-generated with badges', route: '/achievements', status: 'active' },
      { id: 85, name: 'Customizable Certifications', desc: 'Design with expiration', route: '/achievements', status: 'active' },
      { id: 86, name: 'XP & Leveling', desc: 'Experience point system', route: '/gameify-vault', status: 'active' },
      { id: 87, name: 'Leaderboards', desc: 'Competitive rankings', route: '/group-competition-arena', status: 'active' },
      { id: 88, name: 'Daily Challenges', desc: 'Regular engagement', route: '/daily-goal-coach', status: 'active' },
      { id: 89, name: 'Streak Rewards', desc: 'Consistency incentives', route: '/gameify-vault', status: 'active' },
      { id: 90, name: 'Certificate Showcase', desc: 'Portfolio display', route: '/profile', status: 'active' },
      { id: 91, name: 'Professional Certificates', desc: 'Industry recognition', route: '/achievements', status: 'active' },
      { id: 92, name: 'MicroMasters', desc: 'Graduate-level credentials', route: '/achievements', status: 'coming' },
      { id: 93, name: 'Techdegree Programs', desc: 'Certification paths', route: '/ai-learning-paths', status: 'active' },
    ]
  },
  {
    id: 'social',
    name: 'Social & Community',
    icon: Users,
    color: 'from-indigo-500 to-blue-500',
    features: [
      { id: 94, name: 'Discussion Forums', desc: 'Student interaction', route: '/ecz-study-community-forum', status: 'active' },
      { id: 95, name: 'Community Interaction', desc: 'Feedback forums', route: '/community-collaboration', status: 'active' },
      { id: 96, name: 'Communication Tools', desc: 'Messages, calendars', route: '/messenger', status: 'active' },
      { id: 97, name: 'Social Learning', desc: 'Profiles, ratings', route: '/social-feed', status: 'active' },
      { id: 98, name: 'Social Network', desc: 'Built-in community', route: '/enhanced-social', status: 'active' },
      { id: 99, name: 'Peer Learning', desc: 'Collaborative activities', route: '/study-groups', status: 'active' },
      { id: 100, name: 'Study Groups', desc: 'Form learning groups', route: '/study-groups', status: 'active' },
      { id: 101, name: 'Peer Finder', desc: 'Match study buddies', route: '/peer-finder', status: 'active' },
      { id: 102, name: 'Knowledge Organization', desc: 'Track learning progress', route: '/knowledge-feed', status: 'active' },
      { id: 103, name: 'Mentorship Hub', desc: 'Connect with mentors', route: '/mentorship-hub', status: 'active' },
      { id: 104, name: 'Live Events', desc: 'Summits and webinars', route: '/events-learning', status: 'active' },
    ]
  },
  {
    id: 'business',
    name: 'Business & Monetization',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
    features: [
      { id: 105, name: 'Affordable Pricing', desc: 'Flexible course pricing', route: '/courses', status: 'active' },
      { id: 106, name: 'E-commerce Tools', desc: 'Sales, enrollment', route: '/dashboard', status: 'coming' },
      { id: 107, name: 'E-commerce Portal', desc: 'Sell with discounts', route: '/dashboard', status: 'coming' },
      { id: 108, name: 'Payment Processor', desc: 'Built-in payments', route: '/dashboard', status: 'coming' },
      { id: 109, name: 'Affiliate Program', desc: 'Promotional tools', route: '/dashboard', status: 'coming' },
      { id: 110, name: 'Course Monetization', desc: 'Royalties and referrals', route: '/dashboard', status: 'coming' },
      { id: 111, name: 'Enterprise Training', desc: 'Corporate solutions', route: '/dashboard', status: 'coming' },
      { id: 112, name: 'Enterprise Solutions', desc: 'Team learning', route: '/dashboard', status: 'coming' },
      { id: 113, name: 'Admin Controls', desc: 'Role management', route: '/dashboard', status: 'active' },
      { id: 114, name: 'Industry Partnerships', desc: 'University courses', route: '/courses', status: 'coming' },
      { id: 115, name: 'Integration Hub', desc: 'Third-party tools', route: '/api-flowchart', status: 'active' },
      { id: 116, name: 'API Access', desc: 'Developer tools', route: '/api-flowchart', status: 'active' },
      { id: 117, name: 'SSO/SCIM', desc: 'Enterprise provisioning', route: '/dashboard', status: 'coming' },
      { id: 118, name: 'Sales Funnels', desc: 'Webinars, launches', route: '/dashboard', status: 'coming' },
      { id: 119, name: 'Email Automation', desc: 'Drip campaigns', route: '/dashboard', status: 'coming' },
      { id: 120, name: 'Homepage Builder', desc: 'Public website', route: '/dashboard', status: 'coming' },
      { id: 121, name: 'Website Builder', desc: 'CMS for pages', route: '/dashboard', status: 'coming' },
      { id: 122, name: 'Theme Marketplace', desc: 'Custom designs', route: '/dashboard', status: 'coming' },
      { id: 123, name: 'CMS', desc: 'Pages and blogs', route: '/dashboard', status: 'coming' },
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile & Accessibility',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-500',
    features: [
      { id: 124, name: 'Mobile Apps', desc: 'Dedicated iOS/Android', route: '/dashboard', status: 'coming' },
      { id: 125, name: 'Offline Access', desc: 'Download for offline', route: '/dashboard', status: 'coming' },
      { id: 126, name: 'Mobile Accessibility', desc: 'On-the-go learning', route: '/dashboard', status: 'active' },
      { id: 127, name: 'Mobile App Builder', desc: 'Custom apps', route: '/dashboard', status: 'coming' },
      { id: 128, name: 'Mobile-friendly', desc: 'Responsive design', route: '/dashboard', status: 'active' },
      { id: 129, name: 'Browser Plugin', desc: 'Quick solutions extension', route: '/dashboard', status: 'coming' },
      { id: 130, name: 'Self-paced Learning', desc: 'No strict schedules', route: '/courses', status: 'active' },
      { id: 131, name: 'Free Access', desc: 'No-cost platform', route: '/courses', status: 'active' },
      { id: 132, name: 'Global Access', desc: 'Free audits with upgrades', route: '/courses', status: 'active' },
      { id: 133, name: 'Family Plans', desc: 'Multi-user access', route: '/dashboard', status: 'coming' },
      { id: 134, name: 'Bite-sized Learning', desc: 'Short sessions', route: '/ai-flashcards', status: 'active' },
    ]
  },
  {
    id: 'integrations',
    name: 'Integrations & Tools',
    icon: Link,
    color: 'from-slate-500 to-gray-600',
    features: [
      { id: 135, name: 'Plugin Marketplace', desc: 'Add-ons for customization', route: '/api-flowchart', status: 'coming' },
      { id: 136, name: 'LinkedIn Integration', desc: 'Professional network', route: '/profile', status: 'coming' },
      { id: 137, name: 'LMS LTI Support', desc: 'Learning tool interoperability', route: '/dashboard', status: 'coming' },
      { id: 138, name: 'Zoom/Teams', desc: 'Video conferencing', route: '/virtual-classroom', status: 'active' },
      { id: 139, name: 'GitHub', desc: 'Code repository', route: '/dashboard', status: 'coming' },
      { id: 140, name: 'Google Drive', desc: 'File storage', route: '/study-materials', status: 'coming' },
      { id: 141, name: 'Slack/MS Teams', desc: 'Team communication', route: '/messenger', status: 'coming' },
      { id: 142, name: 'Instructor Platform', desc: 'Create and sell', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 143, name: 'Professional Designs', desc: 'Course page templates', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 144, name: 'Easy Setup', desc: 'No tech skills needed', route: '/dashboard', status: 'active' },
      { id: 145, name: 'Blended Learning', desc: 'Online + in-person', route: '/virtual-classroom', status: 'active' },
    ]
  },
  {
    id: 'god-mode',
    name: 'God Mode (Advanced)',
    icon: Rocket,
    color: 'from-violet-500 to-purple-600',
    features: [
      { id: 146, name: 'Mind-Reading AI Tutor', desc: 'Context-aware assistance', route: '/comprehensive-ai-hub', status: 'active' },
      { id: 147, name: 'Living Knowledge Graph', desc: '3D interactive brain map', route: '/visual-mind-map', status: 'active' },
      { id: 148, name: 'Personalized Course Generator', desc: 'AI-built courses', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 149, name: 'Socratic Combat Mode', desc: 'Debate-based learning', route: '/teach-back-assessment', status: 'active' },
      { id: 150, name: 'Reality Simulator', desc: 'Decision-based simulations', route: '/ecz-virtual-lab-simulator', status: 'active' },
      { id: 151, name: 'Mastery Proof System', desc: 'Understanding-based certs', route: '/achievements', status: 'active' },
      { id: 152, name: 'Mood-Aware Teaching', desc: 'Emotion-intelligent learning', route: '/emotion-detection', status: 'active' },
      { id: 153, name: 'Learn-to-Earn Engine', desc: 'Skills → income', route: '/gameify-vault', status: 'active' },
      { id: 154, name: 'Explain Like X', desc: 'Multiple mental models', route: '/multi-ai-tutor', status: 'active' },
      { id: 155, name: 'Teach the World Button', desc: 'Instant educator creation', route: '/ai-curriculum-mapper', status: 'active' },
      { id: 156, name: 'Global Brainpower Pool', desc: 'Human + AI answers', route: '/study-groups', status: 'coming' },
      { id: 157, name: 'Learning DNA Profile', desc: 'Personal learning genome', route: '/profile', status: 'coming' },
      { id: 158, name: 'Anti-Cheating by Design', desc: 'Pattern-based integrity', route: '/ecz-exam-simulator', status: 'coming' },
      { id: 159, name: 'Time-Travel Video', desc: 'Non-linear learning', route: '/ecz-video-library', status: 'coming' },
      { id: 160, name: 'Self-Evolving Platform', desc: 'Auto-improvement', route: '/dashboard', status: 'coming' },
      { id: 161, name: 'Live AI Co-Instructor', desc: 'Real-time suggestions', route: '/virtual-classroom', status: 'coming' },
      { id: 162, name: 'Career Pipeline', desc: 'Project-to-job matching', route: '/profile', status: 'coming' },
      { id: 163, name: 'Voice Avatar', desc: 'Oral practice coaching', route: '/multi-ai-tutor', status: 'coming' },
      { id: 164, name: 'Offline Sync', desc: 'Mobile offline lessons', route: '/dashboard', status: 'coming' },
    ]
  }
];

const MegaDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  // Calculate stats
  const totalFeatures = featureCategories.reduce((acc, cat) => acc + cat.features.length, 0);
  const activeFeatures = featureCategories.reduce(
    (acc, cat) => acc + cat.features.filter(f => f.status === 'active').length, 0
  );
  const comingFeatures = totalFeatures - activeFeatures;

  // Filter features
  const filteredCategories = featureCategories.map(category => ({
    ...category,
    features: category.features.filter(feature => {
      const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           feature.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !showOnlyActive || feature.status === 'active';
      const matchesCategory = activeCategory === 'all' || activeCategory === category.id;
      return matchesSearch && matchesStatus && matchesCategory;
    })
  })).filter(cat => cat.features.length > 0);

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <img src={BrightSphereLogo} alt="BrightSphere" className="w-12 h-12" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Mega Feature Dashboard
            </h1>
            <p className="text-muted-foreground">All 164 features from 25+ e-learning platforms</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-500">{totalFeatures}</div>
              <div className="text-sm text-muted-foreground">Total Features</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-500">{activeFeatures}</div>
              <div className="text-sm text-muted-foreground">Active Now</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-orange-500">{comingFeatures}</div>
              <div className="text-sm text-muted-foreground">Coming Soon</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-500">{featureCategories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search all 164 features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showOnlyActive ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyActive(!showOnlyActive)}
            >
              <Check className="w-4 h-4 mr-2" />
              Active Only
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ChevronRight className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex h-auto p-1 bg-muted/50 w-max">
            <TabsTrigger value="all" className="px-4 py-2">
              <Grid3X3 className="w-4 h-4 mr-2" />
              All ({totalFeatures})
            </TabsTrigger>
            {featureCategories.map(category => {
              const CategoryIcon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
                  <CategoryIcon className="w-4 h-4 mr-2" />
                  {category.name} ({category.features.length})
                </TabsTrigger>
              );
            })}
          </TabsList>
        </ScrollArea>
      </Tabs>

      {/* Feature Grid */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {filteredCategories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <Badge variant="secondary">{category.features.length} features</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {category.features.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group ${
                          feature.status === 'coming' ? 'opacity-70' : ''
                        }`}
                        onClick={() => feature.status === 'active' && handleFeatureClick(feature.route)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-mono text-muted-foreground">#{feature.id}</span>
                            <Badge 
                              variant={feature.status === 'active' ? 'default' : 'secondary'}
                              className={`text-xs ${feature.status === 'active' ? 'bg-green-500' : ''}`}
                            >
                              {feature.status === 'active' ? 'Live' : 'Soon'}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                            {feature.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{feature.desc}</p>
                          {feature.status === 'active' && (
                            <div className="mt-2 flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Launch
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No features found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Quick Actions Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={BrightSphereLogo} alt="BrightSphere" className="w-10 h-10" />
            <div>
              <h3 className="font-semibold">Powered by BrightSphere AI</h3>
              <p className="text-sm text-muted-foreground">The world's most advanced e-learning platform</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/comprehensive-ai-hub')} className="bg-gradient-to-r from-primary to-purple-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Launch AI Hub
            </Button>
            <Button variant="outline" onClick={() => navigate('/courses')}>
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MegaDashboard;
