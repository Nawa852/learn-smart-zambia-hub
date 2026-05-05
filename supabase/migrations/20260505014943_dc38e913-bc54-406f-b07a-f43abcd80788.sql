
-- SOCIAL
CREATE TABLE public.social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  content text NOT NULL,
  media_url text,
  visibility text NOT NULL DEFAULT 'public',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts viewable by authenticated" ON public.social_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own posts" ON public.social_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts" ON public.social_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own posts" ON public.social_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_social_posts_created ON public.social_posts(created_at DESC);

CREATE TABLE public.social_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  reaction_type text NOT NULL DEFAULT 'like',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id, reaction_type)
);
ALTER TABLE public.social_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reactions viewable by authenticated" ON public.social_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own reactions" ON public.social_reactions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.social_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.social_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments viewable by authenticated" ON public.social_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own comments" ON public.social_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own comments" ON public.social_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.study_group_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.study_group_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view group messages" ON public.study_group_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.study_group_members m WHERE m.group_id = study_group_messages.group_id AND m.user_id = auth.uid()));
CREATE POLICY "Members send group messages" ON public.study_group_messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.study_group_members m WHERE m.group_id = study_group_messages.group_id AND m.user_id = auth.uid()));
CREATE POLICY "Senders delete own group messages" ON public.study_group_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.direct_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  content text NOT NULL,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own DMs" ON public.direct_messages FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users send DMs" ON public.direct_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Recipients mark read" ON public.direct_messages FOR UPDATE TO authenticated USING (auth.uid() = recipient_id);
CREATE INDEX idx_dm_pair ON public.direct_messages(sender_id, recipient_id, created_at DESC);

-- ENTREPRENEUR
CREATE TABLE public.marketplace_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  price_zmw numeric NOT NULL DEFAULT 0,
  delivery_days integer DEFAULT 3,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.marketplace_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services viewable by authenticated" ON public.marketplace_services FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own services" ON public.marketplace_services FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.service_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES public.marketplace_services(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL,
  seller_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Buyers and sellers view orders" ON public.service_orders FOR SELECT TO authenticated USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers create orders" ON public.service_orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Sellers update orders" ON public.service_orders FOR UPDATE TO authenticated USING (auth.uid() = seller_id);

CREATE TABLE public.mentors_directory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  expertise text,
  bio text,
  sectors text[],
  contact_email text,
  linkedin_url text,
  directory_type text NOT NULL DEFAULT 'mentor',
  province text,
  is_verified boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.mentors_directory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Directory viewable by authenticated" ON public.mentors_directory FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users add own directory entry" ON public.mentors_directory FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Owners update directory entry" ON public.mentors_directory FOR UPDATE TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "Owners delete directory entry" ON public.mentors_directory FOR DELETE TO authenticated USING (auth.uid() = created_by);

CREATE TABLE public.mentor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid NOT NULL REFERENCES public.mentors_directory(id) ON DELETE CASCADE,
  requester_id uuid NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.mentor_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Requesters view own requests" ON public.mentor_requests FOR SELECT TO authenticated
  USING (auth.uid() = requester_id OR EXISTS (SELECT 1 FROM public.mentors_directory m WHERE m.id = mentor_requests.mentor_id AND m.user_id = auth.uid()));
CREATE POLICY "Users create requests" ON public.mentor_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = requester_id);

CREATE TABLE public.pitch_decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  venture_id uuid REFERENCES public.ventures(id) ON DELETE SET NULL,
  title text NOT NULL,
  content_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.pitch_decks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own pitch decks" ON public.pitch_decks FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- NGO
CREATE TABLE public.ngo_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  focus_area text,
  province text,
  status text NOT NULL DEFAULT 'active',
  start_date date,
  end_date date,
  beneficiaries_target integer DEFAULT 0,
  beneficiaries_count integer DEFAULT 0,
  budget_zmw numeric DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.ngo_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Programs viewable by authenticated" ON public.ngo_programs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Owners manage programs" ON public.ngo_programs FOR ALL TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE TABLE public.ngo_beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.ngo_programs(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL,
  name text NOT NULL,
  age integer,
  gender text,
  school text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.ngo_beneficiaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage beneficiaries" ON public.ngo_beneficiaries FOR ALL TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE TABLE public.grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  program_id uuid REFERENCES public.ngo_programs(id) ON DELETE SET NULL,
  donor_name text NOT NULL,
  amount_zmw numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'prospecting',
  deadline date,
  awarded_date date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.grants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage grants" ON public.grants FOR ALL TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE TABLE public.partner_schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  name text NOT NULL,
  province text,
  district text,
  school_type text,
  students_enrolled integer DEFAULT 0,
  contact_person text,
  contact_phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.partner_schools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Schools viewable by authenticated" ON public.partner_schools FOR SELECT TO authenticated USING (true);
CREATE POLICY "Owners manage schools" ON public.partner_schools FOR ALL TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE TABLE public.school_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.partner_schools(id) ON DELETE CASCADE,
  program_id uuid REFERENCES public.ngo_programs(id) ON DELETE SET NULL,
  owner_id uuid NOT NULL,
  intervention_type text NOT NULL,
  description text,
  intervention_date date NOT NULL DEFAULT CURRENT_DATE,
  students_reached integer DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.school_interventions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage interventions" ON public.school_interventions FOR ALL TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.social_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.study_group_messages;
