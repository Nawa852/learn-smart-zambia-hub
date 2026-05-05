import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Users, School, DollarSign, Target, Download } from 'lucide-react';

export default function NGOImpactPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ programs: 0, beneficiaries: 0, schools: 0, students: 0, awarded: 0, interventions: 0, reached: 0 });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [p, s, g, i] = await Promise.all([
        supabase.from('ngo_programs').select('beneficiaries_count').eq('owner_id', user.id),
        supabase.from('partner_schools').select('students_enrolled').eq('owner_id', user.id),
        supabase.from('grants').select('amount_zmw,status').eq('owner_id', user.id),
        supabase.from('school_interventions').select('students_reached').eq('owner_id', user.id),
      ]);
      setStats({
        programs: p.data?.length || 0,
        beneficiaries: (p.data || []).reduce((a: number, x: any) => a + (x.beneficiaries_count || 0), 0),
        schools: s.data?.length || 0,
        students: (s.data || []).reduce((a: number, x: any) => a + (x.students_enrolled || 0), 0),
        awarded: (g.data || []).filter((x: any) => x.status === 'awarded').reduce((a: number, x: any) => a + Number(x.amount_zmw), 0),
        interventions: i.data?.length || 0,
        reached: (i.data || []).reduce((a: number, x: any) => a + (x.students_reached || 0), 0),
      });
    })();
  }, [user?.id]);

  const exportReport = () => {
    const csv = `Metric,Value\nPrograms,${stats.programs}\nBeneficiaries,${stats.beneficiaries}\nPartner Schools,${stats.schools}\nStudents Enrolled,${stats.students}\nFunds Awarded ZMW,${stats.awarded}\nInterventions,${stats.interventions}\nStudents Reached,${stats.reached}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `impact-report-${new Date().toISOString().split('T')[0]}.csv`; a.click();
  };

  const tiles = [
    { label: 'Active Programs', value: stats.programs, icon: Target },
    { label: 'Beneficiaries', value: stats.beneficiaries.toLocaleString(), icon: Users },
    { label: 'Partner Schools', value: stats.schools, icon: School },
    { label: 'Students Enrolled', value: stats.students.toLocaleString(), icon: Users },
    { label: 'Funds Awarded', value: `ZMW ${stats.awarded.toLocaleString()}`, icon: DollarSign },
    { label: 'Interventions', value: stats.interventions, icon: Activity },
    { label: 'Students Reached', value: stats.reached.toLocaleString(), icon: Users },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Activity className="w-6 h-6" />Impact Dashboard</h2>
        <Button onClick={exportReport}><Download className="w-4 h-4 mr-2" />Export Report</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tiles.map(t => (
          <Card key={t.label}><CardContent className="p-4">
            <t.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{t.label}</p>
            <p className="text-2xl font-bold">{t.value}</p>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
