import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface GFile { id: string; file_name: string; file_url: string; size_bytes: number | null; mime: string | null; uploader_id: string; created_at: string; }

const GroupFilesPage: React.FC = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const [files, setFiles] = useState<GFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!groupId) return;
    const { data } = await supabase.from('group_files').select('*').eq('group_id', groupId).order('created_at', { ascending: false });
    setFiles((data as GFile[]) || []);
  };
  useEffect(() => { load(); }, [groupId]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !groupId) return;
    setUploading(true);
    try {
      const path = `groups/${groupId}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from('uploads').upload(path, file);
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from('uploads').getPublicUrl(path);
      const { error } = await supabase.from('group_files').insert({
        group_id: groupId, uploader_id: user.id, file_url: pub.publicUrl,
        file_name: file.name, mime: file.type, size_bytes: file.size,
      });
      if (error) throw error;
      toast.success('Uploaded'); load();
    } catch (err: any) { toast.error(err.message); }
    finally { setUploading(false); if (inputRef.current) inputRef.current.value = ''; }
  };

  const del = async (f: GFile) => {
    if (!confirm('Delete this file?')) return;
    await supabase.from('group_files').delete().eq('id', f.id);
    load();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Group Files</CardTitle>
        <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
          <Upload className="h-4 w-4 mr-2" /> {uploading ? 'Uploading...' : 'Upload'}
        </Button>
        <input ref={inputRef} type="file" hidden onChange={onUpload} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {files.map(f => (
            <div key={f.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{f.file_name}</p>
                <p className="text-xs text-muted-foreground">{f.size_bytes ? Math.round(f.size_bytes / 1024) + ' KB' : ''} · {new Date(f.created_at).toLocaleDateString()}</p>
              </div>
              <Button size="sm" variant="outline" asChild><a href={f.file_url} target="_blank" rel="noreferrer"><Download className="h-4 w-4" /></a></Button>
              {f.uploader_id === user?.id && <Button size="sm" variant="ghost" onClick={() => del(f)}><Trash2 className="h-4 w-4" /></Button>}
            </div>
          ))}
          {files.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No files yet.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupFilesPage;
