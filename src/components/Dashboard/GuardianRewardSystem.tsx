import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { useGuardianData } from '@/hooks/useGuardianData';
import { useToast } from '@/hooks/use-toast';
import { Gift, Plus, Loader2, CheckCircle, Star } from 'lucide-react';

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
      const { data } = await supabase.from('guardian_rewards').select('*').eq('guardian_id', user.id).order('created_at', { ascending: false });
      if (!data) return;
      const nameMap = Object.fromEntries(students.map(s => [s.id, s.name]));
      setRewards(data.map(r => ({
        id: r.id, title: r.title, studentName: nameMap[r.student_id] || 'Student',
        targetLessons: r.target_lessons || 10, currentProgress: r.current_progress || 0, claimed: r.claimed || false,
      })));
    };
    load();
  }, [user, students]);

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) setSelectedStudent(students[0].id);
  }, [students, selectedStudent]);

  const handleAdd = async () => {
    if (!newTitle.trim() || !user || !selectedStudent) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('guardian_rewards').insert({
        guardian_id: user.id, student_id: selectedStudent,
        title: newTitle.trim(), target_lessons: parseInt(newTarget) || 10,
      });
      if (error) throw error;
      toast({ title: 'Reward created!' });
      setNewTitle(''); setShowAdd(false);
      const { data } = await supabase.from('guardian_rewards').select('*').eq('guardian_id', user.id);
      const nameMap = Object.fromEntries(students.map(s => [s.id, s.name]));
      setRewards((data || []).map(r => ({
        id: r.id, title: r.title, studentName: nameMap[r.student_id] || 'Student',
        targetLessons: r.target_lessons || 10, currentProgress: r.current_progress || 0, claimed: r.claimed || false,
      })));
    } catch {
      toast({ title: 'Failed to create reward', variant: 'destructive' });
    } finally { setSaving(false); }
  };

  if (students.length === 0) return null;

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <div className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center">
              <Gift className="w-3.5 h-3.5 text-warning" />
            </div>
            Rewards
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary" onClick={() => setShowAdd(!showAdd)}>
            <Plus className="w-3 h-3" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {showAdd && (
          <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 space-y-2 animate-fade-in">
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full h-8 rounded-lg border border-border/50 bg-secondary/40 px-2 text-xs text-foreground">
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <Input placeholder="Reward (e.g. Pizza night)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="h-8 text-xs bg-secondary/20" />
            <div className="flex gap-2">
              <Input type="number" placeholder="Target" value={newTarget} onChange={e => setNewTarget(e.target.value)} className="h-8 text-xs w-24 bg-secondary/20" />
              <Button size="sm" className="h-8 flex-1 text-xs" onClick={handleAdd} disabled={saving}>
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Create'}
              </Button>
            </div>
          </div>
        )}

        {rewards.length === 0 && !showAdd ? (
          <div className="text-center py-5">
            <Star className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No rewards yet</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Motivate learning with fun goals!</p>
          </div>
        ) : (
          rewards.slice(0, 4).map(r => {
            const pct = Math.min(100, Math.round((r.currentProgress / r.targetLessons) * 100));
            return (
              <div key={r.id} className="p-3 rounded-xl border border-border/30 hover:border-border/50 transition-all space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${r.claimed ? 'bg-accent/10' : 'bg-warning/10'}`}>
                    {r.claimed ? <CheckCircle className="w-4 h-4 text-accent" /> : <Gift className="w-4 h-4 text-warning" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                    <p className="text-[10px] text-muted-foreground">{r.studentName}</p>
                  </div>
                  {r.claimed && <span className="text-[10px] text-accent font-bold px-2 py-0.5 rounded-full bg-accent/10">Done</span>}
                </div>
                {!r.claimed && (
                  <div className="space-y-1">
                    <Progress value={pct} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground text-right">{r.currentProgress}/{r.targetLessons} lessons</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
