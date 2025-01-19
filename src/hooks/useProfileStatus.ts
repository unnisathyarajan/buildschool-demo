import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getResume } from '../utils/resume';
import { getJobDescription } from '../utils/jobDescription';

export function useProfileStatus() {
  const { user } = useAuth();
  const [resumeStatus, setResumeStatus] = useState(false);
  const [jobDescriptionStatus, setJobDescriptionStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStatus() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [resume, jobDescription] = await Promise.all([
          getResume(user.id),
          getJobDescription(user.id)
        ]);

        // Check for any valid content in resume
        const hasResumeContent = Boolean(
          resume?.content || 
          resume?.file_url || 
          resume?.link_url
        );
        setResumeStatus(hasResumeContent);

        // Check for any valid content in job description
        const hasJobDescription = Boolean(
          jobDescription?.content || 
          jobDescription?.file_url || 
          jobDescription?.link_url
        );
        setJobDescriptionStatus(hasJobDescription);
      } catch (error) {
        console.error('Error loading profile status:', error);
        // Reset status on error
        setResumeStatus(false);
        setJobDescriptionStatus(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadStatus();
  }, [user]);

  return {
    resumeStatus,
    jobDescriptionStatus,
    isLoading
  };
}