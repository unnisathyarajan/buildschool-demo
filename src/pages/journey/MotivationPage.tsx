import React from 'react';
import { Brain, Target, Award } from 'lucide-react';

export default function MotivationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Motivation & Interview Preparation</h1>
          <p className="mt-4 text-xl text-gray-600">
            Get mentally prepared and ace your interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold">Interview Techniques</h3>
            </div>
            <p className="text-gray-600">
              Master proven interview techniques and strategies
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold">Success Stories</h3>
            </div>
            <p className="text-gray-600">
              Learn from successful candidates' experiences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}