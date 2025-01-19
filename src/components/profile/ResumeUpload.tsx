import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DocumentUpload from './DocumentUpload';
import { getResume, updateResume } from '../../utils/resume';
import type { Resume } from '../../types/profile';

export default function ResumeUpload() {
  const { user } = useAuth();
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadResume();
    }
  }, [user]);

  const loadResume = async () => {
    try {
      const resume = await getResume(user!.id);
      setCurrentResume(resume);
    } catch (error) {
      console.error('Error loading resume:', error);
      setError('Failed to load resume');
    }
  };

  const handleResumeUpdate = async (content: string, type: 'content' | 'file_url' | 'link_url') => {
    if (!user) return;
    try {
      setError(null);
      const updatedResume = await updateResume(user.id, { [type]: content });
      setCurrentResume(updatedResume);
      // Force reload resume status
      await loadResume();
    } catch (error: any) {
      console.error('Error updating resume:', error);
      setError(error.message || 'Failed to update resume');
      throw error;
    }
  };

  return (
    <DocumentUpload
      title="Resume"
      instruction="Provide complete details in the resume"
      onUpload={handleResumeUpdate}
      currentValue={currentResume?.content || currentResume?.file_url || currentResume?.link_url}
      error={error}
    />
  );
}