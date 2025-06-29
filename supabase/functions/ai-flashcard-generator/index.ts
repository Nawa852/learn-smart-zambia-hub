
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { topic, difficulty, count = 10, subject } = await req.json();
    const openaiApiKey = Deno.env.get('PENAI_API_KEY');

    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Create ${count} educational flashcards for "${topic}" at ${difficulty} level in ${subject}. 
    
    Format as JSON array:
    [
      {
        "front": "Question or term",
        "back": "Answer or definition",
        "difficulty": "${difficulty}",
        "subject": "${subject}",
        "tags": ["tag1", "tag2"]
      }
    ]
    
    Make questions educational, clear, and appropriate for Zambian curriculum.`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator for Zambian students. Create high-quality flashcards.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    const openaiData = await openaiResponse.json();
    let flashcards;
    
    try {
      flashcards = JSON.parse(openaiData.choices[0].message.content);
    } catch (parseError) {
      // Fallback flashcards
      flashcards = [
        {
          front: `What is ${topic}?`,
          back: `${topic} is an important concept in ${subject}.`,
          difficulty: difficulty,
          subject: subject,
          tags: [topic.toLowerCase(), subject.toLowerCase()]
        }
      ];
    }

    // Store flashcards in database
    const flashcardsToInsert = flashcards.map((card: any) => ({
      user_id: user.id,
      front_content: card.front,
      back_content: card.back,
      subject: card.subject || subject,
      difficulty_level: card.difficulty || difficulty,
      tags: card.tags || [topic.toLowerCase()]
    }));

    const { data: insertedFlashcards, error: insertError } = await supabaseClient
      .from('flashcards')
      .insert(flashcardsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting flashcards:', insertError);
    }

    return new Response(JSON.stringify({ 
      flashcards: insertedFlashcards || flashcards,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-flashcard-generator function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
