/*
  # Career Alignment Analysis Table

  1. New Tables
    - `career_alignments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `resume_content` (text)
      - `job_description` (text)
      - `analysis_result` (jsonb)
      - `alignment_score` (numeric)
      - `timestamps` (created_at, updated_at)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create career_alignments table
CREATE TABLE career_alignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resume_content text NOT NULL,
  job_description text,
  analysis_result jsonb NOT NULL,
  alignment_score numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE career_alignments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own career alignments"
ON career_alignments
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own career alignments"
ON career_alignments
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_career_alignments_user_id ON career_alignments(user_id);
CREATE INDEX idx_career_alignments_created_at ON career_alignments(created_at);

-- Create trigger for updated_at
CREATE TRIGGER set_career_alignments_timestamp
  BEFORE UPDATE ON career_alignments
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();