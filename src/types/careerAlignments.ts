export interface CareerAlignment {
  id: string;
  user_id: string;
  resume_content: string;
  job_description: string | null;
  analysis_result: any;
  alignment_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface SaveCareerAlignmentParams {
  userId: string;
  resumeContent: string;
  jobDescription: string | null;
  analysisResult: any;
  alignmentScore?: number;
}