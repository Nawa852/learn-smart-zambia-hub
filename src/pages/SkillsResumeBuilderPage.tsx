import React, { useState } from 'react';
import { FileText, Download, User, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SkillsResumeBuilderPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', objective: '', skills: '', experience: '', education: '' });
  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" /> Resume Builder
        </h1>
        <p className="text-muted-foreground mt-1">Create a professional resume to showcase your skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader><CardTitle>Your Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Full Name</Label><Input placeholder="John Mwanza" value={form.name} onChange={e => update('name', e.target.value)} /></div>
              <div><Label>Email</Label><Input placeholder="john@email.com" value={form.email} onChange={e => update('email', e.target.value)} /></div>
              <div><Label>Phone</Label><Input placeholder="+260 97..." value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
              <div><Label>Location</Label><Input placeholder="Lusaka, Zambia" value={form.location} onChange={e => update('location', e.target.value)} /></div>
            </div>
            <div><Label>Career Objective</Label><Textarea placeholder="Brief career objective..." value={form.objective} onChange={e => update('objective', e.target.value)} rows={2} /></div>
            <div><Label>Skills (comma-separated)</Label><Input placeholder="Welding, Electrical, Plumbing..." value={form.skills} onChange={e => update('skills', e.target.value)} /></div>
            <div><Label>Work Experience</Label><Textarea placeholder="Your work experience..." value={form.experience} onChange={e => update('experience', e.target.value)} rows={4} /></div>
            <div><Label>Education</Label><Textarea placeholder="Your education..." value={form.education} onChange={e => update('education', e.target.value)} rows={3} /></div>
            <Button className="w-full" onClick={() => toast.success('Resume generated!')}><Download className="h-4 w-4 mr-2" /> Generate Resume</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-muted/20 rounded-lg p-6 min-h-[500px] border">
              <h2 className="text-2xl font-bold text-center">{form.name || 'Your Name'}</h2>
              <div className="flex justify-center gap-3 text-sm text-muted-foreground mt-1 mb-4">
                {form.email && <span>{form.email}</span>}
                {form.phone && <span>• {form.phone}</span>}
                {form.location && <span>• {form.location}</span>}
              </div>
              {form.objective && <><h3 className="font-semibold border-b pb-1 mb-2">Objective</h3><p className="text-sm mb-4">{form.objective}</p></>}
              {form.skills && <><h3 className="font-semibold border-b pb-1 mb-2">Skills</h3><div className="flex flex-wrap gap-1 mb-4">{form.skills.split(',').map(s => <span key={s} className="bg-muted px-2 py-0.5 rounded text-xs">{s.trim()}</span>)}</div></>}
              {form.experience && <><h3 className="font-semibold border-b pb-1 mb-2">Experience</h3><p className="text-sm mb-4 whitespace-pre-wrap">{form.experience}</p></>}
              {form.education && <><h3 className="font-semibold border-b pb-1 mb-2">Education</h3><p className="text-sm whitespace-pre-wrap">{form.education}</p></>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillsResumeBuilderPage;
