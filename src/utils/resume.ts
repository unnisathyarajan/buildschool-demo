import { supabase } from './supabase';
import type { Resume } from '../types/profile';
import OpenAI from 'openai';
import { UPDATE_RESUME_PROMPT } from './promptTemplate';
import { User } from '../types/auth';
import { getLatestSkillAssessment } from './skillAssessment';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getResume(userId: string): Promise<Resume | null> {
  try {
    // Get the most recent resume for the user
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No resume found
        return null;
      }
      console.error('Supabase error:', error);
      throw new Error('Failed to fetch resume');
    }

    return data;
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
}

export async function updateResume(
  userId: string,
  data: { content?: string; file_url?: string; link_url?: string }
): Promise<Resume> {
  try {
    // Validate input data
    if (!data.content && !data.file_url && !data.link_url) {
      throw new Error('At least one of content, file_url, or link_url must be provided');
    }

    // First check if a resume already exists
    const existingResume = await getResume(userId);

    // Prepare the data for upsert
    const resumeData = {
      user_id: userId,
      ...existingResume, // Keep existing data
      ...data, // Override with new data
      updated_at: new Date().toISOString()
    };

    // Delete any existing resumes for this user
    await supabase
      .from('resumes')
      .delete()
      .eq('user_id', userId);

    // Insert the new resume
    const { data: resume, error } = await supabase
      .from('resumes')
      .insert(resumeData)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to update resume');
    }

    if (!resume) {
      throw new Error('No resume data returned after update');
    }

    // Verify the update was successful
    const verifyResume = await getResume(userId);
    if (!verifyResume) {
      throw new Error('Resume update verification failed');
    }

    return resume;
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
}

interface OptimizationResult {
  content: string;
  beforeScore: number;
  afterScore: number;
}

export async function generateUpdatedResume(user: User): Promise<OptimizationResult> {
  try {
    // Get the latest skill assessment to use its resume content and result
    const latestAssessment = await getLatestSkillAssessment(user.id);
    if (!latestAssessment) {
      throw new Error('No skill assessment found. Please analyze your resume first.');
    }

    const prompt = UPDATE_RESUME_PROMPT
      .replace('{resume}', latestAssessment.resume_content)
      .replace('{jobDescription}', latestAssessment.job_description || 'No job description provided');

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      throw new Error('Failed to generate resume update');
    }

    // Extract scores from the result
    const beforeScoreMatch = result.match(/Before Score: (\d+)/);
    const afterScoreMatch = result.match(/After Score: (\d+)/);

    const beforeScore = beforeScoreMatch ? parseInt(beforeScoreMatch[1]) : 65;
    const afterScore = afterScoreMatch ? parseInt(afterScoreMatch[1]) : 85;

    // Save the updated resume content
    await updateResume(user.id, { content: result });

    return {
      content: result,
      beforeScore,
      afterScore
    };
  } catch (error: any) {
    console.error('Error updating resume:', error);
    if (error.code === 'context_length_exceeded') {
      throw new Error('Resume is too long. Please try with a shorter version.');
    } else if (error.code === 'rate_limit_exceeded') {
      throw new Error('Service is busy. Please try again in a few moments.');
    }
    throw new Error(error.message || 'Failed to update resume. Please try again.');
  }
}