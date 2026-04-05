import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { 
  MessageCircle, Users, Bell, Search, UserPlus, 
  GraduationCap, BookOpen, Shield, ArrowRight
} from 'lucide-react';

const quickActions = [
  { label: 'Message a Teacher', description: 'Ask questions or get help', icon: BookOpen, path: '/messenger', roles: ['student', 'guardian'] },
  { label: 'Contact Parents', description: 'Send progress updates', icon: Users, path: '/messenger', roles: ['teacher'] },
  { label: 'Student Support', description: 'Reach out to students', icon: GraduationCap, path: '/messenger', roles: ['teacher', 'guardian'] },
  { label: 'Study Groups', description: 'Join or create a study group', icon: Users, path: '/study-groups', roles: ['student', 'developer', 'cybersecurity'] },
  { label: 'Class Announcements', description: 'Post updates for your class', icon: Bell, path: '/teacher-announcements', roles: ['teacher'] },
  { label: 'School Updates', description: 'View latest from school', icon: Shield, path: '/parent-school-updates', roles: ['guardian'] },
];

const CommunicationHubPage = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const role = profile?.role || 'student';

  const filteredActions = quickActions.filter(a => 
    a.roles.includes(role) && a.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Communication Hub</h1>
        <p className="text-muted-foreground">Connect with teachers, students, parents, and peers</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search actions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Tabs defaultValue="actions" className="w-full">
        <TabsList>
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
          <TabsTrigger value="messenger">Messenger</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActions.map((action) => (
              <Card key={action.label} className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => navigate(action.path)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <action.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            ))}
            {filteredActions.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No actions available for your role
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="messenger" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Open Messenger</h3>
              <p className="text-muted-foreground mb-4">Send messages to teachers, students, or parents directly</p>
              <Button onClick={() => navigate('/messenger')}>
                Open Messenger <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Study Groups</h3>
              <p className="text-muted-foreground mb-4">Collaborate with peers in subject-based study groups</p>
              <Button onClick={() => navigate('/study-groups')}>
                Browse Groups <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationHubPage;
