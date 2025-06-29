
-- Fix the handle_new_user function to work with the existing profiles table
-- and remove references to non-existent users table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Insert into profiles table with better error handling
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
  
  -- Insert into user_preferences table with error handling
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the trigger
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Ensure the trigger exists and is properly configured
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Fix foreign key constraints to reference profiles instead of auth.users where needed
-- Update achievements table
ALTER TABLE public.achievements DROP CONSTRAINT IF EXISTS achievements_user_id_fkey;
ALTER TABLE public.achievements ADD CONSTRAINT achievements_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update ai_chat_history table
ALTER TABLE public.ai_chat_history DROP CONSTRAINT IF EXISTS ai_chat_history_user_id_fkey;
ALTER TABLE public.ai_chat_history ADD CONSTRAINT ai_chat_history_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update learning_analytics table
ALTER TABLE public.learning_analytics DROP CONSTRAINT IF EXISTS learning_analytics_user_id_fkey;
ALTER TABLE public.learning_analytics ADD CONSTRAINT learning_analytics_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update flashcards table
ALTER TABLE public.flashcards DROP CONSTRAINT IF EXISTS flashcards_user_id_fkey;
ALTER TABLE public.flashcards ADD CONSTRAINT flashcards_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update study_goals table
ALTER TABLE public.study_goals DROP CONSTRAINT IF EXISTS study_goals_user_id_fkey;
ALTER TABLE public.study_goals ADD CONSTRAINT study_goals_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update notes table
ALTER TABLE public.notes DROP CONSTRAINT IF EXISTS notes_user_id_fkey;
ALTER TABLE public.notes ADD CONSTRAINT notes_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update study_sessions table
ALTER TABLE public.study_sessions DROP CONSTRAINT IF EXISTS study_sessions_user_id_fkey;
ALTER TABLE public.study_sessions ADD CONSTRAINT study_sessions_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update progress table
ALTER TABLE public.progress DROP CONSTRAINT IF EXISTS progress_user_id_fkey;
ALTER TABLE public.progress ADD CONSTRAINT progress_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
