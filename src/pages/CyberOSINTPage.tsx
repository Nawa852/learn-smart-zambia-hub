import React, { useState } from 'react';
import { Eye, Globe, Search, User, MapPin, Camera, Hash, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const tools = [
  { name: 'Username Search', icon: User, desc: 'Check username across platforms', placeholder: 'Enter username...' },
  { name: 'Domain Lookup', icon: Globe, desc: 'WHOIS and DNS information', placeholder: 'Enter domain...' },
  { name: 'Email Verification', icon: Hash, desc: 'Check if email has been in breaches', placeholder: 'Enter email...' },
  { name: 'Image Analysis', icon: Camera, desc: 'Extract metadata from images', placeholder: 'Paste image URL...' },
  { name: 'IP Geolocation', icon: MapPin, desc: 'Locate IP address geographically', placeholder: 'Enter IP address...' },
  { name: 'Google Dorking', icon: Search, desc: 'Advanced search operators', placeholder: 'site:example.com filetype:pdf' },
];

const exercises = [
  { title: 'Find the Hidden Profile', difficulty: 'Easy', points: 100, desc: 'Use username enumeration to find a target\'s social media presence' },
  { title: 'Domain Intelligence', difficulty: 'Medium', points: 200, desc: 'Gather information about a company through public DNS records' },
  { title: 'Photo Geolocation', difficulty: 'Hard', points: 400, desc: 'Determine location from image metadata and visual clues' },
  { title: 'Corporate Recon', difficulty: 'Medium', points: 250, desc: 'Map an organization\'s digital footprint ethically' },
];

const CyberOSINTPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Eye className="h-8 w-8 text-primary" /> OSINT Investigation
      </h1>
      <p className="text-muted-foreground mt-1">Open Source Intelligence gathering tools and exercises (ethical use only)</p>
    </div>
    <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-500/5 to-yellow-500/10">
      <CardContent className="p-4">
        <p className="text-sm font-medium flex items-center gap-2">⚠️ <strong>Ethics Reminder:</strong> Only use OSINT techniques on targets you have permission to investigate. Never use for harassment or stalking.</p>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map(t => (
        <Card key={t.name} className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <t.icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{t.desc}</p>
            <div className="flex gap-2">
              <Input placeholder={t.placeholder} className="flex-1" />
              <Button size="sm" onClick={() => toast.success('Search simulated - practice mode')}>Search</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <h3 className="font-semibold text-lg">Practice Exercises</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {exercises.map(e => (
        <Card key={e.title} className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-muted-foreground">{e.desc}</p>
            </div>
            <div className="text-right">
              <Badge className={e.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : e.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-600'}>{e.difficulty}</Badge>
              <p className="text-xs text-muted-foreground mt-1">{e.points} pts</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberOSINTPage;
