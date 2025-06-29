
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface StudyMaterial {
  id: number;
  user_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  subject: string | null;
  grade: number | null;
  curriculum: string;
  language: string;
  metadata: any;
  is_public: boolean;
  created_at: string;
}

interface MaterialFilters {
  subject?: string;
  grade?: number;
  curriculum?: string;
  language?: string;
  search?: string;
}

export const useStudyMaterials = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [popularMaterials, setPopularMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMaterials = async (filters: MaterialFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('study_materials')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (filters.subject) {
        query = query.eq('subject', filters.subject);
      }
      if (filters.grade) {
        query = query.eq('grade', filters.grade);
      }
      if (filters.curriculum) {
        query = query.eq('curriculum', filters.curriculum);
      }
      if (filters.language) {
        query = query.eq('language', filters.language);
      }
      if (filters.search) {
        query = query.or(`file_name.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      const errorMessage = 'Failed to fetch study materials';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('popular_materials')
        .select('*')
        .limit(10);

      if (error) throw error;
      setPopularMaterials(data || []);
    } catch (error) {
      console.error('Error fetching popular materials:', error);
    }
  };

  const uploadMaterial = async (file: File, metadata: any = {}) => {
    setUploading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('study-materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('study_materials')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_type: fileExt,
          subject: metadata.subject || null,
          grade: metadata.grade || null,
          curriculum: metadata.curriculum || 'ECZ',
          language: metadata.language || 'English',
          metadata: metadata,
          is_public: metadata.is_public || false,
        });

      if (dbError) throw dbError;

      // Trigger AI metadata tagging
      await supabase.functions.invoke('ai-material-tagger', {
        body: {
          materialId: materials.length + 1, // This should be the actual ID
          filePath,
          fileName: file.name,
        },
      });

      toast({
        title: "Success",
        description: "Material uploaded successfully",
      });

      fetchMaterials(); // Refresh the list
    } catch (error) {
      console.error('Error uploading material:', error);
      const errorMessage = 'Failed to upload material';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadMaterial = async (material: StudyMaterial) => {
    try {
      const { data, error } = await supabase.storage
        .from('study-materials')
        .download(material.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = material.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Log access
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('material_access_logs').insert({
          user_id: user.id,
          material_id: material.id,
          action: 'download',
        });
      }

      toast({
        title: "Success",
        description: "Material downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading material:', error);
      toast({
        title: "Error",
        description: "Failed to download material",
        variant: "destructive",
      });
    }
  };

  const searchMaterials = async (filters: MaterialFilters) => {
    try {
      await fetchMaterials(filters);
    } catch (error) {
      console.error('Error searching materials:', error);
      toast({
        title: "Error",
        description: "Search failed",
        variant: "destructive",
      });
    }
  };

  const refetch = fetchMaterials;

  useEffect(() => {
    fetchMaterials();
    fetchPopularMaterials();
  }, []);

  return {
    materials,
    popularMaterials,
    loading,
    uploading,
    error,
    fetchMaterials,
    uploadMaterial,
    downloadMaterial,
    searchMaterials,
    refetch,
  };
};
