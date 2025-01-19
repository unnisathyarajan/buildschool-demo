import React from 'react';
import { FileText, BarChart, Target } from 'lucide-react';
import ProfileStatus from '../../components/profile/ProfileStatus';
import AnalyzeButton from '../../components/profile/AnalyzeButton';

interface ProfileAnalysisPageProps {
  onNavigateToSkills?: () => void;
}

export default function ProfileAnalysisPage({ onNavigateToSkills }: ProfileAnalysisPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Profile Analysis
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Gain deep insights into your professional profile, identifying unique strengths and opportunities for growth.
          </p>
        </div>

        <div className="w-full mb-12">
          <ProfileStatus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume Enhancement</h3>
            <p className="text-gray-600">
              Unlock actionable recommendations to highlight your skills, optimize your resume, and stand out to recruiters.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <BarChart className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience Mapping</h3>
            <p className="text-gray-600">
              Track your career trajectory, visualize milestones, and uncover potential growth pathways.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Goals Alignment</h3>
            <p className="text-gray-600">
              Strategically align your professional profile with your aspirations to achieve your dream career.
            </p>
          </div>
        </div>

        <div className="w-full mb-12">
          <div className="bg-white p-12 rounded-xl shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Unlock Your Career Potential?</h2>
              <p className="text-gray-600 mb-8">
                Get personalized insights and actionable recommendations to accelerate your career growth.
              </p>
              <AnalyzeButton onNavigateToSkills={onNavigateToSkills} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}