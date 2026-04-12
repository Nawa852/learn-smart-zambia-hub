import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('AI service not configured');

    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { question, subject, grade_level } = await req.json();

    if (!question || question.trim().length < 5) {
      return new Response(JSON.stringify({ error: 'Please provide a valid question' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const prompt = `You are an expert Zambian ${subject || 'general'} tutor for Grade ${grade_level || '12'} students.

Solve this problem step-by-step:
"${question}"

Provide a JSON response:
{
  "solution": {
    "steps": [
      {
        "step_number": 1,
        "title": "Step title",
        "explanation": "Clear explanation",
        "math_expression": "Any formula or calculation (optional)",
        "tip": "Helpful tip for this step (optional)"
      }
    ],
    "final_answer": "The final answer clearly stated",
    "concept": "The underlying concept being tested",
    "difficulty": "easy|medium|hard",
    "subject_area": "Specific topic area"
  },
  "similar_questions": [
    "A similar practice question 1",
    "A similar practice question 2"
  ],
  "common_mistakes": ["Mistake students often make"],
  "ecz_relevance": "How this relates to ECZ exams"
}

Return ONLY valid JSON. Be thorough but clear. Use simple language.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a patient, expert tutor. Explain step by step. Contextualize for Zambian students. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) throw new Error(`AI error: ${response.status}`);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    let result;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      result = null;
    }

    if (!result) {
      result = {
        solution: {
          steps: [{ step_number: 1, title: 'Analysis', explanation: 'Could not parse the solution. Please rephrase your question.' }],
          final_answer: 'Please try again with a clearer question.',
          concept: 'N/A',
          difficulty: 'medium',
          subject_area: subject || 'General',
        },
        similar_questions: [],
        common_mistakes: [],
        ecz_relevance: '',
      };
    }

    return new Response(JSON.stringify({ ...result, success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
