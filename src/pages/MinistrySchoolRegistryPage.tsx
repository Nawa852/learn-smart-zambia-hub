import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Users, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface SchoolInfo {
  school: string;
  student_count: number;
  teacher_count: number;
  province: string | null;
}

const MinistrySchoolRegistryPage = () => {
  const [schools, setSchools] = useState<SchoolInfo[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('school, province, role')
        .not('school', 'is', null);

      if (data) {
        const map = new Map<string, SchoolInfo>();
        data.forEach((p: any) => {
          if (!p.school) return;
          const existing = map.get(p.school) || { school: p.school, student_count: 0, teacher_count: 0, province: p.province };
          if (p.role === 'student') existing.student_count++;
          else if (p.role === 'teacher') existing.teacher_count++;
          map.set(p.school, existing);
        });
        setSchools(Array.from(map.values()).sort((a, b) => b.student_count - a.student_count));
      }
      setLoading(false);
    };
    fetchSchools();
  }, []);

  const filtered = schools.filter(s => s.school.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          School Registry
        </h1>
        <p className="text-muted-foreground mt-1">All registered schools on the platform</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search schools..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6 text-center">
            <Building2 className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold">{schools.length}</p>
            <p className="text-sm text-muted-foreground">Total Schools</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <GraduationCap className="h-8 w-8 mx-auto text-accent mb-2" />
            <p className="text-3xl font-bold">{schools.reduce((a, s) => a + s.student_count, 0)}</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <p className="text-3xl font-bold">{schools.reduce((a, s) => a + s.teacher_count, 0)}</p>
            <p className="text-sm text-muted-foreground">Total Teachers</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold">{new Set(schools.map(s => s.province).filter(Boolean)).size}</p>
            <p className="text-sm text-muted-foreground">Provinces</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading schools...</p>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed"><CardContent className="p-12 text-center text-muted-foreground">No schools found.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((school, i) => (
            <motion.div key={school.school} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">{school.school}</h3>
                  {school.province && <Badge variant="secondary" className="mb-3">{school.province}</Badge>}
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {school.student_count} students</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {school.teacher_count} teachers</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinistrySchoolRegistryPage;
