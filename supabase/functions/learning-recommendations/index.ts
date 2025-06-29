
import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user's learning history
    const { data: analytics } = await supabaseClient
      .from('learning_analytics')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    const { data: goals } = await supabaseClient
      .from('study_goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_completed', false);

    const openaiApiKey = Deno.env.get('PENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const analyticsContext = analytics?.map(a => ({
      activity: a.activity_type,
      performance: a.performance_score,
      subject: a.metadata?.subject
    })) || [];

    const goalsContext = goals?.map(g => ({
      title: g.title,
      progress: g.progress_percentage
    })) || [];

    const prompt = `Based on this Zambian student's learning data:
    
    Recent Activities: ${JSON.stringify(analyticsContext.slice(0, 10))}
    Active Goals: ${JSON.stringify(goalsContext)}
    
    Provide personalized learning recommendations as JSON:
    {
      "recommendations": [
        {
          "type": "subject_focus",
          "title": "Recommendation Title",
          "description": "Why this helps",
          "action": "What to do",
          "priority": "high/medium/low"
        }
      ],
      "insights": {
        "strengths": ["subject1", "subject2"],
        "improvement_areas": ["area1", "area2"],
        "study_patterns": "Pattern analysis"
      }
    }`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI tutor for Zambian students. Provide helpful, culturally relevant learning recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      }),
    });

    const openaiData = await openaiResponse.json();
    let recommendations;
    
    try {
      recommendations = JSON.parse(openaiData.choices[0].message.content);
    } catch (parseError) {
      recommendations = {
        recommendations: [
          {
            type: "general",
            title: "Continue Learning",
            description: "Keep up with your studies",
            action: "Review recent topics",
            priority: "medium"
          }
        ],
        insights: {
          strengths: ["consistent learning"],
          improvement_areas: ["goal setting"],
          study_patterns: "Regular study sessions"
        }
      };
    }

    return new Response(JSON.stringify({ 
      ...recommendations,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in learning-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
