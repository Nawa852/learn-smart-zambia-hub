import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen, School, User, Sparkles, ChevronRight, ChevronLeft, CheckCircle2, Award,
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { toast } from '@/hooks/use-toast';

const ZAMBIAN_PROVINCES = ['Central','Copperbelt','Eastern','Luapula','Lusaka','Muchinga','Northern','North-Western','Southern','Western'];
const ALL_GRADES = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12','College','University','TVET'];
const QUALIFICATIONS = ['Certificate','Diploma','Degree','Masters','PhD','Other'];

const STEPS = [
  { id: 'personal',     icon: User,       title: 'About You' },
  { id: 'institution',  icon: School,     title: 'School' },
  { id: 'expertise',    icon: BookOpen,   title: 'Subjects' },
  { id: 'done',         icon: Sparkles,   title: 'Done' },
];

interface Props { onComplete: () => void }

export const TeacherOnboardingWizard: React.FC<Props> = ({ onComplete }) => {
  const { profile, updateProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [qualification, setQualification] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');

  const [institutionName, setInstitutionName] = useState('');
  const [province, setProvince] = useState('');

  const [subjectInput, setSubjectInput] = useState('');
  const [subjectsTaught, setSubjectsTaught] = useState<string[]>([]);
  const [gradesTaught, setGradesTaught] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setBio(profile.bio || '');
      setQualification(profile.teacher_qualification || '');
      setYearsExperience(profile.years_experience ? String(profile.years_experience) : '');
      setInstitutionName(profile.institution_name || profile.school || '');
      setProvince(profile.province || '');
      setSubjectsTaught(profile.subjects_taught || []);
      setGradesTaught(profile.grades_taught || []);
    }
  }, [profile?.id]);

  const addSubject = () => {
    const v = subjectInput.trim();
    if (v && !subjectsTaught.includes(v)) setSubjectsTaught([...subjectsTaught, v]);
    setSubjectInput('');
  };
  const toggleGrade = (g: string) => setGradesTaught(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const handleNext = async () => {
    if (step === 0 && !fullName.trim()) { toast({ title: 'Name required', variant: 'destructive' }); return; }
    if (step === 1 && !institutionName.trim()) { toast({ title: 'School required', variant: 'destructive' }); return; }
    if (step === 2) {
      if (subjectsTaught.length === 0) { toast({ title: 'Add at least one subject', variant: 'destructive' }); return; }
      setSaving(true);
      const result = await updateProfile({
        full_name: fullName, phone, bio,
        teacher_qualification: qualification || null,
        years_experience: yearsExperience ? parseInt(yearsExperience, 10) : null,
        school: institutionName,
        institution_name: institutionName,
        institution_type: 'school',
        province,
        subjects_taught: subjectsTaught,
        grades_taught: gradesTaught,
        device_setup_complete: true,
      });
      setSaving(false);
      if (!result.success) { toast({ title: 'Save failed', variant: 'destructive' }); return; }
      toast({ title: 'Teacher profile saved! 🎓' });
    }
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };
  const handleBack = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome, Educator</h1>
        <p className="text-muted-foreground">Set up your teaching workspace</p>
      </div>

      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex-1 flex items-center gap-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
              i < step ? 'bg-primary text-primary-foreground' :
              i === step ? 'bg-primary/20 text-primary border-2 border-primary' :
              'bg-muted text-muted-foreground'
            }`}>
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-1 rounded ${i < step ? 'bg-primary' : 'bg-muted'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              {step === 0 && (
                <>
                  <div className="text-center space-y-2">
                    <User className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">About You</h2>
                  </div>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div><Label>Full Name *</Label><Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g., Mr. Banda" /></div>
                    <div><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+260..." /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="flex items-center gap-2"><Award className="w-4 h-4" /> Qualification</Label>
                        <Select value={qualification} onValueChange={setQualification}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>{QUALIFICATIONS.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Years of Experience</Label>
                        <Input type="number" min="0" max="60" value={yearsExperience} onChange={e => setYearsExperience(e.target.value)} placeholder="5" />
                      </div>
                    </div>
                    <div>
                      <Label>Bio (shown to students)</Label>
                      <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Brief intro about your teaching..." />
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="text-center space-y-2">
                    <School className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">Where do you teach?</h2>
                  </div>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <Label>School / Institution *</Label>
                      <Input value={institutionName} onChange={e => setInstitutionName(e.target.value)} placeholder="e.g., Lusaka Boys Secondary" />
                    </div>
                    <div>
                      <Label>Province</Label>
                      <Select value={province} onValueChange={setProvince}>
                        <SelectTrigger><SelectValue placeholder="Select province" /></SelectTrigger>
                        <SelectContent>{ZAMBIAN_PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center space-y-2">
                    <BookOpen className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">What do you teach?</h2>
                  </div>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <Label>Subjects *</Label>
                      <div className="flex gap-2">
                        <Input value={subjectInput} onChange={e => setSubjectInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                          placeholder="e.g., Mathematics" />
                        <Button type="button" variant="secondary" onClick={addSubject}>Add</Button>
                      </div>
                      {subjectsTaught.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {subjectsTaught.map(s => (
                            <Badge key={s} variant="secondary" className="cursor-pointer" onClick={() => setSubjectsTaught(subjectsTaught.filter(x => x !== s))}>
                              {s} ✕
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label>Grades / Levels Taught</Label>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {ALL_GRADES.map(g => (
                          <Badge key={g} variant={gradesTaught.includes(g) ? 'default' : 'outline'} className="cursor-pointer" onClick={() => toggleGrade(g)}>
                            {g}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="text-center space-y-6 py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Sparkles className="w-20 h-20 text-primary mx-auto" />
                  </motion.div>
                  <h2 className="text-3xl font-bold">Workspace Ready! 🎓</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Create classes, build lessons with AI, take attendance, and message parents — all in one place.
                  </p>
                  <Button size="lg" className="text-lg h-14 px-8" onClick={onComplete}>
                    Open Teacher Dashboard <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {step < 3 && (
                <div className="flex items-center justify-between pt-2">
                  <Button variant="ghost" onClick={handleBack} disabled={step === 0}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={saving}>
                    {step === 2 ? (saving ? 'Saving...' : 'Finish') : 'Next'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TeacherOnboardingWizard;
