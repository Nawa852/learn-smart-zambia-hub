
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
    const { materialId, filePath, fileName } = await req.json();
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    console.log('Processing material:', { materialId, filePath, fileName });

    // Try OpenAI GPT-4o for metadata extraction
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
              content: `Analyze this Zambian educational file name "${fileName}" and extract metadata. Identify:
              1. Subject (Mathematics, English, Science, Biology, Chemistry, Physics, History, Geography, Bemba, Nyanja, etc.)
              2. Grade level (1-12)
              3. Curriculum type (ECZ or Cambridge)
              4. Topic/chapter if identifiable
              5. Document type (notes, assignment, exam, worksheet)
              
              Consider Zambian educational context. Respond with JSON: {"subject": "", "grade": number, "curriculum": "", "topic": "", "documentType": ""}`
            }],
            max_tokens: 300,
            temperature: 0.3
          })
        });

        if (response.ok) {
          const aiResult = await response.json();
          let metadata;
          try {
            metadata = JSON.parse(aiResult.choices[0].message.content);
          } catch {
            // Fallback if JSON parsing fails
            metadata = extractFallbackMetadata(fileName);
          }

          // Update material with AI-extracted metadata
          const { error: updateError } = await supabaseClient
            .from('study_materials')
            .update({
              subject: metadata.subject || null,
              grade: metadata.grade || null,
              curriculum: metadata.curriculum || 'ECZ',
              metadata: {
                aiAnalysis: metadata,
                analyzedAt: new Date().toISOString(),
                confidence: 'high'
              }
            })
            .eq('id', materialId);

          if (updateError) {
            console.error('Error updating material:', updateError);
          }

          return new Response(
            JSON.stringify({ 
              success: true, 
              metadata,
              message: 'Material successfully tagged with AI metadata'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (error) {
        console.error('OpenAI API error:', error);
      }
    }

    // Fallback: Simple filename-based analysis
    const fallbackMetadata = extractFallbackMetadata(fileName);

    const { error: updateError } = await supabaseClient
      .from('study_materials')
      .update({
        subject: fallbackMetadata.subject,
        grade: fallbackMetadata.grade,
        curriculum: fallbackMetadata.curriculum,
        metadata: {
          fallbackAnalysis: fallbackMetadata,
          analyzedAt: new Date().toISOString(),
          confidence: 'low'
        }
      })
      .eq('id', materialId);

    if (updateError) {
      console.error('Error updating material with fallback:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        metadata: fallbackMetadata,
        message: 'Material tagged with basic metadata'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in AI material tagger:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractFallbackMetadata(filename: string) {
  const subjects = [
    'mathematics', 'math', 'english', 'science', 'biology', 'chemistry', 
    'physics', 'history', 'geography', 'civic', 'religious', 'computer',
    'business', 'bemba', 'nyanja', 'tonga', 'lozi'
  ];
  
  const lowerFilename = filename.toLowerCase();
  
  // Extract subject
  let subject = null;
  for (const subj of subjects) {
    if (lowerFilename.includes(subj)) {
      subject = subj.charAt(0).toUpperCase() + subj.slice(1);
      break;
    }
  }
  
  // Extract grade
  let grade = null;
  const gradeMatch = filename.match(/grade\s*(\d+)|g(\d+)|(\d+)(?:st|nd|rd|th)?\s*grade/i);
  if (gradeMatch) {
    grade = parseInt(gradeMatch[1] || gradeMatch[2] || gradeMatch[3]);
  }
  
  // Extract curriculum
  const curriculum = lowerFilename.includes('cambridge') ? 'Cambridge' : 'ECZ';
  
  // Extract document type
  let documentType = 'document';
  if (lowerFilename.includes('exam') || lowerFilename.includes('test')) documentType = 'exam';
  else if (lowerFilename.includes('assignment') || lowerFilename.includes('homework')) documentType = 'assignment';
  else if (lowerFilename.includes('notes') || lowerFilename.includes('note')) documentType = 'notes';
  else if (lowerFilename.includes('worksheet') || lowerFilename.includes('exercise')) documentType = 'worksheet';
  
  return {
    subject,
    grade,
    curriculum,
    documentType,
    topic: null
  };
}
