import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { useGuardianData } from '@/hooks/useGuardianData';
import { useToast } from '@/hooks/use-toast';
import { Gift, Plus, Loader2, CheckCircle } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  studentName: string;
  targetLessons: number;
  currentProgress: number;
  claimed: boolean;
}

export const GuardianRewardSystem = () => {
  const { user } = useSecureAuth();
  const { students } = useGuardianData();
  const { toast } = useToast();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('10');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('guardian_rewards')
        .select('*')
        .eq('guardian_id', user.id)
        .order('created_at', { ascending: false });

      if (!data) return;
      const nameMap = Object.fromEntries(students.map(s => [s.id, s.name]));
      setRewards(data.map(r => ({
        id: r.id,
        title: r.title,
        studentName: nameMap[r.student_id] || 'Student',
        targetLessons: r.target_lessons || 10,
        currentProgress: r.current_progress || 0,
        claimed: r.claimed || false,
      })));
    };
    load();
  }, [user, students]);

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0].id);
    }
  }, [students, selectedStudent]);

  const handleAdd = async () => {
    if (!newTitle.trim() || !user || !selectedStudent) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('guardian_rewards').insert({
        guardian_id: user.id,
        student_id: selectedStudent,
        title: newTitle.trim(),
        target_lessons: parseInt(newTarget) || 10,
      });
      if (error) throw error;
      toast({ title: 'Reward created!' });
      setNewTitle('');
      setShowAdd(false);
      // Reload
      const { data } = await supabase.from('guardian_rewards').select('*').eq('guardian_id', user.id);
      const nameMap = Object.fromEntries(students.map(s => [s.id, s.name]));
      setRewards((data || []).map(r => ({
        id: r.id, title: r.title, studentName: nameMap[r.student_id] || 'Student',
        targetLessons: r.target_lessons || 10, currentProgress: r.current_progress || 0, claimed: r.claimed || false,
      })));
    } catch {
      toast({ title: 'Failed to create reward', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (students.length === 0) return null;

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Gift className="w-4 h-4 text-primary" /> Reward System
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setShowAdd(!showAdd)}>
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {showAdd && (
          <div className="p-3 rounded-xl border border-border/40 bg-secondary/20 space-y-2">
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full h-8 rounded-lg border border-border bg-background px-2 text-xs"
            >
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <Input placeholder="Reward title (e.g. Pizza night)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="h-8 text-xs" />
            <div className="flex gap-2">
              <Input type="number" placeholder="Target lessons" value={newTarget} onChange={e => setNewTarget(e.target.value)} className="h-8 text-xs w-28" />
              <Button size="sm" className="h-8 flex-1 text-xs" onClick={handleAdd} disabled={saving}>
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Create'}
              </Button>
            </div>
          </div>
        )}

        {rewards.length === 0 && !showAdd ? (
          <p className="text-sm text-muted-foreground text-center py-3">No rewards yet — motivate learning!</p>
        ) : (
          rewards.slice(0, 4).map(r => (
            <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-border/30">
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                {r.claimed ? <CheckCircle className="w-4 h-4 text-accent" /> : <Gift className="w-4 h-4 text-warning" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                <p className="text-[10px] text-muted-foreground">{r.studentName} · {r.currentProgress}/{r.targetLessons} lessons</p>
              </div>
              {r.claimed && <span className="text-[10px] text-accent font-bold">Claimed</span>}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
