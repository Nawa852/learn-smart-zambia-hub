import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

export interface ClinicalRotation {
  id: string;
  user_id: string;
  rotation_name: string;
  supervisor_name: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
}

export const useClinicalRotations = () => {
  const [rotations, setRotations] = useState<ClinicalRotation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchRotations = useCallback(async () => {
    if (!user) { setRotations([]); setLoading(false); return; }
    try {
      const { data, error } = await supabase
        .from('clinical_rotations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRotations((data as ClinicalRotation[]) || []);
    } catch (e) {
      console.error('Error fetching rotations:', e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchRotations(); }, [fetchRotations]);

  const addRotation = async (r: Omit<ClinicalRotation, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('clinical_rotations')
      .insert({ ...r, user_id: user.id })
      .select()
      .single();
    if (error) { console.error(error); return null; }
    setRotations(prev => [data as ClinicalRotation, ...prev]);
    return data;
  };

  const updateRotation = async (id: string, updates: Partial<ClinicalRotation>) => {
    const { error } = await supabase.from('clinical_rotations').update(updates).eq('id', id);
    if (error) { console.error(error); return false; }
    setRotations(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    return true;
  };

  const deleteRotation = async (id: string) => {
    const { error } = await supabase.from('clinical_rotations').delete().eq('id', id);
    if (error) { console.error(error); return false; }
    setRotations(prev => prev.filter(r => r.id !== id));
    return true;
  };

  return { rotations, loading, addRotation, updateRotation, deleteRotation, refetch: fetchRotations };
};
