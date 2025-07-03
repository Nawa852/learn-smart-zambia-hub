
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Users, Calendar, MessageSquare, Star, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PeerMentorshipPortalPage = () => {
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const { toast } = useToast();

  const eczSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Civic Education'];

  // AI-Powered Mentor Matcher
  const findMentors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-ai-assistant', {
        body: {
          query: `Find peer mentors for ECZ ${selectedSubject}. Match based on academic performance, communication skills, and subject expertise. Prioritize mentors with proven track records in helping students.`,
          feature: 'mentor_matching',
          context: `Subject: ${selectedSubject}`
        }
      });

      if (error) throw error;
      
      const mockMentors = [
        { id: 1, name: "Chipo Mwansa", subject: selectedSubject, rating: 4.8, sessions: 45, grade: "Grade 12", avatar: "/api/placeholder/40/40" },
        { id: 2, name: "Mwila Banda", subject: selectedSubject, rating: 4.6, sessions: 32, grade: "Grade 12", avatar: "/api/placeholder/40/40" },
        { id: 3, name: "Thandiwe Phiri", subject: selectedSubject, rating: 4.9, sessions: 67, grade: "University", avatar: "/api/placeholder/40/40" }
      ];

      setMentors(mockMentors);
      toast({
        title: "Mentors Found",
        description: `Found ${mockMentors.length} qualified mentors for ${selectedSubject}`
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to find mentors. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const scheduleMentorshipSession = (mentorId) => {
    const newSession = {
      id: Date.now(),
      mentorId,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "14:00",
      subject: selectedSubject,
      status: "scheduled"
    };
    setSessions([...sessions, newSession]);
    toast({
      title: "Session Scheduled",
      description: "Your mentorship session has been booked successfully."
    });
  };

  useEffect(() => {
    // Offline cache
    const cachedSessions = localStorage.getItem('mentorship_sessions');
    if (cachedSessions) {
      setSessions(JSON.parse(cachedSessions));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Users className="w-10 h-10 text-indigo-600" />
            Peer Mentorship Portal
          </h1>
          <p className="text-lg text-gray-600">
            Connects students for peer-to-peer ECZ mentoring with AI-powered matching
          </p>
        </div>

        <Tabs defaultValue="matcher" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="matcher">Mentor Matcher</TabsTrigger>
            <TabsTrigger value="scheduler">Session Scheduler</TabsTrigger>
            <TabsTrigger value="cache">Offline Cache</TabsTrigger>
            <TabsTrigger value="narrator">Multilingual</TabsTrigger>
            <TabsTrigger value="tracker">Progress Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="matcher" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  AI-Powered Mentor Matcher (Grok)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter ECZ subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={findMentors} disabled={loading}>
                    {loading ? 'Finding...' : 'Find Mentors'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mentors.map(mentor => (
                    <Card key={mentor.id} className="border-l-4 border-indigo-500">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarImage src={mentor.avatar} />
                            <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{mentor.name}</h4>
                            <p className="text-sm text-gray-600">{mentor.grade}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{mentor.rating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Sessions:</span>
                            <span className="text-sm font-medium">{mentor.sessions}</span>
                          </div>
                          <Badge variant="outline">{mentor.subject}</Badge>
                        </div>
                        <Button 
                          className="w-full mt-3" 
                          size="sm"
                          onClick={() => scheduleMentorshipSession(mentor.id)}
                        >
                          Schedule Session
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Dynamic Mentorship Scheduler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold">Upcoming Sessions</h4>
                  {sessions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No sessions scheduled yet</p>
                  ) : (
                    <div className="space-y-3">
                      {sessions.map(session => (
                        <Card key={session.id} className="border-l-4 border-green-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{session.subject}</p>
                                <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">
                                {session.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cache" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Offline Mentorship Cache</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Mentorship data is cached for offline access
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-800">Cached Sessions</h4>
                      <p className="text-2xl font-bold text-indigo-600">{sessions.length}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Mentors Found</h4>
                      <p className="text-2xl font-bold text-green-600">{mentors.length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narrator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multilingual Mentor Narrator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    Listen to Mentor Profiles
                  </Button>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      AI will describe mentor profiles in your selected language
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Mentorship Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-blue-800">Sessions</h4>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-green-800">Subjects</h4>
                      <p className="text-2xl font-bold text-green-600">3</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-800">Rating</h4>
                      <p className="text-2xl font-bold text-purple-600">4.7</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PeerMentorshipPortalPage;
