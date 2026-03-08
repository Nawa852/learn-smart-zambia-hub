
CREATE TABLE public.past_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  year text NOT NULL,
  grade text NOT NULL,
  subject text NOT NULL,
  paper text NOT NULL DEFAULT 'Paper 1',
  has_marking_scheme boolean NOT NULL DEFAULT false,
  file_url text,
  external_url text,
  source text DEFAULT 'ECZ',
  uploaded_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.past_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view past papers"
  ON public.past_papers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can upload past papers"
  ON public.past_papers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Uploaders can update own papers"
  ON public.past_papers FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Uploaders can delete own papers"
  ON public.past_papers FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);
