-- Create industry_insights table
CREATE TABLE industry_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resume_content text NOT NULL,
  job_description text NOT NULL,
  insight_result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE industry_insights ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own industry insights"
ON industry_insights
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own industry insights"
ON industry_insights
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_industry_insights_user_id ON industry_insights(user_id);