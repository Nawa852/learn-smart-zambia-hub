import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

export interface ClinicalCase {
  id: string;
  user_id: string;
  condition: string;
  patient_summary: string | null;
  presenting_complaint: string | null;
  diagnosis: string | null;
  outcome: string | null;
  body_system: string | null;
  accuracy_score: number | null;
  notes: string | null;
  created_at: string;
}

export const useClinicalCases = () => {
  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCases = useCallback(async () => {
    if (!user) { setCases([]); setLoading(false); return; }
    try {
      const { data, error } = await supabase
        .from('clinical_cases')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCases((data as ClinicalCase[]) || []);
    } catch (e) {
      console.error('Error fetching clinical cases:', e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchCases(); }, [fetchCases]);

  const addCase = async (c: Omit<ClinicalCase, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('clinical_cases')
      .insert({ ...c, user_id: user.id })
      .select()
      .single();
    if (error) { console.error(error); return null; }
    setCases(prev => [data as ClinicalCase, ...prev]);
    return data;
  };

  const updateCase = async (id: string, updates: Partial<ClinicalCase>) => {
    const { error } = await supabase.from('clinical_cases').update(updates).eq('id', id);
    if (error) { console.error(error); return false; }
    setCases(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    return true;
  };

  const deleteCase = async (id: string) => {
    const { error } = await supabase.from('clinical_cases').delete().eq('id', id);
    if (error) { console.error(error); return false; }
    setCases(prev => prev.filter(c => c.id !== id));
    return true;
  };

  return { cases, loading, addCase, updateCase, deleteCase, refetch: fetchCases };
};
