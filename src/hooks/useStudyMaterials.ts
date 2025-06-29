
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

export interface StudyMaterial {
  id: number;
  user_id: string | null;
  file_name: string;
  file_path: string;
  file_type: string | null;
  subject: string | null;
  grade: number | null;
  curriculum: string | null;
  language: string | null;
  metadata: any;
  is_public: boolean | null;
  created_at: string | null;
}

export interface MaterialAccessLog {
  id: number;
  user_id: string | null;
  material_id: number | null;
  action: string | null;
  created_at: string | null;
}

export const useStudyMaterials = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [popularMaterials, setPopularMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const fetchMaterials = async (filters?: {
    subject?: string;
    grade?: number;
    curriculum?: string;
    language?: string;
    search?: string;
  }) => {
    try {
      let query = supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.subject) {
        query = query.eq('subject', filters.subject);
      }
      if (filters?.grade) {
        query = query.eq('grade', filters.grade);
      }
      if (filters?.curriculum) {
        query = query.eq('curriculum', filters.curriculum);
      }
      if (filters?.language) {
        query = query.eq('language', filters.language);
      }
      if (filters?.search) {
        query = query.or(`file_name.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Failed to fetch study materials');
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

  const uploadMaterial = async (
    file: File,
    metadata: {
      subject?: string;
      grade?: number;
      curriculum?: string;
      language?: string;
      isPublic?: boolean;
    }
  ) => {
    if (!user) return null;
    
    setUploading(true);
    try {
      // Upload file to storage
      const fileName = `${user.id}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('study-materials')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get file type
      const fileType = file.type.split('/')[1] || file.name.split('.').pop();

      // Insert material record
      const { data, error } = await supabase
        .from('study_materials')
        .insert([{
          user_id: user.id,
          file_name: file.name,
          file_path: uploadData.path,
          file_type: fileType,
          subject: metadata.subject,
          grade: metadata.grade,
          curriculum: metadata.curriculum || 'ECZ',
          language: metadata.language || 'English',
          is_public: metadata.isPublic || false,
          metadata: {
            size: file.size,
            uploadedAt: new Date().toISOString(),
            originalName: file.name
          }
        }])
        .select()
        .single();

      if (error) throw error;

      setMaterials(prev => [data, ...prev]);
      toast.success('Material uploaded successfully');
      
      // Call AI tagging function if available
      try {
        await supabase.functions.invoke('ai-material-tagger', {
          body: { 
            materialId: data.id,
            filePath: uploadData.path,
            fileName: file.name
          }
        });
      } catch (aiError) {
        console.log('AI tagging not available:', aiError);
      }

      return data;
    } catch (error) {
      console.error('Error uploading material:', error);
      toast.error('Failed to upload material');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const downloadMaterial = async (material: StudyMaterial) => {
    if (!user) return;

    try {
      // Log download action
      await supabase
        .from('material_access_logs')
        .insert([{
          user_id: user.id,
          material_id: material.id,
          action: 'download'
        }]);

      // Get download URL
      const { data, error } = await supabase.storage
        .from('study-materials')
        .download(material.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = material.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Download started');
    } catch (error) {
      console.error('Error downloading material:', error);
      toast.error('Failed to download material');
    }
  };

  const deleteMaterial = async (materialId: number) => {
    if (!user) return;

    try {
      const material = materials.find(m => m.id === materialId);
      if (!material) return;

      // Delete from storage
      await supabase.storage
        .from('study-materials')
        .remove([material.file_path]);

      // Delete from database
      const { error } = await supabase
        .from('study_materials')
        .delete()
        .eq('id', materialId)
        .eq('user_id', user.id);

      if (error) throw error;

      setMaterials(prev => prev.filter(m => m.id !== materialId));
      toast.success('Material deleted successfully');
    } catch (error) {
      console.error('Error deleting material:', error);
      toast.error('Failed to delete material');
    }
  };

  const searchMaterials = async (query: string, language: string = 'English') => {
    try {
      // First try local search
      await fetchMaterials({ search: query, language });

      // Then try AI-powered multilingual search if available
      try {
        const { data: aiResults } = await supabase.functions.invoke('ai-material-search', {
          body: { 
            query,
            language,
            userId: user?.id 
          }
        });

        if (aiResults?.materials) {
          setMaterials(aiResults.materials);
        }
      } catch (aiError) {
        console.log('AI search not available:', aiError);
      }
    } catch (error) {
      console.error('Error searching materials:', error);
      toast.error('Search failed');
    }
  };

  const getFilePreview = async (material: StudyMaterial) => {
    try {
      const { data } = await supabase.storage
        .from('study-materials')
        .createSignedUrl(material.file_path, 3600);

      return data?.signedUrl;
    } catch (error) {
      console.error('Error getting preview:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchPopularMaterials();
  }, [user]);

  return {
    materials,
    popularMaterials,
    loading,
    uploading,
    fetchMaterials,
    uploadMaterial,
    downloadMaterial,
    deleteMaterial,
    searchMaterials,
    getFilePreview,
    refetch: fetchMaterials
  };
};
