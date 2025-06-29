
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

    const { topic, gradeLevel, subject } = await req.json();
    const openaiApiKey = Deno.env.get('PENAI_API_KEY');
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');

    if (!openaiApiKey || !youtubeApiKey) {
      throw new Error('Required API keys not configured');
    }

    // Use OpenAI to create a structured learning path
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
            content: `You are an educational curriculum designer for Zambian students. Create structured learning paths.`
          },
          {
            role: 'user',
            content: `Create a learning path for "${topic}" suitable for ${gradeLevel} in ${subject}. 
            
            Provide 8-12 specific video topics in sequence. Format as JSON array:
            [
              {
                "title": "Topic Title",
                "description": "Brief description",
                "keywords": "search keywords",
                "difficulty": "beginner/intermediate/advanced"
              }
            ]`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      }),
    });

    const openaiData = await openaiResponse.json();
    let learningTopics;
    
    try {
      learningTopics = JSON.parse(openaiData.choices[0].message.content);
    } catch (parseError) {
      learningTopics = [
        {
          title: `Introduction to ${topic}`,
          description: `Basic concepts of ${topic}`,
          keywords: `${topic} introduction basics`,
          difficulty: 'beginner'
        },
        {
          title: `${topic} Fundamentals`,
          description: `Core principles`,
          keywords: `${topic} fundamentals`,
          difficulty: 'intermediate'
        }
      ];
    }

    // Search for videos for each topic
    const videos = [];
    
    for (const learningTopic of learningTopics) {
      const searchQuery = `${learningTopic.keywords} ${gradeLevel} educational tutorial`;
      
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&` +
        `q=${encodeURIComponent(searchQuery)}&` +
        `type=video&` +
        `videoDuration=medium&` +
        `order=relevance&` +
        `safeSearch=strict&` +
        `maxResults=3&` +
        `key=${youtubeApiKey}`;

      try {
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.items && searchData.items.length > 0) {
          const bestVideo = searchData.items[0];
          
          const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?` +
            `part=snippet,statistics,contentDetails&` +
            `id=${bestVideo.id.videoId}&` +
            `key=${youtubeApiKey}`;

          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();

          if (detailsData.items && detailsData.items.length > 0) {
            const videoDetails = detailsData.items[0];
            
            const duration = videoDetails.contentDetails.duration;
            const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            const hours = match[1] ? parseInt(match[1]) : 0;
            const minutes = match[2] ? parseInt(match[2]) : 0;
            const seconds = match[3] ? parseInt(match[3]) : 0;
            
            let formattedDuration = '';
            if (hours > 0) formattedDuration += `${hours}:`;
            formattedDuration += `${minutes.toString().padStart(hours > 0 ? 2 : 1, '0')}:`;
            formattedDuration += seconds.toString().padStart(2, '0');

            videos.push({
              id: videoDetails.id,
              title: videoDetails.snippet.title,
              description: videoDetails.snippet.description,
              thumbnail: videoDetails.snippet.thumbnails.medium.url,
              duration: formattedDuration,
              viewCount: videoDetails.statistics.viewCount || '0',
              likeCount: videoDetails.statistics.likeCount || '0',
              channelTitle: videoDetails.snippet.channelTitle,
              publishedAt: videoDetails.snippet.publishedAt,
              learningTopic: learningTopic.title,
              difficulty: learningTopic.difficulty
            });
          }
        }
      } catch (videoError) {
        console.error(`Error fetching video for topic ${learningTopic.title}:`, videoError);
      }
    }

    return new Response(JSON.stringify({ 
      videos,
      learningTopics,
      pathMetadata: {
        topic,
        gradeLevel,
        subject,
        totalVideos: videos.length,
        estimatedHours: Math.ceil(videos.length * 0.5)
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-learning-path function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      videos: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
