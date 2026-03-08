
-- cyber_challenges table for hacking terminal persistence
CREATE TABLE public.cyber_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_name text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.cyber_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own cyber challenges" ON public.cyber_challenges
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public view cyber leaderboard" ON public.cyber_challenges
  FOR SELECT TO authenticated
  USING (true);
