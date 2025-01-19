import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DocumentUpload from './DocumentUpload';
import { getJobDescription, updateJobDescription } from '../../utils/jobDescription';
import type { JobDescription } from '../../types/profile';

export default function JobDescriptionUpload() {
  const { user } = useAuth();
  const [currentJD, setCurrentJD] = useState<JobDescription | null>(null);

  useEffect(() => {
    if (user) {
      loadJobDescription();
    }
  }, [user]);

  const loadJobDescription = async () => {
    try {
      const jd = await getJobDescription(user!.id);
      setCurrentJD(jd);
    } catch (error) {
      console.error('Error loading job description:', error);
    }
  };

  const handleJDUpdate = async (content: string, type: 'content' | 'file_url' | 'link_url') => {
    if (!user) return;
    try {
      const updatedJD = await updateJobDescription(user.id, { [type]: content });
      setCurrentJD(updatedJD);
    } catch (error) {
      console.error('Error updating job description:', error);
      throw error;
    }
  };

  return (
    <DocumentUpload
      title="Job Description"
      instruction="Provide the complete JD - Role, Company name, Company details for better results"
      onUpload={handleJDUpdate}
      currentValue={currentJD?.content || currentJD?.file_url || currentJD?.link_url}
    />
  );
}