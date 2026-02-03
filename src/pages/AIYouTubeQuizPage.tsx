import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  Youtube,
  Link,
  Play,
  Sparkles,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Video,
  FileQuestion
} from 'lucide-react';

const recentVideos = [
  {
    title: 'Introduction to Machine Learning',
    channel: 'Stanford Online',
    thumbnail: '/placeholder.svg',
    duration: '1:23:45',
    quizGenerated: true
  },
  {
    title: 'Quantum Physics Explained',
    channel: 'Veritasium',
    thumbnail: '/placeholder.svg',
    duration: '24:30',
    quizGenerated: true
  },
  {
    title: 'History of the Roman Empire',
    channel: 'Crash Course',
    thumbnail: '/placeholder.svg',
    duration: '15:20',
    quizGenerated: false
  }
];

const AIYouTubeQuizPage = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState<{title: string; duration: string; thumbnail: string} | null>(null);
  const [numQuestions, setNumQuestions] = useState('10');
  const [difficulty, setDifficulty] = useState('medium');

  const handleUrlPaste = async (url: string) => {
    setYoutubeUrl(url);
    // Simulate fetching video info
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setVideoInfo({
        title: 'Sample Educational Video',
        duration: '25:30',
        thumbnail: '/placeholder.svg'
      });
    }
  };

  const handleGenerate = async () => {
    if (!youtubeUrl) return;
    
    setGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setGenerating(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-background to-orange-50/50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
          >
            <Youtube className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            AI YouTube Quiz Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform any YouTube video into an interactive quiz. Perfect for studying lectures, tutorials, and educational content.
          </p>
        </div>

        {/* URL Input */}
        <Card className="mb-6 shadow-xl border-0">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  className="pl-10 h-12 text-lg"
                  placeholder="Paste YouTube video URL here..."
                  value={youtubeUrl}
                  onChange={(e) => handleUrlPaste(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="h-12 bg-red-600 hover:bg-red-700"
                onClick={handleGenerate}
                disabled={!youtubeUrl || generating}
              >
                {generating ? 'Generating...' : 'Generate Quiz'}
              </Button>
            </div>

            {generating && (
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>Analyzing video content...</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video Preview */}
        {videoInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 shadow-xl border-0">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-48 h-28 bg-muted rounded-lg overflow-hidden relative group">
                    <img src={videoInfo.thumbnail} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                    <Badge className="absolute bottom-2 right-2 bg-black/80">{videoInfo.duration}</Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{videoInfo.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {videoInfo.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileQuestion className="w-4 h-4" />
                        {numQuestions} questions
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <Select value={numQuestions} onValueChange={setNumQuestions}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Questions" />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 10, 15, 20, 25].map(n => (
                            <SelectItem key={n} value={String(n)}>{n} questions</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* How it works */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-600" />
              How it works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: 1, title: 'Paste URL', desc: 'Copy any YouTube video link and paste it above', icon: Link },
                { step: 2, title: 'AI Analysis', desc: 'Our AI analyzes the video transcript and content', icon: Sparkles },
                { step: 3, title: 'Take Quiz', desc: 'Get personalized quiz questions based on the video', icon: FileQuestion },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-xs text-red-600 font-semibold mb-1">STEP {item.step}</div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Videos */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Recent Video Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVideos.map((video, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="w-24 h-14 bg-muted rounded-lg overflow-hidden relative">
                    <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                    <Badge className="absolute bottom-1 right-1 text-[10px] bg-black/80">{video.duration}</Badge>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
                    <p className="text-xs text-muted-foreground">{video.channel}</p>
                  </div>
                  {video.quizGenerated ? (
                    <Button size="sm" variant="outline">
                      Retake Quiz
                    </Button>
                  ) : (
                    <Button size="sm">
                      Generate
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIYouTubeQuizPage;