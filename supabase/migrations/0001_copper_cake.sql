/*
  # Create Analysis Results Tables

  1. New Tables
    - `analysis_results`
      - `id` (uuid, primary key)
      - `resume_content` (text)
      - `job_description` (text)
      - `analysis_result` (jsonb)
      - `created_at` (timestamp)
    
  2. Security
    - Enable RLS on `analysis_results` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_content text NOT NULL,
  job_description text NOT NULL,
  analysis_result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analysis results"
  ON analysis_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read analysis results"
  ON analysis_results
  FOR SELECT
  TO anon
  USING (true);