

# Plan: Developer IDE Page

Build a web-based IDE experience at `/developer/ide` that combines a code editor, AI code review, file tabs, and a terminal-style output panel into a single unified workspace.

## What It Does

A resizable multi-panel IDE layout:
- **Left panel**: File/tab bar with multiple open files (in-memory, not persisted to DB)
- **Center panel**: Code editor (monospace textarea with syntax-highlighted-like styling, line numbers)
- **Right/bottom panel**: AI assistant output (code review, explanations, suggestions)
- **Bottom panel**: Console/output area for running code evaluation via the existing `coding-challenge-generator` edge function

Users can write code, get AI reviews (using existing `ai-code-review` edge function), run evaluations, and manage multiple files in tabs — all without leaving the page.

## Technical Approach

### New File: `src/pages/DeveloperIDEPage.tsx`
- Uses `react-resizable-panels` (already installed) for a 3-panel layout:
  - Left sidebar (file explorer/tabs, ~20%)
  - Center editor (~55%)
  - Right AI panel (~25%)
  - Bottom console (collapsible)
- File tabs stored in React state: `{ name, language, content }[]`
- Code editor: styled `<textarea>` with monospace font, line numbers rendered alongside
- Language selector per file tab
- "Run" button invokes `coding-challenge-generator` with `action: 'evaluate'`
- "Review" button invokes `ai-code-review`
- AI panel shows streaming or static results
- Dark theme by default for IDE feel (with `bg-gray-900 text-green-400` styling)

### New Edge Function: None needed
Reuses existing `ai-code-review` and `coding-challenge-generator` functions.

### Files to Create
- `src/pages/DeveloperIDEPage.tsx` — the full IDE page

### Files to Modify
- `src/App.tsx` — add `/developer/ide` route
- `src/components/Sidebar/sidebarConfig.ts` — add "IDE" nav item under Developer > Projects with a badge
- `src/components/Dashboard/DeveloperDashboardView.tsx` — add IDE to the toolkit cards

### Database Changes
None required.

## Layout

```text
┌──────────┬────────────────────────┬──────────────┐
│ FILES    │  editor.tsx             │  AI REVIEW   │
│          │                        │              │
│ > main.ts│  1 | function greet(){ │  Analyzing.. │
│   utils  │  2 |   return "hi"     │              │
│   app.py │  3 | }                 │  ✅ No bugs  │
│          │                        │  ⚡ Perf OK  │
│ [+ New]  │                        │              │
├──────────┴────────────────────────┴──────────────┤
│ CONSOLE OUTPUT                                    │
│ > Evaluation: Score 85/100...                     │
└───────────────────────────────────────────────────┘
```

## Result
Developers get a unified IDE workspace with multi-file tabs, AI code review, and code evaluation — all using existing backend functions, no new infrastructure needed.

