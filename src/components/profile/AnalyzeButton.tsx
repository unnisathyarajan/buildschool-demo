import React, { useState } from 'react';
import { Stars, Loader2, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { analyzeAlignment } from '../../utils/openai';
import { getResume } from '../../utils/resume';
import ProfileShapeVisual from './ProfileShapeVisual';

interface AnalyzeButtonProps {
  onNavigateToSkills?: () => void;
}

export default function AnalyzeButton({ onNavigateToSkills }: AnalyzeButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string | null>(null);
  const [profileShape, setProfileShape] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!user) {
      setError('Please sign in to analyze your resume');
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      const resume = await getResume(user.id);
      
      if (!resume?.content) {
        setError('Please upload your resume first');
        return;
      }

      const analysisResult = await analyzeAlignment(resume.content, user);
      setResult(analysisResult || '');
      
      // Extract profile shape from analysis result
      const shapeMatch = analysisResult?.match(/Your profile shape is: (\w+)/i);
      if (shapeMatch && shapeMatch[1]) {
        setProfileShape(shapeMatch[1].toLowerCase());
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      setError(error.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderMLKQuote = () => {
    if (!result) return null;

    const quoteMatch = result.match(/Quote for you from Digital 'Martin Luther King' of New World\s*([\s\S]*?)(?=\n\n|\n?$)/);
    if (!quoteMatch) return null;

    return (
      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-8 my-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg flex-shrink-0">
            <img
              src="./Media/Images/mlk.jpg"
              alt="Martin Luther King Jr."
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Quote for You from Digital 'Martin Luther King' of New World
            </h3>
            <blockquote className="text-lg italic text-gray-700 border-l-4 border-indigo-600 pl-6">
              {quoteMatch[1].trim()}
            </blockquote>
          </div>
        </div>
      </div>
    );
  };

  const formatAnalysisContent = (content: string) => {
    // Remove the MLK quote section as it's handled separately
    const contentWithoutQuote = content.replace(/Quote for you from Digital 'Martin Luther King' of New World[\s\S]*?(?=\n\n|\n?$)/, '');
    
    // Split into sections
    const sections = contentWithoutQuote.split('\n\n');
    
    return sections.map((section, index) => {
      // Handle bullet points
      if (section.includes('- ')) {
        const [title, ...items] = section.split('\n');
        return (
          <div key={index} className="mb-8">
            {title && <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>}
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1.5">•</span>
                  <span className="text-gray-700">{item.replace('- ', '')}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 mb-6 leading-relaxed">
          {section}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-indigo-50 py-8">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700 mb-8 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-center mb-12">
          <button
            onClick={handleAnalysis}
            disabled={loading}
            className="bg-indigo-600 text-white px-10 py-4 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 disabled:bg-indigo-300 disabled:scale-100 flex items-center justify-center gap-2 text-base font-semibold shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing Your Resume...</span>
              </>
            ) : (
              <>
                <span>Analyze My Resume Now!</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="space-y-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-indigo-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Your Professional Analysis</h2>
              </div>
              
              <div className="p-8 lg:p-12">
                {profileShape && (
                  <div className="mb-12">
                    <ProfileShapeVisual shape={profileShape} />
                  </div>
                )}
                
                {renderMLKQuote()}
                
                <div className="prose max-w-none">
                  {formatAnalysisContent(result)}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 py-18 px-18 rounded-2xl shadow-lg text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h3>
                <p className="text-xl opacity-90 mb-8 leading-relaxed">
                  Discover how aligned you are with your dream roles! Begin your skill assessment 
                  and let our AI-driven analysis guide your next career move with actionable insights 
                  and motivation to succeed.
                </p>
                <button 
                  onClick={onNavigateToSkills}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all flex items-center gap-2 text-base shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto"
                >
                  Begin my Skill Assessment
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}