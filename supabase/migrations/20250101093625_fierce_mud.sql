-- Create skill_assessments table
CREATE TABLE skill_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resume_content text NOT NULL,
  job_description text,
  assessment_result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE skill_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own skill assessments"
ON skill_assessments
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own skill assessments"
ON skill_assessments
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_skill_assessments_user_id ON skill_assessments(user_id);