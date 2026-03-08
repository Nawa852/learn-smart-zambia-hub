
-- Notifications table
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text,
  link text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT TO authenticated WITH CHECK (true);

-- Trigger: notify students when new assignment is created
CREATE OR REPLACE FUNCTION public.notify_new_assignment()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, link)
  SELECT e.user_id, 'new_assignment', 'New Assignment',
    'New assignment: ' || NEW.title,
    '/course/' || NEW.course_id
  FROM public.enrollments e WHERE e.course_id = NEW.course_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_new_assignment
  AFTER INSERT ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_assignment();

-- Trigger: notify student when submission is graded
CREATE OR REPLACE FUNCTION public.notify_submission_graded()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF OLD.graded_at IS NULL AND NEW.graded_at IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      NEW.user_id, 'graded', 'Assignment Graded',
      'Your submission scored ' || COALESCE(NEW.score::text, 'N/A') || '. ' || COALESCE(NEW.feedback, ''),
      '/course/' || (SELECT a.course_id FROM public.assignments a WHERE a.id = NEW.assignment_id)
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_submission_graded
  AFTER UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.notify_submission_graded();

-- Index for fast lookups
CREATE INDEX idx_notifications_user_unread ON public.notifications (user_id, is_read) WHERE is_read = false;
