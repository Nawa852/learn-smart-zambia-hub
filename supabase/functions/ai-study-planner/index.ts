import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    const { exam_date, subjects, daily_hours, priority_subjects } = await req.json();

    const [quizzes, goals, profile, schedules] = await Promise.all([
      supabaseClient.from('quiz_attempts').select('subject, correct_answers, total_questions').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
      supabaseClient.from('study_goals').select('title, current, target, goal_type, completed').eq('user_id', user.id).eq('completed', false).limit(10),
      supabaseClient.from('profiles').select('grade, role').eq('id', user.id).single(),
      supabaseClient.from('study_schedules').select('subject, days, start_time, end_time, is_active').eq('user_id', user.id).eq('is_active', true).limit(10),
    ]);

    const weakSubjects = (quizzes.data || []).reduce((acc: Record<string, { total: number; correct: number }>, q) => {
      if (!acc[q.subject]) acc[q.subject] = { total: 0, correct: 0 };
      acc[q.subject].total += q.total_questions;
      acc[q.subject].correct += q.correct_answers;
      return acc;
    }, {});

    const prompt = `Create a personalized weekly study plan for a Zambian Grade ${profile.data?.grade || '12'} student.

STUDENT DATA:
- Available hours per day: ${daily_hours || 3}
- Subjects: ${(subjects || ['Mathematics', 'English', 'Science']).join(', ')}
- Priority subjects: ${(priority_subjects || []).join(', ') || 'None specified'}
- Exam date: ${exam_date || 'Not specified'}
- Current goals: ${JSON.stringify((goals.data || []).slice(0, 5))}
- Subject performance: ${JSON.stringify(Object.entries(weakSubjects).map(([s, d]) => ({ subject: s, score: Math.round((d.correct / d.total) * 100) })))}
- Existing schedule: ${JSON.stringify(schedules.data || [])}

Generate a JSON study plan:
{
  "weekly_plan": [
    {
      "day": "Monday",
      "sessions": [
        {
          "time": "06:00 - 07:30",
          "subject": "Mathematics",
          "topic": "Specific topic to study",
          "activity": "Practice problems / Review notes / Past papers",
          "duration_minutes": 90,
          "priority": "high"
        }
      ]
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3"],
  "focus_areas": [
    { "subject": "Math", "reason": "Low quiz scores", "recommended_hours": 5 }
  ],
  "exam_countdown_strategy": "Strategy text if exam date provided"
}

Return ONLY valid JSON. Allocate more time to weak subjects. Include breaks.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert Zambian academic planner. Create realistic, actionable study schedules aligned with the ECZ curriculum. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) throw new Error(`AI error: ${response.status}`);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    let plan;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      plan = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      plan = null;
    }

    if (!plan) {
      plan = {
        weekly_plan: [],
        tips: ['Start with your hardest subject when energy is highest', 'Take 10-minute breaks every 45 minutes', 'Review notes before bed for better retention'],
        focus_areas: [],
        exam_countdown_strategy: 'Focus on past papers and weak areas.',
      };
    }

    return new Response(JSON.stringify({ ...plan, success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
