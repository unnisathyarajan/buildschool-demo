import OpenAI from 'openai';
import { INDUSTRY_INSIGHTS_PROMPT } from './promptTemplate';
import { User } from '../types/auth';
import { supabase } from './supabase';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeIndustryInsights(
  resumeContent: string,
  jobDescription: string,
  user: User
): Promise<string> {
  try {
    const prompt = INDUSTRY_INSIGHTS_PROMPT
      .replace('{resume}', resumeContent)
      .replace('{jobDescription}', jobDescription);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No insights generated');
    }

    // Save insights to database
    await saveIndustryInsights(user.id, resumeContent, jobDescription, result);

    return result;
  } catch (error: any) {
    console.error('Error analyzing industry insights:', error);
    if (error.code === 'context_length_exceeded') {
      throw new Error('Content is too long. Please try with a shorter version.');
    } else if (error.code === 'rate_limit_exceeded') {
      throw new Error('Service is busy. Please try again in a few moments.');
    }
    throw new Error('Failed to analyze industry insights. Please try again.');
  }
}

async function saveIndustryInsights(
  userId: string,
  resumeContent: string,
  jobDescription: string,
  insightResult: string
) {
  const { error } = await supabase
    .from('industry_insights')
    .insert([{
      user_id: userId,
      resume_content: resumeContent,
      job_description: jobDescription,
      insight_result: insightResult
    }]);

  if (error) {
    console.error('Error saving industry insights:', error);
    throw new Error('Failed to save industry insights');
  }
}