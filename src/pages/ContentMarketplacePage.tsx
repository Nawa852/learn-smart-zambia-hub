import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Star, Search, Filter, Heart, Eye, Download,
  DollarSign, CreditCard, TrendingUp, Award, BookOpen, Video,
  FileText, Users, Clock, Tag, ChevronRight, Plus, Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ContentMarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredCourses = [
    {
      id: 1,
      title: 'Complete ECZ Grade 12 Mathematics',
      instructor: 'Prof. Banda',
      price: 149.99,
      originalPrice: 299.99,
      rating: 4.9,
      reviews: 1234,
      students: 5678,
      image: '/placeholder.svg',
      badge: 'Bestseller',
      category: 'Mathematics'
    },
    {
      id: 2,
      title: 'Advanced Science Bundle',
      instructor: 'Dr. Tembo',
      price: 199.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 892,
      students: 3456,
      image: '/placeholder.svg',
      badge: 'New',
      category: 'Science'
    },
    {
      id: 3,
      title: 'English Excellence Program',
      instructor: 'Ms. Phiri',
      price: 99.99,
      originalPrice: 199.99,
      rating: 4.7,
      reviews: 567,
      students: 2345,
      image: '/placeholder.svg',
      badge: 'Top Rated',
      category: 'English'
    },
  ];

  const categories = [
    { name: 'Mathematics', count: 156, icon: '📐' },
    { name: 'Science', count: 134, icon: '🔬' },
    { name: 'English', count: 98, icon: '📚' },
    { name: 'History', count: 67, icon: '🏛️' },
    { name: 'Technology', count: 89, icon: '💻' },
    { name: 'Languages', count: 45, icon: '🌍' },
  ];

  const subscriptionPlans = [
    {
      name: 'Basic',
      price: 29.99,
      period: 'month',
      features: ['Access to 100+ courses', 'Basic analytics', 'Email support']
    },
    {
      name: 'Pro',
      price: 79.99,
      period: 'month',
      features: ['Unlimited courses', 'Advanced analytics', 'Priority support', 'Offline access'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 199.99,
      period: 'month',
      features: ['Everything in Pro', 'Custom branding', 'API access', 'Dedicated manager']
    },
  ];

  const sellerStats = [
    { label: 'Total Earnings', value: 'K 15,234', icon: DollarSign, color: 'text-green-500' },
    { label: 'Courses Sold', value: '234', icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Active Students', value: '1,567', icon: Users, color: 'text-purple-500' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Content Marketplace
            </h1>
            <p className="text-muted-foreground mt-1">Buy, sell, and discover educational content</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Heart className="w-4 h-4 mr-2" /> Wishlist
            </Button>
            <Button variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" /> Cart (2)
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Sell Content
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, instructors, topics..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name.toLowerCase()}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" /> More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="my-content">My Content</TabsTrigger>
          <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          {/* Categories */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer group text-center">
                  <CardContent className="p-4">
                    <span className="text-3xl mb-2 block">{category.icon}</span>
                    <p className="font-medium group-hover:text-primary transition-colors">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.count} courses</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Featured Courses */}
          <h2 className="text-2xl font-bold mb-4">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all overflow-hidden group">
                  <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5">
                    <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-primary/30" />
                    {course.badge && (
                      <Badge className="absolute top-2 left-2">{course.badge}</Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({course.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold">K {course.price}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          K {course.originalPrice}
                        </span>
                      </div>
                      <Button size="sm">
                        <ShoppingCart className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">K {plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <ul className="space-y-2 mb-6 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-content">
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No purchased content yet</h3>
              <p className="text-muted-foreground mb-4">
                Browse the marketplace to find courses and content
              </p>
              <Button>Browse Marketplace</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seller">
          {/* Seller Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {sellerStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredCourses.slice(0, 2).map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {course.students} students • K {course.price}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" /> Manage
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" /> Add New Product
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payout Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Available Balance</span>
                      <span className="text-xl font-bold text-green-500">K 3,456.78</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Next payout: Dec 15, 2024
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <CreditCard className="w-4 h-4 mr-2" /> Withdraw
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentMarketplacePage;
