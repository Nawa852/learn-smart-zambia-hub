CREATE TABLE public.course_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  type text NOT NULL DEFAULT 'past_paper',
  year text,
  paper text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Materials viewable with course"
  ON public.course_materials FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM courses WHERE courses.id = course_materials.course_id
    AND (courses.is_published = true OR courses.created_by = auth.uid())
  ));

CREATE POLICY "Course creators can manage materials"
  ON public.course_materials FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM courses WHERE courses.id = course_materials.course_id
    AND courses.created_by = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM courses WHERE courses.id = course_materials.course_id
    AND courses.created_by = auth.uid()
  ));