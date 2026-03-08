import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  User, Smartphone, Calendar, CheckCircle2, ChevronRight, ChevronLeft, Sparkles
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { DeviceSetupWizard } from '@/components/Onboarding/DeviceSetupWizard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from '@/hooks/use-toast';

const STEPS = [
  { id: 'profile', icon: User, title: 'Complete Profile' },
  { id: 'device', icon: Smartphone, title: 'Device Setup' },
  { id: 'schedule', icon: Calendar, title: 'Study Schedule' },
  { id: 'done', icon: Sparkles, title: 'All Set!' },
];

const ZAMBIAN_PROVINCES = [
  'Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka',
  'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'
];

const GRADES = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, updateProfile, refetch } = useProfile();
  const { schedules, addSchedule } = useStudySchedule();
  const [step, setStep] = useState(0);

  // Profile form
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [province, setProvince] = useState('');
  const [phone, setPhone] = useState('');

  // Schedule form
  const [newSubject, setNewSubject] = useState('');
  const [newStart, setNewStart] = useState('16:00');
  const [newEnd, setNewEnd] = useState('17:00');
  const [newDays, setNewDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setGrade(profile.grade || '');
      setSchool(profile.school || '');
      setProvince(profile.province || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  // Auto-advance if conditions already met
  useEffect(() => {
    if (profile && step === 0 && profile.full_name?.trim()) {
      // Profile already complete, check device
      if ((profile as any).device_setup_complete) {
        if (schedules.length > 0) {
          setStep(3); // All done
        } else {
          setStep(2); // Need schedule
        }
      } else {
        setStep(1); // Need device setup
      }
    }
  }, [profile, schedules]);

  const handleProfileSave = async () => {
    if (!fullName.trim()) {
      toast({ title: 'Name required', description: 'Please enter your full name', variant: 'destructive' });
      return;
    }
    const result = await updateProfile({ full_name: fullName, grade, school, province, phone });
    if (result.success) {
      toast({ title: 'Profile saved!' });
      setStep(1);
    } else {
      toast({ title: 'Error saving profile', variant: 'destructive' });
    }
  };

  const handleDeviceComplete = async () => {
    if (user) {
      await supabase.from('profiles').update({ device_setup_complete: true }).eq('id', user.id);
      await refetch();
    }
    setStep(2);
  };

  const handleAddSchedule = async () => {
    if (!newSubject.trim()) {
      toast({ title: 'Subject required', variant: 'destructive' });
      return;
    }
    await addSchedule({ subject: newSubject, startTime: newStart, endTime: newEnd, days: newDays });
    setNewSubject('');
    toast({ title: 'Schedule added!' });
  };

  const handleFinish = () => {
    navigate('/dashboard', { replace: true });
  };

  const toggleDay = (day: string) => {
    setNewDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">🛡️ Setup Your Learning Environment</h1>
          <p className="text-muted-foreground">Complete these steps to unlock your dashboard</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex-1 flex items-center gap-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                i < step ? 'bg-primary text-primary-foreground' :
                i === step ? 'bg-primary/20 text-primary border-2 border-primary' :
                'bg-muted text-muted-foreground'
              }`}>
                {i < step ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 rounded ${i < step ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <User className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">Complete Your Profile</h2>
                    <p className="text-muted-foreground">Tell us about yourself so we can personalise your learning</p>
                  </div>

                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <Label>Full Name *</Label>
                      <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g., Mwila Chanda" />
                    </div>
                    <div>
                      <Label>Grade</Label>
                      <Select value={grade} onValueChange={setGrade}>
                        <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                        <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>School</Label>
                      <Input value={school} onChange={e => setSchool(e.target.value)} placeholder="e.g., Lusaka Boys Secondary" />
                    </div>
                    <div>
                      <Label>Province</Label>
                      <Select value={province} onValueChange={setProvince}>
                        <SelectTrigger><SelectValue placeholder="Select province" /></SelectTrigger>
                        <SelectContent>{ZAMBIAN_PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Phone (optional)</Label>
                      <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+260..." />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button size="lg" onClick={handleProfileSave} disabled={!fullName.trim()}>
                      Save & Continue <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card>
                <CardContent className="p-8">
                  <DeviceSetupWizard onComplete={handleDeviceComplete} onSkip={handleDeviceComplete} />
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <Calendar className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">Create a Study Schedule</h2>
                    <p className="text-muted-foreground">Add at least one study slot. We'll remind you when it's time!</p>
                  </div>

                  {/* Existing schedules */}
                  {schedules.length > 0 && (
                    <div className="space-y-2">
                      <Label>Your Schedules</Label>
                      {schedules.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <span className="font-medium">{s.subject}</span>
                            <span className="text-sm text-muted-foreground ml-2">{s.startTime}–{s.endTime}</span>
                            <div className="flex gap-1 mt-1">
                              {s.days.map(d => <Badge key={d} variant="secondary" className="text-xs">{d}</Badge>)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add schedule form */}
                  <div className="space-y-4 max-w-md mx-auto border rounded-lg p-4">
                    <div>
                      <Label>Subject</Label>
                      <Input value={newSubject} onChange={e => setNewSubject(e.target.value)} placeholder="e.g., Mathematics" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <Input type="time" value={newStart} onChange={e => setNewStart(e.target.value)} />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input type="time" value={newEnd} onChange={e => setNewEnd(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Label>Days</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {DAYS.map(day => (
                          <Badge
                            key={day}
                            variant={newDays.includes(day) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleDay(day)}
                          >
                            {day}
                          </Badge>
                        )))}
                      </div>
                    </div>
                    <Button onClick={handleAddSchedule} className="w-full" disabled={!newSubject.trim()}>
                      Add Schedule
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <Button size="lg" onClick={() => setStep(3)} disabled={schedules.length === 0}>
                      Continue <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardContent className="p-8 text-center space-y-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                    <Sparkles className="w-20 h-20 text-primary mx-auto" />
                  </motion.div>
                  <h2 className="text-3xl font-bold">You're All Set! 🎉</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Your profile is complete, your device is configured, and your study schedule is ready.
                    Time to start learning!
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <Button size="lg" className="text-lg h-14 px-8" onClick={handleFinish}>
                      Go to Dashboard <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SetupPage;
