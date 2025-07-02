
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Globe, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Map, 
  Star,
  Brain,
  Trophy,
  Calendar,
  Search,
  Heart,
  Languages,
  Camera,
  Gamepad2,
  Target,
  Clock,
  PenTool,
  Lightbulb,
  Share2,
  UserCheck,
  Mail,
  MapPin,
  GraduationCap,
  School,
  Smartphone,
  Video,
  ShoppingCart
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EduBrowseButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const platformPages = [
    { id: 1, name: 'Dashboard', icon: Globe, api: 'OPENAI_API_KEY', model: 'GPT-4o', color: 'blue' },
    { id: 2, name: 'Courses', icon: BookOpen, api: 'CLAUDE_API_KEY', model: 'Claude 3', color: 'green' },
    { id: 3, name: 'Profile', icon: Users, api: 'GOOGLE_GEMMA_API_KEY', model: 'Gemini', color: 'purple' },
    { id: 4, name: 'Learning Analytics', icon: Brain, api: 'EEPSEEK_API_KEY', model: 'DeepSeek', color: 'orange' },
    { id: 5, name: 'Achievements', icon: Trophy, api: 'MOONSHOT_API_KEY', model: 'Moonshot AI', color: 'yellow' },
    { id: 6, name: 'AI Features', icon: Brain, api: 'MINSTRAL_API_KEY', model: 'Whisper', color: 'red' },
    { id: 7, name: 'AI Flashcards', icon: Card, api: 'KIMI_API_KEY', model: 'StealthGPT', color: 'pink' },
    { id: 8, name: 'Multi-AI Tutor', icon: GraduationCap, api: 'OPENAI_API_KEY', model: 'GPT-4o', color: 'indigo' },
    { id: 9, name: 'AI Study Helper', icon: Lightbulb, api: 'CLAUDE_API_KEY', model: 'Claude 3', color: 'teal' },
    { id: 10, name: 'Smart Recommendations', icon: Target, api: 'EEPSEEK_API_KEY', model: 'DeepSeek', color: 'cyan' },
    { id: 11, name: 'Semantic Search', icon: Search, api: 'GOOGLE_GEMMA_API_KEY', model: 'Gemini', color: 'lime' },
    { id: 12, name: 'Emotion Detection', icon: Heart, api: 'MINSTRAL_API_KEY', model: 'Whisper', color: 'rose' },
    { id: 13, name: 'Multilingual Translator', icon: Languages, api: 'QWEN_API_KEY', model: 'Qwen', color: 'amber' },
    { id: 14, name: 'Visual Mind Map', icon: Camera, api: 'MOONSHOT_API_KEY', model: 'Moonshot AI', color: 'emerald' },
    { id: 15, name: 'Teach Back Assessment', icon: PenTool, api: 'KIMI_API_KEY', model: 'StealthGPT', color: 'violet' },
    { id: 16, name: 'Gameify Vault', icon: Gamepad2, api: 'OPENAI_API_KEY', model: 'GPT-4o', color: 'fuchsia' },
    { id: 17, name: 'AI Learning Paths', icon: Target, api: 'CLAUDE_API_KEY', model: 'Claude 3', color: 'sky' },
    { id: 18, name: 'Daily Goal Coach', icon: Clock, api: 'EEPSEEK_API_KEY', model: 'DeepSeek', color: 'stone' },
    { id: 19, name: 'Claude Journaling', icon: PenTool, api: 'MINSTRAL_API_KEY', model: 'Whisper', color: 'neutral' },
    { id: 20, name: 'Study Assistant', icon: BookOpen, api: 'KIMI_API_KEY', model: 'StealthGPT', color: 'slate' },
    { id: 21, name: 'Social Learning', icon: Share2, api: 'OPENAI_API_KEY', model: 'GPT-4o', color: 'zinc' },
    { id: 22, name: 'Social Feed', icon: MessageSquare, api: 'CLAUDE_API_KEY', model: 'Claude 3', color: 'gray' },
    { id: 23, name: 'Study Groups', icon: Users, api: 'GOOGLE_GEMMA_API_KEY', model: 'Gemini', color: 'red' },
    { id: 24, name: 'Messenger', icon: Mail, api: 'TWILIO_API_KEY', model: 'Twilio', color: 'orange' },
    { id: 25, name: 'Campus Map', icon: MapPin, api: 'YOUTUBE_API_KEY', model: 'YouTube', color: 'amber' },
    { id: 26, name: 'Peer Finder', icon: UserCheck, api: 'LLAMA_API_KEY', model: 'LLaMA', color: 'yellow' },
    { id: 27, name: 'Mentorship Hub', icon: GraduationCap, api: 'MINIMAX_API_KEY', model: 'Minimax', color: 'lime' },
    { id: 28, name: 'Events Learning', icon: Calendar, api: 'LLAMA_4_API_KEY', model: 'LLaMA 4', color: 'green' },
    { id: 29, name: 'Knowledge Feed', icon: Brain, api: 'GROCK_API_KEY', model: 'Grok', color: 'emerald' },
    { id: 30, name: 'Study Materials', icon: BookOpen, api: 'OPENAI_API_KEY', model: 'GPT-4o', color: 'teal' },
    { id: 31, name: 'Parent Portal', icon: Users, api: 'TWILIO_API_KEY', model: 'Twilio', color: 'cyan' },
    { id: 32, name: 'Teacher Hub', icon: School, api: 'CLAUDE_API_KEY', model: 'Claude 3', color: 'sky' },
    { id: 33, name: 'Rural Access Hub', icon: Smartphone, api: 'TWILIO_API_KEY', model: 'Twilio', color: 'blue' },
    { id: 34, name: 'Live Study Sessions', icon: Video, api: 'MINIMAX_API_KEY', model: 'Minimax', color: 'indigo' },
    { id: 35, name: 'Resource Marketplace', icon: ShoppingCart, api: 'LLAMA_4_API_KEY', model: 'LLaMA 4', color: 'violet' }
  ];

  const zambian_languages = ['Bemba', 'Nyanja', 'Tonga', 'Lozi', 'Lunda', 'Kaonde', 'Luvale'];

  const handlePageLaunch = (page: any) => {
    toast({
      title: `Launching ${page.name}`,
      description: `ECZ-aligned features powered by ${page.model} with 7-language support`,
    });
    setIsOpen(false);
    // Navigate to the specific page
    window.location.href = `/${page.name.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg shadow-lg"
        >
          🇿🇲 Edu Browse - World's #1 E-Learning Platform
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            🇿🇲 Edu Zambia Platform - 350 AI Features Across 35 Pages
          </DialogTitle>
          <div className="text-center mb-6">
            <Badge variant="secondary" className="mr-2">ECZ Aligned</Badge>
            <Badge variant="secondary" className="mr-2">16+ AI Models</Badge>
            <Badge variant="secondary" className="mr-2">7 Zambian Languages</Badge>
            <Badge variant="secondary" className="mr-2">Rural SMS Access</Badge>
            <Badge variant="secondary">GDPR Compliant</Badge>
          </div>
        </DialogHeader>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Supported Zambian Languages:</h3>
          <div className="flex flex-wrap gap-2">
            {zambian_languages.map((lang) => (
              <Badge key={lang} variant="outline" className="text-sm">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {platformPages.map((page) => (
            <Card 
              key={page.id} 
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-${page.color}-500`}
              onClick={() => handlePageLaunch(page)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <page.icon className={`h-6 w-6 text-${page.color}-600`} />
                  <Badge variant="secondary" className="text-xs">
                    Page {page.id}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-semibold">
                  {page.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs mb-2">
                  Powered by {page.model}
                </CardDescription>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    10 Features
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ECZ Aligned
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Offline Ready
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Platform Highlights:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">🌍 Global Leadership:</h4>
              <p>Surpasses ChatEdu, UnstuckStudy, SchoolGoat, edX, and Coursera with integrated social networking and ECZ alignment.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">📱 Rural Access:</h4>
              <p>SMS support via Twilio and offline kiosks with Firebase ML for remote areas.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">🔒 Security & Privacy:</h4>
              <p>GDPR-compliant with Supabase secure data management and accessibility features.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">🤖 AI Integration:</h4>
              <p>16+ AI models with branching feedback and multi-language narration support.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EduBrowseButton;
