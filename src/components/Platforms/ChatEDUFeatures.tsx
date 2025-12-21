import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, FileText, BookOpen, Code, PenTool, 
  Target, Lightbulb, Upload, Brain, CheckCircle2, 
  ExternalLink, Sparkles, Play
} from "lucide-react";
import BrightSphereLogo from "@/assets/brightsphere-logo.svg";

const ChatEDUFeatures = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const interactiveExamples = [
    { title: "Tangent Lines to Parabolas", subject: "Calculus", difficulty: "Medium" },
    { title: "Binary Search Algorithm", subject: "Computer Science", difficulty: "Easy" },
    { title: "Chemical Equilibrium", subject: "Chemistry", difficulty: "Hard" },
    { title: "Vector Cross Products", subject: "Linear Algebra", difficulty: "Medium" }
  ];

  const practiceQuestions = [
    { 
      question: "Evaluate the integral ∫(0 to π/2) sin(x)cos(x)dx", 
      options: ["π/4", "1/2", "π/2", "1/4"],
      correct: 1
    }
  ];

  const codingExercises = [
    { title: "Sum of Numbers", language: "C++", difficulty: "Easy" },
    { title: "Linked List Reversal", language: "Python", difficulty: "Medium" },
    { title: "Binary Tree Traversal", language: "Java", difficulty: "Hard" }
  ];

  const studyGuideSteps = [
    "Understand the problem statement",
    "Identify key concepts and formulas",
    "Break down into smaller steps",
    "Apply formulas systematically",
    "Verify your solution"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
        <div>
          <h2 className="text-2xl font-bold">ChatEDU-Style Features</h2>
          <p className="text-muted-foreground">Dynamic questions, citation chatbots & interactive guides</p>
        </div>
      </div>

      <Tabs defaultValue="chatbot" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="writing">Writing</TabsTrigger>
          <TabsTrigger value="upload">File Upload</TabsTrigger>
        </TabsList>

        {/* Citation-Based Chatbot */}
        <TabsContent value="chatbot" className="space-y-4">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Citation-Based AI Chatbot
                <Badge>Course-Specific</Badge>
              </CardTitle>
              <CardDescription>
                Get answers with direct citations to your course materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sample Chat */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm">You</span>
                  </div>
                  <div className="flex-1 bg-card rounded-lg p-3">
                    <p>What is Dijkstra's algorithm and when should I use it?</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <img src={BrightSphereLogo} alt="AI" className="w-5 h-5" />
                  </div>
                  <div className="flex-1 bg-primary/10 rounded-lg p-3">
                    <p>Dijkstra's algorithm finds the shortest path between nodes in a weighted graph. It's used when:</p>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      <li>All edge weights are non-negative</li>
                      <li>You need the shortest path from one source to all vertices</li>
                    </ul>
                    <div className="mt-3 p-2 bg-card rounded border">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Source: Lecture 12 - Graph Algorithms, Slide 23
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Input placeholder="Ask a question about your course..." className="flex-1" />
                <Button>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Interactive Examples
              </CardTitle>
              <CardDescription>
                Hands-on demonstrations for practical understanding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {interactiveExamples.map((example, idx) => (
                  <div key={idx} className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{example.subject}</Badge>
                      <Badge variant={example.difficulty === 'Easy' ? 'secondary' : example.difficulty === 'Medium' ? 'default' : 'destructive'}>
                        {example.difficulty}
                      </Badge>
                    </div>
                    <h4 className="font-semibold">{example.title}</h4>
                    <Button size="sm" className="mt-3" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Try Example
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Practice Questions */}
        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Dynamic Practice Questions
              </CardTitle>
              <CardDescription>
                AI-generated questions based on your uploaded materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {practiceQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-lg border">
                  <p className="font-medium mb-4">{q.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((option, oidx) => (
                      <Button 
                        key={oidx} 
                        variant="outline" 
                        className="justify-start h-auto py-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2 text-sm">
                          {String.fromCharCode(65 + oidx)}
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid md:grid-cols-3 gap-4">
                <Button className="h-auto py-4 flex-col">
                  <Target className="w-6 h-6 mb-2" />
                  Generate MCQs
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col">
                  <PenTool className="w-6 h-6 mb-2" />
                  Short Answer
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col">
                  <Brain className="w-6 h-6 mb-2" />
                  Adaptive Quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Study Guides */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Step-by-Step Study Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyGuideSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coding Exercises */}
        <TabsContent value="coding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Coding Exercises
              </CardTitle>
              <CardDescription>
                Interactive coding challenges with templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {codingExercises.map((exercise, idx) => (
                <div key={idx} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{exercise.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">{exercise.language}</Badge>
                      <Badge variant={exercise.difficulty === 'Easy' ? 'secondary' : exercise.difficulty === 'Medium' ? 'default' : 'destructive'}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <pre className="bg-muted rounded p-3 text-sm mt-3 overflow-x-auto">
                    <code>
{exercise.language === 'C++' ? `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}` : exercise.language === 'Python' ? `def solution():
    # Your code here
    pass

if __name__ == "__main__":
    solution()` : `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`}
                    </code>
                  </pre>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Run Code
                    </Button>
                    <Button size="sm" variant="outline">Submit</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Writing Tools */}
        <TabsContent value="writing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-primary" />
                AI Writing Tools
              </CardTitle>
              <CardDescription>
                Essay help, algorithm explanations, and more
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                  <PenTool className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold">Essay Helper</h4>
                  <p className="text-sm text-muted-foreground">Structure and improve your essays</p>
                </div>
                <div className="p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                  <Code className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold">Algorithm Explainer</h4>
                  <p className="text-sm text-muted-foreground">Detailed algorithm breakdowns</p>
                </div>
                <div className="p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                  <Brain className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold">Concept Summarizer</h4>
                  <p className="text-sm text-muted-foreground">Concise topic summaries</p>
                </div>
              </div>

              <Textarea 
                placeholder="Paste your essay or topic here for AI assistance..."
                className="min-h-[150px]"
              />
              <Button className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze & Improve
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* File Upload & Learning */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                File Upload & Course Creation
              </CardTitle>
              <CardDescription>
                Upload PDFs, PPTs, videos - AI transforms them into interactive courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium">Drop files here or click to upload</p>
                <p className="text-sm text-muted-foreground mt-1">
                  PDF, PPT, Word, Video files supported
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-3">
                {['PDF', 'PowerPoint', 'Word', 'Video'].map((type, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/50 text-center">
                    <FileText className="w-8 h-8 mx-auto text-primary mb-2" />
                    <p className="text-sm font-medium">{type}</p>
                  </div>
                ))}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium">Uploaded Files:</p>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{file}</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                    </div>
                  ))}
                </div>
              )}

              <Button className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Interactive Course from Files
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Performance Insights */}
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Performance Insights
            <Badge className="ml-2">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card border">
              <h4 className="font-semibold mb-2">Recommended Focus</h4>
              <p className="text-sm text-muted-foreground">
                Based on your practice results, focus on <strong>indefinite vs. definite integrals</strong> before your exam.
              </p>
              <Button size="sm" className="mt-3">Practice Now</Button>
            </div>
            <div className="p-4 rounded-lg bg-card border">
              <h4 className="font-semibold mb-2">Weak Areas</h4>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Integration by Parts</span>
                  <Badge variant="destructive">Needs Work</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Partial Fractions</span>
                  <Badge variant="secondary">Improving</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatEDUFeatures;
