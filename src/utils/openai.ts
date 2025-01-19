import OpenAI from 'openai';
import { PROFILE_ANALYSIS_PROMPT, SKILL_ASSESSMENT_PROMPT } from './promptTemplate';
import { saveAnalysisResult } from './database';
import { saveSkillAssessment } from './skillAssessment';
import { User } from '../types/auth';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Truncate text to avoid token limit issues
function truncateText(text: string, maxLength: number = 4000): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export async function analyzeAlignment(resume: string, user: User) {
  try {
    const truncatedResume = truncateText(resume);
    const prompt = PROFILE_ANALYSIS_PROMPT.replace('{resume}', truncatedResume);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    const result = response.choices[0]?.message?.content;
    
    if (result) {
      // Save the analysis result to the database
      await saveAnalysisResult(user.id, truncatedResume, null, result);
      return result;
    }
    
    throw new Error('No analysis result generated');
  } catch (error: any) {
    console.error('Error analyzing alignment:', error);
    handleOpenAIError(error);
  }
}

export async function assessSkills(resume: string, jobDescription: string | null, user: User) {
  try {
    const truncatedResume = truncateText(resume);
    const truncatedJD = jobDescription ? truncateText(jobDescription) : '';
    
    const prompt = SKILL_ASSESSMENT_PROMPT
      .replace('{resume}', truncatedResume)
      .replace('{jobDescription}', truncatedJD || 'No job description provided');

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    const result = response.choices[0]?.message?.content;
    
    if (result) {
      await saveSkillAssessment(user.id, truncatedResume, truncatedJD, result);
      return result;
    }
    
    throw new Error('No assessment result generated');
  } catch (error: any) {
    console.error('Error assessing skills:', error);
    handleOpenAIError(error);
  }
}

function handleOpenAIError(error: any) {
  if (error.code === 'context_length_exceeded') {
    throw new Error('Resume is too long. Please try with a shorter version.');
  } else if (error.code === 'rate_limit_exceeded') {
    throw new Error('Service is busy. Please try again in a few moments.');
  }
  throw new Error('Analysis failed. Please try again.');
}