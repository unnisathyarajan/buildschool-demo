import { supabase } from './supabase';
import type { JobDescription } from '../types/profile';

export async function getJobDescription(userId: string): Promise<JobDescription | null> {
  try {
    const { data, error } = await supabase
      .from('job_descriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No data found
      }
      throw supabase.handleError(error);
    }
    return data;
  } catch (error) {
    console.error('Error fetching job description:', error);
    return null;
  }
}

export async function updateJobDescription(
  userId: string,
  data: {
    content?: string;
    company_name?: string;
    role?: string;
    file_url?: string;
    link_url?: string;
  }
): Promise<JobDescription> {
  try {
    const { data: jobDescription, error } = await supabase
      .from('job_descriptions')
      .upsert({ 
        user_id: userId,
        ...data,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw supabase.handleError(error);
    return jobDescription;
  } catch (error) {
    console.error('Error updating job description:', error);
    throw error;
  }
}