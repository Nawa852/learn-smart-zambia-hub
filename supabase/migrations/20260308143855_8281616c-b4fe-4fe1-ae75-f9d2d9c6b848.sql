
-- FIX ALL RESTRICTIVE RLS POLICIES → PERMISSIVE
-- Drop old RESTRICTIVE policies and recreate as PERMISSIVE (default)

-- 1. SUBMISSIONS
DROP POLICY IF EXISTS "Users can view own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Teachers can view/grade submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can submit own work" ON public.submissions;
DROP POLICY IF EXISTS "Teachers can grade submissions" ON public.submissions;

CREATE POLICY "Users can view own submissions" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view/grade submissions" ON public.submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM assignments a JOIN courses c ON c.id = a.course_id WHERE a.id = submissions.assignment_id AND c.created_by = auth.uid())
);
CREATE POLICY "Users can submit own work" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Teachers can grade submissions" ON public.submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM assignments a JOIN courses c ON c.id = a.course_id WHERE a.id = submissions.assignment_id AND c.created_by = auth.uid())
);

-- 2. GRADES
DROP POLICY IF EXISTS "Students can view own grades" ON public.grades;
DROP POLICY IF EXISTS "Guardians can view linked student grades" ON public.grades;
DROP POLICY IF EXISTS "Teachers can manage grades" ON public.grades;

CREATE POLICY "Students can view own grades" ON public.grades FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Guardians can view linked student grades" ON public.grades FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = grades.student_id AND gl.status = 'active')
);
CREATE POLICY "Teachers can view grades" ON public.grades FOR SELECT USING (auth.uid() = recorded_by);
CREATE POLICY "Teachers can insert grades" ON public.grades FOR INSERT WITH CHECK (auth.uid() = recorded_by);
CREATE POLICY "Teachers can update grades" ON public.grades FOR UPDATE USING (auth.uid() = recorded_by);
CREATE POLICY "Teachers can delete grades" ON public.grades FOR DELETE USING (auth.uid() = recorded_by);

-- 3. NOTIFICATIONS
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Guardians can view linked student notifications" ON public.notifications;
DROP POLICY IF EXISTS "Only triggers can insert notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;

CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Guardians can view linked student notifications" ON public.notifications FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = notifications.user_id AND gl.status = 'active')
);
CREATE POLICY "Users can insert own notifications" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- 4. ENROLLMENTS
DROP POLICY IF EXISTS "Users can view own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Guardians can view linked student enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can enroll themselves" ON public.enrollments;
DROP POLICY IF EXISTS "Users can update own enrollment" ON public.enrollments;

CREATE POLICY "Users can view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Guardians can view linked student enrollments" ON public.enrollments FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = enrollments.user_id AND gl.status = 'active')
);
CREATE POLICY "Users can enroll themselves" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own enrollment" ON public.enrollments FOR UPDATE USING (auth.uid() = user_id);

-- 5. FOCUS_SESSIONS
DROP POLICY IF EXISTS "Users can view own focus sessions" ON public.focus_sessions;
DROP POLICY IF EXISTS "Guardians can view linked student focus sessions" ON public.focus_sessions;
DROP POLICY IF EXISTS "Users can insert own focus sessions" ON public.focus_sessions;
DROP POLICY IF EXISTS "Users can update own focus sessions" ON public.focus_sessions;

CREATE POLICY "Users can view own focus sessions" ON public.focus_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Guardians can view linked student focus sessions" ON public.focus_sessions FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = focus_sessions.user_id AND gl.status = 'active')
);
CREATE POLICY "Users can insert own focus sessions" ON public.focus_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own focus sessions" ON public.focus_sessions FOR UPDATE USING (auth.uid() = user_id);

-- 6. QUIZ_ATTEMPTS
DROP POLICY IF EXISTS "Users can manage own quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Guardians can view linked student quiz attempts" ON public.quiz_attempts;

CREATE POLICY "Users can manage own quiz attempts" ON public.quiz_attempts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Guardians can view linked student quiz attempts" ON public.quiz_attempts FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = quiz_attempts.user_id AND gl.status = 'active')
);

