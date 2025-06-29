
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const isRateLimited = (userId: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + 60000 });
    return false;
  }
  
  if (userLimit.count >= 10) {
    return true;
  }
  
  userLimit.count++;
  return false;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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

    if (isRateLimited(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { query, gradeLevel, subject, maxResults = 10 } = await req.json()

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get('YOUTUBE_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'YouTube API not configured' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let searchQuery = `${query} educational tutorial lesson`;
    if (gradeLevel) searchQuery += ` ${gradeLevel}`;
    if (subject) searchQuery += ` ${subject}`;

    const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    youtubeUrl.searchParams.set('part', 'snippet');
    youtubeUrl.searchParams.set('q', searchQuery);
    youtubeUrl.searchParams.set('type', 'video');
    youtubeUrl.searchParams.set('maxResults', Math.min(maxResults, 50).toString());
    youtubeUrl.searchParams.set('order', 'relevance');
    youtubeUrl.searchParams.set('safeSearch', 'strict');
    youtubeUrl.searchParams.set('videoDuration', 'medium');
    youtubeUrl.searchParams.set('key', apiKey);

    const response = await fetch(youtubeUrl.toString());

    if (!response.ok) {
      console.error('YouTube API error:', response.status);
      return new Response(
        JSON.stringify({ error: 'Failed to search videos' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return new Response(
        JSON.stringify({ videos: [], message: 'No educational videos found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    detailsUrl.searchParams.set('part', 'contentDetails,statistics');
    detailsUrl.searchParams.set('id', videoIds);
    detailsUrl.searchParams.set('key', apiKey);

    const detailsResponse = await fetch(detailsUrl.toString());
    const detailsData = await detailsResponse.json();

    const videos = data.items.map((item: any) => {
      const details = detailsData.items?.find((d: any) => d.id === item.id.videoId);
      
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        duration: formatDuration(details?.contentDetails?.duration || 'PT0S'),
        viewCount: details?.statistics?.viewCount || '0',
        likeCount: details?.statistics?.likeCount || '0',
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      };
    });

    return new Response(
      JSON.stringify({ videos }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in youtube-search function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  } else {
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
  }
}
