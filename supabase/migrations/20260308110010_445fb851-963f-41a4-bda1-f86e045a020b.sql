
CREATE TABLE public.focus_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  focus_minutes integer NOT NULL DEFAULT 0,
  sessions_completed integer NOT NULL DEFAULT 0,
  gave_up boolean NOT NULL DEFAULT false,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  ended_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own focus sessions" ON public.focus_sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own focus sessions" ON public.focus_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update own focus sessions" ON public.focus_sessions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Guardians can view linked student focus sessions" ON public.focus_sessions
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guardian_links gl
      WHERE gl.guardian_id = auth.uid() AND gl.student_id = focus_sessions.user_id AND gl.status = 'active'
    )
  );
