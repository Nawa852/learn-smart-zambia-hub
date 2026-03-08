
-- Guardian links table
CREATE TABLE public.guardian_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  guardian_name text NOT NULL,
  relationship text NOT NULL,
  phone text NOT NULL,
  email text,
  mode text NOT NULL DEFAULT 'monitor',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.guardian_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can manage own guardian links" ON public.guardian_links
  FOR ALL TO authenticated
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- Guardian reports table
CREATE TABLE public.guardian_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guardian_link_id uuid REFERENCES public.guardian_links(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  report_data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.guardian_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own reports" ON public.guardian_reports
  FOR SELECT TO authenticated
  USING (auth.uid() = student_id);

-- Push subscriptions table
CREATE TABLE public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subscription jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own push subscriptions" ON public.push_subscriptions
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
