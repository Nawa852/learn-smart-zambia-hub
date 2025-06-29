
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
    const { query, language = 'English', userId } = await req.json();
    
    console.log('Search request:', { query, language, userId });
    
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

    let translatedQuery = query;
    let expandedTerms = [query];
    let recommendations = [];

    // Try to translate non-English queries using available APIs
    if (language !== 'English') {
      // Try Qwen for translation
      const qwenApiKey = Deno.env.get('QWEN_API_KEY');
      if (qwenApiKey) {
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
                  content: `Translate this Zambian ${language} educational search query to English: "${query}". Return only the English translation.`
                }]
              }
            })
          });

          if (translateResponse.ok) {
            const translateResult = await translateResponse.json();
            if (translateResult.output && translateResult.output.text) {
              translatedQuery = translateResult.output.text.trim();
              console.log('Translated query:', translatedQuery);
            }
          }
        } catch (error) {
          console.error('Qwen translation error:', error);
        }
      }
    }

    // Try to expand search terms using OpenAI
    const openaiApiKey = Deno.env.get('PENAI_API_KEY');
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
              content: `For the educational search query "${translatedQuery}", suggest 3-5 related terms and synonyms for Zambian ECZ and Cambridge curricula. Return as JSON array of strings only.`
            }],
            max_tokens: 200,
            temperature: 0.3
          })
        });

        if (response.ok) {
          const aiResult = await response.json();
          try {
            const suggestions = JSON.parse(aiResult.choices[0].message.content);
            if (Array.isArray(suggestions)) {
              expandedTerms = [translatedQuery, ...suggestions];
            }
          } catch {
            console.log('Failed to parse AI suggestions, using original query');
          }
        }
      } catch (error) {
        console.error('OpenAI query expansion error:', error);
      }
    }

    // Search materials using expanded terms
    const searchTerms = expandedTerms.map(term => term.toLowerCase()).slice(0, 10); // Limit to prevent too complex queries
    
    let query_builder = supabaseClient
      .from('study_materials')
      .select('*')
      .eq('language', language);

    // Build OR conditions for different fields
    const conditions = searchTerms.flatMap(term => [
      `file_name.ilike.%${term}%`,
      `subject.ilike.%${term}%`,
      `metadata->>'topic'.ilike.%${term}%`
    ]);

    if (conditions.length > 0) {
      query_builder = query_builder.or(conditions.join(','));
    }

    const { data: materials, error } = await query_builder
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Search error:', error);
      throw error;
    }

    console.log(`Found ${materials?.length || 0} materials`);

    // Try to get recommendations using DeepSeek
    if (userId) {
      const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
      if (deepseekApiKey && materials && materials.length > 0) {
        try {
          // Get user's recent materials
          const { data: recentAccess } = await supabaseClient
            .from('material_access_logs')
            .select(`
              material_id,
              study_materials (
                subject,
                grade,
                curriculum
              )
            `)
            .eq('user_id', userId)
            .eq('action', 'download')
            .order('created_at', { ascending: false })
            .limit(5);

          if (recentAccess && recentAccess.length > 0) {
            const userInterests = recentAccess
              .map(log => log.study_materials?.subject)
              .filter(Boolean)
              .slice(0, 3);
            
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
                  content: `User interested in: ${userInterests.join(', ')}. Current search: "${query}". Suggest 3 related Zambian educational topics. Return JSON array of strings.`
                }],
                max_tokens: 150
              })
            });

            if (recResponse.ok) {
              const recResult = await recResponse.json();
              try {
                recommendations = JSON.parse(recResult.choices[0].message.content);
              } catch {
                console.log('Failed to parse recommendations');
              }
            }
          }
        } catch (error) {
          console.error('DeepSeek recommendation error:', error);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        materials: materials || [],
        recommendations,
        translatedQuery: translatedQuery !== query ? translatedQuery : null,
        expandedTerms: expandedTerms.length > 1 ? expandedTerms.slice(1) : [],
        searchMetadata: {
          originalQuery: query,
          language,
          resultsCount: materials?.length || 0
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in AI material search:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        materials: [],
        recommendations: []
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
