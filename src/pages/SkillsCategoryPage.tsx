import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  Wrench, Hammer, MonitorSmartphone, Utensils, Paintbrush, Truck,
  Stethoscope, Music, Camera, Scissors, BookOpen, Brain, Video,
  Trophy, Target, Sparkles, Layers, ChevronRight
} from 'lucide-react';

const skillCategories = [
  {
    id: 'digital',
    title: 'Digital Skills',
    description: 'Technology, coding, design, data analysis',
    icon: MonitorSmartphone,
    color: 'from-blue-500 to-cyan-500',
    skills: ['Web Development', 'Data Entry', 'Graphic Design', 'Social Media Marketing', 'Microsoft Office', 'Mobile App Development'],
  },
  {
    id: 'trades',
    title: 'Trades & Construction',
    description: 'Carpentry, plumbing, welding, electrical work',
    icon: Hammer,
    color: 'from-orange-500 to-amber-500',
    skills: ['Carpentry', 'Plumbing', 'Welding', 'Electrical Installation', 'Bricklaying', 'Painting & Decoration'],
  },
  {
    id: 'automotive',
    title: 'Automotive & Mechanical',
    description: 'Motor vehicle repair, engineering, maintenance',
    icon: Wrench,
    color: 'from-gray-600 to-gray-800',
    skills: ['Auto Mechanics', 'Diesel Engines', 'Auto Electrical', 'Panel Beating', 'Spray Painting', 'Heavy Equipment'],
  },
  {
    id: 'culinary',
    title: 'Culinary & Hospitality',
    description: 'Cooking, baking, hotel management, food safety',
    icon: Utensils,
    color: 'from-red-500 to-pink-500',
    skills: ['Professional Cooking', 'Baking & Pastry', 'Food Safety', 'Hotel Management', 'Bartending', 'Event Catering'],
  },
  {
    id: 'creative',
    title: 'Creative Arts',
    description: 'Tailoring, photography, music, graphic arts',
    icon: Paintbrush,
    color: 'from-purple-500 to-violet-500',
    skills: ['Tailoring & Fashion', 'Photography', 'Video Production', 'Music Production', 'Interior Design', 'Crafts & Textiles'],
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Farming',
    description: 'Crop farming, livestock, aquaculture, agribusiness',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-500',
    skills: ['Crop Farming', 'Livestock Management', 'Poultry Farming', 'Fish Farming', 'Beekeeping', 'Agribusiness'],
  },
  {
    id: 'health',
    title: 'Health & Beauty',
    description: 'Hairdressing, cosmetology, community health',
    icon: Scissors,
    color: 'from-pink-500 to-rose-500',
    skills: ['Hairdressing', 'Cosmetology', 'Nail Technology', 'Community Health', 'First Aid', 'Fitness Training'],
  },
  {
    id: 'transport',
    title: 'Transport & Logistics',
    description: 'Driving, warehousing, supply chain, logistics',
    icon: Truck,
    color: 'from-indigo-500 to-blue-500',
    skills: ['Professional Driving', 'Warehousing', 'Supply Chain', 'Freight Management', 'Fleet Management', 'Import/Export'],
  },
];

export default function SkillsCategoryPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategory = skillCategories.find(c => c.id === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Target className="w-8 h-8 text-primary" /> Choose Your Focus Area
        </h1>
        <p className="text-muted-foreground">Select the skill category that matches your career goals</p>
      </div>

      {!selectedCategory ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => (
            <Card
              key={cat.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group"
              onClick={() => setSelectedCategory(cat.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${cat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <Badge variant="outline" className="mt-3">{cat.skills.length} skills</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : activeCategory && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setSelectedCategory(null)}>← Back</Button>
            <div className={`w-10 h-10 bg-gradient-to-r ${activeCategory.color} rounded-lg flex items-center justify-center`}>
              <activeCategory.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{activeCategory.title}</h2>
              <p className="text-sm text-muted-foreground">{activeCategory.description}</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {activeCategory.skills.map((skill) => (
              <Card key={skill} className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => navigate('/skills/videos')}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{skill}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={0} className="h-1.5 w-24" />
                      <span className="text-xs text-muted-foreground">0%</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Button className="h-14 gap-2" onClick={() => navigate('/skills/videos')}>
              <Video className="w-5 h-5" /> Watch Tutorials
            </Button>
            <Button variant="outline" className="h-14 gap-2" onClick={() => navigate('/ai')}>
              <Brain className="w-5 h-5" /> AI Skills Coach
            </Button>
            <Button variant="outline" className="h-14 gap-2" onClick={() => navigate('/course-catalog')}>
              <BookOpen className="w-5 h-5" /> Browse Courses
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
