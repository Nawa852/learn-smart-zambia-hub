-- Study goals table for persistent goal tracking
CREATE TABLE public.study_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  goal_type text NOT NULL DEFAULT 'daily',
  target integer NOT NULL DEFAULT 1,
  current integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  due_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.study_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own goals" ON public.study_goals FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Quiz attempts table for ECZ practice tracking
CREATE TABLE public.quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  grade_level text NOT NULL,
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL,
  time_taken_seconds integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own quiz attempts" ON public.quiz_attempts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);