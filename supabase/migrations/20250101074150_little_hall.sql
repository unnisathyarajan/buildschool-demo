-- Drop existing table if it exists
DROP TABLE IF EXISTS analysis_results CASCADE;

-- Create analysis_results table with proper user association
CREATE TABLE analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resume_content text NOT NULL,
  job_description text,
  analysis_result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policies for analysis_results
CREATE POLICY "Users can insert own analysis results"
ON analysis_results
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own analysis results"
ON analysis_results
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_analysis_results_user_id ON analysis_results(user_id);