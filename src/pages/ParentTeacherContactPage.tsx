import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserCheck, Mail, Phone, MessageSquare, Star, BookOpen, Clock } from 'lucide-react';

const teachers = [
  { name: "Mrs. Phiri", subject: "Mathematics", grade: "Grade 12", avatar: "MP", rating: 4.9, email: "phiri@school.zm", phone: "+260 97X XXX XXX", available: true, nextSlot: "Today 3:00 PM", students: ["Brighton"] },
  { name: "Mr. Banda", subject: "Physics", grade: "Grade 12", avatar: "MB", rating: 4.7, email: "banda@school.zm", phone: "+260 96X XXX XXX", available: false, nextSlot: "Tomorrow 10:00 AM", students: ["Brighton"] },
  { name: "Mrs. Tembo", subject: "English & History", grade: "Grade 9", avatar: "MT", rating: 4.8, email: "tembo@school.zm", phone: "+260 95X XXX XXX", available: true, nextSlot: "Today 4:30 PM", students: ["Sarah"] },
  { name: "Mr. Mwale", subject: "Science (HOD)", grade: "All Grades", avatar: "MM", rating: 4.6, email: "mwale@school.zm", phone: "+260 97X XXX XXX", available: true, nextSlot: "Wednesday 2:00 PM", students: ["Brighton", "Sarah"] },
  { name: "Mrs. Lungu", subject: "Biology", grade: "Grade 12", avatar: "ML", rating: 4.5, email: "lungu@school.zm", phone: "+260 96X XXX XXX", available: false, nextSlot: "Thursday 11:00 AM", students: ["Brighton"] },
  { name: "Mr. Chanda", subject: "Geography", grade: "Grade 9", avatar: "MC", rating: 4.8, email: "chanda@school.zm", phone: "+260 95X XXX XXX", available: true, nextSlot: "Today 2:00 PM", students: ["Sarah"] },
];

const ParentTeacherContactPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <UserCheck className="w-8 h-8 text-primary" />
        Teacher Directory
      </h1>
      <p className="text-muted-foreground mt-1">Connect with your children's teachers</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teachers.map((t, i) => (
        <Card key={i} className="hover:shadow-lg transition-all group">
          <CardContent className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">{t.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.subject}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{t.grade}</Badge>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium">{t.rating}</span>
                  </div>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${t.available ? 'bg-green-500' : 'bg-muted'}`} title={t.available ? 'Available' : 'Busy'} />
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>Teaches: {t.students.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Next: {t.nextSlot}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1"><MessageSquare className="w-3 h-3 mr-1" />Chat</Button>
              <Button size="sm" variant="outline"><Mail className="w-3 h-3" /></Button>
              <Button size="sm" variant="outline"><Phone className="w-3 h-3" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ParentTeacherContactPage;
