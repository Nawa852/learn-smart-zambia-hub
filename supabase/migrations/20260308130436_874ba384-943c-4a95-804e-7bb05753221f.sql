
-- Education policies table for Ministry
CREATE TABLE public.education_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'planned',
  implemented_date date,
  target text,
  actual_result text,
  budget text,
  province text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.education_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ministry users manage policies" ON public.education_policies
  FOR ALL TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users view policies" ON public.education_policies
  FOR SELECT TO authenticated
  USING (true);

-- NGO partnerships table
CREATE TABLE public.ngo_partnerships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_name text NOT NULL,
  program_name text NOT NULL,
  focus_area text,
  province text,
  funding_amount numeric DEFAULT 0,
  start_date date,
  end_date date,
  status text NOT NULL DEFAULT 'active',
  contact_email text,
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ngo_partnerships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ministry users manage partnerships" ON public.ngo_partnerships
  FOR ALL TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users view partnerships" ON public.ngo_partnerships
  FOR SELECT TO authenticated
  USING (true);
