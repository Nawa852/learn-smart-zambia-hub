
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">EDU ZAMBIA</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering Zambian students with world-class education through innovative technology and personalized learning experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-6">
              To democratize quality education in Zambia by providing accessible, affordable, and innovative learning solutions that prepare students for the future.
            </p>
            <p className="text-gray-600 text-lg">
              We believe every Zambian student deserves access to excellent education, regardless of their location or economic background.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full h-64 bg-blue-200 rounded-lg flex items-center justify-center">
              <Globe className="h-24 w-24 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Quality Content</CardTitle>
              <CardDescription>
                Curriculum-aligned courses designed by expert educators
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Community Learning</CardTitle>
              <CardDescription>
                Connect with peers and educators in a supportive environment
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Recognized Certificates</CardTitle>
              <CardDescription>
                Earn certificates that are valued by employers and institutions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of Zambian students already transforming their futures.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="px-8">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
