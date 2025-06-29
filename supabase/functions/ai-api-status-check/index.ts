
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apis } = await req.json();
    const results: Record<string, boolean> = {};

    // Check each API by testing with simple requests
    for (const api of apis) {
      try {
        let isActive = false;
        const apiKey = Deno.env.get(api.secretKey);
        
        if (!apiKey) {
          console.warn(`No API key found for ${api.name} (${api.secretKey})`);
          results[api.name] = false;
          continue;
        }

        switch (api.name) {
          case 'GPT-4o':
          case 'Whisper':
            // Test OpenAI API
            const openaiResponse = await fetch('https://api.openai.com/v1/models', {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
              },
            });
            isActive = openaiResponse.ok;
            break;

          case 'Claude 3':
            // Test Anthropic API
            const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 10,
                messages: [{ role: 'user', content: 'Hi' }]
              })
            });
            isActive = claudeResponse.status !== 401 && claudeResponse.status !== 403;
            break;

          case 'Gemini':
            // Test Google Gemini API
            const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            isActive = geminiResponse.ok;
            break;

          case 'DeepSeek':
            // Test DeepSeek API
            const deepseekResponse = await fetch('https://api.deepseek.com/v1/models', {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
              },
            });
            isActive = deepseekResponse.ok;
            break;

          default:
            // For other APIs, assume active if key exists
            isActive = !!apiKey;
            break;
        }

        results[api.name] = isActive;
      } catch (error) {
        console.error(`Error checking ${api.name}:`, error);
        results[api.name] = false;
      }
    }

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-api-status-check:", error);
    return new Response(
      JSON.stringify({ error: "Failed to check API status" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
