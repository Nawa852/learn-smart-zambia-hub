
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
    if (userError) {
      console.log('Auth warning:', userError)
    }

    const { message, model, systemPrompt, userId } = await req.json()

    if (!message || !model) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: message and model are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Processing request for model: ${model}`)
    let response = '';

    try {
      switch (model) {
        case 'openai':
          response = await callOpenAI(message, systemPrompt || 'You are a helpful educational assistant for Zambian students.');
          break;
        case 'grok':
          response = await callGrok(message, systemPrompt || 'You are Grok, an AI assistant for EduZambia platform.');
          break;
        case 'claude':
          response = await callClaude(message, systemPrompt || 'You are Claude, an AI assistant focused on detailed analysis.');
          break;
        case 'deepseek':
          response = await callDeepSeek(message, systemPrompt || 'You are DeepSeek, specialized in mathematics and technical subjects.');
          break;
        case 'llama':
          response = await callLlama(message, systemPrompt || 'You are LLaMA, a fast and efficient AI assistant.');
          break;
        case 'gemini':
          response = await callGemini(message, systemPrompt || 'You are Gemini, Google\'s AI assistant.');
          break;
        case 'qwen':
          response = await callQwen(message, systemPrompt || 'You are Qwen, providing multilingual support.');
          break;
        case 'minimax':
          response = await callMinimax(message, systemPrompt || 'You are MiniMax AI assistant.');
          break;
        case 'moonshot':
          response = await callMoonshot(message, systemPrompt || 'You are Moonshot AI assistant.');
          break;
        case 'kimi':
          response = await callKimi(message, systemPrompt || 'You are Kimi AI assistant.');
          break;
        default:
          return new Response(
            JSON.stringify({ error: `Unsupported AI model: ${model}` }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
      }

      // Store chat history if user is authenticated
      if (user) {
        try {
          await supabaseClient
            .from('ai_chat_history')
            .insert([{
              user_id: user.id,
              message: message,
              response: response,
              chat_type: `multi_ai_${model}`
            }]);
        } catch (dbError) {
          console.log('Database insert warning:', dbError)
        }
      }

      return new Response(
        JSON.stringify({ response, model, success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (error) {
      console.error(`Error calling ${model}:`, error)
      
      // Return a helpful fallback response instead of an error
      const fallbackResponse = `I'm currently experiencing some technical difficulties with the ${model} service. Here's some general educational guidance while I get back online:\n\n• Break complex problems into smaller, manageable steps\n• Practice regularly rather than cramming before exams\n• Ask specific questions about concepts you don't understand\n• Use multiple learning resources to reinforce understanding\n\nPlease try again in a moment, and I'll do my best to help you with your studies!`
      
      return new Response(
        JSON.stringify({ response: fallbackResponse, model: `${model}_fallback`, success: false, warning: 'Using fallback response' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('Error in multi-ai-tutor function:', error)
    return new Response(
      JSON.stringify({ 
        response: "I'm experiencing technical difficulties right now. Please try again in a moment.", 
        model: 'fallback', 
        success: false,
        error: 'Internal server error'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error (${response.status}): ${error}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
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
    const error = await response.text()
    throw new Error(`Grok API error (${response.status}): ${error}`)
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
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Claude API error (${response.status}): ${error}`)
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
      temperature: 0.3,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`DeepSeek API error (${response.status}): ${error}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}

async function callLlama(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('LLAMA_4_API_KEY')
  if (!apiKey) throw new Error('LLaMA API key not configured')

  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-2-70b-chat-hf',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`LLaMA API error (${response.status}): ${error}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}

async function callGemini(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('GOOGLE_GEMMA_API_KEY')
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
        maxOutputTokens: 1500,
      }
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Gemini API error (${response.status}): ${error}`)
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
    const error = await response.text()
    throw new Error(`Qwen API error (${response.status}): ${error}`)
  }
  
  const data = await response.json()
  return data.output?.text || 'No response generated'
}

async function callMinimax(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('MINIMAX_API_KEY')
  if (!apiKey) throw new Error('MiniMax API key not configured')

  const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_pro', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'abab6.5s-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`MiniMax API error (${response.status}): ${error}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}

async function callMoonshot(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('MOONSHOT_API_KEY')
  if (!apiKey) throw new Error('Moonshot API key not configured')

  const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'moonshot-v1-8k',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Moonshot API error (${response.status}): ${error}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}

async function callKimi(message: string, systemPrompt: string): Promise<string> {
  const apiKey = Deno.env.get('KIMI_API_KEY')
  if (!apiKey) throw new Error('Kimi API key not configured')

  const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'moonshot-v1-8k',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Kimi API error (${response.status}): ${error}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}
