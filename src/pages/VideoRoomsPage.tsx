import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Video, Plus, Users, Calendar, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';
import JitsiRoom from '@/components/Video/JitsiRoom';

interface Room {
  id: string; host_id: string; room_code: string; title: string;
  scope: string; scheduled_at: string | null; ended_at: string | null; created_at: string;
}

const VideoRoomsPage: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [title, setTitle] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [open, setOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('video_rooms').select('*').is('ended_at', null).order('created_at', { ascending: false }).limit(50);
    setRooms((data as Room[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createRoom = async () => {
    if (!user || !title.trim()) return;
    const { data, error } = await supabase.from('video_rooms').insert({
      host_id: user.id, title: title.trim(), scope: 'public',
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    toast.success('Video room created');
    setOpen(false); setTitle(''); setScheduledAt('');
    load();
    if (!scheduledAt) setActiveRoom(data as Room);
  };

  const joinRoom = async (room: Room) => {
    if (user) {
      await supabase.from('video_room_participants').insert({ room_id: room.id, user_id: user.id });
    }
    setActiveRoom(room);
  };

  const leaveRoom = async () => {
    if (user && activeRoom) {
      await supabase.from('video_room_participants').update({ left_at: new Date().toISOString() })
        .eq('room_id', activeRoom.id).eq('user_id', user.id).is('left_at', null);
    }
    setActiveRoom(null);
  };

  if (activeRoom) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold">{activeRoom.title}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Code: <code className="bg-muted px-2 py-0.5 rounded">{activeRoom.room_code}</code>
              <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(activeRoom.room_code); toast.success('Copied'); }}>
                <Copy className="h-3 w-3" />
              </Button>
            </p>
          </div>
          <Button variant="destructive" onClick={leaveRoom}>Leave</Button>
        </div>
        <JitsiRoom roomCode={activeRoom.room_code} onLeave={leaveRoom} height={600} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Video className="h-7 w-7 text-primary" /> Video Rooms</h1>
          <p className="text-muted-foreground">Start instant calls, schedule classes, or join existing rooms.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> New Room</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Video Room</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Math revision call" /></div>
              <div><Label>Schedule (optional)</Label><Input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} /></div>
              <Button onClick={createRoom} className="w-full">{scheduledAt ? 'Schedule' : 'Start Now'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Loading rooms…</p> : (
        <div className="grid gap-3 md:grid-cols-2">
          {rooms.map(r => (
            <Card key={r.id} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="truncate">{r.title}</span>
                  {r.scheduled_at && new Date(r.scheduled_at) > new Date() ? <Badge variant="outline">Scheduled</Badge> : <Badge>Live</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {r.scheduled_at && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(r.scheduled_at).toLocaleString()}</p>
                )}
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Code: {r.room_code}</p>
                <Button size="sm" className="w-full" onClick={() => joinRoom(r)}>Join</Button>
              </CardContent>
            </Card>
          ))}
          {rooms.length === 0 && <p className="text-sm text-muted-foreground col-span-2">No active rooms. Create one to get started.</p>}
        </div>
      )}
    </div>
  );
};

export default VideoRoomsPage;
