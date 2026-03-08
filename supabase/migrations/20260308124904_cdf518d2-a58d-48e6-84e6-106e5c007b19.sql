
-- Student notes table
CREATE TABLE public.student_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text,
  content text NOT NULL DEFAULT '',
  course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own notes" ON public.student_notes
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Attendance table
CREATE TABLE public.attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  recorded_by uuid,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'present',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own attendance" ON public.attendance
  FOR SELECT TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers record attendance" ON public.attendance
  FOR ALL TO authenticated
  USING (auth.uid() = recorded_by)
  WITH CHECK (auth.uid() = recorded_by);

CREATE POLICY "Guardians view linked student attendance" ON public.attendance
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM guardian_links gl
    WHERE gl.guardian_id = auth.uid()
      AND gl.student_id = attendance.student_id
      AND gl.status = 'active'
  ));

-- Study groups table
CREATE TABLE public.study_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text,
  grade_level text,
  max_members integer DEFAULT 20,
  created_by uuid NOT NULL,
  is_public boolean DEFAULT true,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public groups viewable" ON public.study_groups
  FOR SELECT TO authenticated
  USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users create groups" ON public.study_groups
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators manage groups" ON public.study_groups
  FOR UPDATE TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Creators delete groups" ON public.study_groups
  FOR DELETE TO authenticated
  USING (auth.uid() = created_by);

-- Study group members
CREATE TABLE public.study_group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members view group members" ON public.study_group_members
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM study_group_members sgm
    WHERE sgm.group_id = study_group_members.group_id
      AND sgm.user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM study_groups sg
    WHERE sg.id = study_group_members.group_id
      AND (sg.is_public = true OR sg.created_by = auth.uid())
  ));

CREATE POLICY "Users join groups" ON public.study_group_members
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users leave groups" ON public.study_group_members
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Certificates table
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  issued_at timestamptz NOT NULL DEFAULT now(),
  certificate_number text NOT NULL DEFAULT 'CERT-' || substr(gen_random_uuid()::text, 1, 8)
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own certificates" ON public.certificates
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System inserts certificates" ON public.certificates
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Theme preference on profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme_preference text DEFAULT 'system';

-- Streak calculation function
CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  streak integer := 0;
  check_date date := CURRENT_DATE;
  has_activity boolean;
BEGIN
  LOOP
    SELECT EXISTS (
      SELECT 1 FROM focus_sessions WHERE user_id = p_user_id AND DATE(started_at) = check_date
      UNION ALL
      SELECT 1 FROM lesson_completions WHERE user_id = p_user_id AND DATE(completed_at) = check_date
      UNION ALL
      SELECT 1 FROM quiz_attempts WHERE user_id = p_user_id AND DATE(created_at) = check_date
    ) INTO has_activity;
    
    IF has_activity THEN
      streak := streak + 1;
      check_date := check_date - 1;
    ELSE
      EXIT;
    END IF;
    
    IF streak > 365 THEN EXIT; END IF;
  END LOOP;
  
  RETURN streak;
END;
$$;
