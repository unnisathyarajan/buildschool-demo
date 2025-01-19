-- Drop existing policies for analysis_results
DROP POLICY IF EXISTS "Anyone can insert analysis results" ON analysis_results;
DROP POLICY IF EXISTS "Anyone can read analysis results" ON analysis_results;

-- Add user_id column to analysis_results
ALTER TABLE analysis_results 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create new policies for analysis_results
CREATE POLICY "Users can insert own analysis results"
ON analysis_results
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own analysis results"
ON analysis_results
FOR SELECT TO authenticated
USING (auth.uid() = user_id);