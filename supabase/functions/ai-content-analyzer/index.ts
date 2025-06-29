
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

    const { content, analysisType, subject } = await req.json();
    const openaiApiKey = Deno.env.get('PENAI_API_KEY');

    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let prompt = '';
    
    switch (analysisType) {
      case 'summarize':
        prompt = `Summarize this educational content for ${subject} students:\n\n${content}`;
        break;
      case 'keypoints':
        prompt = `Extract key learning points from this ${subject} content:\n\n${content}`;
        break;
      case 'questions':
        prompt = `Generate study questions based on this ${subject} content:\n\n${content}`;
        break;
      case 'explain':
        prompt = `Explain this ${subject} content in simple terms for students:\n\n${content}`;
        break;
      default:
        prompt = `Analyze this educational content:\n\n${content}`;
    }

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
            content: 'You are an expert educational assistant helping Zambian students understand academic content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      }),
    });

    const openaiData = await openaiResponse.json();
    const analysis = openaiData.choices[0]?.message?.content || 'Analysis not available';

    // Store analysis in learning analytics
    await supabaseClient
      .from('learning_analytics')
      .insert([{
        user_id: user.id,
        activity_type: `content_analysis_${analysisType}`,
        content_id: `analysis_${Date.now()}`,
        metadata: {
          subject,
          analysisType,
          contentLength: content.length
        }
      }]);

    return new Response(JSON.stringify({ 
      analysis,
      analysisType,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-content-analyzer function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
