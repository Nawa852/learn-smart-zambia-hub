import React from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const workshops = [
  { title: 'Basic Welding Techniques', date: '2026-03-15', time: '09:00 - 16:00', location: 'TEVETA Lusaka', instructor: 'David Ngoma', spots: 20, fee: 'Free', category: 'Trades' },
  { title: 'Solar Panel Installation', date: '2026-03-20', time: '08:00 - 17:00', location: 'GreenEnergy HQ', instructor: 'Mike Sakala', spots: 15, fee: 'K200', category: 'Digital' },
  { title: 'Modern Cooking Techniques', date: '2026-03-22', time: '10:00 - 14:00', location: 'Radisson Blu Kitchen', instructor: 'Chef Mary', spots: 12, fee: 'K150', category: 'Culinary' },
  { title: 'Smartphone Repair', date: '2026-03-25', time: '09:00 - 15:00', location: 'ICT Hub Lusaka', instructor: 'Tech Solutions', spots: 25, fee: 'K100', category: 'Digital' },
  { title: 'Poultry Farming Basics', date: '2026-04-01', time: '07:00 - 13:00', location: 'Agricultural College', instructor: 'Ruth Kasonde', spots: 30, fee: 'Free', category: 'Agriculture' },
  { title: 'Fashion Design Workshop', date: '2026-04-05', time: '10:00 - 16:00', location: 'ZCAS Campus', instructor: 'Grace Tembo', spots: 18, fee: 'K250', category: 'Creative' },
  { title: 'Plumbing Masterclass', date: '2026-04-10', time: '08:00 - 15:00', location: 'LWSC Training Center', instructor: 'Peter Phiri', spots: 20, fee: 'Free', category: 'Trades' },
  { title: 'Graphic Design Bootcamp', date: '2026-04-12', time: '09:00 - 17:00', location: 'Virtual/Zoom', instructor: 'Sarah Phiri', spots: 50, fee: 'K300', category: 'Digital' },
];

const SkillsWorkshopCalendarPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Calendar className="h-8 w-8 text-primary" /> Workshop Calendar
      </h1>
      <p className="text-muted-foreground mt-1">Upcoming hands-on training workshops</p>
    </div>
    <div className="space-y-3">
      {workshops.map(w => (
        <Card key={w.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="font-semibold">{w.title}</h3>
              <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{w.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{w.time}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{w.location}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{w.category}</Badge>
                <Badge variant="outline">{w.fee}</Badge>
                <Badge variant="outline"><Users className="h-3 w-3 mr-1" />{w.spots} spots</Badge>
              </div>
            </div>
            <Button size="sm" onClick={() => toast.success(`Registered for ${w.title}!`)}>Register</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsWorkshopCalendarPage;
