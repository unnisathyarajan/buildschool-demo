import React, { useState } from 'react';
import { MessageSquare, Mail, PenTool, TrendingUp, Users, DollarSign, Brain, Star, MessageCircle, Briefcase, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getResume } from '../../utils/resume';
import { getJobDescription } from '../../utils/jobDescription';
import { analyzeIndustryInsights } from '../../utils/industryInsights';

export default function CommunicationPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string>();

  const handleInsightsAnalysis = async () => {
    if (!user) {
      setError('Please sign in to continue');
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      
      const [resume, jobDescription] = await Promise.all([
        getResume(user.id),
        getJobDescription(user.id)
      ]);
      
      if (!resume?.content) {
        setError('Please upload your resume first');
        return;
      }

      if (!jobDescription?.content) {
        setError('Please upload a job description first');
        return;
      }

      const insights = await analyzeIndustryInsights(
        resume.content,
        jobDescription.content,
        user
      );
      
      setResult(insights);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze insights. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Industry Insights</h1>
          <p className="mt-4 text-xl text-gray-600">
            The market is evolving—are you? Click 'Discover My Market Alignment' to understand how your skills and profile stack up in today's industry. Get insights, discover opportunities, and align yourself for success!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: TrendingUp, title: "Industry Trends", description: "Stay updated with the latest industry trends and demands" },
            { icon: Users, title: "Competition Analysis", description: "Benchmark your profile against industry standards" },
            { icon: DollarSign, title: "Salary Insights", description: "Get detailed salary insights for your target roles" },
            { icon: Brain, title: "Common Questions", description: "Practice answers to frequently asked interview questions" },
            { icon: Star, title: "Get Inspired", description: "Get inspired by motivational speakers of history of all time" },
            { icon: MessageCircle, title: "Grow with Feedback", description: "Connect with Career resiliency coach for better stability" },
            { icon: MessageSquare, title: "Communication Strategy", description: "Develop effective communication strategies" },
            { icon: Mail, title: "Email Templates", description: "Access professional email templates for various scenarios" },
            { icon: PenTool, title: "Cover Letters", description: "Create compelling cover letters with our proven templates" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <item.icon className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="w-full mb-12">
          <div className="bg-white p-12 rounded-xl shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <button
                onClick={handleInsightsAnalysis}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 font-semibold shadow-lg text-lg disabled:bg-indigo-300 disabled:scale-100 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Analyzing Industry Insights...
                  </>
                ) : (
                  <>
                    <Briefcase className="h-6 w-6" />
                    Craft My Job Insights
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="w-full mb-12">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-2xl mx-auto">
              {error}
            </div>
          </div>
        )}

        {result && (
          <div className="w-full mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-indigo-600 px-8 py-4">
                <h2 className="text-2xl font-bold text-white">Your Industry Insights</h2>
              </div>
              <div className="p-8">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: result
                      .replace(/\n/g, '<br/>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-700">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/#{3} (.*?)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-indigo-900">$1</h3>')
                      .replace(/#{2} (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-indigo-900">$1</h2>')
                      .replace(/#{1} (.*?)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-6 text-indigo-900">$1</h1>')
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}