import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface AnalysisResultProps {
  loading: boolean;
  error?: string;
  result?: string;
}

export default function AnalysisResult({ loading, error, result }: AnalysisResultProps) {
  const handleRevampResume = () => {
    // Logic for resume revamp will be implemented here
    console.log('Revamping resume');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-2 text-gray-600">Analyzing your career alignment...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-lg shadow-lg">
        <h3 className="font-semibold text-red-600 mb-2">Analysis Error</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80"
            alt="Career Alignment"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Cosmic Career Alignment
            </h3>
            <p className="text-gray-600">
              Like stars aligning in the night sky, your perfect job match happens when your 
              professional constellation perfectly aligns with an organization's needs.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
            alt="Professional Growth"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Your Professional Zodiac
            </h3>
            <p className="text-gray-600">
              Discover how your skills and experiences create your unique professional 
              constellation and how it matches with your dream role.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="prose max-w-none p-8 bg-white rounded-lg shadow-lg">
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ 
          __html: result
            .replace(/\n/g, '<br/>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/#{3} (.*?)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
            .replace(/#{2} (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
            .replace(/#{1} (.*?)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-6">$1</h1>')
        }} 
      />
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={handleRevampResume}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Revamp my resume
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="text-sm text-gray-600 text-center max-w-md">
          Click to get an ATS-optimized version of your resume and see the improvement in your alignment score
        </p>
      </div>
    </div>
  );
}