
-- First, let's check if the trigger exists and recreate it properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Insert into profiles table with error handling
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

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Check if constraints exist before adding them
DO $$
BEGIN
  -- Add primary key constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'profiles' 
    AND constraint_type = 'PRIMARY KEY'
    AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
  END IF;
  
  -- Add unique constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'user_preferences' 
    AND constraint_name = 'user_preferences_user_id_key'
    AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.user_preferences ADD CONSTRAINT user_preferences_user_id_key UNIQUE (user_id);
  END IF;
END $$;
