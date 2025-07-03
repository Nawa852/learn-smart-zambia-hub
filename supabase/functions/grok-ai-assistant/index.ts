import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, feature, context } = await req.json();
    const grokApiKey = Deno.env.get('GROCK_API_KEY');

    if (!grokApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Grok API key not configured',
          success: false 
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are Grok, an AI assistant for EduZambia platform helping Zambian students excel in their studies. 
    Provide responses that are:
    - Educational and aligned with ECZ (Educational Curriculum of Zambia) standards
    - Clear and step-by-step for complex topics
    - Encouraging and supportive
    - Culturally relevant to Zambian students
    
    Feature context: ${feature || 'general assistance'}
    Additional context: ${context || 'none'}`;

    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${grokApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 1500
      }),
    });

    if (!grokResponse.ok) {
      throw new Error(`Grok API error: ${grokResponse.status}`);
    }

    const grokData = await grokResponse.json();
    const response = grokData.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.';

    return new Response(JSON.stringify({ 
      response: response,
      model: 'Grok',
      feature: feature,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in grok-ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});