-- 7. LESSON_COMPLETIONS
DROP POLICY IF EXISTS "Users can view own completions" ON public.lesson_completions;
DROP POLICY IF EXISTS "Guardians can view linked student lesson completions" ON public.lesson_completions;
DROP POLICY IF EXISTS "Users can insert own completions" ON public.lesson_completions;
DROP POLICY IF EXISTS "Users can delete own completions" ON public.lesson_completions;

CREATE POLICY "Users can view own completions" ON public.lesson_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Guardians can view linked student lesson completions" ON public.lesson_completions FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = lesson_completions.user_id AND gl.status = 'active')
);
CREATE POLICY "Users can insert own completions" ON public.lesson_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own completions" ON public.lesson_completions FOR DELETE USING (auth.uid() = user_id);

-- 8. ATTENDANCE
DROP POLICY IF EXISTS "Students view own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Guardians view linked student attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers record attendance" ON public.attendance;

CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Guardians view linked student attendance" ON public.attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = attendance.student_id AND gl.status = 'active')
);
CREATE POLICY "Teachers can view attendance" ON public.attendance FOR SELECT USING (auth.uid() = recorded_by);
CREATE POLICY "Teachers record attendance" ON public.attendance FOR INSERT WITH CHECK (auth.uid() = recorded_by);
CREATE POLICY "Teachers update attendance" ON public.attendance FOR UPDATE USING (auth.uid() = recorded_by);
CREATE POLICY "Teachers delete attendance" ON public.attendance FOR DELETE USING (auth.uid() = recorded_by);

-- 9. STUDY_SCHEDULES
DROP POLICY IF EXISTS "Users manage own schedules" ON public.study_schedules;
DROP POLICY IF EXISTS "Guardians can view linked student schedules" ON public.study_schedules;

CREATE POLICY "Users manage own schedules" ON public.study_schedules FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Guardians can view linked student schedules" ON public.study_schedules FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = study_schedules.user_id AND gl.status = 'active')
);

-- 10. GUARDIAN_REPORTS
DROP POLICY IF EXISTS "Students can view own reports" ON public.guardian_reports;
DROP POLICY IF EXISTS "Guardians can view their reports" ON public.guardian_reports;

CREATE POLICY "Students can view own reports" ON public.guardian_reports FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Guardians can view their reports" ON public.guardian_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.id = guardian_reports.guardian_link_id)
);

-- 11. PROFILES
DROP POLICY IF EXISTS "Public profiles viewable" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Public profiles viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 12. COURSES
DROP POLICY IF EXISTS "Published courses viewable by all" ON public.courses;
DROP POLICY IF EXISTS "Creators can manage own courses" ON public.courses;

CREATE POLICY "Published courses viewable by all" ON public.courses FOR SELECT USING (is_published = true OR created_by = auth.uid());
CREATE POLICY "Creators can insert courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Creators can update courses" ON public.courses FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Creators can delete courses" ON public.courses FOR DELETE USING (auth.uid() = created_by);

-- 13. LESSONS
DROP POLICY IF EXISTS "Lessons viewable with course" ON public.lessons;
DROP POLICY IF EXISTS "Course creators can manage lessons" ON public.lessons;

CREATE POLICY "Lessons viewable with course" ON public.lessons FOR SELECT USING (
  EXISTS (SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND (courses.is_published = true OR courses.created_by = auth.uid()))
);
CREATE POLICY "Course creators can insert lessons" ON public.lessons FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND courses.created_by = auth.uid())
);
CREATE POLICY "Course creators can update lessons" ON public.lessons FOR UPDATE USING (
  EXISTS (SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND courses.created_by = auth.uid())
);
CREATE POLICY "Course creators can delete lessons" ON public.lessons FOR DELETE USING (
  EXISTS (SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND courses.created_by = auth.uid())
);

-- 14. SCHOOL_EVENTS
DROP POLICY IF EXISTS "View school events" ON public.school_events;
DROP POLICY IF EXISTS "Users manage own school events" ON public.school_events;

CREATE POLICY "View school events" ON public.school_events FOR SELECT USING (true);
CREATE POLICY "Users can insert school events" ON public.school_events FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update school events" ON public.school_events FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Users can delete school events" ON public.school_events FOR DELETE USING (created_by = auth.uid());

