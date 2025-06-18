
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
    const { videoId, title, description, userId } = await req.json();
    const openaiApiKey = Deno.env.get('open ai');
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');

    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get video transcript if available
    let transcript = '';
    if (youtubeApiKey) {
      try {
        // Get video captions
        const captionsUrl = `https://www.googleapis.com/youtube/v3/captions?` +
          `part=snippet&` +
          `videoId=${videoId}&` +
          `key=${youtubeApiKey}`;

        const captionsResponse = await fetch(captionsUrl);
        const captionsData = await captionsResponse.json();

        if (captionsData.items && captionsData.items.length > 0) {
          // For now, we'll use the description as proxy for transcript
          // In a full implementation, you'd need to handle caption downloading
          transcript = description;
        }
      } catch (captionError) {
        console.log('Captions not available, using description');
        transcript = description;
      }
    }

    // Generate comprehensive study notes using OpenAI
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
            content: `You are an expert educational content creator for Zambian students. Create comprehensive study notes that are:
            1. Well-structured with clear headings
            2. Include key concepts and definitions
            3. Provide examples relevant to Zambian context when possible
            4. Include practice questions
            5. Use simple, clear language appropriate for students
            6. Include study tips and memory aids`
          },
          {
            role: 'user',
            content: `Create detailed study notes for this educational video:
            
            Title: ${title}
            Description: ${description}
            Content: ${transcript}
            
            Format the notes as a structured document with:
            - Executive Summary
            - Key Concepts & Definitions
            - Main Topics (with bullet points)
            - Examples and Applications
            - Practice Questions (5-10 questions)
            - Study Tips
            - Additional Resources to Explore
            
            Make it comprehensive enough for a student to study from without watching the video.`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      }),
    });

    const openaiData = await openaiResponse.json();
    const studyNotes = openaiData.choices[0].message.content;

    // Generate HTML content for PDF
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Study Notes: ${title}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 40px;
                color: #333;
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #4A90E2;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #4A90E2;
                margin-bottom: 10px;
            }
            .header .subtitle {
                color: #666;
                font-style: italic;
            }
            .section {
                margin-bottom: 25px;
            }
            .section h2 {
                color: #2E5984;
                border-left: 4px solid #4A90E2;
                padding-left: 15px;
                margin-bottom: 15px;
            }
            .section h3 {
                color: #4A90E2;
                margin-bottom: 10px;
            }
            ul, ol {
                padding-left: 25px;
            }
            li {
                margin-bottom: 5px;
            }
            .highlight {
                background-color: #E8F4FD;
                padding: 15px;
                border-left: 4px solid #4A90E2;
                margin: 15px 0;
            }
            .question {
                background-color: #F9F9F9;
                padding: 10px;
                margin: 10px 0;
                border-radius: 5px;
                border: 1px solid #DDD;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                color: #888;
                font-size: 12px;
                border-top: 1px solid #DDD;
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Study Notes</h1>
            <h2>${title}</h2>
            <p class="subtitle">Generated by EduZambia AI Tutor</p>
            <p class="subtitle">Date: ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="content">
            ${studyNotes.split('\n').map(line => {
              line = line.trim();
              if (line.startsWith('# ')) {
                return `<h2>${line.substring(2)}</h2>`;
              } else if (line.startsWith('## ')) {
                return `<h3>${line.substring(3)}</h3>`;
              } else if (line.startsWith('- ') || line.startsWith('* ')) {
                return `<li>${line.substring(2)}</li>`;
              } else if (line.match(/^\d+\./)) {
                return `<li>${line.substring(line.indexOf('.') + 1).trim()}</li>`;
              } else if (line.length > 0) {
                return `<p>${line}</p>`;
              }
              return '';
            }).join('')}
        </div>

        <div class="footer">
            <p>Generated for User ID: ${userId}</p>
            <p>EduZambia - Empowering Zambian Education with AI</p>
            <p>Video ID: ${videoId}</p>
        </div>
    </body>
    </html>`;

    // For now, return the HTML content as the PDF buffer
    // In a full implementation, you'd use a library like Puppeteer or jsPDF to generate actual PDF
    const pdfBuffer = new TextEncoder().encode(htmlContent);

    return new Response(JSON.stringify({ 
      pdfBuffer: Array.from(pdfBuffer), // Convert to array for JSON serialization
      success: true,
      fileName: `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_notes.pdf`,
      contentType: 'text/html' // In real implementation, this would be 'application/pdf'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-pdf-notes function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
