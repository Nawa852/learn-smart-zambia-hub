import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Star, Clock, Users, BookOpen, Play,
  ChevronRight, Heart, TrendingUp, Award, Sparkles,
  SlidersHorizontal, Grid, List, Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CourseCatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const courses = [
    {
      id: 1,
      title: 'Complete Grade 12 Mathematics Mastery',
      instructor: 'Prof. John Banda',
      rating: 4.9,
      reviews: 2341,
      students: 12567,
      duration: '48 hours',
      lessons: 156,
      price: 149.99,
      image: '/placeholder.svg',
      level: 'Advanced',
      category: 'Mathematics',
      tags: ['ECZ', 'Exam Prep', 'Calculus'],
      aiRecommended: true,
      bestseller: true
    },
    {
      id: 2,
      title: 'Science Excellence: Physics & Chemistry',
      instructor: 'Dr. Mary Tembo',
      rating: 4.8,
      reviews: 1892,
      students: 8934,
      duration: '62 hours',
      lessons: 184,
      price: 199.99,
      image: '/placeholder.svg',
      level: 'Intermediate',
      category: 'Science',
      tags: ['Physics', 'Chemistry', 'Labs'],
      aiRecommended: true,
      bestseller: false
    },
    {
      id: 3,
      title: 'English Language & Literature Pro',
      instructor: 'Ms. Grace Phiri',
      rating: 4.7,
      reviews: 1456,
      students: 7823,
      duration: '36 hours',
      lessons: 98,
      price: 99.99,
      image: '/placeholder.svg',
      level: 'All Levels',
      category: 'English',
      tags: ['Grammar', 'Writing', 'Literature'],
      aiRecommended: false,
      bestseller: true
    },
    {
      id: 4,
      title: 'Biology Fundamentals to Advanced',
      instructor: 'Dr. Peter Mwanza',
      rating: 4.6,
      reviews: 987,
      students: 5432,
      duration: '42 hours',
      lessons: 124,
      price: 129.99,
      image: '/placeholder.svg',
      level: 'Beginner',
      category: 'Science',
      tags: ['Biology', 'Anatomy', 'Ecology'],
      aiRecommended: true,
      bestseller: false
    },
  ];

  const trendingSearches = [
    'Quadratic equations', 'ECZ past papers', 'Chemistry reactions', 
    'Essay writing', 'Physics formulas', 'Biology diagrams'
  ];

  const filters = {
    levels: ['All Levels', 'Beginner', 'Intermediate', 'Advanced'],
    categories: ['All', 'Mathematics', 'Science', 'English', 'History', 'Technology'],
    ratings: ['4.5 & up', '4.0 & up', '3.5 & up', 'All']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Course Catalog
        </h1>
        <p className="text-muted-foreground mt-1">Discover AI-curated courses tailored for you</p>
      </motion.div>

      {/* AI-Powered Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium">AI-Powered Search</span>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Try: 'I want to prepare for ECZ Grade 12 math exams' or 'Help me understand physics better'"
                className="pl-12 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Trending:</span>
              {trendingSearches.map((term, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-64 hidden lg:block"
        >
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filters.categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Level</label>
                <div className="space-y-2">
                  {filters.levels.map((level) => (
                    <div key={level} className="flex items-center gap-2">
                      <input type="checkbox" id={level} className="rounded" />
                      <label htmlFor={level} className="text-sm">{level}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: K{priceRange[0]} - K{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <Select defaultValue="4.5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {filters.ratings.map((rating) => (
                      <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Features */}
              <div>
                <label className="text-sm font-medium mb-2 block">Features</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="ai-rec" className="rounded" />
                    <label htmlFor="ai-rec" className="text-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-primary" /> AI Recommended
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="certificate" className="rounded" />
                    <label htmlFor="certificate" className="text-sm flex items-center gap-1">
                      <Award className="w-3 h-3" /> With Certificate
                    </label>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Course Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{courses.length}</span> courses
            </p>
            <div className="flex items-center gap-2">
              <Select defaultValue="popular">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rated">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all overflow-hidden group">
                  <div className={viewMode === 'list' ? 'flex' : ''}>
                    {/* Image */}
                    <div className={`relative bg-gradient-to-br from-primary/20 to-primary/5 ${viewMode === 'list' ? 'w-64 h-40' : 'h-40'}`}>
                      <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform" />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-2">
                        {course.bestseller && (
                          <Badge className="bg-yellow-500">Bestseller</Badge>
                        )}
                        {course.aiRecommended && (
                          <Badge variant="secondary" className="gap-1">
                            <Sparkles className="w-3 h-3" /> AI Pick
                          </Badge>
                        )}
                      </div>
                      
                      {/* Wishlist */}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>

                      {/* Preview Button */}
                      <Button 
                        size="sm"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="w-4 h-4 mr-1" /> Preview
                      </Button>
                    </div>

                    {/* Content */}
                    <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="outline" className="mb-2">{course.category}</Badge>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold">{course.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({course.reviews.toLocaleString()} reviews)
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" /> {course.students.toLocaleString()}
                        </span>
                      </div>

                      {/* Course Info */}
                      <div className="flex flex-wrap gap-3 mb-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" /> {course.lessons} lessons
                        </span>
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">K {course.price}</span>
                        <Button>
                          Enroll Now <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalogPage;
