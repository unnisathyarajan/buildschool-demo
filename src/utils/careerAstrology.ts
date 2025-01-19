import { supabase } from './supabase';
import { User } from '../types/auth';

interface AstrologyResults {
  analysisResults: any[];
  skillAssessments: any[];
  careerAlignments: any[];
  industryInsights: any[];
}

export async function fetchLatestResults(userId: string): Promise<AstrologyResults> {
  try {
    // Fetch latest results from all tables in parallel
    const [analysisResults, skillAssessments, careerAlignments, industryInsights] = await Promise.all([
      supabase
        .from('analysis_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1),
      supabase
        .from('skill_assessments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1),
      supabase
        .from('career_alignments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1),
      supabase
        .from('industry_insights')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
    ]);

    return {
      analysisResults: analysisResults.data || [],
      skillAssessments: skillAssessments.data || [],
      careerAlignments: careerAlignments.data || [],
      industryInsights: industryInsights.data || []
    };
  } catch (error) {
    console.error('Error fetching astrology results:', error);
    throw new Error('Failed to fetch career astrology results');
  }
}

export async function saveAstrologyResults(user: User, results: AstrologyResults): Promise<void> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        career_astrology: results,
        career_astrology_updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error saving astrology results:', error);
    throw new Error('Failed to save career astrology results');
  }
}