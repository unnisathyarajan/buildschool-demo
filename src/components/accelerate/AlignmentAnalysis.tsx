import React, { useState, useEffect } from 'react';
import { Stars, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { assessSkills } from '../../utils/openai';
import { getResume } from '../../utils/resume';
import { getJobDescription } from '../../utils/jobDescription';
import UpdateResumeButton from './UpdateResumeButton';
import ResumeUpdateModal from './ResumeUpdateModal';
import ATSGaugeChart from './ATSGaugeChart';
import { saveSkillAssessment, getLatestSkillAssessment } from '../../utils/skillAssessment';

export default function AlignmentAnalysis() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string>();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedResume, setUpdatedResume] = useState<string>();
  const [updating, setUpdating] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  // Load the latest assessment on component mount
  useEffect(() => {
    if (user) {
      loadLatestAssessment();
    }
  }, [user]);

  const loadLatestAssessment = async () => {
    try {
      const assessment = await getLatestSkillAssessment(user!.id);
      if (assessment) {
        setResult(assessment.assessment_result);
        setAtsScore(assessment.ats_score);
      }
    } catch (err) {
      console.error('Error loading latest assessment:', err);
    }
  };

  const getScoreDescription = (score: number | null): string => {
    if (!score) return '';
    if (score >= 80) {
      return "Excellent! Your resume is well-optimized for ATS systems.";
    }
    if (score >= 60) {
      return "Good start, but there's room for improvement.";
    }
    return "Your resume needs optimization to better align with ATS requirements.";
  };

  const getScoreColor = (score: number | null): string => {
    if (!score) return 'gray';
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  const handleAnalysis = async () => {
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

      const assessmentResult = await assessSkills(
        resume.content,
        jobDescription?.content || null,
        user
      );
      
      // Extract ATS score from the assessment result
      const scoreMatch = assessmentResult.match(/ATS Score: (\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
      setAtsScore(score);
      
      setResult(assessmentResult);

      // Save the assessment result including ATS score and gauge chart data
      await saveSkillAssessment(
        user.id,
        resume.content,
        jobDescription?.content || null,
        assessmentResult,
        score,
        {
          score,
          color: getScoreColor(score),
          description: getScoreDescription(score)
        }
      );
    } catch (err: any) {
      setError(err.message || 'Failed to analyze alignment. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateResume = async () => {
    if (!user) return;
    
    try {
      setUpdating(true);
      const resume = await getResume(user.id);
      const jobDescription = await getJobDescription(user.id);
      
      if (!resume?.content) {
        throw new Error('Resume not found');
      }

      const updatedContent = await updateResume(
        resume.content,
        jobDescription?.content || null,
        user
      );

      setUpdatedResume(updatedContent);
      setShowUpdateModal(true);
    } catch (err: any) {
      setError(err.message || 'Failed to update resume');
      console.error('Update error:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Stars className="h-8 w-8 text-indigo-600" />
              <h3 className="text-2xl font-semibold text-gray-900">
                Career Astrology
              </h3>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Just as horoscopes reveal insights through celestial alignments, analyzing your resume alongside 
              the job description and organization unveils how your professional "stars"—skills, achievements, 
              and experience—align with the job's "constellation" of requirements and values. It's your 
              personalized "career astrology" for success!
            </p>

            <button
              onClick={handleAnalysis}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 disabled:bg-indigo-300 disabled:scale-100 flex items-center justify-center gap-3 text-lg font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Analyzing Your Career Alignment...
                </>
              ) : (
                'Reveal Your Career Alignment'
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {atsScore !== null && (
            <div className="mb-8">
              <ATSGaugeChart score={atsScore} />
            </div>
          )}

          {result && (
            <>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 px-8 py-4">
                  <h2 className="text-2xl font-bold text-white">Your Career Alignment Analysis</h2>
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

              <div className="flex justify-center">
                <UpdateResumeButton 
                  onClick={handleUpdateResume}
                  className={updating ? 'opacity-50 cursor-not-allowed' : ''}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <ResumeUpdateModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        loading={updating}
        content={updatedResume || ''}
      />
    </div>
  );
}