
-- 1. App roles enum
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'guardian', 'institution', 'ministry', 'doctor', 'entrepreneur', 'developer');

-- 2. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role app_role NOT NULL DEFAULT 'student',
  bio TEXT,
  phone TEXT,
  school TEXT,
  grade TEXT,
  province TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Public profiles viewable" ON public.profiles FOR SELECT USING (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. User roles table (for granular role checks)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- 4. Courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  grade_level TEXT,
  thumbnail_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses viewable by all" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Creators can manage own courses" ON public.courses FOR ALL USING (auth.uid() = created_by);

-- 5. Lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INT NOT NULL DEFAULT 0,
  duration_minutes INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons viewable with course" ON public.lessons FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id AND (courses.is_published = true OR courses.created_by = auth.uid()))
);
CREATE POLICY "Course creators can manage lessons" ON public.lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id AND courses.created_by = auth.uid())
);

-- 6. Enrollments
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  progress NUMERIC(5,2) NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll themselves" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own enrollment" ON public.enrollments FOR UPDATE USING (auth.uid() = user_id);

-- 7. Assignments
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  max_score NUMERIC(5,2) NOT NULL DEFAULT 100,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assignments viewable by enrolled students" ON public.assignments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.course_id = assignments.course_id AND enrollments.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.courses WHERE courses.id = assignments.course_id AND courses.created_by = auth.uid())
);
CREATE POLICY "Course creators can manage assignments" ON public.assignments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.courses WHERE courses.id = assignments.course_id AND courses.created_by = auth.uid())
);

-- 8. Submissions
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  file_url TEXT,
  score NUMERIC(5,2),
  feedback TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  graded_at TIMESTAMPTZ,
  UNIQUE (assignment_id, user_id)
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit own work" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Teachers can view/grade submissions" ON public.submissions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.assignments a
    JOIN public.courses c ON c.id = a.course_id
    WHERE a.id = submissions.assignment_id AND c.created_by = auth.uid()
  )
);
CREATE POLICY "Teachers can grade submissions" ON public.submissions FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.assignments a
    JOIN public.courses c ON c.id = a.course_id
    WHERE a.id = submissions.assignment_id AND c.created_by = auth.uid()
  )
);

-- 9. Chat rooms
CREATE TABLE public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_group BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;

-- 10. Chat members
CREATE TABLE public.chat_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (room_id, user_id)
);

ALTER TABLE public.chat_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their rooms" ON public.chat_rooms FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_members WHERE chat_members.room_id = chat_rooms.id AND chat_members.user_id = auth.uid())
);
CREATE POLICY "Users can create rooms" ON public.chat_rooms FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Members can view room members" ON public.chat_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_members cm WHERE cm.room_id = chat_members.room_id AND cm.user_id = auth.uid())
);
CREATE POLICY "Room creators can add members" ON public.chat_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.chat_rooms WHERE chat_rooms.id = chat_members.room_id AND chat_rooms.created_by = auth.uid())
  OR auth.uid() = user_id
);

-- 11. Messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view messages" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_members WHERE chat_members.room_id = messages.room_id AND chat_members.user_id = auth.uid())
);
CREATE POLICY "Members can send messages" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (SELECT 1 FROM public.chat_members WHERE chat_members.room_id = messages.room_id AND chat_members.user_id = auth.uid())
);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- 12. Grades / grade book
CREATE TABLE public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  term TEXT,
  score NUMERIC(5,2),
  grade_letter TEXT,
  remarks TEXT,
  recorded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own grades" ON public.grades FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can manage grades" ON public.grades FOR ALL USING (auth.uid() = recorded_by);

-- Storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');
CREATE POLICY "Anyone can view uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Users can update own uploads" ON storage.objects FOR UPDATE USING (bucket_id = 'uploads' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can delete own uploads" ON storage.objects FOR DELETE USING (bucket_id = 'uploads' AND (storage.foldername(name))[1] = auth.uid()::text);
