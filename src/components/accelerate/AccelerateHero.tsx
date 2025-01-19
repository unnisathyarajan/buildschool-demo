import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AccelerateHero() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Sparkles className="h-12 w-12 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Sparx Your Career
        </h1>
        <h2 className="text-xl md:text-2xl text-indigo-600 font-medium mb-6">
          Align Your Potential, Perfect Your Profile, and Land Your Dream Role
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Just as horoscopes reveal insights through celestial alignments, analyzing your resume alongside 
          the job description and organization unveils how your professional "stars"—skills, achievements, 
          and experience—align with the job's "constellation" of requirements and values. It's your 
          personalized "career astrology" for success!
        </p>
      </div>
    </div>
  );
}