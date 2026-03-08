import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send, Phone, Video, MoreVertical, Paperclip,
  Users, Search, Settings, Bell, Globe, MessageCircle, Plus, Loader2
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface ChatRoom {
  id: string;
  name: string;
  is_group: boolean;
  created_by: string | null;
  description: string | null;
}

interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  file_url: string | null;
}

interface ChatMember {
  user_id: string;
  profiles?: { full_name: string | null; avatar_url: string | null } | null;
}

const MessengerChat = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [members, setMembers] = useState<ChatMember[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profileMap, setProfileMap] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Fetch rooms user is a member of
  useEffect(() => {
    if (!user) return;

    const fetchRooms = async () => {
      setLoading(true);
      const { data: memberRows } = await supabase
        .from('chat_members')
        .select('room_id')
        .eq('user_id', user.id);

      if (memberRows?.length) {
        const roomIds = memberRows.map(m => m.room_id);
        const { data: roomData } = await supabase
          .from('chat_rooms')
          .select('*')
          .in('id', roomIds)
          .order('created_at', { ascending: false });
        setRooms(roomData || []);
      }
      setLoading(false);
    };

    fetchRooms();
  }, [user]);

  // Fetch messages and members when room is selected
  useEffect(() => {
    if (!selectedRoom || !user) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', selectedRoom.id)
        .order('created_at', { ascending: true })
        .limit(200);
      setMessages(data || []);

      // Build profile map for senders
      const userIds = [...new Set((data || []).map(m => m.user_id))];
      if (userIds.length) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);
        const map: Record<string, string> = {};
        profiles?.forEach(p => { map[p.id] = p.full_name || 'User'; });
        setProfileMap(prev => ({ ...prev, ...map }));
      }
    };

    const fetchMembers = async () => {
      const { data } = await supabase
        .from('chat_members')
        .select('user_id')
        .eq('room_id', selectedRoom.id);
      setMembers((data || []) as ChatMember[]);
    };

    fetchMessages();
    fetchMembers();

    // Real-time subscription
    const channel = supabase
      .channel(`room-${selectedRoom.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${selectedRoom.id}`,
      }, async (payload) => {
        const newMsg = payload.new as ChatMessage;
        setMessages(prev => [...prev, newMsg]);

        // Fetch profile name if not cached
        if (!profileMap[newMsg.user_id]) {
          const { data: p } = await supabase
            .from('profiles')
            .select('id, full_name')
            .eq('id', newMsg.user_id)
            .single();
          if (p) {
            setProfileMap(prev => ({ ...prev, [p.id]: p.full_name || 'User' }));
          }
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [selectedRoom, user]);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !user) return;
    setSendingMessage(true);

    const { error } = await supabase.from('messages').insert({
      room_id: selectedRoom.id,
      user_id: user.id,
      content: newMessage.trim(),
    });

    if (error) {
      toast.error('Failed to send message');
    }
    setNewMessage('');
    setSendingMessage(false);
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim() || !user) return;

    const { data: room, error } = await supabase
      .from('chat_rooms')
      .insert({ name: newRoomName.trim(), created_by: user.id, is_group: true })
      .select()
      .single();

    if (error || !room) {
      toast.error('Failed to create room');
      return;
    }

    await supabase.from('chat_members').insert({ room_id: room.id, user_id: user.id });

    setRooms(prev => [room, ...prev]);
    setSelectedRoom(room);
    setNewRoomName('');
    setDialogOpen(false);
    toast.success('Chat room created!');
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="h-[calc(100vh-12rem)] bg-background rounded-lg overflow-hidden border border-border">
      {/* Header */}
      <CardHeader className="py-3 px-6 bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Messenger</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm"><Plus className="w-4 h-4 mr-1" /> New Chat</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Chat Room</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <Input placeholder="Room name..." value={newRoomName} onChange={e => setNewRoomName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreateRoom()} />
                <Button onClick={handleCreateRoom} className="w-full" disabled={!newRoomName.trim()}>Create Room</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <div className="flex h-[calc(100%-3.5rem)]">
        {/* Sidebar */}
        <div className="w-72 bg-card border-r border-border flex flex-col">
          <ScrollArea className="flex-1 p-2">
            {loading ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No conversations yet</p>
                <p className="text-xs text-muted-foreground/60">Create a chat room to start</p>
              </div>
            ) : (
              rooms.map(room => (
                <button
                  key={room.id}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                    selectedRoom?.id === room.id ? 'bg-primary/10 border-l-2 border-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      {room.is_group ? <Users className="w-4 h-4 text-primary" /> : <MessageCircle className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{room.name}</p>
                      {room.description && <p className="text-xs text-muted-foreground truncate">{room.description}</p>}
                    </div>
                  </div>
                </button>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    {selectedRoom.is_group ? <Users className="w-4 h-4 text-primary" /> : <MessageCircle className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{selectedRoom.name}</h3>
                    <p className="text-xs text-muted-foreground">{members.length} member{members.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <MessageCircle className="w-10 h-10 mx-auto text-muted-foreground/20 mb-2" />
                      <p className="text-sm text-muted-foreground">No messages yet. Say hello!</p>
                    </div>
                  )}
                  {messages.map(msg => {
                    const isMe = msg.user_id === user?.id;
                    const senderName = profileMap[msg.user_id] || 'User';
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-xl px-4 py-2 ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                          {!isMe && <p className="text-[10px] font-semibold opacity-70 mb-0.5">{senderName}</p>}
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-[10px] text-right opacity-60 mt-0.5">
                            {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                    className="flex-1"
                    disabled={sendingMessage}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim() || sendingMessage} size="sm">
                    {sendingMessage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessengerChat;
