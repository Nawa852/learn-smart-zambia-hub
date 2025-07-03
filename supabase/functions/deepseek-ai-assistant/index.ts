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
    const deepseekApiKey = Deno.env.get('EEPSEEK_API_KEY');

    if (!deepseekApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'DeepSeek API key not configured',
          success: false 
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are DeepSeek, an advanced AI assistant specialized in mathematics, science, and technical subjects for EduZambia platform. 
    Provide detailed, step-by-step solutions that are:
    - Mathematically accurate and precise
    - Aligned with ECZ curriculum standards
    - Include worked examples where appropriate
    - Break down complex problems into manageable steps
    - Provide practice suggestions
    
    Feature context: ${feature || 'general assistance'}
    Additional context: ${context || 'none'}`;

    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.3,
        max_tokens: 2000
      }),
    });

    if (!deepseekResponse.ok) {
      throw new Error(`DeepSeek API error: ${deepseekResponse.status}`);
    }

    const deepseekData = await deepseekResponse.json();
    const response = deepseekData.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.';

    return new Response(JSON.stringify({ 
      response: response,
      model: 'DeepSeek',
      feature: feature,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in deepseek-ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});