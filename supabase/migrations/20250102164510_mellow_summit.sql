-- Create resume_updates table
CREATE TABLE resume_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  original_content text NOT NULL,
  updated_content text NOT NULL,
  job_description_id uuid REFERENCES job_descriptions(id),
  alignment_score numeric,
  improvement_suggestions jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE resume_updates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own resume updates"
ON resume_updates
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own resume updates"
ON resume_updates
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_resume_updates_user_id ON resume_updates(user_id);
CREATE INDEX idx_resume_updates_created_at ON resume_updates(created_at);

-- Create trigger for updated_at
CREATE TRIGGER set_resume_updates_timestamp
  BEFORE UPDATE ON resume_updates
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();