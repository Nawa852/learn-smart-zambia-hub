
-- Restricting access to authenticated users for sensitive data

-- For 'certificates' table
ALTER POLICY "Users can view their certificates" ON public.certificates TO authenticated;

-- For 'courses' table
ALTER POLICY "Instructors can manage their courses" ON public.courses TO authenticated;

-- For 'discussion_replies' table
ALTER POLICY "Users can update their replies" ON public.discussion_replies TO authenticated;
ALTER POLICY "Users can view discussion replies" ON public.discussion_replies TO authenticated;

-- For 'discussions' table
ALTER POLICY "Users can update their discussions" ON public.discussions TO authenticated;
ALTER POLICY "Users can view course discussions" ON public.discussions TO authenticated;

-- For 'enrollments' table
ALTER POLICY "Users can update their enrollments" ON public.enrollments TO authenticated;
ALTER POLICY "Users can view their enrollments" ON public.enrollments TO authenticated;

-- For 'learning_paths' table
ALTER POLICY "Users can update their learning paths" ON public.learning_paths TO authenticated;

-- For 'lesson_progress' table
ALTER POLICY "Users can manage their progress" ON public.lesson_progress TO authenticated;

-- For 'lessons' table
ALTER POLICY "Instructors can manage their lessons" ON public.lessons TO authenticated;
ALTER POLICY "Users can view lessons of enrolled courses" ON public.lessons TO authenticated;

-- For 'profiles' table
ALTER POLICY "Users can update own profile" ON public.profiles TO authenticated;
ALTER POLICY "Users can view all profiles" ON public.profiles TO authenticated;

-- For 'quiz_attempts' table
ALTER POLICY "Users can manage their quiz attempts" ON public.quiz_attempts TO authenticated;

-- For 'quiz_questions' table
ALTER POLICY "Users can view quiz questions" ON public.quiz_questions TO authenticated;

-- For 'quizzes' table
ALTER POLICY "Users can view quizzes of enrolled courses" ON public.quizzes TO authenticated;

-- For 'user_achievements' table
ALTER POLICY "Users can view their achievements" ON public.user_achievements TO authenticated;

-- For 'user_preferences' table
ALTER POLICY "Users can manage their preferences" ON public.user_preferences TO authenticated;
