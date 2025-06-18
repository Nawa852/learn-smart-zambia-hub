
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
    const { message, model, systemPrompt } = await req.json();

    if (!message || !model) {
      throw new Error('Message and model are required');
    }

    let response;
    let apiKey;
    let apiUrl;
    let requestBody;

    const defaultSystemPrompt = systemPrompt || "You are a helpful AI tutor. Provide clear, educational explanations and help students understand concepts step by step.";

    switch (model) {
      case 'openai':
        apiKey = Deno.env.get('open ai');
        apiUrl = 'https://api.openai.com/v1/chat/completions';
        requestBody = {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: defaultSystemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000
        };
        break;

      case 'claude':
        apiKey = Deno.env.get('CLAUDE_API_KEY');
        apiUrl = 'https://api.anthropic.com/v1/messages';
        requestBody = {
          model: 'claude-3-haiku-20240307',
          max_tokens: 1000,
          messages: [
            { role: 'user', content: `${defaultSystemPrompt}\n\nStudent question: ${message}` }
          ]
        };
        break;

      case 'deepseek':
        apiKey = Deno.env.get('deep seek');
        apiUrl = 'https://api.deepseek.com/v1/chat/completions';
        requestBody = {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: defaultSystemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000
        };
        break;

      case 'qwen':
        apiKey = Deno.env.get('QWEN_API_KEY');
        apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
        requestBody = {
          model: 'qwen-turbo',
          input: {
            messages: [
              { role: 'system', content: defaultSystemPrompt },
              { role: 'user', content: message }
            ]
          },
          parameters: {
            temperature: 0.7,
            max_tokens: 1000
          }
        };
        break;

      case 'llama':
        apiKey = Deno.env.get('LLAMA_API_KEY');
        apiUrl = 'https://api.together.xyz/v1/chat/completions';
        requestBody = {
          model: 'meta-llama/Llama-2-7b-chat-hf',
          messages: [
            { role: 'system', content: defaultSystemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000
        };
        break;

      default:
        throw new Error('Unsupported model');
    }

    if (!apiKey) {
      throw new Error(`API key not found for model: ${model}`);
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Set authorization header based on API
    if (model === 'claude') {
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
    } else if (model === 'qwen') {
      headers['Authorization'] = `Bearer ${apiKey}`;
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error for ${model}:`, errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let aiResponse;

    // Extract response based on API format
    switch (model) {
      case 'openai':
      case 'deepseek':
      case 'llama':
        aiResponse = data.choices[0].message.content;
        break;
      case 'claude':
        aiResponse = data.content[0].text;
        break;
      case 'qwen':
        aiResponse = data.output.text;
        break;
      default:
        aiResponse = 'Response format not supported';
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      model: model,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in multi-ai-tutor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
