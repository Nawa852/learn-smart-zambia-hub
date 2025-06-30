
-- Add proper foreign key constraint for forums table
ALTER TABLE public.forums 
ADD CONSTRAINT forums_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Enable RLS on forums table
ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;

-- Create policies for forums - allow everyone to read forums, but only authenticated users can create
CREATE POLICY "Anyone can view forums" ON public.forums
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create forums" ON public.forums
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own forums" ON public.forums
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own forums" ON public.forums
  FOR DELETE USING (auth.uid() = created_by);

-- Also add policies for forum_posts
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum posts" ON public.forum_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON public.forum_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.forum_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON public.forum_posts
  FOR DELETE USING (auth.uid() = user_id);
