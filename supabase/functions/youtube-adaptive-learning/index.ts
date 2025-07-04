
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

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) {
      console.log('Auth warning:', userError);
    }

    const { query, difficulty = 'medium', subject = 'general' } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    
    if (!youtubeApiKey) {
      console.log('YouTube API key not configured, returning mock data');
      // Return mock educational videos
      const mockVideos = [
        {
          id: { videoId: 'dQw4w9WgXcQ' },
          snippet: {
            title: `Learn ${subject}: ${query} - Educational Tutorial`,
            description: `Comprehensive tutorial covering ${query} for ${difficulty} level students`,
            thumbnails: {
              medium: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' }
            },
            channelTitle: 'EduZambia Learning',
            publishedAt: new Date().toISOString()
          }
        },
        {
          id: { videoId: 'oHg5SJYRHA0' },
          snippet: {
            title: `${subject} Fundamentals: ${query} Explained Simply`,
            description: `Step-by-step guide to understanding ${query}`,
            thumbnails: {
              medium: { url: 'https://img.youtube.com/vi/oHg5SJYRHA0/mqdefault.jpg' }
            },
            channelTitle: 'Educational Hub',
            publishedAt: new Date().toISOString()
          }
        }
      ];

      return new Response(JSON.stringify({ 
        videos: mockVideos,
        success: true,
        source: 'mock_data',
        message: 'YouTube API not configured, showing sample videos'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Construct search query with educational terms
    const educationalQuery = `${query} ${subject} tutorial learn education ${difficulty} level`;
    
    console.log('Searching YouTube for:', educationalQuery);

    const youtubeResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&type=video&q=${encodeURIComponent(educationalQuery)}&` +
      `maxResults=10&order=relevance&videoDuration=medium&` +
      `safeSearch=strict&relevanceLanguage=en&key=${youtubeApiKey}`
    );

    if (!youtubeResponse.ok) {
      console.error('YouTube API error:', youtubeResponse.status);
      throw new Error(`YouTube API error: ${youtubeResponse.status}`);
    }

    const youtubeData = await youtubeResponse.json();
    console.log('YouTube API response received, items:', youtubeData.items?.length || 0);

    // Filter and enhance results with AI tagging
    const filteredVideos = youtubeData.items?.filter((video: any) => {
      const title = video.snippet.title.toLowerCase();
      const description = video.snippet.description.toLowerCase();
      
      // Filter for educational content
      const educationalKeywords = ['learn', 'tutorial', 'education', 'lesson', 'course', 'teach', 'explain', 'guide', 'study'];
      const hasEducationalContent = educationalKeywords.some(keyword => 
        title.includes(keyword) || description.includes(keyword)
      );
      
      return hasEducationalContent;
    }) || [];

    // Add AI-generated tags and difficulty assessment
    const enhancedVideos = filteredVideos.map((video: any) => ({
      ...video,
      aiTags: generateAITags(video.snippet.title, video.snippet.description, subject, difficulty),
      difficultyScore: assessDifficulty(video.snippet.title, video.snippet.description, difficulty),
      educationalValue: assessEducationalValue(video.snippet.title, video.snippet.description)
    }));

    // Sort by educational value and difficulty match
    enhancedVideos.sort((a, b) => {
      const scoreA = a.educationalValue + (1 - Math.abs(a.difficultyScore - getDifficultyNumber(difficulty)));
      const scoreB = b.educationalValue + (1 - Math.abs(b.difficultyScore - getDifficultyNumber(difficulty)));
      return scoreB - scoreA;
    });

    // Store user's learning analytics
    if (user) {
      try {
        await supabaseClient
          .from('learning_analytics')
          .insert([{
            user_id: user.id,
            activity_type: 'youtube_search',
            subject: subject,
            content_id: `youtube_${query}`,
            metadata: {
              query: query,
              difficulty: difficulty,
              results_count: enhancedVideos.length,
              search_timestamp: new Date().toISOString()
            }
          }]);
      } catch (dbError) {
        console.log('Analytics insert warning:', dbError);
      }
    }

    return new Response(JSON.stringify({ 
      videos: enhancedVideos.slice(0, 8), // Return top 8 results
      success: true,
      totalResults: enhancedVideos.length,
      query: educationalQuery,
      difficulty: difficulty,
      subject: subject
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in youtube-adaptive-learning function:', error);
    
    // Return helpful fallback content
    const fallbackVideos = [
      {
        id: { videoId: 'fallback1' },
        snippet: {
          title: 'Educational Content Coming Soon',
          description: 'We are working to bring you the best educational videos. Please try again later.',
          thumbnails: { medium: { url: '/placeholder-video.jpg' } },
          channelTitle: 'EduZambia',
          publishedAt: new Date().toISOString()
        },
        aiTags: ['educational', 'general'],
        difficultyScore: 0.5,
        educationalValue: 0.8
      }
    ];

    return new Response(JSON.stringify({ 
      videos: fallbackVideos,
      success: false,
      error: 'YouTube service temporarily unavailable',
      message: 'Please try again later'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateAITags(title: string, description: string, subject: string, difficulty: string): string[] {
  const content = `${title} ${description}`.toLowerCase();
  const tags = [subject, difficulty];
  
  // Add relevant tags based on content analysis
  const tagMapping = {
    'math': ['mathematics', 'algebra', 'geometry', 'calculus', 'numbers'],
    'science': ['physics', 'chemistry', 'biology', 'experiment', 'laboratory'],
    'english': ['language', 'grammar', 'writing', 'reading', 'literature'],
    'history': ['historical', 'timeline', 'civilization', 'culture', 'events'],
    'geography': ['maps', 'countries', 'climate', 'environment', 'world']
  };
  
  Object.entries(tagMapping).forEach(([key, keywords]) => {
    if (keywords.some(keyword => content.includes(keyword))) {
      tags.push(key);
    }
  });
  
  return [...new Set(tags)]; // Remove duplicates
}

function assessDifficulty(title: string, description: string, targetDifficulty: string): number {
  const content = `${title} ${description}`.toLowerCase();
  
  const difficultyIndicators = {
    beginner: ['basic', 'intro', 'beginner', 'simple', 'easy', 'start'],
    medium: ['intermediate', 'medium', 'standard', 'regular'],
    advanced: ['advanced', 'complex', 'difficult', 'expert', 'professional']
  };
  
  let score = 0.5; // Default medium difficulty
  
  Object.entries(difficultyIndicators).forEach(([level, keywords]) => {
    const matches = keywords.filter(keyword => content.includes(keyword)).length;
    if (matches > 0) {
      score = level === 'beginner' ? 0.2 : level === 'medium' ? 0.5 : 0.8;
    }
  });
  
  return score;
}

function assessEducationalValue(title: string, description: string): number {
  const content = `${title} ${description}`.toLowerCase();
  
  const educationalKeywords = [
    'learn', 'tutorial', 'education', 'lesson', 'course', 'teach', 'explain', 
    'guide', 'study', 'instruction', 'training', 'academic', 'school', 'university'
  ];
  
  const matches = educationalKeywords.filter(keyword => content.includes(keyword)).length;
  return Math.min(matches / educationalKeywords.length * 2, 1); // Normalize to 0-1
}

function getDifficultyNumber(difficulty: string): number {
  switch (difficulty.toLowerCase()) {
    case 'beginner': case 'easy': return 0.2;
    case 'medium': case 'intermediate': return 0.5;
    case 'advanced': case 'hard': return 0.8;
    default: return 0.5;
  }
}
