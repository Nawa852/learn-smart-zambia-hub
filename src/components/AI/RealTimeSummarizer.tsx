
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FileText, Video, Download, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RealTimeSummarizer = () => {
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  const { toast } = useToast();

  const summarizeContent = async (inputContent: string) => {
    if (!inputContent.trim()) {
      toast({
        title: "No Content",
        description: "Please enter content to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate AI summarization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSummary = `Key Points:\n• Main concept: ${inputContent.slice(0, 50)}...\n• Important details extracted\n• Actionable insights identified\n• Core learning objectives outlined`;
      setSummary(mockSummary);
      
      toast({
        title: "Summary Generated",
        description: "Content has been summarized successfully.",
      });
    } catch (error) {
      toast({
        title: "Summarization Failed",
        description: "Unable to summarize content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processVideo = async () => {
    if (!videoUrl.trim()) {
      toast({
        title: "No Video URL",
        description: "Please enter a video URL to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate video processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockSummary = `Video Summary:\n• Duration: 10:30\n• Main topics covered\n• Key timestamps identified\n• Learning objectives extracted\n• Recommended follow-up actions`;
      setSummary(mockSummary);
      
      toast({
        title: "Video Processed",
        description: "Video has been analyzed and summarized.",
      });
    } catch (error) {
      toast({
        title: "Video Processing Failed",
        description: "Unable to process video. Please check the URL.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === 'text' ? 'default' : 'outline'}
          onClick={() => setActiveTab('text')}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Text/PDF
        </Button>
        <Button
          variant={activeTab === 'video' ? 'default' : 'outline'}
          onClick={() => setActiveTab('video')}
          className="flex items-center gap-2"
        >
          <Video className="w-4 h-4" />
          Video
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-Time Content Summarizer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeTab === 'text' ? (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your text content or PDF text here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-48"
              />
              <Button
                onClick={() => summarizeContent(content)}
                disabled={isProcessing || !content.trim()}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Generate Summary'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                placeholder="Enter YouTube video URL or upload video file..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <Button
                onClick={processVideo}
                disabled={isProcessing || !videoUrl.trim()}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Video...
                  </>
                ) : (
                  'Analyze Video'
                )}
              </Button>
            </div>
          )}

          {summary && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Summary</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={downloadSummary}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <Textarea
                value={summary}
                readOnly
                className="min-h-32 bg-gray-50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeSummarizer;
