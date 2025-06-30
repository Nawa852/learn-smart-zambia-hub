
-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can manage own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can manage own flashcards" ON public.flashcards;
DROP POLICY IF EXISTS "Users can manage own study goals" ON public.study_goals;
DROP POLICY IF EXISTS "Users can manage own study sessions" ON public.study_sessions;
DROP POLICY IF EXISTS "Users can view own achievements" ON public.achievements;
DROP POLICY IF EXISTS "System can insert achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can manage own chat history" ON public.ai_chat_history;
DROP POLICY IF EXISTS "Users can view own analytics" ON public.learning_analytics;
DROP POLICY IF EXISTS "System can insert analytics" ON public.learning_analytics;

-- Enable RLS on tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create fresh policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for user_preferences
CREATE POLICY "Users can view own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Fix the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = now();
  
  -- Insert into user_preferences table
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Drop the conflicting users table
DROP TABLE IF EXISTS public.users CASCADE;

-- Add RLS and policies for other essential tables
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notes" ON public.notes
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;  
CREATE POLICY "Users can manage own flashcards" ON public.flashcards
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.study_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own study goals" ON public.study_goals
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own study sessions" ON public.study_sessions
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own achievements" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements" ON public.achievements
  FOR INSERT WITH CHECK (true);

ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own chat history" ON public.ai_chat_history
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.learning_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own analytics" ON public.learning_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON public.learning_analytics
  FOR INSERT WITH CHECK (true);
