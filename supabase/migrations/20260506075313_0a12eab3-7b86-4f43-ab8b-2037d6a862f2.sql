
-- VIDEO ROOMS
CREATE TABLE IF NOT EXISTS public.video_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid NOT NULL,
  room_code text NOT NULL UNIQUE DEFAULT ('nx-' || substr(gen_random_uuid()::text,1,12)),
  title text NOT NULL,
  scope text NOT NULL DEFAULT 'public', -- public | group | class | dm
  scope_id uuid,
  provider text NOT NULL DEFAULT 'jitsi',
  scheduled_at timestamptz,
  started_at timestamptz,
  ended_at timestamptz,
  is_recording boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.video_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view rooms" ON public.video_rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users create their rooms" ON public.video_rooms FOR INSERT TO authenticated WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts update rooms" ON public.video_rooms FOR UPDATE TO authenticated USING (auth.uid() = host_id);
CREATE POLICY "Hosts delete rooms" ON public.video_rooms FOR DELETE TO authenticated USING (auth.uid() = host_id);

CREATE TABLE IF NOT EXISTS public.video_room_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.video_rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  left_at timestamptz
);
ALTER TABLE public.video_room_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View participants" ON public.video_room_participants FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users record own participation" ON public.video_room_participants FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own participation" ON public.video_room_participants FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- STUDY GROUPS (create if not exists)
CREATE TABLE IF NOT EXISTS public.study_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  subject text,
  grade_level text,
  is_public boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "View public groups" ON public.study_groups;
CREATE POLICY "View public groups" ON public.study_groups FOR SELECT TO authenticated USING (is_public = true OR created_by = auth.uid());
DROP POLICY IF EXISTS "Create groups" ON public.study_groups;
CREATE POLICY "Create groups" ON public.study_groups FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
DROP POLICY IF EXISTS "Owners update groups" ON public.study_groups;
CREATE POLICY "Owners update groups" ON public.study_groups FOR UPDATE TO authenticated USING (auth.uid() = created_by);
DROP POLICY IF EXISTS "Owners delete groups" ON public.study_groups;
CREATE POLICY "Owners delete groups" ON public.study_groups FOR DELETE TO authenticated USING (auth.uid() = created_by);

CREATE TABLE IF NOT EXISTS public.study_group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'member',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (group_id, user_id)
);
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "View memberships" ON public.study_group_members;
CREATE POLICY "View memberships" ON public.study_group_members FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Join groups" ON public.study_group_members;
CREATE POLICY "Join groups" ON public.study_group_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Leave groups" ON public.study_group_members;
CREATE POLICY "Leave groups" ON public.study_group_members FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Helper function to test membership
CREATE OR REPLACE FUNCTION public.is_group_member(_group_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM study_group_members WHERE group_id = _group_id AND user_id = _user_id)
      OR EXISTS (SELECT 1 FROM study_groups WHERE id = _group_id AND created_by = _user_id);
$$;

-- GROUP FILES
CREATE TABLE IF NOT EXISTS public.group_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  uploader_id uuid NOT NULL,
  file_url text NOT NULL,
  file_name text NOT NULL,
  mime text,
  size_bytes bigint,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.group_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view group files" ON public.group_files FOR SELECT TO authenticated USING (public.is_group_member(group_id, auth.uid()));
CREATE POLICY "Members upload group files" ON public.group_files FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploader_id AND public.is_group_member(group_id, auth.uid()));
CREATE POLICY "Uploaders delete files" ON public.group_files FOR DELETE TO authenticated USING (auth.uid() = uploader_id);

-- SCHOOL ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.school_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school text NOT NULL,
  author_id uuid NOT NULL,
  title text NOT NULL,
  body text,
  audience text NOT NULL DEFAULT 'all',
  priority text NOT NULL DEFAULT 'normal',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.school_announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone in school views" ON public.school_announcements FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.school = school_announcements.school)
  OR author_id = auth.uid()
);
CREATE POLICY "Authors create announcements" ON public.school_announcements FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update announcements" ON public.school_announcements FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Authors delete announcements" ON public.school_announcements FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- DONOR PLEDGES
CREATE TABLE IF NOT EXISTS public.donor_pledges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pledger_id uuid,
  donor_name text NOT NULL,
  amount_zmw numeric NOT NULL DEFAULT 0,
  message text,
  program_id uuid,
  is_public boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.donor_pledges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view public pledges" ON public.donor_pledges FOR SELECT USING (is_public = true OR pledger_id = auth.uid());
CREATE POLICY "Authenticated create pledges" ON public.donor_pledges FOR INSERT TO authenticated WITH CHECK (auth.uid() = pledger_id);
CREATE POLICY "Pledger updates own" ON public.donor_pledges FOR UPDATE TO authenticated USING (auth.uid() = pledger_id);
CREATE POLICY "Pledger deletes own" ON public.donor_pledges FOR DELETE TO authenticated USING (auth.uid() = pledger_id);

-- realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.video_room_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_files;
