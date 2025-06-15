
-- 1. Enable RLS and restrict access on sensitive tables

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view their own certificates" ON public.certificates
  USING (user_id = auth.uid());

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Instructors view/edit own courses" ON public.courses
  FOR ALL
  USING (instructor_id = auth.uid());

ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit own replies" ON public.discussion_replies
  FOR ALL
  USING (user_id = auth.uid());

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit own discussions" ON public.discussions
  FOR ALL
  USING (user_id = auth.uid());

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit own enrollments" ON public.enrollments
  FOR ALL
  USING (user_id = auth.uid());

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit own learning paths" ON public.learning_paths
  FOR ALL
  USING (created_by = auth.uid());

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit own lesson progress" ON public.lesson_progress
  FOR ALL
  USING (user_id = auth.uid());

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Instructors view/edit own lessons" ON public.lessons
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.courses c WHERE c.id = lessons.course_id AND c.instructor_id = auth.uid()
    )
  );

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit their own profile" ON public.profiles
  FOR ALL
  USING (id = auth.uid());

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit own quiz attempts" ON public.quiz_attempts
  FOR ALL
  USING (user_id = auth.uid());

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
  FOR SELECT
  USING (true);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view quizzes" ON public.quizzes
  FOR SELECT
  USING (true);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own achievements" ON public.user_achievements
  USING (user_id = auth.uid());

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view/edit own preferences" ON public.user_preferences
  FOR ALL
  USING (user_id = auth.uid());

-- Optionally, restrict other ALL commands (update, delete, insert) as needed for your app's business logic.
