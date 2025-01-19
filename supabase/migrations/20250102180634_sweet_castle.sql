/*
  # Add career astrology to profiles table

  1. Changes
    - Add career_astrology column to profiles table to store astrology results
    - Add career_astrology_updated_at column to track when astrology was last updated
  
  2. Security
    - Inherits existing RLS policies from profiles table
*/

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS career_astrology jsonb,
ADD COLUMN IF NOT EXISTS career_astrology_updated_at timestamptz;

-- Update trigger function to handle career_astrology_updated_at
CREATE OR REPLACE FUNCTION handle_career_astrology_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.career_astrology IS DISTINCT FROM OLD.career_astrology THEN
    NEW.career_astrology_updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for career_astrology_updated_at
CREATE TRIGGER set_career_astrology_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_career_astrology_timestamp();