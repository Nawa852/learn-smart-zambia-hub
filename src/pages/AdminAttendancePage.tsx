import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, CheckCircle2, XCircle, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const statusColors: Record<string, string> = {
  present: 'bg-green-500/10 text-green-700',
  absent: 'bg-destructive/10 text-destructive',
  late: 'bg-amber-500/10 text-amber-700',
  excused: 'bg-primary/10 text-primary',
};

const AdminAttendancePage = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const schoolName = profile?.school || '';
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState('all');

  // Get school students
  const { data: schoolStudents = [] } = useQuery({
    queryKey: ['attendance-students', schoolName],
    queryFn: async () => {
      if (!schoolName) return [];
      const { data } = await supabase.from('profiles').select('id, full_name, grade').eq('school', schoolName).eq('role', 'student');
      return data || [];
    },
    enabled: !!schoolName,
  });

  // Get attendance records
  const { data: attendanceRecords = [], isLoading } = useQuery({
    queryKey: ['attendance-records', dateFilter, schoolStudents],
    queryFn: async () => {
      if (!schoolStudents.length) return [];
      const studentIds = schoolStudents.map(s => s.id);
      const { data } = await supabase
        .from('attendance')
        .select('id, student_id, status, date, course_id')
        .in('student_id', studentIds)
        .eq('date', dateFilter);
      return data || [];
    },
    enabled: schoolStudents.length > 0,
  });

  const enrichedRecords = attendanceRecords.map(r => {
    const student = schoolStudents.find(s => s.id === r.student_id);
    return { ...r, studentName: student?.full_name || 'Unknown', grade: student?.grade || 'N/A' };
  });

  const filtered = statusFilter === 'all' ? enrichedRecords : enrichedRecords.filter(r => r.status === statusFilter);

  const presentCount = attendanceRecords.filter(r => r.status === 'present').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'absent').length;
  const lateCount = attendanceRecords.filter(r => r.status === 'late').length;

  const stats = [
    { label: 'Total Records', value: String(attendanceRecords.length), icon: Users, gradient: 'from-primary/20 to-accent/10', iconColor: 'text-primary' },
    { label: 'Present', value: String(presentCount), icon: CheckCircle2, gradient: 'from-green-500/15 to-emerald-500/10', iconColor: 'text-green-600' },
    { label: 'Absent', value: String(absentCount), icon: XCircle, gradient: 'from-destructive/15 to-destructive/5', iconColor: 'text-destructive' },
    { label: 'Late', value: String(lateCount), icon: Clock, gradient: 'from-amber-500/15 to-orange-500/10', iconColor: 'text-amber-600' },
  ];

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Attendance Management</h1>
          <p className="text-muted-foreground text-sm mt-0.5">School-wide attendance overview</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <CardContent className="p-5 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Input type="date" className="rounded-xl w-44" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 rounded-xl"><SelectValue placeholder="Filter status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="excused">Excused</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>Showing records for {new Date(dateFilter).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading && <p className="text-muted-foreground text-sm">Loading...</p>}
            {!isLoading && filtered.length === 0 && <p className="text-muted-foreground text-sm">No attendance records for this date.</p>}
            {filtered.map((record, i) => (
              <motion.div key={record.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between p-3 rounded-xl border border-border/40 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{record.studentName}</p>
                    <p className="text-xs text-muted-foreground">{record.grade}</p>
                  </div>
                </div>
                <Badge className={`${statusColors[record.status] || statusColors.present} border-0 capitalize rounded-lg text-xs`}>
                  {record.status}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminAttendancePage;
