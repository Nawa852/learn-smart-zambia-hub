
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, TrendingUp, Search, Upload } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent mb-6">
            Welcome to EduZambia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your AI-powered educational companion for Zambian curricula
          </p>
          <Button 
            onClick={() => navigate('/study-materials')}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>Access thousands of ECZ and Cambridge materials</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/study-materials')}
                className="w-full"
              >
                Browse Materials
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>AI Search</CardTitle>
              <CardDescription>Search in multiple Zambian languages</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/study-materials')}
                variant="outline"
                className="w-full"
              >
                Try AI Search
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Upload className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Share Knowledge</CardTitle>
              <CardDescription>Upload and share your study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/study-materials')}
                variant="outline"
                className="w-full"
              >
                Upload Materials
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
