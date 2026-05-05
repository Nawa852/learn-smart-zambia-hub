import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Search, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface DM { id: string; sender_id: string; recipient_id: string; content: string; created_at: string; }
interface Profile { id: string; full_name: string | null; avatar_url: string | null; }

const initials = (n?: string | null) => (n || '?').split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();

export default function DirectMessagesPage() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<{ profile: Profile; lastMsg: string; lastAt: string }[]>([]);
  const [active, setActive] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<DM[]>([]);
  const [draft, setDraft] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Profile[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const loadThreads = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('direct_messages')
      .select('id,sender_id,recipient_id,content,created_at')
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .limit(200);
    if (!data) return;

    const partnerMap = new Map<string, DM>();
    data.forEach(m => {
      const partner = m.sender_id === user.id ? m.recipient_id : m.sender_id;
      if (!partnerMap.has(partner)) partnerMap.set(partner, m);
    });

    const ids = [...partnerMap.keys()];
    if (!ids.length) { setThreads([]); return; }
    const { data: profiles } = await supabase.from('profiles').select('id,full_name,avatar_url').in('id', ids);
    setThreads((profiles || []).map((p: any) => {
      const last = partnerMap.get(p.id)!;
      return { profile: p, lastMsg: last.content, lastAt: last.created_at };
    }));
  };

  useEffect(() => { loadThreads(); }, [user?.id]);

  useEffect(() => {
    if (!active || !user) return;
    const fetchMsgs = async () => {
      const { data } = await supabase
        .from('direct_messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${active.id}),and(sender_id.eq.${active.id},recipient_id.eq.${user.id})`)
        .order('created_at');
      setMessages(data || []);
    };
    fetchMsgs();
    const ch = supabase.channel(`dm-${user.id}-${active.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'direct_messages' }, payload => {
        const m = payload.new as DM;
        if ((m.sender_id === user.id && m.recipient_id === active.id) || (m.sender_id === active.id && m.recipient_id === user.id)) {
          setMessages(prev => [...prev, m]);
        }
      }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [active?.id, user?.id]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!draft.trim() || !active || !user) return;
    const { error } = await supabase.from('direct_messages').insert({
      sender_id: user.id, recipient_id: active.id, content: draft.trim(),
    });
    if (error) toast.error('Could not send'); else setDraft('');
    loadThreads();
  };

  const search = async () => {
    if (!searchTerm.trim()) return;
    const { data } = await supabase.from('profiles').select('id,full_name,avatar_url')
      .ilike('full_name', `%${searchTerm.trim()}%`).neq('id', user?.id).limit(10);
    setResults((data as Profile[]) || []);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex border rounded-xl overflow-hidden bg-card">
      <div className={`w-80 border-r flex flex-col ${active ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-3 border-b space-y-2">
          <div className="flex gap-2">
            <Input placeholder="Search to start chat..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} />
            <Button size="icon" onClick={search}><Search className="w-4 h-4" /></Button>
          </div>
          {results.length > 0 && (
            <div className="space-y-1">
              {results.map(r => (
                <button key={r.id} onClick={() => { setActive(r); setResults([]); setSearchTerm(''); }} className="w-full text-left p-2 hover:bg-muted rounded flex items-center gap-2">
                  <Avatar className="w-8 h-8"><AvatarFallback>{initials(r.full_name)}</AvatarFallback></Avatar>
                  <span className="text-sm">{r.full_name || 'User'}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground"><MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />No conversations yet</div>
          ) : threads.map(t => (
            <button key={t.profile.id} onClick={() => setActive(t.profile)} className={`w-full p-3 text-left hover:bg-muted/50 border-b flex gap-3 ${active?.id === t.profile.id ? 'bg-primary/5' : ''}`}>
              <Avatar><AvatarFallback>{initials(t.profile.full_name)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{t.profile.full_name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{t.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className={`flex-1 flex flex-col ${!active ? 'hidden md:flex' : 'flex'}`}>
        {active ? (
          <>
            <div className="p-3 border-b flex items-center gap-3">
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setActive(null)}>Back</Button>
              <Avatar><AvatarFallback>{initials(active.full_name)}</AvatarFallback></Avatar>
              <p className="font-semibold">{active.full_name || 'User'}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map(m => (
                <div key={m.id} className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${m.sender_id === user?.id ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'}`}>{m.content}</div>
              ))}
              <div ref={endRef} />
            </div>
            <form onSubmit={e => { e.preventDefault(); send(); }} className="p-3 border-t flex gap-2">
              <Input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Type a message..." />
              <Button type="submit" size="icon" disabled={!draft.trim()}><Send className="w-4 h-4" /></Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground"><div className="text-center"><MessageSquare className="w-12 h-12 mx-auto opacity-30 mb-2" />Select a conversation</div></div>
        )}
      </div>
    </div>
  );
}
