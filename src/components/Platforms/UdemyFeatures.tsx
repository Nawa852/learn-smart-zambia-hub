import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Video, FileText, Presentation, Type, Radio, Users, 
  DollarSign, Star, Clock, Play, ShoppingCart, Tag
} from "lucide-react";
import BrightSphereLogo from "@/assets/brightsphere-logo.svg";

const UdemyFeatures = () => {
  const [cart, setCart] = useState<string[]>([]);

  const courses = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviews: "245,000",
      price: 19.99,
      originalPrice: 199.99,
      hours: 55,
      lectures: 490,
      bestseller: true,
      formats: ['video', 'pdf', 'text']
    },
    {
      id: "2",
      title: "Machine Learning A-Z™",
      instructor: "Kirill Eremenko",
      rating: 4.5,
      reviews: "165,000",
      price: 24.99,
      originalPrice: 149.99,
      hours: 44,
      lectures: 382,
      bestseller: true,
      formats: ['video', 'slides', 'exercises']
    },
    {
      id: "3",
      title: "The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.8,
      reviews: "320,000",
      price: 14.99,
      originalPrice: 179.99,
      hours: 62,
      lectures: 556,
      bestseller: false,
      formats: ['video', 'pdf', 'projects']
    }
  ];

  const liveSessions = [
    { title: "Live Q&A: React Advanced Patterns", instructor: "John Doe", time: "Today, 3:00 PM", attendees: 234 },
    { title: "Workshop: Building APIs with Node.js", instructor: "Jane Smith", time: "Tomorrow, 10:00 AM", attendees: 156 },
    { title: "Masterclass: System Design", instructor: "Alex Chen", time: "Fri, 2:00 PM", attendees: 89 }
  ];

  const formatIcons: Record<string, any> = {
    video: Video,
    pdf: FileText,
    slides: Presentation,
    text: Type,
    exercises: FileText,
    projects: FileText
  };

  const toggleCart = (id: string) => {
    setCart(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Udemy-Style Marketplace</h2>
            <p className="text-muted-foreground">Multi-format courses, live sessions & affordable pricing</p>
          </div>
        </div>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {cart.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Sale Banner */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg">Flash Sale! Up to 90% Off</h3>
                <p className="text-white/80">New courses from $9.99. Ends in 2 days!</p>
              </div>
            </div>
            <Button variant="secondary">Shop Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Format Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Multi-Format Learning
          </CardTitle>
          <CardDescription>
            Courses include various content types for comprehensive learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: Video, label: "Video Lectures", count: "500K+" },
              { icon: FileText, label: "PDF Resources", count: "100K+" },
              { icon: Presentation, label: "Slide Decks", count: "50K+" },
              { icon: Type, label: "Text Articles", count: "80K+" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-2">
                <item.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {courses.map(course => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            {/* Course Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center relative">
              <Play className="w-12 h-12 text-primary" />
              {course.bestseller && (
                <Badge className="absolute top-2 left-2 bg-yellow-500">Bestseller</Badge>
              )}
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-amber-600">{course.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({course.reviews})</span>
              </div>

              {/* Course Info */}
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.hours}h
                </span>
                <span>{course.lectures} lectures</span>
              </div>

              {/* Formats */}
              <div className="flex gap-1 mt-3">
                {course.formats.map((format, idx) => {
                  const Icon = formatIcons[format] || FileText;
                  return (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <Icon className="w-3 h-3 mr-1" />
                      {format}
                    </Badge>
                  );
                })}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-bold">${course.price}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${course.originalPrice}
                  </span>
                </div>
                <Button 
                  size="sm"
                  variant={cart.includes(course.id) ? "secondary" : "default"}
                  onClick={() => toggleCart(course.id)}
                >
                  {cart.includes(course.id) ? "In Cart" : "Add to Cart"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            Live Sessions & Coaching
          </CardTitle>
          <CardDescription>
            Join interactive live classes with expert instructors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {liveSessions.map((session, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium">{session.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {session.instructor} • {session.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {session.attendees}
                </span>
                <Button size="sm">Join</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Affiliate Program */}
      <Card className="border-2 border-dashed border-primary/30">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DollarSign className="w-10 h-10 text-green-500" />
              <div>
                <h3 className="font-bold text-lg">Affiliate Program</h3>
                <p className="text-muted-foreground">Earn money by promoting courses</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-500">Up to 40%</p>
              <p className="text-sm text-muted-foreground">Commission per sale</p>
            </div>
            <Button>Join Program</Button>
          </div>
        </CardContent>
      </Card>

      {/* Self-Paced Learning */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Clock className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-bold text-lg">Self-Paced Learning</h3>
            <p className="text-muted-foreground mt-2">
              No strict schedules. Learn at your own pace, whenever and wherever you want.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">Lifetime Access</Badge>
              <Badge variant="outline">No Deadlines</Badge>
              <Badge variant="outline">Learn Anywhere</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Star className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="font-bold text-lg">User Ratings Guide Quality</h3>
            <p className="text-muted-foreground mt-2">
              Comprehensive rating system helps you find the best courses. Community-driven quality control.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Progress value={85} className="flex-1" />
              <span className="text-sm font-medium">85% 5-star</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UdemyFeatures;
