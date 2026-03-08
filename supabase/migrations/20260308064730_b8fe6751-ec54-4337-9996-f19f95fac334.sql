
-- Lesson completions table for persistent progress tracking
CREATE TABLE public.lesson_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

-- Users can view own completions
CREATE POLICY "Users can view own completions" ON public.lesson_completions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Users can insert own completions
CREATE POLICY "Users can insert own completions" ON public.lesson_completions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Users can delete own completions (uncomplete)
CREATE POLICY "Users can delete own completions" ON public.lesson_completions
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
