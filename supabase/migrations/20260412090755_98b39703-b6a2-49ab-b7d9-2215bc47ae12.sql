
-- Peer Matches table
CREATE TABLE public.peer_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID NOT NULL,
  matched_user_id UUID NOT NULL,
  match_score INTEGER DEFAULT 0,
  subjects TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.peer_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own matches" ON public.peer_matches FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = matched_user_id);
CREATE POLICY "Users create match requests" ON public.peer_matches FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users update own matches" ON public.peer_matches FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = matched_user_id);
CREATE POLICY "Users delete own matches" ON public.peer_matches FOR DELETE USING (auth.uid() = requester_id);

-- Mentorships table
CREATE TABLE public.mentorships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID NOT NULL,
  mentee_id UUID NOT NULL,
  subject_area TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  goals TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.mentorships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants view mentorships" ON public.mentorships FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Users request mentorship" ON public.mentorships FOR INSERT WITH CHECK (auth.uid() = mentee_id);
CREATE POLICY "Participants update mentorship" ON public.mentorships FOR UPDATE USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Participants delete mentorship" ON public.mentorships FOR DELETE USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

-- Community Events table
CREATE TABLE public.community_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'study_session',
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  is_virtual BOOLEAN NOT NULL DEFAULT true,
  meeting_link TEXT,
  max_attendees INTEGER DEFAULT 50,
  subject TEXT,
  grade_level TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events" ON public.community_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users create events" ON public.community_events FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Creators update events" ON public.community_events FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Creators delete events" ON public.community_events FOR DELETE USING (auth.uid() = created_by);

-- Event Attendees table
CREATE TABLE public.event_attendees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.community_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rsvp_status TEXT NOT NULL DEFAULT 'going',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view attendees" ON public.event_attendees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own RSVP" ON public.event_attendees FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own RSVP" ON public.event_attendees FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own RSVP" ON public.event_attendees FOR DELETE USING (auth.uid() = user_id);

-- Collaboration Sessions table
CREATE TABLE public.collaboration_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  session_type TEXT NOT NULL DEFAULT 'whiteboard',
  created_by UUID NOT NULL,
  participants UUID[] DEFAULT '{}',
  content_data JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  subject TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.collaboration_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants view sessions" ON public.collaboration_sessions FOR SELECT TO authenticated USING (auth.uid() = created_by OR auth.uid() = ANY(participants));
CREATE POLICY "Users create sessions" ON public.collaboration_sessions FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Creator updates session" ON public.collaboration_sessions FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Creator deletes session" ON public.collaboration_sessions FOR DELETE USING (auth.uid() = created_by);

-- Enable realtime for events and collaboration
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.collaboration_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.peer_matches;
