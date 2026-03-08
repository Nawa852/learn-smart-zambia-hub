import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/UI/ProgressRing';
import {
  User, MapPin, Calendar, BookOpen, Settings, Camera, Edit3,
  Heart, MessageCircle, Trophy, Target, Star, Award, Zap, TrendingUp, CheckCircle
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ProfilePage = () => {
  const { profile, updateProfile } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    grade_level: profile?.grade_level || '',
    bio: profile?.bio || '',
  });

  // Real stats
  const [realStats, setRealStats] = useState({ courses: 0, completedLessons: 0, quizzes: 0, goals: 0 });
  const [recentActivity, setRecentActivity] = useState<{ icon: typeof CheckCircle; color: string; text: string; time: string }[]>([]);
  const [courseProgress, setCourseProgress] = useState<{ name: string; progress: number }[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [{ count: courseCount }, { count: lessonCount }, { count: quizCount }, { count: goalCount }] = await Promise.all([
        supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('lesson_completions').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('study_goals').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('completed', true),
      ]);
      setRealStats({ courses: courseCount || 0, completedLessons: lessonCount || 0, quizzes: quizCount || 0, goals: goalCount || 0 });

      // Recent activity
      const [{ data: recentLessons }, { data: recentSubs }] = await Promise.all([
        supabase.from('lesson_completions').select('completed_at, lessons(title)').eq('user_id', user.id).order('completed_at', { ascending: false }).limit(3),
        supabase.from('submissions').select('submitted_at, assignments(title)').eq('user_id', user.id).order('submitted_at', { ascending: false }).limit(2),
      ]);

      const activities: any[] = [];
      recentLessons?.forEach((l: any) => activities.push({
        icon: CheckCircle, color: 'text-emerald-500',
        text: `Completed: ${l.lessons?.title || 'Lesson'}`,
        time: l.completed_at,
      }));
      recentSubs?.forEach((s: any) => activities.push({
        icon: BookOpen, color: 'text-primary',
        text: `Submitted: ${s.assignments?.title || 'Assignment'}`,
        time: s.submitted_at,
      }));
      activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setRecentActivity(activities.slice(0, 5));

      // Course progress
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('progress, courses(title)')
        .eq('user_id', user.id)
        .limit(5);
      if (enrollments) {
        setCourseProgress(enrollments.map((e: any) => ({
          name: e.courses?.title || 'Course',
          progress: e.progress || 0,
        })));
      }
    };
    load();
  }, [user]);

  // Profile completion calculation
  const profileFields = [
    profile?.full_name,
    profile?.grade,
    profile?.school,
    profile?.province,
    profile?.bio,
    profile?.avatar_url,
  ];
  const filledFields = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round((filledFields / profileFields.length) * 100);

  // Member since
  const memberSince = profile?.created_at
    ? formatDistanceToNow(new Date(profile.created_at), { addSuffix: false })
    : null;

  const stats = [
    { value: String(realStats.completedLessons), label: 'Lessons Done', color: 'text-primary' },
    { value: String(realStats.courses), label: 'Courses', color: 'text-emerald-500' },
    { value: String(realStats.quizzes), label: 'Quizzes', color: 'text-amber-500' },
    { value: String(realStats.goals), label: 'Goals Met', color: 'text-purple-500' },
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
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto p-4 md:p-6 max-w-5xl relative z-10">
        {/* Profile Header Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="glass-card border border-border/30 shadow-xl mb-6 overflow-hidden">
            <div className="h-40 md:h-48 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
            </div>

            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-5 -mt-16">
                <div className="relative">
                  <div className="p-1 rounded-full glow-border">
                    <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-card">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback className="text-3xl font-bold" style={{ background: 'var(--gradient-bright-sphere)', color: 'white' }}>
                        {profile?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

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
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/15 text-primary border-primary/30 capitalize">{profile?.role || 'Student'}</Badge>
                        {memberSince && (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">
                            🕐 Member for {memberSince}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Profile completion ring */}
                      <ProgressRing progress={profileCompletion} size={56} strokeWidth={4} label="Profile" />
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="border-border/30 hover:border-primary/40 gap-2">
                          <Edit3 className="h-4 w-4" />
                          {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => navigate('/settings')} className="border-border/30 hover:border-primary/40">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/20">
                {stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                    <div className={`text-xl md:text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-2 mb-6">
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === s.id
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'bg-secondary/30 text-muted-foreground hover:text-foreground border border-border/20 hover:border-border/40'
              }`}>
              {s.label}
            </button>
          ))}
        </motion.div>

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
                        <Button onClick={handleSave} className="bg-primary text-primary-foreground">Save</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="border-border/30">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[
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
                    <Heart className="w-5 h-5 text-destructive" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No recent activity yet. Start learning!</p>
                  ) : (
                    recentActivity.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/30 transition-colors">
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-foreground/80 block truncate">{item.text}</span>
                          <span className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(item.time), { addSuffix: true })}</span>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {activeSection === 'progress' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseProgress.length === 0 ? (
              <Card className="md:col-span-2 glass-card border border-border/30">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No enrolled courses yet. Browse the course catalog to get started!
                </CardContent>
              </Card>
            ) : (
              courseProgress.map((course, i) => (
                <motion.div key={course.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="glass-card border border-border/30 shadow-lg hover:border-primary/20 transition-all">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4">{course.name}</h3>
                      <Progress value={course.progress} className="mb-3 h-2" />
                      <p className="text-xs text-muted-foreground">{Math.round(course.progress)}% Complete</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
