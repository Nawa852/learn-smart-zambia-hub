
-- Fix function search path security issues by setting search_path to empty string
ALTER FUNCTION public.encrypt_email() SET search_path = '';
ALTER FUNCTION public.sync_auth_users() SET search_path = '';
ALTER FUNCTION public.study_materials_insert_trigger() SET search_path = '';
ALTER FUNCTION public.refresh_popular_materials() SET search_path = '';
ALTER FUNCTION public.log_material_access() SET search_path = '';
ALTER FUNCTION public.update_timestamp() SET search_path = '';
ALTER FUNCTION public.log_quiz_attempt() SET search_path = '';
ALTER FUNCTION public.update_enrollment_progress() SET search_path = '';

-- Update RLS policies to restrict anonymous access where appropriate
-- Update achievements policies to require authentication
DROP POLICY IF EXISTS "Users can view their own achievements" ON public.achievements;
CREATE POLICY "Users can view their own achievements" ON public.achievements
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own achievements" ON public.achievements;
CREATE POLICY "Users can insert their own achievements" ON public.achievements
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Update ai_chat_history policies
DROP POLICY IF EXISTS "Users can view their own chat history" ON public.ai_chat_history;
CREATE POLICY "Users can view their own chat history" ON public.ai_chat_history
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own chat history" ON public.ai_chat_history;
CREATE POLICY "Users can insert their own chat history" ON public.ai_chat_history
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Update learning_analytics policies
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.learning_analytics;
CREATE POLICY "Users can view their own analytics" ON public.learning_analytics
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own analytics" ON public.learning_analytics;
CREATE POLICY "Users can insert their own analytics" ON public.learning_analytics
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Update flashcards policies
DROP POLICY IF EXISTS "Users can manage their own flashcards" ON public.flashcards;
CREATE POLICY "Users can manage their own flashcards" ON public.flashcards
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Update study_goals policies
DROP POLICY IF EXISTS "Users can manage their own goals" ON public.study_goals;
CREATE POLICY "Users can manage their own goals" ON public.study_goals
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Update notes policies to require authentication
DROP POLICY IF EXISTS "Users can view their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can update their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can delete their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can create their own notes" ON public.notes;

CREATE POLICY "Users can view their own notes" ON public.notes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes" ON public.notes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON public.notes
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" ON public.notes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Update study_sessions policies to require authentication
DROP POLICY IF EXISTS "Users can view their own study sessions" ON public.study_sessions;
DROP POLICY IF EXISTS "Users can update their own study sessions" ON public.study_sessions;
DROP POLICY IF EXISTS "Users can delete their own study sessions" ON public.study_sessions;
DROP POLICY IF EXISTS "Users can create their own study sessions" ON public.study_sessions;

CREATE POLICY "Users can view their own study sessions" ON public.study_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study sessions" ON public.study_sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study sessions" ON public.study_sessions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study sessions" ON public.study_sessions
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
