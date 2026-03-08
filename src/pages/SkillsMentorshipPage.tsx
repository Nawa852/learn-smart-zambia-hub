import React from 'react';
import { Users, Star, MessageSquare, Clock, MapPin, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const mentors = [
  { name: 'John Mwale', skill: 'Electrical Installation', experience: '15 years', location: 'Lusaka', rating: 4.8, sessions: 45 },
  { name: 'Mary Banda', skill: 'Culinary Arts', experience: '12 years', location: 'Lusaka', rating: 4.9, sessions: 62 },
  { name: 'Peter Chanda', skill: 'Auto Mechanics', experience: '20 years', location: 'Copperbelt', rating: 4.7, sessions: 38 },
  { name: 'Grace Tembo', skill: 'Fashion Design', experience: '10 years', location: 'Lusaka', rating: 4.6, sessions: 55 },
  { name: 'David Ngoma', skill: 'Welding', experience: '18 years', location: 'Copperbelt', rating: 4.9, sessions: 72 },
  { name: 'Sarah Phiri', skill: 'Digital Marketing', experience: '8 years', location: 'Remote', rating: 4.5, sessions: 90 },
  { name: 'Moses Lungu', skill: 'Carpentry', experience: '25 years', location: 'Southern', rating: 5.0, sessions: 28 },
  { name: 'Ruth Kasonde', skill: 'Agriculture', experience: '14 years', location: 'Central', rating: 4.7, sessions: 41 },
];

const SkillsMentorshipPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Users className="h-8 w-8 text-primary" /> Mentorship Matching
      </h1>
      <p className="text-muted-foreground mt-1">Connect with experienced professionals in your field</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mentors.map(m => (
        <Card key={m.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.skill}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{m.experience}</Badge>
              <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" />{m.location}</Badge>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{m.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{m.sessions} sessions</span>
            </div>
            <Button className="w-full" size="sm" onClick={() => toast.success('Mentorship request sent!')}>
              <MessageSquare className="h-4 w-4 mr-2" /> Request Mentorship
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsMentorshipPage;
