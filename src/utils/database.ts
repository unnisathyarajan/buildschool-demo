import { supabase } from './supabase';
import { User } from '../types/auth';

export interface AnalysisResult {
  id: string;
  user_id: string;
  resume_content: string;
  job_description: string | null;
  analysis_result: {
    profile_shape: string;
    ats_score: number;
    professional_summary: {
      years_experience: number;
      top_skills: string[];
      eligible_roles: string[];
    };
    mlk_quote: string;
    recommendations: string[];
  };
  created_at: string;
}

export async function saveAnalysisResult(
  userId: string,
  resumeContent: string,
  jobDescription: string | null,
  analysisResult: any
): Promise<AnalysisResult> {
  try {
    // Parse the analysis result to extract structured data
    const profileShape = analysisResult.match(/Your profile shape is: (\w+)/i)?.[1] || '';
    const atsScore = parseInt(analysisResult.match(/ATS Score: (\d+)/)?.[1] || '0');
    const mlkQuote = analysisResult.match(/Quote for you from Digital 'Martin Luther King' of New World\s*([\s\S]*?)(?=\n\n|\n?$)/)?.[1]?.trim() || '';

    // Structure the data for storage
    const structuredResult = {
      profile_shape: profileShape,
      ats_score: atsScore,
      professional_summary: {
        years_experience: 0, // Extract from analysis
        top_skills: [], // Extract from analysis
        eligible_roles: [] // Extract from analysis
      },
      mlk_quote: mlkQuote,
      recommendations: [] // Extract from analysis
    };

    const { data, error } = await supabase
      .from('analysis_results')
      .insert([
        {
          user_id: userId,
          resume_content: resumeContent,
          job_description: jobDescription,
          analysis_result: structuredResult
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving analysis result:', error);
      throw new Error('Failed to save analysis result');
    }

    return data;
  } catch (error) {
    console.error('Error in saveAnalysisResult:', error);
    throw error;
  }
}

export async function getAnalysisResults(user: User): Promise<AnalysisResult[]> {
  try {
    const { data, error } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching analysis results:', error);
      throw new Error('Failed to fetch analysis results');
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAnalysisResults:', error);
    throw error;
  }
}