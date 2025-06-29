
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { question, context, subject } = await req.json();
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from JWT
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    // Use Claude API for AI response
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured');
    }

    const prompt = `You are an AI study assistant specializing in ${subject || 'general education'}. 
    A student has asked: "${question}"
    ${context ? `Additional context: ${context}` : ''}
    
    Please provide a helpful, educational response that:
    1. Directly answers their question
    2. Explains concepts clearly
    3. Provides examples when relevant
    4. Suggests follow-up study topics
    5. Keeps the language appropriate for a student level
    
    Response:`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const assistantReply = aiResponse.content[0].text;

    // Log the interaction
    await supabaseClient
      .from('study_assistant_logs')
      .insert([{
        user_id: user.id,
        query: question,
        response: { 
          answer: assistantReply,
          subject: subject,
          context: context 
        },
        language: 'English'
      }]);

    return new Response(
      JSON.stringify({ 
        answer: assistantReply,
        subject: subject 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in AI study assistant:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
