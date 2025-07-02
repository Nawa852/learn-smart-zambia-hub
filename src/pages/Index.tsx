
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ExpandedFeaturesSection from '@/components/ExpandedFeaturesSection';
import CoursesPreview from '@/components/CoursesPreview';
import Footer from '@/components/Footer';
import EduBrowseButton from '@/components/EduBrowse/EduBrowseButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section with Edu Browse Button */}
        <section className="relative">
          <HeroSection />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <EduBrowseButton />
          </div>
        </section>
        
        {/* Edu Zambia Platform Highlight */}
        <section className="py-16 bg-gradient-to-r from-green-100 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              🇿🇲 Welcome to Edu Zambia
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              The world's most comprehensive e-learning platform with 350 AI-powered features 
              across 35 specialized pages, fully aligned with Zambia's Educational Curriculum (ECZ) 
              and supporting all 7 official Zambian languages.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-600 mb-2">350+</h3>
                <p className="text-gray-600">AI-Powered Features</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">85</h3>
                <p className="text-gray-600">Specialized Pages</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">16+</h3>
                <p className="text-gray-600">AI Models</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">7</h3>
                <p className="text-gray-600">Zambian Languages</p>
              </div>
            </div>
            <EduBrowseButton />
          </div>
        </section>
        
        <FeaturesSection />
        <ExpandedFeaturesSection />
        <CoursesPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
