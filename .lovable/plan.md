

# Plan: Fill Missing Gaps Across All Roles

## Gap Analysis Summary

| Role | Dashboard | DB-Connected | Dedicated Pages | Sidebar Items | Status |
|------|-----------|-------------|-----------------|---------------|--------|
| Student | Live data | Yes | 30+ pages | 25+ items | Done |
| Teacher | Live data | Yes | Analytics, grading | 14 items | Done |
| Guardian | Live data | Yes | 8 parent pages | 12 items | Done |
| Doctor | Live data | Yes | 5 medical pages | 12 items | Done |
| Entrepreneur | Live data | Yes | 5 pages | 12 items | Done |
| **Developer** | **Hardcoded** | **No** | **0 pages** | **4 items** | **Shell** |
| **Institution** | **Hardcoded** | **No** | **4 admin pages exist** | **6 items** | **Partial** |
| **Ministry** | **Hardcoded** | **No** | **0 pages** | **5 items** | **Shell** |

Also missing: the **Entrepreneur Expansion** (financials, funding, learning pages) was approved but never built.

---

## Priority: Developer Role (biggest gap)

### Database: `developer_projects` table
```sql
CREATE TABLE public.developer_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  language text,
  description text,
  repo_url text,
  progress integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
-- RLS: users manage own projects
```

### New Pages
1. **`/developer/projects`** — CRUD for developer projects with language tags and progress bars
2. **`/developer/challenges`** — AI-powered coding challenges. Edge function `coding-challenge-generator` generates problems by difficulty and evaluates solutions using Lovable AI
3. **`/developer/code-review`** — Paste code, AI reviews it for bugs, style, performance. Edge function `ai-code-review`

### Dashboard Update
- Replace hardcoded `DeveloperDashboardView` with live data from `developer_projects` and `focus_sessions`

### Sidebar Expansion
Add: Projects, Code Challenges (AI badge), Code Review (AI badge), Focus Mode, Study Groups, Messenger

---

## Priority: Institution Dashboard — Wire to Real Data

The institution dashboard and its 4 admin pages (`/admin/users`, `/admin/curriculum`, `/admin/scheduling`, `/admin/analytics`) exist but show hardcoded data.

### Changes
- Update `InstitutionDashboardView` to query real `courses`, `enrollments`, `profiles` (teachers/students counts), `grades` (avg scores)
- Update sidebar to include links to existing admin pages plus Notifications

No new tables needed — existing schema covers it.

---

## Priority: Entrepreneur Expansion (previously approved, never built)

### Database: `venture_financials` table
```sql
CREATE TABLE public.venture_financials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid REFERENCES public.ventures(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  type text NOT NULL DEFAULT 'expense',
  category text,
  amount numeric NOT NULL DEFAULT 0,
  description text,
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- RLS: users manage own financials
```

### New Pages
1. **`/entrepreneur/financials`** — Revenue/expense tracker with recharts line & pie charts
2. **`/entrepreneur/funding`** — AI funding discovery (Zambian grants, incubators). Edge function `funding-opportunities`

### Dashboard Enhancement
- Add financial summary card with mini chart to `EntrepreneurDashboardView`

### Sidebar
- Add Financials and Funding items

---

## Ministry Dashboard — Wire to Real Data

Update `MinistryDashboard` to query aggregate stats from `profiles`, `courses`, `enrollments`, `grades` across all users (using a security definer function for cross-user aggregation).

### Database Function
```sql
CREATE OR REPLACE FUNCTION public.get_platform_stats()
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public AS $$
  SELECT jsonb_build_object(
    'total_students', (SELECT count(*) FROM profiles WHERE role = 'student'),
    'total_teachers', (SELECT count(*) FROM profiles WHERE role = 'teacher'),
    'total_courses', (SELECT count(*) FROM courses),
    'total_schools', (SELECT count(DISTINCT school) FROM profiles WHERE school IS NOT NULL)
  )
$$;
```

---

## Files to Create
- `src/pages/DeveloperProjectsPage.tsx`
- `src/pages/DeveloperChallengesPage.tsx`
- `src/pages/DeveloperCodeReviewPage.tsx`
- `src/hooks/useDeveloperProjects.tsx`
- `src/pages/EntrepreneurFinancialsPage.tsx`
- `src/pages/EntrepreneurFundingPage.tsx`
- `src/hooks/useVentureFinancials.tsx`
- `supabase/functions/coding-challenge-generator/index.ts`
- `supabase/functions/ai-code-review/index.ts`
- `supabase/functions/funding-opportunities/index.ts`

## Files to Modify
- `src/components/Dashboard/DeveloperDashboardView.tsx` — live data
- `src/components/Dashboard/InstitutionDashboardView.tsx` — live data
- `src/components/Dashboard/EntrepreneurDashboardView.tsx` — add financials card
- `src/pages/MinistryDashboard.tsx` — live aggregate data
- `src/components/Sidebar/sidebarConfig.ts` — expand developer, institution, ministry, entrepreneur nav
- `src/App.tsx` — add 5 new routes

## Database Changes
- Create `developer_projects` table with RLS
- Create `venture_financials` table with RLS
- Create `get_platform_stats()` security definer function

## No File Deletions

## Result
All 8 roles will have data-driven dashboards with dedicated feature pages. The developer gets a project tracker and AI coding tools. The institution and ministry dashboards show real platform data. Entrepreneurs gain financial tracking and funding discovery.

