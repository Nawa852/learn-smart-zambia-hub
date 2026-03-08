import React, { useState, useRef } from 'react';
import { Palette, Plus, Image, Upload, Eye, ExternalLink, Trash2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

const SKILL_TAGS = ['Carpentry', 'Electrical', 'Welding', 'Plumbing', 'Automotive', 'Digital', 'Culinary', 'Agriculture', 'Tailoring', 'Other'];

interface Project {
  id: string;
  title: string;
  description: string;
  skill: string;
  images: string[];
}

const SkillsPortfolioGalleryPage = () => {
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', skill: 'Other' });
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [viewProject, setViewProject] = useState<Project | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPendingFiles(prev => [...prev, ...Array.from(e.target.files!)].slice(0, 8));
    }
  };

  const saveProject = async () => {
    if (!user || !form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setUploading(true);
    const imageUrls: string[] = [];

    for (const file of pendingFiles) {
      const ext = file.name.split('.').pop();
      const path = `portfolio/${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('uploads').upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from('uploads').getPublicUrl(path);
        imageUrls.push(data.publicUrl);
      }
    }

    const newProject: Project = {
      id: Date.now().toString(),
      title: form.title.trim(),
      description: form.description.trim(),
      skill: form.skill,
      images: imageUrls,
    };

    setProjects(prev => [newProject, ...prev]);
    setForm({ title: '', description: '', skill: 'Other' });
    setPendingFiles([]);
    setUploading(false);
    setDialogOpen(false);
    toast.success('Project added to portfolio!');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast.success('Project removed');
  };

  const allSkills = [...new Set(projects.map(p => p.skill))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Palette className="h-8 w-8 text-primary" /> Portfolio Gallery
          </h1>
          <p className="text-muted-foreground mt-1">Showcase your best work with photos and descriptions</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Project</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>New Portfolio Project</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Project title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              <Select value={form.skill} onValueChange={v => setForm(f => ({ ...f, skill: v }))}>
                <SelectTrigger><SelectValue placeholder="Skill category" /></SelectTrigger>
                <SelectContent>{SKILL_TAGS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Textarea placeholder="Describe what you built or achieved..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              <div>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                <Button variant="outline" className="w-full" onClick={() => fileRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Photos ({pendingFiles.length}/8)
                </Button>
                {pendingFiles.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {pendingFiles.map((f, i) => (
                      <div key={i} className="relative">
                        <img src={URL.createObjectURL(f)} alt="" className="w-16 h-16 rounded object-cover" />
                        <button className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5" onClick={() => setPendingFiles(prev => prev.filter((_, j) => j !== i))}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={saveProject} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Save Project'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{projects.length}</p>
          <p className="text-sm text-muted-foreground">Projects</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">{allSkills.length}</p>
          <p className="text-sm text-muted-foreground">Skills</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">{projects.reduce((a, p) => a + p.images.length, 0)}</p>
          <p className="text-sm text-muted-foreground">Photos</p>
        </CardContent></Card>
      </div>

      {/* Gallery Grid */}
      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="font-semibold text-lg mb-1">No projects yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Start building your portfolio by adding your first project</p>
            <Button onClick={() => setDialogOpen(true)}><Plus className="h-4 w-4 mr-2" /> Add First Project</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <Card key={p.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-muted/30 relative overflow-hidden">
                {p.images.length > 0 ? (
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                {p.images.length > 1 && (
                  <Badge className="absolute top-2 right-2" variant="secondary">{p.images.length} photos</Badge>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setViewProject(p)}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteProject(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
                <Badge variant="secondary" className="mt-2">{p.skill}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={!!viewProject} onOpenChange={() => setViewProject(null)}>
        <DialogContent className="max-w-2xl">
          {viewProject && (
            <>
              <DialogHeader><DialogTitle>{viewProject.title}</DialogTitle></DialogHeader>
              <Badge variant="secondary" className="w-fit">{viewProject.skill}</Badge>
              <p className="text-sm text-muted-foreground">{viewProject.description}</p>
              {viewProject.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {viewProject.images.map((url, i) => (
                    <img key={i} src={url} alt="" className="rounded-lg w-full h-40 object-cover" />
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillsPortfolioGalleryPage;
