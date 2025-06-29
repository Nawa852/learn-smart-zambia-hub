
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

    // Get file content for analysis
    const { data: fileData } = await supabaseClient.storage
      .from('study-materials')
      .download(filePath);

    if (!fileData) {
      throw new Error('Could not download file for analysis');
    }

    // Extract metadata using OpenAI GPT-4o
    const openaiApiKey = Deno.env.get('PENAI_API_KEY') || Deno.env.get('OPENAI_API_KEY');
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
              content: `Analyze this file name "${fileName}" and extract educational metadata. Identify:
              1. Subject (Mathematics, English, Science, Biology, Chemistry, Physics, History, Geography, etc.)
              2. Grade level (1-12)
              3. Curriculum type (ECZ or Cambridge)
              4. Topic/chapter if identifiable
              5. Document type (notes, assignment, exam, worksheet)
              
              Respond with JSON format: {"subject": "", "grade": number, "curriculum": "", "topic": "", "documentType": ""}`
            }],
            max_tokens: 300
          })
        });

        if (response.ok) {
          const aiResult = await response.json();
          const metadata = JSON.parse(aiResult.choices[0].message.content);

          // Update material with AI-extracted metadata
          await supabaseClient
            .from('study_materials')
            .update({
              subject: metadata.subject || null,
              grade: metadata.grade || null,
              curriculum: metadata.curriculum || 'ECZ',
              metadata: {
                aiAnalysis: metadata,
                analyzedAt: new Date().toISOString()
              }
            })
            .eq('id', materialId);

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
    const fallbackMetadata = {
      subject: extractSubjectFromFilename(fileName),
      grade: extractGradeFromFilename(fileName),
      curriculum: fileName.toLowerCase().includes('cambridge') ? 'Cambridge' : 'ECZ',
      documentType: extractDocumentType(fileName)
    };

    await supabaseClient
      .from('study_materials')
      .update({
        subject: fallbackMetadata.subject,
        grade: fallbackMetadata.grade,
        curriculum: fallbackMetadata.curriculum,
        metadata: {
          fallbackAnalysis: fallbackMetadata,
          analyzedAt: new Date().toISOString()
        }
      })
      .eq('id', materialId);

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

function extractSubjectFromFilename(filename: string): string | null {
  const subjects = [
    'mathematics', 'math', 'english', 'science', 'biology', 'chemistry', 
    'physics', 'history', 'geography', 'civic', 'religious', 'computer',
    'business', 'bemba', 'nyanja', 'tonga'
  ];
  
  const lowerFilename = filename.toLowerCase();
  for (const subject of subjects) {
    if (lowerFilename.includes(subject)) {
      return subject.charAt(0).toUpperCase() + subject.slice(1);
    }
  }
  return null;
}

function extractGradeFromFilename(filename: string): number | null {
  const gradeMatch = filename.match(/grade\s*(\d+)|g(\d+)|(\d+)(?:st|nd|rd|th)?\s*grade/i);
  if (gradeMatch) {
    return parseInt(gradeMatch[1] || gradeMatch[2] || gradeMatch[3]);
  }
  return null;
}

function extractDocumentType(filename: string): string {
  const lowerFilename = filename.toLowerCase();
  if (lowerFilename.includes('exam') || lowerFilename.includes('test')) return 'exam';
  if (lowerFilename.includes('assignment') || lowerFilename.includes('homework')) return 'assignment';
  if (lowerFilename.includes('notes') || lowerFilename.includes('note')) return 'notes';
  if (lowerFilename.includes('worksheet') || lowerFilename.includes('exercise')) return 'worksheet';
  return 'document';
}
