import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('AI not configured');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { subjects, grade_level } = await req.json();

    // Get user's profile
    const { data: myProfile } = await supabaseClient
      .from('profiles')
      .select('full_name, grade, school, role')
      .eq('id', user.id)
      .single();

    // Get user's quiz performance for matching
    const { data: myQuizzes } = await supabaseClient
      .from('quiz_attempts')
      .select('subject, correct_answers, total_questions')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Find potential matches - students in same grade or similar subjects
    const { data: candidates } = await supabaseClient
      .from('profiles')
      .select('id, full_name, grade, school, avatar_url')
      .eq('role', 'student')
      .neq('id', user.id)
      .limit(50);

    if (!candidates || candidates.length === 0) {
      return new Response(JSON.stringify({ matches: [], message: 'No peers found yet. Invite classmates!' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get quiz data for candidates
    const candidateIds = candidates.map(c => c.id);
    const { data: candidateQuizzes } = await supabaseClient
      .from('quiz_attempts')
      .select('user_id, subject, correct_answers, total_questions')
      .in('user_id', candidateIds)
      .order('created_at', { ascending: false })
      .limit(200);

    // Use AI to score and rank matches
    const prompt = `You are a peer matching AI for Zambian students. Analyze these profiles and return the best study buddy matches.

REQUESTING STUDENT:
- Name: ${myProfile?.full_name || 'Unknown'}
- Grade: ${myProfile?.grade || grade_level || 'Unknown'}
- School: ${myProfile?.school || 'Unknown'}
- Subjects seeking help: ${JSON.stringify(subjects || [])}
- Quiz performance: ${JSON.stringify(myQuizzes?.slice(0, 5) || [])}

CANDIDATE PEERS (${candidates.length}):
${candidates.slice(0, 20).map(c => {
  const quizzes = (candidateQuizzes || []).filter(q => q.user_id === c.id);
  const subjectScores = quizzes.reduce((acc: Record<string, number[]>, q) => {
    if (!acc[q.subject]) acc[q.subject] = [];
    acc[q.subject].push(q.total_questions > 0 ? (q.correct_answers / q.total_questions) * 100 : 0);
    return acc;
  }, {});
  return `- ID: ${c.id}, Name: ${c.full_name || 'Student'}, Grade: ${c.grade || '?'}, School: ${c.school || '?'}, Subjects: ${JSON.stringify(subjectScores)}`;
}).join('\n')}

Return a JSON array of the top 5 matches:
[{"user_id": "uuid", "score": 85, "reason": "Strong in Math, same grade", "complementary_subjects": ["Mathematics"]}]

Return ONLY valid JSON array.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a peer matching engine. Return only valid JSON arrays.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) throw new Error(`AI error: ${response.status}`);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';

    let matches;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      matches = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      matches = [];
    }

    // Enrich matches with profile data
    const enrichedMatches = matches.map((m: any) => {
      const profile = candidates.find(c => c.id === m.user_id);
      return {
        ...m,
        full_name: profile?.full_name || 'Student',
        grade: profile?.grade,
        school: profile?.school,
        avatar_url: profile?.avatar_url,
      };
    }).filter((m: any) => m.full_name);

    return new Response(JSON.stringify({ matches: enrichedMatches, success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Peer matcher error:', error);
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
})
