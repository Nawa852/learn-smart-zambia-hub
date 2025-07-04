
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    
    const { 
      query, 
      gradeLevel, 
      subject, 
      difficulty = 'medium',
      learningStyle = 'visual',
      maxResults = 20 
    } = await req.json();

    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured');
    }

    // Enhanced search query based on adaptive learning parameters
    const adaptiveQuery = buildAdaptiveQuery(query, gradeLevel, subject, difficulty, learningStyle);
    
    // Search YouTube with adaptive parameters
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(adaptiveQuery)}&type=video&maxResults=${maxResults}&key=${youtubeApiKey}&safeSearch=strict&relevanceLanguage=en&regionCode=ZM`;
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Get detailed video information
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${youtubeApiKey}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Process and rank videos using AI for adaptive learning
    const processedVideos = await processVideosWithAI(detailsData.items, {
      gradeLevel,
      subject,
      difficulty,
      learningStyle,
      userPreferences: user ? await getUserLearningPreferences(supabaseClient, user.id) : null
    });

    // Store search analytics
    if (user) {
      await supabaseClient.from('learning_analytics').insert({
        user_id: user.id,
        activity_type: 'youtube_search',
        subject: subject,
        metadata: {
          query,
          gradeLevel,
          difficulty,
          learningStyle,
          resultsCount: processedVideos.length
        }
      });
    }

    return new Response(JSON.stringify({ 
      videos: processedVideos,
      adaptiveQuery,
      totalResults: data.pageInfo.totalResults,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in youtube-adaptive-learning function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function buildAdaptiveQuery(query: string, gradeLevel: string, subject: string, difficulty: string, learningStyle: string): string {
  let adaptiveQuery = query;
  
  // Add grade level context
  if (gradeLevel) {
    adaptiveQuery += ` ${gradeLevel}`;
  }
  
  // Add subject context
  if (subject) {
    adaptiveQuery += ` ${subject}`;
  }
  
  // Add difficulty modifiers
  const difficultyModifiers = {
    easy: 'beginner basics introduction simple',
    medium: 'intermediate explained tutorial',
    hard: 'advanced comprehensive detailed analysis'
  };
  
  if (difficultyModifiers[difficulty as keyof typeof difficultyModifiers]) {
    adaptiveQuery += ` ${difficultyModifiers[difficulty as keyof typeof difficultyModifiers]}`;
  }
  
  // Add learning style modifiers
  const styleModifiers = {
    visual: 'animation diagram visual demonstration',
    auditory: 'explanation lecture discussion',
    kinesthetic: 'hands-on practical experiment activity',
    mixed: 'comprehensive tutorial'
  };
  
  if (styleModifiers[learningStyle as keyof typeof styleModifiers]) {
    adaptiveQuery += ` ${styleModifiers[learningStyle as keyof typeof styleModifiers]}`;
  }
  
  // Add educational keywords
  adaptiveQuery += ' education learning tutorial lesson';
  
  return adaptiveQuery;
}

async function processVideosWithAI(videos: any[], context: any) {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openaiApiKey) {
    // Fallback processing without AI
    return videos.map(video => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      duration: parseDuration(video.contentDetails.duration),
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      tags: video.snippet.tags || [],
      adaptiveScore: Math.random() * 100, // Random score as fallback
      learningObjectives: [],
      difficultyLevel: context.difficulty,
      recommendationReason: 'Matched search criteria'
    }));
  }

  try {
    // Use AI to analyze and rank videos
    const analysisPrompt = `
    Analyze these educational videos for a ${context.gradeLevel} student studying ${context.subject} at ${context.difficulty} level with ${context.learningStyle} learning style:
    
    ${videos.map(v => `Title: ${v.snippet.title}\nDescription: ${v.snippet.description.substring(0, 200)}...\n`).join('\n')}
    
    For each video, provide:
    1. Adaptive score (0-100) based on relevance to student needs
    2. Learning objectives (max 3)
    3. Difficulty assessment
    4. Recommendation reason
    
    Respond in JSON format.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an educational content analyzer specializing in Zambian curriculum.' },
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      }),
    });

    let aiAnalysis = null;
    if (response.ok) {
      const aiData = await response.json();
      try {
        aiAnalysis = JSON.parse(aiData.choices[0].message.content);
      } catch {
        console.log('Failed to parse AI analysis, using fallback');
      }
    }

    return videos.map((video, index) => {
      const analysis = aiAnalysis && aiAnalysis[index] ? aiAnalysis[index] : {};
      
      return {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        duration: parseDuration(video.contentDetails.duration),
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        tags: video.snippet.tags || [],
        adaptiveScore: analysis.adaptiveScore || Math.random() * 100,
        learningObjectives: analysis.learningObjectives || [],
        difficultyLevel: analysis.difficultyLevel || context.difficulty,
        recommendationReason: analysis.recommendationReason || 'Matched search criteria'
      };
    }).sort((a, b) => b.adaptiveScore - a.adaptiveScore);

  } catch (error) {
    console.error('AI processing error:', error);
    // Fallback to basic processing
    return videos.map(video => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      duration: parseDuration(video.contentDetails.duration),
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      tags: video.snippet.tags || [],
      adaptiveScore: Math.random() * 100,
      learningObjectives: [],
      difficultyLevel: context.difficulty,
      recommendationReason: 'Matched search criteria'
    }));
  }
}

function parseDuration(duration: string): string {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!matches) return '0:00';
  
  const hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
  const minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;
  const seconds = matches[3] ? parseInt(matches[3].replace('S', '')) : 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function getUserLearningPreferences(supabaseClient: any, userId: string) {
  try {
    const { data } = await supabaseClient
      .from('learning_analytics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    
    return data || [];
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return [];
  }
}
