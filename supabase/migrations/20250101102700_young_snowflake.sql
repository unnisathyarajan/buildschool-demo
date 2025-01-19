-- Create updated_resumes table
CREATE TABLE updated_resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  original_resume_content text NOT NULL,
  job_description text,
  updated_content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE updated_resumes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own updated resumes"
ON updated_resumes
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own updated resumes"
ON updated_resumes
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_updated_resumes_user_id ON updated_resumes(user_id);