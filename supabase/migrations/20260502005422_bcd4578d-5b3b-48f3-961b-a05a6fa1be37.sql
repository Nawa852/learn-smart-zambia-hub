-- Extend profiles with rich onboarding fields supporting all education levels
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS education_level TEXT, -- 'primary' | 'secondary' | 'college' | 'university' | 'tvet' | 'adult'
  ADD COLUMN IF NOT EXISTS institution_name TEXT,
  ADD COLUMN IF NOT EXISTS institution_type TEXT, -- 'school' | 'college' | 'university' | 'tvet' | 'self'
  ADD COLUMN IF NOT EXISTS program_of_study TEXT,
  ADD COLUMN IF NOT EXISTS year_of_study TEXT,
  ADD COLUMN IF NOT EXISTS subjects TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS exam_target TEXT,
  ADD COLUMN IF NOT EXISTS exam_year INTEGER,
  ADD COLUMN IF NOT EXISTS study_goals TEXT,
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS guardian_contact TEXT,
  ADD COLUMN IF NOT EXISTS career_interest TEXT,
  ADD COLUMN IF NOT EXISTS learning_style TEXT, -- 'visual' | 'auditory' | 'reading' | 'kinesthetic'
  ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
  -- Teacher-specific
  ADD COLUMN IF NOT EXISTS subjects_taught TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS grades_taught TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS years_experience INTEGER,
  ADD COLUMN IF NOT EXISTS teacher_qualification TEXT,
  -- Parent-specific
  ADD COLUMN IF NOT EXISTS relationship_to_child TEXT,
  ADD COLUMN IF NOT EXISTS num_children INTEGER DEFAULT 0;

-- Index for institution lookup
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON public.profiles(institution_name);
CREATE INDEX IF NOT EXISTS idx_profiles_education_level ON public.profiles(education_level);