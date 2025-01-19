import React from 'react';
import { Brain, Target, Award, TrendingUp, Users, DollarSign } from 'lucide-react';
import ResumeAlignmentButton from '../../components/market/ResumeAlignmentButton';
import MarketResearchButton from '../../components/market/MarketResearchButton';

export default function MarketAlignmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Skill Alignment</h1>
          <p className="mt-4 text-xl text-gray-600">
            The market is evolving—are you? Discover how your skills and profile stack up in today's industry. 
            Get insights, discover opportunities, and align yourself for success!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Gap Analysis</h3>
            <p className="text-gray-600">
              Identify key skills needed for your target roles and get personalized development plans.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Role Alignment</h3>
            <p className="text-gray-600">
              Match your profile with ideal roles and understand your career trajectory.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth Potential</h3>
            <p className="text-gray-600">
              Discover opportunities for advancement and skill development in your field.
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div className="w-full mb-12">
          <div className="bg-white p-12 rounded-xl shadow-lg">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Align Your Career?</h2>
                <p className="text-gray-600">
                  Take the first step towards optimizing your professional profile and discovering your true potential.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex flex-col items-center">
                  <ResumeAlignmentButton />
                </div>
                <div className="flex flex-col items-center">
                  <MarketResearchButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Market Trends</h3>
            </div>
            <p className="text-gray-600">
              Stay updated with the latest industry trends and skill demands.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Peer Insights</h3>
            </div>
            <p className="text-gray-600">
              Learn from successful professionals in your target roles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}