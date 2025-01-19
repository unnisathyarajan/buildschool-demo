/*
  # Add ATS score to skill assessments

  1. Changes
    - Add ats_score column to skill_assessments table
    - Add gauge_chart_data column to store visualization data
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to skill_assessments table
ALTER TABLE skill_assessments 
ADD COLUMN IF NOT EXISTS ats_score numeric,
ADD COLUMN IF NOT EXISTS gauge_chart_data jsonb;

-- Create index for ats_score for better query performance
CREATE INDEX IF NOT EXISTS idx_skill_assessments_ats_score ON skill_assessments(ats_score);