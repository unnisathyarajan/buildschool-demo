import OpenAI from 'openai';
import { saveCareerAlignment } from './careerAlignments';
import { User } from '../types/auth';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeAndSaveAlignment(
  resumeContent: string,
  jobDescription: string | null,
  analysisResult: any,
  user: User
): Promise<void> {
  try {
    // Calculate a basic alignment score (you can enhance this logic)
    const alignmentScore = calculateAlignmentScore(analysisResult);

    await saveCareerAlignment({
      userId: user.id,
      resumeContent,
      jobDescription,
      analysisResult,
      alignmentScore
    });
  } catch (error) {
    console.error('Error in alignment analysis:', error);
    throw error;
  }
}

function calculateAlignmentScore(analysisResult: any): number {
  // Implement your scoring logic here
  // This is a placeholder implementation
  return 0.75;
}