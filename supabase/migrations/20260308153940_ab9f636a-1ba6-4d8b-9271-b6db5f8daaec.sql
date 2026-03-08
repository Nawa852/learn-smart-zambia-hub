
-- Screen time tracking
CREATE TABLE public.screen_time_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  app_name TEXT NOT NULL DEFAULT 'edu_zambia',
  minutes_used INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'learning',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date, app_name)
);
ALTER TABLE public.screen_time_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own screen time" ON public.screen_time_logs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Guardians view linked student screen time" ON public.screen_time_logs FOR SELECT USING (EXISTS (SELECT 1 FROM guardian_links gl WHERE gl.guardian_id = auth.uid() AND gl.student_id = screen_time_logs.user_id AND gl.status = 'active'));

-- Badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL DEFAULT '🏆',
  category TEXT NOT NULL DEFAULT 'achievement',
  xp_reward INTEGER NOT NULL DEFAULT 0,
  condition_type TEXT NOT NULL,
  condition_value INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);

-- User badges (earned)
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System insert badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User stats table for XP, level, coins
CREATE TABLE public.user_stats (
  user_id UUID PRIMARY KEY,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  edu_coins INTEGER NOT NULL DEFAULT 0,
  total_focus_minutes INTEGER NOT NULL DEFAULT 0,
  total_lessons_completed INTEGER NOT NULL DEFAULT 0,
  total_quizzes_passed INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own stats" ON public.user_stats FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public leaderboard view" ON public.user_stats FOR SELECT USING (true);

-- Device control settings (parental controls)
CREATE TABLE public.device_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  guardian_id UUID NOT NULL,
  daily_screen_limit_minutes INTEGER NOT NULL DEFAULT 120,
  focus_required_before_free_time BOOLEAN NOT NULL DEFAULT true,
  min_focus_minutes_per_day INTEGER NOT NULL DEFAULT 30,
  allowed_hours_start TIME DEFAULT '06:00',
  allowed_hours_end TIME DEFAULT '21:00',
  content_filter_level TEXT NOT NULL DEFAULT 'strict',
  auto_lock_during_schedule BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, guardian_id)
);
ALTER TABLE public.device_controls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guardians manage controls" ON public.device_controls FOR ALL USING (auth.uid() = guardian_id) WITH CHECK (auth.uid() = guardian_id);
CREATE POLICY "Students view own controls" ON public.device_controls FOR SELECT USING (auth.uid() = student_id);

-- Add realtime for screen_time_logs
ALTER PUBLICATION supabase_realtime ADD TABLE public.screen_time_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_stats;

-- Insert default badges
INSERT INTO public.badges (name, description, icon, category, condition_type, condition_value, xp_reward) VALUES
  ('First Steps', 'Complete your first lesson', '🎓', 'learning', 'lessons_completed', 1, 10),
  ('Bookworm', 'Complete 10 lessons', '📚', 'learning', 'lessons_completed', 10, 50),
  ('Scholar', 'Complete 50 lessons', '🎯', 'learning', 'lessons_completed', 50, 200),
  ('Quiz Whiz', 'Pass 5 quizzes', '🧠', 'learning', 'quizzes_passed', 5, 50),
  ('Quiz Master', 'Pass 25 quizzes', '👑', 'learning', 'quizzes_passed', 25, 200),
  ('Focused Mind', 'Accumulate 60 minutes of focus', '🔥', 'discipline', 'focus_minutes', 60, 30),
  ('Deep Focus', 'Accumulate 300 minutes of focus', '⚡', 'discipline', 'focus_minutes', 300, 150),
  ('Iron Will', 'Accumulate 1000 minutes of focus', '💎', 'discipline', 'focus_minutes', 1000, 500),
  ('Streak Starter', 'Maintain a 3-day streak', '🔥', 'consistency', 'streak_days', 3, 20),
  ('Week Warrior', 'Maintain a 7-day streak', '⭐', 'consistency', 'streak_days', 7, 50),
  ('Monthly Champion', 'Maintain a 30-day streak', '🏆', 'consistency', 'streak_days', 30, 300),
  ('Social Learner', 'Join a study group', '👥', 'social', 'groups_joined', 1, 15),
  ('Course Explorer', 'Enroll in 3 courses', '🗺️', 'learning', 'courses_enrolled', 3, 30),
  ('Perfectionist', 'Score 100% on a quiz', '💯', 'achievement', 'perfect_quiz', 1, 50),
  ('Early Bird', 'Study before 7 AM', '🌅', 'discipline', 'early_study', 1, 20);

-- XP award function
CREATE OR REPLACE FUNCTION public.award_xp(p_user_id UUID, p_xp INTEGER, p_coins INTEGER DEFAULT 0)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO user_stats (user_id, xp, edu_coins, level)
  VALUES (p_user_id, p_xp, p_coins, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    xp = user_stats.xp + p_xp,
    edu_coins = user_stats.edu_coins + p_coins,
    level = GREATEST(1, FLOOR((user_stats.xp + p_xp) / 100.0)::integer),
    updated_at = now();
END;
$$;

-- Trigger: award XP on lesson completion
CREATE OR REPLACE FUNCTION public.on_lesson_completed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM award_xp(NEW.user_id, 10, 5);
  UPDATE user_stats SET total_lessons_completed = total_lessons_completed + 1 WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_lesson_completed
AFTER INSERT ON public.lesson_completions
FOR EACH ROW EXECUTE FUNCTION public.on_lesson_completed();

-- Trigger: award XP on quiz attempt (if passed >70%)
CREATE OR REPLACE FUNCTION public.on_quiz_completed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.total_questions > 0 AND (NEW.correct_answers::float / NEW.total_questions) >= 0.7 THEN
    PERFORM award_xp(NEW.user_id, 25, 10);
    UPDATE user_stats SET total_quizzes_passed = total_quizzes_passed + 1 WHERE user_id = NEW.user_id;
  ELSE
    PERFORM award_xp(NEW.user_id, 5, 2);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_quiz_completed
AFTER INSERT ON public.quiz_attempts
FOR EACH ROW EXECUTE FUNCTION public.on_quiz_completed();

-- Trigger: track focus minutes
CREATE OR REPLACE FUNCTION public.on_focus_session_saved()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT NEW.gave_up THEN
    PERFORM award_xp(NEW.user_id, GREATEST(5, NEW.focus_minutes / 5), GREATEST(2, NEW.focus_minutes / 10));
  END IF;
  INSERT INTO user_stats (user_id, total_focus_minutes)
  VALUES (NEW.user_id, NEW.focus_minutes)
  ON CONFLICT (user_id)
  DO UPDATE SET total_focus_minutes = user_stats.total_focus_minutes + NEW.focus_minutes, updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_focus_session_saved
AFTER INSERT ON public.focus_sessions
FOR EACH ROW EXECUTE FUNCTION public.on_focus_session_saved();
