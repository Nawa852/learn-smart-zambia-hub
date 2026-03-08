

# Plan: Medical Student Feature Suite

## Current State

The medical student role (`doctor`) exists but is mostly a shell:
- **Dashboard** (`MedicalDashboardView.tsx`): Shows hardcoded stats, rotations, case log, and study tool links — none connected to real data.
- **MedicalAIHub** (`MedicalAIHub.tsx`): Static cards with non-functional "Launch" buttons.
- **Sidebar**: Only 4 items (Dashboard, Course Catalog, AI Assistant, Resources) — very sparse compared to the student role's 50+ items.
- **No dedicated medical pages**: Dashboard links to generic pages (`/ai-chat`, `/ai-learning-lab`) not tailored for clinical use.

## What to Build

### 1. Database: Clinical Case Log & Rotations

New tables to make the dashboard data-driven:

- **`clinical_cases`** — user_id, condition, patient_summary, presenting_complaint, diagnosis, outcome (resolved/ongoing/referred), body_system (infectious/cardiac/respiratory/etc), notes, created_at
- **`clinical_rotations`** — user_id, rotation_name, supervisor_name, start_date, end_date, status (active/upcoming/completed), notes

RLS: Users manage own records. Standard authenticated policies.

### 2. AI Case Simulator Page (`/medical/case-simulator`)

A dedicated page where the medical student:
- Selects a body system or random case
- AI generates a patient scenario (demographics, chief complaint, vitals, history)
- Student works through differential diagnosis step-by-step
- AI evaluates the diagnosis and provides feedback with accuracy score
- Results saved to `clinical_cases` table

Uses Lovable AI (Gemini 2.5 Pro) via an edge function `medical-case-simulator`.

### 3. Drug Reference Page (`/medical/drug-reference`)

- Search interface for drug names
- AI returns: class, mechanism, indications, contraindications, side effects, interactions
- Zambian formulary context (common drugs available locally)
- Uses Lovable AI via edge function `medical-drug-reference`

### 4. Clinical Notes Generator Page (`/medical/clinical-notes`)

- SOAP note template (Subjective, Objective, Assessment, Plan)
- Student enters key findings, AI expands into proper clinical documentation
- Save/export notes as text
- Uses Lovable AI edge function `medical-notes-generator`

### 5. Case Log Manager Page (`/medical/case-log`)

- CRUD interface for `clinical_cases` table
- Filter by body system, outcome, date
- Stats: total cases by system, resolution rate
- Links from dashboard "Log Case" button

### 6. Rotation Tracker Page (`/medical/rotations`)

- CRUD for `clinical_rotations` table
- Visual timeline of rotations
- Progress tracking per rotation
- Links from dashboard "Clinical Rotations" section

### 7. Enhanced Dashboard — Live Data

Update `MedicalDashboardView.tsx` to:
- Fetch real stats from `clinical_cases` (count), `clinical_rotations` (active), `focus_sessions` (hours)
- Show actual recent cases from DB instead of hardcoded data
- Show actual rotations from DB
- Wire "Log Case" and "Start Simulation" buttons to real routes

### 8. Expanded Sidebar

Add medical-specific navigation items under the `doctor` role:
- **Clinical**: Case Simulator, Case Log, Rotations, Clinical Notes
- **Study**: Drug Reference, Focus Mode, Study Planner
- **Community**: Messenger, Study Groups

## Database Changes

```sql
CREATE TABLE public.clinical_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  condition text NOT NULL,
  patient_summary text,
  presenting_complaint text,
  diagnosis text,
  outcome text DEFAULT 'ongoing',
  body_system text,
  accuracy_score integer,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clinical_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own cases" ON public.clinical_cases
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.clinical_rotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  rotation_name text NOT NULL,
  supervisor_name text,
  start_date date,
  end_date date,
  status text DEFAULT 'upcoming',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clinical_rotations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own rotations" ON public.clinical_rotations
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

## Files to Create

- `src/pages/MedicalCaseSimulatorPage.tsx` — AI case practice
- `src/pages/MedicalDrugReferencePage.tsx` — AI drug lookup
- `src/pages/MedicalClinicalNotesPage.tsx` — SOAP note generator
- `src/pages/MedicalCaseLogPage.tsx` — case CRUD
- `src/pages/MedicalRotationsPage.tsx` — rotation CRUD
- `src/hooks/useClinicalCases.tsx` — DB hook for cases
- `src/hooks/useClinicalRotations.tsx` — DB hook for rotations
- `supabase/functions/medical-case-simulator/index.ts` — AI edge function
- `supabase/functions/medical-drug-reference/index.ts` — AI edge function
- `supabase/functions/medical-notes-generator/index.ts` — AI edge function

## Files to Modify

- `src/components/Dashboard/MedicalDashboardView.tsx` — replace hardcoded data with DB queries
- `src/components/Sidebar/sidebarConfig.ts` — expand `doctorNavigation`
- `src/App.tsx` — add 5 new routes

## No File Deletions

## Result

Medical students get a fully functional clinical learning environment: AI-powered case simulations with scored feedback, a drug reference, clinical note generation, and persistent case/rotation tracking — all reflected live on a data-driven dashboard.

