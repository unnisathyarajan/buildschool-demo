import { supabase } from './supabase';

export interface UpdatedResume {
  id: string;
  user_id: string;
  original_resume_content: string;
  job_description: string | null;
  updated_content: string;
  created_at: string;
}

export async function saveUpdatedResume(
  userId: string,
  originalContent: string,
  jobDescription: string | null,
  updatedContent: string
): Promise<UpdatedResume> {
  const { data, error } = await supabase
    .from('updated_resumes')
    .insert([{
      user_id: userId,
      original_resume_content: originalContent,
      job_description: jobDescription,
      updated_content: updatedContent
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving updated resume:', error);
    throw new Error('Failed to save updated resume');
  }

  return data;
}

export async function getUpdatedResumes(userId: string): Promise<UpdatedResume[]> {
  const { data, error } = await supabase
    .from('updated_resumes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching updated resumes:', error);
    throw new Error('Failed to fetch updated resumes');
  }

  return data || [];
}