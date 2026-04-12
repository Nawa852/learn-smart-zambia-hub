import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { content, outputType, subject, grade } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const outputInstructions: Record<string, string> = {
      notes: `Create comprehensive, well-structured study notes with:
- Clear headings and subheadings
- Key definitions highlighted in bold
- Important formulas or concepts in separate blocks
- Summary points at the end of each section
- Exam tips where relevant`,
      flashcards: `Generate 15-20 flashcards in this exact format for each card:
**Q:** [Question]
**A:** [Answer]

Make questions test key concepts, definitions, and applications.`,
      summary: `Create a concise executive summary covering:
- Main topics and themes
- Key takeaways (numbered list)
- Important terms and definitions
- Connections between concepts
- Suggested areas for deeper study`,
      quiz: `Generate a 15-question quiz with:
- Mix of multiple choice (10) and short answer (5)
- Answers provided at the end
- Difficulty progression from easy to hard
- Mark allocation for each question`,
      mindmap: `Create a text-based mind map outline showing:
- Central topic
- Main branches (3-5)
- Sub-branches for each (2-4 per branch)
- Key details on each sub-branch
Use indentation and bullet points to show hierarchy.`,
    };

    const systemPrompt = `You are an expert Zambian education content specialist. You analyze documents and educational materials to create high-quality study resources aligned with the ECZ curriculum. Always produce clear, well-formatted markdown output.`;

    const userPrompt = `Analyze the following content${subject ? ` (Subject: ${subject})` : ''}${grade ? ` (Grade: ${grade})` : ''} and ${outputInstructions[outputType] || outputInstructions.notes}

--- CONTENT START ---
${content.substring(0, 12000)}
--- CONTENT END ---`;

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
    console.error("ai-document-analyzer error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
