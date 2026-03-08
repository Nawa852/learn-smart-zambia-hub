import React, { useState } from 'react';
import { Palette, Plus, Image, FileText, Award, Eye, Link } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const sampleProjects = [
  { title: 'Kitchen Renovation', skill: 'Carpentry', images: 3, desc: 'Complete kitchen cabinet build and installation' },
  { title: 'Solar Installation', skill: 'Electrical', images: 5, desc: '5kW solar system installed for residential client' },
  { title: 'Website Design', skill: 'Digital', images: 2, desc: 'E-commerce website for local business' },
  { title: 'Auto Engine Rebuild', skill: 'Automotive', images: 4, desc: 'Complete Toyota Hilux engine overhaul' },
];

const SkillsPortfolioPage = () => {
  const [projects, setProjects] = useState(sampleProjects);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Palette className="h-8 w-8 text-primary" /> Portfolio Builder
          </h1>
          <p className="text-muted-foreground mt-1">Showcase your skills and completed projects</p>
        </div>
        <Button onClick={() => toast.success('Add project form opened')}><Plus className="h-4 w-4 mr-2" /> Add Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold text-primary">{projects.length}</p>
          <p className="text-sm text-muted-foreground">Projects</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold">{new Set(projects.map(p => p.skill)).size}</p>
          <p className="text-sm text-muted-foreground">Skills Showcased</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold">{projects.reduce((a, p) => a + p.images, 0)}</p>
          <p className="text-sm text-muted-foreground">Photos</p>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
          <Card key={p.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="h-32 bg-muted/30 rounded-lg mb-3 flex items-center justify-center">
                <Image className="h-12 w-12 text-muted-foreground/30" />
              </div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{p.desc}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{p.skill}</Badge>
                <span className="text-xs text-muted-foreground">{p.images} photos</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsPortfolioPage;
