
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
    const { query, language, userId } = await req.json();
    
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

    // If searching in a local language, translate using Qwen
    let translatedQuery = query;
    const qwenApiKey = Deno.env.get('QWEN_API_KEY');
    
    if (language !== 'English' && qwenApiKey) {
      try {
        const translateResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${qwenApiKey}`
          },
          body: JSON.stringify({
            model: 'qwen-turbo',
            input: {
              messages: [{
                role: 'user',
                content: `Translate this search query from ${language} to English for educational material search: "${query}". Only return the English translation.`
              }]
            }
          })
        });

        if (translateResponse.ok) {
          const translateResult = await translateResponse.json();
          translatedQuery = translateResult.output.text.trim();
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    }

    // Enhanced search with AI-powered query expansion
    const openaiApiKey = Deno.env.get('PENAI_API_KEY') || Deno.env.get('OPENAI_API_KEY');
    let expandedTerms = [translatedQuery];

    if (openaiApiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [{
              role: 'user',
              content: `For the educational search query "${translatedQuery}", suggest related terms and synonyms that might be found in study materials. Focus on academic subjects for Zambian ECZ and Cambridge curricula. Return as a JSON array of strings.`
            }],
            max_tokens: 200
          })
        });

        if (response.ok) {
          const aiResult = await response.json();
          const suggestions = JSON.parse(aiResult.choices[0].message.content);
          expandedTerms = [...expandedTerms, ...suggestions];
        }
      } catch (error) {
        console.error('Query expansion error:', error);
      }
    }

    // Search materials using expanded terms
    const searchConditions = expandedTerms.map(term => 
      `file_name.ilike.%${term}%,subject.ilike.%${term}%,metadata->>'topic'.ilike.%${term}%`
    ).join(',');

    const { data: materials, error } = await supabaseClient
      .from('study_materials')
      .select('*')
      .or(searchConditions)
      .eq('language', language)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    // Use DeepSeek for recommendations based on search history
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    let recommendations = [];

    if (deepseekApiKey && userId && materials.length > 0) {
      try {
        // Get user's recent searches
        const { data: recentSearches } = await supabaseClient
          .from('material_access_logs')
          .select('material_id, study_materials(*)')
          .eq('user_id', userId)
          .eq('action', 'download')
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentSearches && recentSearches.length > 0) {
          const userInterests = recentSearches.map(log => log.study_materials?.subject).filter(Boolean);
          
          const recResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${deepseekApiKey}`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [{
                role: 'user',
                content: `Based on a user's interest in subjects: ${userInterests.join(', ')}, and their current search for "${query}", suggest 3 related educational topics they might be interested in. Return as JSON array of strings.`
              }]
            })
          });

          if (recResponse.ok) {
            const recResult = await recResponse.json();
            recommendations = JSON.parse(recResult.choices[0].message.content);
          }
        }
      } catch (error) {
        console.error('Recommendation error:', error);
      }
    }

    return new Response(
      JSON.stringify({ 
        materials,
        recommendations,
        translatedQuery: translatedQuery !== query ? translatedQuery : null,
        expandedTerms: expandedTerms.length > 1 ? expandedTerms.slice(1) : []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in AI material search:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
