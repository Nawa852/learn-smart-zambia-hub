
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
    const { query, gradeLevel, subject, maxResults = 20 } = await req.json();
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');

    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured');
    }

    // Enhance search query with educational context
    let enhancedQuery = `${query} educational`;
    if (gradeLevel) enhancedQuery += ` ${gradeLevel}`;
    if (subject) enhancedQuery += ` ${subject}`;
    enhancedQuery += ' tutorial lesson';

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&` +
      `q=${encodeURIComponent(enhancedQuery)}&` +
      `type=video&` +
      `videoDuration=medium&` +
      `videoDefinition=high&` +
      `order=relevance&` +
      `safeSearch=strict&` +
      `maxResults=${maxResults}&` +
      `key=${youtubeApiKey}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchData.error?.message || 'Unknown error'}`);
    }

    // Get video details including statistics
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?` +
      `part=snippet,statistics,contentDetails&` +
      `id=${videoIds}&` +
      `key=${youtubeApiKey}`;

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    const videos = detailsData.items.map((item: any) => {
      const duration = item.contentDetails.duration;
      // Convert PT4M13S to 4:13 format
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const seconds = match[3] ? parseInt(match[3]) : 0;
      
      let formattedDuration = '';
      if (hours > 0) formattedDuration += `${hours}:`;
      formattedDuration += `${minutes.toString().padStart(hours > 0 ? 2 : 1, '0')}:`;
      formattedDuration += seconds.toString().padStart(2, '0');

      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        duration: formattedDuration,
        viewCount: item.statistics.viewCount || '0',
        likeCount: item.statistics.likeCount || '0',
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        tags: item.snippet.tags || []
      };
    });

    // Filter for educational content and appropriate length
    const educationalVideos = videos.filter((video: any) => {
      const title = video.title.toLowerCase();
      const description = video.description.toLowerCase();
      
      // Check for educational keywords
      const educationalKeywords = [
        'learn', 'tutorial', 'lesson', 'education', 'teaching', 'explain',
        'how to', 'introduction', 'basics', 'fundamentals', 'course',
        'lecture', 'study', 'academy', 'school', 'university'
      ];
      
      const hasEducationalContent = educationalKeywords.some(keyword => 
        title.includes(keyword) || description.includes(keyword)
      );
      
      // Filter out very short (< 2 min) or very long (> 30 min) videos for better learning
      const durationParts = video.duration.split(':');
      const totalMinutes = durationParts.length === 3 
        ? parseInt(durationParts[0]) * 60 + parseInt(durationParts[1])
        : parseInt(durationParts[0]);
      
      return hasEducationalContent && totalMinutes >= 2 && totalMinutes <= 30;
    });

    return new Response(JSON.stringify({ 
      videos: educationalVideos,
      totalResults: educationalVideos.length,
      query: enhancedQuery
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in youtube-search function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      videos: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
