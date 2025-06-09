
import React from 'react';
import MultilingualTranslator from '@/components/AI/MultilingualTranslator';

const MultilingualTranslatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Multilingual Course Translator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered course translation supporting multiple languages for global learning accessibility
          </p>
        </div>
        <MultilingualTranslator />
      </div>
    </div>
  );
};

export default MultilingualTranslatorPage;
