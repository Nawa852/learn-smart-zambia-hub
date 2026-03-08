import React, { useState } from 'react';
import { Map, Users, School, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const PROVINCES = [
  'Lusaka', 'Copperbelt', 'Southern', 'Eastern', 'Northern',
  'Luapula', 'Western', 'North-Western', 'Central', 'Muchinga',
];

const PROVINCE_COLORS: Record<string, string> = {
  Lusaka: 'bg-blue-500', Copperbelt: 'bg-green-500', Southern: 'bg-yellow-500',
  Eastern: 'bg-orange-500', Northern: 'bg-red-500', Luapula: 'bg-purple-500',
  Western: 'bg-pink-500', 'North-Western': 'bg-teal-500', Central: 'bg-indigo-500', Muchinga: 'bg-cyan-500',
};

const MinistryProvinceMapPage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const { data: provinceData } = useQuery({
    queryKey: ['province-stats'],
    queryFn: async () => {
      const { data: profiles } = await supabase.from('profiles').select('province, role');
      const stats: Record<string, { students: number; teachers: number; total: number }> = {};
      PROVINCES.forEach(p => { stats[p] = { students: 0, teachers: 0, total: 0 }; });
      profiles?.forEach(p => {
        const prov = p.province || 'Unknown';
        if (stats[prov]) {
          stats[prov].total++;
          if (p.role === 'student') stats[prov].students++;
          if (p.role === 'teacher') stats[prov].teachers++;
        }
      });
      return stats;
    },
  });

  const selectedData = selected && provinceData ? provinceData[selected] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Map className="h-8 w-8 text-primary" /> Interactive Province Map
        </h1>
        <p className="text-muted-foreground mt-1">Click a province to see enrollment metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {PROVINCES.map(p => {
                  const data = provinceData?.[p];
                  const intensity = data ? Math.min(data.total / 10, 1) : 0;
                  return (
                    <button
                      key={p}
                      onClick={() => setSelected(p)}
                      className={`p-4 rounded-xl text-center transition-all hover:scale-105 cursor-pointer border-2 ${selected === p ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
                      style={{ backgroundColor: `hsl(var(--primary) / ${0.1 + intensity * 0.5})` }}
                    >
                      <p className="font-bold text-sm text-foreground">{p}</p>
                      <p className="text-xs text-muted-foreground mt-1">{data?.total || 0} users</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedData ? (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className={`${PROVINCE_COLORS[selected!]} text-white`}>{selected}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Total Users', value: selectedData.total, icon: Users },
                  { label: 'Students', value: selectedData.students, icon: School },
                  { label: 'Teachers', value: selectedData.teachers, icon: TrendingUp },
                  { label: 'Student:Teacher', value: selectedData.teachers ? `${Math.round(selectedData.students / selectedData.teachers)}:1` : 'N/A', icon: Users },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="flex items-center gap-2 text-sm"><m.icon className="h-4 w-4 text-muted-foreground" />{m.label}</span>
                    <span className="font-bold">{m.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card><CardContent className="p-8 text-center text-muted-foreground">Click a province to view details</CardContent></Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinistryProvinceMapPage;
