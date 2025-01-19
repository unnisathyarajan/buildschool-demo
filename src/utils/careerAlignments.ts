import { supabase } from './supabase';
import type { CareerAlignment, SaveCareerAlignmentParams } from '../types/careerAlignments';

export async function saveCareerAlignment({
  userId,
  resumeContent,
  jobDescription,
  analysisResult,
  alignmentScore
}: SaveCareerAlignmentParams): Promise<CareerAlignment> {
  const { data, error } = await supabase
    .from('career_alignments')
    .insert([{
      user_id: userId,
      resume_content: resumeContent,
      job_description: jobDescription,
      analysis_result: analysisResult,
      alignment_score: alignmentScore,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving career alignment:', error);
    throw new Error('Failed to save career alignment');
  }

  return data;
}

export async function getCareerAlignments(userId: string): Promise<CareerAlignment[]> {
  const { data, error } = await supabase
    .from('career_alignments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching career alignments:', error);
    throw new Error('Failed to fetch career alignments');
  }

  return data || [];
}