
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { query, feature, context } = await req.json();

    // Get API keys with fallbacks
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    const grokApiKey = Deno.env.get('GROCK_API_KEY');
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');

    if (!openaiApiKey && !grokApiKey && !claudeApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'No AI API keys configured. Please configure at least one AI service.',
          success: false 
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let response = '';
    let usedModel = '';

    // System prompt for comprehensive AI assistant
    const systemPrompt = `You are a comprehensive AI assistant for EduZambia, helping students with educational queries. 
    Provide clear, helpful responses that are:
    - Appropriate for Zambian students
    - Aligned with educational standards
    - Step-by-step for complex topics
    - Encouraging and supportive
    
    Feature context: ${feature || 'general assistance'}
    Additional context: ${context || 'none'}`;

    try {
      // Try OpenAI first
      if (openaiApiKey && !response) {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: query }
            ],
            temperature: 0.7,
            max_tokens: 1000
          }),
        });

        if (openaiResponse.ok) {
          const openaiData = await openaiResponse.json();
          response = openaiData.choices[0]?.message?.content || '';
          usedModel = 'GPT-4o-mini';
        }
      }

      // Try Grok as fallback
      if (grokApiKey && !response) {
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
            max_tokens: 1000
          }),
        });

        if (grokResponse.ok) {
          const grokData = await grokResponse.json();
          response = grokData.choices[0]?.message?.content || '';
          usedModel = 'Grok';
        }
      }

      // Try Claude as final fallback
      if (claudeApiKey && !response) {
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${claudeApiKey}`,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1000,
            messages: [
              { role: 'user', content: `${systemPrompt}\n\nStudent question: ${query}` }
            ]
          }),
        });

        if (claudeResponse.ok) {
          const claudeData = await claudeResponse.json();
          response = claudeData.content[0]?.text || '';
          usedModel = 'Claude';
        }
      }

      if (!response) {
        response = "I'm experiencing technical difficulties right now. Please try again in a moment, or contact support if the problem persists.";
        usedModel = 'Fallback';
      }

      // Log the interaction
      await supabaseClient
        .from('ai_chat_history')
        .insert([{
          user_id: user.id,
          message: query,
          response: response,
          chat_type: feature || 'comprehensive_ai'
        }]);

      return new Response(JSON.stringify({ 
        response: response,
        model: usedModel,
        feature: feature,
        success: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (apiError) {
      console.error('AI API error:', apiError);
      
      const fallbackResponse = `I apologize, but I'm experiencing technical difficulties right now. 
      
Here are some general study tips while I get back online:
- Break complex problems into smaller steps
- Practice regularly rather than cramming
- Ask specific questions about what you don't understand
- Use multiple resources to reinforce learning

Please try asking your question again in a few minutes.`;

      return new Response(JSON.stringify({ 
        response: fallbackResponse,
        model: 'Fallback',
        success: false,
        error: 'AI service temporarily unavailable'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in comprehensive-ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
