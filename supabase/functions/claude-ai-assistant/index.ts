import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { query, feature, context } = await req.json();
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');

    if (!claudeApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Claude API key not configured',
          success: false 
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are Claude, an AI assistant for EduZambia focused on detailed analysis and comprehensive explanations. 
    Provide responses that are:
    - Thorough and well-structured
    - Include critical thinking elements
    - Aligned with ECZ educational standards
    - Provide multiple perspectives where appropriate
    - Include historical or cultural context when relevant to Zambian education
    
    Feature context: ${feature || 'general assistance'}
    Additional context: ${context || 'none'}`;

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${claudeApiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\nStudent question: ${query}` }
        ]
      }),
    });

    if (!claudeResponse.ok) {
      throw new Error(`Claude API error: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    const response = claudeData.content[0]?.text || 'I apologize, but I could not generate a response at this time.';

    return new Response(JSON.stringify({ 
      response: response,
      model: 'Claude',
      feature: feature,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in claude-ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});