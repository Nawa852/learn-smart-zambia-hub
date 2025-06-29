
-- Fix foreign key inconsistencies that are causing login failures
-- Update all tables to reference the correct user tables consistently

-- Fix achievements table to reference profiles instead of auth.users
ALTER TABLE public.achievements DROP CONSTRAINT IF EXISTS achievements_user_id_fkey;
ALTER TABLE public.achievements ADD CONSTRAINT achievements_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Fix ai_chat_history table to reference profiles instead of auth.users
ALTER TABLE public.ai_chat_history DROP CONSTRAINT IF EXISTS ai_chat_history_user_id_fkey;
ALTER TABLE public.ai_chat_history ADD CONSTRAINT ai_chat_history_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Fix learning_analytics table to reference profiles instead of auth.users
ALTER TABLE public.learning_analytics DROP CONSTRAINT IF EXISTS learning_analytics_user_id_fkey;
ALTER TABLE public.learning_analytics ADD CONSTRAINT learning_analytics_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Fix flashcards table to reference profiles instead of auth.users
ALTER TABLE public.flashcards DROP CONSTRAINT IF EXISTS flashcards_user_id_fkey;
ALTER TABLE public.flashcards ADD CONSTRAINT flashcards_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Fix study_goals table to reference profiles instead of auth.users
ALTER TABLE public.study_goals DROP CONSTRAINT IF EXISTS study_goals_user_id_fkey;
ALTER TABLE public.study_goals ADD CONSTRAINT study_goals_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Fix notes table to reference profiles instead of auth.users
ALTER TABLE public.notes DROP CONSTRAINT IF EXISTS notes_user_id_fkey;
ALTER TABLE public.notes ADD CONSTRAINT notes_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Fix study_sessions table to reference profiles instead of auth.users
ALTER TABLE public.study_sessions DROP CONSTRAINT IF EXISTS study_sessions_user_id_fkey;
ALTER TABLE public.study_sessions ADD CONSTRAINT study_sessions_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Fix progress table to reference profiles instead of auth.users
ALTER TABLE public.progress DROP CONSTRAINT IF EXISTS progress_user_id_fkey;
ALTER TABLE public.progress ADD CONSTRAINT progress_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Create trigger to ensure handle_new_user runs when new users sign up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
