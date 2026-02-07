import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send, Search, Phone, Video, Paperclip, Smile } from 'lucide-react';

const conversations = [
  { id: 1, name: "Mrs. Phiri", role: "Math Teacher", avatar: "MP", lastMsg: "Brighton is doing well in Algebra!", time: "10 min", unread: 2, online: true },
  { id: 2, name: "Mr. Banda", role: "Physics Teacher", avatar: "MB", lastMsg: "Please review the lab report feedback", time: "1 hr", unread: 0, online: false },
  { id: 3, name: "Mrs. Tembo", role: "Class Teacher (G9)", avatar: "MT", lastMsg: "Sarah excelled in the History presentation", time: "3 hr", unread: 1, online: true },
  { id: 4, name: "School Admin", role: "Administration", avatar: "SA", lastMsg: "Fee payment reminder for Term 2", time: "1 day", unread: 0, online: false },
  { id: 5, name: "Mr. Mwale", role: "Science HOD", avatar: "MM", lastMsg: "Science fair details attached", time: "2 days", unread: 0, online: true },
];

const messages = [
  { from: "teacher", text: "Good morning! I wanted to share Brighton's mid-term progress.", time: "9:00 AM" },
  { from: "teacher", text: "He's shown remarkable improvement in Algebra — scoring 88% on the latest test!", time: "9:01 AM" },
  { from: "parent", text: "That's wonderful news! He's been studying extra at home.", time: "9:15 AM" },
  { from: "teacher", text: "It shows! I'd suggest he practices more word problems. The AI tutor has great modules for that.", time: "9:17 AM" },
  { from: "parent", text: "I'll make sure he uses it. Thank you for the update! 🙏", time: "9:20 AM" },
  { from: "teacher", text: "Brighton is doing well in Algebra! Keep encouraging him at home.", time: "10:30 AM" },
];

const ParentMessagesPage = () => {
  const [selected, setSelected] = useState(0);
  const [msg, setMsg] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary" />
          Messages
        </h1>
        <p className="text-muted-foreground mt-1">Communicate with teachers and school staff</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        {/* Conversation List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setSelected(i)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${selected === i ? 'bg-primary/10 shadow-sm' : 'hover:bg-muted/50'}`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-bold">{c.avatar}</AvatarFallback>
                  </Avatar>
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm truncate">{c.name}</p>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && <Badge className="text-[10px] h-5 w-5 p-0 flex items-center justify-center rounded-full">{c.unread}</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-bold">{conversations[selected].avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{conversations[selected].name}</p>
                  <p className="text-xs text-muted-foreground">{conversations[selected].role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><Video className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'parent' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${m.from === 'parent' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'}`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === 'parent' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="border-t p-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Paperclip className="w-4 h-4" /></Button>
              <Input placeholder="Type a message..." value={msg} onChange={e => setMsg(e.target.value)} className="flex-1" />
              <Button variant="ghost" size="icon"><Smile className="w-4 h-4" /></Button>
              <Button size="icon"><Send className="w-4 h-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParentMessagesPage;
