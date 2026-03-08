
-- Study schedules table
CREATE TABLE public.study_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  days text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own schedules" ON public.study_schedules
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Guardians can view linked student schedules
CREATE POLICY "Guardians can view linked student schedules" ON public.study_schedules
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.student_id = study_schedules.user_id AND gl.status = 'active'
    )
  );

-- Add distraction tracking to focus_sessions
ALTER TABLE public.focus_sessions ADD COLUMN distraction_count integer NOT NULL DEFAULT 0;

-- Add device setup flag to profiles
ALTER TABLE public.profiles ADD COLUMN device_setup_complete boolean NOT NULL DEFAULT false;
