import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';

export interface TeacherCourse {
  id: string;
  title: string;
  subject: string | null;
  grade_level: string | null;
  is_published: boolean;
  created_at: string;
  enrollment_count: number;
  avg_score: number | null;
}

export interface PendingSubmission {
  id: string;
  assignment_title: string;
  course_title: string;
  course_id: string;
  student_name: string;
  submitted_at: string;
  content: string | null;
  file_url: string | null;
}

export interface StudentAlert {
  student_id: string;
  student_name: string;
  issue: string;
  severity: 'high' | 'medium';
  course_title: string;
}

export function useTeacherStats() {
  const { user } = useSecureAuth();
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [avgPerformance, setAvgPerformance] = useState(0);
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([]);
  const [studentAlerts, setStudentAlerts] = useState<StudentAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetchTeacherData();
  }, [user?.id]);

  const fetchTeacherData = async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
      // 1. Get teacher's courses
      const { data: teacherCourses } = await supabase
        .from('courses')
        .select('id, title, subject, grade_level, is_published, created_at')
        .eq('created_by', user.id);

      if (!teacherCourses || teacherCourses.length === 0) {
        setLoading(false);
        return;
      }

      const courseIds = teacherCourses.map(c => c.id);

      // 2. Get enrollments per course
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id, user_id')
        .in('course_id', courseIds);

      // 3. Get assignments for teacher's courses
      const { data: assignments } = await supabase
        .from('assignments')
        .select('id, course_id, title')
        .in('course_id', courseIds);

      const assignmentIds = assignments?.map(a => a.id) || [];

      // 4. Get submissions (all + ungraded)
      let allSubmissions: any[] = [];
      let ungradedSubmissions: any[] = [];

      if (assignmentIds.length > 0) {
        const { data: subs } = await supabase
          .from('submissions')
          .select('id, assignment_id, user_id, score, graded_at, submitted_at, content, file_url')
          .in('assignment_id', assignmentIds);

        allSubmissions = subs || [];
        ungradedSubmissions = allSubmissions.filter(s => !s.graded_at);
      }

      // Build enrollment counts per course
      const enrollmentMap: Record<string, Set<string>> = {};
      (enrollments || []).forEach(e => {
        if (!enrollmentMap[e.course_id]) enrollmentMap[e.course_id] = new Set();
        enrollmentMap[e.course_id].add(e.user_id);
      });

      // Build avg score per course from graded submissions
      const courseScores: Record<string, number[]> = {};
      const assignmentCourseMap: Record<string, string> = {};
      (assignments || []).forEach(a => { assignmentCourseMap[a.id] = a.course_id; });

      allSubmissions.filter(s => s.score != null).forEach(s => {
        const cid = assignmentCourseMap[s.assignment_id];
        if (cid) {
          if (!courseScores[cid]) courseScores[cid] = [];
          courseScores[cid].push(Number(s.score));
        }
      });

      const enrichedCourses: TeacherCourse[] = teacherCourses.map(c => ({
        ...c,
        enrollment_count: enrollmentMap[c.id]?.size || 0,
        avg_score: courseScores[c.id]
          ? Math.round(courseScores[c.id].reduce((a, b) => a + b, 0) / courseScores[c.id].length)
          : null,
      }));

      // Total unique students
      const uniqueStudents = new Set<string>();
      Object.values(enrollmentMap).forEach(set => set.forEach(id => uniqueStudents.add(id)));

      // Overall avg performance
      const allScores = allSubmissions.filter(s => s.score != null).map(s => Number(s.score));
      const overallAvg = allScores.length > 0
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        : 0;

      // Get student profiles for pending submissions
      const ungradedStudentIds = [...new Set(ungradedSubmissions.map(s => s.user_id))];
      let profileMap: Record<string, string> = {};
      if (ungradedStudentIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', ungradedStudentIds);
        (profiles || []).forEach(p => { profileMap[p.id] = p.full_name || 'Unknown Student'; });
      }

      const assignmentTitleMap: Record<string, string> = {};
      const assignmentCourseTitleMap: Record<string, string> = {};
      (assignments || []).forEach(a => {
        assignmentTitleMap[a.id] = a.title;
        const course = teacherCourses.find(c => c.id === a.course_id);
        assignmentCourseTitleMap[a.id] = course?.title || '';
      });

      const pending: PendingSubmission[] = ungradedSubmissions.slice(0, 20).map(s => ({
        id: s.id,
        assignment_title: assignmentTitleMap[s.assignment_id] || 'Unknown',
        course_title: assignmentCourseTitleMap[s.assignment_id] || '',
        course_id: assignmentCourseMap[s.assignment_id] || '',
        student_name: profileMap[s.user_id] || 'Unknown Student',
        submitted_at: s.submitted_at,
        content: s.content,
        file_url: s.file_url,
      }));

      // Student alerts: students with low scores
      const studentScores: Record<string, { scores: number[]; name: string; course: string }> = {};
      allSubmissions.filter(s => s.score != null).forEach(s => {
        const cid = assignmentCourseMap[s.assignment_id];
        const key = `${s.user_id}_${cid}`;
        if (!studentScores[key]) {
          studentScores[key] = {
            scores: [],
            name: profileMap[s.user_id] || s.user_id,
            course: enrichedCourses.find(c => c.id === cid)?.title || '',
          };
        }
        studentScores[key].scores.push(Number(s.score));
      });

      // Also fetch profiles for scored students
      const scoredStudentIds = [...new Set(allSubmissions.filter(s => s.score != null).map(s => s.user_id))];
      if (scoredStudentIds.length > 0) {
        const { data: scoredProfiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', scoredStudentIds);
        (scoredProfiles || []).forEach(p => { profileMap[p.id] = p.full_name || 'Unknown Student'; });
      }

      const alerts: StudentAlert[] = [];
      Object.entries(studentScores).forEach(([key, data]) => {
        const avg = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
        const studentId = key.split('_')[0];
        if (avg < 50) {
          alerts.push({
            student_id: studentId,
            student_name: profileMap[studentId] || data.name,
            issue: `Average score: ${Math.round(avg)}%`,
            severity: avg < 35 ? 'high' : 'medium',
            course_title: data.course,
          });
        }
      });

      setCourses(enrichedCourses);
      setTotalStudents(uniqueStudents.size);
      setPendingCount(ungradedSubmissions.length);
      setAvgPerformance(overallAvg);
      setPendingSubmissions(pending);
      setStudentAlerts(alerts.slice(0, 10));
    } catch (err) {
      console.error('Error fetching teacher stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    totalStudents,
    pendingCount,
    avgPerformance,
    pendingSubmissions,
    studentAlerts,
    loading,
    refetch: fetchTeacherData,
  };
}
