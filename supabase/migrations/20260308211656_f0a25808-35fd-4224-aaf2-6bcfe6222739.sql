
-- 1. Bookmarks table
CREATE TABLE public.bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  item_type text NOT NULL,
  item_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 2. Flashcard decks
CREATE TABLE public.flashcard_decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  subject text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own decks" ON public.flashcard_decks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. Flashcard cards with spaced repetition
CREATE TABLE public.flashcard_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id uuid REFERENCES public.flashcard_decks(id) ON DELETE CASCADE NOT NULL,
  front text NOT NULL,
  back text NOT NULL,
  ease_factor numeric NOT NULL DEFAULT 2.5,
  interval_days integer NOT NULL DEFAULT 0,
  repetitions integer NOT NULL DEFAULT 0,
  next_review_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.flashcard_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own cards" ON public.flashcard_cards FOR ALL USING (EXISTS (SELECT 1 FROM public.flashcard_decks WHERE id = flashcard_cards.deck_id AND user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.flashcard_decks WHERE id = flashcard_cards.deck_id AND user_id = auth.uid()));

-- 4. Reading list
CREATE TABLE public.reading_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  url text,
  item_type text DEFAULT 'article',
  completed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.reading_list ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own reading list" ON public.reading_list FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. Class announcements
CREATE TABLE public.class_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  teacher_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  priority text DEFAULT 'normal',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.class_announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage announcements" ON public.class_announcements FOR ALL USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Enrolled students view announcements" ON public.class_announcements FOR SELECT USING (EXISTS (SELECT 1 FROM public.enrollments WHERE course_id = class_announcements.course_id AND user_id = auth.uid()));

-- 6. Guardian rewards
CREATE TABLE public.guardian_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guardian_id uuid NOT NULL,
  student_id uuid NOT NULL,
  title text NOT NULL,
  target_lessons integer DEFAULT 10,
  current_progress integer DEFAULT 0,
  claimed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.guardian_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guardians manage rewards" ON public.guardian_rewards FOR ALL USING (auth.uid() = guardian_id) WITH CHECK (auth.uid() = guardian_id);
CREATE POLICY "Students view own rewards" ON public.guardian_rewards FOR SELECT USING (auth.uid() = student_id);

-- 7. Communication logs
CREATE TABLE public.communication_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL,
  parent_id uuid NOT NULL,
  student_id uuid,
  subject text NOT NULL,
  notes text,
  communication_type text DEFAULT 'message',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage own logs" ON public.communication_logs FOR ALL USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Parents view own logs" ON public.communication_logs FOR SELECT USING (auth.uid() = parent_id);
