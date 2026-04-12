import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { subjects, examDate, weakAreas, availableHours, grade, preferences } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are an expert AI study planner for Zambian students preparing for ECZ exams. Create detailed, realistic, and motivating study plans that maximize learning efficiency.

Your plans should:
- Prioritize weak areas while maintaining strong subjects
- Include specific study techniques (active recall, spaced repetition, practice papers)
- Build in breaks using the Pomodoro technique
- Include revision and self-testing sessions
- Be realistic and not overloaded
- Use encouraging, motivational language`;

    const userPrompt = `Create a personalized weekly study plan:

**Student Details:**
- Grade: ${grade || 'Grade 12'}
- Subjects: ${subjects?.join(', ') || 'Mathematics, Science, English'}
- Exam Date: ${examDate || 'In 3 months'}
- Weak Areas: ${weakAreas?.join(', ') || 'Not specified'}
- Available Study Hours Per Day: ${availableHours || 4}
${preferences ? `- Preferences: ${preferences}` : ''}

Generate a **7-day study timetable** in a clean markdown table format with:
1. Time slots for each day (Morning, Afternoon, Evening)
2. Specific topics to cover in each slot
3. Study technique recommendations for each session
4. Daily goals and checkpoints
5. Weekend review/practice paper sessions

Also include:
- **Weekly Goals** (5 specific, measurable goals)
- **Study Tips** tailored to the student's weak areas
- **Motivation Quote** to start the week`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limited." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "Credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI error: ${status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-smart-planner error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
