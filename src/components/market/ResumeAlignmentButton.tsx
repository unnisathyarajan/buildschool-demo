import React, { useState, useEffect } from 'react';
import { FileEdit, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from '../../hooks/useNavigate';
import ResumeUpdateModal from './ResumeUpdateModal';
import { generateUpdatedResume } from '../../utils/resume';
import { getLatestSkillAssessment } from '../../utils/skillAssessment';

export default function ResumeAlignmentButton({ className = '' }: { className?: string }) {
  const { user } = useAuth();
  const { navigateTo } = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<{
    content: string;
    beforeScore: number;
    afterScore: number;
  } | null>(null);

  // Check if we have a skill assessment before allowing resume update
  useEffect(() => {
    const checkSkillAssessment = async () => {
      if (user) {
        try {
          const assessment = await getLatestSkillAssessment(user.id);
          if (!assessment) {
            setError('Please analyze your resume first before attempting to update it');
          }
        } catch (err) {
          console.error('Error checking skill assessment:', err);
        }
      }
    };
    
    checkSkillAssessment();
  }, [user]);

  const handleAlignment = async () => {
    if (!user) {
      setError('Please sign in to continue');
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      
      const result = await generateUpdatedResume(user);
      setOptimizationResult(result);
      setShowModal(true);
      
      // Store the result in localStorage for persistence
      localStorage.setItem('lastOptimizationResult', JSON.stringify(result));

      // Navigate to Skill Alignment page after successful update
      navigateTo('market');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update resume. Please try again.';
      setError(errorMessage);
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load last result from localStorage on component mount
  useEffect(() => {
    const lastResult = localStorage.getItem('lastOptimizationResult');
    if (lastResult) {
      setOptimizationResult(JSON.parse(lastResult));
    }
  }, []);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <button
          onClick={handleAlignment}
          disabled={loading || !user}
          className={`relative flex items-center justify-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 disabled:bg-indigo-300 disabled:scale-100 font-semibold shadow-lg group ${className}`}
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-lg">Updating Resume...</span>
            </>
          ) : (
            <>
              <FileEdit className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span className="text-lg">Update my Resume</span>
            </>
          )}
        </button>
      </div>

      {optimizationResult && (
        <ResumeUpdateModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            navigateTo('market'); // Navigate when modal is closed
          }}
          content={optimizationResult.content}
          beforeScore={optimizationResult.beforeScore}
          afterScore={optimizationResult.afterScore}
        />
      )}
    </div>
  );
}