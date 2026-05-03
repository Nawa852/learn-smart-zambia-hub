import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Users, ClipboardList, BookOpen, FileEdit, BarChart3,
  Megaphone, QrCode, FileCheck, GraduationCap, Plus,
} from 'lucide-react';

const actions = [
  { label: 'My Classes',         icon: BookOpen,        link: '/teach?tab=courses',       desc: 'Manage your courses' },
  { label: 'Student Roster',     icon: Users,           link: '/teach?tab=attendance',    desc: 'View enrolled students' },
  { label: 'Lesson Plans',       icon: FileEdit,        link: '/teach?tab=lesson-plans',  desc: 'Build & share lessons' },
  { label: 'Create Assessment',  icon: FileCheck,       link: '/create-course',           desc: 'Quizzes & exams' },
  { label: 'Gradebook',          icon: ClipboardList,   link: '/teach?tab=gradebook',     desc: 'Record & view grades' },
  { label: 'Attendance (QR)',    icon: QrCode,          link: '/teach?tab=attendance',    desc: 'Quick check-in' },
  { label: 'Announcements',      icon: Megaphone,       link: '/teach?tab=announcements', desc: 'Notify your classes' },
  { label: 'Analytics',          icon: BarChart3,       link: '/teach?tab=analytics',     desc: 'Class performance' },
];

export const TeacherQuickAccess = () => {
  const navigate = useNavigate();
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="w-5 h-5 text-primary" /> Teaching toolkit
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-1" onClick={() => navigate('/create-course')}>
            <Plus className="w-3.5 h-3.5" /> New course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.link)}
              className="group p-3 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <a.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <p className="text-xs font-semibold leading-tight">{a.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{a.desc}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherQuickAccess;
