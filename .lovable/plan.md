

# Plan: Add ECZ Study Materials to Courses

## What We're Building

Enhance each course with downloadable ECZ past papers and study notes from zedpastpapers.com. Each course will get a new "Study Materials" tab alongside the lesson list, containing direct Google Drive download links for past papers (2009-2024) and study notes.

## Approach

### 1. Update the seed edge function with materials data

**Edit `supabase/functions/seed-ecz-courses/index.ts`:**

Add a `materials` array to each course in `ECZ_COURSES`, containing objects with `{ title, url, type }` where type is `'past_paper'` or `'notes'`. Data sourced directly from zedpastpapers.com:

- **Mathematics**: ~40 past papers (2003-2024, P1/P2, regular & GCE) + 10 study notes/pamphlets
- **Biology**: ~50 past papers (2001-2024, P1/P2/P3/P6) + 15 study notes
- **Physics**: ~30 past papers (2005-2019, P1/P2/P3) + 13 notes/pamphlets
- **Chemistry**: ~25 past papers (2009-2020, P1/P2/P3) + 9 notes
- **English**: ~30 past papers (2004-2024, P1/P2) + 9 grammar/writing guides
- **Civic Education**: ~25 past papers (2009-2024) + 4 revision pamphlets
- **Geography**: ~30 past papers (2009-2024, P1/P2) + 6 notes
- **Science (Grade 9)**: ~40 past papers (2009-2024, P1/P2/P3) + 6 notes
- **Maths Grade 9**: Use same materials tagged for Grade 9

### 2. Create a `course_materials` database table

**New migration:**
```sql
CREATE TABLE public.course_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  type text NOT NULL DEFAULT 'past_paper',
  year text,
  paper text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Materials viewable with course"
  ON public.course_materials FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM courses WHERE courses.id = course_materials.course_id
    AND (courses.is_published = true OR courses.created_by = auth.uid())
  ));
```

### 3. Update edge function to insert materials

Modify the seed function to also insert into `course_materials` table after creating each course, using the materials array defined in step 1.

### 4. Update CourseDetailPage with a Materials tab

**Edit `src/pages/CourseDetailPage.tsx`:**

- Add a tab system in the sidebar: "Lessons" | "Materials"
- Materials tab shows two sections: "Study Notes" and "Past Papers"
- Past papers grouped by year (newest first) with download icons
- Each item links to the Google Drive download URL
- Show material counts in the tab badge
- Filter/search within materials

### 5. Update CourseCatalogPage to show material counts

Add material count to course cards alongside lesson count (e.g., "8 lessons • 35 papers").

## Technical Details

- All download URLs are Google Drive direct download links (`drive.google.com/uc?export=download`)
- Materials open in new tabs — no file hosting needed
- The `type` field distinguishes notes vs past papers for UI grouping
- `year` and `paper` fields parsed from titles for sorting/filtering
- RLS reuses the same pattern as lessons (viewable if course is published or user is creator)

## Files Changed
1. **New migration** — `course_materials` table + RLS
2. **`supabase/functions/seed-ecz-courses/index.ts`** — Add 300+ materials entries across all subjects
3. **`src/pages/CourseDetailPage.tsx`** — Add Materials tab with download links
4. **`src/pages/CourseCatalogPage.tsx`** — Show material count on cards

