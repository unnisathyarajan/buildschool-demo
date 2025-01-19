import { supabase } from './supabase';
import { User } from '../types/auth';

export interface SkillAssessment {
  id: string;
  user_id: string;
  resume_content: string;
  job_description: string | null;
  assessment_result: any;
  ats_score: number | null;
  gauge_chart_data: any;
  created_at: string;
}

export async function saveSkillAssessment(
  userId: string,
  resumeContent: string,
  jobDescription: string | null,
  assessmentResult: any,
  atsScore: number | null = null,
  gaugeChartData: any = null
): Promise<SkillAssessment> {
  const { data, error } = await supabase
    .from('skill_assessments')
    .insert([{
      user_id: userId,
      resume_content: resumeContent,
      job_description: jobDescription,
      assessment_result: assessmentResult,
      ats_score: atsScore,
      gauge_chart_data: gaugeChartData
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving skill assessment:', error);
    throw new Error('Failed to save skill assessment');
  }

  return data;
}

export async function getLatestSkillAssessment(userId: string): Promise<SkillAssessment | null> {
  const { data, error } = await supabase
    .from('skill_assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching skill assessment:', error);
    throw new Error('Failed to fetch skill assessment');
  }

  return data;
}

export async function getSkillAssessments(user: User): Promise<SkillAssessment[]> {
  const { data, error } = await supabase
    .from('skill_assessments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching skill assessments:', error);
    throw new Error('Failed to fetch skill assessments');
  }

  return data || [];
}