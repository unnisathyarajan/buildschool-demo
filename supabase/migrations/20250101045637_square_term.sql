/*
  # Initial Database Schema Setup

  1. New Tables
    - `profiles`: Store user profile information
      - `id`: UUID primary key
      - `user_id`: References auth.users
      - `full_name`: User's full name
      - `linkedin_url`: User's LinkedIn profile URL
      - Timestamps for created_at and updated_at
    
    - `resumes`: Store user resumes
      - `id`: UUID primary key
      - `user_id`: References auth.users
      - `content`: Resume content
      - `file_url`: URL to uploaded resume file
      - `link_url`: External link to resume
      - Timestamps for created_at and updated_at
    
    - `job_descriptions`: Store job descriptions
      - `id`: UUID primary key
      - `user_id`: References auth.users
      - `content`: Job description content
      - `company_name`: Company name
      - `role`: Job role/title
      - `file_url`: URL to uploaded JD file
      - `link_url`: External link to JD
      - Timestamps for created_at and updated_at

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Set up updated_at triggers
*/

-- Create tables if they don't exist
DO $$ 
BEGIN
  -- Create profiles table
  CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    full_name text,
    linkedin_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
  );

  -- Create resumes table
  CREATE TABLE IF NOT EXISTS resumes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content text,
    file_url text,
    link_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  -- Create job_descriptions table
  CREATE TABLE IF NOT EXISTS job_descriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content text,
    company_name text,
    role text,
    file_url text,
    link_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
END $$;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
    CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
    CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Create policies for resumes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'resumes' AND policyname = 'Users can view own resumes') THEN
    CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'resumes' AND policyname = 'Users can insert own resumes') THEN
    CREATE POLICY "Users can insert own resumes" ON resumes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'resumes' AND policyname = 'Users can update own resumes') THEN
    CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create policies for job descriptions
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'job_descriptions' AND policyname = 'Users can view own job descriptions') THEN
    CREATE POLICY "Users can view own job descriptions" ON job_descriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'job_descriptions' AND policyname = 'Users can insert own job descriptions') THEN
    CREATE POLICY "Users can insert own job descriptions" ON job_descriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'job_descriptions' AND policyname = 'Users can update own job descriptions') THEN
    CREATE POLICY "Users can update own job descriptions" ON job_descriptions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DO $$ 
BEGIN
  -- Profiles trigger
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_profiles_updated_at') THEN
    CREATE TRIGGER set_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;

  -- Resumes trigger
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_resumes_updated_at') THEN
    CREATE TRIGGER set_resumes_updated_at
      BEFORE UPDATE ON resumes
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;

  -- Job descriptions trigger
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_job_descriptions_updated_at') THEN
    CREATE TRIGGER set_job_descriptions_updated_at
      BEFORE UPDATE ON job_descriptions
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;