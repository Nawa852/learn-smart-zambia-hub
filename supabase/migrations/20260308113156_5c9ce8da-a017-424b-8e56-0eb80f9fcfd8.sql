
CREATE TABLE public.clinical_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  condition text NOT NULL,
  patient_summary text,
  presenting_complaint text,
  diagnosis text,
  outcome text DEFAULT 'ongoing',
  body_system text,
  accuracy_score integer,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clinical_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own cases" ON public.clinical_cases
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.clinical_rotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  rotation_name text NOT NULL,
  supervisor_name text,
  start_date date,
  end_date date,
  status text DEFAULT 'upcoming',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clinical_rotations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own rotations" ON public.clinical_rotations
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
