import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  Heart, MessageSquare, Users, Briefcase, Award, 
  TrendingUp, Sparkles, ArrowRight, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ContributionItem {
  id: string;
  type: 'mentor' | 'volunteer' | 'fund' | 'project';
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  impact?: string;
}

// Simulated live feed data
const generateContributions = (): ContributionItem[] => [
  {
    id: '1',
    type: 'mentor',
    user: { name: 'Dr. Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop', role: 'Medical Educator' },
    action: 'started mentoring',
    target: '12 nursing students in Luapula',
    timestamp: new Date(Date.now() - 60000),
    impact: '+12 students supported',
  },
  {
    id: '2',
    type: 'volunteer',
    user: { name: 'John K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop', role: 'IT Professional' },
    action: 'volunteered for',
    target: 'Digital Literacy Program in Chipata',
    timestamp: new Date(Date.now() - 180000),
    impact: '24 hours committed',
  },
  {
    id: '3',
    type: 'fund',
    user: { name: 'ABC Foundation', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop', role: 'NGO Partner' },
    action: 'funded',
    target: 'School supplies for 500 students',
    timestamp: new Date(Date.now() - 300000),
    impact: 'K50,000 contributed',
  },
  {
    id: '4',
    type: 'project',
    user: { name: 'Grace T.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop', role: 'Teacher' },
    action: 'completed',
    target: 'ECZ Science Curriculum Module',
    timestamp: new Date(Date.now() - 600000),
    impact: '250+ downloads',
  },
  {
    id: '5',
    type: 'mentor',
    user: { name: 'Prof. Mwamba', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop', role: 'University Lecturer' },
    action: 'joined as',
    target: 'Career Guidance Mentor',
    timestamp: new Date(Date.now() - 900000),
    impact: 'Available for 10 students',
  },
];

const typeIcons = {
  mentor: Users,
  volunteer: Heart,
  fund: Briefcase,
  project: Award,
};

const typeColors = {
  mentor: 'from-purple-500 to-violet-600',
  volunteer: 'from-rose-500 to-pink-600',
  fund: 'from-emerald-500 to-green-600',
  project: 'from-blue-500 to-indigo-600',
};

const suggestions = [
  { icon: Users, label: 'Become a Mentor', description: 'Guide students in your field of expertise' },
  { icon: Heart, label: 'Volunteer Time', description: 'Support local schools and communities' },
  { icon: Briefcase, label: 'Fund a Project', description: 'Sponsor educational initiatives' },
  { icon: Award, label: 'Share Resources', description: 'Contribute learning materials' },
];

const CollaborationWall = () => {
  const [contributions, setContributions] = useState<ContributionItem[]>(generateContributions());
  const [newItem, setNewItem] = useState(false);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNewItem(true);
      setTimeout(() => setNewItem(false), 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Collaboration Wall
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Make Your Mark
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals, educators, and organizations contributing to Zambia's educational transformation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Live Contributions
              </h3>
              <span className="text-xs text-muted-foreground">Updates in real-time</span>
            </div>

            <div className="space-y-3">
              {contributions.map((item, idx) => {
                const Icon = typeIcons[item.type];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group relative ${newItem && idx === 0 ? 'ring-2 ring-primary' : ''}`}
                  >
                    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.user.avatar}
                            alt={item.user.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-gradient-to-br ${typeColors[item.type]} flex items-center justify-center`}>
                            <Icon className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{item.user.name}</span>
                            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                              {item.user.role}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.action} <span className="text-foreground font-medium">{item.target}</span>
                          </p>
                          {item.impact && (
                            <div className="flex items-center gap-2 mt-2">
                              <TrendingUp className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs text-emerald-600 font-medium">{item.impact}</span>
                            </div>
                          )}
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTime(item.timestamp)}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-6">
              <Button variant="ghost" className="text-muted-foreground">
                <MessageSquare className="w-4 h-4 mr-2" />
                View All Activity
              </Button>
            </div>
          </div>

          {/* AI Suggestions */}
          <div>
            <div className="sticky top-24">
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                Where You Can Help
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                AI suggestions based on national needs and your profile
              </p>

              <div className="space-y-4">
                {suggestions.map((suggestion, idx) => (
                  <motion.div
                    key={suggestion.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-4 bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <suggestion.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{suggestion.label}</h4>
                          <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Your Impact Potential</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your skills, you could help <span className="text-primary font-bold">47 students</span> this month
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationWall;
