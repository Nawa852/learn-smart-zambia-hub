

# Plan: Entrepreneur Feature Suite

## Current State
- **Dashboard** (`EntrepreneurDashboardView.tsx`): All hardcoded — stats, ventures, mentors, learning paths. No DB connection.
- **Sidebar**: Only 6 items (Dashboard, Course Catalog, AI Assistant, Community, Profile, Settings). No entrepreneur-specific pages.
- **EntrepreneurHub** (`BrightSphere/EntrepreneurHub.tsx`): Static cards with non-functional buttons.
- **No dedicated tables**: No DB storage for ventures, business plans, or funding opportunities.

## Database Changes

```sql
CREATE TABLE public.ventures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  sector text,
  stage text DEFAULT 'ideation',
  funding_status text DEFAULT 'bootstrapped',
  funding_amount numeric DEFAULT 0,
  progress integer DEFAULT 0,
  team_size integer DEFAULT 1,
  description text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.ventures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own ventures" ON public.ventures
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.business_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid REFERENCES public.ventures(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  title text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  order_index integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.business_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own milestones" ON public.business_milestones
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

## AI Edge Functions (using Lovable AI)

1. **`business-plan-generator`** — Takes venture name, sector, and description. Returns a structured business plan (executive summary, market analysis, revenue model, SWOT, financial projections). Zambian market context.

2. **`pitch-deck-generator`** — Takes venture details. Returns slide-by-slide pitch deck content (problem, solution, market size, business model, traction, team, ask).

3. **`market-research-assistant`** — Takes a sector/industry query. Returns Zambian market insights, competitor landscape, target demographics, and opportunity analysis.

## New Pages

1. **`/entrepreneur/ventures`** — Venture Manager: CRUD for ventures table. Cards showing stage, progress, funding. Link to milestones per venture.

2. **`/entrepreneur/business-plan`** — AI Business Plan Generator: Select a venture or describe a new idea, AI generates a full business plan. Save/export as text.

3. **`/entrepreneur/pitch-deck`** — AI Pitch Deck Creator: Generate investor-ready pitch content from venture data. Slide-by-slide output.

4. **`/entrepreneur/market-research`** — AI Market Research: Search interface for Zambian market data, competitor analysis, trend insights via AI.

5. **`/entrepreneur/milestones`** — Milestone Tracker: Visual checklist per venture with completion tracking.

## Files to Create
- `src/pages/EntrepreneurVenturesPage.tsx` — venture CRUD
- `src/pages/EntrepreneurBusinessPlanPage.tsx` — AI business plan
- `src/pages/EntrepreneurPitchDeckPage.tsx` — AI pitch deck
- `src/pages/EntrepreneurMarketResearchPage.tsx` — AI market research
- `src/pages/EntrepreneurMilestonesPage.tsx` — milestone tracker
- `src/hooks/useVentures.tsx` — DB hook for ventures + milestones
- `supabase/functions/business-plan-generator/index.ts`
- `supabase/functions/pitch-deck-generator/index.ts`
- `supabase/functions/market-research-assistant/index.ts`

## Files to Modify
- `src/components/Dashboard/EntrepreneurDashboardView.tsx` — replace hardcoded data with live DB queries from ventures, milestones, focus_sessions
- `src/components/Sidebar/sidebarConfig.ts` — expand entrepreneur nav: Business (Ventures, Milestones), AI Tools (Business Plan, Pitch Deck, Market Research), Study (Focus Mode, Courses), Community (Messenger, Study Groups)
- `src/App.tsx` — add 5 new routes

## No File Deletions

## Result
Entrepreneurs get a functional suite: persistent venture tracking with milestones, AI-powered business plan and pitch deck generation, market research assistant — all Zambian-context, all reflected on a live data-driven dashboard.

