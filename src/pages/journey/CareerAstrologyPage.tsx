import React, { useState } from 'react';
import { Stars, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchLatestResults, saveAstrologyResults } from '../../utils/careerAstrology';
import ResultsDisplay from '../../components/astrology/ResultsDisplay';

export default function CareerAstrologyPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [results, setResults] = useState<any>(null);

  const handleReveal = async () => {
    if (!user) {
      setError('Please sign in to continue');
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      
      const astrologyResults = await fetchLatestResults(user.id);
      await saveAstrologyResults(user, astrologyResults);
      setResults(astrologyResults);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch results. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur"></div>
                <Stars className="h-16 w-16 text-indigo-600 relative" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Sparx Your Career</h1>
            <h2 className="text-2xl text-indigo-600 font-medium mb-8">
              Align Your Potential, Perfect Your Profile, and Land Your Dream Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Just as horoscopes reveal insights through celestial alignments, analyzing your resume alongside 
              the job description and organization unveils how your professional "stars"—skills, achievements, 
              and experience—align with the job's "constellation" of requirements and values.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">Your Career Constellation</h3>
            </div>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl">
              Our advanced analysis system examines the alignment between your professional profile and target roles,
              providing detailed insights and actionable recommendations to enhance your career trajectory.
            </p>

            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <button
                  onClick={handleReveal}
                  disabled={loading}
                  className="relative flex items-center justify-center gap-3 bg-indigo-600 text-white px-12 py-4 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 disabled:bg-indigo-300 disabled:scale-100 text-lg font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Revealing Your Career Astrology...
                    </>
                  ) : (
                    <>
                      <Stars className="h-6 w-6" />
                      Reveal My Career Astrology
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-50 text-red-600 px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
            {error}
          </div>
        )}

        {results && (
          <div className="mb-16">
            <ResultsDisplay results={results} />
          </div>
        )}
      </div>
    </div>
  );
}