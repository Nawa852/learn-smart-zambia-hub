
-- Create study materials table with proper structure
CREATE TABLE IF NOT EXISTS public.study_materials (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  subject TEXT,
  grade INTEGER,
  curriculum TEXT DEFAULT 'ECZ',
  language TEXT DEFAULT 'English',
  is_public BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AI chat history table
CREATE TABLE IF NOT EXISTS public.ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id UUID DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  response TEXT,
  ai_model TEXT DEFAULT 'gpt-3.5-turbo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create learning analytics table
CREATE TABLE IF NOT EXISTS public.learning_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  content_id TEXT,
  duration_minutes INTEGER,
  performance_score DECIMAL(5,2),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  points INTEGER DEFAULT 0,
  badge_url TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create flashcards table
CREATE TABLE IF NOT EXISTS public.flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  front_content TEXT NOT NULL,
  back_content TEXT NOT NULL,
  subject TEXT,
  difficulty_level TEXT DEFAULT 'medium',
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create study goals table
CREATE TABLE IF NOT EXISTS public.study_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  is_completed BOOLEAN DEFAULT false,
  progress_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_goals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for study_materials
CREATE POLICY "Users can view their own materials" ON public.study_materials
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert their own materials" ON public.study_materials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own materials" ON public.study_materials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own materials" ON public.study_materials
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for ai_chat_history
CREATE POLICY "Users can view their own chat history" ON public.ai_chat_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat history" ON public.ai_chat_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for learning_analytics
CREATE POLICY "Users can view their own analytics" ON public.learning_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON public.learning_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for achievements
CREATE POLICY "Users can view their own achievements" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON public.achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for flashcards
CREATE POLICY "Users can manage their own flashcards" ON public.flashcards
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for study_goals
CREATE POLICY "Users can manage their own goals" ON public.study_goals
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_study_materials_user_id ON public.study_materials(user_id);
CREATE INDEX IF NOT EXISTS idx_study_materials_subject ON public.study_materials(subject);
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_user_id ON public.ai_chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_analytics_user_id ON public.learning_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON public.achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_user_id ON public.flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_study_goals_user_id ON public.study_goals(user_id);
