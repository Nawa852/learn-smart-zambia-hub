
ALTER TABLE public.guardian_links ADD COLUMN IF NOT EXISTS guardian_id uuid;

CREATE POLICY "Guardians can view their links" ON public.guardian_links 
  FOR SELECT TO authenticated USING (guardian_id = auth.uid());

CREATE POLICY "Guardians can view linked student grades" ON public.grades
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.student_id = grades.student_id AND gl.status = 'active'
    )
  );

CREATE POLICY "Guardians can view linked student enrollments" ON public.enrollments
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.student_id = enrollments.user_id AND gl.status = 'active'
    )
  );

CREATE POLICY "Guardians can view linked student lesson completions" ON public.lesson_completions
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.student_id = lesson_completions.user_id AND gl.status = 'active'
    )
  );

CREATE POLICY "Guardians can view linked student quiz attempts" ON public.quiz_attempts
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.student_id = quiz_attempts.user_id AND gl.status = 'active'
    )
  );

CREATE POLICY "Guardians can view linked student notifications" ON public.notifications
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.student_id = notifications.user_id AND gl.status = 'active'
    )
  );

CREATE POLICY "Guardians can view their reports" ON public.guardian_reports
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.id = guardian_reports.guardian_link_id
    )
  );
