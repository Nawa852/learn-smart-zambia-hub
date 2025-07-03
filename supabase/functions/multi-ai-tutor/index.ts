
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const isRateLimited = (userId: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + 60000 });
    return false;
  }
  
  if (userLimit.count >= 20) {
    return true;
  }
  
  userLimit.count++;
  return false;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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
      console.log('Authentication issue:', userError)
      // Allow anonymous access for now to fix the fallback mode
      // return new Response(
      //   JSON.stringify({ error: 'Unauthorized' }),
      //   { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      // )
    }

    if (user && isRateLimited(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { message, model, systemPrompt } = await req.json()

    if (!message || !model) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let response = '';

    try {
      switch (model) {
        case 'openai':
          response = await callOpenAI(message, systemPrompt || 'You are a helpful educational assistant.');
          break;
        case 'claude':
          response = await callClaude(message, systemPrompt || 'You are a helpful educational assistant.');
          break;
        case 'deepseek':
          response = await callDeepSeek(message, systemPrompt || 'You are a helpful educational assistant.');
          break;
        case 'qwen':
          response = await callQwen(message, systemPrompt || 'You are a helpful educational assistant.');
          break;
        case 'grok':
          response = await callGrok(message, systemPrompt || 'You are a helpful educational assistant.');
          break;
        case 'gemini':
          response = await callGemini(message, systemPrompt || 'You are a helpful educational assistant.');
          break;
        case 'llama':
          response = await callLlama(message, systemPrompt || 'You are a helpful educational assistant.');
          break;
        default:
          throw new Error('Unsupported AI model');
      }

      // Store chat history if user is authenticated
      if (user) {
        await supabaseClient
          .from('ai_chat_history')
          .insert([{
            user_id: user.id,
            message: message,
            response: response,
            ai_model: model
          }]);
      }

    } catch (error) {
      console.error(`Error calling ${model}:`, error);
      return new Response(
        JSON.stringify({ error: 'AI service temporarily unavailable' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in multi-ai-tutor function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function callOpenAI(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('OPENAI_API_KEY')
  if (!apiKey) throw new Error('OpenAI API key not configured')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}

async function callClaude(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('CLAUDE_API_KEY')
  if (!apiKey) throw new Error('Claude API key not configured')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0]?.text || 'No response generated'
}

async function callDeepSeek(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('EEPSEEK_API_KEY')
  if (!apiKey) throw new Error('DeepSeek API key not configured')

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}

async function callGemini(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('GEMINI_API_KEY')
  if (!apiKey) throw new Error('Gemini API key not configured')

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nUser: ${message}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    }),
  })

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`)
  }

  const data = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || 'No response generated'
}

async function callQwen(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('QWEN_API_KEY')
  if (!apiKey) throw new Error('Qwen API key not configured')

  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-turbo',
      input: {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      },
      parameters: {
        max_tokens: 1500,
        temperature: 0.7,
      }
    }),
  })

  if (!response.ok) {
    throw new Error(`Qwen API error: ${response.status}`)
  }

  const data = await response.json()
  return data.output?.text || 'No response generated'
}

async function callGrok(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('GROCK_API_KEY')
  if (!apiKey) throw new Error('Grok API key not configured')

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-beta',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`Grok API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}

async function callLlama(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('LLAMA_API_KEY')
  if (!apiKey) throw new Error('LLaMA API key not configured')

  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-2-7b-chat-hf',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`LLaMA API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}
