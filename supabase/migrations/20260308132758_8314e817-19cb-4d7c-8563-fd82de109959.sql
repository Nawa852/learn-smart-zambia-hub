
CREATE TABLE public.school_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  end_date date,
  event_type text NOT NULL DEFAULT 'event',
  venue text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.school_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own school events" ON public.school_events
  FOR ALL TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "View school events" ON public.school_events
  FOR SELECT TO authenticated
  USING (true);
