
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/Auth/AuthProvider';
import AnimatedCounter from '@/components/UI/AnimatedCounter';
import { GlowBadge } from '@/components/UI/GlowBadge';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Award, Target, TrendingUp, Users, Clock, Globe, Zap, Heart, Eye, GraduationCap, Lightbulb, Mic, Shield, Map, Coins, Wifi, Radio, CloudSun, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const zambianProverbs = [
  "Umwana ashenda atasha nyina ukunaya — A child who travels learns more than the one who stays.",
  "Icisungu cimo tacingala calo — One finger cannot lift a grain.",
  "Akabanga kakula mu mushi — Great things start small.",
  "Ubwali bushya bwafuma ku ntanda — New wisdom comes from learning.",
  "Umuti umo taushibika — A single tree cannot make a forest.",
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const [dismissedBadges, setDismissedBadges] = useLocalStorage<string[]>('dismissed-new-badges', []);

  const dailyProverb = useMemo(() => {
    const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return zambianProverbs[day % zambianProverbs.length];
  }, []);

  const dismissBadge = (id: string) => setDismissedBadges(prev => [...prev, id]);
  const isNew = (id: string) => !dismissedBadges.includes(id);

  const quickStats = [
    { title: "Study Sessions", value: 24, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", change: "+5 this week" },
    { title: "ECZ Progress", value: 78, icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10", change: "+12% this month", suffix: "%" },
    { title: "AI Interactions", value: 156, icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10", change: "Daily avg: 8" },
    { title: "Community Points", value: 1250, icon: Award, color: "text-amber-500", bg: "bg-amber-500/10", change: "Top 10%" },
  ];

  const aiPoweredFeatures = [
    { id: 'ai-tutor', title: "AI Study Assistant", description: "24/7 multilingual tutor", icon: Brain, link: "/study-assistant", gradient: "from-blue-500 to-purple-600", apiPowered: "GPT-4o" },
    { id: 'ecz-prep', title: "Smart ECZ Prep", description: "Adaptive exam preparation", icon: GraduationCap, link: "/ai-study-helper", gradient: "from-green-500 to-blue-500", apiPowered: "DeepSeek" },
    { id: 'translator', title: "Multilingual Translator", description: "7 Zambian languages", icon: Globe, link: "/multilingual-translator", gradient: "from-purple-500 to-pink-500", apiPowered: "Qwen" },
    { id: 'flashcards', title: "AI Flashcards", description: "Auto-generated cards", icon: Lightbulb, link: "/ai-flashcards", gradient: "from-orange-500 to-red-500", apiPowered: "GPT-4o", isNew: true },
    { id: 'career', title: "Career Predictions", description: "AI career pathways", icon: Target, link: "/smart-recommendations", gradient: "from-teal-500 to-cyan-500", apiPowered: "Moonshot AI" },
    { id: 'voice', title: "Voice Learning", description: "Audio lessons & Q&A", icon: Mic, link: "/comprehensive-ai-study", gradient: "from-indigo-500 to-purple-500", apiPowered: "Whisper", isNew: true },
    { id: 'mindmap', title: "Visual Mind Maps", description: "AI concept maps", icon: Eye, link: "/visual-mind-map", gradient: "from-pink-500 to-red-500", apiPowered: "Gemini" },
    { id: 'offline', title: "Offline Learning", description: "Study without internet", icon: Wifi, link: "/study-materials", gradient: "from-cyan-500 to-blue-500", apiPowered: "LLaMA 3" },
  ];

  const zambianFeatures = [
    { title: "ECZ Exam Center", description: "Grade 7, 9 & 12 prep", icon: Award, link: "/ai-study-helper", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Local Languages", description: "7 Zambian languages", icon: Globe, link: "/multilingual-translator", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Community Learning", description: "Connect with peers", icon: Users, link: "/social-feed", color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Rural Access Hub", description: "Offline & SMS support", icon: Radio, link: "/study-materials", color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Meal & Nutrition", description: "Healthy eating guide", icon: Heart, link: "/meal-planner", color: "text-pink-500", bg: "bg-pink-500/10" },
    { title: "Scholarship Finder", description: "AI-matched opportunities", icon: Coins, link: "/smart-recommendations", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  ];

  const learningProgress = [
    { subject: "Mathematics", progress: 85, grade: "A", color: "bg-blue-500", nextTopic: "Trigonometry" },
    { subject: "Physics", progress: 72, grade: "B+", color: "bg-emerald-500", nextTopic: "Waves & Sound" },
    { subject: "Chemistry", progress: 91, grade: "A+", color: "bg-purple-500", nextTopic: "Organic Chemistry" },
    { subject: "English", progress: 78, grade: "B+", color: "bg-amber-500", nextTopic: "Essay Writing" },
    { subject: "Civic Education", progress: 88, grade: "A", color: "bg-pink-500", nextTopic: "Democracy" },
  ];

  const aiInsights = [
    { title: "Study Pattern", description: "Best performance 8-10 AM", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Focus Area", description: "Algebra word problems", icon: Target, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Peer Ranking", description: "Above average in Science", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Exam Ready", description: "82% for Grade 12 Mock", icon: Shield, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const recentActivities = [
    { title: "Physics Quiz — 94%", time: "2h ago", type: "quiz" },
    { title: "Chemistry Voice Q&A", time: "4h ago", type: "voice" },
    { title: "Math Lesson (Bemba)", time: "1d ago", type: "lesson" },
    { title: "Career Assessment", time: "2d ago", type: "assessment" },
    { title: "Study Group Discussion", time: "3d ago", type: "community" },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome Header */}
      <motion.div variants={fadeUp} className="rounded-xl bg-primary p-5 sm:p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 -translate-y-16" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">
                Muli bwanji, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}! 👋
              </h1>
              <p className="text-primary-foreground/70 text-sm">Your AI learning companion is ready</p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-primary-foreground/60 text-xs shrink-0">
              <CloudSun className="w-4 h-4" />
              <span>26°C Lusaka</span>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/50 italic">💡 {dailyProverb}</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickStats.map((stat, i) => (
          <Card key={i} className="border-border/50 hover:shadow-card-hover transition-shadow group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedCounter end={stat.value} suffix={stat.suffix || ''} duration={1500} />
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.title}</p>
              <p className="text-[11px] text-muted-foreground/70 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Learning Progress */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-primary" />
                Learning Progress
              </CardTitle>
              <CardDescription className="text-xs">ECZ curriculum performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningProgress.map((subject, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] py-0 h-5">{subject.grade}</Badge>
                      <span className="text-xs font-semibold text-muted-foreground">{subject.progress}%</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={subject.progress} className="h-1.5" />
                    <div className={`absolute top-0 left-0 h-1.5 ${subject.color} rounded-full transition-all duration-500`} style={{ width: `${subject.progress}%` }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground">Next: {subject.nextTopic}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={fadeUp}>
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="w-4 h-4 text-purple-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentActivities.map((a, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-secondary/50 transition-colors -mx-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                      <p className="text-[11px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {aiInsights.map((ins, i) => (
                <div key={i} className="p-3 rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-card transition-all group cursor-pointer">
                  <div className={`w-8 h-8 ${ins.bg} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <ins.icon className={`w-4 h-4 ${ins.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{ins.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{ins.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Learning Suite */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="w-4 h-4 text-primary" />
              AI Learning Suite
            </CardTitle>
            <CardDescription className="text-xs">16+ AI models powering your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {aiPoweredFeatures.map((f, i) => (
                <Link key={i} to={f.link}>
                  <Card className="h-full border-border/40 hover:border-primary/30 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 group relative">
                    {f.isNew && isNew(f.id) && (
                      <div className="absolute top-1.5 right-1.5 z-10 flex items-center gap-0.5">
                        <GlowBadge>NEW</GlowBadge>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); dismissBadge(f.id); }}
                          className="w-4 h-4 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center"
                        >
                          <X className="w-2.5 h-2.5 text-muted-foreground" />
                        </button>
                      </div>
                    )}
                    <CardContent className="p-3 text-center">
                      <div className={`w-10 h-10 mx-auto mb-2 bg-gradient-to-r ${f.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <f.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground mb-0.5">{f.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zambian Features */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Map className="w-4 h-4 text-emerald-500" />
              Zambian Education
            </CardTitle>
            <CardDescription className="text-xs">Tailored for Zambian curriculum and culture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {zambianFeatures.map((f, i) => (
                <Link key={i} to={f.link}>
                  <div className="p-3 rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-card transition-all group">
                    <div className={`w-8 h-8 ${f.bg} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <f.icon className={`w-4 h-4 ${f.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">{f.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{f.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="w-4 h-4 text-amber-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { icon: Brain, label: "AI Tutor", link: "/study-assistant", color: "text-blue-500" },
                { icon: Lightbulb, label: "Flashcards", link: "/ai-flashcards", color: "text-purple-500" },
                { icon: Globe, label: "Translator", link: "/multilingual-translator", color: "text-emerald-500" },
                { icon: Eye, label: "Mind Maps", link: "/visual-mind-map", color: "text-pink-500" },
                { icon: Target, label: "Career AI", link: "/smart-recommendations", color: "text-amber-500" },
                { icon: Mic, label: "Voice Learn", link: "/comprehensive-ai-study", color: "text-cyan-500" },
              ].map((a, i) => (
                <Link key={i} to={a.link}>
                  <Button variant="outline" className="w-full h-16 flex-col gap-1.5 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all interactive text-xs">
                    <a.icon className={`h-5 w-5 ${a.color}`} />
                    <span className="text-muted-foreground font-medium">{a.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedDashboard;
