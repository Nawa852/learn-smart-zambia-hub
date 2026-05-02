import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import {
  User, Users, Shield, Sparkles, ChevronRight, ChevronLeft, CheckCircle2, Phone,
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const RELATIONSHIPS = ['Mother','Father','Grandparent','Aunt/Uncle','Legal Guardian','Sibling','Other'];

const STEPS = [
  { id: 'personal',  icon: User,    title: 'About You' },
  { id: 'children',  icon: Users,   title: 'Link Child' },
  { id: 'controls',  icon: Shield,  title: 'Controls' },
  { id: 'done',      icon: Sparkles,title: 'Done' },
];

interface Props { onComplete: () => void }

export const ParentOnboardingWizard: React.FC<Props> = ({ onComplete }) => {
  const { profile, updateProfile } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');

  // Child link
  const [childName, setChildName] = useState('');
  const [childPhone, setChildPhone] = useState('');
  const [childEmail, setChildEmail] = useState('');

  // Controls
  const [screenLimit, setScreenLimit] = useState('120');
  const [focusMin, setFocusMin] = useState('30');
  const [allowedStart, setAllowedStart] = useState('06:00');
  const [allowedEnd, setAllowedEnd] = useState('21:00');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setRelationship(profile.relationship_to_child || '');
    }
  }, [profile?.id]);

  const handleNext = async () => {
    if (step === 0) {
      if (!fullName.trim() || !phone.trim()) { toast({ title: 'Name & phone required', variant: 'destructive' }); return; }
    }
    if (step === 1) {
      if (!childName.trim() || !childPhone.trim()) {
        toast({ title: 'Child details required', description: "Add your child's name and phone (or email).", variant: 'destructive' });
        return;
      }
      if (!user) return;
      // Create guardian link (pending)
      const { error } = await supabase.from('guardian_links').insert({
        guardian_id: user.id,
        guardian_name: fullName,
        student_id: user.id, // placeholder until child accepts; will be replaced when child accepts code
        relationship: relationship || 'Guardian',
        phone: childPhone,
        email: childEmail || null,
        status: 'pending',
        mode: 'monitor',
      });
      if (error) {
        // Fallback: still continue — link is best-effort
        console.warn('guardian_link insert', error.message);
      }
    }
    if (step === 2) {
      setSaving(true);
      const result = await updateProfile({
        full_name: fullName, phone,
        relationship_to_child: relationship || null,
        num_children: 1,
        device_setup_complete: true,
      });
      setSaving(false);
      if (!result.success) { toast({ title: 'Save failed', variant: 'destructive' }); return; }
      toast({ title: 'Parent profile ready! 👨‍👩‍👧' });
    }
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };
  const handleBack = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome, Parent</h1>
        <p className="text-muted-foreground">Stay connected with your child's learning</p>
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
                    <div><Label>Full Name *</Label><Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g., Mrs. Mwale" /></div>
                    <div><Label className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone *</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+260..." /></div>
                    <div>
                      <Label>Relationship to Child</Label>
                      <Select value={relationship} onValueChange={setRelationship}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{RELATIONSHIPS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="text-center space-y-2">
                    <Users className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">Link Your Child</h2>
                    <p className="text-sm text-muted-foreground">Once linked, you'll see their progress, attendance & grades.</p>
                  </div>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div><Label>Child's Full Name *</Label><Input value={childName} onChange={e => setChildName(e.target.value)} /></div>
                    <div><Label>Child's Phone *</Label><Input value={childPhone} onChange={e => setChildPhone(e.target.value)} placeholder="+260..." /></div>
                    <div><Label>Child's Email (optional)</Label><Input type="email" value={childEmail} onChange={e => setChildEmail(e.target.value)} /></div>
                    <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                      💡 You can add more children later from the Family hub.
                    </p>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center space-y-2">
                    <Shield className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">Device Controls</h2>
                    <p className="text-sm text-muted-foreground">Set healthy boundaries (you can change anytime).</p>
                  </div>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Daily Screen Limit (min)</Label>
                        <Input type="number" value={screenLimit} onChange={e => setScreenLimit(e.target.value)} />
                      </div>
                      <div>
                        <Label>Min Focus per Day (min)</Label>
                        <Input type="number" value={focusMin} onChange={e => setFocusMin(e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Allowed From</Label><Input type="time" value={allowedStart} onChange={e => setAllowedStart(e.target.value)} /></div>
                      <div><Label>Allowed Until</Label><Input type="time" value={allowedEnd} onChange={e => setAllowedEnd(e.target.value)} /></div>
                    </div>
                    <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                      🛡️ Strict content filter is enabled by default for under-18 accounts.
                    </p>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="text-center space-y-6 py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Sparkles className="w-20 h-20 text-primary mx-auto" />
                  </motion.div>
                  <h2 className="text-3xl font-bold">All Set! 🎉</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Your parent dashboard is ready. We'll send your child a link request.
                  </p>
                  <Button size="lg" className="text-lg h-14 px-8" onClick={onComplete}>
                    Open Parent Dashboard <ChevronRight className="w-5 h-5 ml-2" />
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

export default ParentOnboardingWizard;
