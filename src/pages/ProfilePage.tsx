import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User, MapPin, Calendar, BookOpen, Users, Settings, Camera, Edit3,
  Heart, MessageCircle, Trophy, Target, Star, Award, Zap, TrendingUp
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    grade_level: profile?.grade_level || '',
    bio: profile?.bio || '',
  });

  const achievements = [
    { name: 'Study Streak', description: '30 days consecutive', icon: Target, color: 'text-warning' },
    { name: 'Top Performer', description: 'Mathematics', icon: Trophy, color: 'text-primary' },
    { name: 'Community Helper', description: '50+ answers', icon: Users, color: 'text-accent' },
    { name: 'AI Explorer', description: 'Used all AI tools', icon: Star, color: 'text-success' },
    { name: 'Fast Learner', description: 'Completed 5 courses', icon: Zap, color: 'text-warning' },
    { name: 'Rising Star', description: 'Top 10% this month', icon: TrendingUp, color: 'text-primary' },
  ];

  const subjects = [
    { name: 'Mathematics', progress: 85, grade: 'A-' },
    { name: 'Physics', progress: 78, grade: 'B+' },
    { name: 'Chemistry', progress: 92, grade: 'A' },
    { name: 'English', progress: 88, grade: 'A-' },
    { name: 'History', progress: 76, grade: 'B+' },
  ];

  const stats = [
    { value: '127', label: 'Study Hours', color: 'text-primary' },
    { value: '8', label: 'Courses', color: 'text-success' },
    { value: '24', label: 'Achievements', color: 'text-warning' },
    { value: '156', label: 'Friends', color: 'text-accent' },
  ];

  const handleSave = async () => {
    const result = await updateProfile({
      full_name: formData.full_name,
      grade_level: formData.grade_level,
      bio: formData.bio,
    });
    if (result.success) setIsEditing(false);
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'progress', label: 'Progress' },
    { id: 'achievements', label: 'Achievements' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto p-4 md:p-6 max-w-5xl relative z-10">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-card border border-border/30 shadow-xl mb-6 overflow-hidden">
            {/* Cover gradient */}
            <div className="h-40 md:h-48 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
              <Button
                variant="ghost" size="icon"
                className="absolute top-4 right-4 bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm rounded-xl"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-5 -mt-16">
                {/* Avatar */}
                <div className="relative">
                  <div className="p-1 rounded-full glow-border">
                    <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-card">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback className="text-3xl font-bold" style={{ background: 'var(--gradient-bright-sphere)', color: 'white' }}>
                        {profile?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <Button
                    variant="ghost" size="icon"
                    className="absolute bottom-1 right-1 w-8 h-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Info */}
                <div className="flex-1 mt-2 md:mt-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                        {profile?.full_name || 'Student Name'}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                        {profile?.grade && (
                          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> Grade {profile.grade}</span>
                        )}
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Zambia</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-primary/15 text-primary border-primary/30 capitalize">{profile?.role || 'Student'}</Badge>
                        <Badge variant="outline" className="border-border/40">Active Learner</Badge>
                        <Badge variant="outline" className="border-border/40">AI Explorer</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-border/30 hover:border-primary/40 gap-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                      <Button
                        variant="outline" size="icon"
                        onClick={() => navigate('/settings')}
                        className="border-border/30 hover:border-primary/40"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/20">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-xl md:text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === s.id
                  ? 'bg-primary/15 text-primary border border-primary/20 glow-border'
                  : 'bg-secondary/30 text-muted-foreground hover:text-foreground border border-border/20 hover:border-border/40'
              }`}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        {activeSection === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="glass-card border border-border/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="w-5 h-5 text-primary" />
                    <span className="gradient-text">Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Full Name</Label>
                        <Input value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} className="bg-secondary/40 border-border/30 focus:border-primary/50 mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Grade Level</Label>
                        <Input value={formData.grade_level} onChange={e => setFormData({ ...formData, grade_level: e.target.value })} className="bg-secondary/40 border-border/30 focus:border-primary/50 mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Bio</Label>
                        <Textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell us about yourself..." className="bg-secondary/40 border-border/30 focus:border-primary/50 mt-1" />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button onClick={handleSave} className="bg-primary text-primary-foreground glow-primary">Save</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="border-border/30">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[
                        { label: 'Email', value: profile?.email },
                        { label: 'Grade', value: profile?.grade || 'Not specified' },
                        { label: 'School', value: profile?.school || 'Not specified' },
                        { label: 'Province', value: profile?.province || 'Not specified' },
                        { label: 'Bio', value: profile?.bio || 'No bio yet' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-border/10 last:border-0">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-medium text-foreground/90">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="glass-card border border-border/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-accent" />
                    Learning Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'].map((interest) => (
                      <Badge key={interest} className="bg-secondary/40 text-foreground/80 border-border/30 hover:border-primary/30 hover:bg-primary/10 transition-all cursor-pointer">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border border-border/30 shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="w-5 h-5 text-destructive" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: Heart, color: 'text-destructive', text: "Liked Sarah's mathematics post" },
                    { icon: MessageCircle, color: 'text-primary', text: 'Commented on physics discussion' },
                    { icon: BookOpen, color: 'text-success', text: 'Completed Chemistry Chapter 5' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/30 transition-colors">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-sm text-foreground/80">{item.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {activeSection === 'progress' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject, i) => (
              <motion.div key={subject.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card border border-border/30 shadow-lg hover:border-primary/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">{subject.name}</h3>
                      <Badge className="bg-primary/15 text-primary border-primary/30">{subject.grade}</Badge>
                    </div>
                    <Progress value={subject.progress} className="mb-3 h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{subject.progress}% Complete</span>
                      <span>Grade: {subject.grade}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                <Card className="glass-card border border-border/30 shadow-lg hover:border-primary/20 hover:shadow-xl transition-all group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary/40 border border-border/20 flex items-center justify-center group-hover:scale-110 transition-transform ${achievement.color}`}>
                      <achievement.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold mb-1 text-foreground">{achievement.name}</h3>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
