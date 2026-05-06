import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface Msg { id: string; user_id: string; content: string; created_at: string; group_id: string; }

const GroupChatPage: React.FC = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!groupId) return;
    (async () => {
      const { data } = await supabase.from('study_group_messages' as any)
        .select('*').eq('group_id', groupId).order('created_at', { ascending: true }).limit(200);
      setMessages((data as Msg[]) || []);
    })();
    const ch = supabase.channel(`group-${groupId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'study_group_messages', filter: `group_id=eq.${groupId}` },
        (p) => setMessages(prev => [...prev, p.new as Msg]))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [groupId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!user || !groupId || !input.trim()) return;
    const text = input.trim();
    setInput('');
    await supabase.from('study_group_messages' as any).insert({ group_id: groupId, user_id: user.id, content: text });
  };

  return (
    <Card className="h-[calc(100vh-180px)] flex flex-col">
      <CardHeader><CardTitle>Group Chat</CardTitle></CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-2 mb-3">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.user_id === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.user_id === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {m.content}
                <div className="text-[10px] opacity-70 mt-1">{new Date(m.created_at).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
          {messages.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Be the first to say hi 👋</p>}
          <div ref={endRef} />
        </div>
        <div className="flex gap-2">
          <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." />
          <Button onClick={send}><Send className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupChatPage;