-- 15. EDUCATION_POLICIES
DROP POLICY IF EXISTS "Authenticated users view policies" ON public.education_policies;
DROP POLICY IF EXISTS "Ministry users manage policies" ON public.education_policies;

CREATE POLICY "Authenticated users view policies" ON public.education_policies FOR SELECT USING (true);
CREATE POLICY "Ministry users insert policies" ON public.education_policies FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Ministry users update policies" ON public.education_policies FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Ministry users delete policies" ON public.education_policies FOR DELETE USING (auth.uid() = created_by);

-- 16. NGO_PARTNERSHIPS
DROP POLICY IF EXISTS "Authenticated users view partnerships" ON public.ngo_partnerships;
DROP POLICY IF EXISTS "Ministry users manage partnerships" ON public.ngo_partnerships;

CREATE POLICY "Authenticated users view partnerships" ON public.ngo_partnerships FOR SELECT USING (true);
CREATE POLICY "Ministry users insert partnerships" ON public.ngo_partnerships FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Ministry users update partnerships" ON public.ngo_partnerships FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Ministry users delete partnerships" ON public.ngo_partnerships FOR DELETE USING (auth.uid() = created_by);

-- 17. ASSIGNMENTS
DROP POLICY IF EXISTS "Assignments viewable by enrolled students" ON public.assignments;
DROP POLICY IF EXISTS "Course creators can manage assignments" ON public.assignments;

CREATE POLICY "Assignments viewable by enrolled or creator" ON public.assignments FOR SELECT USING (
  EXISTS (SELECT 1 FROM enrollments WHERE enrollments.course_id = assignments.course_id AND enrollments.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM courses WHERE courses.id = assignments.course_id AND courses.created_by = auth.uid())
);
CREATE POLICY "Course creators can insert assignments" ON public.assignments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM courses WHERE courses.id = assignments.course_id AND courses.created_by = auth.uid())
);
CREATE POLICY "Course creators can update assignments" ON public.assignments FOR UPDATE USING (
  EXISTS (SELECT 1 FROM courses WHERE courses.id = assignments.course_id AND courses.created_by = auth.uid())
);
CREATE POLICY "Course creators can delete assignments" ON public.assignments FOR DELETE USING (
  EXISTS (SELECT 1 FROM courses WHERE courses.id = assignments.course_id AND courses.created_by = auth.uid())
);

-- 18. CHAT_MEMBERS
DROP POLICY IF EXISTS "Members can view room members" ON public.chat_members;
DROP POLICY IF EXISTS "Room creators can add members" ON public.chat_members;

CREATE POLICY "Members can view room members" ON public.chat_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM chat_members cm WHERE cm.room_id = chat_members.room_id AND cm.user_id = auth.uid())
);
CREATE POLICY "Room creators can add members" ON public.chat_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM chat_rooms WHERE chat_rooms.id = chat_members.room_id AND chat_rooms.created_by = auth.uid())
  OR auth.uid() = user_id
);

-- 19. MESSAGES
DROP POLICY IF EXISTS "Members can view messages" ON public.messages;
DROP POLICY IF EXISTS "Members can send messages" ON public.messages;

CREATE POLICY "Members can view messages" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM chat_members WHERE chat_members.room_id = messages.room_id AND chat_members.user_id = auth.uid())
);
CREATE POLICY "Members can send messages" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = user_id AND EXISTS (SELECT 1 FROM chat_members WHERE chat_members.room_id = messages.room_id AND chat_members.user_id = auth.uid())
);

-- 20. PAST_PAPERS
DROP POLICY IF EXISTS "Anyone can view past papers" ON public.past_papers;
DROP POLICY IF EXISTS "Teachers can upload past papers" ON public.past_papers;
DROP POLICY IF EXISTS "Uploaders can delete own papers" ON public.past_papers;
DROP POLICY IF EXISTS "Uploaders can update own papers" ON public.past_papers;

CREATE POLICY "Anyone can view past papers" ON public.past_papers FOR SELECT USING (true);
CREATE POLICY "Teachers can upload past papers" ON public.past_papers FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "Uploaders can update own papers" ON public.past_papers FOR UPDATE USING (auth.uid() = uploaded_by);
CREATE POLICY "Uploaders can delete own papers" ON public.past_papers FOR DELETE USING (auth.uid() = uploaded_by);
