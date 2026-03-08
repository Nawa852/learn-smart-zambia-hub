
-- Developer projects table
CREATE TABLE public.developer_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  language text,
  description text,
  repo_url text,
  progress integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.developer_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own developer projects" ON public.developer_projects
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Venture financials table
CREATE TABLE public.venture_financials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid REFERENCES public.ventures(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  type text NOT NULL DEFAULT 'expense',
  category text,
  amount numeric NOT NULL DEFAULT 0,
  description text,
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.venture_financials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own financials" ON public.venture_financials
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Ministry aggregate stats function
CREATE OR REPLACE FUNCTION public.get_platform_stats()
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public AS $$
  SELECT jsonb_build_object(
    'total_students', (SELECT count(*) FROM profiles WHERE role = 'student'),
    'total_teachers', (SELECT count(*) FROM profiles WHERE role = 'teacher'),
    'total_courses', (SELECT count(*) FROM courses),
    'total_schools', (SELECT count(DISTINCT school) FROM profiles WHERE school IS NOT NULL),
    'total_enrollments', (SELECT count(*) FROM enrollments),
    'avg_grade', (SELECT COALESCE(round(avg(score)::numeric, 1), 0) FROM grades)
  )
$$;
