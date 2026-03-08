import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Search, Users, Filter, Star, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const PROVINCES = ['All Provinces', 'Lusaka', 'Copperbelt', 'Southern', 'Central', 'Eastern', 'Northern', 'Western', 'Luapula', 'Muchinga', 'North-Western'];
const CATEGORIES = ['All Categories', 'Trades', 'Automotive', 'Culinary', 'Digital', 'Agriculture', 'Health', 'Creative'];

interface Apprenticeship {
  id: string;
  title: string;
  company_name: string | null;
  province: string | null;
  duration_weeks: number | null;
  skill_category: string;
  description: string | null;
  status: string;
}

const SkillsApprenticeshipMatchPage = () => {
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('All Provinces');
  const [category, setCategory] = useState('All Categories');
  const [apprenticeships, setApprenticeships] = useState<Apprenticeship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      let query = supabase.from('apprenticeships').select('*').eq('status', 'open');
      if (province !== 'All Provinces') query = query.eq('province', province);
      if (category !== 'All Categories') query = query.eq('skill_category', category);
      const { data } = await query.order('created_at', { ascending: false });
      setApprenticeships((data as Apprenticeship[]) || []);
      setLoading(false);
    };
    fetch();
  }, [province, category]);

  const filtered = apprenticeships.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.company_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Star className="h-8 w-8 text-primary" /> Apprenticeship Matching
        </h1>
        <p className="text-muted-foreground mt-1">Find apprenticeships matched to your skills and location</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by title or company..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="w-44"><MapPin className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-44"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">{filtered.length} apprenticeship{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(a => (
          <Card key={a.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-1">{a.title}</h3>
              {a.company_name && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                  <Building2 className="h-3 w-3" /> {a.company_name}
                </p>
              )}
              {a.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{a.description}</p>}
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{a.skill_category}</Badge>
                {a.province && <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" />{a.province}</Badge>}
                {a.duration_weeks && <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{a.duration_weeks} weeks</Badge>}
              </div>
              <Button size="sm" className="w-full" onClick={() => toast.success('Application sent! The employer will contact you.')}>
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
        {!loading && filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No apprenticeships match your filters. Try broadening your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsApprenticeshipMatchPage;
